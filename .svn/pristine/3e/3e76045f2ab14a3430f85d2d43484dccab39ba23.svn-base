<template>
    <div class="mutualfundList" v-loading="loading">
      <div class="breadcrumb-con">
          <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
          <div class="breadcrumb-info">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item>互助金业务</el-breadcrumb-item>
                  <el-breadcrumb-item  class="breadcrumb-tit">互助金列表</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
        <el-button size="small" @click="initData()">刷新</el-button>
      </div>
      <div class="search-con">
          <el-form class="clearfix"  label-width="70px">
              <el-form-item label="查询日期">
                  <el-date-picker
                      v-model="date"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd">
                      </el-date-picker>
              </el-form-item>
              <el-form-item label="类型">
                  <el-select v-model="type" placeholder="请选择类型" multiple >
                      <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="账号">
                  <el-input placeholder="请输入合作社账户" v-model="passbook_num"></el-input>
              </el-form-item>
              <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
              <el-button type="primary" size="small" v-if="!isAdmin && isPrint" >打印</el-button>
          </el-form>
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
              <el-table-column prop="log_id" label="ID" width="80" align="center"></el-table-column>
              <el-table-column prop="card" label="互助金卡号"  align="center"></el-table-column>
              <el-table-column prop="log_type" label="记录类型"  align="center">
                  <template slot-scope="scope">
                    {{scope.row.log_type == 0?'存款':scope.row.log_type == 1?'取款':scope.row.log_type == 2?'贷款':scope.row.log_type == 3?'还款':scope.row.log_type == 4?'活期利息增加 ':scope.row.log_type == 5?'合作社卡内部转入':scope.row.log_type == 6?'合作社卡内部转出':scope.row.log_type == 7?'红利':scope.row.log_type == 8?'合作社卡转出到银行卡':scope.row.log_type == 14?'定期存入':scope.row.log_type == 15?'定期支取':''}}
                  </template>
              </el-table-column>
              <el-table-column prop="last_money" label="变动之前会员卡余额" ></el-table-column>
              <el-table-column prop="log_money" label="记录变动的金额" >
                  <template slot-scope="scope">
                    {{(scope.row.log_type == 0 || scope.row.log_type == 4 || scope.row.log_type == 5 || scope.row.log_type == 7)?'+' + scope.row.log_money : (scope.row.log_type == 1 || scope.row.log_type == 6)?'-' + scope.row.log_money:scope.row.log_money}}
                  </template>
              </el-table-column>
              <el-table-column prop="later_money" label="余额"  align="center">
                  <!-- <template slot-scope="scope">
                      {{(scope.row.log_type == 0 || scope.row.log_type == 4 || scope.row.log_type == 5 || scope.row.log_type == 7)?(Number(scope.row.last_money) + Number(scope.row.log_money)):(scope.row.log_type == 1 || scope.row.log_type == 6)?(Number(scope.row.last_money) + Number(scope.row.log_money)):''}}
                  </template> -->
              </el-table-column>
              <el-table-column prop="log_date" label="时间"  align="center"></el-table-column>
              <el-table-column prop="worker_name" label="操作人"  align="center"></el-table-column>
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
  name: "mutualfundList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading:false,

      date:'',
      type:'',
      typeOptions:[{
          id:0,
          name:'存款'
      },{
          id:1,
          name:'取款'
      },{
          id:5,
          name:'合作社卡内部转入'
      },{
          id:6,
          name:'合作社卡内部转出'
      },{
          id:8,
          name:'合作社卡转出到银行卡'
      },{
          id:14,
          name:'定期存入'
      },{
          id:15,
          name:'定期支取'
      }],
      passbook_num:'',
      lastSearch:'',

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      cooperaId: '', //合作社id
      cooperativeList:[],
      
      isPrint:false,// 是否有打印权限

      cooperationInfo: '',

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
      this.passbook_num = ''
      this.lastSearch = ''
      this.date = ''
      this.type = ''
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
    this.handlePermission()
   
  },
  methods: {
    initData(){
       this.selectName = '';
      this.level2List = []
      this.tableData = [];
      this.curPage = 1;
      this.passbook_num = ''
      this.lastSearch = ''
      this.date = ''
      this.type = ''
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
    // 判断当前页面都有什么权限
    handlePermission() { 
      let that = this;
      that.utils.getPermissionList(that,data =>{
        data.forEach(item =>{
          if(item.title == '打印') {
            that.isPrint = true
          }	
        })
      })
    },
    amountList() {
        let type = this.type
        let str = ''
        if(type != ''){
            type.forEach(element => {
                str += element + ','
            });
        }
      this.loading = true
      this.ajax(
        "mutualfundMoneyAll",
        {
            page:this.curPage,
            size:10,
            start: this.date != null?this.date[0]: '',
            end: this.date != null?this.date[1]: '',
            passbook_num: this.passbook_num,
            log_type: str.substring(0,str.length - 1),
            coopera_id: this.cooperaId,
            type: 0
        },
        "查询失败",
        res => {
          this.loading = false
          if (res.errno == 0) {
            this.drawer = false
            this.tableData = res.data.data
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
            this.lastSearch = this.date+JSON.stringify(this.type)+this.passbook_num
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

    // 查询
	search() {
       this.curPage = 1;
        this.totalPage = null;
        this.data = [];
        this.amountList()
	},
  }
};
</script>
<style lang="less">
.mutualfundList {
  padding: 20px;
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .el-select{
      width: 100%;
  }

  .search-con {
      margin-bottom: 10px;
    .el-form {
      width: 100%;
      display: flex;
    }
    .el-form-item {
      width: 25%;
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
.admin-tmp-con { 
  padding: 0;
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  .breadcrumb-con {
    margin-bottom: 0;
  }
  .admin-con {
    display: flex;
    width: 100%;
    height: 100%;
    .org-menu-con {
      width: 16rem;
      height: 100%;
      background: #F8FCFF;
      .level2-title {
          color: #8F9BA7;
      }
      .level2-title::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 35px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #8F9BA7;
        transform: translateY(-50%);
      }
      .is-opened {
        .el-icon-arrow-down {
          color: #409EFF;
        }
        .is-active {
          .level2-title {
            color: #409EFF;
          }
          .level2-title::after {
            background: #409EFF;
          }
        }
        
      }
      .is-active {
        background: #fff!important;
      }
      .menu-title {
        width: 10rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .menu-item-title {
        width: 7.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .no-menu-con {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .menu-absolute-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          .text {
            font-size: 0.9rem;
            color: #999;

          }
        }
      }
    }
    .right-con {
      position: relative;
      width: calc(100% - 16rem);
      height: 99%;
      padding: 10px;
      .info-con {
        position: relative;
        width: 100%;
        padding-top: 10px;
      }
      .operate-con {
        padding: 0;
      }
      .operate-con+.el-table {
        margin-top: 10px;
      }
    }
    
    .hide-menu {
      width: 54px;
    }
    .page-con {
      position: absolute;
      bottom: 0;
      right: 5rem;
    }
  }
}
</style>