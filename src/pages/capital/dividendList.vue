<template>
    <div class="dividendList" v-loading="loading">
      <div class="breadcrumb-con">
        <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
        <div class="breadcrumb-info">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>股金业务</el-breadcrumb-item>
                <el-breadcrumb-item  class="breadcrumb-tit">股金分红列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <el-button size="small" @click="initData()">刷新</el-button>
    </div>
    <div class="operate-con clearfix">
        <div class="search-con">
            <el-form class="clearfix"  label-width="65px">
                <el-form-item label="分红日期" style="width:auto"  >
                  <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"> </el-date-picker>
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
            <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
            <el-table-column prop="coopera_name" label="机构名称" show-overflow-tooltip  align="center"></el-table-column>
            <el-table-column prop="name" label="社员名称"  align="center"></el-table-column>
            <el-table-column prop="stock_num" label="社员账号"  align="center"></el-table-column>
            <el-table-column prop="money" label="股金金额"  align="center"></el-table-column>
            <el-table-column prop="interest" label="分红金额"  align="center"></el-table-column>
            <el-table-column prop="end_rate_date" label="分红日期"  align="center"></el-table-column>
            <!-- <el-table-column prop="term_name" label="股金种类" ></el-table-column> -->
          </el-table>
          <el-pagination background  :current-page="curPage" layout="prev, pager, next" :total="totalPage*10" @current-change="handleCurPageChange"></el-pagination>
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
  name: "dividendList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading:false,

       isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      cooperaId: "", //合作社id
      cooperativeList: [],
      date:'',

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
    this.date = '';
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
	  this.selectName = '';
	  this.level2List = []
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = 1;
      this.date = ''

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
      // type 1社员分红 2合作社分红
	  this.loading = true
      let type = ''
      if(this.adminType == 3){
        type = 2
      }else if(this.adminType == 0){
        type = 1
      }
      this.ajax(
        "bonusLists",
        {
            page:this.curPage,
            size:10,
            coopera_id: this.cooperaId,
            start: this.date ? this.date[0] : '',
            end: this.date ? this.date[1] : '',
            type: type
        },
        "查询失败",
        res => {
          this.loading = false
          if (res.errno == 0) {
			this.drawer = false
            this.tableData = res.data.data;
            this.curPage = Number(res.data.current_page);
            this.totalPage = res.data.total;
            this.tableData.forEach(ele=>{
                ele.end_rate_date = ele.end_rate_date.substring(0,ele.end_rate_date.length - 9)
            })
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
.dividendList {
  padding: 20px;
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
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