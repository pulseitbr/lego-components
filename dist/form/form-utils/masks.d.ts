export declare const maskConverter: {
    color: (str: string) => string;
    cpf: (str: string) => string;
    cnpj: (str: string) => string;
    cellphone: (str: string) => string;
    telephone: (str: string) => string;
    cep: (str: string) => string;
    cpfCnpj: (str: string) => string;
    isoDate: (str: string) => string;
    date: (str: string) => string;
    creditCard: (str: string) => string;
    cellTelephone: (str: string) => string;
    matricula: (str: string) => string;
};
export declare const masks: {
    color: (string | RegExp)[];
    cpf: (string | RegExp)[];
    cnpj: (string | RegExp)[];
    cep: (string | RegExp)[];
    cellphone: (string | RegExp)[];
    telephone: (string | RegExp)[];
    date: (str: string) => (string | RegExp)[];
    isoDate: (string | RegExp)[];
    creditCard: (string | RegExp)[];
    matricula: RegExp[];
    cpfCnpj: (value: string) => (string | RegExp)[];
    cellTelephone: (value: string) => (string | RegExp)[];
};
export declare function convertMaskToString(mask: any): string;
export declare const decimalsInput: string[];
export declare const decimalKeyboard: {
    date: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    creditCard: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    isoDate: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    cpf: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    cellphone: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    cnpj: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    cep: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    color: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    telephone: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    matricula: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    cellTelephone: {
        pattern: string;
        title: string;
        inputMode: string;
    };
    cpfCnpj: {
        pattern: string;
        title: string;
        inputMode: string;
    };
};
