<template>
    <div class="aliAuth">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="breadcrumb-tit">商户认证</el-breadcrumb-item>
                <el-breadcrumb-item>微信认证</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="tit-con" v-if="coopera_id!=undefined">
                <div class="shu"></div>
                <span class="tit">认证状态</span>
                <div class="bg"></div>
            </div>
            <div style="margin-top:10px;" v-if="coopera_id!=undefined">
              <el-form-item label="认证状态:">
                <el-select v-model="certifyStatus" placeholder="请选择认证状态">
                    <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
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
            </div>
            <div class="btn-con">
                <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : '立即提交'}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "aliAuth",
  data () {
    return {
    };
  }
}
</script>
<style lang="less">
.aliAuth{

}
</style>