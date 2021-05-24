<template>
	<main>
		<div class="hidden">
			<vs-sidebar absolute reduce v-model="active" open>
				<template #logo>
					<!-- ...img logo -->
				</template>
				<vs-sidebar-item id="home">
					<template #icon>
						<i class="bx bx-home"></i>
					</template>
					Home
				</vs-sidebar-item>
				<vs-sidebar-item id="market">
					<template #icon>
						<i class="bx bx-grid-alt"></i>
					</template>
					Market Overview
				</vs-sidebar-item>
				<vs-sidebar-group>
					<template #header>
						<vs-sidebar-item arrow>
							<template #icon>
								<i class="bx bx-group"></i>
							</template>
							Social media
						</vs-sidebar-item>
					</template>

					<vs-sidebar-item id="Instagram">
						<template #icon>
							<i class="bx bxl-instagram"></i>
						</template>
						Instagram
					</vs-sidebar-item>
					<vs-sidebar-item id="twitter">
						<template #icon>
							<i class="bx bxl-twitter"></i>
						</template>
						Twitter
					</vs-sidebar-item>
					<vs-sidebar-item id="Facebook">
						<template #icon>
							<i class="bx bxl-facebook"></i>
						</template>
						Facebook
					</vs-sidebar-item>
				</vs-sidebar-group>
				<template #footer>
					<vs-row justify="space-between" align="center">
						<vs-sidebar-item id="1">
							<template #icon>
								<i class="bx bx-cog"></i>
							</template>
							Config
						</vs-sidebar-item>
						<div @click="logout()">
							<vs-sidebar-item id="2">
								<template #icon>
									<i class="bx bx-log-out-circle"></i>
								</template>
								Logout
							</vs-sidebar-item>
						</div>
					</vs-row>
				</template>
			</vs-sidebar>
		</div>

		<div style="width: 100%; height: 100%">
			<router-view></router-view>
		</div>
	</main>
</template>

<script>
export default {
	name: "main-page",
	data: () => ({
		active: "home",
	}),
	methods: {
		logout() {
			localStorage.removeItem("user");
			this.$router.push("/login");
		},
	},
};
</script>

<style scoped>
main {
	display: flex;
	flex-flow: row nowrap;
	height: 100%;
	width: 100%;
	padding-left: 50px;
}

.vs-sidebar-content {
	padding-top: 50px;
}
</style>
