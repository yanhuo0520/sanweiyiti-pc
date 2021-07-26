<template>
    <div class="dividendDraw">
        <el-form ref="ruleForm" label-width="100px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>收益账户</el-breadcrumb-item>
                        <el-breadcrumb-item  class="breadcrumb-tit">收益支取</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="收益账户:">
                    <el-input v-model="stock_num" placeholder="请输入收益账户" clearable :readonly="isRead"></el-input>
                     <el-button type="primary" @click="findcard()" size="small" >查找</el-button>
                </el-form-item>
            </div>
            <template v-if="info.relation_id">
              <div class="tit-con">
                  <div class="shu"></div>
                  <span class="tit">账户信息</span>
                  <div class="bg"></div>
              </div>

              <div class="form-item-con clearfix">
                  <!-- <el-form-item label="社员账号:">
                      <el-input v-model="stock_num" placeholder="请输入社员账号" clearable :readonly="isRead"></el-input>
                      <el-button type="primary" @click="findcard()" size="small" >查找</el-button>
                  </el-form-item> -->
                  <el-form-item label="社员身份证:">
                      <el-input v-model="info.idcard" clearable readonly></el-input>
                  </el-form-item>
                  <el-form-item label="社员姓名:">
                      <el-input v-model="info.name" clearable readonly></el-input>
                  </el-form-item>
                  <el-form-item label="社员手机号:">
                      <el-input v-model="info.phone" clearable readonly></el-input>
                  </el-form-item>
                  <el-form-item label="收益总额:">
                      <el-input v-model="info.bonus_money" clearable readonly></el-input>
                  </el-form-item>
              </div>

              <div class="tit-con">
                  <div class="shu"></div>
                  <span class="tit">支取信息</span>
                  <div class="bg"></div>
              </div>
              <div class="form-item-con clearfix">
                  <el-form-item label="支取收益:">
                      <el-input v-model="fenhong" placeholder="请输入支取收益" clearable @input="inputMoney" ></el-input>
                  </el-form-item>
                  <el-form-item label="大写:">
                      <el-input v-model="daxiedrawMoney" clearable readonly></el-input>
                  </el-form-item>
                  <el-form-item label="密码:">
                      <el-input v-model="password" placeholder="请输入密码" clearable type="password" :readonly="isRead"></el-input>
                  </el-form-item>
              </div>
              <div class="btn-con">
                  <!-- <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : '保存并打印'}}</el-button> -->
                  <el-button type="warning" round v-if="isRead">该账号状态暂不能退股</el-button>
                  <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading" v-else>{{submitLoading ? '提交中...' : '确定'}}</el-button>
              </div>
            </template>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "dividendDraw",
  data() {
    return {
      stock_num:'',
      daxiedrawMoney:'',
      fenhong:'',
      password:'',
      info:{},

      isFind:false,
      isRead:false,

      submitLoading: false,

    };
  },
  activated(){
      this.stock_num = ''
      this.info = {}
      this.daxiedrawMoney = ''
      this.fenhong = ''
      this.password = ''
      this.isFind = false
      this.isRead = false
  },
  methods: {
    inputMoney(val){
        this.fenhong = this.utils.handlePrice(val)
        if(Number(this.fenhong) > Number(this.info.bonus_money)) {
            this.fenhong = this.info.bonus_money
        }
        this.daxiedrawMoney = this.$upDigit(this.fenhong)
    },
    findcard() {
      let str = this.stock_num
      str = str.replace(/\s+/g,"");
      this.stock_num = str
      if (str == "") {
        this.$message.error("请输入股金账户");
        return;
      }
      this.info.relation_id = ''
      this.ajax(
        "searchCard",
        { card: this.stock_num,type:2 },
        "查询失败",
        res => {
          if (res.errno == 0) {
            if(res.data.stock_status == 1){
              this.$message.success("查找完成");
                this.info = res.data
                // this.daxiedrawMoney = this.$upDigit(this.info.stock_money)
                this.isFind = true;
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
     doPrint () {
        let subOutputRankPrint = this.$refs.print;
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        // window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
    submitForm(){
        
        this.submitLoading = true
        let param = {}
        param.relation_id = this.info.relation_id
        param.save_type_id = 4
        param.pwd = this.utils.recursiveMD5(this.password, 1)
        param.id = 0
        param.money = this.fenhong
        param.interest = 0
        if(!this.isFind){
            this.$message.error('请查找卡号是否存在')
            this.submitLoading = false
            return
        }
        if(this.password == ''){
            this.$message.error('请输入密码')
            this.submitLoading = false
            return
        }

                
        this.ajax('outMoney',param,'支取失败',res=>{
            this.submitLoading = false
            if(res.errno == 0){
                // this.$refs.print.style.display = 'block'
                // this.$print(this.$refs.print)
                // this.$refs.print.style.display = 'none'

                this.$message.success(res.errmsg)
                this.info = {}
                this.isFind = false
                this.password = ''
                this.stock_num = ''
                this.fenhong = ''
            }
        },err=>{
            this.submitLoading = false
        })
    },
  }
};
</script>
<style lang="less">
.dividendDraw {
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
  .el-form{
      >p{
          text-align: center;
          height: 30px;
          line-height: 30px;
          background: #eee;
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
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
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

  .print{
      
      .el-form-item__label,.el-input__inner{
          color:#000;
          border: none;
      }
      .el-input__inner::placeholder{
          color: #000;
      }
      .tit {
        color: #000;
        }
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