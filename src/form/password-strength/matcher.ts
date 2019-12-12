export function NumberMatcher(text: string): Boolean {
	return !!text.match(/(?=.*[0-9])/g);
}
export function LowerCaseMatcher(text: string) {
	return !!text.match(/(?=.*[a-z])/g);
}
export function UpperCaseMatcher(text: string) {
	return !!text.match(/(?=.*[A-Z])/g);
}
export function SpecialCharMatcher(text: string) {
	return !!text.match(/(?=.*[ç~^;/\\!@#$%¨&*()])/g);
}
