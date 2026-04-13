import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  root: __dirname,
  base: '/remote/',
  cacheDir: '../../node_modules/.vite/apps/remote',
  plugins: [
    qwikCity({ basePathname: '/remote/' } as any),
    qwikVite({
      client: {
        outDir: '../../dist/apps/remote/client',
      },
      ssr: {
        outDir: '../../dist/apps/remote/server',
      },
    }),
    tsconfigPaths({ root: '../../' }),
  ],
  server: {
    fs: {
      // Allow serving files from the project root
      allow: ['../../'],
    },
    headers: {
      // Don't cache the server response in dev mode
      'Cache-Control': 'public, max-age=0',
    },
  },
  preview: {
    headers: {
      // Do cache the server response in preview (non-adapter production build)
      'Cache-Control': 'public, max-age=600',
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
}));
