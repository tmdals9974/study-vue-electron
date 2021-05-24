<template>
	<div id="app">
		<title-bar />
		<router-view />
	</div>
</template>

<script>
import TitleBar from "./components/TitleBar";
export default {
	name: "sample-vue",
	components: { TitleBar },
};
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

body {
	font-family: "Source Sans Pro", sans-serif;
	height: 100vh;
	width: 100vw;
}

#app {
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: column;
}

.vs-notification-parent,
.vs-notification-parent--top-right {
	margin-top: 35px;
}
</style>

