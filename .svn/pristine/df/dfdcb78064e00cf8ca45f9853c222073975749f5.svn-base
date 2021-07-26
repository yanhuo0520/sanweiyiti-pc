<template>
    <div class="no-permission-con">
    <div class="breadcrumb-con" v-if="lastPathName">
			<img class="left-icon" src="../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>当前点击页面</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">{{lastPathName}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<img class="no-permission" src="../images/no-permission-bg.png" alt="">
    </div>
</template>
<script>
export default {
  name: "noPermission",
  data() {
    return {
      lastPathName: '',
    };
  },
  activated() {
    this.lastPathName = this.$route.query.pathName
  },
  methods: {
	
  }
};
</script>
<style lang="less">
.no-permission-con {
  padding: 20px;
	.no-permission {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		height: 40vh;
	}
}

</style>