import { resolve } from 'node:path';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
			targets: [
				{
					src: normalizePath(
						resolve('node_modules', '@esri', 'calcite-components', 'dist', 'calcite', 'assets')
					),
					dest: normalizePath('.')
				}
			]
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
