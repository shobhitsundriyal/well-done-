module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			animation: {
				blob: 'blob 7s infinite',
			},
			keyframes: {
				blob: {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
					'33%': {
						transform: 'translate(50px, -70px) scale(1.2)',
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.8)',
					},
					'100%': {
						transform: 'tranlate(0px, 0px) scale(1)',
					},
				},
			},
		},
	},
	plugins: [],
}
