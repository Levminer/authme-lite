module.exports = {
	mode: "jit",
	purge: {
		enabled: true,
		content: ["./interface/pages/*.jsx", "./interface/components/*.jsx"],
	},
	theme: {
		extend: {
			inset: {
				"-30": "-1.875rem",
			},
			colors: {
				gray: {
					600: "#1E1E1E",
					700: "#141414",
					800: "#0a0a0a",
					900: "#000000",
				},
			},
			fontFamily: {
				sans: ["Arial", "Helvetica", "sans-serif"],
			},
		},
	},
}
