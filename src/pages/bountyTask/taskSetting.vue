<template>
  <div class="taskSetting" v-loading="loading">
    <div class="breadcrumb-con">
      <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt />
      <div class="breadcrumb-info">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统配置</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-tit">任务配置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="small" @click="initData()">刷新</el-button>
    </div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="接单限时" name="1"></el-tab-pane>
      <el-tab-pane label="审核时间" name="2"></el-tab-pane>
      <el-tab-pane label="做单次数" name="3"></el-tab-pane>
      <div class="data-con clearfix">
        <div class="data-item" v-for="(item,index) in data" :key="index">
          <div class="text">{{item.name}}</div>
          <div class="btn-con">
            <el-button type="primary" size="small" disabled @click="editItem(item,index)">编辑</el-button>
            <el-button type="danger" size="small" disabled @click="delItem(item,index)">删除</el-button>
          </div>
        </div>
        <el-button type="primary" disabled @click="AddItem">添加</el-button>
      </div>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "loanDetailList",
  data() {
    return {
      activeName: "1", // 1-接单限时 2-审核时间 3-做单次数
      data: [],
      loading: false
    };
  },
  activated() {
    this.initData();
  },
  methods: {
    // 初始化信息
    initData() {
      this.activeName = "1";
      this.getConfig('reward_time_limit');
    },
    // 获取配置信息
    getConfig(table) {
      let that = this;
      that.loading = true;
      that.ajax("getConfig",{
        table: table
      },
        "获取配置信息失败",
        res => {
          that.loading = false;
          if (res.errno == 0) {
            if (table == 'reward_time_limit') {
                res.data.forEach(item =>{
                    item.name = item.time_limit_name,
                    item.value = item.time_limit_id
                })
            } else if (table == 'reward_verify_time') {
                res.data.forEach(item =>{
                    item.name = item.verify_time_name,
                    item.value = item.verify_time_id
                })
            } else if (table == 'reward_make_num') {
                res.data.forEach(item =>{
                    item.name = item.make_num_name,
                    item.value = item.make_num_id
                })
            } 
            that.data = res.data;
          }
        },
        err => {
          that.loading = false;
        }
      );
    },
    // 切换 任务类型
    handleClick(tab, event) {
      this.activeName = tab.name;
      if (tab.name == "1") {
        this.getConfig("reward_time_limit");
      } else if (tab.name == "2") {
        this.getConfig("reward_verify_time");
      } else if (tab.name == "3") {
        this.getConfig("reward_make_num");
      }
    },
    // 添加配置信息
    AddItem() {
      this.$message.info("添加");
    },
    // 修改配置信息
    editItem(row, index) {
      this.$message.info("编辑");
    },
    delItem(row, index) {
      this.$message.info("删除");
    }
  }
};
</script>
<style lang="less">
.taskSetting {
  padding: 20px;
  .data-con {
    padding: 1rem;
    .data-item {
      padding: 1rem;
      float: left;
      margin-right: 1rem;
      margin-bottom: 1rem;
      background-color: #ecf5ff;
      color: #409eff;
      border: 1px solid #d9ecff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
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

  .button-new-tag {
    margin-top: 1rem;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>