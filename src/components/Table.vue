<template>
	<div id="wrapper">
		<div class="center grid">
			<vs-row
				align="center"
				justify="space-around"
				direction="column"
				class="main-groups"
			>
				<vs-col>
					<div
						class="center content-inputs"
						style="display: flex; margin-bottom: 10px"
					>
						<vs-input placeholder="search" v-model="search" primary block />
						<vs-tooltip>
							<vs-button shadow>
								<i class="bx bx-search"></i>
							</vs-button>
							<template #tooltip> 입력한 이름으로 검색합니다. </template>
						</vs-tooltip>
					</div>
				</vs-col>
				<vs-col>
					<vs-table v-model="selected">
						<template #thead>
							<vs-tr>
								<vs-th style="width: 3%">
									<vs-checkbox
										:indeterminate="selected.length == users.length"
										v-model="allCheck"
										@change="selected = $vs.checkAll(selected, users)"
									/>
								</vs-th>
								<vs-th
									sort
									@click="users = $vs.sortData($event, users, 'name')"
								>
									Name
								</vs-th>
								<vs-th
									sort
									@click="users = $vs.sortData($event, users, 'email')"
								>
									Email
								</vs-th>
								<vs-th sort @click="users = $vs.sortData($event, users, 'id')">
									Id
								</vs-th>
								<vs-th sort @click="users = $vs.sortData($event, users, 'pw')">
									Pw
								</vs-th>
							</vs-tr>
						</template>
						<template #tbody>
							<vs-tr
								:key="i"
								v-for="(tr, i) in $vs.getPage(users, page, max)"
								:data="tr"
								:is-selected="!!selected.includes(tr)"
							>
								<vs-td checkbox>
									<vs-checkbox :val="tr" v-model="selected" />
								</vs-td>

								<vs-td>
									{{ tr.name }}
								</vs-td>
								<vs-td>
									{{ tr.email }}
								</vs-td>
								<vs-td>
									{{ tr.id }}
								</vs-td>
								<vs-td>
									{{ i % 2 == 0 ? tr.pw : decrypt(tr.pw) }}
								</vs-td>
							</vs-tr>
						</template>
						<template #footer>
							<vs-pagination
								v-model="page"
								:length="$vs.getLength(users, max)"
							/>
						</template>
					</vs-table>
				</vs-col>
				<vs-col>
					<vs-row align="flex-end">
						<vs-col
							vs-type="flex"
							vs-justify="center"
							vs-align="center"
							offset="9"
							w="1"
						>
							<vs-tooltip>
								<vs-button
									style="margin: 0 5px; width: 80%"
									@click="show = true"
								>
									<i class="bx bx-plus"></i>
									<div style="padding-left: 5px">추가</div>
								</vs-button>
								<template #tooltip> 추가 페이지로 이동합니다. </template>
							</vs-tooltip>
						</vs-col>
						<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="1">
							<vs-tooltip>
								<vs-button style="margin: 0 5px; width: 80%">
									<i class="bx bx-minus"></i>
									<div style="padding-left: 5px">삭제</div>
								</vs-button>
								<template #tooltip> 선택한 데이터를 삭제합니다. </template>
							</vs-tooltip>
						</vs-col>
						<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="1">
							<vs-tooltip>
								<vs-button style="margin: 0 5px; width: 100%">
									<i class="bx bx-play"></i>
									<div style="padding-left: 5px">바로실행</div>
								</vs-button>
								<template #tooltip>
									선택한 데이터 조회를 바로 실행합니다.
								</template>
							</vs-tooltip>
						</vs-col>
					</vs-row>
				</vs-col>
			</vs-row>
		</div>
		<div class="center">
			<vs-dialog overflow-hidden v-model="show">
				<template #header>
					<h4 class="not-margin">Add User</h4>
				</template>

				<div class="con-form">
					<vs-input
						v-model="addName"
						placeholder="name"
						block
						style="margin-bottom: 10px"
					/>
					<vs-input v-model="addEmail" placeholder="email" block />
				</div>

				<template #footer>
					<div class="footer-dialog">
						<vs-button block @click="add()"> Add </vs-button>
					</div>
				</template>
			</vs-dialog>
		</div>
	</div>
</template>

<script>
import { getData, createData, User } from "src/database/controller.js";
import { deencrypt, decrypt } from "src/assets/aes.js";

export default {
	name: "table-page",
	data: () => ({
		allCheck: false,
		selected: [],
		search: "",
		page: 1,
		max: 10,
		show: false,
		users: [],
		addName: "",
		addEmail: "",
	}),
	created() {
		getData({ sort: { id: 1 } }).then((datas) => {
			this.users = datas;
		});
	},
	methods: {
		add() {
			const user = new User(
				this.users.length + 1,
				this.addName,
				"1234",
				this.addName,
				this.addEmail,
				""
			);
			createData(user)
				.then((data) => {
					this.$noti({
						notification: this.$vs.notification,
						title: "success",
						text: "성공적으로 추가되었습니다.",
						color: "success",
						icon: `<i class='bx bx-select-multiple' ></i>`,
					});
					this.users.push(user);
					this.show = false;
				})
				.catch((err) => {
					return this.$noti({
						notification: this.$vs.notification,
						title: "failed",
						text: `추가에 실패하였습니다.<br/>${err}`,
						color: "danger",
						icon: `<i class='bx bx-error' ></i>`,
					});
				});
		},
		decrypt,
	},
};
</script>

<style scoped>
#wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
}

.grid {
	width: 80%;
}

.main-groups > .vs-col {
	margin: 10px 0;
	width: 100%;
}
</style>