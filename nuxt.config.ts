// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/icon'],

  app: {
    head: {
      title: "iwouldntbother's Archive",
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/ww-favicon.svg',
        },
      ],
    },
  },
});
