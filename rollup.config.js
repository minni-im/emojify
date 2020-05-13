import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
	input: "src/emojify.js",
	output: {
		file: "index.min.js",
		format: "esm",
	},
	plugins: [commonjs(), nodeResolve(), terser()],
};
