<template>
    <div class="depositDetail">
      <div style="display:flex;justify-content:space-between" class="breadcrumb-con">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item class="breadcrumb-tit">账务往来审核</el-breadcrumb-item>
            <el-breadcrumb-item>取出信息单</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="back-con" @click="goBack">
          <img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
          <span class="back-text">返回上一页</span>
        </div>
      </div>
        
        <div class="tit-con">
            <div class="shu"></div>
            <span class="tit">审批人信息</span>
            <div class="bg"></div>
        </div>
        <el-form class="form-item-con"  label-width="80px">
            <el-form-item label="审批人:">
                <el-input readonly v-model="info.post_name"></el-input>
            </el-form-item>
        </el-form>
        <div class="tit-con" v-if="info.status == 0">
            <div class="shu"></div>
            <span class="tit">驳回原因</span>
            <div class="bg"></div>
        </div>
        <el-form class="form-item-con"  label-width="80px" v-if="info.status == 0">
            <el-form-item label="驳回原因:">
                <el-input readonly v-model="info.exam_note"></el-input>
            </el-form-item>
        </el-form>
        <div class="tit-con">
            <div class="shu"></div>
            <span class="tit">社员信息</span>
            <div class="bg"></div>
        </div>
        <el-form class="form-item-con"  label-width="80px">
            <el-form-item label="社员账户：">
                <el-input readonly v-model="info.card"></el-input>
            </el-form-item>
            <el-form-item label="社员姓名：">
                <el-input readonly v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
                <el-input readonly v-model="info.phone"></el-input>
            </el-form-item>
            <el-form-item label="卡状态：">
                <span>{{info.passbook_status==0?'挂失':info.passbook_status==1?'正常':info.passbook_status==2?'删除':''}}</span>
            </el-form-item>
            <el-form-item label="取出金额：">
                <el-input readonly v-model="info.turnout_money"></el-input>
            </el-form-item>
            <!-- <el-form-item label="转账附言：">
                <el-input readonly v-model="info.turn_note"></el-input>
            </el-form-item> -->
        </el-form>
        <div class="tit-con">
            <div class="shu"></div>
            <span class="tit">收款人信息</span>
            <div class="bg"></div>
        </div>
        <el-form class="form-item-con"  label-width="80px">
            <el-form-item label="转入账户：">
                <el-input readonly v-model="info.turn_bank_num"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
                <el-input readonly v-model="info.turn_bank_user"></el-input>
            </el-form-item>
            <p style="color:red">备注：取款账户姓名和取款社员必须保持一致！</p>
        </el-form>
        <div class="btn-con" v-if="tag == 'shenpi'">
            <template>
                <el-button type="primary" round @click="handleBtn">同意</el-button>
                <el-button type="danger" round @click="isTurn = true">拒绝</el-button>
            </template>
        </div>
        <div class="btn-con" v-if="tag == 'zhuanzhang'">
            <template>
                <el-button type="primary" round @click="handleBtn">确认转账</el-button>
                <el-button type="danger" round @click="isTurn = true">拒绝</el-button>
            </template>
        </div>

         <el-dialog title="驳回原因" :visible.sync="isTurn">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="驳回原因" :label-width="formLabelWidth" prop="reason">
                    <el-input autocomplete="off" placeholder="请输入驳回原因" v-model="ruleForm.reason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isTurn = false">取 消</el-button>
                <el-button type="primary" @click="submitTurn('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : '确 定'}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "depositDetail",
  data() {
    return {
      tag: "",
      id: "",
      info: {},
      isTurn: false,
      submitLoading: false,
      formLabelWidth: "220px",
      ruleForm: {
        reason: ""
      },
      rules: {
        reason: [{ required: true, message: "请输入驳回原因", trigger: "blur" }]
      }
    };
  },
  activated() {
    this.info = {};
    if (this.$route.query.tag != undefined) {
      this.tag = this.$route.query.tag;
      this.id = this.$route.query.id;
      this.detail(this.$route.query.id);
    }
  },
  methods: {
    // 返回上一页
    goBack() {
        this.$router.push({
            path:'/depositList',
            query:{
                // isRefresh: this.isRefresh
            }
        })
    },
    detail(id) {
      this.ajax(
        "turnMoneyDetail",
        {
          type: 2,
          id: id
        },
        "查询失败",
        res => {
          if (res.errno == 0) {
            this.info = res.data;
          }
        },
        err => {}
      );
    },
    handleBtn() {
      this.ajax(
        "turnMoneyVerify",
        {
          type: 2,
          id: this.id,
          status: 1,
          exam_note:''
        },
        "审核失败",
        res => {
          this.$message.success('审核成功')
          this.detail(this.$route.query.id);
        },
        err => {}
      );
    },
    // 驳回原因确认
    submitTurn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.ajax(
            "turnMoneyVerify",
            {
              type: 2,
              id: this.id,
              status: 0,
              exam_note: this.ruleForm.reason
            },
            "审核失败",
            res => {
                this.submitLoading = false
                if(res.errno == 0){
                    this.$message.success(res.errmsg)
                    this.isTurn = false
                }
            },
            err => {this.submitLoading = false}
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
.depositDetail {
  padding: 20px;
  // .el-breadcrumb {
  //   margin-bottom: 10px;
  // }

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
      width: 18%;
      padding: 0.9rem;
    }
  }
}
</style>