<template>
	<div id="wrapper">
		<div class="grid">
			<vs-row
				align="center"
				justify="space-around"
				direction="column"
				class="input-groups"
			>
				<vs-col w="2">
					<div class="center content-inputs">
						<vs-input label-placeholder="email" v-model="email" block primary>
							<template #icon>
								<i class="bx bx-user"></i>
							</template>
							<template v-if="validEmail" #message-success>
								Email Valid
							</template>
							<template v-if="!validEmail && email !== ''" #message-danger>
								Email Invalid
							</template>
						</vs-input>
					</div>
				</vs-col>
				<vs-col w="2">
					<div class="center content-inputs">
						<vs-input
							type="password"
							label-placeholder="pw"
							v-model="pw"
							primary
							block
							@focus="pwFocused = true"
							@keypress.enter="login()"
						>
							<template #icon>
								<i class="bx bx-lock-open-alt"></i>
							</template>
							<template v-if="pwFocused && pw === ''" #message-danger>
								Required
							</template>
						</vs-input>
					</div>
				</vs-col>
				<vs-col w="2" align="center">
					<vs-button gradient block @click="login()"> Login </vs-button>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
export default {
	name: "login-page",
	data: () => ({
		email: "",
		pw: "",
		pwFocused: false,
	}),
	methods: {
		login() {
			if (!this.$hasValue(this.email)) {
				return this.$noti({
					notification: this.$vs.notification,
					title: "warning",
					text: "이메일을 입력해주세요.",
					color: "warn",
					icon: `<i class='bx bx-error' ></i>`,
				});
			}

			if (!this.validEmail) {
				return this.$noti({
					notification: this.$vs.notification,
					title: "warning",
					text: "이메일 형식이 올바르지 않습니다.",
					color: "warn",
					icon: `<i class='bx bx-error' ></i>`,
				});
			}

			if (!this.$hasValue(this.pw)) {
				return this.$noti({
					notification: this.$vs.notification,
					title: "warning",
					text: "비밀번호를 입력해주세요.",
					color: "warn",
					icon: `<i class='bx bx-error' ></i>`,
				});
			}

			this.$http
				.post(`${this.$apiUrl}/login`, {
					email: this.email,
					pw: this.pw,
				})
				.then((res) => {
					if (res.data.result === "1") {
						localStorage.setItem(
							"user",
							JSON.stringify({
								email: this.email,
								pw: this.pw,
							})
						);
						this.$router.push("/main");
					} else {
						this.$noti({
							notification: this.$vs.notification,
							title: "failed",
							text:
								"로그인에 실패하였습니다. <br/> 이메일 또는 비밀번호를 확인해주세요.",
							color: "danger",
							icon: `<i class='bx bx-error' ></i>`,
						});
					}
				});
		},
	},
	computed: {
		validEmail() {
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
		},
	},
};
</script>

<style scoped>
#wrapper {
	background: radial-gradient(
		ellipse at top left,
		rgba(255, 255, 255, 1) 40%,
		rgba(229, 229, 229, 0.9) 100%
	);
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
}

.grid {
	width: 50vw;
}

.input-groups .vs-col {
	margin: 10px 0;
	width: 100%;
}
</style>
