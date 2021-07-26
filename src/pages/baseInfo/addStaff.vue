<template>
    <div class="add-staff" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>基本信息</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">{{sourceType == 'add' ? '添加员工' : (isEdit ? '编辑员工' : '员工信息')}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" style="margin-right:1rem" v-if="sourceType == 'edit'" @click="initData()">刷新</el-button>
            <div class="back-con" @click="goBack">
				<img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
				<span class="back-text">返回上一页</span>
			</div>
        </div>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" style="margin-top: 0.5rem" label-width="120px">
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">员工信息</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item  prop="card_front" class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con idcard-z">
                        <div class="idcard-img" @click="showImgView(ruleForm.card_front)">
                            <img class="img" :src="ruleForm.card_front ? ruleForm.card_front : idCardZ" alt="">
                        </div>
                        <div class="idcard-text" >
                            <el-upload action="http://coopera.xfd365.com/user/auth/uploadImg"  :disabled="uploadIdCardZLoading || !isEdit" :before-upload="uploadCardZBefore" :on-success="uploadCardZSuccess" :on-error="uploadCardZErr" :show-file-list="false" accept="image/*" >
                                {{uploadIdCardZLoading ? '重新上传...' : (uploadIdCardZErr ? '重新上传' : '点击上传身份证正面')}}
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item  prop="card_back" class="idcard-item-con" style="height:auto">
                   <div class="idcard-img-con idcard-f">
                        <div class="idcard-img" @click="showImgView(ruleForm.card_back)">
                            <img class="img" :src="ruleForm.card_back ? ruleForm.card_back : idCardF" alt="">
                        </div>
                        <div class="idcard-text" >
                            <el-upload action="http://coopera.xfd365.com/user/auth/uploadImg"  :disabled="uploadIdCardFLoading || !isEdit" :before-upload="uploadCardFBefore" :on-success="uploadCardFSuccess" :on-error="uploadCardFErr" :show-file-list="false" accept="image/*" >
                                {{uploadIdCardFLoading ? '正在上传...' : (uploadIdCardFErr ? '重新上传' : '点击上传身份证反面')}}
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="姓名:" prop="worker_name">
                    <el-input v-model="ruleForm.worker_name" placeholder="请输入员工姓名" :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="worker_sex">
                    <template v-if="isEdit">
                        <el-radio-group v-model="ruleForm.worker_sex" >
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </template>
                    <template v-else>
                        <el-input :value="ruleForm.worker_sex == 2 ? '女' : '男'"  readonly></el-input>
                    </template>
                </el-form-item>
                <el-form-item label="手机号:" prop="worker_phone">
                    <!-- <el-input v-model="ruleForm.worker_phone" placeholder="请输入员工手机号" :readonly="sourceType == 'add' || !isEdit"></el-input> -->
                    <el-input v-model="ruleForm.worker_phone" placeholder="请输入员工手机号" readonly></el-input>
                </el-form-item>
                <template v-if="isEdit">
                    <el-form-item label="部门:"  style="height:auto" v-if="postOptions && postOptions.length > 0">
                        <el-select v-model="ruleForm.post_ids" multiple placeholder="请选择">
                            <el-option v-for="item in postOptions" :key="item.post_id" :label="item.post_name" :value="item.post_id"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <template v-if="!isEdit">
                    <el-form-item label="部门:" prop="post_ids" style="height:auto" v-if="postList && postList.length > 0">
                        <el-tag style="margin-right: 20px" v-for="item in postList" :key="item.post_id">{{item.post_name}}</el-tag>
                    </el-form-item>
                </template>
                <el-form-item class="upload-con" prop="worker_photo" >
                    <div class="img-con">
                        <img  :src="ruleForm.worker_photo ? ruleForm.worker_photo : defaultPhoto" @click="showImgView(ruleForm.worker_photo)" alt="">
                    </div>
                    <div class="upload-btn" >
                        <el-upload  action="http://coopera.xfd365.com/user/auth/uploadImg" :disabled="uploadLoading || !isEdit" :before-upload="uploadPicBefore" :on-success="uploadPicSuccess" :on-error="uploadPicErr" :show-file-list="false" accept="image/*">
                            {{uploadLoading ? '上传中...' : uploadErr ? '重新上传' : '点击上传本人照片'}}
                        </el-upload>
                    </div>
                </el-form-item>
            </div>
            <div class="btn-con" v-if="isEdit">
                <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : (sourceType == 'add' ? '添加员工' : '编辑员工')}}</el-button>
            </div>
        </el-form>

        <template v-if="showViewer">
            <el-image-viewer :on-close="closeImgView"  :url-list="showViewImgs" />
        </template> 

         <!-- 验证注册手机号弹窗 -->
        <div class="rule-dialog-con" v-if="isShowCheckTelDialog">
            <div class="dialog-info">
                <div class="rule-tit-con">
                    <i class="el-icon-warning"></i>
                    <span class="dialog-tit">提示</span>
                </div>
                <div class="rule-dialog-desc">请先验证您要注册的手机号</div>
                <el-form :model="checkTelForm" ref="checkTelForm">
                    <el-form-item  prop="regTel" :rules="[{ required: true, validator: checkTel, trigger: 'blur' }]">
                       <el-input class="rule-input" v-model="checkTelForm.regTel" placeholder="请输入手机号" ></el-input>
                    </el-form-item>
                </el-form>
                <div class="rule-btn-con">
                    <el-button type="primary" plain @click="goBack()" :loading="checkTelLoading">返回上一页</el-button>
                    <el-button type="primary" @click="dialogCheckTel('checkTelForm')" :loading="checkTelLoading">验证手机号</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: "addStaff",
  data() {
      var checkTel = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入您的手机号'));
        }
        let telreg = /^1[3456789]\d{9}$/;
        if (!telreg.test(value)) {
        callback(new Error('请输入正确的手机号'));
        } else {
            callback();
        }
    };
    return {
      id: null, // 员工id  
      idCardZ: require('../../images/public/idCard-z.png'),
      idCardF: require('../../images/public/idCard-f.png'),
      defaultPhoto: require('../../images/baseInfo/default-photo.png'),

      checkTelForm: {
        regTel: '', // 验证注册手机号
      },
      checkTelLoading: false, // 手机号验证loading
      isShowCheckTelDialog: false,// 检查手机号dialog弹窗

      isRefresh: 1,
      isEdit: false, // 是否可以编辑
      sourceType: 'add', //页面来源 add-添加 edit-编辑

      loading: false,
      ruleForm: {
        worker_name: '',
        worker_sex: '1',
        worker_phone: '',
        worker_photo: '',
        card_front: '',
        card_back: '',
        post_id: '',
        post_ids: [],

      },
      postOptions: [],
      postList: [], // 仅仅当查看用作部门显示

      uploadLoading: false,
      uploadErr: false,
      uploadIdCardZLoading: false,
      uploadIdCardZErr: false,
      uploadIdCardFLoading: false,
      uploadIdCardFErr: false,
      rules: {
        worker_name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ], 
        worker_sex: [
          { required: true, message: '请选择员工性别', trigger: 'change' }
        ], 
        worker_photo: [{
            required: true, message: '请上传本人照片', trigger: 'change' 
        }],
        card_front: [
          { required: true, message: '请上传身份证正面', trigger: 'change' }
        ], 
        card_back: [
          { required: true, message: '请上传身份证反面', trigger: 'change' }
        ], 
        worker_phone: [
          { required: true, validator: checkTel, trigger: 'change' }
        ], 
        post_ids: [
          { required: true, message: '请选择员工身份', trigger: 'change' }
        ],
      },
      checkTel: checkTel,

      submitLoading: false,

      showViewer: false, // 是否显示图片大图
    showViewImgs: [], // 大图url
    };
  },
   components: { ElImageViewer },
  activated() {
    this.utils.checkToken(this,res =>{
        if(res && res.errno == 0) {
           this.initData()
           this.getPostList()
        } else {
            this.loading = false
        }
    })
  },
  methods: {
    // 返回上一页
    goBack() {
        this.$router.push({
            path:'/staffManage',
            query:{
                isRefresh: this.isRefresh
            }
        })
    },
    // 身份列表
    getPostList() {
        this.postOptions = []
      this.ajax("jobPostList", {}, "获取身份列表失败", res => {
        if (res.errno == 0) {
          let tmpData = []
          res.data.forEach(item =>{
              if(item.mod_id_str) {
                  tmpData.push(item)
              }
          })
          this.postOptions = tmpData;
        }
      });
    },
    // 验证上传图片
    checkFile(file) {
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
      } else {
          return true;
      }
    },
    // 本人照片上传前
    uploadPicBefore(file) {
      if(!this.checkFile(file)) {
          return false
      }
      this.ruleForm.worker_photo = ''
      this.uploadLoading = true
      this.uploadErr = false
    },
    // 本人照片上传成功
    uploadPicSuccess(res,file) {
      this.uploadLoading = false
     if (res.errno == 0) {
         try {
            this.ruleForm.worker_photo = res.data.url;
            this.$message.success("本人照片上传成功");
            if(document.querySelector('.upload-btn').nextSibling) {
                document.querySelector('.upload-btn').nextSibling.style.display = 'none'
            }
         } catch (error) {
            //  console.log(error)
         }
        
        
      } else {
          this.uploadErr = true
      }
    },
    // 本人照片上传失败
    uploadPicErr() {
        this.$message.error('本人照片上传失败')
        this.uploadLoading = false
        this.uploadErr = true
    },
     // 身份证正面上传前
    uploadCardZBefore(file) {
      if(!this.checkFile(file)) {
          return false
      }
      this.ruleForm.card_front = ''
      this.uploadIdCardZLoading = true
      this.uploadIdCardZErr = false
    },
    // 身份证正面上传成功
    uploadCardZSuccess(res,file) {
      this.uploadIdCardZLoading = false
     if (res.errno == 0) {
        this.ruleForm.card_front = res.data.url;
        this.$message.success("身份证正面上传成功");
        if(document.querySelectorAll('.idcard-img-con')[0].nextSibling) {
            document.querySelectorAll('.idcard-img-con')[0].nextSibling.style.display = 'none'
        }
      } else {
          this.uploadIdCardZErr = true
      }
    },
    // 身份证正面上传失败
    uploadCardZErr() {
        this.$message.error('身份证正面上传失败')
        this.uploadIdCardZLoading = false
        this.uploadIdCardZErr = true
    },

     // 身份证反面上传前
    uploadCardFBefore(file) {
      if(!this.checkFile(file)) {
          return false
      }
      this.ruleForm.card_back = ''
      this.uploadIdCardFLoading = true
      this.uploadIdCardFErr = false
    },
    // 身份证反面上传成功
    uploadCardFSuccess(res,file) {
      this.uploadIdCardFLoading = false
     if (res.errno == 0) {
        this.ruleForm.card_back = res.data.url;
        this.$message.success("身份证反面上传成功");
        if(document.querySelectorAll('.idcard-img-con')[1].nextSibling) {
            document.querySelectorAll('.idcard-img-con')[1].nextSibling.style.display = 'none'
        }
      } else {
          this.uploadIdCardFErr = true
      }
    },

    // 身份证反面上传失败
    uploadCardFErr() {
        this.$message.error('身份证反面上传失败')
        this.uploadIdCardFLoading = false
        this.uploadIdCardFErr = true
    },
    // 初始化信息
    initData() {
        this.sourceType = this.$route.query.sourceType
        if(this.sourceType == 'edit') {
            this.isEdit = this.$route.query.isEdit
            this.isRefresh = 1
            this.isShowCheckTelDialog = false// 检查手机号dialog
            this.id = this.$route.query.id
            this.getStaffDetail()
        } else if(this.sourceType == 'add') {
            this.loading = false
            this.checkTelForm = {
                regTel: '', // 验证注册手机号
            }
            this.checkTelLoading = false // 手机号验证loading
            this.isShowCheckTelDialog = true// 检查手机号dialog
            this.isEdit = true
            this.ruleForm = {
                worker_name: '',
                worker_sex: '1',
                worker_phone: '',
                worker_photo: '',
                card_front: '',
                card_back: '',
                post_id: '',
                post_ids: []
            }
        }
    },
    // 获取员工详情
    getStaffDetail() {
        let that = this;
        that.loading = true
        that.ajax("workerDetail",{ user_id: this.id },"获取员工详情失败",res => {
            that.loading = false
          if (res.errno == 0) {
              let data = res.data
              let postArr = []
              if(data.post_list) {
                 data.post_list.forEach(item =>{
                     postArr.push(item.post_id)
                 })
                 this.postList = data.post_list
              }
              that.ruleForm = {
                worker_name: data.worker_name,
                worker_sex: data.worker_sex+'',
                worker_phone: data.worker_phone,
                worker_photo: data.worker_photo,
                card_front: data.card_front,
                card_back: data.card_back,
                post_id: postArr.join(','),
                post_ids: postArr,
                yuan_post_id: postArr.join(',')
            }
          } 
        },err => {
            that.loading = false
        }
      );
        
    },
    // 添加编辑员工提交
    submitForm(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
            if (valid) {
                that.submitLoading = true
                let params = JSON.parse(JSON.stringify(that.ruleForm))
                params.post_id = that.ruleForm.post_ids.join(',')
                if(this.sourceType == 'edit') {
                    params.user_id = that.id
                }
                that.ajax(this.sourceType == 'edit' ? 'workerEdit' : 'workerAdd',params,(this.sourceType == 'edit' ? '编辑' : '添加') + '员工失败',res =>{
                    that.submitLoading = false
                    if(res.errno == 0) {
                        that.isRefresh = 2
                        if(this.sourceType == 'edit') {
                            that.getStaffDetail()
                        } else {
                            // that.resetForm(formName)
                            that.checkTelForm = {
                                regTel: '', // 验证注册手机号
                            }
                            that.isShowCheckTelDialog = true// 检查手机号dialog
                            that.isEdit = true
                            that.ruleForm = {
                                worker_name: '',
                                worker_sex: '1',
                                worker_phone: '',
                                card_front: '',
                                card_back: '',
                                worker_photo: '',
                                post_id: '',
                                post_ids: []
                            }
                        }
                        that.$message.success((this.sourceType == 'edit' ? '编辑' : '添加') +'员工成功,请返回员工管理查看')
                    }
                }, err =>{
                    that.submitLoading = false
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

    // 验证注册手机号
    dialogCheckTel(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
            if (valid) {
                that.checkTelLoading = true
                that.ajax('checkTel',{
                    phone: that.checkTelForm.regTel,
                    type: 1
                },'',res =>{
                    that.checkTelLoading = false
                    if(res.errno == 0) {
                        that.isShowCheckTelDialog = false
                        let data = res.data
                        that.ruleForm = {
                            worker_name: data.name,
                            worker_sex: data.sex+'',
                            worker_phone: data.phone,
                            worker_photo: data.photo,
                            card_front: data.idcard_just,
                            card_back: data.idcard_reverse,
                            post_id: '',
                            post_ids: [],
                        }
                        that.$message.success('手机号还未注册,请填写注册信息')
                    }else if(res.errno == 2) {
                        that.$message.error('该手机已注册')
                        that.checkTelForm.regTel = ''
                    } else if(res.errno == 3) { // 无员工与社员注册信息
                        that.ruleForm.worker_phone =  that.checkTelForm.regTel
                        that.isShowCheckTelDialog = false
                        that.$message.success('手机号还未注册,请填写注册信息')
                    } else {
                        that.$message.error('手机号验证失败')
                    }
                }, err =>{
                    that.checkTelLoading = false
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
    // 显示图片大图
    showImgView(url) {
        if(url) {
            this.showViewer = true
            this.showViewImgs = [url]
        }
    },
    // 关闭图片大图
    closeImgView() {
        this.showViewer = false
        this.showViewImgs = []
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>
<style lang="less">
.add-staff {
    padding: 20px;
    .tit-con {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        .shu {
            width: 0.28rem;
            height: 1rem;
            background-color: #3B6AF1;
        }
        .tit {
            color: #444444;
            padding: 0 0.8rem;
            line-height: 1rem;
        }
        .bg {
            flex: 1;
            background: url('../../images/baseInfo/tit-bg.png');
            height: 1rem;
            background-size: 100% 100%;
        }
      
    }
     .form-item-con {
        margin: 2rem 0;
        position: relative;
        .el-form-item {
            width: 35%;
            float: left;
            height: 2.5rem;
            .el-form-item__label {
                font-size: 0.9rem;
            }
            .el-input {
                width: 80%;
                .read-idCard {
                    color: #3B6AF1;
                    background: #F0F8FF;
                    font-size: 0.75rem;
                    cursor: pointer;
                }
                .read-idCard:active {
                    opacity: 0.6;
                }
            }
        }
        .upload-con {
            width: 30%;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            .el-form-item__content {
                margin-left: 0!important;
            }
            .img-con {
                max-width: 100%;
                border: 1px solid #E4EDF6;
                border-bottom: 0;
                padding: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 10rem;
                height: 15rem;
                cursor: pointer;
                img {
                    max-width: 100%;
                    max-height: 100%
                }
            }
           
            .upload-btn {
                width: 100%;
                padding: 0.3rem 0;
                background: #E4EDF6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #3B6AF1;
                font-size: 0.9rem;
                cursor: pointer;
            }
            .upload-btn:hover {
                opacity: 0.6;
            }
        }
        .idcard-item-con {
            height: auto;
            .idcard-img {
                width: 175px;
                height: 112px;
                background: #fff;
                border: 1px solid #eee;
                border-radius: 8px;
                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .idcard-text {
                width: 175px;
                padding: 0.2rem 0;
                background: #E4EDF6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #3B6AF1;
                font-size: 0.9rem;
                cursor: pointer;
            }
        }
        .add-btn-con {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .btn-con {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 2rem;
        padding-bottom: 2rem;
        .el-button {
            width: 23%;
            padding: 0.9rem;
        }
    }

    .rule-dialog-con {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 9;
        .dialog-info {
            position: absolute;
            top: 50%;
            left: 50%;
            background:#fff;
            transform:translate(-50%,-50%);
            border-radius: 10px;
            width: 35%;
            padding: 30px 20px;
            display:flex;
            align-items: center;
            justify-content:center;
            flex-direction: column;
            .rule-tit-con {
                display: flex;
                align-items: center;
                justify-content: center;
                .el-icon-warning {
                    font-size: 24px;
                    color:#e6a23c;
                }
                .dialog-tit {
                    font-size: 18px;
                    color:#303133;
                    font-weight: bold;
                    padding-left: 8px;
                }
            }
            .rule-dialog-desc {
                font-size: 1rem;
                color: #888;
                padding: 15px 0;
            }
            .el-form {
                width: 80%;
                .el-form-item {
                    margin-bottom: 0;
                }
            }
            .rule-btn-con {
                padding-top: 20px;
            }
        }
    }
}
</style>