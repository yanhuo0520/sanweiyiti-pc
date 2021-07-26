<template>
    <div class="loan-exam-list" v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">审批流程配置</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
        <el-tabs type="border-card" v-model="examType" @tab-click="handleClick" >
            <el-tab-pane :label="item.name" :name="item.type" v-for="(item,index) in examTypeList" :key="index"></el-tab-pane>
            <div style="margin:1rem" >
                <el-button type="primary" plain size="small" @click="addEditLoanExam(1)" v-if="isAdd">添加流程</el-button>
                <span style="font-size:0.8rem; color:#cf9236;margin-left: 1rem" v-if="isDel">最后一步流程禁止删除</span>
            </div>
            <div class="table-con" >
                <template v-if="data && data.length > 0">
                     <el-steps direction="vertical" :space="80" >
                        <el-step v-for="(item,index) in data" :key="index" >
                            <template #description>
                                <div class="exam-info">
                                    <span class="exam-name">{{item.name}}</span>
                                    <!-- <span class="exam-type">审批类型:{{item.exam_type == 0 ? '员工' : '部门'}}</span> -->
                                    <div class="btn-con" style="padding-top:1rem" v-if="isEdit || isDel">
                                        <el-button size="small" type="primary" @click="addEditLoanExam(2,item,index)" v-if="isEdit">编辑</el-button>
                                        <el-button v-if="data.length != (index + 1) && isDel" size="small" type="danger" @click="delLoanExam(item,index)" >删除</el-button>
                                    </div>
                                </div>
                            </template>
                        </el-step>
                    </el-steps>
                </template>
                <template v-if="!data || data.length == 0">
                    <div class="no-data-con" >
                        <div class="absolute-center">
                            <div class="err-info-text ">暂无审批流程</div>
                        </div>
                    </div>
                </template>
            </div>
        </el-tabs>
        
		<el-dialog :title="addEditType == 1 ? ('添加【'+examTypeText+'】审批流程') : ('编辑【'+examTypeText+'】审批流程')" :visible.sync="ruleFormDialog" class="exam-dialog">
			<el-form  ref="ruleForm"  :model="ruleForm" :rules="loanExamRules" label-width="100px" class="exam-form clearfix" >
                <!-- <el-form-item label="审核类型:" prop="exam_type">
                    <el-radio-group v-model="ruleForm.exam_type">
                        <el-radio label="0" >员工</el-radio>
                        <el-radio label="1" >部门</el-radio>
                    </el-radio-group>
				</el-form-item> -->
                <el-form-item label="选择员工:" prop="worker_id" v-if="ruleForm.exam_type == 0">
					<el-select v-model="ruleForm.worker_id" placeholder="请选择员工">
						<el-option v-for="(item,index) in workerListOptions" :label="item.worker_name" :value="item.worker_id" :key="index"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="选择部门:" prop="coopera_post_id" v-if="ruleForm.exam_type == 1">
					<el-select v-model="ruleForm.coopera_post_id" placeholder="请选择部门">
						<el-option v-for="(item,index) in jobPostListOptions" :label="item.post_name" :value="item.post_id" :key="index"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="ruleFormDialog = false">取 消</el-button>
				<el-button type="primary" @click="loanExamSubmit('ruleForm')" :loading="loanExamSubmitLoading">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
