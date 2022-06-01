import { createApp } from 'vue';
import axios from 'axios';
import vSelect from 'vue-select';
import App from './App.vue';
import router from './router';
import 'vue-select/dist/vue-select.css';

const myApp = createApp(App);
myApp.config.globalProperties.$axios = axios;
myApp.use(router);
myApp.component('v-select', vSelect);
myApp.mount('#app');
