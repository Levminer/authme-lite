module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ["standard", "prettier", "plugin:node/recommended", "plugin:react/recommended"],
	plugins: ["prettier", "react"],
	ignorePatterns: ["/node_modules/*", "/dist/*", "/build/*"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		indent: ["error", "tab", { SwitchCase: 1 }],
		quotes: ["error", "double"],
		semi: ["error", "never"],
		eqeqeq: ["off"],
		camelcase: ["off"],

		"prettier/prettier": ["warn"],
		"linebreak-style": ["warn", "windows"],
		"prefer-arrow-callback": ["error"],
		"prefer-template": ["error"],
		"node/no-unpublished-require": ["off"],
		"node/no-unsupported-features/es-syntax": ["off"],
		"no-unused-vars": ["off"],
		"no-undef": ["off"],
		"no-case-declarations": ["off"],
		"prefer-const": ["warn"],
		"node/no-unpublished-import": ["off"],
	},
}
