<template>
    <div class="dividendList"  v-loading="loading">
      <el-form ref="ruleForm" label-width="150px">
          <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>互助金业务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">分红列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <el-button size="small" @click="initData()">刷新</el-button>
        </div>
          <div class="operate-con">
              <div class="operate-con clearfix">
                <div class="search-con">
                    <el-form class="clearfix"  label-width="65px">
                        <el-form-item label="分红日期" style="width:auto">
                            <el-date-picker v-model="dateArr" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
                        </el-form-item>
                        <el-button style="float:left" type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
                        <template v-if="!isAdmin || isAdmin && adminType == 3">
                          <!-- <template v-if="isRunDividend">
                              <el-form-item label="结算日期">
                              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择分红结算日期" v-model="fenhongDate"></el-date-picker>
                            </el-form-item>
                          </template>
                          <el-button type="primary" v-if="isRunDividend" size="small" @click="doDividend">执行互助金分红</el-button> -->
                          <el-button type="primary" v-if="isPrint"  size="small">互助金分红打印</el-button>
                        </template>
                    </el-form>
                </div>
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
          <div class="clearfix table-con">
              <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
                  <el-table-column prop="coopera_name" label="合作社"  align="center" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="name" label="社员名称"  align="center"></el-table-column>
                  <el-table-column prop="interest" label="红利金额"  align="center"></el-table-column>
                  <el-table-column prop="start_rate_date" label="红利起息日期"  align="center"></el-table-column>
                  <el-table-column prop="end_rate_date" label="红利结息日期"  align="center"></el-table-column>
                  <el-table-column prop="save_date" label="支付日期"  align="center"></el-table-column>
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
      </el-form>

      <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
    </div>
</template>
<script>
import myDrawer from "../../components/drawer.vue";
export default {
  name: "dividendList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading:false,
      fenhongDate: "",
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
      
      isRunDividend: false, // 是否有执行分红权限
      isPrint: false, // 是否有打印权限 

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
      this.cooperationInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
        this.utils.getCooperativeList(this, data =>{
          if(data && data.length > 1 && adminType == 3) {
            this.cooperaId = data[1].coopera_id
          } else {
            this.cooperaId = ''
            this.selectName = data[0].coopera_name
            data[0].isSelect = true
          }
          this.cooperativeList = data
          this.getBonus();
        }, err =>{
          this.loading = false
        })
    } else {
      this.getBonus()
    }
    this.handlePermission()
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
      if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
          this.cooperaId = this.cooperativeList[1].coopera_id
      } else {
          this.cooperaId = ''
          if(this.cooperativeList && this.cooperativeList.length > 0) {
            this.selectName = this.cooperativeList[0].coopera_name
          }
      }
      this.getBonus();
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
          this.getBonus()
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
        this.getBonus()
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
          this.getBonus()
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
          if(item.title == '执行分红') {
            that.isRunDividend = true
          }	
          if(item.title == '打印') {
            that.isPrint = true
          }	
        })
      })
    },
    // 搜索
    search() {
      this.tableData = [];
      this.curPage = 1;
      this.getBonus();
    },
    getBonus() {
      this.loading = true
      this.ajax(
        "bonusLists",
        {
          page: this.curPage,
          size: 10,
          coopera_id: this.cooperaId,
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd', this.dateArr[0]) + ' 00:00:00') : '',
          end: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd', this.dateArr[1])+' 23:59:59') : ''
        },
        "获取分红列表失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.drawer = false
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
            this.tableData.forEach(ele => {
              if(ele.start_rate_date) {
                ele.start_rate_date = ele.start_rate_date.substring(0, 10);
              }
              if(ele.end_rate_date) {
                ele.end_rate_date = ele.end_rate_date.substring(0, 10);
              }
              if(ele.save_date) {
                ele.save_date = ele.save_date.substring(0, 10);
              }
            });
          }
        },
        err => {
          this.loading = false;
          }
      );
    },
    doDividend(){
      this.ajax('bonus',{
        bonusdate:this.fenhongDate,
        coopera_id:''
      },'执行分红失败',res=>{
        if(res.errno == 0){
          this.$message.success(res.errmsg)
          this.getBonus()
        }
      },err=>{})
    },
    handleCurPageChange(val) {
      this.curPage = val;
      this.getBonus();
    }
  }
};
</script>
<style lang="less">
.dividendList {
  padding: 20px;
  .operate-con {
	  padding: 10px 0;
        .search-con {
        float: left;
        width: 100%;
        .el-form-item {
            width: 28%;
            float: left;
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
  .form-item-con {
    margin: 2rem 0;
    position: relative;
    .el-form-item {
      width: 50%;
      float: left;
      .el-form-item__label {
        font-size: 0.9rem;
      }
      .el-input {
        width: 80%;
        .read-idCard {
          color: #3b6af1;
          background: #f0f8ff;
          font-size: 0.75rem;
          cursor: pointer;
        }
        .read-idCard:active {
          opacity: 0.6;
        }
      }
      .el-select {
        width: 80%;
        .el-input {
          width: 100%;
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
        margin-left: 0 !important;
      }
      .img-con {
        max-width: 100%;
        border: 1px solid #e4edf6;
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
          max-height: 100%;
        }
      }

      .upload-btn {
        width: 100%;
        padding: 0.3rem 0;
        background: #e4edf6;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3b6af1;
        font-size: 0.9rem;
        cursor: pointer;
      }
      .upload-btn:hover {
        opacity: 0.6;
      }
    }
  }
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .btn-con {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5rem;
    padding-bottom: 2rem;
    .el-button {
      width: 23%;
      padding: 0.9rem;
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