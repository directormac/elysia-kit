import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../../packages/ui/src/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {}
	},

	plugins: []
} as Config;
