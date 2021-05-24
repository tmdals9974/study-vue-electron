import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'boxicons/css/boxicons.min.css';
Vue.use(Vuesax);

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;
Vue.prototype.$apiUrl = 'http://localhost:5000';
Vue.prototype.$hasValue = string => {
	return string && string !== '' && string !== null;
};
Vue.prototype.$noti = ({ notification, title, text, color, icon }) => {
	const noti = notification({
		icon,
		color,
		position: 'top-right',
		title,
		text,
		flat: true,
		duration: null,
		progress: 'auto'
	});
};

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
