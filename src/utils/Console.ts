export default {
	array: console.table,
	table: console.table,
	style: (text: string, color: string, fontSize: string) =>
		console.log(new Date(), `%c${text}`, `color: ${color};font-size: ${fontSize}px;`),
	group: (label: string, ...data: any[]) => {
		console.group(label);
		data.forEach((x) => {
			console.info(new Date(), x);
		});
		console.groupEnd();
	}
};
