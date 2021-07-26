<template>
    <div class="out-club-list" v-loading="loading">
        <div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>基本信息</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">退社列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
            <div class="search-con">
            <el-form class="clearfix"  label-width="65px">
                <el-form-item label="社员属性" >
                    <el-select v-model="confrereAttr" placeholder="请选择社员属性">
                        <el-option v-for="(item,index) in confrereAttrOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批类型" >
                    <el-select v-model="outStatus" placeholder="请选择审批类型">
                        <el-option v-for="(item,index) in outStatusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-button  type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
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
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                  <el-table-column type="expand">
                      <template slot-scope="props">
                         <div class="histroy-tit">退社申请记录</div>
                         <el-table :data="props.row.outlists" v-if="data && data.length > 0" border >
                            <el-table-column prop="note" label="申请备注" align="center" ></el-table-column>
                            <el-table-column prop="out_note" label="审核备注" align="center" ></el-table-column>
                            <el-table-column prop="add_time" label="创建时间" align="center" ></el-table-column>
                         </el-table>
                      </template>
                    </el-table-column>
                    <el-table-column prop="user_name" label="社员名称" align="center" ></el-table-column>
                    <el-table-column prop="coopera_name" label="所属合作社" align="center" v-if="isAdmin" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column  label="社员属性" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.cls == 1">
                                <el-tag size="medium"  effect="dark" >自然人</el-tag>
                            </template>
                            <template v-if="scope.row.cls == 2">
                                <el-tag size="medium"  effect="dark" type="success">机构</el-tag>
                            </template>
                            <template v-if="scope.row.cls == 3">
                                <el-tag size="medium"  effect="dark" type="warning">集体经济组织</el-tag>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column  label="审批类型" align="center" width="90px">
							<template slot-scope="scope">
								<template v-if="scope.row.out_status == 1">
									<el-tag size="medium" type="warning">未审批</el-tag>
								</template>
								<template v-if="scope.row.out_status == 2">
									<el-tag size="medium" type="success">已通过</el-tag>
								</template>
								<template v-if="scope.row.out_status == 3">
									<el-tag size="medium" type="danger">已拒绝</el-tag>
								</template>
							</template>
						</el-table-column>
                    <el-table-column prop="note" label="申请备注" align="center" ></el-table-column>
                    <el-table-column prop="out_note" label="审核备注" align="center" ></el-table-column>
                    <el-table-column prop="add_time" label="创建时间" align="center" ></el-table-column>
                    <template v-if="!selectName && isApprove">
                       <el-table-column  label="操作" align="center" >
                          <template slot-scope="scope" >
                            <template v-if="scope.row.out_status == 1">
                              <el-button plain size="small"  @click="handleBtn(2,scope.row)">同意</el-button>
                              <el-button plain size="small" type="danger" @click="handleBtn(3,scope.row)">拒绝</el-button>
                            </template>
                            <template v-else>
                              <span>--</span>
                            </template>
                          </template>
                      </el-table-column>
                    </template>
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无退社列表</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>

        <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
    </div>
