// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['stores']
  },

  generate: {
    routes: ['/danh-sach-san-pham','/gio-hang','/','/lien-he','/san-pham','/thanh-toan','/ve-chung-toi','/blog/','/blog/post1','/blog/category/robot-hút-bụi']
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/sitemap.xml'],
    },
    hooks: {
      'prerender:done': (result) => {
        result.failedRoutes.forEach((value, index) => {
          if (value.error) {
            const route = result.prerenderedRoutes[index].route;
    
            if (value.error.statusCode === 404 && value.error.statusMessage === 'Document not found!') {
              console.warn(`Skipping 404 (Document not found) for route: ${route}`);
              result.prerenderedRoutes[index].skip = true;
              return;
            }
    
            if (value.error.statusCode === 500 && route === '/200.html') {
              console.warn(`Skipping 500 error for /200.html: ${value.fileName}`);
              result.prerenderedRoutes[index].skip = true;
              return;
            }
    
            if (value.error.statusCode === 500 && route === '/blog/') {
              console.warn(`Skipping 500 error for /blog/: ${value.fileName}`);
              result.prerenderedRoutes[index].skip = true;
              return;
            }
    
            console.error(`Error detected on route ${route}:`, value.error);
          }
        });
      },
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  css: [
    '@/assets/style/main.scss',
    '@/node_modules/vue-inner-image-zoom/lib/vue-inner-image-zoom.css',
  ],

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-swiper',
    'nuxt-rating',
    '@pinia/nuxt'
  ],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classPrefix: '',
    storageKey: 'nuxt-color-mode'
  },
  plugins: [
    '@/plugin/addRoutes.ts'
  ],
  tailwindcss: {
    cssPath: '@/assets/style/tailwind.css'
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: 'light-plus'
    }
  },

  components: {
    global: true,
    dirs: ['~/components', '~/plugin']
  },

  build: {
    transpile: ['newzen-connector']
  },

  ui: {
    icons: ['mdi']
  },

  compatibilityDate: '2024-11-12',
});