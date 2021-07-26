<template>
    <div class="loan-step-detail" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>借款业务</el-breadcrumb-item>
                    <el-breadcrumb-item  :to="{ path: lastPath }">{{lastPathName}}</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">借款详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button style="margin-right:1rem" size="small" @click="initData()">刷新</el-button>
            <div class="back-con" @click="goBack">
                <img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
                <span class="back-text">返回上一页</span>
            </div>
        </div>
        <el-form ref="ruleForm" :model="ruleForm"  label-width="100px" style="margin-top: 0.5rem;min-height:200px" v-if="ruleForm">
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">借款人信息</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="社员姓名:">
                    <el-input v-model="ruleForm.loan.name" readonly></el-input>
                </el-form-item>
                <el-form-item :label="ruleForm.loan.passbook_num_type == 1 ? '社员卡号:' : '存折编号:'">
                    <el-input v-model="ruleForm.loan.loan_num" readonly></el-input>
                </el-form-item>
                 <el-form-item label="身份证号:">
                    <el-input v-model="ruleForm.loan.idcard" readonly></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="ruleForm.loan.phone" readonly></el-input>
                </el-form-item>
            </div>
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">借款信息单</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="借款状态:" v-if="loanObj">
                    <template v-if="loanObj.status == 0">
                        <el-tag size="medium" type="warning">未审批</el-tag>
                    </template>
                    <template v-if="loanObj.status == 1">
                        <el-tag size="medium" >还款中</el-tag>
                    </template>
                    <template v-if="loanObj.status == 2">
                        <el-popover trigger="hover" placement="top">
                            <p>操作人: {{loanObj.worker_name}}</p>
                            <p>拒绝原因: {{loanObj.exam_note}}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag style="cursor: pointer" size="medium" type="danger">已拒绝</el-tag>
                                <i style="cursor:pointer;color:#3B6AF1" class="el-icon-warning" ></i>
                            </div>
                        </el-popover>
                        <!-- <el-tag v-if="isAdmin" style="cursor: pointer" size="medium" type="danger">已拒绝</el-tag> -->
                    </template>
                    <template v-if="loanObj.status == 3">
                        <el-tag size="medium" type="danger">放款失败</el-tag>
                    </template>
                    <template v-if="loanObj.status == 4">
                        <el-tag size="medium" type="success">已还完</el-tag>
                    </template>
                </el-form-item>
                <el-form-item label="借款编号:">
                    <el-input v-model="ruleForm.loan.loan_code" readonly></el-input>
                </el-form-item>
                <el-form-item label="借款时间:">
                    <el-input v-model="loanObj.loan_date" readonly></el-input>
                </el-form-item>
                <el-form-item label="借款金额:">
                    <el-input v-model="ruleForm.loan.loan_money" readonly></el-input>
                </el-form-item>
                <el-form-item label="借款产品:">
                    <el-input v-model="ruleForm.loan.product_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="借款时长:">
                    <el-input v-model="ruleForm.loan.term_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="借款年利率:">
                    <el-input :value="ruleForm.loan.loan_rate+'‰'" readonly></el-input>
                </el-form-item>
                <el-form-item label="借款利息(元):" v-if="ruleForm.loan.status == 1 || ruleForm.loan.status == 4">
                    <el-input :value="ruleForm.loan.rate_number" readonly></el-input>
                </el-form-item>
                <el-form-item label="还款方式:">
                    <el-input v-model="ruleForm.loan.repayment_name" readonly></el-input>
                </el-form-item>
                
                <el-form-item label="借款类型:">
                    <el-input v-model="ruleForm.loan.loan_type_name" readonly></el-input>
                </el-form-item>
            </div>
            <template v-if="ruleForm.guarantee && ruleForm.guarantee.length > 0">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">担保人信息</span>
                    <div class="bg"></div>
                </div>
                <div class="user-list-con" v-for="(item,index) in ruleForm.guarantee" :key="index">
                    <div class="form-item-con user-form-item-con clearfix">
                        <el-form-item label="担保人:">
                            <el-input v-model="item.guarantee_name" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="担保类型:" >
                            <el-input v-model="item.guarantee_type_name" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="担保人额度:" v-if="item.guarantee_type != 1">
                            <el-input v-model="item.guarantee_amount" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="此次担保额度:" >
                            <el-input v-model="item.guarantee_money" readonly></el-input>
                        </el-form-item>
                    </div>
                    <template v-if="item.guarantee_type == 1">
                        <div class="form-item-con user-form-item-con clearfix" >
                            <div class="assets-con clearfix" v-for="(subItem,subIndex) in item.assets" :key="subIndex">
                                <el-form-item label="担保资产详情:" >
                                    <el-input v-model="subItem.type_name" readonly></el-input>
                                </el-form-item>
                                <el-form-item :label="subItem.guarantee_type_id == 1 ? '房产类型:' : subItem.guarantee_type_id == 2 ? '汽车品牌:' : '资产名称:'" >
                                    <el-input v-model="subItem.assets_name" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="现价格:" >
                                    <el-input v-model="subItem.assets_price" readonly></el-input>
                                </el-form-item>
                                <el-form-item v-if="subItem.guarantee_type_id == 2" label="购买价格:">
                                    <el-input v-model="subItem.assets_last_price" readonly></el-input>
                                </el-form-item>
                                <el-form-item v-if="subItem.guarantee_type_id != 2" :label="subItem.guarantee_type_id == 1 ? '房产年限:' : '资产年限:'" >
                                    <el-input v-model="subItem.assets_age" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="资产详情:" class="assets-form-item">
                                    <template v-if="subItem.img && subItem.img.length >= 0">
                                        <div class="pic-item" v-for="(imgItem,imgIndex) in subItem.img" :key="imgIndex" >
                                            <img @click="showImgView(subItem.img,imgIndex)" class="pic" :src="imgItem.img_url" alt="">
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div style="padding: 0 1rem;color:#909399">暂无资产详情</div>
                                    </template>
                                </el-form-item>
                            </div>
                        </div>
                    </template>
                      <div class="clearfix" style="width: 100%" >
                            <el-form-item label="担保人回执状态:" style="width:22%;float:left" >
                                <template v-if="item.guarantee_status == 0">
                                    <el-tag type="info">未审核</el-tag>
                                </template>
                                <template v-if="item.guarantee_status == 1">
                                    <el-tag type="success">担保人同意</el-tag>
                                </template>
                                <template v-if="item.guarantee_status == 2">
                                    <el-tag type="danger">担保人拒绝</el-tag>
                                </template>
                                <template v-if="item.guarantee_status == 3">
                                    <el-tag type="success">合作社同意</el-tag>
                                </template>
                                <template v-if="item.guarantee_status == 4">
                                    <el-tag type="success">合作社拒绝</el-tag>
                                </template>
                            </el-form-item>
                            <el-form-item label="拒绝原因:" style="width:22%;float:left" v-if="item.guarantee_status == 2 || item.guarantee_status == 4">
                                <span>{{item.disagree_reason}}</span>
                            </el-form-item>
                        </div>
                </div>
            </template>
            <template v-if="loanObj && (loanObj.status == 1 || loanObj.status == 4)">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">还款信息单</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="借款状态:" >
                        <template v-if="loanObj">
                            <template v-if="loanObj.status == 1">
                                <el-tag size="medium" >还款中</el-tag>
                            </template>
                            <template v-if="loanObj.status == 4">
                                <el-tag size="medium" type="success">已还完</el-tag>
                                <el-tag size="medium"  v-if="loanObj.back_type == 0">按期还款</el-tag>
                                <el-tag size="medium"   type="warning"  v-if="loanObj.back_type == 1">提前还款</el-tag>
                            </template>
                        </template>
                    </el-form-item>
                    <el-form-item label="已还金额:" >
                        已还<span class="masker">{{ruleForm.loan.back_repaid}}</span>元
                    </el-form-item>
                    <el-form-item label="已还期数:">
                        已还<span class="masker">{{loanObj.back_num}}</span>/{{loanObj.all}}期
                        <span v-if="loanObj.status == 4 && loanObj.back_type == 1" style="font-size:12px;color:red;margin-left:6px">在第{{loanObj.backlist.length}}期全部还完</span>
                    </el-form-item>
                    <el-form-item label="最近还款日:" >
                        <span >{{ruleForm.loan.real_back_date ? ruleForm.loan.real_back_date : '暂无还款记录'}}</span>
                    </el-form-item>
                    <el-form-item  style="width:100%">
                        <el-button type="primary" size="small" @click="showStageList()">查看还款计划</el-button>
                    </el-form-item>
                </div>
            </template>
            <div class="btn-con" v-if="lastPath == '/loanStepList' && isApprove">
                <!-- <template v-if="ruleForm.loan.guarantee_status == 1"> -->
                    <template v-if="ruleForm.loan.status == 0">
                        <el-button type="primary" round @click="handleBtn(1)">同意</el-button>
                        <el-button type="danger" round @click="handleBtn(0)">拒绝</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" round >{{ruleForm.loan.status == 1 ? '已同意' : (ruleForm.loan.status == 4 ? '已还款' : '已拒绝') }}</el-button>
                    </template>
                <!-- </template> -->
            </div>
        </el-form>
        <div v-if="!ruleForm" style="height:300px"></div>
        <el-image-viewer v-if="showViewer"  :on-close="closeImgView"  :url-list="viewerImgs" />
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
              <div class="tit">提前还款原分期记录列表</div>
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
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: "loanStepDetail",
  data() {
    return {
      isApprove: false,
      loanId: '',
      lastPath: '',
      lastPathName: '',
    
      ruleForm: '',

      showViewer: false,
      viewerImgs: [],

      loanObj: '',

      loading: true,

      isRefresh: 1, // 返回上一页是否刷新 1-不刷新 2-刷新

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
  components: { ElImageViewer },
  activated() {
    this.initData()
  },	
  methods: {
      // 初始化信息
    initData() {
        this.ruleForm = ''
        this.loanId = this.$route.query.loanId
        this.lastPath = this.$route.query.path
        if(this.lastPath == '/loanList') {
            this.lastPathName = '借款列表'
        } else if(this.lastPath == '/loanStepList'){
            this.lastPathName = '借款审批列表'
            this.isApprove = this.$route.query.isApprove
        }
        this.isShowStageList = false
        this.stageList = []
        this.isShowPrePayList = false
        this.prePayList = []
        this.loanUser = ''
        this.loanDate = ''
        this.curLoanCode = ''
        this.loanObj = JSON.parse(localStorage.getItem('loanObj'))
        this.loading = true
        this.getStepDetail()
    },
    // 返回上一页
    goBack() {
        this.$router.push({
            path:this.lastPath,
            query:{
                isRefresh: this.isRefresh
            }
        })
    }, 
    getStepDetail() {
      let that = this
      that.ajax('loanDetail',{
        loan_id: that.loanId,
      },'获取借款审批详情失败',res =>{
        that.loading = false
        if(res.errno == 0) {
            that.ruleForm = res.data
            if (that.loanObj) {
                if (that.loanObj.status == 2) {
                    that.$notify.error({
                        title: '该借款订单已被拒绝',
                        dangerouslyUseHTMLString: true,
                        message: '拒绝人：【'+that.loanObj.worker_name+'】<br/>拒绝原因：'+that.loanObj.exam_note
                    });
                }
                if (that.loanObj.status == 0) {
                    that.$notify({
                        title: '提示',
                        message: '该订单还未审批,您可以联系审批人加快审批',
                        type: 'warning'
                    });
                }
                
            }
        }
      }, err =>{
        that.loading = false
      })
    },
    // 显示图片大图
    showImgView(imgs,curIndex) {
        let tmpArr = []
        imgs.forEach(item =>{
            tmpArr.push(item.img_url)
        })
        this.viewerImgs = tmpArr
        this.showViewer = true
    },
    // 关闭图片大图
    closeImgView() {
        this.showViewer = false
        this.viewerImgs = []
    },
    // 处理操作btn
	handleBtn(status) {
        let that = this;
        if(status == 1) {
            that.$confirm('是否同意审批?', '提示', {
          		confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			}).then(() => {
				that.handleLoanStep(status,'')
			}).catch(() => {});
        } else {
            that.$prompt('是否'+(status == 1 ? '同意' : '拒绝')+'审批？', '提示', {
                inputPlaceholder: '请输入拒绝原因',
                type: 'warning',
                center: true
            }).then((data) => {
                that.handleLoanStep(status,data.value)
            }).catch(data =>{})
        }
		
	},
	// 请求审批接口
	handleLoanStep(status,exam_note) { //status 0-拒绝 1-通过
        let that = this
		that.ajax('loanStepAdd',{
			loan_code: that.ruleForm.loan.loan_code,
			exam_status: status,
			exam_note: exam_note,
		},'借款审批失败',res =>{
			if(res.errno == 0) {
                that.isRefresh = 2
                that.$message.success((status == 1 ? '审批' : '拒绝' )+ '成功')
                if(status == 1) {
                    that.ruleForm.loan.status = 1
                } else {
                    that.ruleForm.loan.status = 2
                }
			}
		})
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
    // 分期记录
    showStageList (row) {
        this.isShowStageList = true
        this.stageList = this.loanObj.backlist
        this.prePayList = this.loanObj.advancelist
        this.loanUser = this.ruleForm.loan.name
        this.loanDate = this.loanObj.loan_date
        this.curLoanCode = this.ruleForm.loan.loan_code
    },
    showPrePayList (row) {
        this.prePayDate = row.real_back_date
        this.prePayList.forEach((item,index) =>{
        let tmpNote = ''
        let realBackStatus = 1 // 1-默认灰色显示 2-正常/提前还款绿色显示 3-逾期未还款红色显示 4-逾期还款橙色警告显示 5-今日应还款蓝色显示
        let days = this.utils.getDaysBetween(this.utils.dateFormat('yyyy-MM-dd', new Date(this.prePayDate)), this.utils.dateFormat('yyyy-MM-dd', new Date(item.should_back_date)))
            if (days == 0) {
                realBackStatus = 2
                tmpNote = '还款日当天还款'
            } else if (days > 0) {
                realBackStatus = 2
                tmpNote = '已提前'+days+'天还款'
            } else {
                realBackStatus = 4
                tmpNote = '逾期' + (-days) + '天后,还款'
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
  }
};
</script>
<style lang="less">
.loan-step-detail {
    padding: 20px;
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
    .form-item-con {
        margin: 2rem 0;
        position: relative;
        .el-form-item {
            width: 23%;
            float: left;
            .el-form-item__label {
                font-size: 0.9rem;
            }
            .el-input {
                width: 100%;
            }
        }
    }
    .user-list-con {
        position: relative;
        border-bottom: 1px solid #dcdfe6; 
        margin-top: 1rem;
        .user-form-item-con {
            margin: 0;
            .el-form-item {
                width: 22%;
                float: left;
                .el-form-item__label {
                    font-size: 0.9rem;
                }
                .el-input {
                    width: 100%;
                }
            }
            .assets-form-item {
                width: 100%;
                margin-bottom: 0;
                .pic-item {
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
        }
    }
    .user-list-con:first-of-type {
        margin-top: 0;
    }
     .btn-con {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 5rem;
        padding-bottom: 2rem;
        .el-button {
            width: 15%;
            padding: 0.9rem;
        }
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
}

</style>