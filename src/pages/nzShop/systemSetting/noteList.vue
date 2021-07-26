<template>
    <div class="noteList"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">短信配置列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
			<div class="btn-con" v-if="!loading">
				<el-button slot="trigger" size="small"  type="primary" @click="addEditPost(1)" v-if="isAdd">添加短信配置</el-button>
			</div>
		</div>
        <div class="table-con">
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                    <el-table-column prop="message_id" label="ID" width="60" align="center"></el-table-column>
                    <el-table-column prop="name" label="短信配置名称" align="center"></el-table-column>
                    <el-table-column prop="type" label="短信配置类型" align="center">
                        <template slot-scope="scope">
                            {{scope.row.type == 1 ? '下单提醒' : '发货提醒'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sent" label="短信发送对象" align="center">
                        <template slot-scope="scope">
                            {{scope.row.sent == 1 ? '发给购买者' : scope.row.sent == 2 ? '发给使用者' : scope.row.sent == 3 ? '发给后台' : '发给购买者,发给使用者,发给后台'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="短信模板" align="center"></el-table-column>
                    <el-table-column prop="sign_name" label="短信签名" align="center"></el-table-column>
                    <el-table-column prop="template_code" label="短信模板Code" align="center"></el-table-column>
                    <el-table-column prop="sent" label="是否发送短信" align="center">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            disabled>
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="320px" align="center" v-if="isSetPermission || isEdit || isDel" >
                        <template slot-scope="scope">
                            <el-button plain size="small" @click="showSetPermissionDialog(scope.row)" v-if="isSetPermission" >配置发送人员</el-button>
                            <el-button plain size="small" type="primary" @click="addEditPost(2,scope.row,scope.$index)" v-if="isEdit">编辑</el-button>
                            <el-button size="small" type="danger" @click="delNote(scope.row,scope.$index)" v-if="isDel">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无短信配置列表</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>

        <el-dialog :title="noteType == 1 ? '添加短信配置' : '编辑短信配置'" :visible.sync="noteFormDialog" class="post-dialog">
			<el-form  ref="noteForm"  :model="noteForm" :rules="noteRules" label-width="100px" class="post-form clearfix" >
				<el-form-item label="短信配置名称:" prop="name">
					<el-input v-model="noteForm.name" placeholder="请输入短信配置名称"></el-input>
				</el-form-item>
                <el-form-item label="短信类型:" prop="type" >
                    <el-radio v-model="noteForm.type" label="1">下单提醒</el-radio>
                    <el-radio v-model="noteForm.type" label="2">发货提醒</el-radio>
				</el-form-item>
                <el-form-item label="短信发送对象:" prop="sent" >
                    <el-checkbox-group v-model="noteForm.sent">
                        <el-checkbox label="1">发给购买者</el-checkbox>
                        <el-checkbox label="2">发给使用者</el-checkbox>
                        <el-checkbox label="3">发给后台</el-checkbox>
                    </el-checkbox-group>
				</el-form-item>
                <el-form-item label="短信配置开关" prop="status">
                    <el-switch
                    v-model="noteForm.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="短信模板">
                    <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入短信内容"
                    v-model="noteForm.content">
                    </el-input>
                </el-form-item>
                <el-form-item label="短信签名">
                    <el-input
                    type="text"
                    placeholder="请输入短信签名"
                    v-model="noteForm.sign_name">
                    </el-input>
                </el-form-item>
                <el-form-item label="短信模板Code">
                    <el-input
                    type="text"
                    placeholder="请输入短信模板Code"
                    v-model="noteForm.template_code">
                    </el-input>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="noteFormDialog = false">取 消</el-button>
				<el-button type="primary" @click="noteSubmit('noteForm')" :loading="noteSubmitLoading">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="设置权限" :visible.sync="setPermissionDialog"  @close="closePermissionDialog()">
            <el-table
                ref="multipleTable"
                :data="staffData"
                tooltip-effect="dark"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="员工姓名"
                prop="worker_name">
                </el-table-column>
                <el-table-column
                prop="worker_sex"
                label="性别">
                    <template slot-scope="scope">
                      {{scope.row.worker_sex == 1?'男':'女'}}
                    </template>
                </el-table-column>
                <el-table-column
                label="身份"
                prop="post_name">
                </el-table-column>
                <el-table-column
                label="联系方式"
                prop="worker_phone"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="setPermissionDialog = false">取 消</el-button>
				<el-button type="primary" @click="permissionSubmit()" :loading="permissionSubmitLoading">确 定</el-button>
			</div>
		</el-dialog>

    </div>
</template>
<script>
export default {
  name: "noteList",
  data() {
    return {
      data: [],
      curPage: 1,
      totalPage: 0,
      loading: false,
      
      noteType: '',
	  noteFormDialog: false, //短信配置form表单弹窗
	  noteForm: {
		  
	  },
	  noteRules: {
		  name: [
            { required: true, message: '请输入短信配置名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择短信配置类型', trigger: 'blur' }
          ],
          sent: [
            { required: true, message: '请选择短信发送对象', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择短信配置开关', trigger: 'blur' }
          ]
	  },
      noteSubmitLoading: false,

      noteStatus: true,//短信配置开关

	setPermissionDialog: false, //设置权限dialog弹窗
	defaultProps: {
		children: 'child',
		label: 'title'
	},

	permissionSubmitLoading: false,

	isEdit: false,// 是否有编辑权限
	isDel: false, //是否有删除权限
	isAdd: false, //是否有添加权限
    isSetPermission: false, //是否有设置权限 权限
    
    staffData:[],//员工列表
    multipleSelection:[],
    staffpage:1,
    staffTotal:0,
    message_id:''
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
	  this.getNoteList()
      this.handlePermission()
      this.getStaff()
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
				if(item.title == '配置发送人员') {
					that.isSetPermission = true
				}
			})
		},'','goods_mod_id')
    },
    
	// 获取短信配置列表
	getNoteList(isAddEdit) {
        let that = this
        if(isAddEdit) {
            that.loading = false;
        } else {
            that.loading = true;
        }
		that.ajax('messageLists',{
            page: that.curPage,
			size: 10,
        },'获取短信配置列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
                that.curPage = Number(res.data.current_page)
				that.totalPage = res.data.total
                that.data = res.data.data
                that.data.forEach(ele=>{
                    if(ele.status == 1){
                        ele.status = true
                    }else{
                        ele.status = false
                    }
                })
			}
		}, err =>{
			that.loading = false
		})
	},
	
    // 处理分页
	handleCurPageChange(val) {
		this.curPage = val;
		this.getNoteList()
    },
    // 添加编辑产品
	addEditPost(type,row,index) { // type 1-添加 2-编辑
		if(type == 1) {
			this.noteForm = {
                name: '',
                type:'1',//短信类型
                sent:['1'],//短信发送对象
                status: true,
                message_id: '',
                content:'',
                sign_name:'',
                template_code:''

			}
		} else {
            this.noteForm = {
                name: row.name,
                type: row.type.toString(),
                sent: ['1'],
                status: row.status,
                message_id: row.message_id,
                content: row.content,
                sign_name: row.sign_name,
                template_code: row.template_code
			}
            this.noteForm.sent = row.sent.split(',')
			
			
		}
		this.noteType = type
		this.noteFormDialog = true
	},
	// 添加编辑短信配置提交
	noteSubmit(formName) {
		let that = this;
		let type = that.noteType
		that.$refs[formName].validate((valid) => {
          if (valid) {
              that.noteSubmitLoading = true
              let params = JSON.parse(JSON.stringify(that.noteForm))
              let str = ''
              params.sent.forEach(ele=>{
                  str += ele + ','
              })
              str = str.substring(0,str.length - 1)
              params.sent = str
              if(params.status){
                  params.status = 1
              }else{
                  params.status = 2
              }
              that.ajax('messageAdd',params,(type == 1 ? '添加' : '编辑')+ '失败',res =>{
                that.noteSubmitLoading = false
                if(res.errno == 0) {
					that.$message.success((type == 1 ? '添加' : '编辑')+'成功')
					that.getNoteList(true)
					that.resetForm(formName)
					that.noteFormDialog = false
                }
              }, err =>{
                   that.noteFormDialog = false
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
	//删除短信配置
	delNote(row,index) {
		let that = this;
		that.$confirm('此操作将永久删除该短信配置, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			center: true
			}).then(() => {
				that.ajax('messageDel',{
                    message_id: row.message_id,
                    is_del: 1
				},'删除失败',res =>{
					if(res.errno == 0) {
						that.$message.success('删除成功')
						that.data.splice(index,1)
						if(that.data && that.data.length == 0) {
							that.getNoteList()
						}	
					}
				}, err =>{
				})
			}).catch(() => {});
    },
    // 员工列表
    getStaff() {
      this.ajax("workerLists",{
          page: this.staffpage,
          size: 10,
        },"获取员工列表失败",res => {
          this.loading = false;
          this.adminLoading = false
          if (res.errno == 0) {
            this.staffData = res.data.data;
            this.staffpage = Number(res.data.current_page);
            this.staffTotal = res.data.total;
          }
        },err => {
            
        }
      );
    },
    // 员工选择
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
	// 显示设置权限dialog弹窗
	showSetPermissionDialog(row) {
        this.setPermissionDialog = true
        this.message_id = row.message_id
        this.ajax('messageDetail',{
            message_id: row.message_id
        },"获取详情失败",res=>{
            if(res.errno == 0){
                let ids = res.data.user_ids
                if(ids) {
                    this.staffData.forEach(item => {
                        if (ids.includes(item.user_id)) {
                            this.$refs.multipleTable.toggleRowSelection(item, true)
                        }
                    })
                }
            }
        },err=>{})
	},
	// 关闭设置权限dialog弹窗
	closePermissionDialog() {
	},
	// 设置权限确定按钮
	permissionSubmit() {
		let that = this;
        that.permissionSubmitLoading = true
        let str = ''
        this.multipleSelection.forEach(ele=>{
            str += ele.user_id + ','
        })
        str = str.substring(0,str.length - 1)
        that.ajax("messageUser",{
          message_id: this.message_id,
          user_ids:str
        },"设置权限失败",res => {
            that.permissionSubmitLoading = false
          if (res.errno == 0) {
              that.$message.success('设置成功')
              that.setPermissionDialog = false
          }
        },err => {
            that.permissionSubmitLoading = false
        }
      );
		// that.ajax('postAddModule',{
		// 	post_id: that.curPostId,
		// 	mod_id_str: that.$refs.tree.getCheckedKeys().join(',')
		// },'设置权限失败',res =>{
		// 	that.permissionSubmitLoading = false
		// 	if(res.errno == 0) {
		// 		that.$message.success('设置成功')
		// 		that.$refs.tree.setCheckedKeys([]);
		// 		that.setPermissionDialog = false
		// 		that.getNoteList(true)
		// 		that.isStrictly = true
		// 	}
		// }, err =>{
		// 	that.permissionSubmitLoading = false
		// })
	},
    // 重置form表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

  }
};
</script>
<style lang="less">
.noteList {
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
	.post-dialog {
		.el-dialog {
			width: 30%;
			.el-form {
				padding: 0 2rem;
				.el-form-item__content {
					.el-select {
						.el-input {
							width: 100%;
						}
					}
					.el-input {
						width: 100%;
					}
				}
			}
		}
	}
	


 
}

</style>