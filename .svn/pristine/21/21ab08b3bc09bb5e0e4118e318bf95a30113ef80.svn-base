<template>
  <div class="staff-manage"  v-loading="loading">
      <div class="breadcrumb-con">
        <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
        <div class="breadcrumb-info">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>基础信息</el-breadcrumb-item>
                <el-breadcrumb-item  class="breadcrumb-tit">员工管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		  <el-button size="small" @click="initData()">刷新</el-button>
    </div>
    <div class="operate-con clearfix">
          <!-- <div class="btn-con" v-if="!loading && (!isAdmin || isAdmin && adminType == 3) && isAdd" >
              <el-button type="primary" size="small"  @click="addStaff">添加员工</el-button>
          </div> -->
          <el-button size="mini" round  type="success" @click="getData" v-if="adminType == 3">管理我的合作社</el-button>
          <el-button size="mini" round type="warning" @click="chooseCoopera" v-if="adminType != 0">查看下级合作社</el-button>
          <div class="btn-con" v-if="!loading && (adminType == 0 || adminType == 3) && isAdd" >
              <el-button type="primary" size="small"  @click="addStaff">添加员工</el-button>
          </div>
      </div>
	  <div class="tip" :class="{'manage-tip':!selectName}" v-if="adminType != 0">
		  <span v-if="selectName">正在查看下级【{{selectName}}】的数据</span>
		  <span v-else>正在管理我的合作社</span>
	  </div>
      <div class="table-con">
        <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
            <el-table-column prop="user_id" label="ID" width="70" align="center">
            </el-table-column>
            <el-table-column prop="worker_name" label="员工姓名" align="center"></el-table-column>
            <el-table-column prop="worker_sex" label="性别" align="center" >
              <template slot-scope="scope">
                {{scope.row.worker_sex == 1?'男':'女'}}
              </template>
            </el-table-column>
            <el-table-column prop="post_name" label="身份" align="center"></el-table-column>
            <el-table-column prop="worker_phone" label="联系方式" align="center"></el-table-column>
            <el-table-column label="操作"  align="center">
              <template slot-scope="scope">
                      <template v-if="!selectName">
                          <el-button type="primary"  size="small" plain @click="look(scope.row)" v-if="isEdit">编辑</el-button>
                          <el-button type="warning" plain size="small" @click="updatePwd(scope.row.user_id)" v-if="isUpdate && scope.row.is_qu_admin == 2">修改密码</el-button>
                          <el-button type="danger" plain size="small" @click="del(scope.row,scope.$index)" v-if="isDel">删除</el-button>
                      </template>
                      <template v-else>
                         <el-button type="primary"  size="small" plain @click="look(scope.row)" >查看</el-button>
                      </template>
                <!-- <el-button type="primary"  size="small" plain @click="look(scope.row)" v-if="isEdit">编辑</el-button>
                <el-button type="warning" plain size="small" @click="updatePwd(scope.row.user_id)" v-if="isUpdate && scope.row.is_qu_admin == 2">修改密码</el-button>
                <el-button type="danger" plain size="small" @click="del(scope.row,scope.$index)" v-if="isDel">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10" @current-change="handleCurPageChange"></el-pagination>
          <div v-if="!tableData || tableData.length == 0">
            <div class="no-data-con" >
              <div class="absolute-center">
                  <div class="err-info-text ">暂无员工列表</div>
              </div>
            </div>
          </div>
        </div>
    <el-dialog title="修改密码" :visible.sync="isPwd" width="30%" >
      <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="220">
        <el-form-item label="新密码"  prop="pwd">
          <el-input autocomplete="off" placeholder="请输入新密码" v-model="ruleForm1.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"  prop="repwd">
          <el-input autocomplete="off" placeholder="请确认新密码" v-model="ruleForm1.repwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isPwd = false">取 消</el-button>
        <el-button type="primary" @click="submitPwd('ruleForm1')" :loading="submitLoading">{{submitLoading ? '提交中...' : '确 定'}}</el-button>
      </div>
    </el-dialog>

	  <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
  </div>
