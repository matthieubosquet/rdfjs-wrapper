import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  prettier,
  {
    ignores: ["**/dist/**/*"]
  },
  {
    files: ["**/*.js"],
    rules: {
      "semi": "error",
      "no-unused-vars": "error"
    }
  }
];
