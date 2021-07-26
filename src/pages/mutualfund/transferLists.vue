<template>
    <div class="transferList" v-loading="tLoading">
        <div class="breadcrumb-con">
              <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
              <div class="breadcrumb-info">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                      <el-breadcrumb-item>互助金列表</el-breadcrumb-item>
                      <el-breadcrumb-item  class="breadcrumb-tit">互助金转账列表</el-breadcrumb-item>
                  </el-breadcrumb>
              </div>
            <el-button size="small" @click="initData()">刷新</el-button>
          </div>

        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
                <el-select v-model="type" placeholder="请选择转账类型" @change="changeType">
                    <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-form-item label="社员姓名">
                    <el-input v-model="userName" placeholder="请输入社员姓名" clearable @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="收款账户">
                    <el-input v-model="account" placeholder="请输入收款账户" clearable @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="转账单状态">
                    <el-select v-model="status" placeholder="请选择转账单状态">
                        <el-option v-for="(item,index) in approvalOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form>
        </div>
            <div class="table-con">
                <el-table
                    :data="tableData"
                    max-height="550"
                    style="width: 100%"
                    v-if="type==1 && tableData && tableData.length > 0">
                    <el-table-column prop="turn_bank_id" label="ID" width="100%"></el-table-column>
                    <el-table-column prop="card" label="转出账户" ></el-table-column>
                    <el-table-column prop="name" label="社员姓名" ></el-table-column>
                    <el-table-column prop="turn_bank_name" label="收款银行" ></el-table-column>
                    <el-table-column prop="turn_bank_num" label="收款银行卡号" ></el-table-column>
                    <!-- <el-table-column prop="turnin_card" label="转入账户/互助金账户" ></el-table-column> -->
                    <el-table-column prop="turn_bank_user" label="收款人姓名" ></el-table-column>
                    <el-table-column prop="turnout_money" label="转账金额" ></el-table-column>
                    <el-table-column prop="turn_note" label="转账附言" ></el-table-column>
                    <el-table-column prop="turn_bank_name" label="转账单状态" >
                        <template slot-scope="scope">
                            {{scope.row.status==0?'驳回':scope.row.status==1?'通过':scope.row.status==2?'待审核':''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="worker_phone" label="转账方式" >
                        <template slot-scope="scope">
                            转出至别人银行卡
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" v-if="scope.row.status == 2 && isApprove" @click="toShenpi('shenpi',scope.row.turn_bank_id,2)">去审批</el-button>
                            <el-button type="text" size="small" v-if="scope.row.status == 2 && isTransfer" @click="toShenpi('zhuanzhang',scope.row.turn_bank_id,2)">去转账</el-button>
                            <el-button type="text" size="small" v-if="scope.row.status == 0 || scope.row.status == 1 && isLook" @click="toShenpi('detail',scope.row.turn_bank_id,2)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-table
                    :data="tableData"
                    max-height="550"
                    style="width: 100%"
                    v-if="type==2 && tableData && tableData.length > 0">
                    <el-table-column prop="log_id" label="ID" width="100%"></el-table-column>
                    <el-table-column prop="card" label="转出账户" ></el-table-column>
                    <el-table-column prop="name" label="社员姓名" ></el-table-column>
                    <el-table-column prop="turnin_card" label="转入账户/互助金账户" ></el-table-column>
                    <el-table-column prop="turnin_name" label="收款人姓名" ></el-table-column>
                    <el-table-column prop="turnout_money" label="转账金额" ></el-table-column>
                    <el-table-column prop="turn_note" label="转账附言" ></el-table-column>
                    <el-table-column prop="turn_bank_name" label="转账单状态" >
                        <template slot-scope="scope">
                            {{scope.row.status==0?'驳回':scope.row.status==1?'通过':scope.row.status==2?'待审核':''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="worker_phone" label="转账方式" >
                        <template slot-scope="scope">
                            转出至合作社卡号
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!--<div>
                                 <el-button type="text" size="small" @click="isTurn = true">驳回</el-button> 
                            </div>-->
                            <el-button type="text" size="small" v-if="scope.row.status == 2 && isApprove" @click="toShenpi('shenpi',scope.row.log_id,1)">去审批</el-button>
                            <el-button type="text" size="small" v-if="scope.row.status == 2 && isTransfer" @click="toShenpi('zhuanzhang',scope.row.log_id,1)">去转账</el-button>
                            <el-button type="text" size="small" v-if="scope.row.status == 0 || scope.row.status == 1 && isLook" @click="toShenpi('detail',scope.row.log_id,1)">查看详情</el-button>
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
  name: "transferList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      tLoading:true,
      typeOptions:[{
          name:'转出至别人银行卡',
          id:'1'
      },{
          name:'转出至合作社卡号',
          id:'2'
      }],
      type:'2',

      userName: '',
	  account: '',
	  lastSearch: '', // 上次搜索条件
	  cooperaId: '', //合作社id
	  cooperativeList:[],
	  status: '%', // 审批状态
	  approvalOptions: [{  // 审批状态配置{
		  label: '全部',
		  value: '%',
	  },{
		  label: '已驳回',
		  value: 0,
	  },{
		  label: '已通过',
		  value: 1,
	  },{
		  label: '待审核',
		  value: 2,
	  }],

      isApprove:false,
      isLook:false,
      isTransfer:false,
    };
  },
  activated() {
    this.tableData = [];
    this.curPage = 1;
    this.type = '2'
    this.status = '%'
    this.loading = true;
    this.tLoading = true;
    this.turnMoneyList();
    this.handlePermission();
  },
  methods: {
      initData(){
          this.tableData = [];
    this.curPage = 1;
    this.type = '2'
    this.status = '%'
    this.loading = true;
    this.tLoading = true;
    this.turnMoneyList();
    this.handlePermission();
      },
    // 判断当前页面都有什么权限
    handlePermission() { 
      let that = this;
      that.utils.getPermissionList(that,data =>{
        data.forEach(item =>{
          if(item.title == '审批') {
            that.isApprove = true
          }	
          if(item.title == '转账') {
            that.isTransfer = true
          }	
          if(item.title == '查看') {
            that.isLook = true
          }	
        })
      })
    },
    // 查询
	search() {
        let searchText = this.userName+this.account+this.status
		if(this.isAdmin == 1) {
			searchText+=this.cooperaId
		}
		if(this.lastSearch == searchText) { // 与上次输入搜索条件相同不走接口
			if(this.userName || this.account) {
				this.$message.error('请勿重复查询!')
			} else {
				// this.$message.error('请输查询条件!')
				// if(this.isAdmin == 1) {
				// 	document.getElementsByClassName("search-con")[0].querySelectorAll('input')[1].focus()
				// } else {
				// 	document.getElementsByClassName("search-con")[0].querySelectorAll('input')[0].focus()
                // }
                if(this.type == 1){
                    this.outMoneyList()
                }else if(this.type == 2){
                    this.turnMoneyList()
                }
			}
		} else { // 与上次输入搜索条件不同
			if(this.userName || this.account || this.status) { // 如果之前没有条件查询过 至少要输入一个查询条件
				this.curPage = 1;
				this.totalPage = null;
				this.data = [];
                this.loading = true;
                this.tLoading = true;
                if(this.type == 1){
                    this.outMoneyList()
                }else if(this.type == 2){
                    this.turnMoneyList()
                }
			} else { // 未填写查询条件
				if(this.lastSearch) {  // 如果之前有条件查询过 可走接口查询全部
					this.curPage = 1;
					this.totalPage = null;
					this.data = [];
                    this.loading = true;
                    this.tLoading = true;
                    if(this.type == 1){
                        this.outMoneyList()
                    }else if(this.type == 2){
                        this.turnMoneyList()
                    }
				} else {
					this.$message.error('请至少输入一项查询条件!')
					document.getElementsByClassName("search-con")[0].querySelector('input').focus()
				}
			}
		}	
	},
    outMoneyList() {
      this.ajax(
        "outMoneyLists",
        {
          page: this.curPage,
          size: 10,
          coopera_id:'',
          turn_type: 2,
          turn_bank_num: this.account,
          name: this.userName,
          status: this.status
        },
        "查询失败",
        res => {
            this.loading = false;
            this.tLoading = false;
          if (res.errno == 0) {
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
            this.lastSearch = this.userName+this.account+this.status
          }
        },
        err => {this.loading = false;
            this.tLoading = false;}
      );
    },
    turnMoneyList() {
      this.ajax(
        "turnMoneyLists",
        {
          page: this.curPage,
          size: 10,
          coopera_id:'',
          card: this.account,
          name: this.userName,
          status: this.status
        },
        "查询失败",
        res => {
            this.loading = false;
            this.tLoading = false;
          if (res.errno == 0) {
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
            this.lastSearch = this.userName+this.account+this.status
          }
        },
        err => {this.loading = false;
            this.tLoading = false;}
      );
    },
    handleCurPageChange(val) {
      this.curPage = val;
      this.list();
    },
    changeType(val){
        if(val == 1){
            this.outMoneyList()
        }else{
            this.turnMoneyList()
        }
    },
    

    toShenpi(tag,id,type){
        this.$router.push({
            path: '/transferDetail',
            query:{
                tag: tag,
                id:id,
                type:type,

            }
        })
    }
  }
};
</script>
<style lang="less">
.transferList {
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
  .el-dialog {
    .el-input {
      width: 50%;
      .el-input {
        width: 100%;
      }
      textarea {
        font-family: "微软雅黑";
      }
    }
  }

  .search-con{
      .el-form{
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
				color: #3B6AF1;
				background: #F0F8FF;
				font-size: 0.75rem;
				cursor: pointer;
			}
		}
        }
      }
  }
}
</style>