<template>
    <div class="taskType" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>赏金任务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">任务类型</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con" style="text-align:right">
          <el-button type="primary"   @click="addItem()" disabled>添加</el-button>
        </div>
        <div class="table-con">
          <div class="data-con  clearfix">
            <div class="data-item" v-for="(item,index) in data" :key="index">
                <div class="img">
                  <img :src="item.icon" alt="">
                </div>
                <div class="text">{{item.type_name}}</div>
                <div class="btn-con" >
                    <el-button   type="primary" size="small" disabled @click="editItem(item,index)" >编辑</el-button>
                    <el-button   type="danger" size="small" disabled @click="delItem(item,index)">删除</el-button>
                </div>
            </div>
            <!-- <el-button type="primary" @click="addItem"  >添加</el-button> -->
          </div>
            <div v-if="!data || data.length == 0">
              <div class="no-data-con" >
                <div class="absolute-center">
                  <div class="err-info-text ">暂无任务类型</div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "taskType",
  data() {
    return {
      data: [],
      loading: false
    };
  },
  activated() {
    this.initData();
 
  },
  methods: {
    initData() {
      this.data = [];
      this.getConfig('reward_type')
    },
    // 添加任务类型
    addItem () {
      this.$message.info('暂未开放')
    },
    // 编辑任务类型
    editItem (item,index) {
      this.$message.info('暂未开放')
    },
    // 删除任务类型
    delItem (item,index) {
      this.$message.info('暂未开放')
    },
    // 获取任务类型
    getConfig (table) {
      this.loading = true
      this.ajax("getConfig", {
          table: table
        }, "查询失败",
        res => {
          this.loading = false
          if (res.errno == 0) {
            this.data = res.data;
          }
        }, err =>{
          this.loading = false
        });
    },
  }
};
</script>
<style lang="less">
.taskType {
  padding: 20px;
  .el-table {
    background: transparent;
    margin-top: 50px;
  }
  .el-table::before {
    height: 0;
  }
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .search-con {
    .el-form {
      width: 100%;
      display: flex;
    }
    .el-form-item {
      width: 23%;
      // float: left;
      margin-bottom: 0;
      .el-form-item__label {
        font-size: 0.9rem;
      }
      .el-form-item__content {
        margin-right: 30px;
        .el-input {
          width: 100%;
          .read-idCard {
            color: #3b6af1;
            background: #f0f8ff;
            font-size: 0.75rem;
            cursor: pointer;
          }
        }
      }
    }
  }
  .table-con {
    .data-con {
        padding: 1rem;
        .data-item {
            padding: 1rem;
            float: left;
            margin-right: 1rem;
            margin-bottom: 1rem;
            background-color:#ecf5ff;
            color: #409eff;
            border: 1px solid #d9ecff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .img {
              width: 80px;
              height: 80px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .text {
                font-weight: bold;
            }
            .btn-con {
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 1rem;
            }
        }
        .add-btn-con {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .el-icon-warning {
      font-size: 20px;
      color: #5cb6ff;
      margin-left: 6px;
      cursor: pointer;
    }
  }
  .el-drawer {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 10px 8px 18px #000;
  }
  .el-drawer.rtl {
    top: 5rem;
    bottom: 0.5rem;
    height: calc(100% - 5.5rem);
    .el-drawer__body {
      display: flex;
      flex-direction: column;
    }
  }
  .drawer-tit-con {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 15px;
    .tit {
      font-weight: bold;
    }
    .icon-con {
      font-size: 1.5rem;
      color: #666;
      cursor: pointer;
    }
  }

  .drawer-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    padding: 0 25px;
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
    .btn-con {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
    

  }
  
}
.el-popover__title {
  font-weight: bold
}
.popover-btn-con {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
</style>