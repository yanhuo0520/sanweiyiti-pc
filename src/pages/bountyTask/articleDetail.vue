<template>
    <div class="articleDetail">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>赏金业务</el-breadcrumb-item>
                        <el-breadcrumb-item  :to="{ path: '/helpList' }">帮助中心</el-breadcrumb-item>
                        <el-breadcrumb-item  class="breadcrumb-tit">文章详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                 <!-- <el-button style="margin-right:1rem" size="small" @click="initData()">刷新</el-button> -->
                <div class="back-con" @click="goBack">
                    <img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
                    <span class="back-text">返回上一页</span>
                </div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="文章标题:" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入文章标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="文章内容:" >
                    <div id="editor-con">
                        <div  :id="editorId" style="width:100%;height:300px"></div>
                    </div>
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
  name: "articleDetail",
  data() {
    return {
      ruleForm: {
        title: "", // 文章标题
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }]
      },

      id: '',
      editorId: 'editor',
      initUe: false,// 是否初始化编辑器

      submitLoading: false
    };
  },
   activated() {
        this.initUe = true 
        this.id = this.$route.query.id ? this.$route.query.id : ''
        if (this.id) {
            this.getArtcleDetail()
        } else {
            this.ruleForm.title = ''
            this.ruleForm.content = ''
            setTimeout(() =>{
                let tmpWidth = 600
                if (document.querySelector('.el-form') && document.querySelector('.el-form').clientWidth) {
                    tmpWidth = document.querySelector('.el-form') && document.querySelector('.el-form').clientWidth - 300
                }
                UE.getEditor(this.editorId,{autoHeightEnabled: false,initialFrameWidth: tmpWidth }).ready(function() {
                    //this是当前创建的编辑器实例
                    // this.setContent(this.ruleForm.content)
                }) 
                this.initUe = false
            },500)
        }
    },
  methods: {
    // 返回上一页
    goBack() {
        this.$router.push({
            path:'/helpList',
            query:{}
        })
    },
    // 获取文章详情
    getArtcleDetail () {
        let that = this
        this.ajax("helpDetail", {
            id: this.id,
            }, "排序失败",
            res => {
                if (res.errno == 0) {
                   this.ruleForm.title = res.data.content
                   this.ruleForm.content = res.data.content_text
                   setTimeout(() =>{
                       let tmpWidth = 600
                        if (document.querySelector('.el-form') && document.querySelector('.el-form').clientWidth) {
                            tmpWidth = document.querySelector('.el-form') && document.querySelector('.el-form').clientWidth - 300
                        }
                        UE.getEditor(that.editorId,{autoHeightEnabled: false,initialFrameWidth: tmpWidth }).ready(function() {
                            //this是当前创建的编辑器实例
                            this.setContent(that.ruleForm.content)
                        }) 
                        that.initUe = false
                    },500)
                }
            },
            err => {
            }
        )
    },
    submitForm () {
        this.submitLoading = true
        this.ajax("helpAdd", {
            id: this.id,
            content: this.ruleForm.title,
            content_text: UE.getEditor(this.editorId).getContent()
            }, this.id ? '编辑失败' : '添加失败',
            res => {
                if (res.errno == 0) {
                    this.$message.success(this.id ? '编辑成功' : '添加成功')
                    this.$router.push('/helpList')
                }
            },
            err => {
            }
        )
        setTimeout(() =>{
            this.submitLoading = false
        }, 1000)
    }
  }
};
</script>
<style lang="less">
.articleDetail {
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
      //   float: left;
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
      width: 23%;
      padding: 0.9rem;
    }
  }
}
</style>