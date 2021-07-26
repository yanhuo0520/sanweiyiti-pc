<template>
	<div>
		<nav-menu class="no-print"></nav-menu>
		<bottom class="no-print"></bottom>
		<div class="content">
			<el-scrollbar wrap-class="scrollbar-wrapper">
				<transition name="move" mode="out-in">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</transition>
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
    import bottom from "@/components/bottom";
    import navMenu from "@/components/navMenu";
	export default {
		data() {
			return {

			}
		},
		components: {
			bottom,
	        navMenu
		},
		mounted() {
			if (window.performance.navigation.type == 1) { // 页面被刷新
				let adminType = localStorage.getItem('is_admin')
				let info = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
				if(info && info.id) {
					if(adminType == 4) {
						if(this.$route.path != '/supplyIndex') {
							this.$router.push('/supplyIndex')
						}
					} else if(adminType == 5) {
						if(this.$route.path != '/nzIndex') {
							this.$router.push('/nzIndex')
						}
					} else {
						if(this.$route.path != '/index') {
							this.$router.push('/index')
						}
					}
				} else {
					this.$router.push('/login')
					// this.$message.error('登陆过期,请重新登陆')
				}
				
			}else{ //首次被加载
				// nothing
			}
		},
		methods: {
		},
		
	}
</script>
