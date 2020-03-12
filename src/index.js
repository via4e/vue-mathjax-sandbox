import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store'
import Vuetify from 'vuetify'

// Styles
import 'vuetify/dist/vuetify.min.css'
import './assets/scss/style.scss'

// Vue.use(VueMermaid)
Vue.use(Vuetify)
Vue.use(VueRouter)

const vuetify = new Vuetify({})
const router = new VueRouter({ routes })
/* eslint-disable-next-line no-new */
new Vue({
  router,
  store,
  vuetify,
  el: '#app',
  render: h => h(App)
})
