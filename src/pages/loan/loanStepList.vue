<template>
    <div class="loan-step-list" v-loading="loading">
		<div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>借款业务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">借款审批列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
			<el-button  size="small" @click="initData()">刷新</el-button>
        </div>
		<div class="operate-con clearfix">
		</div>
        <div class="table-con" >
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                    <el-table-column prop="loan_id" label="ID" width="60px" align="center"></el-table-column>
                    <el-table-column prop="card" label="社员卡号" align="center" ></el-table-column>
                    <el-table-column prop="name" label="社员姓名" align="center"></el-table-column>
                    <el-table-column prop="idcard" label="身份证号"  align="center"></el-table-column>
                    <el-table-column label="借款金额" align="center">
						<template slot-scope="scope">
							<span class="masker">{{scope.row.loan_money}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="product_name" label="借款产品" align="center"></el-table-column>
                    <el-table-column prop="loan_term_name" label="借款期限"  align="center" ></el-table-column>
                    <el-table-column prop="loan_type_name" label="借款类型" align="center"></el-table-column>
					<el-table-column prop="repayment_name" label="还款方式" align="center"></el-table-column>
					<el-table-column  label="当前审核人" align="center" >
						<template slot-scope="scope" >
							<el-tag size="medium" type="warning" effect="dark">{{scope.row.post_name}}</el-tag>
                        </template>
					</el-table-column>
					<el-table-column prop="loan_date" label="借款时间" align="center" ></el-table-column>
					<el-table-column label="提示" align="center" >
						<template slot-scope="scope">
							<template v-if="scope.row.guarantee_status == 0">
								<span><span style="color:red">担保人暂未同意担保</span>,请让客户联系担保人</span>
							</template>
							<template v-if="scope.row.guarantee_status == 1">
								<span>请联系{{scope.row.post_name}}尽快审批</span>
							</template>
							<template v-if="scope.row.guarantee_status == 2">
								<span><span style="color:red">担保人拒绝担保</span>,请让客户联系担保人</span>
							</template>
						</template>
					</el-table-column>
                    <el-table-column prop="user_name" label="操作"   :width="isApprove ? '200px' : '100px'" align="center">
                        <template slot-scope="scope" align="center">
							<el-button  plain size="small" @click="detail(scope.row)">查看</el-button>
							<template v-if="isApprove && (scope.row.guarantee_status == 1 || scope.row.guarantee_status == 3) && curPostId == scope.row.post_id">
								<el-button type="primary" plain size="small" @click="handleBtn(1,scope.row,scope.$index)">同意</el-button>
								<el-button type="danger" plain size="small" @click="handleBtn(0,scope.row,scope.$index)">拒绝</el-button>
							</template>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无借款审批</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
  name: "loanStepList",
  data() {
    return {
	  curPostId: '',
	  loanCode: '', // 借款编码
	  data: [],
	  curPage: 1,
	  totalPage: null,
	  loading: false,

	  isApprove: false, //是否有审批权限
    };
  },
  activated() {
	let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
	if(userInfo) {
		this.curPostId = userInfo.post_id
	}
	let isRefresh = this.$route.query.isRefresh // 1不刷新 2或者undefined刷新
	if(isRefresh && isRefresh == 1) return
	this.initData()
  },	
  methods: {
	// 初始化信息
    initData() {
		this.data = []
		this.curPage = 1
		this.totalPage = null
		this.loading = true
		this.getLoanStepList()
		this.handlePermission()
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
	// 获取审批列表
	getLoanStepList() {
		let that = this;
		that.loading = true;
		that.ajax('loanLists',{
			page: that.curPage,
			size: 10,
			status: 0,
		},'获取借款审批列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
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
		this.getLoanStepList()
	},
	// 处理操作btn
	handleBtn(status,row,index) {
		let that = this;
		if(status == 1) {
			that.$confirm('是否同意审批?', '提示', {
          		confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			}).then(() => {
				that.handleLoanStep(row,index,status,'')
			}).catch(() => {});
		} else {
			that.$prompt('是否'+(status == 1 ? '同意' : '拒绝')+'审批？', '提示', {
				inputPlaceholder: '请输入拒绝原因',
				type: 'warning',
				center: true
			}).then((data) => {
				that.handleLoanStep(row,index,status,data.value)
			}).catch(data =>{})
		}
		
	},
	// 请求审批接口
	handleLoanStep(row,index,status,exam_note) {//status 0-拒绝 1-通过
		let that = this
		that.ajax('loanStepAdd',{
			loan_code: row.loan_code,
			exam_status: status,
			exam_note: exam_note,
		},'借款审批失败',res =>{
			if(res.errno == 0) {
				// that.data.splice(index,1)
				that.getLoanStepList()
				that.$message.success((status == 1 ? '审批' : '拒绝' )+ '成功')
				// if(that.data.length == 0){
				// 	if(that.curPage > 1) {
				// 		that.curPage = that.curPage-1
				// 	}
				// 	that.getLoanStepList()
				// }
			}
		})
	},
	// 查看详情
	detail(row) {
		if (localStorage.getItem('loanObj')) {
            localStorage.removeItem('loanObj')
        }
        let tmpObj = {
            loan_date: row.loan_date,
            status: row.status,
            backlist: [],
            advancelist: [],
            back_num: 0,
            all: 0,
            back_type: 0,
            worker_name: '',
            exam_note: ''
        }
        localStorage.setItem('loanObj', JSON.stringify(tmpObj))
		this.$router.push({
			path: '/loanStepDetail',
			query: {
				loanId: row.loan_id,
				isApprove: ((row.guarantee_status == 1 || row.guarantee_status == 3) && this.curPostId == row.post_id) ? this.isApprove : false,
				path: '/loanStepList',
			}
		})
	}
  }
};
</script>
<style lang="less">
.loan-step-list {
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
	}
}

</style>