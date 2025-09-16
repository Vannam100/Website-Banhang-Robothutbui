// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['stores']
  },

  generate: {
    routes: ['/chi-tiet-nganh','/danh-sach-san-pham','/gia-cong','/gio-hang','/','/nha-may-gmp','/san-pham','/thanh-toan','/tuyen-dung-nganh','/tuyen-dung','/ve-chung-toi','/blog/','/blog/post1','/blog/post2','/blog/post3','/blog/post4','/blog/category/tin-tức','/blog/category/tuyển-dụng','/blog/category/kinh-nghiệm-nuôi-trồng','/blog/category/tin-thủy-sản','/chi-tiet-san-pham/dich-chiet-sam-ngoc-linh-dang-long','/chi-tiet-san-pham/ngoc-linh-truong-sinh-white','/chi-tiet-san-pham/tinh-chat-sam-ngoc-linh-30ghop','/chi-tiet-san-pham/sam-ngoc-linh-mat-ong-70mlhop','/chi-tiet-san-pham/dich-chiet-sam-ngoc-linh-gold-goi-dang-long-15goihop','/chi-tiet-san-pham/collagen-sam-ngoc-linh-dang-long-20hopthung','/chi-tiet-san-pham/ngoc-linh-truong-sinh-yellow','/chi-tiet-san-pham/ngoc-linh-truong-sinh-green','/chi-tiet-san-pham/hevarine','/chi-tiet-san-pham/truong-sinh-lon','/chi-tiet-san-pham/truong-sinhthung','/chi-tiet-san-pham/song-long-septomine-chai','/chi-tiet-san-pham/livexime-chai','/chi-tiet-san-pham/lebomine-thung','/chi-tiet-san-pham/nuoc-bu-dien-giai-ors-thung','/chi-tiet-san-pham/lam-sinh-thao-chai','/chi-tiet-san-pham/sl-tpd','/chi-tiet-san-pham/phanximake-chai','/chi-tiet-san-pham/nhat-song-long-chai','/chi-tiet-san-pham/vuong-bach-thao-chai','/chi-tiet-san-pham/dai-thiet-thao-can','/chi-tiet-san-pham/sl-plu-888-goi','/chi-tiet-san-pham/sl-no1-goi','/chi-tiet-san-pham/sl-bzt-goi','/chi-tiet-san-pham/sl-pond-clear-goi','/chi-tiet-san-pham/sl-grown-goi','/chi-tiet-san-pham/song-long-123-xo','/chi-tiet-san-pham/men-song-sl-khanh-hoa-hop','/chi-tiet-san-pham/yucca-usa-100-chai','/chi-tiet-san-pham/vi-sinh-natromat-goi','/chi-tiet-san-pham/khoang-slsuper-pro-goi','/chi-tiet-san-pham/vitamin-c-70-hop','/chi-tiet-san-pham/nerin-hop','/chi-tiet-san-pham/sl-vitamin-c-tat-xo','/chi-tiet-san-pham/lenmete-sonre-chai','/chi-tiet-san-pham/ts-999-05lchai','/chi-tiet-san-pham/ts-999-1lchai','/chi-tiet-san-pham/septomine-chai','/chi-tiet-san-pham/ts-1001-05lchai','/chi-tiet-san-pham/ts-1001-1lchai','/chi-tiet-san-pham/ts-tpd-chai','/chi-tiet-san-pham/lam-sinh-thao-1lchai','/chi-tiet-san-pham/ts-1002-chai','/chi-tiet-san-pham/tr-555-chai','/chi-tiet-san-pham/bet-to-gane-chai','/chi-tiet-san-pham/dai-hoang-thach-chai','/chi-tiet-san-pham/ts-dema-chai','/chi-tiet-san-pham/sdk-2lcan','/chi-tiet-san-pham/spore-vi-bao-tu-trung-1lchai','/chi-tiet-san-pham/yucca-phot-1lchai']
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