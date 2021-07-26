<template>
    <div class="banner-list"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item  class="breadcrumb-tit">轮播设置</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
            <div class="search-con"></div>
            <div class="btn-con" v-if="!loading">
				<el-button slot="trigger" size="small"  type="primary" v-if="isAdd"  @click="addBanner()">添加轮播图</el-button>
			</div>
        </div>
        <el-tabs type="border-card"  v-model="active" @tab-click="handleTabClick" >
            <el-tab-pane label="供应商城" name="1"></el-tab-pane>
            <el-tab-pane label="合作商城" name="2"></el-tab-pane>
            <div class="operate-con clearfix">
                <div class="search-con"></div>
            </div>
            <div class="table-con">
                <template v-if="data && data.length > 0">
                    <el-table :data="data" border >
                        <el-table-column  label="图片" align="center" >
                            <template slot-scope="scope">
                                <div class="img-con" >
                                    <img :src="scope.row.value" alt="" @click="showImgView(scope.row.value)">
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column> -->
                        <el-table-column prop="goods_id" label="商品ID" align="center" ></el-table-column>
                        <el-table-column prop="update_time" label="添加时间" align="center" ></el-table-column>
                    </el-table>
                </template>
                <template v-if="!data || data.length == 0">
                    <div class="no-data-con" >
                        <div class="absolute-center">
                            <div class="err-info-text ">暂无轮播图</div>
                        </div>
                    </div>
                </template>
            </div>
       	</el-tabs>
         <template v-if="showViewer">
            <el-image-viewer :on-close="closeImgView"  :url-list="showViewImgs" />
        </template> 
    </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: "bannerList",
  data() {
    return {
      active: '1',
      data: [],

      showViewer: false,
      showViewImgs: [],

      loading: false,
      
      isEdit: false, //是否有编辑权限
      isDel: false, //是否有删除权限
      isAdd: false, //是否有添加权限
    };
  },
  components: { ElImageViewer },
  activated() {
      this.initData()
    //   this.handlePermission()
  },	
  methods: {
	// 初始化信息
	initData() {
      this.data = []
      this.showViewer = false
      this.showViewImgs = []
      this.loading = false
	  this.getPicLists()
    },
    // 判断当前页面都有什么权限
	handlePermission() { 
		let that = this;
		that.utils.getPermissionList(that,data =>{
			data.forEach(item =>{
				if(item.title == '编辑') {
					that.isEdit = true
                }	
                if(item.title == '删除') {
					that.isDel = true
                }	
                if(item.title == '添加') {
					that.isAdd = true
				}	
			})
		})
    },
     // 切换供应商城与合作商城
	handleTabClick(tab) {
		this.data = [];
		this.getPicLists()
	},
	// 获取轮播图列表
	getPicLists(isAddEdit) {
        let that = this
        if(isAddEdit) {
            that.loading = false
        } else {
            that.loading = true;
        }
		that.ajax('picLists',{
            page: 1,
            size: 100,
            pic_type: that.active
        },'获取轮播图失败',res =>{
			that.loading = false
			if(res.errno == 0) {
				that.data = res.data.data
			}
		}, err =>{
			that.loading = false
		})
    },
   
    // 显示图片大图
    showImgView(url) {
        if(url) {
            this.showViewer = true
            this.showViewImgs = [url]
        }
    },
    // 关闭显示大图
	closeImgView() {
		this.showViewer = false
		this.showViewImgs = []
	},
  }
};
</script>
<style lang="less">
.banner-list {
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
		.img-con {
            width: 80px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ddd;
            margin: 0 auto;
            cursor: pointer;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }	
    }
    .el-dialog {
        width: 30%;
		.el-form {
			padding: 0 1rem;
			.el-form-item__content {
				.el-input {
					width: 50%;
				}
			}
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409eff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
        }
        .avatar {
            width: 120px;
            height: 120px;
            display: block;
            position: relative;
            .avatar-absolute {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.6)
            }
        }
	}
}

</style>