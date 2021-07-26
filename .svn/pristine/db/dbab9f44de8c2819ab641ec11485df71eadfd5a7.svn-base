<template>
    <div class="yinlianAuth">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>商户认证</el-breadcrumb-item>
                        <el-breadcrumb-item  class="breadcrumb-tit">银联认证</el-breadcrumb-item>
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
                <el-form-item label="商户类型:" prop="merchant_type" style="width:100%;">
                    <el-radio v-model="ruleForm.merchant_type" label="1">企业商户</el-radio>
                    <el-radio v-model="ruleForm.merchant_type" label="2">个体商户</el-radio>
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
                <el-form-item label="上传店内环境照片1:" prop="env_pic">
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
                <el-form-item label="上传店内环境照片2:" prop="env_pic_2">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleEnvPic2"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.env_pic_2" :src="ruleForm.env_pic_2" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <p @click="isShowUpload = !isShowUpload" :class="isShowUpload?'active':''">更多<i class="el-icon-arrow-down" v-if="!isShowUpload"></i><i class="el-icon-arrow-up" v-else></i></p>
                <el-form-item label="上传税务登记证:" v-show="isShowUpload">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleTaxPic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.tax_pic" :src="ruleForm.tax_pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传组织机构代码证:" v-show="isShowUpload">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleOrPic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.organization_pic" :src="ruleForm.organization_pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传辅助证明材料1:" v-show="isShowUpload">
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
                <el-form-item label="上传辅助证明材料2:" v-show="isShowUpload">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleProvePic2"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.prove_pic_2" :src="ruleForm.prove_pic_2" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="企业名称:" prop="short_name">
                    <el-input v-model="ruleForm.short_name" placeholder="请输入企业名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="法人姓名:" prop="legal_person">
                    <el-input v-model="ruleForm.legal_person" placeholder="请输入法人姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="营业地址:" prop="address" class="shortAddress">
                  <el-input v-model="ruleForm.address" placeholder="请输入营业地址" clearable>
                      <el-form-item prop="cooperation_address" slot="prepend">
                          <el-cascader v-model="address" :props="{ label: 'name', value: 'code' }" :placeholder="cooperation_address?cooperation_address:'请选择省市县'" :options="cooperativeOptions" @expand-change="handleExpandChange"  @change="handleCooperativeChange"></el-cascader>
                      </el-form-item>
                  </el-input>
                </el-form-item>
                <el-form-item label="营业执照开始日期:" prop="license_start">
                  <el-date-picker
                    v-model="ruleForm.license_start"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择营业执照开始日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="营业执照截止日期:" prop="license_end">
                  <el-date-picker
                    v-model="ruleForm.license_end"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择营业执照截止日期"
                    :readonly="checkYyzz">
                  </el-date-picker>
                  <span>
                    或选择
                    <el-checkbox v-model="checkYyzz" v-if="ruleForm.license_end=='' || ruleForm.license_end==null">长期</el-checkbox>
                    <el-checkbox v-model="checkYyzz" disabled v-else>长期</el-checkbox>
                  </span>
                </el-form-item>
                <el-form-item label="统一社会信用代码:" prop="license_num">
                    <el-input v-model="ruleForm.license_num" placeholder="请输入统一社会信用代码" clearable></el-input>
                </el-form-item>
            </div>

            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">法人信息</span>
                <div class="bg"></div>
            </div>

            <div class="form-item-con clearfix">
              <el-form-item label="上传人像页:" prop="card_front">
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
                <el-form-item label="上传国徽页:" prop="card_back">
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
                <el-form-item label="手持身份证自拍照:" prop="hand_card" v-if="ruleForm.merchant_type==2">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleCardPic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.hand_card" :src="ruleForm.hand_card" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="姓名:" prop="legal_person">
                    <el-input v-model="ruleForm.legal_person" placeholder="请输入法人姓名" clearable readonly></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="legal_person_phone">
                    <el-input v-model="ruleForm.legal_person_phone" placeholder="请输入法人联系手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="请输入法人邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item label="身份证号:" prop="legal_person_id">
                    <el-input v-model="ruleForm.legal_person_id" placeholder="请输入法人身份证号" clearable></el-input>
                </el-form-item>
                <el-form-item label="身份证开始日期:" prop="card_start">
                  <el-date-picker
                    v-model="ruleForm.card_start"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择身份证开始日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="身份证截止日期:" prop="card_expire">
                  <el-date-picker
                    v-model="ruleForm.card_expire"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择身份证截止日期"
                    :readonly="checkIdcard">
                  </el-date-picker>
                  <span>或选择
                    <el-checkbox v-model="checkIdcard" v-if="ruleForm.card_expire=='' || ruleForm.card_expire==null">长期</el-checkbox>
                    <el-checkbox v-model="checkIdcard" disabled v-else>长期</el-checkbox>
                  </span>
                </el-form-item>
            </div>

            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">账户信息</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="账户类型:" prop="account_type" v-if="ruleForm.merchant_type==2">
                    <el-radio v-model="ruleForm.account_type" label="1">对私账户</el-radio>
                    <el-radio v-model="ruleForm.account_type" label="2">对公账户</el-radio>
                </el-form-item>
                <el-form-item label="账户类型:" prop="account_type" v-if="ruleForm.merchant_type==1">
                  <span>对公账户</span>
                </el-form-item>
                <el-form-item label="开户银行:" prop="open_bank">
                  <el-select v-model="ruleForm.open_bank" placeholder="请选择开户银行" @change="getBranck">
                    <el-option
                      v-for="item in bankOptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开户地址:" prop="bank_address">
                  <el-cascader v-model="bank_address_arr" :props="{ label: 'name', value: 'code' }"  :placeholder="bank_address ? bank_address : '请选择省市'" :options="openbankOptions" @expand-change="handleChange"  @change="handleBankChange"></el-cascader>
                </el-form-item>
                <el-form-item label="开户支行:" prop="open_branch_bank">
                  <el-select v-model="ruleForm.open_branch_bank" filterable placeholder="请选择开户支行" @change="changeOpenBranch">
                    <el-option
                      v-for="item in bankBranchOptions"
                      :key="item.bankBranchName"
                      :label="item.bankBranchName"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开户名称:" prop="account_name" v-if="ruleForm.account_type==2 || ruleForm.merchant_type==1">
                    <el-input v-model="ruleForm.account_name" placeholder="请输入开户名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="开户手机号:" prop="open_phone" v-if="ruleForm.account_type==2 || ruleForm.merchant_type==1">
                    <el-input v-model="ruleForm.open_phone" placeholder="请输入开户手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="结算账号:" prop="account">
                    <el-input v-model="ruleForm.account" placeholder="请输入结算账号" clearable></el-input>
                </el-form-item>
                <el-form-item label="上传开户许可证:" prop="open_pic" v-if="ruleForm.account_type==2 || ruleForm.merchant_type==1">
                    <el-upload
                        class="avatar-uploader"
                        action="http://coopera.xfd365.com/user/auth/uploadImg"
                        :show-file-list="false"
                        accept="image/*"
                        :on-success="handleXukePic"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadErr">
                        <img v-if="ruleForm.open_pic" :src="ruleForm.open_pic" class="avatar">
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
  name: "yinlianAuth",
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
      isShowUpload: false,
      address:[],
      sub_mch_id:'',
      ruleForm: {
        merchant_type:'1',//商户类型：1企业商户 2个体商户	
        license:'',//营业执照照片	
        head_pic:'',//门头照片	
        env_pic:'',//店内环境照片1	
        env_pic_2:'',//店内环境照片2	
        short_name: "", //营业名称
        certify_province_id: "", //省
        certify_city_id: "", //市
        certify_county_id: "", //县
        address: "", //详细地址
        license_num:'',//营业执照统一社会信用代码	
        license_start:'',//营业执照开始日期	
        license_end:'',//营业执照截止日期	
        card_front: "", //身份证正面
        card_back: "", //身份证反面
        hand_card:'',//法人手持身份证照片	
        legal_person: "", //姓名
        legal_person_phone: "", //手机号
        email: "", //邮箱
        legal_person_id:'',//身份证号	
        card_start:'',//身份证开始日期	
        card_expire:'',//身份证截止期	
        open_bank:'',//开户行名称	
        open_branch_bank:'',//开户支行	
        account_name:'',//开户名称
        open_phone:'',//开户手机号	
        account:'',//结算账号
        open_pic:'',//开户许可证照片	
        account_type:'1',//账户类型：1、个人账户；2、对公账户
        bank_no:'',//开户支行代码	
        tax_pic:'',//商户税务登记证照片	
        organization_pic:'',//组织机构代码证照片	
        prove_pic:'',//辅助证明材料照片1	
        prove_pic_2:'',//辅助证明材料照片2	

        identify: "" //认证状态
      },
      rules: {
        merchant_type:[
          { required: true, message: "请选择商户类型", trigger: "blur" }
        ],
        license:[
          { required: true, message: "请上传营业执照", trigger: "blur" }
        ],
        head_pic:[
          { required: true, message: "请上传门头照片", trigger: "blur" }
        ],
        env_pic:[
          { required: true, message: "请上传室内照片1", trigger: "blur" }
        ],
        env_pic_2:[
          { required: true, message: "请上传室内照片2", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        legal_person:[
          { required: true, message: "请输入法人姓名", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        license_num:[
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        license_start:[
          { required: true, message: "请选择营业执照开始日期", trigger: "blur" }
        ],
        // license_end:[
        //   { required: true, message: "请选择营业执照截止日期", trigger: "blur" }
        // ],
        card_front:[
          { required: true, message: "请上传人像页", trigger: "blur" }
        ],
        card_back:[
          { required: true, message: "请上传国徽页", trigger: "blur" }
        ],
        hand_card:[
          { required: true, message: "请上传手持身份证自拍照", trigger: "blur" }
        ],
        legal_person_phone: [
          { required: true, validator: checkTel, trigger: "blur" }
        ],
        email: [
          { required: true, validator: checkEmail, trigger: "blur" }
        ],
        legal_person_id: [
          { required: true, validator: checkIdcardNum, trigger: "blur" }
        ],
        card_start:[
          { required: true, message: "请选择身份证开始日期", trigger: "blur" }
        ],
        // card_expire:[
        //   { required: true, message: "请选择身份证截止日期", trigger: "blur" }
        // ],
        account_type:[
          { required: true, message: "请选择账户类型", trigger: "blur" }
        ],
        open_bank:[
          { required: true, message: "请选择开户银行", trigger: "blur" }
        ],
        open_branch_bank:[
          { required: true, message: "请选择开户支行", trigger: "blur" }
        ],
        account_name:[
          { required: true, message: "请输入开户名称", trigger: "blur" }
        ],
        open_phone:[
          { required: true, message: "请输入开户手机号", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入结算账号", trigger: "blur" }
        ],
        open_pic:[
          { required: true, message: "请上传开户许可证", trigger: "blur" }
        ]
      },
      checkYyzz:false,
      checkIdcard:false,

      cooperation_address: "",
      cooperativeOptions: [],
      oneIndex: 0, // 当前合作社选择一级下标
      twoIndex: 0, // 当前合作社选择二级下标
      province_id: "", // 省code
      city_id: "", // 市code
      county_id:'',//县code

      bank: "", //开户行
      bank_address:'',
      bank_address_arr: [], //开户行地址
      bank_branch: "", //开户支行
      bankBranchOptions: [],
      openbankOptions: [],
      oneIndex1: 0, // 当前合作社选择一级下标
      twoIndex1: 0, // 当前合作社选择二级下标
      province_id1: "", // 省code
      city_id1: "", // 市code

      bankOptions: [],

      submitLoading: false,

      coopera_id: "",
      statusOptions: [
        {
          name: "未认证",
          id: "1"
        },
        {
          name: "认证中",
          id: "2"
        },
        {
          name: "已认证",
          id: "3"
        },
        {
          name: "认证拒绝",
          id: "4"
        }
      ],
      certifyStatus: ""
    };
  },
  activated() {
    this.coopera_id = this.$route.query.coopera_id;
    this.$refs["ruleForm"].resetFields();
    this.getCooperativeList(1, ""); // 默认获取1级列表(省)
    this.getCooperative(1,"")
    this.$axios
      .post("http://pay.xfd365.com/JSPay/selectAllWxBank")
      .then(res => {
        let arr = res.data;
        const newArr = arr.map(item => ({ name: item }));
        this.bankOptions = newArr;
      });
    if (this.coopera_id != undefined) {
      this.detail(this.coopera_id);
    }
  },
  methods: {
    detail(id) {
      this.ajax(
        "cooperaDetail",
        {
          coopera_id: id
        },
        "",
        res => {
          if (res.errno == 0) {
            this.ruleForm = res.data;
            this.ruleForm.account_type = res.data.account_type.toString();
            this.certifyStatus =
              res.data.identify == 1
                ? "未认证"
                : res.data.identify == 2
                  ? "认证中"
                  : res.data.identify == 3
                    ? "已认证"
                    : res.data.identify == 4 ? "认证拒绝" : "";
            this.cooperation_address = res.data.province + res.data.city;
            this.bank_address = res.data.bank_province + res.data.bank_city;
            this.oneText = res.data.province;
            this.twoText = res.data.city;
            this.oneText1 = res.data.bank_province;
            this.twoText1 = res.data.bank_city;
          }
        },
        err => {}
      );
    },
    // 门头上传成功
    handleHeadPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.head_pic = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 店内环境上传成功
    handleEnvPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.env_pic = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 店内环境2上传成功
    handleEnvPic2(res, file) {
      if (res.errno == 0) {
        this.ruleForm.env_pic_2 = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 税务登记证
    handleTaxPic(res, file){
      if (res.errno == 0) {
        this.ruleForm.tax_pic = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 组织机构代码证
    handleOrPic(res, file){
      if (res.errno == 0) {
        this.ruleForm.organization_pic = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 辅助证明材料1
    handleProvePic(res, file){
      if (res.errno == 0) {
        this.ruleForm.prove_pic = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 辅助证明材料2
    handleProvePic2(res, file){
      if (res.errno == 0) {
        this.ruleForm.prove_pic_2 = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 营业执照上传成功
    handleLicensePic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.license = res.data.url;
        this.$message.success("上传成功");
        this.ajax('aip_business_license',{
          license: res.data.url
        },"",res=>{
          if(res.errno == 0){
            this.$message.success('图片识别成功，已自动会填内容，请检查核对')
            if (res.data.short_name != '无') {
              this.ruleForm.short_name = res.data.short_name
              this.ruleForm.account_name = res.data.short_name
            }
            if (res.data.address != '无') {
              this.ruleForm.address = res.data.address
            }
            if (res.data.license_num != '无') {
              this.ruleForm.license_num = res.data.license_num
            }
            if (res.data.license_start != '无') {
              let start = res.data.license_start
              start = start.replace('年','-')
              start = start.replace('月','-')
              start = start.replace('日','')
              this.ruleForm.license_start = start
            }
            if (res.data.license_end != '无') {
              if(res.data.license_end == '长期'){
                this.checkYyzz = true
              }else{
                this.checkYyzz = false
              }
              this.ruleForm.license_end = res.data.license_end
            }
            if (res.data.legal_person != '无') {
              this.ruleForm.legal_person = res.data.legal_person
            }
          }else{
            this.$message.error(res.errmsg)
          }
        },err=>{})
      }
    },
    // 身份证正面上传成功
    handleCardZPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.card_front = res.data.url;
        this.$message.success("上传成功");
        this.ajax('aip_idcard_new',{
          side: 'front',
          idcard: res.data.url
        },"",res=>{
          if(res.errno == 0){
            this.$message.success('图片识别成功，已自动会填内容，请检查核对')
            if (res.data.certNumber != '无') {
              this.ruleForm.legal_person_id = res.data.certNumber;
              this.ruleForm.legal_person = res.data.partyName;
              if (res.data.partyName != this.ruleForm.legal_person) {
                setTimeout(() => {
                  this.$message.error('营业执照法人姓名和身份证姓名不一致，请进行确认')
                }, 1000);
              }
            }
          }else{
            this.$message.error(res.errmsg)
          }
        },err=>{})
      }
    },
    // 身份证反面上传成功
    handleCardFPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.card_back = res.data.url;
        this.$message.success("上传成功");
        this.ajax('aip_idcard_new',{
          side: 'back',
          idcard: res.data.url
        },"",res=>{
          if(res.errno == 0){
            this.$message.success('图片识别成功，已自动会填内容，请检查核对')
            if (res.data.effDate != '无') {
              let start = res.data.effDate
              let b=start.split(""); 
              b.splice(4, 0, "-");
              b.splice(7, 0, "-");
              start=b.join("");
              this.ruleForm.card_start = start
            }
            if (res.data.expDate != '无') {
              if(res.data.expDate == '长期'){
                this.checkIdcard = true
                this.ruleForm.card_expire = res.data.expDate
              }else{
                this.checkIdcard = false
                let end = res.data.expDate
                let b=end.split(""); 
                b.splice(4, 0, "-");
                b.splice(7, 0, "-");
                end=b.join("");
                this.ruleForm.card_expire = end
              }
            }
          }else{
            this.$message.error(res.errmsg)
          }
        },err=>{})
      }
    },
    // 手持身份证
    handleCardPic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.hand_card = res.data.url;
        this.$message.success("上传成功");
      }
    },
    // 开户许可证
    handleXukePic(res, file) {
      if (res.errno == 0) {
        this.ruleForm.open_pic = res.data.url;
        this.$message.success("上传成功");
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
            if (level < 3) {
              res.data.forEach(item => {
                item.children = [];
              });
            }
            if (level == 1) {
              that.cooperativeOptions = res.data;
            } else if (level == 2) {
              that.cooperativeOptions[that.oneIndex].children = res.data;
            } else if (level == 3) {
              that.cooperativeOptions[that.oneIndex].children[
                that.twoIndex
              ].children =
                res.data;
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
      } else if (arr.length == 2) {
        let twoArr = this.cooperativeOptions[this.oneIndex].children;
        for (let i = 0; i < twoArr.length; i++) {
          if (twoArr[i].code == arr[1]) {
            this.twoIndex = i;
            this.twoText = twoArr[i].name;
            twoArr[i].children = [];
            break;
          }
        }
      }
      this.getCooperativeList(arr.length + 1, arr[arr.length - 1]);
    },
    // 合作社级联菜单最终确认的值
    handleCooperativeChange(val) {
      if (val.length == 1) {
        this.ruleForm.certify_province_id = val[0];
      } else if (val.length == 2) {
        this.ruleForm.certify_city_id = val[1];
      } else if (val.length == 3) {
        this.ruleForm.certify_province_id = val[0];
        this.ruleForm.certify_city_id = val[1];
        this.ruleForm.certify_county_id = val[2];
        let twoArr = this.cooperativeOptions[this.oneIndex].children[this.twoIndex].children;
        let threeText = ''
        for (let i = 0; i < twoArr.length; i++) {
          if (twoArr[i].code == val[2]) {
            threeText = twoArr[i].name;
            break;
          }
        }
        this.cooperation_address = this.oneText + this.twoText + threeText;
      }
    },

    //省市
    // 获取合作社列表
    getCooperative(level, code) {
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
              that.openbankOptions = res.data;
            } else if (level == 2) {
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
      this.getCooperative(arr.length + 1, arr[arr.length - 1]);
    },
    // 合作社级联菜单最终确认的值
    handleBankChange(val) {
      if (val.length == 1) {
        this.province_id1 = val[0];
      } else if (val.length == 2) {
        this.province_id1 = val[0];
        this.city_id1 = val[1];
        let twoArr = this.cooperativeOptions[this.oneIndex].children;
        let threeText = ''
        for (let i = 0; i < twoArr.length; i++) {
          if (twoArr[i].code == val[1]) {
            threeText = twoArr[i].name;
            break;
          }
        }
        this.bank_address = this.oneText1 + threeText;
      }
      this.getBranck();
    },
    getBranck() {
      this.bank_branch = "";
      this.ajax(
        "getBranchBank",
        {
          city_id: this.city_id1,
          name: this.ruleForm.open_bank
        },
        "查询失败",
        res => {
          if (res.errno == 0) {
            this.bankBranchOptions = res.data;
          }
        },
        err => {}
      );
    },
    // 开户支行
    changeOpenBranch(val){
      this.ruleForm.bank_no = val
    },

    submitForm(formName) {
      let ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
      if(ruleForm.merchant_type==1){
        ruleForm.account_type = 2
      }
      ruleForm.certify_city_id = ruleForm.certify_city_id + '00'
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(ruleForm.certify_province_id == ''){
            this.$message.error('请选择营业地址省市县')
            return
          }
          if(this.ruleForm.license_end == '' && !this.checkYyzz){
            this.$message.error("请选择营业执照截止日期")
            return
          }
          if(this.ruleForm.card_expire == '' && !this.checkIdcard){
            this.$message.error("请选择身份证截止日期")
            return
          }
          if (ruleForm.merchant_type == 1) {
            ruleForm.hand_card = ''
          }
          if (ruleForm.account_type == 1) {
            ruleForm.account_name = ''
            ruleForm.open_phone = ''
            ruleForm.open_pic = ''
          }
          this.submitLoading = true;
          console.log(ruleForm)
          this.ajax(
            "miniCertify_new",
            ruleForm,
            "提交失败",
            res => {
              this.submitLoading = false;
              if (res.errno == 0) {
                this.$message.success(res.errmsg);
                this.$refs["ruleForm"].resetFields();
                this.checkYyzz = false
                this.checkIdcard = false
                this.address = []
                this.bank_address_arr = []
              }
            },
            err => {this.submitLoading = false;}
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
    }
  }
};
</script>
<style lang="less">
.yinlianAuth {
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
    >p.active{
        color: #409eff;
    }
    >p{
        cursor: pointer;
        text-align: right;
        font-size: 18px;
        margin: 20px 100px;
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