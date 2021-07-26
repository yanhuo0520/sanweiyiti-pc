<template>
    <div class="point-detail-list"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>供应商城</el-breadcrumb-item>
					<el-breadcrumb-item  :to="{ path: '/pointList' }">积分列表</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">{{userName ? ('【'+userName+'】') : ''}}的积分明细</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" style="margin-right:1rem" @click="initData()">刷新</el-button>
            <div class="back-con" @click="goBack">
				<img class="back-icon" src="../../../images/breadcrumb-back-icon.png" alt="">
				<span class="back-text">返回上一页</span>
			</div>
		</div>
		<div class="operate-con clearfix">
            <div class="search-con"></div>
		</div>
        <div class="table-con">
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
					<el-table-column prop="user_pwd_id" label="用户ID" width="70"  align="center"></el-table-column>
                    <el-table-column prop="type" label="积分增减类型" align="center" ></el-table-column>
                    <el-table-column prop="num" label="积分" align="center"></el-table-column>
                    <el-table-column prop="add_time" label="记录时间" align="center"></el-table-column>
					 <el-table-column prop="coopera_name" label="所属合作社"  ></el-table-column>
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">{{userName ? ('【'+userName+'】') : ''}}暂无积分列表</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  name: "pointDetailList",
  data() {
    return {
      userId: '',
	  userName: '',

      data: [],
	  curPage: 1,
	  totalPage: null,
	  loading: false,

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      isRefresh: 1,
    };
  },
  activated() {
	//判断是否为管理员
    let adminType = localStorage.getItem('is_admin')
    if(adminType && Number(adminType) >= 1) {
        this.isAdmin = true
        this.adminType = adminType
    }
    let id = this.$route.query.id
    if(id) {
        this.userId = id
        this.userName = this.$route.query.userName
    } else {
        this.userId = null
        this.userName = null
    }
	this.initData()
  },	
  methods: {
       // 返回上一页
    goBack() {
        this.$router.push({
            path: '/pointList',
            query:{
                isRefresh: this.isRefresh
            }
        })
    },
	// 初始化信息
	initData() {
      this.data = []
	  this.curPage = 1
	  this.totalPage = null
      this.getPointDetailList()
	},
	// 获取积分明细列表
	getPointDetailList() {
		let that = this
        that.loading = true;
		that.ajax('userInterLogLists',{
            page: that.curPage,
			size: 10,
			inter_id: that.userId
        },'获取积分明细列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
                that.curPage = Number(res.data.current_page)
				that.totalPage = res.data.total
				that.data = res.data.data
			}
		}, err =>{
			that.loading = false
		})
    },
    // 处理分页
	handleCurPageChange(val) {
		this.curPage = val;
		this.getPointDetailList()
	},
  }
};
</script>
<style lang="less">
.point-detail-list {
  padding: 20px;
  .el-pagination{
        float: right;
        margin-top: 30px;
        margin-bottom: 30px;
	}
	.operate-con {}
    .table-con {
	
	}


 
}

</style>