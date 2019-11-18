import { IsEmpty, OnlyNumbers, Trim } from "lego";
import Colors from "../styles";

const placeholder = { class: "", phone: { text: "", number: "" }, style: {}, user: "" };

const fnPlaceholder = (v: string) => v;

type StringMap = { [key: string]: string } & Object;
type ParserParams = { colors?: StringMap };
type FunctionMap = { [key: string]: (v: string) => string };
type TPlaceholder = typeof placeholder;

const clearQuote = (str = "") => str.replace(/^"/, "").replace(/$"/, "");

const mutate = (key: string, value: string, refObject: any) => {
	if (refObject.hasOwnProperty(key)) {
		return { ...refObject, [key]: `${refObject[key]} ${value}` };
	}
	return { ...refObject, [key]: value };
};

const placeholderFunctions = {
	class: (prev: TPlaceholder, value: string): TPlaceholder => ({ ...prev, class: value }),
	text: (prev: TPlaceholder, text: string): TPlaceholder => ({ ...prev, phone: { ...prev.phone, text } }),
	phone: (prev: TPlaceholder, n: string): TPlaceholder => ({ ...prev, phone: { ...prev.phone, number: n } }),
	user: (prev: TPlaceholder, user: string) => ({ ...prev, user }),
	page: (prev: TPlaceholder, page: string) => ({ ...prev, page })
};

const toSecureHttps = (str = "") => {
	if (str.startsWith("http://")) {
		return str.replace("http://", "https://");
	}
	return str.startsWith("https://") ? str : `https://${str}`;
};

const sanitizeHTML = (str = "") => str.replace(/<[^>]*>/, "");

const codeMap: StringMap = {
	"[line": "<p",
	"[/line]": "</p>",
	"[/b]": "</strong>",
	"[b": "<strong",
	"[face": "<a",
	"[insta": "<a",
	"[instagram": "<a",
	"[i": "<i",
	"[/i]": "</i>",
	"[/insta]": "</a>",
	"[/instagram]": "</a>",
	"[t": "<span",
	"[/t]": "</span>",
	"[link": "<a",
	"[/link]": "</a>",
	"[zap": "<a",
	"[/zap]": "<a>",
	"[/face]": "<a>"
};

const quote = `('|")`;

const matchCloseCommands = (match: string) => codeMap[match];

const optionalREconcat = (acc: string, el: string) => `${el}|${acc}`;

const paramToRE = (...flags: string[]) => flags.reduce(optionalREconcat, "").replace(/\|$/, "");

const acceptChars = "#@0-9a-zA-ZàèìòùÀÈÌÒÙáéíóúýäëïöüÿçßØøÅåÆæœ.:/ _-";

const tags = paramToRE("zap", "b", "link", "i", "t", "line", "insta", "instagram", "face");

const tagAttributes = paramToRE("phone", "text", "color", "url", "class", "mark", "user", "page");

const openRegex = new RegExp(`\\[(${tags})( ?(${tagAttributes})=${quote}[${acceptChars}]+${quote} ?){0,}?\\]`, "gi");

const closeRegex = new RegExp(`\\[/(${tags})]`, "gi");

const tagParameters = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[\]"']))+.)["']?/g;

const maybeValue = (object: Object, value: string) => (object.hasOwnProperty("value") ? object[value] : value);

const parser = (params: ParserParams = { colors: {} }) => (str: string) => {
	const colors = params!.colors as StringMap;

	const keyOperator: FunctionMap = {
		class: (value) => value.trim(),
		url: (value) => toSecureHttps(value),
		phone: (value) => `https://wa.me/${OnlyNumbers(value)}`,
		user: (value) => `https://instagram.com/@${value}`,
		page: (value) => `https://facebook.com/@${value}`,
		text: (value) => encodeURIComponent(clearQuote(value.trim())),
		mark: (value) => maybeValue(colors, value),
		color: (value) => maybeValue(colors, value)
	};

	const matchOpenCommands = (match: string) => {
		const [, tag, matches] = match.split(/(\[[a-z]+) ?/);
		let attributesOfTag: any = {};
		matches.replace(tagParameters, (values) => {
			const [key, value] = values.split("=");
			try {
				const cleanValue = value.replace(/^['"]/, "").replace(/['"]$/, "");
				const functionByKey = keyOperator[key] || fnPlaceholder;
				attributesOfTag = mutate(key, functionByKey(cleanValue).trim(), attributesOfTag);
				return "";
			} catch (error) {
				return "";
			}
		});
		const openTag = codeMap[tag.trim()];
		const keys = Object.keys(attributesOfTag);
		if (keys.length === 0) {
			return `${openTag}>`;
		}
		const attrs = keys.reduce((acc: TPlaceholder, el: string) => {
			const val = `${attributesOfTag[el]}`;
			if (placeholderFunctions.hasOwnProperty(el)) {
				return placeholderFunctions[el](acc, val);
			}
			return { ...acc, style: { ...acc.style, [el]: val } };
		}, placeholder);
		let innerAttributes = "";
		if (!!attrs.class) {
			innerAttributes += `class="${attrs.class}"`;
		}
		if (!!attrs.phone.number) {
			const { number, text } = attrs.phone;
			innerAttributes += `href="${number}?text=${text}"`;
		}
		if (!!attrs.user) {
			innerAttributes += `href="${attrs.user}" `;
		}
		if (!!attrs.page) {
			innerAttributes += `href="${attrs.page}" `;
		}
		if (!IsEmpty(attrs.style)) {
			const ok = Object.entries(attrs.style)
				.map((x) => `${x[0].replace(/mark/, "background-color")}:${x[1]}`)
				.join(";");
			innerAttributes += `style="${ok}"`;
		}
		return `${openTag} ${innerAttributes}>`;
	};

	return Trim(sanitizeHTML(str))
		.replace(openRegex, matchOpenCommands)
		.replace(closeRegex, matchCloseCommands);
};

export default parser({
	colors: {
		primary: Colors.primary,
		danger: Colors.danger,
		dark: Colors.dark
	}
});
