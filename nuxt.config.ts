export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: 'RCCGRPC',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'robots', content: 'index, follow' },
        { name: 'keywords', content: '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/rccg-logo.svg' },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,900;1,900&display=swap",
        },
        { rel: 'stylesheet', href: 'https://use.typekit.net/hzh7srk.css' },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/style.css",
    "@/assets/css/main.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
