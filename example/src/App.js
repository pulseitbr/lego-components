import { Body, useForm, Footer, Page, Input } from "lego-components";
import React, { useState } from "react";

export default function App() {
    const { state: form, onChange } = useForm(
        {
            name: "",
            age: ""
        },
        {
            validations: {
                name: (fieldValue, state) => {
                    return {
                        isValid: fieldValue === "Foda-se",
                        msg: "Tem que ser Foda-se"
                    };
                }
            }
        }
    );

    console.log("state", form);

    return (
        <Page>
            <Body>
                <Input value={form.name} onChange={onChange} />
            </Body>
            <Footer>Footer</Footer>
        </Page>
    );
}
