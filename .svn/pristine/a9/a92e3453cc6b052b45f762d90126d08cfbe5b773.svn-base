<template>
    <div class="zijin"  v-loading="loading">
      <div class="breadcrumb-con">
          <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
          <div class="breadcrumb-info">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>监管查询报表</el-breadcrumb-item>
                <el-breadcrumb-item  class="breadcrumb-tit">资金业务</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
        <el-button size="small" @click="initData()">刷新</el-button>
      </div>
      <div class="operate-con">
            <div class="operate-con clearfix">
              <div class="search-con">
                  <el-form class="clearfix"  label-width="150px">
                      <el-form-item label="请选择资金业务类型" style="width:auto"  >
                          <el-select v-model="type" placeholder="请选择资金业务类型">
                            <el-option v-for="(item,index) in approvalOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="结束日期" style="width:auto"  >
                            <el-date-picker
                            v-model="end"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                      </el-form-item>
                      <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
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
      <div class="table-con">
        <div>
            <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
                <el-table-column width="80" label="序号" align="center">
                    <template slot-scope="scope">
                    <span>{{(curPage - 1) * 10 + scope.$index + 1}}</span>
                    <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 ,翻页序号从1开始解决方案 -->
                    </template>
                </el-table-column>
                <el-table-column v-if="selectName" prop="parent_coopera_name" label="合作联社名称" align="center"></el-table-column>
                <el-table-column prop="coopera_name" label="合作社名称" align="center"></el-table-column>
                <el-table-column prop="passbook_num" label="账户" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="money" label="金额" align="center"></el-table-column>
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
              <div class="err-info-text ">暂无资金列表</div>
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
  name: "zijin",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,

      ruleForm: {
        card: "",
        relation_id: "",
        passbook_num: "",
        passbook_num_type:'',
        uuid:''// IC卡芯片卡号
      },
      rules: {
        card: [{ required: true, message: "请输入卡号", trigger: "blur" }]
      },
      submitLoading: false,
      formLabelWidth: "220px",

      end:'',
      approvalOptions:[{
        label: '股金',
        value: 1,
        },{
        label: '互助金',
        value: 2,
        },{
        label: '定期',
        value: 3
        },{
        label: '分红',
        value: 4
        },{
        label: '贷款',
        value: 5
      }],
      type:1,

      isGuashi: false,
      isBuka: false,
      isPrint: false,
      isDel: false,

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      cooperaId: "", //合作社id
      cooperativeList: [],

      showReadIc: false, // 读取卡号弹窗

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
    this.date = ''

    //判断是否为管理员
    let adminType = localStorage.getItem('is_admin')
    if(adminType && Number(adminType) >= 1) {
      this.isAdmin = true
      this.adminType = adminType
    }
     if (this.isAdmin) {
      this.utils.getCooperativeList(this, data =>{
        if(data && data.length > 1 && adminType == 3) {
            this.cooperaId = data[1].coopera_id
          } else {
            this.cooperaId = ''
            this.selectName = data[0].coopera_name
            data[0].isSelect = true
          }
        this.cooperativeList = data

        this.getStaff()
      },err =>{
          this.loading = false
      })
    } else {
      this.getStaff();
    }
    this.handlePermission();
  },
  methods: {
    initData() {
      this.selectName = '';
      this.level2List = []
      this.tableData = [];
      this.curPage = 1;
      this.date = ''
      
       if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
            this.cooperaId = this.cooperativeList[1].coopera_id
        } else {
            this.cooperaId = ''
            if(this.cooperativeList && this.cooperativeList.length > 0) {
              this.selectName = this.cooperativeList[0].coopera_name
            }
        }
      this.getStaff();
      this.handlePermission();
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
          this.getStaff()
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
        this.getStaff()
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
          this.getStaff()
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
    search() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null;
      this.getStaff();
    },
    // 判断当前页面都有什么权限
    handlePermission() {
      let that = this;
      that.utils.getPermissionList(that, data => {
        data.forEach(item => {
          if (item.title == "挂失") {
            that.isGuashi = true;
          }
          if (item.title == "补卡") {
            that.isBuka = true;
          }
          if (item.title == "打印存折") {
            that.isPrint = true;
          }
          if (item.title == "删除") {
            that.isDel = true;
          }
        });
      });
    },
    //   社员列表
    getStaff() {
      this.loading = true
      this.ajax(
        "statisticByUser",
        {
          page: this.curPage,
          size: 10,
          coopera_id: this.cooperaId,
          type:this.type,
          end: this.end
        },
        "获取开户列表失败",
        res => {
          this.loading = false;
          this.drawer = false
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
    // 切换分页
    handleCurPageChange(val) {
      this.curPage = val;
      this.getStaff();
    }
  }
};
</script>
<style lang="less">
.zijin {
  padding: 20px;
  .operate-con {
    padding: 10px 0;
    .search-con {
      float: left;
      width: 80%;
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
          }
        }
      }
    }
    .btn-con {
      float: right;
    }
  }

  .read-idCard {
    color: #3b6af1;
    background: #f0f8ff;
    font-size: 0.75rem;
    cursor: pointer;
  }
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

  .el-dialog {
    .el-input {
      width: 50%;
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