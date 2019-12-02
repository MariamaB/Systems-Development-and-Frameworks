import Vue from 'vue';
import App from './App.vue';
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false;


// Vue.use(BootstrapVue);

// const fetchOptions = {
//     mode: 'no-cors',
// };

new Vue({
    apolloProvider: createProvider(),
    render: (h) => h(App)
}).$mount('#app');