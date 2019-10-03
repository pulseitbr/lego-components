const hexRegex = /[A-Fa-f0-9]/

const alphaRegex = /[A-Za-z]/

const decimalRegex = /\d/

const alphaNumericRegex = /[\S]/

const maskTemplate = {
    H: hexRegex,
    h: hexRegex,
    A: alphaRegex,
    a: alphaRegex,
    0: decimalRegex,
    X: alphaNumericRegex,
    x: alphaNumericRegex,
};

const maskCreator = (template = "") =>
    template.split("").reduce(
        (acc, el) => {
            if (maskTemplate.hasOwnProperty(el)) {
                return acc.concat(maskTemplate[el]);
            }
            return acc.concat(el);
        },
        [] as Array<string | RegExp>
    );

export default maskCreator;
