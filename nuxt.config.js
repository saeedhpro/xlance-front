
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'XLance | %s',

    // title: 'XLance | %s ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: '~/components/Loading.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/variables.scss',
    '@/assets/fontawesome/css/fontawesome.min.css',
    // 'vue-js-modal/dist/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/close.js', ssr: false },
    { src: '~/plugins/socketio', ssr: false },
    '~/plugins/fontawesome.js',
    '~/plugins/axios.js',
    '~/plugins/base64.js',
    '~/plugins/hasRule.js',
    '~/plugins/projectHasProperty.js',
    '~plugins/vue-js-modal.js',
    // { src: '~/plugins/pushe.js', mode: 'client' },
    { src: '~/plugins/moment.js', ssr: false },
    { src: '~/plugins/date.js', ssr: false },
    {src: '~/plugins/vue2-tiny', ssr: false},
    {src: '~/plugins/apexChart', ssr: false},
    {src: '~/plugins/lightbox.js',ssr: false},
    {src: '~/plugins/toggleButton.js',ssr: false},
    {src: '~/plugins/toggleButton1.js',ssr: false},
    { src: '~/plugins/countDown.js', ssr: false },
    { src: '~/plugins/persion.js', ssr: false },
    { src: '~/plugins/carousel.js', ssr: false },
    { src: '~/plugins/toast.js', ssr: false },
    { src: '~/plugins/modal.js', ssr: false },
    { src: '~/plugins/pagination.js', ssr: false },
    { src: '~/plugins/dropzone.js', ssr: false },
    { src: '~/plugins/vueGallery.js', ssr: false },
    { src: '~/plugins/imageUpload.js', ssr: false },
    // '~plugins/imageUpload.js',
    // { src: '~/plugins/crop.js', ssr: false },
    // { src: '~/plugins/uploadImage.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/tailwindcss',
    'nuxt-moment-jalaali',

  ],
  moment: {
    locales: ['fa']
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-sweetalert2',
      {
        confirmButtonColor: '#673AB7',
        cancelButtonColor:'#E4405F'
      }
    ],
    ['nuxt-lazy-load', {
      // Your options
    }],
    'cookie-universal-nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],
  auth: false,

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fa'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },

    transpile: ['vue-image-crop-upload' ],

  },
  server: {
    port: 5000
  }
}
