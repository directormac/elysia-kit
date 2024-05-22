import dts from 'bun-plugin-dts';
import { $ } from 'bun';

await $`rm -rf ./dist`;

await Bun.build({
	entrypoints: ['./src/index.ts'],
	outdir: './dist',
	target: 'bun',
	format: 'esm',
	splitting: true,
	minify: true,
	plugins: [dts()]
});

await $`cp -r public dist/public`;

console.log('Build complete .... ');
