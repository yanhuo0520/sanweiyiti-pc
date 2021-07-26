<template>
    <div class="point-list"  v-loading="loading">
		  <div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item  class="breadcrumb-tit">积分列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
      <div class="search-con">
          <el-form class="clearfix"  label-width="65px">
              <el-form-item label="用户名称">
                  <el-input v-model="userName" placeholder="请输入用户名称" clearable></el-input>
              </el-form-item>
              <el-button  type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
          </el-form>
      </div>
		</div>
        <div class="table-con">
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
					<el-table-column prop="user_id" label="用户ID" width="100"  align="center"></el-table-column>
                    <el-table-column prop="user_name" label="用户名称" align="center" ></el-table-column>
                    <el-table-column prop="zonginter" label="积分余额" align="center"></el-table-column>
                    <el-table-column  label="操作" align="center" >
						<template slot-scope="scope">
							<el-button plain v-if="scope.row.user_pwd_id" type="primary" size="small"  @click="detail(scope.row)">积分明细</el-button>
						</template>
					</el-table-column>
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无积分列表</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  name: "pointList",
  data() {
    return {
	  userName: '',

      data: [],
	  curPage: 1,
	  totalPage: null,
	  loading: false,
    };
  },
  activated() {
    let isRefresh = this.$route.query.isRefresh // 1不刷新 2或者undefined刷新
    if(isRefresh && isRefresh == 1) return
    this.initData()
  },	
  methods: {
	// 初始化信息
	initData() {
		this.data = []
		this.curPage = 1
		this.totalPage = null
		this.getPointList()
  },
	// 搜索
	search() {
		this.data = []
        this.curPage = 1
        this.totalPage = null
        this.getPointList()
	},
	// 获取积分列表
	getPointList() {
		let that = this
    that.loading = true
		that.ajax('userInterLists',{
            page: that.curPage,
			size: 10,
			user_name: that.userName,
        },'获取积分列表失败',res =>{
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
		this.getPointList()
	},
	// 积分明细
	detail(row) {
		if(row.inter_id) {
			this.$router.push({
				path: '/pointDetailList',
				query: {
					id: row.inter_id,
					userName: row.user_name
				}
			})
		} else {
			this.$message.error('该用户数据异常,暂无积分明细ID')
		}
		
	}
  }
};
</script>
<style lang="less">
.point-list {
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
	
	}
}
.admin-tmp-con { 
  padding: 0;
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  .breadcrumb-con {
    margin-bottom: 0;
  }
  .admin-con {
    display: flex;
    width: 100%;
    height: 100%;
    .org-menu-con {
      width: 16rem;
      height: 100%;
      background: #F8FCFF;
      .level2-title {
          color: #8F9BA7;
      }
      .level2-title::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 35px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #8F9BA7;
        transform: translateY(-50%);
      }
      .is-opened {
        .el-icon-arrow-down {
          color: #409EFF;
        }
        .is-active {
          .level2-title {
            color: #409EFF;
          }
          .level2-title::after {
            background: #409EFF;
          }
        }
        
      }
      .is-active {
        background: #fff!important;
      }
      .menu-title {
        width: 10rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .menu-item-title {
        width: 7.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .no-menu-con {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .menu-absolute-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          .text {
            font-size: 0.9rem;
            color: #999;

          }
        }
      }
    }
    .right-con {
      position: relative;
      width: calc(100% - 16rem);
      height: 99%;
      padding: 10px;
      .info-con {
        position: relative;
        width: 100%;
        padding-top: 10px;
      }
      .operate-con {
        padding: 0;
      }
      .operate-con+.el-table {
        margin-top: 10px;
      }
    }
    
    .hide-menu {
      width: 54px;
    }
    .page-con {
      position: absolute;
      bottom: 0;
      right: 5rem;
    }
  }
}

</style>