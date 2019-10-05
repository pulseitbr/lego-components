import { configure, addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module);

addParameters({
    options: {
        theme: themes.dark
    }
});
