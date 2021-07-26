<template>
    <div class="log-list"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">系统日志</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
			
		</div>
        <div class="table-con">
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                    <el-table-column prop="name" label="接口名称" align="center"></el-table-column>
                    <el-table-column prop="ip" label="请求IP" align="center"></el-table-column>
                    <el-table-column prop="contents" label="操作内容" align="center"></el-table-column>
                    <el-table-column prop="from" label="客户端请求来源" align="center"></el-table-column>
                    <el-table-column prop="user_name" label="操作人" align="center"></el-table-column>
                    <el-table-column prop="post_name" label="工作岗位" align="center"></el-table-column>
					<el-table-column prop="add_time" label="请求时间" align="center"></el-table-column>
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无系统日志列表</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  name: "logList",
  data() {
    return {
      data: [],
	  curPage: 1,
	  totalPage: null,
	  loading: false,
    };
  },
  activated() {
	  this.initData()
  },	
  methods: {
	// 初始化信息
	initData() {
      this.data = []
	  this.curPage = 1
	  this.totalPage = null
	  this.getSystemLogList()
	},
	// 获取系统日志列表
	getSystemLogList(isAddEdit) {
		let that = this
        that.loading = true;
		that.ajax('systemLog',{
            page: that.curPage,
			size: 10,
        },'获取系统日志列表失败',res =>{
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
		this.getSystemLogList()
	},
  }
};
</script>
<style lang="less">
.log-list {
  padding: 20px;
  .el-pagination{
        float: right;
        margin-top: 30px;
        margin-bottom: 30px;
	}
	.operate-con {
	  padding: 10px 0;
    .search-con {
	  float: left;
	  width: 80%;
	  .el-form-item {
		width: 28%;
		float: left;
		margin-bottom: 0;
		.el-form-item__label {
			font-size: 0.9rem;
		}
		.el-form-item__content {
			margin-right: 30px;
			.el-input {
			width: 100%;
			.read-idCard {
				color: #3B6AF1;
				background: #F0F8FF;
				font-size: 0.75rem;
				cursor: pointer;
			}
		}
		}
		
	}
    }
    .btn-con {
      float:right;
    }
  }
    .table-con {
		.inner-table-tit-con {
			display: flex;
			align-content: center;
			justify-content: space-between;
			.inner-table-tit {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 1.2rem;
				padding-bottom: 1.25rem;
				text-align: center;
				.btn-con {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}	
	}


 
}

</style>