<template>
    <div class="weixinAuth">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>商户认证</el-breadcrumb-item>
                        <el-breadcrumb-item  class="breadcrumb-tit">微信认证</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="tit-con" v-if="coopera_id!=undefined">
                <div class="shu"></div>
                <span class="tit">认证状态</span>
                <div class="bg"></div>
            </div>
            <div style="margin-top:20px;" v-if="coopera_id!=undefined"  class="form-item-con clearfix">
              <el-form-item label="认证状态:">
                <el-select v-model="certifyStatus" placeholder="请选择认证状态">
                    <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商户号:">
                  <el-input placeholder="请输入商户号" v-model="sub_mch_id" clearable></el-input>
              </el-form-item>
              
            </div>

            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">商户信息</span>
                <div class="bg"></div>
            </div>

            <div class="form-item-con clearfix">
                <el-form-item label="营业名称:" prop="short_name">
                    <el-input v-model="ruleForm.short_name" placeholder="请输入营业名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="营业地址:" prop="address" class="shortAddress">
                  <el-input v-model="ruleForm.address" placeholder="请输入营业地址" clearable>
                      <el-form-item prop="cooperation_address" slot="prepend">
                          <el-cascader v-model="cooperation_address" :props="{ label: 'name', value: 'code' }"  :placeholder="cooperation_address ? cooperation_address : '请选择省市'" :options="cooperativeOptions" @expand-change="handleExpandChange"  @change="handleCooperativeChange"></el-cascader>
                      </el-form-item>
                  </el-input>
                </el-form-item>
                <el-form-item label="售卖商品信息:" prop="goods_info">
                    <el-select v-model="ruleForm.goods_info" placeholder="请选择售卖商品信息">
                        <el-option v-for="(item,index) in shopOptions" :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传门头照片:" prop="head_pic">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleHeadPic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.head_pic" :src="ruleForm.head_pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传店内环境照片:" prop="env_pic">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleEnvPic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.env_pic" :src="ruleForm.env_pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传营业执照照片:" prop="license">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleLicensePic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.license" :src="ruleForm.license" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传辅助证明材料:" prop="prove_pic">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleProvePic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.prove_pic" :src="ruleForm.prove_pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>

            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">个人信息</span>
                <div class="bg"></div>
            </div>

            <div class="form-item-con clearfix">
                <el-form-item label="姓名:" prop="legal_person">
                    <el-input v-model="ruleForm.legal_person" placeholder="请输入您的姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="legal_person_phone">
                    <el-input v-model="ruleForm.legal_person_phone" placeholder="请输入您的手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="请输入您的邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item label="账户类型:" prop="account_type">
                    <el-radio v-model="ruleForm.account_type" label="1">个人账户</el-radio>
                    <el-radio v-model="ruleForm.account_type" label="2">对公账户</el-radio>
                </el-form-item>
                <el-form-item label="开户行:" prop="bank">
                  <el-select v-model="ruleForm.bank" placeholder="请选择开户行" @change="getBranck">
                    <el-option
                      v-for="item in bankOptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开户地址:" prop="bank_address">
                  <el-cascader v-model="bank_address" :props="{ label: 'name', value: 'code' }"  :placeholder="bank_address ? bank_address : '请选择省市'" :options="openbankOptions" @expand-change="handleChange"  @change="handleBankChange"></el-cascader>
                </el-form-item>
                <el-form-item label="开户支行:" prop="open_bank">
                  <el-select v-model="ruleForm.open_bank" filterable placeholder="请选择开户支行">
                    <el-option
                      v-for="item in bankBranchOptions"
                      :key="item.bankBranchName"
                      :label="item.bankBranchName"
                      :value="item.bankBranchName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="银行账户姓名:" prop="account_name">
                    <el-input v-model="ruleForm.account_name" placeholder="请输入银行账户姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="银行账号:" prop="account">
                    <el-input v-model="ruleForm.account" placeholder="请输入银行账号" clearable></el-input>
                </el-form-item>
                
                <el-form-item label="身份证号码:" prop="legal_person_id">
                    <el-input v-model="ruleForm.legal_person_id" placeholder="请输入您的身份证号码" clearable></el-input>
                </el-form-item>
                <el-form-item label="有效期限:" prop="card_expire">
                    <el-input v-model="ruleForm.card_expire" placeholder="请输入身份证有效期限" clearable></el-input>
                </el-form-item>
                <el-form-item label="身份证正面照片:" prop="card_front">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleCardZPic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.card_front" :src="ruleForm.card_front" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="身份证反面照片:" prop="card_back">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleCardFPic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.card_back" :src="ruleForm.card_back" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="btn-con">
                <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : '立即提交'}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "weixinAuth",
  data() {
    var checkIdcardNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入身份证号"));
      }
      let idCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!idCardreg.test(value)) {
        callback(new Error("请输入正确的身份证号"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }
      let emailreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!emailreg.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
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
      ruleForm: {
        short_name: "", //营业名称
        province:'',//省
        city:'',//市
        address: "", //详细地址
        goods_info: "", //售卖信息
        head_pic: "", //门头照片
        env_pic: "", //店内环境照片
        license: "", //营业执照照片
        prove_pic: "", //辅助证明材料

        legal_person: "", //姓名
        legal_person_phone: "", //手机号
        email: "", //邮箱
        account_type: "1", //账户类型
        bank:'',//开户行
        bank_province:'',//开户行省
        bank_city:'',//开户行市
        open_bank: "", //开户支行
        account_name: "", //银行账户姓名
        account: "", //银行账号
        legal_person_id: "", //身份证号码
        card_expire: "", //有效期限
        card_front: "", //身份证正面
        card_back: "", //身份证反面

        identify:'',//认证状态
      },
        sub_mch_id:'',//商户号
      rules: {
        short_name: [
          { required: true, message: "请输入营业名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        goods_info: [
          { required: true, message: "请选择售卖信息", trigger: "blur" }
        ],
        head_pic: [
          { required: true, message: "请上传门头照片", trigger: "blur" }
        ],
        env_pic: [
          { required: true, message: "请上传店内环境照片", trigger: "blur" }
        ],
        license: [
          { required: true, message: "请上传营业执照照片", trigger: "blur" }
        ],
        // prove_pic: [
        //   { required: true, message: "请上传辅助证明材料", trigger: "blur" }
        // ],
        legal_person: [
          { required: true, message: "请输入您的姓名", trigger: "blur" }
        ],
        legal_person_phone: [
          { required: true, validator: checkTel, trigger: "blur" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        account_type: [
          { required: true, message: "请选择账户类型", trigger: "blur" }
        ],
        bank: [
          { required: true, message: "请选择开户行", trigger: "blur" }
        ],
        open_bank: [
          { required: true, message: "请选择开户支行", trigger: "blur" }
        ],
        account_name: [
          { required: true, message: "请输入银行账户姓名", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入银行账户", trigger: "blur" }
        ],
        legal_person_id: [
          { required: true, validator: checkIdcardNum, trigger: "blur" }
        ],
        card_expire: [
          { required: true, message: "请输入有效期限", trigger: "blur" }
        ],
        card_front: [
          { required: true, message: "请上传身份证正面照片", trigger: "blur" }
        ],
        card_back: [
          { required: true, message: "请上传身份证反面照片", trigger: "blur" }
        ]
      },
      shopOptions: [
        {
          name: "休闲娱乐",
          id: 0
        },
        {
          name: "交通出行",
          id: 1
        },
        {
          name: "居民生活服务",
          id: 2
        },
        {
          name: "线下销售",
          id: 3
        },
        {
          name: "餐饮",
          id: 4
        },
        {
          name: "其他",
          id: 5
        }
      ],

      cooperation_address: "",
      cooperativeOptions: [],
      oneIndex: 0, // 当前合作社选择一级下标
      twoIndex: 0, // 当前合作社选择二级下标
      province_id: "", // 省code
      city_id: "", // 市code

      bank:'',//开户行
      bank_address: "",//开户行地址
      bank_branch:'',//开户支行
      bankBranchOptions:[],
      openbankOptions: [],
      oneIndex1: 0, // 当前合作社选择一级下标
      twoIndex1: 0, // 当前合作社选择二级下标
      province_id1: "", // 省code
      city_id1: "", // 市code

      bankOptions: [],

      submitLoading: false,

      coopera_id:'',
      statusOptions:[{
        name:'未认证',
        id:'1'
      },{
        name:'认证中',
        id:'2'
      },{
        name:'已认证',
        id:'3'
      },{
        name:'认证拒绝',
        id:'4'
      }],
      certifyStatus:''
    };
  },
  activated() {
    this.coopera_id = this.$route.query.coopera_id
                this.$refs["ruleForm"].resetFields();
    this.getCooperativeList(1, ""); // 默认获取1级列表(省)
    this.$axios
      .post("http://pay.xfd365.com/JSPay/selectAllWxBank")
      .then(res => {
        let arr = res.data;
        const newArr = arr.map(item => ({ name: item }));
        this.bankOptions = newArr;
      });
    if(this.coopera_id != undefined){
      this.detail(this.coopera_id)
    }
  },
  methods: {
    detail(id){
      this.ajax('cooperaDetail',{
        coopera_id: id
      },'',res=>{
        if(res.errno == 0){
          this.ruleForm = res.data
          this.ruleForm.account_type = res.data.account_type.toString()
          this.certifyStatus = res.data.identify==1?'未认证':res.data.identify==2?'认证中':res.data.identify==3?'已认证':res.data.identify==4?'认证拒绝':''
          this.cooperation_address = res.data.province + res.data.city
          this.bank_address = res.data.bank_province + res.data.bank_city
          this.oneText = res.data.province
          this.twoText = res.data.city
          this.oneText1 = res.data.bank_province
          this.twoText1 = res.data.bank_city
        }
      },err=>{})
    },
    // 门头上传成功
    handleHeadPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.head_pic = res.data.url;
        this.$message("上传成功");
      }
    },
    // 店内环境上传成功
    handleEnvPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.env_pic = res.data.url;
        this.$message("上传成功");
      }
    },
    // 营业执照上传成功
    handleLicensePic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.license = res.data.url;
        this.$message("上传成功");
      }
    },
    // 辅助证明材料上传成功
    handleProvePic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.prove_pic = res.data.url;
        this.$message("上传成功");
      }
    },
    // 身份证正面上传成功
    handleCardZPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.card_front = res.data.url;
        this.$message("上传成功");
      }
    },
    // 身份证反面上传成功
    handleCardFPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.card_back = res.data.url;
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

    //省市
    // 获取合作社列表
    getCooperativeList(level, code) {
      let that = this;
      this.ajax(
        "cooperative",
        {
          level: level,
          code: code
        },
        "",
        res => {
          if (res.errno == 0) {
            if (level < 2) {
              res.data.forEach(item => {
                item.children = [];
              });
            }
            if (level == 1) {
              that.cooperativeOptions = res.data;
              that.openbankOptions = res.data;
            } else if (level == 2) {
              that.cooperativeOptions[that.oneIndex].children = res.data;
              that.openbankOptions[that.oneIndex1].children = res.data;
            }
          } else {
            that.$message.error(res.errmsg);
          }
        },
        err => {}
      );
    },
    // 当前已经选择的值
    handleExpandChange(arr) {
      if (arr.length == 1) {
        for (let i = 0; i < this.cooperativeOptions.length; i++) {
          if (this.cooperativeOptions[i].code == arr[0]) {
            this.oneIndex = i;
            this.oneText = this.cooperativeOptions[i].name;
            this.cooperativeOptions[i].children = [];
            break;
          }
        }
      }
      this.getCooperativeList(arr.length + 1, arr[arr.length - 1]);
    },
    // 合作社级联菜单最终确认的值
    handleCooperativeChange(val) {
      if (val.length == 1) {
        this.province_id = val[0];
      } else if (val.length == 2) {
        this.province_id = val[0];
        this.city_id = val[1];
        let twoArr = this.cooperativeOptions[this.oneIndex].children;
        for (let i = 0; i < twoArr.length; i++) {
          if (twoArr[i].code == val[1]) {
            this.twoText = twoArr[i].name;
            break;
          }
        }
      }
      this.cooperation_address = this.oneText + this.twoText;
    },

    // 当前已经选择的值
    handleChange(arr) {
      if (arr.length == 1) {
        for (let i = 0; i < this.openbankOptions.length; i++) {
          if (this.openbankOptions[i].code == arr[0]) {
            this.oneIndex1 = i;
            this.oneText1 = this.openbankOptions[i].name;
            this.openbankOptions[i].children = [];
            break;
          }
        }
      }
      this.getCooperativeList(arr.length + 1, arr[arr.length - 1]);
    },
    // 合作社级联菜单最终确认的值
    handleBankChange(val) {
      if (val.length == 1) {
        this.province_id1 = val[0];
      } else if (val.length == 2) {
        this.province_id1 = val[0];
        this.city_id1 = val[1];
        let twoArr = this.openbankOptions[this.oneIndex1].children;
        for (let i = 0; i < twoArr.length; i++) {
          if (twoArr[i].code == val[1]) {
            this.twoText1 = twoArr[i].name;
            break;
          }
        }
      }
      this.bank_address = this.oneText1 + this.twoText1;
      this.getBranck()
    },
    getBranck(){
      this.bank_branch = ''
      this.ajax('getBranchBank',{
        city_id:this.city_id1,
        name:this.ruleForm.bank
      },'查询失败',res=>{
        if(res.errno == 0){
          this.bankBranchOptions = res.data
        }
      },err=>{

      })
    },

    submitForm(formName) {
      this.ruleForm.province = this.oneText
      this.ruleForm.city = this.twoText
      this.ruleForm.bank_province = this.oneText1
      this.ruleForm.bank_city = this.twoText1
      this.ruleForm.sub_mch_id = this.sub_mch_id
      if(this.certifyStatus == 1 || this.certifyStatus == 2 || this.certifyStatus == 3 || this.certifyStatus == 4){
        this.ruleForm.identify = this.certifyStatus
      }else{
        this.ruleForm.identify = this.certifyStatus=='未认证'?'1':this.certifyStatus=='认证中'?'2':this.certifyStatus=='已认证'?'3':this.certifyStatus=='认证拒绝'?'4':''
      }
      if(this.ruleForm.province == undefined || this.ruleForm.city == undefined || this.ruleForm.province == '' || this.ruleForm.city == ''){
        this.$message.error('请选择营业地址、输入详细地址')
        return;
      }
      if(this.oneText1 == undefined || this.oneText1 == ''){
        this.$message.error('请选择开户行地址')
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.ajax('weixinCertify',this.ruleForm,'提交失败',res=>{
            this.submitLoading = false;
            if(res.errno == 0){
              this.$message.success(res.errmsg)
                this.$refs["ruleForm"].resetFields();
                this.cooperation_address = ''
                this.addDetail = ''
                this.bank = ''
                this.bank_address = ''
                this.bank_branch = ''
            }
          },err=>{})
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
    }
  }
};
</script>
<style lang="less">
.weixinAuth {
  padding: 20px;
  .tit-con {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .shu {
      width: 0.28rem;
      height: 1rem;
      background-color: #3b6af1;
    }
    .tit {
      color: #444444;
      padding: 0 0.8rem;
      line-height: 1rem;
    }
    .bg {
      flex: 1;
      background: url("../../images/baseInfo/tit-bg.png");
      height: 1rem;
      background-size: 100% 100%;
    }
    .del-family-icon {
      position: absolute;
      right: 0;
      top: 0.5rem;
      height: 1.5rem;
      cursor: pointer;
    }
  }
  .form-item-con {
    margin: 2rem 0;
    position: relative;
    .el-form-item {
      width: 50%;
      float: left;
      .el-form-item__label {
        font-size: 0.9rem;
      }
      .el-input {
        width: 80%;
        .read-idCard {
          color: #3b6af1;
          background: #f0f8ff;
          font-size: 0.75rem;
          cursor: pointer;
        }
        .read-idCard:active {
          opacity: 0.6;
        }
      }
      .el-select {
        width: 80%;
        .el-input {
          width: 100%;
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
        margin-left: 0 !important;
      }
      .img-con {
        max-width: 100%;
        border: 1px solid #e4edf6;
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
          max-height: 100%;
        }
      }

      .upload-btn {
        width: 100%;
        padding: 0.3rem 0;
        background: #e4edf6;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3b6af1;
        font-size: 0.9rem;
        cursor: pointer;
      }
      .upload-btn:hover {
        opacity: 0.6;
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

  .shortAddress {
    .el-input-group__prepend {
      width: 30%;
      padding: 0;
      border: none;
    }
    .el-form-item,
    .el-cascader {
      .el-input {
        width: 100%;
      }
      width: 100%;
    }
  }

  .btn-con {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5rem;
    padding-bottom: 2rem;
    .el-button {
      width: 23%;
      padding: 0.9rem;
    }
  }
}
</style>