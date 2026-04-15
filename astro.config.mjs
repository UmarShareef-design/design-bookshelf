import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://uxbooks.in',
    trailingSlash: 'always',
    build: {
      format: 'directory'
    },
    integrations: [        react(),  
      sitemap({
        filter: (page) => !page.includes('select-language'),
        i18n: {
          defaultLocale: 'en',
          locales: {
            en: 'en',
            ta: 'ta',
            hi: 'hi',
            te: 'te',
            ml: 'ml',
            kn: 'kn',
            bn: 'bn',
            mr: 'mr',
            gu: 'gu',
            pa: 'pa',
            or: 'or',
          },
        },
      })
    ]
});
