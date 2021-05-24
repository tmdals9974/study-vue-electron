import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: { name: 'login-page' }
		},
		{
			path: '/login',
			name: 'login-page',
			component: require('@/components/Login').default,
			beforeEnter(to, from, next) {
				if (localStorage.getItem('user')) {
					return next({ path: 'main' });
				}
				next();
			}
		},
		{
			path: '/main',
			name: 'main-page',
			component: require('@/components/Main').default,
			children: [
				{
					path: '',
					name: 'table-page',
					component: require('@/components/Table').default
				}
			],
			beforeEnter(to, from, next) {
				if (!localStorage.getItem('user')) {
					return next({ path: '/login' });
				}
				next();
			}
		}
	]
});
