<template>
    <div class="president-permission"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">初始化权限</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<!-- <div class="operate-con clearfix">
			<div class="btn-con" v-if="!loading">
				<el-button slot="trigger" size="small"  type="primary" @click="showSetPermissionDialog()" >设置权限</el-button>
			</div>
		</div> -->
		<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="社长权限" name="2-1"></el-tab-pane>
			<el-tab-pane label="区域管理员权限" name="3-1"></el-tab-pane>
			<el-tab-pane label="合作联社权限" name="4-1"></el-tab-pane>

			<el-tab-pane label="农资商城权限" name="0-2"></el-tab-pane>
			<el-tab-pane label="合作商城权限" name="0-3"></el-tab-pane>
			<el-tab-pane label="供应商城权限" name="0-4"></el-tab-pane>
			<div class="table-con">
				<div style="text-align:right">
					<el-button slot="trigger" size="small"  type="primary" @click="showSetPermissionDialog()" >设置权限</el-button>
				</div>
				<el-tree  :data="data"  node-key="mod_id" highlight-current :props="defaultProps"> </el-tree>
			</div>
		</el-tabs>
       

		<el-dialog title="设置权限" :visible.sync="setPermissionDialog" class="post-dialog" @close="closePermissionDialog()">
			<el-tree :check-strictly="isStrictly" :data="permissionData" show-checkbox default-expand-all node-key="mod_id" ref="tree" highlight-current :props="defaultProps"> </el-tree>
			<div slot="footer" class="dialog-footer">
				<el-button @click="setPermissionDialog = false">取 消</el-button>
				<el-button type="primary" @click="permissionSubmit()" :loading="permissionSubmitLoading">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
export default {
  name: "presidentPermission",
  data() {
    return {
	  activeName: '2-1',
      data: [],
      loading: false,

	setPermissionDialog: false, //设置权限dialog弹窗
	curModIdArr: [], // 当前权限数组
	permissionData: [],
	defaultProps: {
		children: 'child',
		label: 'title'
	},

	permissionSubmitLoading: false,
	isStrictly: true, // 设置权限选中复选框是否禁止父子级联动选择

	isSetPermission: true, //是否有设置权限 权限
    };
  },
  activated() {
	  this.initData()
  },	
  methods: {
	// 初始化信息
	initData() {
      this.data = []
      this.loading = false
      this.curModIdArr = []
      this.permissionData = []
      this.permissionSubmitLoading = false
      this.isStrictly = true
      this.getPresidentPermission()
      this.getModuleLists()
	  this.handlePermission()
	},
	// 判断当前页面都有什么权限
	handlePermission() { 
		let that = this;
		that.utils.getPermissionList(that,data =>{
			data.forEach(item =>{
				if(item.title == '设置权限') {
					that.isSetPermission = true
				}
			})
		})
	},
	// 切换 年月日
     handleClick(tab, event) {
		this.data = []
		this.getPresidentPermission()
    },
	// 获取当前权限列表
	getPresidentPermission() {
        let that = this
        that.loading = true
		that.ajax('moduleLists',{
			post_id: that.activeName.split('-')[0],
			type: that.activeName.split('-')[1],
		},'获取权限列表失败',res =>{
             that.loading = false
			if(res.errno == 0) {
                that.data = res.data
			}
		}, err =>{
             that.loading = false
		})
	},
	// 获取所有权限列表
	getModuleLists() {
		let that = this
		that.ajax('moduleLists',{
			post_id: 0,
		},'获取所有权限列表失败',res =>{
			if(res.errno == 0) {
				that.permissionData = res.data
			}
		}, err =>{
		})
	},
	// 显示设置权限dialog弹窗
	showSetPermissionDialog(row) {
		this.setPermissionDialog = true
		setTimeout(() =>{
			this.$refs.tree.setCheckedKeys(this.curModIdArr);
			this.isStrictly = false
		})

	},
	// 关闭设置权限dialog弹窗
	closePermissionDialog() {
		this.isStrictly = true
		this.$refs.tree.setCheckedKeys([]);
	},
	// 设置权限确定按钮
	permissionSubmit() {
		let that = this;
		that.permissionSubmitLoading = true
		that.ajax('postAddModule',{
			post_id: that.activeName,
			mod_id_str: that.$refs.tree.getCheckedKeys().join(',')
		},'设置权限失败',res =>{
			that.permissionSubmitLoading = false
			if(res.errno == 0) {
				that.$message.success('设置成功')
				that.$refs.tree.setCheckedKeys([]);
				that.setPermissionDialog = false
                that.isStrictly = true
                that.getPresidentPermission()
			}
		}, err =>{
			that.permissionSubmitLoading = false
		})
	},

  }
};
</script>
<style lang="less">
.president-permission {
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

</style>