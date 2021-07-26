<template>
    <div class="wxAccountBill" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                    <el-breadcrumb-item  :to="{ path: '/wxVirtualAccount' }">微信运营账户</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">【{{type == 6 ? '三位一体团队' : type == 7 ? '三位一体账户' : '三位一体'}}】金额明细列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" style="margin-right:1rem" @click="initData()">刷新</el-button>
            <div class="back-con" @click="goBack">
				<img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
				<span class="back-text">返回上一页</span>
			</div>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
              <el-form-item label="账单状态">
                <el-select v-model="status" placeholder="请选择审核状态">
                    <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form>
        </div>
        <div class="table-con">
            <div>
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border >
                    <el-table-column prop="wxShopAmountId" label="ID"  align="center"></el-table-column>
                    <el-table-column prop="status" label="账单状态"  align="center">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 1" type="success">提现</el-tag>
                        <el-tag v-if="scope.row.status == 2">充值</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" label="金额"  align="center">
                      <template slot-scope="scope">
                        <template v-if="scope.row.status == 1">
                          <span style="color:#67c23a">-{{scope.row.price}}</span>
                        </template>
                        <template v-if="scope.row.status == 2">
                          <span style="color:red">+{{scope.row.price}}</span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column prop="wxShopAmountCreateDate" label="操作时间"  align="center"></el-table-column>
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
  name: "wxAccountBill",
  data() {
    return {
      status: 3,
      statusOptions: [{
        name: '全部',
        value: 3
      },{
        name: '提现',
        value: 1
      },{
        name: '充值',
        value: 2
      }],
      type: '',
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
    };
  },
  activated() {
    this.type = this.$route.query.type
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    this.totalPage = null
    this.status = 3
    this.getTaskList();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.status = 3
      this.getTaskList();
    },
    // 返回上一页
    goBack() {
        this.$router.push({
            path:'/wxVirtualAccount',
        })
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
      let params = {
          page: this.curPage,
          size: 10,
          type: this.status,
          shopType: this.type
      }
      this.ajax("searchWXAddList", params, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
              res.data.list.forEach(item =>{
                  let tmpPrice = Number(item.wxShopAmountAdd)
                  if (tmpPrice < 0) {
                      item.status = 1
                  } else {
                      item.status = 2
                  }
                  item.price = Math.abs(item.wxShopAmountAdd)
              })
            this.tableData = res.data.list;
            this.curPage = Number(res.data.pageNum);
            this.totalPage = res.data.pages;
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
    }
  }
};
</script>
<style lang="less">
.wxAccountBill {
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
  
}
</style>