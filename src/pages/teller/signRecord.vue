<template>
    <div class="signRecord" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>柜员管理</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">签到签退记录</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
                <el-form-item label="日期范围" style="width:auto"  >
                    <el-date-picker v-model="dateArr" :picker-options="pickerOptions" type="daterange" range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期" ></el-date-picker>
                </el-form-item>
                <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form>
        </div>
        <div class="table-con">
            <div>
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
                  <el-table-column prop="sign_id" label="ID" width="80" align="center"></el-table-column>
                  <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                  <el-table-column prop="in_time" label="签到时间" align="center"></el-table-column>
                  <el-table-column prop="out_time" label="签退时间" align="center">
                    <template slot-scope="scope">
                      <template v-if="scope.row.out_time">
                        <span>{{scope.row.out_time}}</span>
                      </template>
                      <template v-else>
                        <el-tag type="danger">未签退</el-tag>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="记录日期" align="center"></el-table-column>
                </el-table>
                <el-pagination
                    v-if="totalPage && totalPage > 0"
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
  name: "signRecord",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: null,
      loading: false,
      dateArr: '',
      pickerOptions: {
        disabledDate(time) {
          // 大于某个日期不能选择
          let myDate = new Date();
          let _beforeDay = myDate.setDate(new Date().getDate());		
          return time.getTime() >= _beforeDay;
        }
      },
    };
  },
  activated() {
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    this.totalPage = null
    this.dateArr = '';
    this.getSignLists();
    this.handlePermission();
  },
  methods: {
    initData() {
      this.dateArr = '';
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.getSignLists();
      this.handlePermission();
    },
    // 判断当前页面都有什么权限
    handlePermission() {
      let that = this;
      that.utils.getPermissionList(that, data => {
        data.forEach(item => {
          if (item.title == "审批") {
            that.isApprove = true;
          }
          if (item.title == "转账") {
            that.isTransfer = true;
          }
          if (item.title == "查看") {
            that.isLook = true;
          }
        });
      });
    },
    // 查询
    search() {
      this.loading = true
      this.getSignLists();
    },
    getSignLists() {
      this.ajax("signLists", {
          page: this.curPage,
          size: 10,
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
			    end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : ''
        }, "查询失败", res => {
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
      this.getSignLists();
    }
  }
};
</script>
<style lang="less">
.signRecord {
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
}
</style>