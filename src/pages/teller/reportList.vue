<template>
    <div class="reportList" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>柜员管理</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">每日报表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
                <el-form-item label="日期范围" style="width:auto"  >
                  <el-date-picker v-model="dateArr" :picker-options="pickerOptions" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
                </el-form-item>
                <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form>
        </div>
        <div class="table-con">
            <div>
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border :summary-method="getSummaries" show-summary>
                    <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
                    <el-table-column prop="type" label="金额类型"  align="center"></el-table-column>
                    <el-table-column prop="cz_price" label="操作额(元)"  align="center">
                      <template slot="header">
                        <span>操作额(元)
                          <el-tooltip class="item" effect="dark" content="当前日柜员操作的金额" placement="top-start">
                            <i class="el-icon-warning"></i>
                          </el-tooltip>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="sp_price" label="待审批(元)"  align="center">
                      <template slot="header">
                        <span>待审批(元)
                          <el-tooltip class="item" effect="dark" content="柜员操作的金额,未被审批的金额" placement="top-start">
                            <i class="el-icon-warning"></i>
                          </el-tooltip>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fs_price" label="发生额(元)"  align="center">
                      <template slot="header">
                        <span>发生额(元)
                          <el-tooltip class="item" effect="dark" content="柜员操作的金额,今日真实入账【注：今日入账的金额有可能前几天操作的,今日才审批通过入账】" placement="top-start">
                            <i class="el-icon-warning"></i>
                          </el-tooltip>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作"  align="center">
                        <template slot-scope="scope">
                          <el-button type="primary" size="small"  @click="showDetail(scope.row)">金额明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="!tableData || tableData.length == 0">
              <div class="no-data-con" >
                <div class="absolute-center">
                  <div class="err-info-text ">暂无信息</div>
                </div>
              </div>
            </div>
        </div>

        <el-drawer :visible.sync="isDetail" :with-header="false" size="60%">
            <div class="drawer-tit-con" >
              <div class="tit">{{drawerTit}}</div>
              <div class="icon-con" @click="closeDrawer">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <div class="tabs-con">
              <el-tabs type="border-card"  v-model="priceType" @tab-click="changeTabs">
                <el-tab-pane label="发生额" name="1"></el-tab-pane>
                <el-tab-pane label="操作额" name="2"></el-tab-pane>
                <el-tab-pane label="待审批" name="3"></el-tab-pane>
                <el-table :data="amountList" v-if="priceType == 1" border >
                  <!-- <el-table-column prop="turn_bank_id" label="ID" width="80" align="center"></el-table-column> -->
                  <el-table-column prop="name" label="客户姓名"  align="center"></el-table-column>
                  <el-table-column  label="业务类型"  align="center">
                    <template>
                      <span>{{drawerTit}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" label="发生额(元)"  align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.price}}
                        <el-tooltip class="item" effect="dark"  v-if="drawerTit == '还款'" :content="'本金(' + scope.row.back_principal + ') + 利息('+ scope.row.back_interest + ') ' + (scope.row.overdue_rate  ? ('+ 罚息(' + scope.row.overdue_rate + ')') : '')" placement="top-start">
                          <i class="el-icon-warning"  v-if="drawerTit == '还款'"></i>
                        </el-tooltip>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="操作时间"  align="center"></el-table-column>
                  <el-table-column prop="openrateDate" label="入账时间"  align="center"></el-table-column>
                </el-table>
                <el-table :data="operateAmountList" v-if="priceType == 2" border >
                    <!-- <el-table-column prop="turn_bank_id" label="ID" width="80" align="center"></el-table-column> -->
                    <el-table-column prop="name" label="客户姓名"  align="center"></el-table-column>
                    <el-table-column  label="业务类型"  align="center">
                    <template>
                      <span>{{drawerTit}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column prop="price" label="发生额(元)"  align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.price}}
                          <el-tooltip class="item" effect="dark"  v-if="drawerTit == '还款'" :content="'本金(' + scope.row.back_principal + ') + 利息('+ scope.row.back_interest + ') '  + (scope.row.overdue_rate  ? ('+ 罚息(' + scope.row.overdue_rate + ')') : '')" placement="top-start">
                            <i class="el-icon-warning"  v-if="drawerTit == '还款'"></i>
                          </el-tooltip>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="操作时间"  align="center"></el-table-column>
                </el-table>
                <el-table :data="pendingAmountList" v-if="priceType == 3" border >
                    <!-- <el-table-column prop="turn_bank_id" label="ID" width="80" align="center"></el-table-column> -->
                    <el-table-column prop="name" label="客户姓名"  align="center"></el-table-column>
                    <el-table-column  label="业务类型"  align="center">
                    <template>
                      <span>{{drawerTit}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column prop="price" label="发生额(元)"  align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.price}}
                          <el-tooltip class="item" effect="dark"  v-if="drawerTit == '还款'" :content="'本金(' + scope.row.back_principal + ') + 利息('+ scope.row.back_interest + ') '  + (scope.row.overdue_rate  ? ('+ 罚息(' + scope.row.overdue_rate + ')') : '')" placement="top-start">
                            <i class="el-icon-warning" v-if="drawerTit == '还款'"></i>
                          </el-tooltip>
                        </span>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="Approver" label="当前审批人"  align="center"></el-table-column> -->
                    <!-- <el-table-column prop="approvalProcess" label="审批流程"  align="center"></el-table-column> -->
                    <el-table-column prop="date" label="操作时间"  align="center"></el-table-column>
                </el-table>
                <el-pagination
                    v-if="totalPage && totalPage > 0"
                    background
                    :current-page="curPage"
                    layout="prev, pager, next"
                    :total="totalPage*10"
                    @current-change="handleCurPageChange">
                </el-pagination>
              </el-tabs>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
  name: "reportList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      dateArr: '',
      isDetail: false, // 是否显示金额明细列表
      amountList: [], // 发生额列表
      operateAmountList: [], // 操作额列表
      pendingAmountList: [], // 待审批列表
      priceType: '1',
      drawerTit: '', // 金额明细标题
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
    this.dateArr = ''
    this.priceType = '1'
    this.isDetail = false
    this.amountList = []
    this.operateAmountList = []
    this.pendingAmountList = []
    this.drawerTit = ''
    this.getReportList();
    this.handlePermission();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.priceType = '1'
      this.isDetail = false
      this.drawerTit = ''
      this.dateArr = '';
      this.amountList = []
      this.operateAmountList = []
      this.pendingAmountList = []
      this.getReportList();
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
    // 关闭金额明细弹窗
    closeDrawer () {
      this.priceType = '1'
      this.isDetail = false
      this.amountList = []
      this.operateAmountList = []
      this.pendingAmountList = []
      this.drawerTit = ''
      this.curPage = 1
      this.totalPage = null
    },
    // 展示详情弹窗
    showDetail (row) {
      this.drawerTit = row.type
      this.isDetail = true
      this.priceType = '1'
      this.amountList = []
      this.operateAmountList = []
      this.pendingAmountList = []
      this.getDetailList()
    },
    // 切换tabs
    changeTabs (tab) {
      this.priceType = tab.name
      this.getDetailList()
    },
    // 获取金额明细列表
    getDetailList () {
      if (this.priceType == 1) {
        if (this.drawerTit == '互助金存入') {
          this.requestType = 3
        } else if (this.drawerTit == '互助金支取') {
          this.requestType = 6
        } else if (this.drawerTit == '收益支取') {
          this.requestType = 9
        } else if (this.drawerTit == '借款') {
          this.requestType = 12
        } else if (this.drawerTit == '还款') {
          this.requestType = 15
        }
        this.getAmountList()
      } else if (this.priceType == 2) {
        if (this.drawerTit == '互助金存入') {
          this.requestType = 1
        } else if (this.drawerTit == '互助金支取') {
          this.requestType = 4
        } else if (this.drawerTit == '收益支取') {
          this.requestType = 7
        } else if (this.drawerTit == '借款') {
          this.requestType = 10
        } else if (this.drawerTit == '还款') {
          this.requestType = 13
        }
        this.getOperateAmountList()
      } else if (this.priceType == 3) {
        if (this.drawerTit == '互助金存入') {
          this.requestType = 2
        } else if (this.drawerTit == '互助金支取') {
          this.requestType = 5
        } else if (this.drawerTit == '收益支取') {
          this.requestType = 8
        } else if (this.drawerTit == '借款') {
          this.requestType = 11
        } else if (this.drawerTit == '还款') {
          this.requestType = 14
        }
        this.getPendingList()
      }
    },
    // 获取操作额列表
    getOperateAmountList () {
      this.ajax("settlementLists",{
          page: this.curPage,
          size: 10,
          type: this.requestType,
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
			    end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
        },"查询失败", res => {
          if (res.errno == 0) {
            let tmpArr = []
            res.data.data.forEach(item =>{
              let tmpObj = {
                name: item.name,
                price: item.log_money,
                date: item.log_date,
                openrateDate: item.log_date
              }
              if (this.drawerTit == '借款') {
                tmpObj.date = item.add_time
                tmpObj.price = item.loan_money
              } else if (this.drawerTit == '还款') {
                tmpObj.date = item.add_time
                tmpObj.openrateDate = item.add_time
                tmpObj.back_interest = item.back_interest // 利息
                tmpObj.back_principal = item.back_principal // 本金
                tmpObj.overdue_rate = item.overdue_rate
                tmpObj.price = (Number(item.back_interest)*1000 + Number(item.back_principal)*1000 + Number(item.overdue_rate)*1000)/1000
              }
              tmpArr.push(tmpObj)
            })
            this.operateAmountList = tmpArr;
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    // 获取待审批列表
    getPendingList () {
      this.ajax("settlementLists", {
          page: this.curPage,
          size: 10,
          type: this.requestType,
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
			    end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
        }, "查询失败", res => {
          if (res.errno == 0) {
            let tmpArr = []
            res.data.data.forEach(item =>{
              let tmpObj = {
                name: item.name,
                price: item.log_money,
                date: item.log_date,
                openrateDate: item.log_date
              }
              if (this.drawerTit == '借款') {
                tmpObj.date = item.add_time
                tmpObj.price = item.loan_money
              } else if (this.drawerTit == '还款') {
                tmpObj.date = item.add_time
                tmpObj.openrateDate = item.add_time
                tmpObj.back_interest = item.back_interest
                tmpObj.back_principal = item.back_principal
                tmpObj.overdue_rate = item.overdue_rate
                tmpObj.price = (Number(item.back_interest)*1000 + Number(item.back_principal)*1000 + Number(item.overdue_rate)*1000)/1000
              }
              tmpArr.push(tmpObj)
            })
            this.pendingAmountList = tmpArr;
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    // 获取发生额列表
    getAmountList () {
      this.ajax("settlementLists",{
          page: this.curPage,
          size: 10,
          type: this.requestType,
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
			    end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
        }, "查询失败", res => {
          if (res.errno == 0) {
            let tmpArr = []
            res.data.data.forEach(item =>{
              let tmpObj = {
                name: item.name,
                price: item.log_money,
                date: item.log_date,
                openrateDate: item.log_date
              }
              if (this.drawerTit == '借款') {
                tmpObj.price = item.loan_money
                tmpObj.date = item.add_time
                tmpObj.openrateDate = item.cz_time
              } else if (this.drawerTit == '还款') {
                tmpObj.date = item.add_time
                tmpObj.openrateDate = this.utils.dateFormat('yyyy-MM-dd HH:mm:ss', new Date(item.real_back_date*1000))
                tmpObj.back_interest = item.back_interest
                tmpObj.back_principal = item.back_principal
                tmpObj.overdue_rate = item.overdue_rate
                tmpObj.price = (Number(item.back_interest)*1000 + Number(item.back_principal)*1000 + Number(item.overdue_rate)*1000)/1000
              }
              tmpArr.push(tmpObj)
            })
            this.amountList = tmpArr
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    // 查询
    search() {
      this.loading = true
      this.getReportList()
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '--';
        }
      });
      return sums;
    },
    getReportList() {
      this.ajax("settlement", {
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
			    end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
        },"查询失败",res => {
          this.loading = false;
          if (res.errno == 0) {
            this.tableData = res.data;
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    handleCurPageChange(val) {
      this.curPage = val;
      this.getDetailList();
    }
  }
};
</script>
<style lang="less">
.reportList {
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
  .tabs-con {
    height: calc(100% - 100px);
    padding: 0 25px;
    overflow: hidden;
    .el-tabs {
      height: 100%;
      overflow-y: auto;
      .el-table {
        margin-top: 0
      }
    }
  }
  // .drawer-footer {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   flex-direction: column;
  //   height: 100px;
  //   padding: 0 25px;
  //   .tit-con {
  //     width: 100%;
  //     display: flex;
  //     align-items: center;
  //     position: relative;
  //     .shu {
  //         width: 0.28rem;
  //         height: 1rem;
  //         background-color: #3B6AF1;
  //     }
  //     .tit {
  //         color: #444444;
  //         padding: 0 0.8rem;
  //         line-height: 1rem;
  //     }
  //     .bg {
  //         flex: 1;
  //         background: url('../../images/baseInfo/tit-bg.png');
  //         height: 1rem;
  //         background-size: 100% 100%;
  //     }
  //     .del-family-icon {
  //         position:absolute;
  //         right: 0;
  //         top: 0.5rem;
  //         height: 1.5rem;
  //         cursor: pointer;
  //     }
  //   }
  //   .btn-con {
  //     flex: 1;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //   }
  // }
}
</style>