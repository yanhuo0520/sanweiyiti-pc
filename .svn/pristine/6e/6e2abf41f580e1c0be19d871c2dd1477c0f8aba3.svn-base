<template>
    <div class="loan-apply" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>借款业务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">借款申请</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- <el-button size="small" @click="initData()">刷新</el-button> -->
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" style="margin-top: 0.5rem" label-width="100px">
            <div class="loan-title">{{cooperationInfo.name ? cooperationInfo.name : '合作社'}}借款申请</div>
            <div class="loan-date">{{loanDate}}</div>
             <div class="form-item-con clearfix">
                <el-form-item label="账号卡号:"  style="width:37%">
                    <el-input v-model="bankNo" placeholder="请输入账号卡号" @keyup.enter.native="inquireBankNo" clearable>
                         <template #append>
                            <span class="read-idCard" @click="readBankNo()">读卡号</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" size="small" @click="inquireBankNo" :loading="searchLoading">查询</el-button>
             </div>
            <template v-if="isInquire && ruleForm.user_id">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">社员基本信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="身份证号码:">
                        <el-input v-model="userInfo.idcard"  readonly></el-input>
                    </el-form-item>
                    <el-form-item label="社员姓名:">
                        <el-input v-model="userInfo.name" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址:">
                        <el-input :value="userInfo.address ? userInfo.address : userInfo.native_place" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码:">
                        <el-input v-model="userInfo.phone" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">借款办理</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="卡号:" prop="loan_num">
                        <el-input v-model="ruleForm.loan_num" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="借款日期:">
                        <el-input v-model="loanDate" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="借款编号:">
                        <el-input v-model="ruleForm.loan_code" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="借款产品:" prop="product_id">
                        <el-select v-model="ruleForm.product_id" placeholder="请选择借款产品" @change="loanProductChange">
                            <el-option v-for="(item,index) in loanProductOptions" :key="index" :label="item.product_name" :value="item.product_id"></el-option>
                        </el-select>
                    </el-form-item>
                     
                    <!-- <el-form-item label="借款类型:" prop="loan_type_id">
                        <el-select v-model="ruleForm.loan_type_id" placeholder="请选择借款类型" @change="loanTypeChange">
                            <el-option v-for="(item,index) in loanTypeOptions" :key="index" :label="item.loan_type_name" :value="item.loan_type_id"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="还款方式:" prop="repayment_id">
                        <el-select v-model="ruleForm.repayment_id" placeholder="请选择还款方式" >
                            <el-option v-for="(item,index) in repaymentOptions" :key="index" :label="item.repayment_name" :value="item.repayment_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="借款类型:"  v-if="ruleForm.product_id">
                       <el-input v-model="loanTypeName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="借款期限:" prop="loan_term_id" v-if="ruleForm.product_id">
                        <el-select v-model="ruleForm.loan_term_id" placeholder="请选择借款期限" @change="selectRepayment">
                            <el-option v-for="(item,index) in loanTermOptions" :key="index" :label="item.loan_term_name" :value="item.loan_term_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-if="ruleForm.product_id">
                        <template v-if="loanRateOptions && loanRateOptions.length > 0">
                            <el-form-item label="借款利率:">
                                <el-input :value="loanRateOptions[0].loan_rate+ '‰'" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="逾期加罚:">
                                <el-input :value="loanRateOptions[0].overdue_rate+ '‰'" readonly></el-input>
                            </el-form-item>
                        </template>
                        <template v-else>
                            <el-form-item label="借款利率:">
                                <span><span style="color:red">产品异常</span>,请检查该产品<span style="color:red">是否设置利率</span></span>
                            </el-form-item>
                            <el-form-item label="逾期加罚:">
                                <span><span style="color:red">产品异常</span>,请检查该产品<span style="color:red">是否设置逾期加罚率</span></span>
                            </el-form-item>
                        </template>
                    </template>
                    <el-form-item label="借款用途:"  prop="loan_use_id">
                        <el-select v-model="ruleForm.loan_use_id" placeholder="请选择借款用途">
                            <el-option v-for="(item,index) in loanUseOptions" :key="index" :label="item.loan_use_name" :value="item.loan_use_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="责任人:" v-if="handleInfo.post_name">
                        <el-input :value="handleInfo.post_name" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="借款金额:" prop="loan_money">
                        <el-input v-model="ruleForm.loan_money" @input="handleLoanPrice" @blur="loanPriceBlur" placeholder="请输入借款金额" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="大写:">
                        <el-input v-model="uppercasePrice" readonly></el-input>
                    </el-form-item>
                </div>

                <template v-if="ruleForm.loan_type_id == 2 && ruleForm.product_id">
                    <div class="tit-con">
                        <div class="shu"></div>
                        <span class="tit">担保人选择</span>
                        <div class="bg"></div>
                    </div>
                    <div class="form-item-con clearfix">
                        <el-form-item label="社员名称:">
                            <el-input v-model="searchName" placeholder="请输入社员名称" @keyup.enter.native="inquireuserLists"  clearable></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号:" prop="loan_num">
                            <el-input v-model="searchCardId" placeholder="请输入社员身份证号" @keyup.enter.native="inquireuserLists" clearable>
                                 <template #append>
                                    <span class="read-idCard" @click="readCert()">读身份证</span>
                                    <span v-if="connectText != ''">({{connectText}})</span>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-button type="primary" size="small" @click="inquireuserLists" >查询</el-button>
                    </div>

                    <template v-if="ruleForm.guarantees && ruleForm.guarantees.length > 0">
                        <div class="user-list-con" v-for="(item,index) in ruleForm.guarantees" :key="index">
                            <img class="del-icon" @click="delGuaranteesItem(item,index)" src="../../images/baseInfo/del-family.png" alt="" v-if="index > 0">
                            <div class="form-item-con user-form-item-con clearfix">
                                <el-form-item label="担保人:">
                                    <el-input v-model="item.name" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="担保类型:" :prop="'guarantees.'+index+'.guarantee_type'" :rules="{ required: true, message: '请选择担保类型', trigger: 'change' }" >
                                    <el-select v-model="item.guarantee_type" placeholder="请选择担保类型">
                                        <el-option v-for="(item,index) in loanGuarOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="担保人额度:" v-if="item.guarantee_type != 1">
                                    <el-input v-model="item.guarantee_amount" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="此次担保额度:" :prop="'guarantees.'+index+'.guarantee_money'" :rules="{ required: true, validator: checkLoanPrice, trigger: 'blur' }">
                                    <el-input v-model="item.guarantee_money" @input="changeMoney(item)" placeholder="请输入此次担保额度" clearable></el-input>
                                </el-form-item>
                            </div>
                            <template v-if="item.guarantee_type == 1">
                                <div class="form-item-con user-form-item-con clearfix" >
                                    <template v-if="item.assets &&  item.assets.length > 0">
                                        <div class="assets-con clearfix" v-for="(subItem,subIndex) in item.assets" :key="subIndex">
                                            <el-form-item label="担保资产详情:" :prop="'guarantees.'+index+'.assets.'+subIndex+'.guarantee_type_id'" :rules="{ required: true, message: '请选择资产担保类型', trigger: 'change' }">
                                                <el-select v-model="subItem.guarantee_type_id" placeholder="请选择资产担保类型" >
                                                    <el-option v-for="(typeItem,typeIndex) in guaranteeTypeOptions" :key="typeIndex" :label="typeItem.type_name" :value="typeItem.type_id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item :label="subItem.guarantee_type_id == 1 ? '房产类型:' : subItem.guarantee_type_id == 2 ? '汽车品牌:' : '资产名称:'" :prop="'guarantees.'+index+'.assets.'+subIndex+'.assets_name'"  :rules="{ required: true, message: '请输入当前资产名称或类型', trigger: 'blur' }">
                                                <el-input v-model="subItem.assets_name" :placeholder="'请输入当前' + (subItem.guarantee_type_id == 1 ? '房产类型' : subItem.guarantee_type_id == 2 ? '汽车品牌' : '资产名称')" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="现价格:" :prop="'guarantees.'+index+'.assets.'+ subIndex +'.assets_price'" :rules="{ required: true, validator: checkLoanPrice, trigger: 'blur' }">
                                                <el-input v-model="subItem.assets_price" placeholder="请输入当前资产现价格" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item v-if="subItem.guarantee_type_id == 2" label="购买价格:" :prop="'guarantees.'+index+'.assets.'+ subIndex +'.assets_last_price'" :rules="{ required: true,validator: checkLoanPrice, trigger: 'blur' }">
                                                <el-input v-model="subItem.assets_last_price" placeholder="请输入购买价格" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item v-if="subItem.guarantee_type_id != 2" :label="subItem.guarantee_type_id == 1 ? '房产年限:' : '资产年限:'" :prop="'guarantees.'+index+'.assets.'+ subIndex +'.assets_age'" :rules="{ required: true, message: '请输入当前资产年限', trigger: 'blur' }">
                                                <el-input v-model="subItem.assets_age" :placeholder="'请输入'+(subItem.guarantee_type_id == 1 ? '房产年限' : '资产年限')" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="资产详情:" class="assets-form-item">
                                                <template  v-if="subItem.imgs && subItem.imgs.length > 0">
                                                    <div class="pic-item" v-for="(imgItem,imgIndex) in subItem.imgs" :key="imgIndex" >
                                                        <img @click="showImgView(imgItem.url)" class="pic" :src="imgItem.url" alt="">
                                                        <div v-if="imgItem.status && imgItem.status !='done'" style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;flex-direction:column">
                                                            <i style="color:#fff;font-size:1.5rem" :class="imgItem.status == 'uploading' ? 'el-icon-loading' : 'el-icon-circle-close'"></i>
                                                            <span style="color:#fff;font-size:1rem">{{imgItem.status == 'uploading' ? '上传中...' : '上传失败'}}</span>
                                                        </div>
                                                        <img v-if="imgItem.status && imgItem.status !='uploading'" @click.stop="delImgItem(index,subIndex,imgIndex)" style="position:absolute; top:0;right:0;transform:translate(50%, -50%);width:20px;height:20px;cursor:pointer" src="/static/img/iframe-close.png" alt="">
                                                    </div>
                                                </template>
                                                <el-button style="float:left" plain type="primary" size="small" @click="scanAssets(index,subIndex)" >扫描资产证明</el-button>
                                            </el-form-item>
                                            <el-button v-if="subIndex > 0" type="danger" size="small" style="position:absolute;right:1rem; top:0" @click="delAssetItem(index,subIndex)">删除资产</el-button>
                                        </div>
                                    </template>
                                     <div class="add-btn-con">
                                        <el-button type="primary" rouond size="small" @click="addAssets(item)" >新增担保资产</el-button>
                                    </div>
                                </div>
                            </template>
                        </div>
                   </template>
                </template>
            </template>
            <div class="btn-con" v-if="isInquire && ruleForm.user_id">
                <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : '保存'}}</el-button>
            </div>
        </el-form>

        <el-dialog title="选择担保人" :visible.sync="dialogUserTableVisible">
            <el-table :data="userList" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column property="user_id" label="ID" width="100" align="center"></el-table-column>
                <el-table-column label="社员类型">
                    <template slot-scope="scope">
                        <template v-if="scope.row.cls == 1">
                            <el-tag size="medium"  effect="dark" >自然人</el-tag>
                        </template>
                        <template v-if="scope.row.cls == 2">
                            <el-tag size="medium"  effect="dark" type="success">机构</el-tag>
                        </template>
                        <template v-if="scope.row.cls == 3">
                            <el-tag size="medium"  effect="dark" type="warning">集体经济组织</el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column  label="名称" >
                    <template slot-scope="scope">
                        <template v-if="scope.row.cls == 1">
                            {{scope.row.name}}
                        </template>
                        <template v-else>
                            {{scope.row.short_name}}({{scope.row.name}})
                        </template>
                    </template>
                </el-table-column>
                <el-table-column property="idcard" label="身份证号"></el-table-column>
                <el-table-column property="guarantee_amount" label="社内担保额度">
                    <template slot-scope="scope">
                        <p>总额度:<span style="color:#409EFF">{{scope.row.guarantee_amount}}</span></p>
                        <p>剩余额度:<span style="color:#67c23a">{{scope.row.guarantee_surplus}}</span></p>
                    </template>
                </el-table-column>
            </el-table>
             <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUserTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="confirmSelect">确 定</el-button>
            </div>
        </el-dialog>
        <el-image-viewer v-if="showViewer"  :on-close="closeImgView"  :url-list="viewerImgs" />

         <div class="iframe-absolute-con" v-if="showIframe" @click="showIframe = false">
            <iframe @click.stop=""  class="scan-iframe" id="iframeId"  frameborder="0"></iframe>
        </div> 

        <div class="iframe-absolute-con" v-if="showReadIframe" @click="showReadIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="readIframeId" src="./static/readCert.html?path=loanApplyread" frameborder="0"></iframe>
        </div> 

        <div class="iframe-absolute-con" v-if="showReadIc" @click="showReadIc = false">
            <iframe @click.stop=""  class="ic-iframe" id="readIcIframeId"  frameborder="0"></iframe>
        </div>
        <!-- <object id="CertCtl" type="application/cert-reader" width="0" height="0"></object> -->
    </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: "loanApply",
  data() {
    var checkLoanPrice = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入金额'));
        }
        let loanPriceReg = /^\d+$|^\d*\.\d+$/;
        if (!loanPriceReg.test(value)) {
        callback(new Error('请输入正确的金额'));
        } else {
            callback();
        }
    };
    return {
      cooperationInfo: {},
      handleInfo:{},
      bankNo: '',
      lastBankNo: '',
      isInquire: false,
      loanDate: '',  // 借款日期
      uppercasePrice: '', // 大写金额
      loanTypeName: '',
      userInfo: {
        name: '',
        address: '',
        phone: '',
        idcard: '',
      },
      ruleForm: {
        loan_num: '',
        loan_code: '',
        loan_type_id: '',
        loan_term_id: '',
        repayment_id: '',
        rate_id: '',
        overdue_rate: '',
        loan_use_id: '',
        loan_money: '',
        product_id: '',

        guarantees:[]
      },
      rules: {
        // loan_type_id: [
        //     { required: true, message: '请选择借款类型', trigger: 'change' }
        // ],
        product_id: [
            { required: true, message: '请选择借款产品', trigger: 'change' }
        ], 
        repayment_id: [
            { required: true, message: '请选择还款类型', trigger: 'change' }
        ], 
        loan_term_id: [
            { required: true, message: '请选择借款期限', trigger: 'change' }
        ], 
        loan_use_id: [
            { required: true, message: '请选择借款用途', trigger: 'change' }
        ], 
        loan_money: [
            { required: true, validator: checkLoanPrice, trigger: 'change' }
        ]
      },
      loanProductOptions: [], // 借款产品
      loanTypeOptions: [],
      loanTermOptions: [],
      repaymentOptions: [],
      loanUseOptions: [],
      loanRateOptions: [],
      loanGuarOptions: [],
      guaranteeTypeOptions: [],
      searchLoading: false,
      submitLoading: false,
      
      searchName: '', // 要搜索的社员名称
      searchCardId: '', // 要搜索的社员身份证号
      userList: [], // 担保人搜索结果列表
      dialogUserTableVisible: false, // 担保人表格选择弹窗
      curSelectArr: [], // 当前选中的担保人

      showViewer: false, // 是否显示图片放大组件
      viewerImgs:[], // 当前资产详情内的资产照片组

      checkLoanPrice:checkLoanPrice, // 金额验证规则

      showIframe: false,
      uploadBase64: '',
      uploadLoading: false,
      uploadErr: false,

      showReadIframe: false, // 身份证识别
      idcardBase64: '', // 身份证base64

      uploadIdCardLoading: false,
      uploadIdCardErr: false,

      showReadIc: false, // 读取卡号弹窗
      icUuid: '', // IC卡芯片卡号

      connectText:'',
      loading: false
    };
  },
  components: { ElImageViewer },
  activated() {
    this.utils.checkToken(this,res =>{
        if(res && res.errno == 0) {
            this.showReadIframe = false
            this.initData()
        } else {
            this.loading = false
        }
    })
    // this.verifyBrowser()
  },	
  created() {
    window.addEventListener("message",(event)=>{
        if(event.data && event.data.path && event.data.path == 'loanApply') {
            if(event.data.type == 'data') {
                this.base64Upload(event.data.data,event.data.level1,event.data.level2)
                this.showIframe = false	
            }
            if(event.data.type == 'close') {
                this.showIframe = false	
            }
        }
        if(event.data && event.data.path && event.data.path == 'loanApplyread') {
            if(event.data.type == 'data') {
                this.idcardBase64 = event.data.data
                this.idcardBase64Upload(this.idcardBase64)
                this.showReadIframe = false	
            }
            if(event.data.type == 'close') {
                this.showReadIframe = false	
            }
        }
         if(event.data && event.data.path && event.data.path == 'loanApplyReadIc') {
            if(event.data.type == 'data') {
                this.icUuid = event.data.data
                this.getBankNo()
                this.showReadIc = false	
            }
            if(event.data.type == 'close') {
                this.showReadIc = false	
            }
        }
    }, false)
  },
  methods: {
      // 初始化信息
        initData() {
            this.loading = false
            this.isInquire = false
            this.lastBankNo = ''
            this.bankNo = ''
            this.cooperationInfo = JSON.parse(localStorage.getItem('cooperationInfo'))
            this.handleInfo = JSON.parse(localStorage.getItem('userInfo'))
            this.loanDate = this.utils.dateFormat('yyyy年MM月dd日')
            this.ruleForm = {
                loan_num: '',
                loan_code: '',
                loan_type_id: '',
                loan_term_id: '',
                repayment_id: '',
                rate_id: '',
                overdue_rate: '',
                loan_use_id: '',
                loan_money: '',
                product_id: '',
                guarantees:[]
            }
            this.searchName = ''// 要搜索的社员名称
            this.searchCardId = '' // 要搜索的社员身份证号
            this.userList = []
            this.userInfo.name = '';
            this.userInfo.address = '';
            this.userInfo.phone = '';
            this.userInfo.idcard = '';
            this.uppercasePrice = '';
            this.loanRateOptions = [];
            this.loanTermOptions = [];
            this.repaymentOptions = [];
            this.ruleForm.repayment_id = ''
        },
        //担保金额验证
        changeMoney (item) {
            item.guarantee_money = item.guarantee_money.replace(/[^\d.]/g, "");  //仅保留数字和"."
			item.guarantee_money = item.guarantee_money.replace(/\.{2,}/g, "."); //两个连续的"."仅保留第一个"."
			item.guarantee_money = item.guarantee_money.replace(".", "$#*").replace(/\./g,'').replace('$#*','.');//去除其他"."
			item.guarantee_money = item.guarantee_money.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');;//限制只能输入两个小数
			if (item.guarantee_money.indexOf(".") < 0 && item.guarantee_money != "") { //首位是0的话去掉
				item.guarantee_money = parseFloat(item.guarantee_money);
            }
            let tmpVal = JSON.parse(JSON.stringify(item.guarantee_money))
            if (Number(item.guarantee_money) > Number(item.guarantee_surplus)) {
                item.guarantee_money = item.guarantee_surplus
            }
            return item.guarantee_money
        },
      //借款金额保留两位小数
      handleLoanPrice(val) {
          val = this.utils.handlePrice(val)
          this.ruleForm.loan_money = val
      },
      // 读卡号
      readBankNo() {
        this.showReadIc = true
        this.bankNo = ''
        setTimeout(() =>{
            document.getElementById('readIcIframeId').src='./static/autoGetCardSN.html?path=loanApplyReadIc';
        },100)
      },
      // 根据IC芯片卡号获取卡号
    getBankNo() {
        let that = this;
        that.ajax('searchICCard',{
            uuid:that.icUuid
        },'获取卡号失败',res => {
            if (res.errno == 0) {
                that.bankNo = res.data.card;
                that.inquireBankNo()
            } else {
                that.ruleForm.user_id = null
                that.lastBankNo = ''
                that.resetForm()
            }
        });
    },
    // base64上传到服务器
    base64Upload(base64,level1,level2) {
        let that = this
        that.ruleForm.guarantees[level1].assets[level2].imgs.push({status:'uploading',url: ''})
        let curUploadIndex = that.ruleForm.guarantees[level1].assets[level2].imgs.length - 1
        that.ajax('base64Upload',{
            file: base64
        },'图片上传服务器失败',res =>{
            that.uploadLoading = false
            that.scanDialog2 = false
            if(res.errno == 0) {
                that.ruleForm.guarantees[level1].assets[level2].imgs[curUploadIndex] ={status:'done',url: res.data}
            } else {
                that.ruleForm.guarantees[level1].assets[level2].imgs[curUploadIndex] ={status:'failed',url: ''}
            }
            that.$forceUpdate()
        },err =>{
            that.ruleForm.guarantees[level1].assets[level2].imgs[curUploadIndex] = {status:'failed',url: ''}
            that.$forceUpdate()
            that.scanDialog2 = false
        })
    },
    //识别身份证
    idcardBase64Upload(base64) {
        let that = this
        that.uploadIdCardErr = false
        that.uploadIdCardLoading = true
        that.ajax('idcardBase64',{
            file: base64
        },'识别身份证识别',res =>{
            that.uploadIdCardLoading = false
            if(res.errno == 0) {
                that.uploadIdCardErr = false
                let data = res.data
                that.searchCardId = data.certNumber
                that.searchName = data.partyName
                if(data && data.certNumber && data.partyName) {
                    that.getUserList()
                }
            } else {
                that.uploadIdCardErr = true
            }
        },err =>{
            that.uploadIdCardErr = true
            that.uploadIdCardLoading = false
        })
    },
    // 根据识别的身份证号与姓名获取数据
    getUserList() {
        let that = this;
        that.ajax('userLists',{
            name: that.searchName,
            idcard: that.searchCardId
        },'查询失败',res =>{
            if(res.errno == 0) {
                if(res.data && res.data.length > 0) {
                    // 确认选择担保人
                    that.userList = res.data
                    that.handleSelectionChange(that.userList)
                    setTimeout(() =>{
                        that.confirmSelect()
                    })
                } else {
                    that.$message(res.errmsg ? res.errmsg : '暂未查询到该人员')
                }
            } else {
                that.userList = []
            }
        },err =>{
            that.userList = []
        })
    },
      // 查找银行卡号
      inquireBankNo() {
        let that = this
        if(!that.bankNo) {
            that.$message.error('请输入您的卡号')
            return
        }
        if(that.lastBankNo && that.lastBankNo == that.bankNo) {
            that.$message.error('请不要重复查询')
            return
        }
        that.searchLoading = true
		that.ajax('searchPassbook_num',{
			card: that.bankNo,
		},'查询失败',res =>{
             that.searchLoading = false
			if(res.errno == 0) {
                if(res.data.user_id) {
                    if(res.data.passbook_status == 1){
                        that.isInquire =  true
                        that.lastBankNo = that.bankNo
                        that.ruleForm.loan_num = that.bankNo 
                        that.ruleForm.user_id = res.data.user_id
                        that.ruleForm.passbook_num = res.data.passbook_num
                        that.ruleForm.relation_code = res.data.relation_code
                        that.userInfo = res.data
                        that.getLoanCode()
                    }else if(res.data.passbook_status == 0){
                        that.$message.error('该卡已挂失，请补卡')
                    }else if(res.data.passbook_status == 2){
                        that.$message.error('该卡已删除')
                    }
                } else {
                    that.ruleForm.user_id = null
                    that.lastBankNo = ''
                    that.$message.error('暂未查到该卡号用户信息!')
                    that.resetForm()
                }
			} else {
                that.resetForm()
            }
		}, err =>{
            that.searchLoading = false
            that.resetForm()
        })
      },
      // 生成借款编号
      getLoanCode() {
        let that = this;
        that.loading = true
        that.ajax('loanCode',{},'获取借款编号失败',res =>{
            that.loading = false
            if(res.errno == 0) {
                that.ruleForm.loan_code = res.data
                // that.getLoanType()
                that.getLoanProduct()
                // that.getLoanTerm()
                that.getLoanUse()
            }
        },err =>{
            that.loading = false
        })
      },
    //   // 获取借款类型列表
    //   getLoanType() {
    //     let that = this;
    //     that.ajax('loanType',{},'获取借款类型失败',res =>{
	// 		if(res.errno == 0) {
    //            if(res.data && res.data.length > 0) {
    //             that.ruleForm.loan_type_id = res.data[0].loan_type_id
    //             if(that.ruleForm.loan_type_id == 2) {
    //                 that.getLoanGuar()
    //                 that.getGuaranteeType()
    //             }
    //             if(that.ruleForm.loan_term_id) {
    //                 that.getLoanRate(that.ruleForm.loan_term_id,res.data[0].loan_type_id)
    //             }
    //             that.loanTypeOptions =  res.data
    //            }
	// 		}
	// 	})
    //   },
      // 获取借款产品列表
      getLoanProduct() {
        let that = this;
        that.ajax('loanProductSelect',{},'获取借款产品列表失败',res =>{
			if(res.errno == 0) {
               if(res.data && res.data.data && res.data.data.length > 0) {
                // that.ruleForm.product_id = res.data.data[0].product_id
                that.loanProductOptions =  res.data.data
                // that.loanTypeName = res.data.data[0].loan_type_name
                // that.ruleForm.loan_type_id = res.data.data[0].loan_type_id
                // that.getLoanTerm(res.data.data[0].product_id)
                // if(that.ruleForm.loan_type_id == 2) { // loan_type_id 2-走担保借款 1-银行信用
                //     that.getLoanGuar()
                //     that.getGuaranteeType()
                // }
               }
			}
		})
      },
      // 改变借款类型
    //   loanTypeChange(val) {
    //       let that = this;
    //       if(val == 2) {
    //           if(!that.loanGuarOptions || that.loanGuarOptions.length == 0) {
    //             that.getLoanGuar()
    //           }
    //           if(!that.guaranteeTypeOptions || that.guaranteeTypeOptions.length == 0) {
    //             that.getGuaranteeType()
    //           }
    //       }
    //       if(that.ruleForm.loan_term_id){
    //         that.getLoanRate(this.ruleForm.loan_term_id,val)
    //       }

    //   },
      // 获取担保类型列表
      getLoanGuar() {
        let that = this;
        that.ajax('loanGuar',{},'获取担保类型失败',res =>{
			if(res.errno == 0) {
               if(res.data && res.data.length > 0) {
                that.loanGuarOptions =  res.data
               }
			}
		})
      },
      // 获取还款方式
      getRepayment(sign) {
        let that = this;
        that.loading = true 
        that.ajax('repayment',{
            sign:sign
        },'获取还款方式失败',res =>{
            that.loading = false 
			if(res.errno == 0) {
                if(res.data && res.data.length > 0) {
                    that.ruleForm.repayment_id = res.data[0].repayment_id
                    that.repaymentOptions =  res.data
                } else {
                    that.ruleForm.repayment_id = ''
                    that.repaymentOptions =  []
                }   
			}
		}, err =>{
            that.loading = false 
            that.ruleForm.repayment_id = ''
            that.repaymentOptions =  []
        })
      },
      // 获取借款年限列表
      getLoanTerm(product_id) {
        let that = this;
        that.loading = true
        that.loanTermOptions = []
        that.ajax('loanTerm',{
            product_id: product_id
        },'获取借款年限失败',res =>{
			if(res.errno == 0) {
                if(res.data && res.data.length > 0){
                    that.ruleForm.loan_term_id = res.data[0].loan_term_id
                    that.loanTermOptions =  res.data
                    that.getLoanRate(res.data[0].loan_term_id,product_id)
                    that.getRepayment(res.data[0].sign)
                } else {
                    that.loading = false 
                    that.ruleForm.loan_term_id = ''
                    that.ruleForm.rate_id = ''
                    that.ruleForm.overdue_rate = ''
                    that.$message.error('借款期限为空,请前往 系统配置=>借款产品配置 查看配置是否正常')
                }
                
			} else {
                that.loading = false
                that.ruleForm.loan_term_id = ''
                that.ruleForm.rate_id = ''
                that.ruleForm.overdue_rate = ''
            }
		}, err =>{
            that.loading = false
            that.ruleForm.loan_term_id = ''
            that.ruleForm.rate_id = ''
            that.ruleForm.overdue_rate = ''
        })
      },
      // 获取借款用途
      getLoanUse() {
        let that = this;
        that.ajax('loanUse',{},'获取借款用途失败',res =>{
			if(res.errno == 0) {
                if(res.data && res.data.length > 0) {
                    that.ruleForm.loan_use_id = res.data[0].loan_use_id
                    that.loanUseOptions =  res.data
                }
			}
		})
      },
      // 获取资产类型
      getGuaranteeType() {
        let that = this;
        that.ajax('guaranteeType',{},'获取资产类型失败',res =>{
			if(res.errno == 0) {
                if(res.data && res.data.length > 0) {
                    that.guaranteeTypeOptions =  res.data
                }
			}
		})
      },
      // 改变资产类型
    //   guaranteeTypeChange() {

    //   },
      // 通过期限id 获取 借款利率与加罚率
      getLoanRate(loan_term_id,product_id) {
            let that = this;
            that.loading = true
            that.ajax('loanRate',{
                loan_term_id: loan_term_id,
                product_id: product_id,
            },'获取利率与加罚率失败',res =>{
                that.loading = false
                if(res.errno == 0) {
                    if(res.data && res.data.length > 0) {
                        that.ruleForm.rate_id = res.data[0].rate_id
                        that.ruleForm.overdue_rate = res.data[0].overdue_rate
                        that.loanRateOptions =  res.data
                    } else {
                        that.ruleForm.rate_id = ''
                        that.ruleForm.overdue_rate = ''
                        that.loanRateOptions = []
                    }
                }else {
                    that.ruleForm.rate_id = ''
                    that.ruleForm.overdue_rate = ''
                }
            }, err =>{
                that.loading = false 
                that.ruleForm.rate_id = ''
                that.ruleForm.overdue_rate = ''
            })
      },
      // 选择借款期限
      selectRepayment(val) {
          if(this.ruleForm.product_id) {
            this.getLoanRate(val,this.ruleForm.product_id)
          }
      },
      // 选择借款产品
      loanProductChange(val) {
          let loanProductOptions = JSON.parse(JSON.stringify(this.loanProductOptions))
          loanProductOptions.forEach(item =>{
              if(item.product_id == val) {
                  this.loanTypeName = item.loan_type_name
                  this.ruleForm.loan_type_id = item.loan_type_id
              }
          })
          this.getLoanTerm(val)
          if(this.ruleForm.loan_type_id == 2) {
               this.getLoanGuar()
                this.getGuaranteeType()
          }
      },
      // 借款金额失去焦点事件
      loanPriceBlur(val) {
          let reg = /^\d+$|^\d*\.\d+$/;
          if(reg.test(this.ruleForm.loan_money)) {
            this.uppercasePrice = this.utils.digitUppercase(this.ruleForm.loan_money)
          }
      },
      // 担保人搜索
      inquireuserLists() {
        let that = this
        if(!that.searchName && !that.searchCardId) {
            that.$message.error('请输入社员名称或身份证号')
            return
        }
		that.ajax('userLists',{
            name: that.searchName,
            idcard: that.searchCardId
		},'查询失败',res =>{
			if(res.errno == 0) {
                if(res.data && res.data.length > 0) {
                    that.dialogUserTableVisible = true
                    that.userList = res.data
                } else {
                    this.$message(res.errmsg ? res.errmsg : '暂未查询到数据,请换个关键词搜索')
                }
			} else {
                that.userList = []
            }
		},err =>{
            that.userList = []
        })
      },      
      // 选择担保人
      handleSelectionChange(val) {
          let tmpAll = JSON.parse(JSON.stringify(this.ruleForm.guarantees))
          let objItem = {}
          let tmpArr = []
          let newArr = []
          if(tmpAll && tmpAll.length > 0) {
            let allArr = tmpAll.concat(val)
            tmpArr =this.utils.delObjByParam(allArr,'user_id')
          } else {
             tmpArr = val
          }
          tmpArr.forEach(item =>{
              let tmpObj = {
                  name: item.name ? item.name : '',
                  user_id: item.user_id ? item.user_id : '',
                  guarantee_amount: item.guarantee_amount ? item.guarantee_amount : '',
                  guarantee_money: item.guarantee_money ? item.guarantee_money : '',
                  guarantee_type: item.guarantee_type ? item.guarantee_type : 0,
                  assets: item.assets && item.assets.length > 0 ? item.assets : [{
                    guarantee_type_id: '',
                    assets_price: '',
                    assets_last_price: '',
                    assets_name: '',
                    assets_age: '',
                    imgs: [],
                  }]
                
              }
              newArr.push(tmpObj)
          })
          this.curSelectArr = newArr
      },
      // 确认选择担保人
      confirmSelect() {
          this.ruleForm.guarantees = this.curSelectArr
          this.dialogUserTableVisible = false
      },
      // 添加资产
      addAssets(item) {
          let tmpObj = {
            name: item.name,
            user_id: item.user_id,
            guarantee_amount: item.guarantee_amount,
            guarantee_money: '',
            guarantee_type_id: '',
            assets_price: '',
            assets_last_price: '',
            assets_name: '',
            assets_age: '',
            imgs: [],
         }
         item.assets.push(tmpObj)
      },
      // 删除资产
      delAssetItem(index,subIndex) {
          this.ruleForm.guarantees[index].assets.splice(subIndex,1)
      },
      // 删除当前资产正面图片
      delImgItem(index,subIndex,imgIndex) {
          this.ruleForm.guarantees[index].assets[subIndex].imgs.splice(imgIndex,1)
      },
      // 点击扫描资产正面
      scanAssets(index,subIndex) {
           this.showIframe = true
            setTimeout(() =>{
                document.getElementById('iframeId').src='./static/scanPrimaryPhoto.html?path=loanApply&level1='+index+'&level2='+subIndex;
            },500)
      },
    //   读身份证号
    readCert() {
        if(this.uploadIdCardLoading) {
            this.$message({
                message: '正在识别身份证信息...',
                type: 'warning'
            });
            return
        }
        if(this.uploadIdCardErr) {
            this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.idcardBase64Upload(this.idcardBase64)
                }).catch(() => {
                    this.showReadIframe = true
                    setTimeout(() =>{
                        document.getElementById('readIframeId').src='./static/readCert.html?path=loanApplyread';
                    },500)
            });
            return
        }
        this.showReadIframe = true
        setTimeout(() =>{
            document.getElementById('readIframeId').src='./static/readCert.html?path=loanApplyread';
        },500)
        return
        var CertCtl = document.getElementById("CertCtl");
        var that = this

        try {
            var result = CertCtl.readCert();
            var newresult = JSON.parse(result);
            this.searchCardId = newresult.resultContent.certNumber
            this.searchName = newresult.resultContent.partyName
            that.ajax('userLists',{
                name: that.searchName,
                idcard: that.searchCardId
            },'查询失败',res =>{
                if(res.errno == 0) {
                    if(res.data && res.data.length > 0) {
                        // 确认选择担保人
                        that.userList = res.data
                        that.handleSelectionChange(that.userList)
                        setTimeout(() =>{
                            that.confirmSelect()
                        })
                    } else {
                        that.$message(res.errmsg ? res.errmsg : '暂未查询到该人员')
                    }
                } else {
                    that.userList = []
                }
            },err =>{
                that.userList = []
            })
        } catch (e) {}
    },
    // 验证浏览器
    verifyBrowser(){
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.connect();
            return true;
        } else {
            this.$message({
            message: "身份证验证仅支持IE浏览器",
            type: "error",
            customClass: "zZindex",
            duration: 5000,
            showClose: true
            });
            return false;
        }
    },
    clearForm(){
    },
    connect() {
    this.clearForm();
    var CertCtl = document.getElementById("CertCtl");
    try {
        var result = CertCtl.connect();
        var newresult = JSON.parse(result);
        if (newresult.resultFlag == 0) {
        this.connectText = "已连接";
        } else {
        this.connectText = "未连接";
        }
    } catch (e) {
    }
    },
      // 删除当前担保人
      delGuaranteesItem(item,index) {
          this.ruleForm.guarantees.splice(index,1)
      },
      // 显示图片大图
      showImgView(imgs) {
          this.viewerImgs = [imgs]
          this.showViewer = true
       },
       // 关闭图片大图
       closeImgView() {
            this.showViewer = false
            this.viewerImgs = []
       },
      // 提交表单
      submitForm(formName) {
            let that = this
            that.$refs[formName].validate((valid) => {
            if (valid) {
                let params = JSON.parse(JSON.stringify(that.ruleForm))
                params.guarantees.forEach(item =>{
                    item.assets.forEach(subItem =>{
                        subItem.imgurl = ''
                        if(subItem.imgs && subItem.imgs.length > 0) {
                            subItem.imgs.forEach((imgItem,imgIndex) =>{
                                if(imgIndex == 0) {
                                    subItem.imgurl = imgItem.url
                                } else {
                                    subItem.imgurl+= ','+imgItem.url
                                }
                            })
                        }
                    })
                })
                params.guarantees = JSON.stringify(params.guarantees)
                params.relation_id = that.userInfo.relation_id
                that.submitLoading = true
                that.ajax('loanAdd',params,'借款申请失败',res =>{
                    that.submitLoading = false
                    if(res.errno == 0) {
                        that.$message.success('借款申请成功')
                        that.resetForm()
                        that.isInquire = false
                        that.lastBankNo = ''
                        that.bankNo = ''
                        that.ruleForm = {
                            loan_num: '',
                            loan_code: '',
                            loan_type_id: '',
                            loan_term_id: '',
                            repayment_id: '',
                            rate_id: '',
                            overdue_rate: '',
                            loan_use_id: '',
                            loan_money: '',
                            product_id: '',
                            guarantees:[]
                        }
                        that.searchName = ''// 要搜索的社员名称
                        that.searchCardId = '' // 要搜索的社员身份证号
                        that.userList = []
                    }
                }, err =>{
                    that.submitLoading = false
                })
            } else {
                setTimeout(()=>{
                    let isError= document.getElementsByClassName("is-error");
                    let firstErrInput = isError[0].querySelector('input')
                    if(firstErrInput.type == 'file') {
                        document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop = 50
                    } else {
                        firstErrInput.focus();
                    }
                },100);
                return false;
            }
            });
        },
      // 重置form表单
      resetForm() {
        this.$refs['ruleForm'].resetFields();
        this.userInfo.name = '';
        this.userInfo.address = '';
        this.userInfo.phone = '';
        this.userInfo.idcard = '';
      
        this.lastBankNo = '';
        this.uppercasePrice = '';

        this.ruleForm.loan_num = '';
        this.ruleForm.loan_code = '';
        this.ruleForm.rate_id = '';
        this.ruleForm.product_id = '';
        this.ruleForm.overdue_rate = '';
        this.loanRateOptions = [];
      }
  }
};
</script>
<style lang="less">
.loan-apply {
    padding: 20px;
    .loan-title {
        text-align: center;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .loan-date {
        text-align: center;
        color: #333;
        margin-top: 0.4rem;
    }
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
        .del-family-icon {
            position:absolute;
            right: 0;
            top: 0.5rem;
            height: 1.5rem;
            cursor: pointer;
        }
    }
     .form-item-con {
        margin: 2rem 0;
        position: relative;
        .assets-con {
            position: relative;
        }
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
        .add-btn-con {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .user-list-con {
        position: relative;
        border-bottom: 1px solid #dcdfe6; 
        margin-top: 1rem;
        .user-form-item-con {
            margin: 0;
            .el-form-item {
                width: 22%;
                float: left;
                .el-form-item__label {
                    font-size: 0.9rem;
                }
                .el-input {
                    width: 100%;
                }
            }
            .assets-form-item {
                width: 100%;
                margin-bottom: 0;
                height: auto;
                .pic-item {
                    position: relative;
                    float: left;
                    width: 8rem;
                    height: 8rem;
                    padding: 0.5rem;
                    border: 1px solid #dcdfe6;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    margin-bottom: 1rem;
                    .pic {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
        }
        .del-icon {
            position:absolute;
            right: 0;
            top: -1rem;
            height: 1.5rem;
            cursor: pointer;
        }
    }
    .user-list-con:first-of-type {
        margin-top: 0;
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
    .scan-iframe {
        position: absolute;
        top:50%;
        left: 50%;
        width: 800px;
        height: 700px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .scan-iframe2 {
        position: absolute;
        top:50%;
        left: 50%;
        width: 500px;
        height: 410px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .ic-iframe {
        position: absolute;
        top:50%;
        left: 50%;
        width: 500px;
        height: 200px;
        transform: translate(-50%,-70%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .iframe-absolute-con {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6)
    }
}

</style>