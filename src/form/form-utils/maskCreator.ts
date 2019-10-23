const hexRegex = /[A-Fa-f0-9]/;

const specialRegex = /[@#$%*¨*(!)\\\/=+§_<>,\.?;-]/;

const alphaRegex = /[A-Za-z]/;

const decimalRegex = /\d/;

const binaryRegex = /[01]/;

const alphaNumericRegex = /[\S]/;

const maskTemplate = {
    b: binaryRegex,
    B: binaryRegex,
    s: specialRegex,
    S: specialRegex,
    H: hexRegex,
    h: hexRegex,
    A: alphaRegex,
    a: alphaRegex,
    0: decimalRegex,
    9: decimalRegex,
    X: alphaNumericRegex,
    x: alphaNumericRegex
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
