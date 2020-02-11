export type ClassNamesValues = string | number | ClassNameObject | ClassNameArray | undefined | null | false;

export interface ClassNameObject {
	[id: string]: boolean | undefined | null;
}

export type ClassNameArray = ClassNamesValues[];

export const classNames = (...classes: ClassNamesValues[]) => {
	const className = new Set();
	classes.forEach((classItem) => {
		const type = typeof classItem;
		if (Array.isArray(classItem)) {
			classItem.forEach((item) => {
				if (!!item) {
					className.add(item);
				}
			});
		} else if (type === "string" || type === "number") {
			className.add(classItem);
		} else if (type === "object") {
			for (const key in classItem as ClassNameObject) {
				if (classItem![key]) {
					className.add(key);
				}
			}
		}
	});
	return [...className.values()].join(" ");
};
