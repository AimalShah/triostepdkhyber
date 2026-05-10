/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				display: ['Oswald', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			colors: {
				dark: '#1a1a1a',
				light: '#f5f5f5',
			},
		},
	},
	plugins: [],
};
