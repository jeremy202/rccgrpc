export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  typescript: { strict: true },
  app: {
    head: {
      title: 'RCCG Restoration Power Center Calgary | A Parish of The Redeemed Christian Church of God (RCCG)',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Restoration Power Center (RPC) is a vibrant multi-cultural parish of the Redeemed Christian Church of God (RCCG) in Calgary, Alberta. Founded in 2018, RPC exists to take over the land for Jesus through worship, community impact, and raising kingdom leaders.',
        },
        {
          name: 'keywords',
          content:
            'RCCG Calgary, RCCG Restoration Power Center, RCCG Canada, Redeemed Christian Church Calgary, Pastor Lilian Akwue, Pastor Seun Jonathan, RCCG Victory Village, RCCG churches near me, RCCG Alberta, RCCG Restoration Power Center Calgary, RCCG RPC',
        },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'RCCG Restoration Power Center Calgary | Redeemed Christian Church of God' },
        {
          property: 'og:description',
          content:
            'Join RCCG Restoration Power Center Calgary – a dynamic, family-oriented parish of the Redeemed Christian Church of God (RCCG) dedicated to spiritual growth, leadership, and community impact.',
        },
        { property: 'og:url', content: 'https://rccgrpc.ca' },
        { property: 'og:image', content: '/images/rccg-rpc-logo.svg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'RCCG Restoration Power Center Calgary' },
        {
          name: 'twitter:description',
          content:
            'Experience the love and power of God at RCCG Restoration Power Center Calgary — a place where we raise leaders and take over the land for Jesus.',
        },
        { name: 'twitter:image', content: '/images/rccg-logo.svg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/rccg-rpc-logo.svg' },
        { rel: 'canonical', href: 'https://rccgrpc.ca' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,900;1,900&display=swap',
        },
        { rel: 'stylesheet', href: 'https://use.typekit.net/hzh7srk.css' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/style.css',
    '@/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
