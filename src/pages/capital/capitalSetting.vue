<template>
    <div class="capitalSetting">
        <el-form ref="ruleForm" label-width="100px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>股金业务</el-breadcrumb-item>
                        <el-breadcrumb-item  class="breadcrumb-tit">股金配置</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="初始股金金额:">
                    <el-input v-model="money" placeholder="请输入初始股金金额" clearable @input="inputMoney" type="number"></el-input> 元
                </el-form-item>
                <el-form-item label="初始股金份额:">
                    <el-input v-model="fene" placeholder="请输入初始股金份额" clearable @input="inputFene" type="number"></el-input>
                </el-form-item>
                <el-form-item label="设置时间:">
                    <span>{{date}}</span>
                </el-form-item>
            </div>
            <div class="btn-con">
                <el-button type="primary" round @click="submitForm" :loading="submitLoading">{{submitLoading ? '提交中...' : '确定'}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "capitalSetting",
  data() {
    return {
      money: "",
      fene: "",
      date:"",

      submitLoading: false
    };
  },
  activated() {
    let date = new Date();
    // this.date = this.$formatDate("YYYY-mm-dd HH:MM:SS", date);
    this.ajax('cooperaDetail',{},'',res=>{
      if(res.errno == 0){
        if(res.data.stock_amount == 0){
          this.money = ''
        }else{
          this.money = res.data.stock_amount
        }
        if(res.data.stock_share == 0){
          this.fene = ''
        }else{
          this.fene = res.data.stock_share
        }
        this.date = res.data.stock_add_date
      }
    },err=>{

    })
  },

  methods: {
    inputMoney(){
      this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
    },
    inputFene(){
      this.fene = this.fene.replace(/\D/g,'')
    },
    submitForm() {
        if(this.money == ''){
            this.$message.error('请输入初始股金金额');
            return;
        }
        if(this.fene == ''){
            this.$message.error('请输入初始股金份额');
            return;
        }
        this.submitLoading = true;
        this.ajax('setStockAmount',{
            coopera_id: '',
            stock_amount: this.money,
            stock_share: this.fene
        },'',res=>{
            this.submitLoading = false;
            if(res.errno == 0){
                // this.money = ''
                // this.fene = ''
                this.$message.success(res.errmsg)
            }else{
                this.$message.error(res.errmsg)
            }
        },err=>{
            this.submitLoading = false
        })
    }
  }
};
</script>
<style lang="less">
.capitalSetting {
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
      width: 100%;
      float: left;
      height: 2.5rem;
      .el-form-item__label {
        font-size: 0.9rem;
      }
      .el-input {
        width: 35%;
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