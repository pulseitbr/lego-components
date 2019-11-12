import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import pkg from "./package.json";

export default {
	input: "src/index.tsx",
	output: [
		{
			file: pkg.main,
			format: "cjs",
			exports: "named",
			sourcemap: true
		},
		{
			file: pkg.module,
			format: "es",
			exports: "named",
			sourcemap: true
		}
	],
	external: ["react", "sidekicker", "styled-components"],
	plugins: [
		external(),
		postcss({
			inject: true,
			extract: true,
			minimize: true,
			autoModules: true,
			extensions: [".css"]
		}),
		url(),
		svgr(),
		resolve({
			browser: true
		}),
		// tsc(),
		typescript({
			rollupCommonJSResolveHack: true,
			clean: true
		}),
		commonjs({
			namedExports: {
				"react-is": ["isElement", "isValidElementType", "ForwardRef"],
				react: ["cloneElement", "Fragment", "createContext", "Component", "createElement"]
			}
		})
	]
};
