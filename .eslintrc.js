module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ["standard", "eslint:recommended", "plugin:node/recommended", "plugin:promise/recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
	plugins: ["prettier", "react"],
	ignorePatterns: ["/node_modules/*", "/dist/*", "/build/*"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: "detect",
		},
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
		"func-style": ["error"],
		"no-var": ["error"],
		"node/no-unsupported-features/es-syntax": ["off"],
		"prefer-const": ["warn"],
		"node/no-unpublished-import": ["off"],
		"react/no-unescaped-entities": ["off"],
		"promise/always-return": ["off"],
	},
}
