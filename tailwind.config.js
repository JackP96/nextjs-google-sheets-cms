module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#9bae88",
			},
		},
	},
	variants: {},
	plugins: [],
};
