import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'COVID 2019 Russia'
	}
});

export default app;