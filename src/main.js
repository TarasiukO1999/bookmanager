import { createApp } from 'vue'
import App from "@/App.vue";

import router from './router'
import store from './store';
import vuetify from './lib/vuetify';

createApp(App).use(vuetify).use(router).use(store).mount("#app");
