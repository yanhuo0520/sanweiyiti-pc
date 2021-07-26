<template>
    <div class="nz-index" v-loading="loading">
		<img class="welcome-bg" src="../../images/welcome-bg.png" alt="">
    </div>
</template>
<script>
export default {
  name: "nzIndex",
  data() {
    return {
      loading: false,
    };
  },
  activated() {
    this.loading = true
    this.utils.checkToken(this,res =>{
      if(res && res.errno == 0) {
        this.loading = false
      } else {
        this.loading = false
      }
	})
  },
  methods: {
   
  }
};
</script>
<style lang="less">
.nz-index {
  min-height: 75vh;
  padding: 20px;
	.welcome-bg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		height: 40vh;
	}
}

</style>