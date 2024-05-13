

import { createApp } from 'vue'
import Vuex from 'vuex'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//Vuetify

import "Vuetify/styles"
import { createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'


import App from './App.vue'
import router from './router'
import store from './stores/store';

import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

// Vuetify
const vuetify = createVuetify({
    components,
    directives

})

//Firebase
app.use(VueFire,{
    firebaseApp,
    modules: [VueFireAuth()]
})

app.component('VueDatePicker', VueDatePicker);
app.use(vuetify)
app.use(store)
app.use(createPinia())
app.use(router)

app.mount('#app')