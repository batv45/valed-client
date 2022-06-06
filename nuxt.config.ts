import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
    publicRuntimeConfig: {
        VALED_BASE_URL: process.env.VALED_BASE_URL,
        VALED_API_ENDPOINT: process.env.VALED_API_ENDPOINT,
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    css: [
        '@/assets/css/tailwind.css',
    ],
    buildModules: [
        // pinia plugin - https://pinia.esm.dev
        "@pinia/nuxt",
    ],
    build: {
        transpile: ['@heroicons/vue'],
    },
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    vite: {
        logLevel: "info",
        optimizeDeps: {
            include: [
                '@headlessui/vue', '@heroicons/vue/solid', '@heroicons/vue/outline', 'vue', 'pinia', 'ufo','vue-tabler-icons','coloquent'
            ],
            exclude: [
                 'redaxios'
            ]
        }
    }
});
