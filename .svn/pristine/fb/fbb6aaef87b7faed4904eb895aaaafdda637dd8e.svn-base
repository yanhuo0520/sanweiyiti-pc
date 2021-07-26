<template>
  <div class="staff-manage" v-loading="loading">
		<!-- <p class="title">
      <span>员工管理</span>
      <el-button type="primary" @click="addStaff">添加员工</el-button>
    </p> -->
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
            <div class="search-con" v-if="isAdmin">
                <el-form class="clearfix"  label-width="65px">
                    <el-form-item label="合作社"  >
                        <el-select v-model="cooperaId" filterable placeholder="请选择合作社">
                            <el-option v-for="(item,index) in cooperativeList" :key="index" :label="item.coopera_name" :value="item.coopera_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
                </el-form>
            </div>
            <div class="btn-con" v-if="!loading && (!isAdmin || isAdmin && adminType == 3) && isAdd" >
                <el-button type="primary" size="small"  @click="addStaff">添加员工</el-button>
            </div>
      </div>
        

      <div class="table-con">
        <el-table
          :data="tableData"
          max-height="550"
          style="width: 100%"
           v-if="tableData && tableData.length > 0">
          <el-table-column prop="worker_id" label="ID" width="100%">
            <!-- <template slot-scope="scope">
              <span>{{(curPage - 1) * 10 + scope.$index + 1}}</span>
              (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 ,翻页序号从1开始解决方案
          </template> -->
          </el-table-column>
          <el-table-column prop="worker_name" label="员工姓名" ></el-table-column>
          <el-table-column prop="age" label="年龄" ></el-table-column>
          <el-table-column prop="worker_sex" label="性别" >
            <template slot-scope="scope">
              {{scope.row.worker_sex == 1?'男':'女'}}
            </template>
          </el-table-column>
          <el-table-column prop="post_name" label="身份" ></el-table-column>
          <el-table-column prop="worker_phone" label="联系方式" ></el-table-column>
          <el-table-column label="操作" v-if="!isAdmin">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="look(scope.row)" v-if="isEdit">编辑</el-button>
              <el-button type="text" size="small" @click="updatePwd(scope.row.worker_id)" v-if="isUpdate">修改密码</el-button>
              <el-button type="text" size="small" @click="del(scope.row.worker_id)" v-if="isDel">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          :current-page="curPage"
          layout="prev, pager, next"
          :total="totalPage*10"
          @current-change="handleCurPageChange">
        </el-pagination>
        <div v-if="!tableData || tableData.length == 0">
				<div class="no-data-con" >
					<div class="absolute-center">
						<div class="err-info-text ">暂无员工</div>
					</div>
				</div>
			</div>
    
      </div>
      
    


    <el-dialog :title="title" :visible.sync="isWork">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="worker_name">
          <el-input autocomplete="off" placeholder="请输入姓名" v-model="ruleForm.worker_name" :readonly="isRead"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="worker_sex" >
            <el-radio v-model="ruleForm.worker_sex" label="1">男</el-radio>
            <el-radio v-model="ruleForm.worker_sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input autocomplete="off" placeholder="请输入年龄" v-model="ruleForm.age" :readonly="isRead"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="worker_phone" >
          <el-input  autocomplete="off" placeholder="请输入手机号" v-model="ruleForm.worker_phone" :readonly="isReadPhoto"></el-input>
        </el-form-item>
        <el-form-item label="设置员工身份" :label-width="formLabelWidth" prop="post_id">
          <p v-if="post_name!=''" style="position:absolute;z-index:10;width:45%;background:#fff;height:20px;top:2px;left:10px;">{{post_name}}</p>
          <el-select v-model="post_id" multiple placeholder="请选择员工身份" :disabled="isRead" @change="post_name = ''">
            <el-option
              v-for="item in staffOptions"
              :key="item.post_id"
              :label="item.post_name"
              :value="item.post_id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="设置员工权限" :label-width="formLabelWidth">
          <el-input autocomplete="off" placeholder="请设置员工权限" v-model="ruleForm.permission" :readonly="isRead"></el-input>
        </el-form-item> -->
        <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
          <el-input autocomplete="off" placeholder="请输入备注" type="textarea" autosize v-model="ruleForm.note" :readonly="isRead"></el-input>
        </el-form-item>
        <el-form-item label="本人照片" :label-width="formLabelWidth" prop="worker_photo">
          <el-upload
            class="avatar-uploader"
            action="http://coopera.xfd365.com/user/auth/uploadImg"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleMyPic"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadErr">
            <img v-if="ruleForm.worker_photo" :src="ruleForm.worker_photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证正面" :label-width="formLabelWidth" prop="card_front">
          <el-upload
            class="avatar-uploader"
            action="http://coopera.xfd365.com/user/auth/uploadImg"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleZmPic"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadErr">
            <img v-if="ruleForm.card_front" :src="ruleForm.card_front" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证反面" :label-width="formLabelWidth" prop="card_back">
          <el-upload
            class="avatar-uploader"
            action="http://coopera.xfd365.com/user/auth/uploadImg"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleFmPic"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadErr">
            <img v-if="ruleForm.card_back" :src="ruleForm.card_back" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isWork = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading" v-if="title=='添加员工'">{{submitLoading ? '提交中...' : '确 定'}}</el-button>
        <el-button type="primary" @click="submitEditForm('ruleForm')" :loading="submitLoading" v-else>{{submitLoading ? '提交中...' : '确 定'}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="isPwd">
      <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1">
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="pwd">
          <el-input autocomplete="off" placeholder="请输入新密码" v-model="ruleForm1.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="repwd">
          <el-input autocomplete="off" placeholder="请确认新密码" v-model="ruleForm1.repwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isPwd = false">取 消</el-button>
        <el-button type="primary" @click="submitPwd('ruleForm1')" :loading="submitLoading">{{submitLoading ? '提交中...' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      submitLoading: false,

      isWork: false,
      isPwd:false,
      ruleForm: {
        worker_name: "", //姓名
        worker_sex: "1", //性别
        age: "", //年龄
        worker_phone: "", //手机号
        post_id: "", //身份
        note: "", //备注
        worker_photo: "", //本人照片
        card_front: "", //身份证正面
        card_back: "" //身份证反面
      },
      post_id:[],
      post_name:'',
      rules: {
        worker_name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        worker_sex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        worker_phone: [
          { required: true, validator: checkTel, trigger: "blur" }
        ],
        post_id: [{ required: true, message: "请选择身份", trigger: "blur" }],
        worker_photo: [
          { required: true, message: "请上传本人照片", trigger: "blur" }
        ],
        card_front: [
          { required: true, message: "请上传身份证正面照片", trigger: "blur" }
        ],
        card_back: [
          { required: true, message: "请上传身份证反面照片", trigger: "blur" }
        ]
      },
      ruleForm1: {
        worker_id:'',
        pwd:'',
        repwd:''
      },
      rules1:{
        pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        repwd:[
          { required: true, message: "请确认新密码", trigger: "blur" }
        ]
      },
      staffOptions: [],
      isRead: false,
      formLabelWidth: "220px",

      title: "添加员工",

      isAdd: false,
      isEdit:false,
      isUpdate:false,
      isDel:false,
      isReadPhoto: false,

      isAdmin: false,
      cooperaId: '', //合作社id
      cooperativeList:[],
    };
  },
  watch: {
    isWork(newName, oldName) {
      if (newName) {
        this.jobList();
        this.getStaff();
        this.post_id = ''
        if (this.$refs["ruleForm"] != undefined) {
          this.$refs["ruleForm"].resetFields();
        }
      }
    }
  },
  activated() {
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    //判断是否为管理员
    let adminType = localStorage.getItem('is_admin')
    if(adminType && Number(adminType) >= 1) {
      this.isAdmin = true
      this.adminType = adminType
    }
    if(this.isAdmin) {
        this.utils.getCooperativeList(this, data =>{
            if(data && data.length > 1 && adminType == 3) {
                this.cooperaId = data[1].coopera_id
            } else {
                this.cooperaId = ''
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
      this.loading = true	
      this.tableData = []
      this.curPage = 1
      this.totalPage = null
      this.cooperaId = ''
      this.getStaff()
      this.handlePermission()
    },
    // 搜索
    search() {
      this.loading = true	
      this.tableData = []
      this.curPage = 1
      this.totalPage = null
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
    // 重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    // 本人照片上传成功
    handleMyPic(res, file) {
      if (res.errno == 0) {
        let that = this
        that.ruleForm.worker_photo = res.data.url;
        this.$forceUpdate()
        this.$message("上传成功");
      }
    },
    // 身份证正面上传成功
    handleZmPic(res, file) {
      if (res.errno == 0) {
        let that = this
        that.ruleForm.card_front = res.data.url;
        that.$forceUpdate()
        this.$message("上传成功");
      }
    },
    // 身份证反面上传成功
    handleFmPic(res, file) {
      if (res.errno == 0) {
        let that = this
        that.ruleForm.card_back = res.data.url;
        that.$forceUpdate()
        this.$message("上传成功");
      }
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024 < 10;
      if (
        fileType.search("jpg") < 0 &&
        fileType.search("jpeg") < 0 &&
        fileType.search("png") < 0 &&
        fileType.search("JPG") < 0 &&
        fileType.search("PNG") < 0
      ) {
        this.$message.error("图片类型必须是jpeg,jpg,png中的一种");
        return false;
      }
    },
    // 上传图片失败
    uploadErr() {
      this.$message.error("上传图片失败");
    },
    // 点击添加员工
    addStaff(){
      this.isWork = true;
      this.title='添加员工';
      this.isRead = false;
      this.ruleForm = {}
       this.isReadPhoto = false
      // this.ruleForm.worker_sex = '1'
      this.post_name = ''
    },
    //编辑员工
    look(item) {
      this.isWork = true;
      this.title = "编辑员工";
      this.isReadPhoto = true
      // this.isRead = true;
      this.ruleForm = item;
      this.post_name = item.post_name
      this.ruleForm.yuan_post_id = item.post_id_str
      this.ruleForm.post_id = item.post_id_str
    },
    
    // 添加员工
    submitForm(formName) {
      let param = this.ruleForm
      let str = ''
      if(this.post_id.length != 0){
        this.post_id.forEach(ele=>{
          str += ele+','
        })
        param.post_id = str.substring(0,str.length - 1)
      }
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.ajax(
            "workerAdd",
            this.ruleForm,
            "添加员工失败",
            res => {
              this.submitLoading = false;
              if (res.errno == 0) {
                this.$message.success("添加员工成功,请去员工管理查看");
                this.isWork = false;
                this.resetForm();
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
    // 编辑员工
    submitEditForm(formName){
      let param = this.ruleForm
      this.ruleForm.yuan_post_id = this.ruleForm.post_id_str
      let str = ''
      if(this.post_id.length != 0){
        this.post_id.forEach(ele=>{
          str += ele+','
        })
        param.post_id = str.substring(0,str.length - 1)
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.ajax(
            "workerEdit",
            this.ruleForm,
            "编辑员工失败",
            res => {
              this.submitLoading = false;
              if (res.errno == 0) {
                this.$message.success("编辑员工成功,请去员工管理查看");
                this.isWork = false;
                this.resetForm();
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
    // 删除员工
    del(id) {
      this.$confirm("此操作将删除员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ajax(
            "workderDel",
            {
              worker_id: id
            },
            "删除失败",
            res => {
              if (res.errno == 0) {
                  this.$message("删除成功");
                  this.getStaff();
              }
            }
          );
        })
        .catch(() => {});
    },
    // 修改密码
    updatePwd(id){
      this.isPwd = true
      this.ruleForm1.worker_id = id
    },
    // 
    submitPwd(formName){
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
          this.ajax(
            "workPwdMod",
            param,
            "修改密码失败",
            res => {
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
      this.ajax(
        "workerLists",
        {
          page: this.curPage,
          size: 10,
          coopera_id:this.cooperaId
        },
        "获取员工列表失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
          }
        },
        err => {
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