import { Body, Footer, StyleInput as Input, Page, useForm, View, StyleSheet } from "lego-components";
import React from "react";

const styles = StyleSheet.create({
    input: {
        marginBottom: "50px"
    }
});
export default () => {
    const { state: form, onChange, blurEvents, errors } = useForm(
        { name: "", age: "" },
        {
            updateOnChange: true,
            blurs: {
                name(e) {}
            },
            validations: {
                name: (fieldValue) => {
                    return {
                        isValid: fieldValue === "Foda-se",
                        msg: "Tem que ser Foda-se"
                    };
                }
            }
        }
    );
    return (
        <Page>
            <Body>Fuck</Body>
            <Footer>
                <View span="25%">
                    <Input
                        onBlur={blurEvents.name}
                        value={form.name}
                        name="name"
                        divStyle={styles.input}
                        onChange={onChange}
                        message={errors.name.hasError && errors.name.message}
                    />
                </View>
            </Footer>
        </Page>
    );
};
