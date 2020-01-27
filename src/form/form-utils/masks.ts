import { FormatCpf, OnlyNumbers, ToInt } from "lego";
const cnpjReplace = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
const cellphoneReplace = /(\d{2})(\d{5})(\d{4})/;
const telephoneReplace = /(\d{2})(\d{4})(\d{4})/;
const cepReplace = /(\d{5})(\d{3})/;
const isoDateReplace = /(\d{4})(\d{2})(\d{2})/;
const brDateReplace = /(\d{2})(\d{2})(\d{4})/;
const creditCardReplace = /(\d{4})(\d{4})(\d{4})(\d{4})/;

const toCpf = (str: string = "") => FormatCpf(str);
const toCnpj = (str: string = "") => OnlyNumbers(str).replace(cnpjReplace, "$1.$2.$3/$4-$5");

const toCellphone = (str: string = "") => {
	if (str.length === 11) {
		return OnlyNumbers(str).replace(cellphoneReplace, "($1) $2-$3");
	}
	return str;
};

const toTelephone = (str: string = "") => {
	if (str.length === 10) {
		return OnlyNumbers(str).replace(telephoneReplace, "($1) $2-$3");
	}
	return str;
};

export const maskConverter = {
	cellphone: toCellphone,
	cnpj: (str: string) => (str.length === 14 ? toCnpj(str) : str),
	color: (str: string) => (str.length === 7 ? `#${OnlyNumbers(str)}` : str),
	cpf: (str: string) => (str.length === 11 ? toCpf(str) : str),
	telephone: toTelephone,
	cep: (str: string) => OnlyNumbers(str).replace(cepReplace, "$1-$2"),
	cpfCnpj: (str: string) => {
		if (str.length === 14) {
			return toCpf(str);
		} else if (str.length === 14) {
			return toCnpj(str);
		}
		return str;
	},
	isoDate: (str: string) => {
		if (str.length === 8) {
			return OnlyNumbers(str).replace(isoDateReplace, "$1-$2-$3");
		}
		return str;
	},
	date: (str: string) => {
		if (str.length === 8) {
			return OnlyNumbers(str).replace(brDateReplace, "$1/$2/$3");
		}
		return str;
	},
	creditCard: (str: string) => {
		if (str.length === 16) {
			return OnlyNumbers(str).replace(creditCardReplace, "$1 $2 $3 $4");
		}
		return str;
	},
	cellTelephone: (str: string) => {
		if (str.length === 10) {
			return toTelephone(str);
		}
		if (str.length === 11) {
			return toCellphone(str);
		}
		return str;
	},
	matricula: (str: string) => str
};

export const masks = {
	cellphone: ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
	cep: [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
	cnpj: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/],
	color: ["#", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
	cpf: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/],
	telephone: ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
	date: (str: string = "") => {
		const numbers = OnlyNumbers(str);
		if (numbers.length === 2) {
			const day = ToInt(numbers.substring(0, 2));
			if (day === 31) {
				return [/[0123]/, /\d/, "/", /[01]/, /[12356789]/, "/", /\d/, /\d/, /\d/, /\d/];
			}
			if (day === 30) {
				return [/[0123]/, /\d/, "/", /[01]/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
			}
		}
		return [/[0123]/, /\d/, "/", /[01]/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
	},
	isoDate: [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/],
	creditCard: [/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/],
	matricula: [
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/,
		/[\S]/
	],
	cpfCnpj: (value: string = "") => {
		const mask = OnlyNumbers(value);
		if (mask.length > 11) {
			return [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/];
		}
		return [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
	},
	cellTelephone: (value: string = "") => {
		const mask = OnlyNumbers(value);
		if (mask.length === 10) {
			return ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
		}
		return ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
	}
};

export function convertMaskToString(mask: any) {
	const maskOutput = typeof mask === "function" ? mask("") : mask;
	const { length } = maskOutput;
	let placeholder = "";
	for (let i = 0; i < length; i++) {
		const str = maskOutput[i];
		if (typeof str === "string") {
			placeholder += str;
		} else if (str.toString() === "/\\d/") {
			placeholder += "0";
		} else if (str.toString() === "/[\\S]/") {
			placeholder += "A";
		} else {
			placeholder += str;
		}
	}
	return placeholder;
}

export const decimalsInput = ["cpf", "cellphone", "cnpj", "cep", "telephone", "date", "matricula", "cellTelephone", "cpfCnpj"];

export const decimalKeyboard = {
	date: {
		pattern: "[0-9]{2}/[0-9]{2}/[0-9]{4}",
		title: "Informe a data no padrão correto",
		inputMode: "decimal"
	},
	creditCard: {
		pattern: "[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}",
		title: "Informe o número do cartão no padrão correto",
		inputMode: "decimal"
	},
	isoDate: {
		pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
		title: "Informe a data no padrão correto",
		inputMode: "decimal"
	},
	cpf: {
		pattern: "[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}",
		title: "Informe o CPF no padrão correto",
		inputMode: "decimal"
	},
	cellphone: {
		pattern: "\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}",
		title: "Informe o celular no padrão correto",
		inputMode: "decimal"
	},
	cnpj: {
		pattern: `[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9][0-9]`,
		title: "Informe o CNPJ no padrão correto",
		inputMode: "decimal"
	},
	cep: {
		pattern: "[0-9]{5}-[0-9]{3}",
		title: "Informe o CEP no padrão correto",
		inputMode: "decimal"
	},
	color: {
		pattern: "#[0-9]{6}",
		title: "Informe a cor no padrão correto",
		inputMode: "decimal"
	},
	telephone: {
		pattern: "\\([0-9]{2}\\) [0-9]{4}-[0-9]{4}",
		title: "Informe o telefone no padrão correto",
		inputMode: "decimal"
	},
	matricula: {
		pattern: "[\\S]{0,20}",
		title: "Informe a matrícula no padrão correto",
		inputMode: "decimal"
	},
	cellTelephone: {
		pattern: "\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}",
		title: "Informe o telefone/celular no padrão correto",
		inputMode: "decimal"
	},
	cpfCnpj: {
		pattern: "[0-9./-]+",
		title: "Informe o CPF/CNPJ no padrão correto",
		inputMode: "decimal"
	}
};
