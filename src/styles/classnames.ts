export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false;

export interface ClassDictionary {
	[id: string]: boolean | undefined | null;
}

export type ClassArray = ClassValue[];

export const classNames = (...classes: ClassValue[]) => {
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
			for (const key in classItem as ClassDictionary) {
				if (classItem![key]) {
					className.add(key);
				}
			}
		}
	});
	return [...className.values()].join(" ");
};
