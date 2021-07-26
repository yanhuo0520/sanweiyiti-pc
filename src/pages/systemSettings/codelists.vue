<template>
    <div class="code-list" v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">短信发送记录</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
			
		</div>
        <div class="table-con" >
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="code" label="验证码" align="center"></el-table-column>
                    <el-table-column prop="add_time" label="发送时间" align="center"></el-table-column>
                    <el-table-column prop="expire_time" label="结束时间" align="center"></el-table-column>
                    <el-table-column prop="status" label="发送状态" align="center"></el-table-column>
                    <el-table-column prop="result" label="失败描述" align="center"></el-table-column>
                    <el-table-column prop="contents" label="短信内容" align="center"></el-table-column>
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无短信发送记录</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  name: "codelists",
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
	  this.getSystemCodelist()
	},
	// 获取股金利率列表
	getSystemCodelist(isAddEdit) {
		let that = this
        that.loading = true;
		that.ajax('codelists',{
            page: that.curPage,
			size: 10,
        },'获取短信列表失败',res =>{
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
		this.getSystemCodelist()
	},
  }
};
</script>
<style lang="less">
.code-list {
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