export default {
  name: "loanExamList",
  data() {
    return {
	  data: [],
      loading: false,
      
      examType: '',
      examTypeText: '',
      examTypeList: [], // 审批模板列表

	
	  addEditType: '',
	  ruleFormDialog: false, //审批流程form表单弹窗
      loanExamIndex: '', // 当前操作审批的下标
      
      jobPostListOptions: [], // 合作社职位列表
      workerListOptions: [], // 员工列表
	  ruleForm: {
        is_last_step: '1',
        exam_type: '1',
        worker_id: '',
        coopera_post_id: '',
        type: '',
	  },
	  loanExamRules: {
		   exam_type: [
            { required: true, message: '请选择审核类型', trigger: 'change' }
		  ],
		   worker_id: [
            { required: true, message: '请选择员工', trigger: 'change' }
		  ],
		   coopera_post_id: [
            { required: true, message: '请选择部门', trigger: 'change' }
		  ],
	  },
	  loanExamSubmitLoading: false,

      isEdit: false,// 是否有编辑权限
      isDel: false, //是否有删除权限
      isAdd: false, //是否有添加权限
    };
  },
  activated() {
	  this.initData()
  },	
  methods: {
	// 初始化信息
	initData() {
      this.data = []
      this.ruleFormDialog = false
      this.getExamTypeList()
      this.handlePermission()
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
    // 获取审批模板列表
    getExamTypeList() {
        let that = this
		that.ajax('examType',{},'获取审批模板列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
                res.data.data.forEach(item =>{
                    item.type = item.type+''
                })
                that.examTypeList = res.data.data
                that.examType = res.data.data[0].type
                that.examTypeText = res.data.data[0].name
                that.getJobPostList()
                that.getWorkerList()
	            that.getLoanExamLists()

			}
		})
    },
    // 切换审批模板
    handleClick(tab, event) {
        this.examType = tab.name
        this.examTypeText = tab.label
        this.getLoanExamLists()
    },
	// 获取审批列表
	getLoanExamLists(isAddEdit) {
		let that = this
		if(isAddEdit) {
			that.loading = false;
		} else {
			that.loading = true;
		}
		that.ajax('loanExamLists',{
            type: that.examType
        },'获取审批列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
                if(res.data && res.data.data && res.data.data.length > 0) {
                    res.data.data.forEach(item =>{
                        if(item.coopera_post_id == 2) {
                            item.name = '理事部'
                        }
                    })
                }
                that.data = res.data.data
                // if(!isAddEdit) {
                   
                // }
			}
		}, err =>{
			that.loading = false
		})
    },
    // 获取员工职位列表
    getJobPostList() {
        let that = this;
        that.ajax('jobPostList',{coopera_id: 129},'获取部门列表失败',res =>{
			if(res.errno == 0) {
                let tmpObj = {
                    post_id:2,
                    post_name: "理事部",
                }
                res.data.push(tmpObj)
				that.jobPostListOptions = res.data
			}
		})
    },
    // 获取员工列表
    getWorkerList() {
        let that = this;
        that.ajax('workerListsSelect',{},'获取员工列表失败',res =>{
			if(res.errno == 0) {
				that.workerListOptions = res.data.data
			}
		})
    },

	// 添加编辑当前审批流程
	addEditLoanExam(type,row,index) { // type 1-添加 2-编辑
		if(type == 1) {
			this.ruleForm = {
                is_last_step: '1',
                // exam_type: '0',
                exam_type: '1',
                worker_id: '',
                coopera_post_id: '',
                type: this.examType,
			}
		} else {
			this.loanExamIndex = index
			this.ruleForm = {
                // exam_type: row.exam_type+'',
                exam_type:'1',
                worker_id: row.worker_id,
                coopera_post_id: row.coopera_post_id,
                type: this.examType,
                loan_exam_id: row.loan_exam_id
			}
			
        }
		this.addEditType = type
		this.ruleFormDialog = true
	},
	// 添加编辑审批提交
	loanExamSubmit(formName) {
		let that = this;
        let type = that.addEditType
		that.$refs[formName].validate((valid) => {
          if (valid) {
              that.loanExamSubmitLoading = true
              let params = JSON.parse(JSON.stringify(that.ruleForm))
              that.ajax((type == 1 ? 'loanExamAdd' : 'loanExamMod'),params,(type == 1 ? '添加' : '编辑')+ '失败',res =>{
                that.loanExamSubmitLoading = false
                if(res.errno == 0) {
					that.$message.success((type == 1 ? '添加' : '编辑')+'成功')
					that.getLoanExamLists(true)
					that.resetForm(formName)
					that.ruleFormDialog = false
                }
              }, err =>{
                   that.loanExamSubmitLoading = false
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
	//删除产品
	delLoanExam(row,index) {
		let that = this;
		that.$confirm('此操作将永久删除该审批流程, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			center: true
			}).then(() => {
				that.ajax('loanExamStatus',{
                    loan_exam_id: row.loan_exam_id,
                    status: 0
				},'删除失败',res =>{
					if(res.errno == 0) {
						that.$message.success('删除成功')
						that.data.splice(index,1)
						if(that.data && that.data.length == 0) {
							that.getLoanExamLists()
						}	
					}
				}, err =>{
				})
			}).catch(() => {});
	},
	// 重置form表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style lang="less">
.loan-exam-list {
  padding: 20px;
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
  .el-step__head.is-wait {
      color: #409eff;
      border-color: #409eff;
      .el-step__line {
          background: #409eff;
      }
     
  }
   .exam-info {
        display: flex;
        flex-direction: column;
        color: #409eff;
        font-size: 0.9rem;
        width: 15rem;
        align-items: center;
        background: #F0F8FF;
        padding: 1rem 0;
        border-radius: 8px;
        margin-left: 1rem;
        .exam-name {
        }
        .exam-type {
            font-size: 0.9rem;
            padding: 1rem 0;
        }

    }
    .table-con {
        min-height: 20rem;
    }
  .exam-dialog {
      .el-dialog {
			width: 33%;
		}
      .exam-form {
        .el-form-item {
            // width: 60%;
        }
    }
  }
 
}

</style>