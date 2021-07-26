<template>
    <div class="depositAmount">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>股金业务</el-breadcrumb-item>
                        <el-breadcrumb-item  class="breadcrumb-tit">股金入股</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="股金账户:" prop="stock_num">
                    <el-input v-model="stock_num" placeholder="请输入股金账户" clearable :readonly="isRead"></el-input>
                </el-form-item>
               <!-- <el-form-item label="股金账户:" prop="stock_num">
                    <el-input v-model="stock_num" placeholder="请输入股金账户" clearable :readonly="isRead">
                        <template #append>
                            <span class="read-idCard" @click="readBankNo()">读卡号</span>
                        </template>
                    </el-input>
                </el-form-item> -->
                <el-button  type="primary" @click="findcard()" size="small" >查找</el-button>
            </div>
            <template v-if="ruleForm.relation_id">
              <div class="tit-con">
                  <div class="shu"></div>
                  <span class="tit">股金入股</span>
                  <div class="bg"></div>
              </div>
              <div class="form-item-con clearfix">
                  <el-form-item label="凭证号:" prop="save_proof">
                      <el-input v-model="ruleForm.save_proof" clearable readonly></el-input>
                  </el-form-item>
                  <el-form-item label="入股金额:" prop="money">
                      <el-input v-model="ruleForm.money" placeholder="请输入您的入股金额" clearable :readonly="isRead" @input="inputMoney" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="入股日期:" prop="save_date">
                      <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择存入日期" v-model="ruleForm.save_date" style="width: 80%;" readonly></el-date-picker>
                  </el-form-item>
                  <!-- <el-form-item label="记红日期:" prop="save_date">
                      <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择记红日期" v-model="ruleForm.start_rate_date" style="width: 80%;"></el-date-picker>
                  </el-form-item> -->
                  <el-form-item label="存入类型:" prop="save_type_id">
                    <p>股金</p>
                  </el-form-item>
                  <el-form-item label="股金类型:" prop="save_term_id">
                      <el-select v-model="ruleForm.save_term_id" placeholder="请选择股金类型" :disabled="isRead">
                          <el-option v-for="(item,index) in qixianOptions" :key="index" :label="item.term_name" :value="item.id"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="密码:" prop="pwd">
                      <el-input v-model="ruleForm.pwd" clearable type="password" :readonly="isRead"></el-input>
                  </el-form-item>
              </div>
              <div class="btn-con">
                  <el-button type="warning" round v-if="isRead">该卡状态暂不能存入</el-button>
                  <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading" v-else>{{submitLoading ? '提交中...' : '立即创建'}}</el-button>
              </div>
            </template>
        </el-form>
        <div class="iframe-absolute-con" v-if="showReadIc" @click="showReadIc = false">
            <iframe @click.stop=""  class="ic-iframe" id="readIcIframeId"  frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
