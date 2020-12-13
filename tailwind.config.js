module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["montserrat", "sans-serif"],
			},
			colors: {
				primary: "#9bae88",
				darkGray: "#292c32",
			},
		},
	},
	variants: {},
	plugins: [],
};
