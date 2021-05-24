<template>
	<header class="grid">
		<vs-row id="title-bar" justify="space-between" style="height: 35px">
			<vs-col id="title-bar-dragable" w="11">
				<img id="logo" src="~@/assets/logo.png" alt="electron-vue" />
			</vs-col>
			<vs-col w="1">
				<vs-row justify="space-between" class="button-group">
					<vs-col w="4" align="center">
						<div @click="minimizeWindow()">
							<i class="bx bx-minus"></i>
						</div>
					</vs-col>
					<vs-col w="4" align="center">
						<div @click="maximizeWindow()">
							<i class="bx bx-windows"></i>
						</div>
					</vs-col>
					<vs-col w="4" align="center">
						<div @click="closeWindow()">
							<i class="bx bx-x"></i>
						</div>
					</vs-col>
				</vs-row>
			</vs-col>
		</vs-row>
	</header>
</template>

<script>
import { remote } from "electron";

const getWindow = () => remote.getCurrentWindow();

export default {
	name: "title-bar-page",
	methods: {
		minimizeWindow() {
			console.log(getWindow());
			getWindow().minimize();
		},
		maximizeWindow() {
			const window = getWindow();
			window.isMaximized() ? window.unmaximize() : window.maximize();
		},
		closeWindow() {
			getWindow().hide();
		},
	},
};
</script>

<style scoped>
header {
	z-index: 9999999;
	background: #dfe2e7;
}

#logo {
	padding: 5px 0 5px 10px;
	height: 100%;
}

#title-bar-dragable {
	-webkit-app-region: drag;
}

.vs-row {
	height: 100%;
}

.vs-col {
	height: 100%;
}

.button-group > .vs-col:hover {
	background: grey;
}

.button-group > .vs-col > i {
	padding-top: 10px;
}

.button-group > .vs-col > div {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
