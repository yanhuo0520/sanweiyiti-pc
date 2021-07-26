<template>
    <div class="BillDetailByWallet" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>资金管理</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">账户资金明细</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="120px">
              <el-form-item label="姓名">
                <el-input placeholder="请输入用户姓名" v-model="searchName" clearable></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="status" placeholder="请选择状态">
                    <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="记录类型">
                <el-select v-model="log_type" placeholder="请选择记录类型">
                    <el-option v-for="(item,index) in logTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期范围" style="width:auto"  >
                <el-date-picker v-model="dateArr" :picker-options="pickerOptions" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
              </el-form-item>
              <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form>
        </div>
        <div class="table-con">
          <el-alert type="success" style="margin:15px 0" :closable="false">
              <template #title>
                <span>合计余额：<span style="font-size: 20px; color: red; font-weight:bold">{{totalPrice}}</span></span>
              </template>
            </el-alert>
            <div>
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border >
                    <el-table-column prop="log_id" label="ID"  align="center" width="100"></el-table-column>
                    <el-table-column prop="user_name" label="姓名"  align="center" ></el-table-column>
                    <el-table-column prop="log_type" label="记录类型"  align="center" width="100">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.log_type == 1" type="success">存款</el-tag>
                        <el-tag v-if="scope.row.log_type == 2" type="danger">取款</el-tag>
                        <el-tag v-if="scope.row.log_type == 3" type="info">活期利息</el-tag>
                        <el-tag v-if="scope.row.log_type == 4" type="info">赏金转入</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="log_money" label="变动的金额"  align="center">
                      <template slot-scope="scope">
                        <template v-if="scope.row.status == 1">
                            <template v-if="scope.row.log_type == 2">
                              <span style="color:#67c23a">- {{scope.row.log_money}}</span>
                            </template>
                            <template v-else>
                              <span style="color:red">+ {{scope.row.log_money}}</span>
                            </template>
                        </template>
                        <template v-else>
                          <span>{{scope.row.log_money}}</span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column  label="状态"  align="center" width="150">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 0" type="danger">失败</el-tag>
                        <el-tag v-if="scope.row.status == 1" type="success">成功</el-tag>
                        <el-tag v-if="scope.row.status == 2" type="success">取出申请审核中</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="danger">取出申请驳回</el-tag>
                        <el-tag v-if="scope.row.status == 4" type="danger">取出失败</el-tag>
                        <el-tooltip class="item" effect="dark"  :content="scope.row.back_note" placement="top-start" v-if="scope.row.back_note">
                            <i style="cursor:pointer" class="el-icon-warning" ></i>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="log_date" label="记录时间"  align="center">
                      <template slot-scope="scope">
                        <p>申请时间:<span>{{scope.row.log_date}}</span></p>
                        <p v-if="scope.row.pay_date" style="color:#409eff">审核时间:<span>{{scope.row.pay_date}}</span></p>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作"  align="center" width="100" >
                        <template slot-scope="scope">
                          <el-button type="primary" size="small" v-if="scope.row.status == 2" @click="lookItem(scope.row)">审核</el-button>
                        </template>
                    </el-table-column>
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
        <el-drawer  :visible.sync="isShowDetail" :with-header="false" size="55%">
            <div class="drawer-tit-con" >
              <div class="tit">审核详情</div>
              <div class="icon-con" @click="isShowDetail = false" >
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <el-form >
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">订单信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                  <el-form-item label="订单号" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.w_code" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="存入/取出金额" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.money" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="到账方式" :label-width="formLabelWidth">
                      <el-input autocomplete="off" :value="selectRow.out_arrival_way == 1 ? '快速到账' : '普通到账'" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="添加日期" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.add_date" readonly></el-input>
                  </el-form-item>
                </div>
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">收款人信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.turn_bank_user" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="银行卡号" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.turn_bank_num" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="银行名称" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.turn_bank_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="开户支行" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.turn_branch_bank_name" readonly></el-input>
                  </el-form-item>
                </div>
              </el-form>
             
              <div class="drawer-footer" >
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">审核状态</span>
                    <div class="bg"></div>
                </div>
                <p v-if="selectRow.status== 3">拒绝原因:<span style="color:#999">{{selectRow.back_note ? selectRow.back_note : '未填写拒绝原因'}}</span></p>
                <div class="btn-con">
                    <template v-if="selectRow.status == 2">
                      <el-button  type="primary" @click="handleStatus(1)">通 过</el-button>
                      <el-button type="danger"  @click="handleStatus(3)">拒 绝</el-button>
                    </template>
                    <template v-if="selectRow.status == 1">
                      <el-button type="success" >审核通过</el-button>
                    </template>
                    <template v-if="selectRow.status == 3">
                      <el-button type="danger" >已拒绝</el-button>
                    </template>
                    <template v-if="selectRow.status == 0">
                      <el-button type="danger" >存入失败</el-button>
                    </template>
                    <template v-if="selectRow.status == 4">
                      <el-button type="danger" >取出失败</el-button>
                    </template>
                </div>
              </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
  name: "BillDetailByWallet",
  data() {
    return {
      selectRow: '',
      isShowDetail: false,

      totalPrice: 0,
      searchName: '',
      searchCard: '',
      status: '', // 状态
      formLabelWidth: "135px",
      statusOptions: [{
        name: '全部',
        value: ''
      },{
        name: '存入失败',
        value: 0
      },{
        name: '存入/取出成功',
        value: 1
      },{
        name: '取出申请审核中',
        value: 2
      },{
        name: '取出申请驳回',
        value: 3
      },{
        name: '取出失败',
        value: 4
      }],
      log_type: 1, // 类型
      logTypeOptions: [
      //   {
      //   name: '全部',
      //   value: ''
      // },
      {
        name: '存款',
        value: 1
      },{
        name: '取款',
        value: 2
      },{
        name: '活期利息',
        value: 3
      },{
        name: '赏金转入',
        value: 4
      }],
      user_id: '',
      tableData: [],
      curPage: 1,
      totalPage: 1,
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
    this.dateArr = ''
    this.searchName = ''
    this.searchCard = ''
    this.status = ''
    this.log_type = 1
    this.totalPrice = 0
    this.isShowDetail = false
    this.selectRow = ''
    this.getWalletLists();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.dateArr = '';
      this.searchName = ''
      this.searchCard = ''
      this.status = ''
      this.isShowDetail = false
      this.selectRow = ''
      this.getWalletLists();
    },
    // 查看
    lookItem(row) {
      this.selectRow = row
      this.isShowDetail = true
    },
    // 查询
    search() {
      this.loading = true
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.getWalletLists()
    },
    getWalletLists() {
      let params = {
          page: this.curPage,
          size: 10,
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
          end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
          name: this.searchName,
          status: this.status,
          log_type: this.log_type,
      }
      this.ajax("wallet_lists", params, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
            this.totalPrice = res.total ? res.total : 0
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
      this.getWalletLists();
    },
     // 详情页同意 拒绝按钮
    handleStatus (status) {
      if (status == 1) {
        this.$confirm('确定同意审核吗?', '提示', {
          confirmButtonText: '同意',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.handleCheck(status, this.selectRow, '')
        }).catch(action  => {
        });
      } else if (status == 3){
        this.$prompt('请输入拒绝理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(({ value }) => {
          this.handleCheck(status,this.selectRow,value)         
        }).catch(() => {});
      }
    },
    // 请求审核api
    handleCheck (status,row,value) {
      this.ajax("wallet_verify", {
          w_id: row.w_id,
          status: status,
          back_note: value
        }, "审核失败",
        res => {
          if (res.errno == 0) {
            row.status = status
            if (status == 3) {
              row.back_note = value
            }
            this.$message.success(status == 1 ? '已同意' : '已拒绝')
          }
        },
        err => {
        }
      );
    },
  }
};
</script>
<style lang="less">
.BillDetailByWallet {
  padding: 20px;
  .el-table {
    background: transparent;
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
    }
    .el-form-item {
      width: 33%;
      float: left;
      margin-bottom: 10px;
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
  .el-form {
    height: calc(100% - 20vh);
    overflow-y:auto;
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
  }
  .el-form::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    border-radius: 100px;

  }
  .el-form::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 100px;
      background: rgba(94, 92, 92, 0.2);
  }
  .el-form::-webkit-scrollbar-track {/*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      // border-radius: 0;
      // background: rgba(0,0,0,0.1);
  }
  .form-item-con {
        margin: 2rem 0;
        position: relative;
        .dome_p {
          line-height: auto;
        }
        .p_tit {
          font-weight: bold;
        }
        .p_desc {
          color: #3B6AF1;
          cursor: pointer;
        }
        .el-form-item {
            width: 50%;
            height: 2.5rem  ;
            float: left;
            margin-bottom: 20px;
            .el-form-item__label {
                font-size: 0.9rem;
            }
            .el-input {
                width: 100%;
                .read-idCard {
                    color: #3B6AF1;
                    background: #F0F8FF;
                    font-size: 0.75rem;
                    cursor: pointer;
                }
                .read-idCard:active {
                    opacity: 0.6;
                }
            }
            .el-image {
              width: 100px;
              height: 100px;
              cursor: pointer;
              .image-slot {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: #f5f7fa;
                .text {
                  height: 22px;
                  font-size: 0.7rem;
                  color: #999;
                }
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
                margin-left: 0!important;
            }
            .img-con {
                max-width: 100%;
                border: 1px solid #E4EDF6;
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
                    max-height: 100%
                }
            }
           
            .upload-btn {
                width: 100%;
                padding: 0.3rem 0;
                background: #E4EDF6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #3B6AF1;
                font-size: 0.9rem;
                cursor: pointer;
            }
            .upload-btn:hover {
                opacity: 0.6;
            }
        }
        .assets-form-item {
            width: 100%;
            margin-bottom: 0;
            height: auto;
            .pic-item {
                position: relative;
                float: left;
                width: 8rem;
                height: 8rem;
                padding: 0.5rem;
                border: 1px solid #dcdfe6;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                margin-bottom: 1rem;
                .pic {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
         .idcard-item-con {
            height: auto;
            .idcard-img {
                width: 160px;
                height: 102px;
                background: #fff;
                border: 1px solid #eee;
                border-radius: 8px;
                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .idcard-text {
                width: 160px;
                padding: 0.2rem 0;
                background: #E4EDF6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #3B6AF1;
                font-size: 0.9rem;
                cursor: pointer;
            }
        }
        
    }
  
}
.el-image-viewer__wrapper {
    z-index: 99999999!important
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