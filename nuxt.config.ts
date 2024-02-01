// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: [
        '~/assets/scss/common.scss'
    ],
    serverMiddleware: [
        {path: '/api', handler: '~/api/plants.js'},
    ],
})
