// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: {
    dir: "lib",
    format: "cjs"
  },
  plugins: [typescript(), resolve(), commonjs()],
  external: ["react", "react-dom"]
};
