// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ["~/assets/main.css"],

  nodemailer: {
    from: '"TheAlphaOnes" <no-reply@mail.taohq.org>',
    host: "smtp.maildiver.com",
    port: 587,
    secure: false, // true for port 465, false for 587
    auth: {
      user: "maildiver",
      pass: process.env.MAIL_DIVER_API_KEY,
    },
  },
  runtimeConfig: {
    appWriteKey: process.env.APPWRITE_API_KEY,
    appWriteProject: process.env.APPWRITE_API_PROJECT,
    appWriteBucket: process.env.APPWRITE_API_BUCKET,
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    public:{

      taoAuthToken :process.env.TAO_AUTH_TOKEN,
      taoAuthURL:process.env.TAO_AUTH_URL,
      taoAuthCallback:process.env.TAO_AUTH_CALLBACK,
      taoTokenWeb:process.env.TAO_TOKEN_WEB,
      appURL:process.env.APP_URL,
    }
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },

  },

  modules: [
    "@nuxtjs/device",
    "@pinia/nuxt",
    "motion-v/nuxt",
    "nuxt-nodemailer",
    "@vueuse/nuxt",
    "nuxt-marquee",
  ],
})
