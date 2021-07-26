<template>
    <div class="loan-list"  v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>借款业务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">借款列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="operate-con clearfix">
            <div class="search-con">
                <el-form class="clearfix"  label-width="65px">
                    <el-form-item label="借款编号" >
                        <el-input v-model="loanCode" placeholder="请输入用借款编号" clearable @keyup.enter.native="search" ></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称" >
                        <el-input v-model="userName" placeholder="请输入用户名称" clearable @keyup.enter.native="search" ></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" >
                        <el-input v-model="idcard" placeholder="请输入身份证号" clearable @keyup.enter.native="search" ></el-input>
                    </el-form-item>
                    <el-form-item label="审批类型">
                        <el-select v-model="status" placeholder="请选择审批类型">
                            <el-option v-for="(item,index) in approvalOptions" :key="index" :label="item.label" :value="item.value"></el-option>
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
        <div class="table-con" >
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                    <!-- <el-table-column type="expand" >
                        <template slot-scope="props">
                            <div class="inner-table-tit">{{props.row.loan_date+' '}}【{{props.row.name}}】借款分期列表</div>
                            <el-table :data="props.row.backlist" border class="inner-table"  >
                                <el-table-column prop="status" label="还款状态" align="center">
                                    <template slot-scope="scope">
                                        <template v-if="scope.row.status == 0">
                                            <el-tag size="medium" type="warning">未还款</el-tag>
                                        </template>
                                        <template v-if="scope.row.status == 1">
                                            <el-tag size="medium" type="success">已还款</el-tag>
                                        </template>
                                        <template v-if="scope.row.status == 2">
                                            <el-tag size="medium" type="danger">还款失败</el-tag>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="back_principal" label="还款本金" align="center"></el-table-column>
                                <el-table-column prop="back_interest" label="还款利息" align="center"></el-table-column>
                                <el-table-column prop="overdue_rate" label="罚息" align="center"></el-table-column>
                                <el-table-column prop="real_back_date" label="实际还款日期" align="center"></el-table-column>
                                <el-table-column prop="should_back_date" label="应该还款日期" align="center" ></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="loan_code" label="借款编号" align="center"></el-table-column>
                    <el-table-column prop="card" label="社员卡号" v-if="!isAdmin" align="center"></el-table-column>
                    <el-table-column prop="name" label="社员姓名" align="center"></el-table-column>
                    <el-table-column prop="coopera_name" label="所属合作社" align="center" v-if="isAdmin" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="idcard" label="身份证号" align="center"></el-table-column>
                    <el-table-column prop="last_loan_money" label="借款金额(元)" align="center">
                        <template slot-scope="scope">
                            <span class="masker">{{scope.row.last_loan_money}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="loan_date" label="借款时间" align="center">
                        <template slot-scope="scope">
                            <span class="masker">{{scope.row.loan_date}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column label="已还期数" align="center" >
                         <template slot-scope="scope">
                            <template v-if="scope.row.status == 1 || scope.row.status == 4">
                                <p>已还<span class="masker">{{scope.row.back_num}}</span>/{{scope.row.all}}期</p>
                                <p v-if="scope.row.status == 4 && scope.row.back_type == 1" style="font-size:12px;color:red">在第{{scope.row.backlist.length}}期全部还完</p>
                            </template>
                            <template v-else>
                                --
                            </template>
                         </template>
                     </el-table-column>
                     <el-table-column  label="借款状态" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status == 0">
                                <el-tag size="medium" type="info">未审批</el-tag>
                            </template>
                            <template v-if="scope.row.status == 1">
                                <el-tag size="medium" >还款中</el-tag>
                            </template>
                            <template v-if="scope.row.status == 2">
                                <el-popover trigger="hover" placement="top" v-if="!isAdmin">
                                    <p>操作人: {{scope.row.worker_name}}</p>
                                    <p>拒绝原因: {{scope.row.exam_note}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag style="cursor: pointer" size="medium" type="danger">已拒绝</el-tag>
                                        <i style="cursor:pointer;color:#3B6AF1" class="el-icon-warning" ></i>
                                    </div>
                                </el-popover>
                                <el-tag v-if="isAdmin" style="cursor: pointer" size="medium" type="danger">已拒绝</el-tag>
                            </template>
                            <template v-if="scope.row.status == 3">
                                <el-tag size="medium" type="danger">放款失败</el-tag>
                            </template>
                            <template v-if="scope.row.status == 4">
                                <p>
                                    <el-tag size="medium" type="success">已还完</el-tag>
                                </p>
                                <p style="margin-top:6px" v-if="scope.row.back_type == 0">
                                    <el-tag size="medium" >按期还款</el-tag>
                                </p>
                                <p style="margin-top:6px"  v-if="scope.row.back_type == 1">
                                    <el-tag size="medium"   type="warning">提前还款</el-tag>
                                </p>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column  label="当前审核部门" align="center" v-if="!isAdmin" >
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status == 0" size="medium" type="warning" effect="dark">{{scope.row.post_name}}</el-tag>
                            <span v-else>审核已完成</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_name" label="借款产品" align="center"></el-table-column>
                    <!-- <el-table-column prop="loan_term_name" label="借款期限" align="center"></el-table-column> -->
                    <el-table-column prop="loan_type_name" label="借款类型" align="center"></el-table-column>
                    <el-table-column prop="repayment_name" label="还款方式" align="center"></el-table-column>
                   
                    <el-table-column label="操作" align="center" fixed="right"  width="180px">
                        <template slot-scope="scope">
                            <el-button  plain size="small" @click="detail(scope.row)">查看详情</el-button>
                            <el-button  v-if="scope.row.backlist && scope.row.backlist.length > 0"  type="primary" size="small" @click="showStageList(scope.row)">还款计划</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无借款列表</div>
                    </div>
                </div>
            </template>
        </div>
        <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
        <el-drawer class="back-drawer" :visible.sync="isShowStageList" :with-header="false" size="60%">
            <div class="drawer-tit-con" >
              <div class="tit">【{{loanUser}}】{{loanDate}} 编号为【{{curLoanCode}}】的借款分期列表</div>
              <div class="icon-con" @click="closeDrawer(1)" >
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <div class="tabs-con">
                <div class="table-scroll">
                    <el-table :data="stageList" border class="inner-table" header-row-class-name ="inner-table-header" >
                        <el-table-column  label="待还款金额(元)" align="center">
                            <template slot-scope="scope">
                                <span  class="masker">{{scope.row.back_price}}
                                <el-tooltip v-if="scope.row.back_price_str" class="item" effect="dark"  :content="scope.row.back_price_str" placement="top-start">
                                    <i style="cursor:pointer" class="el-icon-warning" v-if="scope.row.back_price_str"></i>
                                </el-tooltip>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="还款状态" align="center">
                            <template slot-scope="scope">
                                <template v-if="scope.row.status == 1">
                                    <el-tag type="success">已还款</el-tag>
                                </template>
                                <template v-else>
                                    <el-tag type="danger">待还款</el-tag>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column label="应还期数" align="center">
                        <template slot-scope="scope">
                            <p>
                                第<span class="masker">{{scope.row.back_type == 1 ? stageList.length : scope.row.num}}</span>/{{scope.row.all}}期
                            </p>
                        </template>
                        </el-table-column>
                        <el-table-column prop="real_back_date" label="实际还款日期" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.real_back_date ? scope.row.real_back_date : '--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="should_back_date" label="应该还款日期" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.back_type == 1 ? '--' : scope.row.should_back_date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="note" label="提示" align="center">
                            <template slot-scope="scope">
                                <template v-if="scope.row.back_type == 0">
                                    <!-- 1-默认灰色显示 2-正常/提前还款绿色显示 3-逾期未还款红色显示 4-逾期还款橙色警告显示 5-今日应还款蓝色显示 -->
                                    <template v-if="scope.row.realBackStatus == 1">
                                        <span class="masker info">{{scope.row.note}}</span>
                                    </template>
                                    <template v-if="scope.row.realBackStatus == 2">
                                        <span class="masker success">{{scope.row.note}}</span>
                                    </template>
                                    <template v-if="scope.row.realBackStatus == 3">
                                        <span class="masker danger">{{scope.row.note}}</span>
                                    </template>
                                    <template v-if="scope.row.realBackStatus == 4">
                                        <span class="masker warning">{{scope.row.note}}</span>
                                    </template>
                                    <template v-if="scope.row.realBackStatus == 5">
                                        <span class="masker">{{scope.row.note}}</span>
                                    </template>
                                </template>
                                <template v-else>
                                    <p><span class="masker danger" style="cursor: pointer" >在第{{stageList.length}}期,已全部还款</span></p>
                                    <p><el-button size="small" type="primary" @click="showPrePayList(scope.row)">查看提前还款详情</el-button></p>
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
              <!-- <div class="drawer-footer" >
                <div class="btn-con">
                  <el-button   type="primary">关 闭</el-button>
                </div>
              </div> -->
        </el-drawer>
        <el-drawer  :visible.sync="isShowPrePayList" :with-header="false" size="55%">
            <div class="drawer-tit-con" >
              <div class="tit">提前还款记录列表</div>
              <div class="icon-con" @click="closeDrawer(2)" >
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <div class="tabs-con">
                <div class="table-scroll">
                    <el-table :data="prePayList" border class="inner-table" header-row-class-name ="inner-table-header" >
                        <el-table-column  label="还款金额(元)" align="center">
                            <template slot-scope="scope">
                                <span  class="masker">{{scope.row.back_price}}
                                <el-tooltip v-if="scope.row.back_price_str" class="item" effect="dark"  :content="scope.row.back_price_str" placement="top-start">
                                    <i style="cursor:pointer" class="el-icon-warning" v-if="scope.row.back_price_str"></i>
                                </el-tooltip>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="还款状态" align="center">
                            <template slot-scope="scope">
                                <el-tag type="success">已还款</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="应还期数" align="center">
                            <template slot-scope="scope">
                                <template v-if="!scope.row.should_back_date && scope.row.num != scope.row.all">
                                    <p >
                                        第<span class="masker">{{scope.row.num}}</span>-<span class="masker">{{scope.row.all}}</span>/{{scope.row.all}}期
                                    </p>
                                </template>
                                <template v-else>
                                    <p >
                                        第<span class="masker">{{scope.row.num}}</span>/{{scope.row.all}}期
                                    </p>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="real_back_date" label="实际还款日期" align="center">
                            <template slot-scope="scope">
                                <span>{{prePayDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="should_back_date" label="应该还款日期" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.back_type == 1 ? '--' : scope.row.should_back_date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="note" label="提示" align="center">
                            <template slot-scope="scope">
                                <!-- 1-默认灰色显示 2-正常/提前还款绿色显示 3-逾期未还款红色显示 4-逾期还款橙色警告显示 5-今日应还款蓝色显示 -->
                                <template v-if="scope.row.realBackStatus == 1">
                                    <span class="masker info">{{scope.row.note}}</span>
                                </template>
                                <template v-if="scope.row.realBackStatus == 2">
                                    <span class="masker success">{{scope.row.note}}</span>
                                </template>
                                <template v-if="scope.row.realBackStatus == 3">
                                    <span class="masker danger">{{scope.row.note}}</span>
                                </template>
                                <template v-if="scope.row.realBackStatus == 4">
                                    <span class="masker warning">{{scope.row.note}}</span>
                                </template>
                                <template v-if="scope.row.realBackStatus == 5">
                                    <span class="masker">{{scope.row.note}}</span>
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import myDrawer from "../../components/drawer.vue";
export default {
  name: "loanList",
  data() {
    return {
      data: [],
      status: 1,
      userName: '',
      loanCode: '',
      idcard: '',
      approvalOptions:[{
          label: '全部',
          value: '',
      },{
          label: '未审核',
          value: 0,
      },{
          label: '还款中',
          value: 1,
      },{
          label: '已拒绝',
          value: 2,
      },{
          label: '放款失败',
          value: 3,
      },{
          label: '已还完',
          value: 4,
      }],
	  curPage: 1,
	  totalPage: null,
      loading: false,

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      cooperaId: '', //合作社id
      cooperativeList:[],
      
      cooperationInfo: '', // 当前登录合作社信息

      drawer: false,
      selectName: '',
      level2List: [],
      adminType: '',

      isShowStageList: false,
      stageList: [],
      loanUser: '',
      loanDate: '',
      curLoanCode: '',
      prePayList: [],
      isShowPrePayList: false,
      prePayDate: ''
    };
  },
  components: { myDrawer },
  activated() {
    this.initEventWatch()
    let isRefresh = this.$route.query.isRefresh // 1不刷新 2或者undefined刷新
    if(isRefresh && isRefresh == 1) return
    this.loading = true
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
        }, err =>{
            this.loading = false
        })
    } else {
        this.initData()
    }
  },	
  methods: {
    // 初始化信息
    initData() {
        this.selectName = '';
        this.level2List = []
        this.data = []
        this.status = 1
        this.userName = ''
        this.loanCode = ''
        this.idcard = ''
        this.curPage = 1
        this.totalPage = null
        if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
            this.cooperaId = this.cooperativeList[1].coopera_id
        } else {
            this.cooperaId = ''
            if(this.cooperativeList && this.cooperativeList.length > 0) {
                this.selectName = this.cooperativeList[0].coopera_name
            }
        }
        this.getLoanList()
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
				this.getLoanList()
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
			this.getLoanList()
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
        this.getLoanList()
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
        this.curPage = 1;
        this.totalPage = null;
        this.data = [];
        this.getLoanList()
    },
	// 获取借款列表
	getLoanList() {
        let that = this
        that.loading = true
		that.ajax('loanLists',{
			page: that.curPage,
            size: 10,
            status: that.status,
            coopera_id: that.cooperaId,
            name: that.userName,
            loan_code: that.loanCode,
            idcard: that.idcard
		},'获取借款列表失败',res =>{
            that.loading = false
			if(res.errno == 0) {
                that.drawer = false
                res.data.data.forEach(item =>{
                    if (item.backlist && item.backlist.length > 0) {
                        item.back_type = item.backlist[item.backlist.length - 1].back_type
                        item.backlist.forEach(subItem=>{
                        subItem.back_price = (Number(subItem.back_principal)*1000 + Number(subItem.overdue_rate)*1000 + Number(subItem.back_interest)*1000)/1000
                        subItem.back_price_str = '本金('+ Number(subItem.back_principal) +')'
                        if (Number(subItem.back_interest)) {
                            subItem.back_price_str += ' + 利息(' +Number(subItem.back_interest)+ ') '
                        }
                        if (Number(subItem.overdue_rate)) {
                            subItem.back_price_str += ' + 罚息(' +Number(subItem.overdue_rate)+ ') '
                        }

                            let tmpNote = ''
                            let realBackStatus = 1 // 1-默认灰色显示 2-正常/提前还款绿色显示 3-逾期未还款红色显示 4-逾期还款橙色警告显示 5-今日应还款蓝色显示
                            let days = that.utils.getDaysBetween(that.utils.dateFormat('yyyy-MM-dd'), that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.should_back_date)))
                            if (subItem.real_back_date) {
                                days = that.utils.getDaysBetween(that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.real_back_date)), that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.should_back_date)))
                                if (days == 0) {
                                    realBackStatus = 2
                                    tmpNote = subItem.real_back_date + ' 还款日当天还款'
                                } else if (days > 0) {
                                    realBackStatus = 2
                                    tmpNote = subItem.real_back_date + ' 已提前'+days+'天还款'
                                } else {
                                    realBackStatus = 4
                                    tmpNote = '逾期' + (-days) + '天后,'+ subItem.real_back_date +'已还款'
                                }
                            } else {
                                if (days == 0) {
                                    realBackStatus = 5
                                    tmpNote = '今天是还款日,请及时还款'
                                } else if (days > 0) {
                                    realBackStatus = 1
                                    tmpNote = '距离还款日还有' + days +'天'
                                } else {
                                    realBackStatus = 3
                                    tmpNote = '已经逾期' + (-days) + '天'
                                }
                            }
                            subItem.should_back_date = that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.should_back_date))
                            subItem.note = tmpNote
                            subItem.realBackStatus = realBackStatus
                        //    if (subItem.real_back_date) {
                        //        let should_back_date = that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.should_back_date))
                        //        let real_back_date = that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.real_back_date))
                        //        let day = that.utils.getDaysBetween(should_back_date,real_back_date)
                        //        if (day > 0) {
                        //         subItem.note = '逾期'+day+'天'
                        //        }
                        //    } else {
                        //        let should_back_date = that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.should_back_date))
                        //        let cur_date = that.utils.dateFormat('yyyy-MM-dd', '')
                        //        let day = that.utils.getDaysBetween(should_back_date, cur_date)
                        //        if (day < 0) {
                        //            subItem.note = '距离还款日还有' + (-day) +'天'
                        //        } else if (day == 0) {
                        //            subItem.note = '今天是还款日,请及时还款'
                        //        } else {
                        //            subItem.note = '已经逾期' + day + '天'
                        //        }
                        //    }
                        })
                    }
                    if (item.advancelist && item.advancelist.length > 0) {
                        item.advancelist.forEach((subItem, subIndex) =>{
                            subItem.back_price = (Number(subItem.back_principal)*1000 + Number(subItem.overdue_rate)*1000 + Number(subItem.back_interest)*1000)/1000
                            subItem.back_price_str = '本金('+ Number(subItem.back_principal) +')'
                            if (Number(subItem.back_interest)) {
                                subItem.back_price_str += ' + 利息(' +Number(subItem.back_interest)+ ') '
                            }
                            if (Number(subItem.overdue_rate)) {
                                subItem.back_price_str += ' + 罚息(' +Number(subItem.overdue_rate)+ ') '
                            }
                        })
                    }
                })
				that.data = res.data.data
				that.curPage = Number(res.data.current_page)
                that.totalPage = res.data.total
			}
		}, err =>{
			that.loading = false
		})
	},
	// 处理分页
	handleCurPageChange(val) {
        this.curPage = val;
		this.getLoanList();
	},
	// 查看详情
	detail(row) {
        if (localStorage.getItem('loanObj')) {
            localStorage.removeItem('loanObj')
        }
        let tmpObj = {
            loan_date: row.loan_date,
            status: row.status,
            backlist: row.backlist && row.backlist.length > 0 ? row.backlist : [],
            advancelist: row.advancelist && row.advancelist.length > 0 ? row.advancelist : [],
            back_num: row.back_num,
            all: row.all,
            back_type: row.back_type,
            worker_name: row.worker_name ? row.worker_name : '',
            exam_note: row.exam_note ? row.exam_note : ''
        }
        localStorage.setItem('loanObj', JSON.stringify(tmpObj))
		this.$router.push({
			path: '/loanStepDetail',
			query: {
				loanId: row.loan_id,
                path: '/loanList',
                isEdit: this.isEdit,

			}
		})
    },
    // 分期记录
    showStageList (row) {
        this.isShowStageList = true
        this.stageList = row.backlist
        this.prePayList = row.advancelist
        this.loanUser = row.name
        this.loanDate = row.loan_date
        this.curLoanCode = row.loan_code
    },
    showPrePayList (row) {
        this.prePayDate = row.real_back_date
        this.prePayList.forEach((item, index) =>{
            let tmpNote = ''
            let realBackStatus = 1 // 1-默认灰色显示 2-正常/提前还款绿色显示 3-逾期未还款红色显示 4-逾期还款橙色警告显示 5-今日应还款蓝色显示
            let days = this.utils.getDaysBetween(this.utils.dateFormat('yyyy-MM-dd', new Date(this.prePayDate)), this.utils.dateFormat('yyyy-MM-dd', new Date(item.should_back_date)))
            if (days == 0) {
                realBackStatus = 5
                tmpNote = '还款日当天还款'
            } else if (days > 0) {
                realBackStatus = 2
                tmpNote = '已提前'+days+'天还款'
            } else {
                realBackStatus = 4
                tmpNote = '逾期' + (-days) + '天后,还款'
            }
            if (index == this.prePayList.length - 1) {
                if (item.all == item.num) {
                } else {
                    tmpNote = '原应还'+item.all+'期,在第'+item.num+'期,全部还款'
                }
            }
            item.should_back_date = item.should_back_date ? this.utils.dateFormat('yyyy-MM-dd', new Date(item.should_back_date)) : ''
            if (index == this.prePayList.length - 1) {
                if (!item.should_back_date) {
                    if (index == 0) {
                        item.num = this.stageList.length
                    }
                    realBackStatus = 2
                    if (item.all == item.num) {
                        tmpNote = '在第'+item.num+'期,全部还款'
                    } else {
                        tmpNote = '原应还'+item.all+'期,在第'+item.num+'期,全部还款'
                    }
                }
            }
            item.note = tmpNote
            item.realBackStatus = realBackStatus
            item.days = days
        })
        if (Number(this.prePayList[this.prePayList.length - 1].back_price) <= 0) {
            this.prePayList.splice(this.prePayList.length-1,1)
            }
        this.isShowPrePayList = true
    },
    // 关闭回收列表弹窗
    closeDrawer (type) {
        if (type == 1) {
            this.isShowStageList = false
            this.stageList = []
            this.isShowPrePayList = false
            this.prePayList = []
            this.loanUser = ''
            this.loanDate = ''
            this.curLoanCode = ''
        } else {
            this.isShowPrePayList = false
            // this.prePayList = []
        }
    },
  }
};
</script>
<style lang="less">
.loan-list {
    padding: 20px;
    .el-table{
        background: transparent;
    }
    // .el-table::before{
    // 	height: 0;
    // }
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
            width: 23%;
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
        .inner-table-tit {
            font-weight: bold;
            font-size: 1.2rem;
            padding-bottom: 1.25rem;
            text-align: center;
        }
        .inner-table {
            thead {
                tr th{
                    background: #f9f9f9!important;
                }
            }
        }
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
  .table-scroll { overflow-y: auto; height: 100%;}
   .table-scroll::-webkit-scrollbar {/*滚动条整体样式*/
        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
        border-radius: 100px;

    }
    .table-scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 100px;
        background: rgba(94, 92, 92, 0.2);
    }
    .table-scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        // border-radius: 0;
        // background: rgba(0,0,0,0.1);
    }
.masker {
    font-weight: bold;
    color: #3B6AF1;
  }
.masker.info {
    color: #909399;
}
.masker.success {
    color: #67c23a;
}
.masker.warning {
    color: #e6a23c;
}
.masker.danger {
    color: #f56c6c;
}
.el-drawer {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 10px 8px 18px #000;
  }
  .back-drawer {
      .el-drawer.rtl {
        top: 4rem;
        bottom: 0.5rem;
        height: calc(100% - 4.5rem);
        .el-drawer__body {
        display: flex;
        flex-direction: column;
        }
    }
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
</style>