</template>
<script>
import myDrawer from "../../components/drawer.vue";
export default {
  name: "staffManage",
  data() {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入您的手机号"));
      }
      let telreg = /^1[3456789]\d{9}$/;
      if (!telreg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      drawer: false,
      tableData: [],
      curPage: 1,
      totalPage: null,
      loading: false,
      submitLoading: false,

      isPwd:false,
      ruleForm1: {
        user_id:'',
        pwd:'',
        repwd:''
      },
      rules1: {
        pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        repwd:[
          { required: true, message: "请确认新密码", trigger: "blur" }
        ]
      },
      staffOptions: [],

      isAdd: false,
      isEdit:false,
      isUpdate:false,
      isDel:false,

      isAdmin: false,
      cooperaId: '', //合作社id
      cooperativeList:[],
      cooperationInfo: '',// 当前合作信息

      selectName: '',
      level2List: [],
	  adminType: '',
    };
  },
  components: { myDrawer },
  activated() {
	this.initEventWatch()
    let isRefresh = this.$route.query.isRefresh // 1不刷新 2或者undefined刷新
	if(isRefresh && isRefresh == 1) return

    this.tableData = [];
    this.curPage = 1;
	this.totalPage = null;
	this.selectName = '';
	this.loading = true;
	this.level2List = []
	
    //判断是否为管理员
    let adminType = localStorage.getItem('is_admin')
    if(adminType && Number(adminType) >= 1) {
      this.isAdmin = true
      this.adminType = adminType
	}
    if(this.isAdmin) {
        this.cooperationInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
        this.utils.getCooperativeList(this, data =>{
            if(data && data.length > 1 && adminType == 3) {
                this.cooperaId = data[1].coopera_id
            } else {
				this.cooperaId = ''
				this.selectName = data[0].coopera_name
				data[0].isSelect = true
            }
            this.cooperativeList = data
            this.getStaff();
        },err =>{
          this.loading = false
        })
    } else {
      this.getStaff();
    }
	this.handlePermission()
  },
  methods: {
    // 初始化信息
    initData() {
      this.tableData = []
      this.curPage = 1
      this.totalPage = null
       if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
            this.cooperaId = this.cooperativeList[1].coopera_id
        } else {
            this.cooperaId = ''
        }
      this.getStaff()
      this.handlePermission()
	},
	// 初始化 监听合作社选择组件事件
	initEventWatch(){
		eventWatch.$on('closeDrawer', res =>{
			this.drawer = false
		})
		eventWatch.$on('selectLevel1', row=>{
			this.cooperativeList.forEach(item =>{
				this.$set(item,'isSelect', false)
			})
			this.$set(row,'isSelect', true)
			this.level2List = []
			if(row.coopera_id == row.parent_id && row.count > 1) {
				this.getLevel2Data(row)
			} else {
				this.tableData = []
				this.curPage = 1
				this.totalPage = null
				this.cooperaId = row.coopera_id
				this.selectName = row.coopera_name
				this.getStaff()
			}
		})
		eventWatch.$on('selectLevel2', row=>{
			this.level2List.forEach(item =>{
				this.$set(item,'isSelect', false)
			})
			this.$set(row,'isSelect', true)
			this.tableData = []
			this.curPage = 1
			this.totalPage = null
			this.cooperaId = row.coopera_id
			this.selectName = row.coopera_name
			this.getStaff()
		})
	},
    // 获取我的合作社数据
    getData() {
		if(!this.selectName) return
      	let cooperaInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
        this.tableData = []
        this.curPage = 1
        this.totalPage = null
        this.cooperaId = cooperaInfo ? cooperaInfo.id : ''
		this.selectName = ''
		this.level2List = []
        this.getStaff()
    },
    // 展开选择合作社
    chooseCoopera() {
	  this.drawer = true
	  eventWatch.$emit('initData')
    },
	getLevel2Data(row,callBack){
		this.ajax("cooperativeLevelList",{ parent_id: row.coopera_id },"获取合作社列表失败",res => {
			if(res.errno == 0) {
				res.data.forEach(item  =>{
					item.disabled = true
				})
				this.level2List =res.data
				callBack && typeof callBack == 'function' && callBack()
			} else {
				this.level2List = []
			}
			},err => {
				this.level2List = []
			}
		);
	},
    // 判断当前页面都有什么权限
    handlePermission() { 
      let that = this;
      that.utils.getPermissionList(that,data =>{
        data.forEach(item =>{
          if(item.title == '编辑') {
            that.isEdit = true
          }	
          if(item.title == '修改密码') {
            that.isUpdate = true
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
    // 点击添加员工
    addStaff(){
      this.$router.push({
        path: '/addStaff',
        query: {
          isEdit: false,
          sourceType: 'add'
        }
      })
    },
    //编辑员工
    look(item) {
      this.$router.push({
        path: '/addStaff',
        query: {
          id: item.user_id,
          isEdit: this.selectName ? false : this.isEdit,
          sourceType: 'edit'
        }
      })
    },
    // 删除员工
    del(row,index) {
      this.$confirm("此操作将删除员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
          this.ajax("workderDel",{ job_id: row.job_id },"删除失败",res => {
            if (res.errno == 0) {
              this.$message("删除成功");
              this.tableData.splice(index,1)
              if(this.tableData.length == 0) {
                this.getStaff();
              }
            }
          });
        }).catch(() => {});
    },
    // 修改密码
    updatePwd(id){
      this.isPwd = true
      this.ruleForm1.user_id = id
    },
    // 
    submitPwd(formName){
      this.ruleForm1.pwd = this.ruleForm1.pwd.trim()
       this.ruleForm1.repwd = this.ruleForm1.repwd.trim()
      if(this.ruleForm1.pwd != this.ruleForm1.repwd){
        this.$message.error('请确认两次密码输入一致')
        return;
      }
      let param = JSON.parse(JSON.stringify(this.ruleForm1))
      param.pwd = this.utils.recursiveMD5(this.ruleForm1.pwd, 1)
      param.repwd = this.utils.recursiveMD5(this.ruleForm1.repwd, 1)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.ajax("workPwdMod",param,"修改密码失败",res => {
              this.submitLoading = false;
              if (res.errno == 0) {
                this.$message.success("修改成功");
                this.isPwd = false;
                this.$refs["ruleForm1"].resetFields();
                this.getStaff();
              }
            },
            err => {
              this.submitLoading = false;
            }
          );
        } else {
          setTimeout(() => {
            let isError = document.getElementsByClassName("is-error");
            let firstErrInput = isError[0].querySelector("input");
            if (firstErrInput.type == "file") {
              document.querySelectorAll(
                ".el-scrollbar__wrap"
              )[1].scrollTop = 50;
            } else {
              firstErrInput.focus();
            }
          }, 100);
          return false;
        }
      });
    },
    // 员工列表
    getStaff() {
	this.loading = true
      this.ajax("workerLists",{
          page: this.curPage,
          size: 10,
          coopera_id:this.cooperaId
        },"获取员工列表失败",res => {
          this.loading = false;
          if (res.errno == 0) {
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
            this.drawer = false
          }
        },err => {
          this.loading = false;
        }
      );
    },
    // 身份列表
    jobList() {
      this.ajax("jobPostList", {}, "获取身份列表失败", res => {
        if (res.errno == 0) {
          this.staffOptions = res.data;
        }
      });
    },
    // 切换分页
    handleCurPageChange(val) {
      this.curPage = val;
      this.getStaff();
    }
  }
};
</script>
<style lang="less">
.staff-manage {
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
  p.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-table {
    background: transparent;
  }
  .el-table::before {
    height: 0;
  }
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .el-dialog {
    .el-input,
    .el-textarea,
    .el-select {
      width: 50%;
      .el-input {
        width: 100%;
      }
      textarea {
        font-family: "微软雅黑";
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}


</style>