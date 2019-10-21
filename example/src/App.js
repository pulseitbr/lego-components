import { Page, Dropdown, DropdownItem } from "lego-components";
import React, { useState, Fragment } from "react";

export default () => {
    const [view, setView] = useState(true);
    return (
        <Page>
            <Dropdown
                triggers={["onContextMenu", "onClick"]}
                itens={
                    <Fragment>
                        <DropdownItem>Item 1</DropdownItem>
                        <DropdownItem>Item 2</DropdownItem>
                        <DropdownItem>Item 3</DropdownItem>
                        <DropdownItem>Item 4</DropdownItem>
                    </Fragment>
                }
            >
                Dropdown
            </Dropdown>
        </Page>
    );
};
