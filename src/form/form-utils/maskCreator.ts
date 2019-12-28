const hexRegex = /[A-Fa-f0-9]/;

const specialRegex = /[@#$%*¨*(!)\\\/=+§_<>,\.?;-]/;

const alphaRegex = /[A-Za-z]/;

const decimalRegex = /\d/;

const binaryRegex = /[01]/;

const alphaNumericRegex = /[\S]/;

const TEMPLATE = {
	0: decimalRegex,
	9: decimalRegex,
	A: alphaRegex,
	a: alphaRegex,
	b: binaryRegex,
	B: binaryRegex,
	H: hexRegex,
	h: hexRegex,
	S: specialRegex,
	s: specialRegex,
	X: alphaNumericRegex,
	x: alphaNumericRegex
};

const maskCreator = (template = "") =>
	template.split("").reduce((acc, el) => (TEMPLATE.hasOwnProperty(el) ? acc.concat(TEMPLATE[el]) : acc.concat(el)), [] as Array<string | RegExp>);

export default maskCreator;
