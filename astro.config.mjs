// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react()],
	vite: {
		resolve: {
			dedupe: ['react', 'react-dom'],
		},
		optimizeDeps: {
			include: ['react', 'react-dom', 'zustand', '@tanstack/react-table'],
		},
	},
});
