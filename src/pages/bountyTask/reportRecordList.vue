<template>
    <div class="reportRecordList" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>赏金任务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">举报记录</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <!-- <el-form class="clearfix"  label-width="80px">
              <el-form-item label="日期范围" style="width:auto"  >
                <el-date-picker v-model="dateArr" :picker-options="pickerOptions" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
              </el-form-item>
              <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form> -->
        </div>
        <div class="table-con">
            <div>
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border >
                  <el-table-column prop="title" label="任务名称"  align="center"></el-table-column>
                  <el-table-column  label="投诉类型"  align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.lists && scope.row.lists.length > 0">
                          <p style="background:#F0F8FF;padding:6px;color:#000;margin-top:5px" v-for="(item, index) in scope.row.lists" :key="index">{{item.content}}</p>
                        </template>
                    </template>
                  </el-table-column>
                  <el-table-column prop="content" label="投诉内容"  align="center"></el-table-column>
                  <el-table-column prop="user_name" label="举报人"  align="center"></el-table-column>
                  <el-table-column prop="wx_int" label="举报人微信"  align="center"></el-table-column>
                  <el-table-column prop="add_time" label="举报时间"  align="center"></el-table-column>
                </el-table>
                <el-pagination
                    background
                    :current-page="curPage"
                    layout="prev, pager, next"
                    :total="totalPage*10"
                    @current-change="handleCurPageChange">
                </el-pagination>
            </div>
            <div v-if="!tableData || tableData.length == 0">
              <div class="no-data-con" >
                <div class="absolute-center">
                  <div class="err-info-text ">暂无信息</div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "reportRecordList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      // dateArr: '',
      // pickerOptions: {
      //   disabledDate(time) {
      //     // 大于某个日期不能选择
      //     let myDate = new Date();
      //     let _beforeDay = myDate.setDate(new Date().getDate());		
      //     return time.getTime() >= _beforeDay;
      //   }
      // },
    };
  },
  activated() {
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    this.totalPage = null
    // this.dateArr = ''
    this.getTaskList();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      // this.dateArr = '';
      this.getTaskList();
    },
    // 查询
    search() {
      this.loading = true
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.getTaskList()
    },
    getTaskList() {
      this.ajax("taskLists", {
          page: this.curPage,
          size: 10,
          coopera_id: "",
          // start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
			    // end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
        }, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    handleCurPageChange(val) {
      this.curPage = val;
      this.loading = true;
      this.getTaskList();
    },
  }
};
</script>
<style lang="less">
.reportRecordList {
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