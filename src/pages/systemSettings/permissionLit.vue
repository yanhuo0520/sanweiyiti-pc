<template>
    <div class="permission-list"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">权限列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div style="text-align:center">
			<el-button size="mini"   @click="changeRole()">{{isDeveloper ? '切换普通权限' : '切换开发者'}}</el-button>
		</div>
		<template v-if="!isDeveloper">
			<el-tabs style="margin-top:10px" type="border-card" v-model="tabActive" @tab-click="changeTab">
				<el-tab-pane label="三位一体" name="1"></el-tab-pane>
				<el-tab-pane label="农资商城" name="2"></el-tab-pane>
				<el-tab-pane label="合作商城" name="3"></el-tab-pane>
				<el-tab-pane label="供应商城" name="4"></el-tab-pane>
				<el-tree  :data="data"  node-key="mod_id" highlight-current :props="defaultProps"> </el-tree>
			</el-tabs>
		</template>
		<template v-else>
			<div class="operate-con clearfix">
				<div class="btn-con">
					<el-button size="small" type="primary" @click="addEditLevel1(1)">添加一级权限</el-button>
				</div>
			</div>
			<el-alert style="margin-bottom:1rem; width: 60%;" title="【开发者专属权限】触发添加删除等操作后,需手动点击右上角刷新按钮,重新获取数据" type="warning" effect="dark" :closable="false"> </el-alert>
			<div class="table-con">
				<el-tree :data="data" node-key="mod_id"  :expand-on-click-node="false" v-if="data && data.length > 0">
					<div class="custom-tree-node clearfix" slot-scope="{node}">
						<div class="info-con">
							<div class="menu-con">
								<div class="tit-con">
									<div class="tit-desc">名称:</div>
									<div class="title">{{node.data.title}}</div>
								</div>
								<div class="tit-con" style="margin-top:0.5rem"> 
									<div class="tit-desc">路径:</div>
									<div class="title">{{node.data.url}}</div>
								</div>
							</div>
							<div class="btn-con" >
								<div class="btns">
									<template v-if="node.level == 1">
										<el-button size="mini" @click="addEditLevel1(2,node.data)">编辑</el-button>
										<el-button type="primary"  @click="addEditLevel2(1,node.data,node.children)" size="mini" >添加子级</el-button>
										<!-- <el-button type="danger" size="mini" >删除 </el-button> -->
									</template>

									<template v-if="node.level == 2">
										<el-button size="mini" @click="addEditLevel2(2,node.data,node.key)">编辑</el-button>
										<!-- <el-button type="danger" size="mini" >删除 </el-button> -->
									</template>
								</div>
							</div>
						</div>
						<div class="features clearfix" v-if="!node.data.children || node.data.children.length == 0">
							<!-- <el-tag  v-for="(item,index) in node.children" :key="index" closable :disable-transitions="false" @close="handleClose(item)"> {{item.title}} </el-tag> -->
							<div class="tit">功能列表</div>
							<div class="tags clearfix">
								<!-- <el-tag  v-for="(item,index) in 5" :key="index" closable :disable-transitions="false" @close="handleClose(item)"> {{item}} </el-tag> -->
								<div class="data-item" v-for="(item,index) in node.data.child" :key="index">
									<div class="text">{{item.title}}</div>
									<div class="btn-con">
										<el-button   type="primary" size="small" @click="addEditLevel3(2,item)" >编辑</el-button>
										<!-- <el-button   type="danger" size="small" @click="delLevel3(node.data.child,item,index)">删除</el-button> -->
									</div>
								</div>
								<el-button type="primary"  @click="addEditLevel3(1,node.data)" size="mini" >添加功能</el-button>
							</div>
						</div>
					</div>
				</el-tree>
				<template v-if="!data || data.length == 0">
					<div class="no-data-con" >
						<div class="absolute-center">
							<div class="err-info-text ">暂无权限列表</div>
						</div>
					</div>
				</template>
			</div>
		</template>

        <el-dialog :title="level1Type == 1 ? '添加一级权限' : '编辑一级权限'" :visible.sync="level1FormDialog" class="permission-dialog">
			<el-form  ref="level1Form"  :model="level1Form" :rules="level1Rules" label-width="100px" class="permission-form clearfix" >
				<el-form-item label="菜单名称:" prop="title">
					<el-input v-model="level1Form.title" placeholder="请输入菜单名称"></el-input>
				</el-form-item>
                <el-form-item label="菜单路径:" prop="url">
					<el-input v-model="level1Form.url" placeholder="请输入菜单路径"></el-input>
				</el-form-item>
				<el-form-item label="菜单未选中图标:" prop="icon">
					<el-input v-model="level1Form.icon" placeholder="请输入菜单未选中图标名称"></el-input>
				</el-form-item>
				<el-form-item label="菜单选中图标:" prop="check_icon">
					<el-input v-model="level1Form.check_icon" placeholder="请输入菜单选中图标名称"></el-input>
				</el-form-item>
				<el-form-item label="菜单排序:" prop="orderby">
					<el-input v-model="level1Form.orderby" placeholder="请输入数字"></el-input>
				</el-form-item>
				<el-form-item label="选择权限:" prop="type">
					<el-select v-model="permissionType" placeholder="请选择">
						<el-option
						v-for="item in permissionOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="是否为快捷键:" prop="is_quick">
					<el-radio-group v-model="level1Form.is_quick">
                        <el-radio label="0">否</el-radio>
                        <el-radio label="1">是</el-radio>
                    </el-radio-group>
				</el-form-item>
				 <el-form-item label="快捷键名称:" prop="quick_title" v-if="level1Form.is_quick == 1">
					<el-input v-model="level1Form.quick_title" placeholder="请输入快捷键名称"></el-input>
				</el-form-item>
				 <el-form-item label="快捷键图标路径:" prop="quick_icon" v-if="level1Form.is_quick == 1">
					<el-input v-model="level1Form.quick_icon" placeholder="请输入快捷键图标路径"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="level1FormDialog = false">取 消</el-button>
				<el-button type="primary" @click="level1FormSubmit('level1Form')" :loading="level1SubmitLoading">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog :title="level2Type == 1 ? '添加二级权限' : '编辑二级权限'" :visible.sync="level2FormDialog" class="permission-dialog">
			<el-form  ref="level2Form"  :model="level2Form" :rules="level2Rules" label-width="100px" class="permission-form clearfix" >
				<el-form-item label="菜单名称:" prop="title">
					<el-input v-model="level2Form.title" placeholder="请输入菜单名称"></el-input>
				</el-form-item>
                <el-form-item label="菜单路径:" prop="url">
					<el-input v-model="level2Form.url" placeholder="请输入菜单路径"></el-input>
				</el-form-item>
				<el-form-item label="菜单未选中图标:" prop="icon">
					<el-input v-model="level2Form.icon" placeholder="请输入菜单未选中图标名称"></el-input>
				</el-form-item>
				<el-form-item label="菜单选中图标:" prop="check_icon">
					<el-input v-model="level2Form.check_icon" placeholder="请输入菜单选中图标名称"></el-input>
				</el-form-item>
				<el-form-item label="菜单排序:" prop="orderby">
					<el-input v-model="level2Form.orderby" placeholder="请输入数字"></el-input>
				</el-form-item>
                <el-form-item label="是否为快捷键:" prop="is_quick">
					<el-radio-group v-model="level2Form.is_quick">
                        <el-radio label="0">否</el-radio>
                        <el-radio label="1">是</el-radio>
                    </el-radio-group>
				</el-form-item>
				 <el-form-item label="快捷键名称:" prop="quick_title" v-if="level2Form.is_quick == 1">
					<el-input v-model="level2Form.quick_title" placeholder="请输入快捷键名称"></el-input>
				</el-form-item>
				 <el-form-item label="快捷键图标路径:" prop="quick_icon" v-if="level2Form.is_quick == 1">
					<el-input v-model="level2Form.quick_icon" placeholder="请输入快捷键图标路径"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="level2FormDialog = false">取 消</el-button>
				<el-button type="primary" @click="level2FormSubmit('level2Form')" :loading="level2SubmitLoading">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