export default {
  name: "depositAmount",
  data() {
    return {
      ruleForm: {
        relation_id: "", //互助金卡号
        save_proof: "", //凭证号
        money: "", //存款金额
        save_date: "", //存入日期
        start_rate_date: "", //记红日期
        save_type_id: "1", //存入类型
        save_term_id: "", //股金类型
        fixdate_code: "", //定期编号
        pwd:"",//密码
        type:1
      },
      lilv: "", //利率
      stock_num:'',
      rules: {
        relation_id: [
          { required: true, message: "请输入社员账号并查找", trigger: "blur" }
        ],
        save_proof: [{ required: true, message: "请输入凭证号", trigger: "blur" }],
        money: [
          { required: true, message: "请输入存款金额", trigger: "blur" }
        ],
        save_date: [
          { required: true, message: "请选择存入日期", trigger: "blur" }
        ],
        save_type_id: [
          { required: true, message: "请选择存入类型", trigger: "blur" }
        ],
        save_term_id: [
          { required: true, message: "请选择股金类型", trigger: "blur" }
        ],
        fixdate_code: [
          { required: true, message: "请输入定期编号", trigger: "blur" }
        ],
        // end_rate_date: [
        //   { required: true, message: "请选择定期到期日期", trigger: "blur" }
        // ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      typeOptions: [], //存入类型
      qixianOptions: [], //入股期限
      type_id: "",
      info:{},

      isFind:false,
      showReadIc: false, // 读取卡号弹窗
      icUuid: '', // IC卡芯片卡号

      submitLoading: false,

      isRead:false
    };
  },
  created() {
    window.addEventListener("message",(event)=>{
         if(event.data && event.data.path && event.data.path == 'depositAmount2ReadIc') {
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
  activated() {
    this.cunruType();
    this.resetForm();
    this.lilv = ''
    let date = new Date();
    let dd = this.$formatDate("YYYY-mm-dd HH:MM:SS", date);
    this.ruleForm.save_date = dd.substring(0, 10);
    this.ruleForm.start_rate_date = dd.substring(0, 10);
    dd = dd.replace(/-/g, "");
    dd = dd.replace(/:/g, "");
    dd = dd.replace(/ /g, "");
    this.ruleForm.save_proof = "P" + dd + this.$getRndInteger(1111,9999);
    this.ruleForm.fixdate_code = dd + this.$getRndInteger(1111,9999);
      this.isRead = false
      this.ruleForm.relation_id = ''
      this.stock_num = ''
  },
  
  methods: {
    inputMoney(){
      this.ruleForm.money = this.ruleForm.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
    },  
    // 读卡号
    readBankNo() {
      this.showReadIc = true
      this.stock_num = ''
      setTimeout(() =>{
          document.getElementById('readIcIframeId').src='./static/autoGetCardSN.html?path=depositAmount2ReadIc';
      },100)
    },
    // 根据IC芯片卡号获取卡号
    getBankNo() {
      let that = this;
      that.ajax('searchICCard',{
        uuid:that.icUuid
      },'获取卡号失败',res => {
          if (res.errno == 0) {
            that.stock_num  = res.data.card;
            that.findcard()
          }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    //   存入类型查询
    cunruType() {
      this.ajax(
        "passbookType",
        {
          type: 1
        },
        "获取存入类型失败",
        res => {
          if (res.errno == 0) {
            let data = res.data.filter((ele)=>{
              return ele.id == 1
            })
            this.typeOptions = data;
            this.save_type_id = data[0].id
            this.type_id = data[0].id
            this.rugu();
          }
        },
        err => {}
      );
    },
    //   股金类型
    rugu() {
      this.ajax(
        "passbookTerm",
        {
          type_id: this.type_id
        },
        "获取股金类型失败",
        res => {
          if (res.errno == 0) {
            this.qixianOptions = res.data;
          }
        },
        err => {}
      );
    },
    // 选择存入类型
    changeType(val) {
      this.typeOptions.forEach(ele=>{
        if(ele.id == val){
          this.type_id = ele.id
        }
      })
      
      this.rugu();
    },

    findcard() {
      let str = this.stock_num
      str = str.replace(/\s+/g,"");
      this.stock_num = str
      if (str == "") {
        this.$message.error("请输入股金账户");
        return;
      }
      this.ruleForm.relation_id = ''
      this.ajax(
        "searchCard",
        { card: this.stock_num,type:1 },
        "查询失败",
        res => {
          if (res.errno == 0) {
            if(res.data.stock_status == 1){
              this.$message.success("查找完成");
              this.info = res.data;
              this.ruleForm.relation_id = res.data.relation_id
              this.isFind = true
              this.isRead = false
            }else if(res.data.stock_status == 0){
              this.$message.error('该卡已挂失，请补卡')
              this.isRead = true
            }else if(res.data.stock_status == 2){
              this.$message.error('该卡已删除')
              this.isRead = true
            }
          }
        },
        err => {}
      );
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          if (!this.isFind) {
            this.$message.error("请查找互助金卡号确认是否有卡号");
            return;
          }
          let param = JSON.parse(JSON.stringify(this.ruleForm))
            param.pwd = this.utils.recursiveMD5(this.ruleForm.pwd, 1)
          this.ajax('saveMoney',param,'存入失败',res=>{
            this.submitLoading = false;
            if(res.errno == 0){
              this.$message.success(res.errmsg)
              this.resetForm()
              this.stock_num = ''
              let date = new Date();
              let dd = this.$formatDate("YYYY-mm-dd HH:MM:SS", date);
              this.ruleForm.save_date = dd.substring(0, 10);
              dd = dd.replace(/-/g, "");
              dd = dd.replace(/:/g, "");
              dd = dd.replace(/ /g, "");
              this.ruleForm.save_proof = "P" + dd + this.$getRndInteger(1111,9999);
              this.ruleForm.fixdate_code = dd + this.$getRndInteger(1111,9999);
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
.depositAmount {
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
      width: 35%;
      float: left;
      height: 2.5rem;
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