</template>
<script>
import myDrawer from "../../components/drawer.vue";
export default {
  name: "outClubList",
  data() {
    return {
      cooperationInfo: '', // 当前登录合作社信息
      data: [],
      curPage: 1,
      totalPage: null,

      outStatus: '',
      confrereAttr: '',
      confrereAttrOptions: [{
        name: '全部',
        id: '',
      },{
        name: '自然人',
        id: 1,
      },{
        name: '机构',
        id: 2,
      },{
        name: '集体经济组织',
        id: 3,
      }],
      outStatusOptions: [{
          name: '全部',
          id: '',
      },{
          name: '未审核',
          id: 1,
      },{
          name: '已通过',
          id: 2,
      },{
          name: '已拒绝',
          id: 3,
      }],


      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      cooperaId: '', //合作社id
	    cooperativeList:[],
      loading: false,
      isApprove: false, //判断页面是否有审批权限

      drawer: false,
      selectName: '',
      level2List: [],
	    adminType: '',

    };
  },
  components: { myDrawer },
  activated() {
    this.initEventWatch()
      this.loading = true
      this.cooperationInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
      this.utils.checkToken(this,res =>{
        if(res && res.errno == 0) {
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
                    this.initData()
                },err =>{
                    this.loading = false
                })
            } else {
              this.initData()
            }
            this.handlePermission()
        } else {
             this.loading = false
        }
    })
  },	
  methods: {
	// 初始化信息
	initData() {
      this.selectName = '';
      this.level2List = []
      this.data = []
      this.outStatus = ''
      this.confrereAttr = ''
      this.curPage = 1
      this.totalPage = null

       if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
            this.cooperaId = this.cooperativeList[1].coopera_id
        } else {
            this.cooperaId = ''
        }
        if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
          this.cooperaId = this.cooperativeList[1].coopera_id
        } else {
          this.cooperaId = ''
          if(this.cooperativeList && this.cooperativeList.length > 0) {
            this.selectName = this.cooperativeList[0].coopera_name
          }
          
        }
      this.getOutList()
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
				this.data = []
				this.curPage = 1
				this.totalPage = null
				this.cooperaId = row.coopera_id
				this.selectName = row.coopera_name
				this.getOutList()
			}
		})
		eventWatch.$on('selectLevel2', row=>{
			this.level2List.forEach(item =>{
				this.$set(item,'isSelect', false)
			})
			this.$set(row,'isSelect', true)
			this.data = []
			this.curPage = 1
			this.totalPage = null
			this.cooperaId = row.coopera_id
			this.selectName = row.coopera_name
			this.getOutList()
		})
	},
    // 获取我的合作社数据
    getData() {
		if(!this.selectName) return
      	let cooperaInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
        this.data = []
        this.curPage = 1
        this.totalPage = null
        this.cooperaId = cooperaInfo ? cooperaInfo.id : ''
        this.selectName = ''
        this.level2List = []
        this.getOutList()
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
				if(item.title == '审批') {
					that.isApprove = true
				}	
			})
		})
	},
    // 搜索
    search() {
        this.curPage = 1
        this.totalPage = null
        this.data = []
        this.getOutList()
    },
	// 获取退社列表
	getOutList() {
    let that = this
    that.loading = true
		that.ajax('outLists',{
            page: that.curPage,
            size: 10,
            out_status: that.outStatus,
            cls: that.confrereAttr,
            coopera_id: that.cooperaId
        },'获取退社列表失败',res =>{
      that.loading = false
			if(res.errno == 0) {
        that.drawer = false
        that.curPage = Number(res.data.current_page)
				that.totalPage = res.data.total
				that.data = res.data.data
			}
		}, err =>{
      that.loading = false
		})
    },
    // 处理是否同意退社
    handleBtn(type,row) {
      if(type == 2) {
        this.$confirm('是否同意退社?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '同意',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
              this.outSave(type,row,'')
          }).catch(action => {});
      } else if(type == 3) {
          this.$prompt('请输入拒绝理由', '提示', {
            confirmButtonText: '拒绝',
            cancelButtonText: '取消',
            inputPlaceholder: '请输入拒绝理由',
            confirmButtonClass: 'el-button--danger',
            type: 'warning',
            center: true
          }).then(({ value }) => {
            this.outSave(type,row,value)
          }).catch(() => {
                 
          });
      }
         
    },
    // 请求退社审核api
    outSave(type,row,val) {
        let that = this
		that.ajax('outSave',{
            out_id: row.out_id,
            out_status: type,
            out_note: val
        },'退社审核失败',res =>{
			if(res.errno == 0) {
                row.out_status = type
                row.out_note = val
                that.$forceUpdate()
			}
		})
    },
    // 处理分页
	handleCurPageChange(val) {
		this.curPage = val;
		this.getOutList()
	},
  }
};
</script>
<style lang="less">
.out-club-list {
  padding: 20px;
 
  .el-pagination{
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
    .table-con {
      .histroy-tit {
          text-align: center;
          font-weight: bold;
          padding-bottom: 20px;
          font-size: 1.2rem;  
      }
	}
}
</style>