export default {
  name: "permissionLit",
  data() {
    return {
	  isDeveloper: false, // 是否为开发者
	  
	  tabActive: 1,// 1-三位一体 2农资商城 3合作商城 4供应商城

      data: [],
	  loading: false,
	  defaultProps: {
		children: 'child',
		label: 'title'
	},
      
      level1Type: '',
		level1FormDialog: false, //1级权限form表单弹窗
		level1Form: {
		module: '1',
		level: '1',
		visible: '1',
		parent_id: '',
		url: '',
		title: '',
		orderby: '',
		is_quick: '0',
		quick_title: '',
		type:''
      },
      level1Rules: {
        loan_term_id: [
              { required: true, message: '请选择借款期限', trigger: 'change' }
        ],
        loan_permission: [
              { required: true, message: '请输入借款利率', trigger: 'blur' }
        ],
        overdue_permission: [
              { required: true, message: '请输入借款逾期率', trigger: 'blur' }
            ],
      },
      curLevel1Index: '', // 当前操作权限下标
	  level1SubmitLoading: false,
	  
	  level2Type: '',
		level2FormDialog: false, //1级权限form表单弹窗
		level2Form: {
		module: '1',
		level: '2',
		visible: '1',
		parent_id: '',
		url: '',
		title: '',
		icon: '',
		check_icon: '',
		orderby: '',
		is_quick: '0',
		quick_title: '',
		type: ''
      },
      level2Rules: {
        loan_term_id: [
              { required: true, message: '请选择借款期限', trigger: 'change' }
        ],
        loan_permission: [
              { required: true, message: '请输入借款利率', trigger: 'blur' }
        ],
        overdue_permission: [
              { required: true, message: '请输入借款逾期率', trigger: 'blur' }
            ],
      },
      curLevel2Index: '', // 当前操作权限下标
	  level2SubmitLoading: false,
	  
	  permissionType: 1, //当前权限
	  permissionOptions: [{
		  value: 1,
		  label: '三位一体权限'
	  },{
		  value: 2,
		  label: '农资商城权限'
	  },{
		  value: 3,
		  label: '合作商城权限'
	  },{
		  value: 4,
		  label: '供应商城权限'
	  }]
    };
  },
  activated() {
	//   if(this.isDeveloper) {
	  	this.initData()
	//   } else {
	// 	this.$router.push({
	// 		path: '/noPermission',
	// 		query: {
	// 			pathName: '权限列表'
	// 		}
	// 	})
	//   }
  },	
  methods: {
	// 初始化信息
	initData() {
	  this.data = []
	  this.permissionType = 1
	  this.getModuleLists()
	},
	// 更改权限
	changeRole() {
		if(!this.isDeveloper) {
			this.$prompt('请输入开发者暗号?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				inputPlaceholder: '请输入开发者暗号',
				center: true
			}).then(({ value }) => {
				if(value != '007') {
					this.$message.error('暗号错误!')
					return
				}
				this.isDeveloper = true
				
			}).catch(() => {});
			return
		}
		this.isDeveloper = !this.isDeveloper
	},
	// 切换tab栏获取对应权限列表
	changeTab(tab) {
		this.data = []
		this.getModuleLists()
	},
	// 获取权限列表
	getModuleLists(isAddEdit) {
		let that = this
		that.loading = true;
		let userInfo = JSON.parse(localStorage.getItem('userInfo'))
		that.ajax('moduleLists',{
			post_id: 0,
			type: that.tabActive
		},'获取权限列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
				res.data.forEach(item =>{
					item.children = item.child
				})
				that.data = res.data
			}
		}, err =>{
			that.loading = false
		})
	},
	// 添加修改一级菜单
    addEditLevel1(type,row,index) {
       if(type == 1) {
            this.level1Form = {
               module: '1',
               level: '1',
               visible: '1',
               parent_id: '',
               url: '',
			   title: '',
			   icon: '',
			   check_icon: '',
               orderby: '',
               is_quick: '0',
			   quick_title: '',
			   quick_icon: '',
			   type: this.permissionType
            }
        } else {
            this.level1Form = {
			   mod_id: row.mod_id,
               module: '1',
               level: '1',
               visible: '1',
               parent_id: '',
               url: row.url,
			   title: row.title,
			   icon: row.icon,
			   check_icon: row.check_icon,
               orderby: row.orderby,
               is_quick: row.is_quick+'',
			   quick_title: row.quick_title,
			   quick_icon: row.quick_icon,
			   type: row.type
            }
		}
        this.level1Type = type
        this.level1FormDialog = true
        this.curLevel1Index = index
    },
    // level1form表单提交
    level1FormSubmit(formName) {
        let that = this;
		let type = that.level1Type
		that.$refs[formName].validate((valid) => {
          if (valid) {
              that.level1SubmitLoading = true
			  let params = JSON.parse(JSON.stringify(that.level1Form))
			  params.type = that.permissionType
              that.ajax('moduleAdd',params,(type == 1 ? '添加' : '编辑')+ '失败',res =>{
                that.level1SubmitLoading = false
                if(res.errno == 0) {
					that.$message.success((type == 1 ? '添加' : '编辑')+'成功')
					that.resetForm(formName)
					that.level1FormDialog = false
                }
              }, err =>{
                   that.level1SubmitLoading = false
              })
          } else {
            setTimeout(()=>{
                let isError= document.getElementsByClassName("is-error");
                let firstErrInput = isError[0].querySelector('input')
				firstErrInput.focus();
            },100);
            return false;
          }
        });
	},
	// 添加修改二级菜单
	addEditLevel2(type,row) { // type 1-添加 2-修改
       if(type == 1) {
            this.level2Form = {
               module: '1',
               level: '2',
               visible: '1',
			   parent_id: row.mod_id,
			   type: row.type,
               url: '',
			   title: '',
			   icon: '',
			   check_icon: '',
               orderby: '',
               is_quick: '0',
			   quick_title: '',
			   quick_icon: '',

            }
        } else {
            this.level2Form = {
			   mod_id: row.mod_id,
               module: '1',
               level: '2',
               visible: '1',
               parent_id: row.parent_id,
               url: row.url,
			   title: row.title,
			   icon: row.icon,
			   check_icon: row.check_icon,
               orderby: row.orderby,
               is_quick: row.is_quick+'',
			   quick_title: row.quick_title,
			   quick_icon: row.quick_icon,
			   type: row.type
            }
		}
        this.level2Type = type
        this.level2FormDialog = true
	},
	// level2form表单提交
    level2FormSubmit(formName) {
        let that = this;
		let type = that.level2Type
		that.$refs[formName].validate((valid) => {
          if (valid) {
              that.level2SubmitLoading = true
              let params = JSON.parse(JSON.stringify(that.level2Form))
              that.ajax('moduleAdd',params,(type == 1 ? '添加' : '编辑')+ '失败',res =>{
                that.level2SubmitLoading = false
                if(res.errno == 0) {
					that.$message.success((type == 1 ? '添加' : '编辑')+'成功')
					that.resetForm(formName)
					that.level2FormDialog = false
                }
              }, err =>{
                   that.level2SubmitLoading = false
              })
          } else {
            setTimeout(()=>{
                let isError= document.getElementsByClassName("is-error");
                let firstErrInput = isError[0].querySelector('input')
				firstErrInput.focus();
            },100);
            return false;
          }
        });
	},
	// 添加编辑功能
	addEditLevel3(type,row) { // type 1-添加 2-编辑
		this.$prompt('功能名称与排序用,分割(例: 查看,100)', '提示', {
          confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  inputPlaceholder: '请输入功能名称与排序',
		  inputValue: type == 2 ? (row.title+','+row.orderby): '',
		  type: 'warning',
          center: true
        }).then(({ value }) => {
          if(value) {
			  let title = ''
			  let orderby = ''
			  if(value.indexOf(',') > -1) {
				title = value.split(',')[0]
				orderby = value.split(',')[1]
			  } else {
				  title = value
				  orderby = ''
			  }
			  let params = {
				  mod_id: type == 2 ? row.mod_id : '',
				  module: '2',
				  level: '3',
				  url: row.url,
				  visible: '2',
				  title: title,
				  parent_id: type == 2 ? row.parent_id : row.mod_id,
				  orderby:orderby,
				  is_quick: '0',
				  quick_title: '',
				  quick_icon: '',
				  type: row.type
			  }
			  this.level3Submit(params)
		  } else {
			  this.$message.error('请输入功能名称')
		  }
        }).catch(() => {});
	},
	// 功能添加编辑api请求
	level3Submit(params) {
		let that = this;
		that.ajax('moduleAdd',params,(params.mod_id ? '编辑' : '添加')+ '失败',res =>{
			if(res.errno == 0) {
				that.$message.success((params.mod_id ? '编辑' : '添加')+'成功')
			}
		})
	},
    // 重置form表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    
  }
};
</script>
<style lang="less">
.permission-list {
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
	  .el-tree-node__content {
		height: auto;
		.custom-tree-node {
			display: flex;
			align-items: center;
			.info-con {
				display: flex;
				align-items: center;
				flex-direction: column;
				background: #F0F8FF;
				padding: 1.5rem 1rem;
				margin-bottom: 1rem;
				border-radius: 8px;
				.menu-con {
					display: flex;
					align-items: center;
					padding-bottom: 1rem;
					flex-direction: column;
					.tit-con {
						display: flex;
						align-items: center;
						font-size: 0.9rem;
						.title {
							font-size: 1rem;
							font-weight: bold;
							margin-left: 0.2rem;
						}
					}
					
				}
				
				.btn-con {
					display: flex;
					align-items: center;
					flex-direction: column;
					.btns {
						display: flex;
						align-items: center;

					}
					
				}
			}
			.features {
				display: flex;
				align-items: center;
				flex-direction: column;
				margin-left: 2rem;
				background: #fdf6ec;
				border-radius: 8px;
				padding: 1rem;
				color: #e6a23c;
				margin-bottom: 1rem;

				.tit {
					padding: 1rem;
				}
				.tags {
					// padding: 1rem;
					.data-item {
						padding: 1rem;
						float: left;
						margin-right: 1rem;
						margin-bottom: 1rem;
						background-color:#ecf5ff;
						color: #409eff;
						border: 1px solid #d9ecff;
						border-radius: 8px;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						.text {
							font-weight: bold;
						}
						.btn-con {
							display: flex;
							align-items: center;
							justify-content: center;
							padding-top: 1rem;
						}
					}
				}
				
			}
			
		}
	  }
	  .el-tree-node__content:hover{
		  background: transparent!important;
	  }
	  .el-tree-node:focus>.el-tree-node__content {
		  background: transparent!important;
	  }
  }
   


 
}

</style>