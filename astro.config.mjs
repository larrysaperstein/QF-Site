import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'never',
  site: 'https://quickandfunnymusicals.com',
});
