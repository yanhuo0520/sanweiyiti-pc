<template>
  <div class="identyInfo">
    <div class="breadcrumb-con">
        <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
        <div class="breadcrumb-info">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>商户认证</el-breadcrumb-item>
                <el-breadcrumb-item  class="breadcrumb-tit">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>

    <div class="tit-con">
        <div class="shu"></div>
        <span class="tit">开通渠道</span>
        <div class="bg"></div>
    </div>

    <div class="qudao">
      <el-switch
        v-model="value1"
        inactive-text="微信支付"
        @change="changeWx">
      </el-switch>
      <el-switch
        v-model="value2"
        inactive-text="支付宝支付"
        @change="changeAli">
      </el-switch>
      <!-- <el-switch
        v-model="value3"
        inactive-text="银联认证">
      </el-switch> -->
    </div>

    <div class="tit-con">
        <div class="shu"></div>
        <span class="tit">认证状态</span>
        <div class="bg"></div>
    </div>

    <div class="certificationSta">
      <!-- 已认证、认证中、未认证 -->
      <p>微信认证：{{info.identify==1?'未认证':info.identify==2?'认证中':info.identify==3?'已认证':info.identify==4?'认证拒绝':''}}</p>
      <p>支付宝认证：{{info.ali_identify==1?'未认证':info.ali_identify==2?'认证中':info.ali_identify==3?'已认证':info.ali_identify==4?'认证拒绝':''}}</p>
      <!-- <p>银联认证：已认证</p> -->
    </div>

    <div class="tit-con">
        <div class="shu"></div>
        <span class="tit">认证信息</span>
        <div class="bg"></div>
    </div>
    <div class="certificationSta info">
      <p @click="toWeixinAuth">微信认证：{{info.identify==1?'未认证':info.identify==2?'认证中':info.identify==3?'已认证':info.identify==4?'认证拒绝':''}}(点击可查看认证信息)</p>
      <p>支付宝认证：{{info.ali_identify==1?'未认证':info.ali_identify==2?'认证中':info.ali_identify==3?'已认证':info.ali_identify==4?'认证拒绝':''}}(点击可查看认证信息)</p>
      <!-- <p>银联认证：已认证(点击可查看认证信息)</p> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "identyInfo",
  data () {
    return {
      value1: false,
      value2: false,
      value3: false,
      info:{}
    };
  },
  activated(){
    this.ajax('cooperaDetail',{},'查询失败',res=>{
      this.info = res.data
      if(res.data.is_ali_pay == 1){
        this.value2 = true
      }
      if(res.data.is_wx_pay == 1){
        this.value1 = true
      }
    },err=>{})
  },
  methods:{
    changeWx(val){
      this.ajax('isWeixin',{
        is_wx_pay: Number(val),
        coopera_id: this.info.coopera_id
      },'修改失败',res=>{
        if(res.errno == 0){
          this.$message.success('修改成功')
        }
      },err=>{})
    },
    changeAli(val){
      this.ajax('isAli',{
        is_wx_pay: Number(val),
        coopera_id: this.info.coopera_id
      },'修改失败',res=>{
        if(res.errno == 0){
          this.$message.success('修改成功')
        }
      },err=>{})
    },
    toWeixinAuth(){
        this.$router.push({
            path:'/weixinAuth',
            query:{
                coopera_id: this.info.coopera_id
            }
        })
    },
  }
}
</script>
<style lang="less">
.identyInfo{
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

  .qudao{
    display: flex;
    margin: 40px 0;
    .el-switch{
      margin-right: 100px;
    }
  }
  .certificationSta{
    p{
      margin: 20px 0;
    }
  }
  .info{
    p{
      color: #3b6af1;
      cursor: pointer;
    }
  }
}
</style>