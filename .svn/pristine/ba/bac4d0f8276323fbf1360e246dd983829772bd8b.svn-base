<template>
    <div class="mutualDepositList"  v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>互助金业务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">互助金存入列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="operate-con clearfix" >
            <div class="search-con">
                <el-form class="clearfix"  label-width="95px">
                    <el-form-item label="存入日期" style="width:auto">
                        <el-date-picker v-model="dateArr" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="存入类型">
                      <el-select v-model="save_type_id" placeholder="请选择存入类型">
                        <el-option v-for="item in saveOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="存款支付方式">
                      <el-select v-model="pay_type" placeholder="请选择存款支付方式">
                        <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="支付状态">
                      <el-select v-model="pay_status" placeholder="请选择支付状态">
                        <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
                </el-form>

            </div>
        </div>
         <div class="btns-manage">
          <el-button size="mini" type="success" round  @click="getData" v-if="adminType == 3">管理我的合作社</el-button>
          <el-button size="mini" type="warning"  round @click="chooseCoopera" v-if="adminType != 0">查看下级合作社</el-button>
        </div>
        <div class="tip" :class="{'manage-tip':!selectName}" v-if="adminType != 0">
          <span v-if="selectName">正在查看下级【{{selectName}}】的数据</span>
          <span v-else>正在管理我的合作社</span>
        </div>
        <div class="table-con">
          <div>
              <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
              <el-table-column prop="id" label="ID"  width="80" align="center"></el-table-column>
              <el-table-column prop="card" label="互助金卡号" width="170" align="center"></el-table-column>
              <el-table-column prop="save_proof" label="凭证号"  width="170" align="center"></el-table-column>
              <!-- <el-table-column prop="fixdate_code" label="定期编号" ></el-table-column> -->
              <el-table-column prop="money" label="存入金额" align="center"></el-table-column>
              <el-table-column prop="type_name" label="存入类型" align="center"></el-table-column>
              <el-table-column prop="save_date" label="存入日期" align="center"></el-table-column>
              <el-table-column prop="term_name" label="入股期限" align="center"></el-table-column>
              <el-table-column prop="start_rate_date" label="起息日期" align="center"></el-table-column>
              <el-table-column prop="save_rate" label="利率" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.save_type_id==2">{{scope.row.save_rate + '‰'}}</span>
                  <span v-if="scope.row.save_type_id==3">{{scope.row.rate + '‰'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="pay_type" label="支付方式" >
                <template slot-scope="scope">
                  {{scope.row.pay_type == 1 ? '社内卡' : scope.row.pay_type == 2 ? '现金' : scope.row.pay_type == 3 ? '微信' : scope.row.pay_type == 4 ? '支付宝' : scope.row.pay_type == 5 ? '银联' : ''}}
                </template>
              </el-table-column>
              <el-table-column prop="pay_status" label="支付状态" width="100" align="center">
                <template slot-scope="scope">
                  {{scope.row.pay_status == 1 ? '成功' : '失败'}}
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
        <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
    </div>
</template>
<script>
import myDrawer from "../../components/drawer.vue";
export default {
  name: "mutualDepositList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading:false,
      dateArr: '',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
		},

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      cooperaId: '', //合作社id
      cooperativeList:[],
      
      cooperationInfo: '',

      saveOptions:[{
        id:'',
        name: '全部'
      },{
        id:'2',
        name: '定期'
      },{
        id:'3',
        name: '活期'
      }],
      save_type_id:'',//存入类型
      typeOptions:[{
        id:'',
        name: '全部'
      },{
        id:'1',
        name: '社内卡'
      },{
        id:'2',
        name: '现金'
      },{
        id:'3',
        name: '微信'
      },{
        id:'4',
        name: '支付宝'
      },{
        id:'5',
        name: '银联'
      }],
      pay_type:'',//支付方式
      statusOptions:[{
        id:'1',
        name: '成功'
      },{
        id:'2',
        name: '失败'
      }],
      pay_status:'1',//支付状态

      drawer: false,
      selectName: '',
      level2List: [],
    };
  },
  components: { myDrawer },
  activated() {
    this.initEventWatch()
	  this.selectName = '';
    this.level2List = []
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    //  const start = new Date();
	  // const end = new Date();
	  // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    // this.dateArr = [start, end]
    this.dateArr = ''
    
    //判断是否为管理员
    let adminType = localStorage.getItem('is_admin')
    if(adminType && Number(adminType) >= 1) {
      this.isAdmin = true
      this.adminType = adminType
    }
    if(this.isAdmin) {
        this.utils.getCooperativeList(this, data =>{
          if(data && data.length > 1 && adminType == 3) {
            this.cooperaId = data[1].coopera_id
          } else {
            this.cooperaId = ''
            this.selectName = data[0].coopera_name
            data[0].isSelect = true
          }
          this.cooperativeList = data
          this.amountList()
        },err =>{
            this.loading = false
        })
    } else {
      this.amountList();
    }

  },
  methods: {
    initData(){
    //    const start = new Date();
	  // const end = new Date();
	  // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    // this.dateArr = [start, end]
      this.selectName = '';
      this.level2List = []
      this.dateArr = ''
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = 1;
      if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
          this.cooperaId = this.cooperativeList[1].coopera_id
      } else {
          this.cooperaId = ''
          if(this.cooperativeList && this.cooperativeList.length > 0) {
            this.selectName = this.cooperativeList[0].coopera_name
          }
      }
      this.amountList();
    },
    // 初始化 监听合作社选择组件事件
	initEventWatch(){
		eventWatch.$on('closeDrawer', res =>{
			this.drawer = false
		})
		eventWatch.$on('selectLevel1', row=>{
			this.cooperativeList.forEach(item =>{
				this.$set(item,'isSelect', false)
			})
			this.$set(row,'isSelect', true)
			this.level2List = []
			if(row.coopera_id == row.parent_id && row.count > 1) {
				this.getLevel2Data(row)
			} else {
				this.tableData = []
				this.curPage = 1
				this.totalPage = null
				this.cooperaId = row.coopera_id
				this.selectName = row.coopera_name
				this.amountList()
			}
		})
		eventWatch.$on('selectLevel2', row=>{
			this.level2List.forEach(item =>{
				this.$set(item,'isSelect', false)
			})
			this.$set(row,'isSelect', true)

			this.tableData = []
			this.curPage = 1
			this.totalPage = null
			this.cooperaId = row.coopera_id
			this.selectName = row.coopera_name
			this.amountList()
		})
	},
	 // 获取我的合作社数据
    getData() {
		if(!this.selectName) return
      	let cooperaInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
        this.tableData = []
        this.curPage = 1
        this.totalPage = null
        this.cooperaId = cooperaInfo ? cooperaInfo.id : ''
        this.selectName = ''
        this.level2List = []
        this.amountList()
    },
    // 展开选择合作社
    chooseCoopera() {
      this.drawer = true
      eventWatch.$emit('initData')
    },
	  getLevel2Data(row,callBack){
      this.ajax("cooperativeLevelList",{ parent_id: row.coopera_id },"获取合作社列表失败",res => {
        if(res.errno == 0) {
          res.data.forEach(item  =>{
            item.disabled = true
          })
          this.level2List =res.data
          callBack && typeof callBack == 'function' && callBack()
        } else {
          this.level2List = []
        }
        },err => {
          this.level2List = []
        }
      );
    },
    // 查询
    search() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = 1;
      this.amountList();
    },
    amountList() {
      this.loading = true
      this.ajax(
        "saveMoneyLists",
        {
            page:this.curPage,
            size:10,
            coopera_id: this.cooperaId,
            start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd', this.dateArr[0]) + ' 00:00:00') : '',
            end: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd', this.dateArr[1])+' 23:59:59') : '',
            save_type_id: this.save_type_id,
            pay_type: this.pay_type,
            pay_status: this.pay_status
        },
        "查询失败",
        res => {
          this.loading = false
          if (res.errno == 0) {
            this.drawer = false
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
          }
        },
        err => {
          this.loading = false
        }
      );
    },
    handleCurPageChange(val){
        this.curPage = val;
        this.amountList()
    },
  }
};
</script>
<style lang="less">
.mutualDepositList {
  padding: 20px;
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .operate-con {
	  padding: 10px 0;
        .search-con {
        // float: left;
        width: 100%;
        .el-form{
          display: flex;
        }
        .el-form-item {
            width: 28%;
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
        .btn-con {
        float:right;
        }
    }
}

</style>