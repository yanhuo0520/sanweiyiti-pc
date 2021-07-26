<template>
    <div class="confrere-list"  v-loading="loading">
			<div class="breadcrumb-con">
				<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
				<div class="breadcrumb-info">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item>基础信息</el-breadcrumb-item>
						<el-breadcrumb-item  class="breadcrumb-tit">社员档案列表</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<el-button style="margin-right:1rem" size="small" @click="initData()">刷新</el-button>
			</div>
			<div class="operate-con clearfix">
				<div class="search-con" >
					<el-form class="clearfix"  label-width="65px">
						<el-form-item label="社员名称">
						<el-input v-model="userName" placeholder="请输入社员姓名" clearable></el-input>
						</el-form-item>
						<el-form-item label="身份证号">
						<el-input v-model="idCard" placeholder="请输入社员身份证号" clearable></el-input>
						</el-form-item>
						<el-form-item label="审批状态" :style="isAdmin ? 'margin-top:0.5rem' : ''">
							<el-select v-model="status"  placeholder="请选择审批状态">
								<el-option v-for="(item,index) in approvalOptions" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="社员类型" style="margin-top:0.5rem">
							<el-select v-model="cooperaCls" placeholder="请选择社员类型">
								<el-option v-for="(item,index) in confrereTypeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>	
						<el-form-item label="日期范围" style="margin-top:0.5rem">
						<el-date-picker v-model="dateArr" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
						</el-form-item>
						<el-form-item  class="btn-form-item" style="margin-top:0.5rem">
							<el-button  type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
							<el-button  size="small"  type="primary" @click="importExcel" :loading="excelLoading">导出EXCEL</el-button>
						</el-form-item>
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
			<el-tabs type="border-card"  v-model="confrereAttr" @tab-click="handleTabClick" >
				<el-tab-pane label="自然人" name="1"></el-tab-pane>
				<el-tab-pane label="机构" name="2"></el-tab-pane>
				<el-tab-pane label="集体经济组织" name="3"></el-tab-pane>
				<div class="table-con" >
					<template v-if="data && data.length > 0 && confrereAttr == 1">
						<el-table :data="data" border >
							<el-table-column prop="user_id" label="ID"  width="60px" align="center"></el-table-column>
							<el-table-column prop="name" label="社员姓名"   align="center"></el-table-column>
							<el-table-column prop="coopera_name" label="所属合作社" align="center" v-if="selectName" width="200" show-overflow-tooltip></el-table-column>
							<el-table-column  label="性别" align="center" >
								<template slot-scope="scope">
									<span>{{scope.row.sex == 2 ? '女' : '男'}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="idcard" label="身份证"  align="center"></el-table-column>
							<el-table-column prop="phone" label="联系方式" align="center" ></el-table-column>
							<el-table-column  label="审批状态" align="center">
								<template slot-scope="scope">
									<template v-if="scope.row.status == 0">
										<el-tag size="medium" type="warning">未审批</el-tag>
									</template>
									<template v-if="scope.row.status == 1">
										<el-tag size="medium" type="success">已通过</el-tag>
									</template>
									<template v-if="scope.row.status == 2">
										<template v-if="isAdmin && cooperationInfo && cooperationInfo.id != scope.row.coopera_id">
											<el-tag  size="medium" type="danger">已拒绝</el-tag>
										</template>
										<template v-else>
											<el-popover trigger="hover" placement="top" >
													<!-- <p>操作人: {{scope.row.worker_name}}</p> -->
													<p>拒绝原因: {{scope.row.note}}</p>
													<div slot="reference" class="name-wrapper">
														<el-tag style="cursor: pointer" size="medium" type="danger">已拒绝</el-tag>
													</div>
											</el-popover>
										</template>
									</template>
									<template v-if="scope.row.status == 3">
										<el-tag size="medium" type="info">审核中</el-tag>
									</template>
								</template>
							</el-table-column>
							<el-table-column prop="guarantee_amount" label="担保额度"  align="center">
								<template slot-scope="scope">
									<p>总额度:<span style="color:#409EFF">{{scope.row.guarantee_amount}}</span></p>
									<p>剩余额度:<span style="color:#67c23a">{{scope.row.guarantee_surplus}}</span></p>
								</template>
							</el-table-column>
							<el-table-column  label="积分余额"  align="center" >
								<template slot-scope="scope">
									<span>{{scope.row.score ? scope.row.score : 0}}</span>
								</template>
							</el-table-column>
							<!-- <el-table-column prop="coopera_address" label="合作社地址" width="200px" align="center" show-overflow-tooltip></el-table-column> -->
							<el-table-column   prop="add_time" label="创建时间"  align="center" ></el-table-column>
							
							<template v-if="cooperationInfo && cooperationInfo.id == 151 && loginPostId == 2">
								<el-table-column  label="操作" fixed="right"  :width="(isOutClub && isLimitPrice) ? '280' : (isLimitPrice || isOutClub ? '200' : '90')" align="center">
									<template slot-scope="scope">
										<el-button plain size="small" @click="detail(scope.row)">编辑</el-button>
										<el-button v-if="scope.row.status == 1 && isLimitPrice" type="primary" plain size="small" @click="handleAssureBtn(scope.row)">担保额度</el-button>
										<el-button v-if="scope.row.status == 1 && isOutClub && scope.row.user_status == 1" type="danger" plain size="small" @click="handleOutAdd(scope.row)">{{scope.row.out_status == 1 ? '退社审核中' : (scope.row.out_status == 2 ? '已退社' : (scope.row.out_status == 3 ? '退社' : '退社'))}}</el-button>
									</template>
								</el-table-column>
							</template>
							<template v-else>
								<el-table-column  label="操作" fixed="right" :width="selectName ? '90' : ((isOutClub && isLimitPrice) ? '280' : (isLimitPrice || isOutClub ? '200' : '90'))" align="center">
									<template slot-scope="scope">
										<template v-if="!selectName">
											<el-button plain size="small" @click="detail(scope.row)">{{isEdit ? (scope.row.status != 2 ? '查看' : '编辑') : '查看'}}</el-button>
											<el-button v-if="scope.row.status == 1 && isLimitPrice" type="primary" plain size="small" @click="handleAssureBtn(scope.row)">担保额度</el-button>
											<el-button v-if="scope.row.status == 1 && isOutClub && scope.row.user_status == 1" type="danger" plain size="small" @click="handleOutAdd(scope.row)">{{scope.row.out_status == 1 ? '退社审核中' : (scope.row.out_status == 2 ? '已退社' : (scope.row.out_status == 3 ? '退社' : '退社'))}}</el-button>
										</template>
										<template v-else>
											<el-button plain size="small" @click="detail(scope.row)">查看</el-button>
										</template>
									</template>
								</el-table-column>
							</template>
						</el-table>
						<el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
					</template>
					<template v-if="data && data.length > 0 && confrereAttr == 2">
						<el-table :data="data" border >
							<el-table-column prop="user_id" label="ID"  width="60px" align="center"></el-table-column>
							<el-table-column prop="short_name" label="机构名称"  width="150px" show-overflow-tooltip align="center"></el-table-column>
							<el-table-column prop="coopera_name" label="所属合作社" align="center" v-if="selectName" width="200" show-overflow-tooltip></el-table-column>
							<el-table-column prop="address" label="机构地址" width="200px" align="center" show-overflow-tooltip></el-table-column>
							<el-table-column prop="license_num" label="社会信用代码"  width="130px" align="center"></el-table-column>
							<!-- <el-table-column prop="license_start" label="成立日期" width="100px" align="center"></el-table-column>
							<el-table-column prop="license_end" label="营业有效期" width="100px" align="center"></el-table-column> -->
							<el-table-column prop="name" label="法人姓名"  align="center"></el-table-column>
							<el-table-column prop="phone" label="法人手机号" width="120" align="center"></el-table-column>
							<el-table-column  label="审批状态" align="center" width="100">
								<template slot-scope="scope">
									<template v-if="scope.row.status == 0">
										<el-tag size="medium" type="warning">未审批</el-tag>
									</template>
									<template v-if="scope.row.status == 1">
										<el-tag size="medium" type="success">已通过</el-tag>
									</template>
									<template v-if="scope.row.status == 2">
										<template v-if="isAdmin && cooperationInfo && cooperationInfo.id != scope.row.coopera_id">
											<el-tag  size="medium" type="danger">已拒绝</el-tag>
										</template>
										<template v-else>
											<el-popover trigger="hover" placement="top" >
													<!-- <p>操作人: {{scope.row.worker_name}}</p> -->
													<p>拒绝原因: {{scope.row.note}}</p>
													<div slot="reference" class="name-wrapper">
														<el-tag style="cursor: pointer" size="medium" type="danger">已拒绝</el-tag>
													</div>
											</el-popover>
										</template>
									</template>
									<template v-if="scope.row.status == 3">
										<el-tag size="medium" type="info">审核中</el-tag>
									</template>
								</template>
							</el-table-column>
							<el-table-column prop="guarantee_amount" label="担保额度"  align="center">
								<template slot-scope="scope">
									<p>总额度:<span style="color:#409EFF">{{scope.row.guarantee_amount}}</span></p>
									<p>剩余额度:<span style="color:#67c23a">{{scope.row.guarantee_surplus}}</span></p>
								</template>
							</el-table-column>
							<!-- <el-table-column prop="guarantee_amount" label="担保额度"  align="center"></el-table-column> -->
							<el-table-column  label="积分余额"   align="center" >
								<template slot-scope="scope">
									<span>{{scope.row.score ? scope.row.score : 0}}</span>
								</template>
							</el-table-column>
							<el-table-column   prop="add_time" label="创建时间" width="160"  align="center" ></el-table-column>
							
							<template v-if="cooperationInfo && cooperationInfo.id == 151 && loginPostId == 2">
								<el-table-column  label="操作" fixed="right"  :width="(isOutClub && isLimitPrice) ? '280' : (isLimitPrice || isOutClub ? '200' : '90')" align="center">
									<template slot-scope="scope">
										<el-button plain size="small" @click="detail(scope.row)">编辑</el-button>
										<el-button v-if="scope.row.status == 1 && isLimitPrice" type="primary" plain size="small" @click="handleAssureBtn(scope.row)">担保额度</el-button>
										<el-button v-if="scope.row.status == 1 && isOutClub && scope.row.user_status == 1" type="danger" plain size="small" @click="handleOutAdd(scope.row)">{{scope.row.out_status == 1 ? '退社审核中' : (scope.row.out_status == 2 ? '已退社' : (scope.row.out_status == 3 ? '退社' : '退社'))}}</el-button>
									</template>
								</el-table-column>
							</template>
							<template v-else>
								<el-table-column  label="操作" fixed="right"  :width="selectName ? '90' : ((isOutClub && isLimitPrice) ? '280' : (isLimitPrice || isOutClub ? '200' : '90'))" align="center">
									<template slot-scope="scope">
										<template v-if="!selectName">
											<el-button plain size="small" @click="detail(scope.row)">{{isEdit ? (scope.row.status != 2 ? '查看' : '编辑') : '查看'}}</el-button>
											<el-button v-if="scope.row.status == 1 && isLimitPrice" type="primary" plain size="small" @click="handleAssureBtn(scope.row)">担保额度</el-button>
											<el-button v-if="scope.row.status == 1 && isOutClub && scope.row.user_status == 1" type="danger" plain size="small" @click="handleOutAdd(scope.row)">{{scope.row.out_status == 1 ? '退社审核中' : (scope.row.out_status == 2 ? '已退社' : (scope.row.out_status == 3 ? '退社' : '退社'))}}</el-button>
										</template>
										<template v-else>
											<el-button plain size="small" @click="detail(scope.row)">查看</el-button>
										</template>
									</template>
								</el-table-column>
							</template>
							
						</el-table>
						<el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
					</template>
					<template v-if="data && data.length > 0 && confrereAttr == 3">
						<el-table :data="data" border >
							<el-table-column prop="user_id" label="ID"  width="60px" align="center"></el-table-column>
							<el-table-column prop="short_name" label="组织名称"  width="150px" show-overflow-tooltip align="center"></el-table-column>
							<el-table-column prop="coopera_name" label="所属合作社" align="center"  v-if="selectName" width="200" show-overflow-tooltip></el-table-column>
							<el-table-column prop="address" label="组织地址" width="200px" align="center" show-overflow-tooltip></el-table-column>
							<el-table-column prop="license_num" label="社会信用代码"  width="130px" align="center"></el-table-column>
							<!-- <el-table-column prop="license_start" label="成立日期" width="100px" align="center"></el-table-column>
							<el-table-column prop="license_end" label="营业有效期" width="100px" align="center"></el-table-column> -->
							<el-table-column prop="name" label="法人姓名"  align="center"></el-table-column>
							<el-table-column prop="phone" label="法人手机号" width="120" align="center"></el-table-column>
							<el-table-column  label="审批状态" align="center" width="100">
								<template slot-scope="scope">
									<template v-if="scope.row.status == 0">
										<el-tag size="medium" type="warning">未审批</el-tag>
									</template>
									<template v-if="scope.row.status == 1">
										<el-tag size="medium" type="success">已通过</el-tag>
									</template>
									<template v-if="scope.row.status == 2">
										<template v-if="isAdmin && cooperationInfo && cooperationInfo.id != scope.row.coopera_id">
											<el-tag  size="medium" type="danger">已拒绝</el-tag>
										</template>
										<template v-else>
											<el-popover trigger="hover" placement="top" >
													<!-- <p>操作人: {{scope.row.worker_name}}</p> -->
													<p>拒绝原因: {{scope.row.note}}</p>
													<div slot="reference" class="name-wrapper">
														<el-tag style="cursor: pointer" size="medium" type="danger">已拒绝</el-tag>
													</div>
											</el-popover>
										</template>
									</template>
									<template v-if="scope.row.status == 3">
										<el-tag size="medium" type="info">审核中</el-tag>
									</template>
								</template>
							</el-table-column>
							<!-- <el-table-column prop="guarantee_amount" label="担保额度"  align="center"></el-table-column> -->
							<el-table-column prop="guarantee_amount" label="担保额度"  align="center">
								<template slot-scope="scope">
									<p>总额度:<span style="color:#409EFF">{{scope.row.guarantee_amount}}</span></p>
									<p>剩余额度:<span style="color:#67c23a">{{scope.row.guarantee_surplus}}</span></p>
								</template>
							</el-table-column>
							<el-table-column  label="积分余额"  prop="score" align="center" >
								<template slot-scope="scope">
									<span>{{scope.row.score ? scope.row.score : 0}}</span>
								</template>
							</el-table-column>
							<el-table-column   prop="add_time" label="创建时间" width="160"  align="center" ></el-table-column>
							<template v-if="cooperationInfo && cooperationInfo.id == 151 && loginPostId == 2">
								<el-table-column  label="操作" fixed="right"  :width="(isOutClub && isLimitPrice) ? '280' : (isLimitPrice || isOutClub ? '200' : '90')" align="center">
									<template slot-scope="scope">
										<el-button plain size="small" @click="detail(scope.row)">编辑</el-button>
										<el-button v-if="scope.row.status == 1 && isLimitPrice" type="primary" plain size="small" @click="handleAssureBtn(scope.row)">担保额度</el-button>
										<el-button v-if="scope.row.status == 1 && isOutClub && scope.row.user_status == 1" type="danger" plain size="small" @click="handleOutAdd(scope.row)">{{scope.row.out_status == 1 ? '退社审核中' : (scope.row.out_status == 2 ? '已退社' : (scope.row.out_status == 3 ? '退社' : '退社'))}}</el-button>
									</template>
								</el-table-column>
							</template>
							<template v-else>
								<el-table-column  label="操作" fixed="right"  :width="selectName ? '90' : ((isOutClub && isLimitPrice) ? '280' : (isLimitPrice || isOutClub ? '200' : '90'))" align="center">
									<template slot-scope="scope">
										<template v-if="!selectName">
											<el-button plain size="small" @click="detail(scope.row)">{{isEdit ? (scope.row.status != 2 ? '查看' : '编辑') : '查看'}}</el-button>
											<el-button v-if="scope.row.status == 1 && isLimitPrice" type="primary" plain size="small" @click="handleAssureBtn(scope.row)">担保额度</el-button>
											<el-button v-if="scope.row.status == 1 && isOutClub && scope.row.user_status == 1" type="danger" plain size="small" @click="handleOutAdd(scope.row)">{{scope.row.out_status == 1 ? '退社审核中' : (scope.row.out_status == 2 ? '已退社' : (scope.row.out_status == 3 ? '退社' : '退社'))}}</el-button>
										</template>
										<template v-else>
											<el-button plain size="small" @click="detail(scope.row)">查看</el-button>
										</template>
									</template>
								</el-table-column>
							</template>
						</el-table>
						<el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
					</template>
					<template v-if="!data || data.length == 0">
						<div class="no-data-con" >
							<div class="absolute-center">
								<div class="err-info-text ">暂无{{confrereAttr == 1 ? '自然人' : confrereAttr == 2 ? '机构' : '集体经济组织'}}列表</div>
							</div>
						</div>
					</template>
				</div>
			</el-tabs>
	   <template v-if="showViewer">
            <el-image-viewer :on-close="closeImgView"  :url-list="showViewImgs" />
        </template> 

		<!-- <el-dialog title="添加股金" :visible.sync="gujinDialog" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form ref="gujinForm" :model="gujinForm" :rules="gujinRules" label-width="100px">
				<el-form-item label="出资类型"  prop="zi_id" >
					<el-select v-model="gujinForm.zi_id" placeholder="请选择出资类型">
						<el-option :label="item.name" :value="item.id" v-for="(item,index) in ziOptions" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出资金额" >
					<el-input v-model="gujinForm.money" placeholder="请输入出资金额"></el-input>
				</el-form-item>
				<el-form-item label="股金类型" prop="guaran_id">
					<el-select v-model="gujinForm.guaran_id" placeholder="请选择股金类型">
						<el-option :label="item.name" :value="item.id" v-for="(item,index) in guaranOptions" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出资备注" >
					<el-input v-model="gujinForm.note" placeholder="请输入出资备注"></el-input>
				</el-form-item>
				<el-form-item label="相关资料图" class="assets-form-item" >
					<template  v-if="gujinForm.imgs && gujinForm.imgs.length > 0">
                        <div class="pic-item" v-for="(imgItem,imgIndex) in gujinForm.imgs" :key="imgIndex" >
                            <img @click="showImgView(imgItem.url)" class="pic" :src="imgItem.url" alt="">
                             <div v-if="imgItem.status && imgItem.status !='done'" style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;flex-direction:column">
                                <i style="color:#fff;font-size:1.5rem" :class="imgItem.status == 'uploading' ? 'el-icon-loading' : 'el-icon-circle-close'"></i>
                                <span style="color:#fff;font-size:1rem">{{imgItem.status == 'uploading' ? '上传中...' : '上传失败'}}</span>
                            </div>
                            <img v-if="imgItem.status && imgItem.status !='uploading'" @click.stop="delImgItem(imgIndex)" style="position:absolute; top:0;right:0;transform:translate(50%, -50%);width:20px;height:20px;cursor:pointer" src="/static/img/iframe-close.png" alt="">
                        </div>
                    </template>
                    <el-button style="float:left" plain type="primary" size="small" @click="scanUpload()" >扫描上传</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="gujinDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('gujinForm')" :loading="submitLoading">确 定</el-button>
			</div>
		</el-dialog> -->
		<div class="iframe-absolute-con" v-if="showAssetsIframe" @click="showAssetsIframe = false">
            <iframe @click.stop=""  class="scan-iframe3" id="assetsIframeId" src="./static/scanPrimaryPhoto.html?path=confrereListassets" frameborder="0"></iframe>
        </div>

		<my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
    </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import myDrawer from "../../components/drawer.vue";
export default {
  name: "confrereList",
  data() {
    return {
	  cooperationInfo: '', // 当前登录合作社信息
	  isAdmin: false, // 是否为管理员
	  adminType: '', // 管理员类型	
	  userName: '',
	  idCard: '',
	  lastSearch: '', // 上次搜索条件
	  dateArr: '',
	  confrereAttr: '1',
	  cooperaId: '', //合作社id
	  cooperativeList:[],
	  status: 4, // 审批状态
	   showViewer: false,
	  showViewImgs: [],
	  approvalOptions: [{  // 审批状态配置
		  label: '全部',
		  value: 4,
	  },{
		  label: '未审核',
		  value: 0,
	  },{
		  label: '已通过',
		  value: 1,
	  },{
		  label: '已拒绝',
		  value: 2,
	  },{
		  label: '审核中',
		  value: 3,
	  }],
	  data: [],
	  curPage: 1,
	  totalPage: null,
	  loading: false,

	  cooperaCls: '',
	  confrereTypeOptions: [{
            name: '全部',
            id: ''
        },{
            name: '基本成员',
            id: 1
        },{
            name: '核心成员',
            id: 2
        },{
            name: '联系成员',
            id: 3
        },{
            name: '特邀成员',
            id: 4
		}], //社员类型列表
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
		
		gujinDialog: false, // 添加股金dialog弹窗
	    curItem: {},
		curIndex: 0,
		gujinForm: {
			zi_id: '',
			money: '',
			guaran_id: '',
			note: '',
			imgs:[]

		}, // 股金form
		gujinRules: {
			zi_id: [
				{ required: true, message: '请选择出资类型', trigger: 'change' }
			],
			guaran_id: [
				{ required: true, message: '请选择股金类型', trigger: 'change' }
			],	
		},
		guaranOptions: [],
		ziOptions: [],
		submitLoading: false, // 提交股金loading
		excelLoading: false, // 导出excelloading

		showAssetsIframe: false, // 资产上传iframe

		isEdit: false, // 是否有编辑权限
		isLimitPrice: false, // 是否有担保额度权限
		isOutClub: false,// 是否有退社权限
		
		drawer: false,
		selectName: '',
		level2List: [],
		adminType: '',

		loginPostId: '', // 仅用于合作社id为151
    };
  },
  components: { ElImageViewer,myDrawer },
  created() {
	window.addEventListener("message",(event)=>{
		// 扫描资产上传
		if(event.data && event.data.path && event.data.path == 'confrereListassets') {
			if(event.data.type == 'data') {
				this.assetsBase64 = event.data.data
				this.assetsBase64Upload(event.data.data)
				this.showAssetsIframe = false	
			}
			if(event.data.type == 'close') {
				this.showAssetsIframe = false	
			}
		}
	},false)
  },
  activated() {
	this.initEventWatch()
	this.excelLoading = false
	this.loading = false
	let isRefresh = this.$route.query.isRefresh // 1不刷新 2或者undefined刷新
	if(isRefresh && isRefresh == 1) return
	this.cooperationInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''

	let tmpUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
	if (tmpUserInfo) {
		this.loginPostId = tmpUserInfo.post_id
	}
	this.loading = true
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
        } else {
			this.loading = false
        }
    })
	  
  },	
  methods: {
	// 初始化信息
	initData() {
		// const start = new Date();
		// const end = new Date();
		// start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		// this.dateArr = [start, end]
		this.selectName = '';
		this.level2List = []
		this.dateArr = ''
		this.userName = ''
		this.idCard = ''
		this.cooperaCls = ''
		this.status = 4
	    this.confrereAttr = '1'
		this.data = []
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
		let tmpUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
		if (tmpUserInfo) {
			this.loginPostId = tmpUserInfo.post_id
		}
		this.getUserList()
		this.handlePermission()
		this.getDicList(1) // 出资类型
		this.getDicList(2) // 股金类型
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
				this.getUserList()
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
			this.getUserList()
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
        this.getUserList()
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
	// 自然人资产base64上传到服务器
    assetsBase64Upload(base64) {
        let that = this
        that.gujinForm.imgs.push({status:'uploading',url: ''})
        let curUploadIndex = that.gujinForm.imgs.length - 1
        that.ajax('base64Upload',{
            file: base64
        },'图片上传服务器失败',res =>{
            if(res.errno == 0) {
                 that.gujinForm.imgs[curUploadIndex] ={status:'done',url: res.data}
            } else {
                that.gujinForm.imgs[curUploadIndex] ={status:'failed',url: ''}
            }
            that.$forceUpdate()
        },err =>{
            that.gujinForm.imgs[curUploadIndex] ={status:'failed',url: ''}
            that.$forceUpdate()
        })
    },
	// 扫描上传
	scanUpload() {
		this.showAssetsIframe = true
        setTimeout(() =>{
            document.getElementById('assetsIframeId').src='./static/scanPrimaryPhoto.html?path=confrereListassets';
        },500)
	},
	 // 删除自然人当前资产img
    delImgItem(index) {
        this.gujinForm.imgs.splice(index,1)
	},
	// 显示图片大图
    showImgView(url) {
        if(url) {
            this.showViewer = true
            this.showViewImgs = [url]
        }
	},
	// 显示图片数组
	showImgArrView(imgArr) {
		 if(imgArr && imgArr.length>=0) {
            this.showViewer = true
            this.showViewImgs = imgArr
        }
	},
	// 添加股金
	addGujin(row,index) {
		this.curItem = row
		this.curIndex = index
		this.gujinForm = {
			zi_id: '',
			money: '',
			guaran_id: '',
			note: '',
			imgs:[]
		}
		this.gujinDialog = true
		
		
	},
	// 获取股金类型 type   1-出资类型  2-股金类型
    getDicList(type) {
        let that = this
        that.ajax('dicList',{
            type: type
        },'获取股金类型失败',res =>{
            if(res.errno == 0) {
                if(type == 1) {
                    that.ziOptions = res.data
                } else if(type == 2) {
                    that.guaranOptions = res.data
                }
            }
        })
    },
	// 关闭显示大图
	closeImgView() {
		this.showViewer = false
		this.showViewImgs = []
	},
	// 切换自然人或者机构
	handleTabClick(tab) {
		this.curPage = 1;
		this.totalPage = null;
		this.data = [];
		this.getUserList()
	},
	// 查询
	search() {
		this.curPage = 1;
		this.totalPage = null;
		this.data = [];
		this.getUserList()
		return
		let searchText = this.userName+this.idCard+this.status
		if(this.isAdmin) {
			searchText+=this.cooperaId
		}
		if(this.lastSearch == searchText) { // 与上次输入搜索条件相同不走接口
			if(this.userName || this.idCard) {
				this.$message.error('请勿重复查询!')
			} else {
				this.$message.error('请输查询条件!')
				if(this.isAdmin) {
					document.getElementsByClassName("search-con")[0].querySelectorAll('input')[1].focus()
				} else {
					document.getElementsByClassName("search-con")[0].querySelectorAll('input')[0].focus()
				}
			}
		} else { // 与上次输入搜索条件不同
			if(this.userName || this.idCard) { // 如果之前没有条件查询过 至少要输入一个查询条件
				if(this.idCard) {
					let idCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if (!idCardreg.test(this.idCard)) {
						this.$message.error('请输入正确的身份证号')
						document.getElementsByClassName("search-con")[0].querySelectorAll('input')[1].focus()
						return
					}
				}
				this.curPage = 1;
				this.totalPage = null;
				this.data = [];
				this.getUserList()
			} else { // 未填写查询条件
				if(this.lastSearch) {  // 如果之前有条件查询过 可走接口查询全部
					this.curPage = 1;
					this.totalPage = null;
					this.data = [];
					this.getUserList()
				} else {
					this.$message.error('请至少输入一项查询条件!')
					document.getElementsByClassName("search-con")[0].querySelector('input').focus()
				}
			}
		}	
	},
	// 判断当前页面都有什么权限
	handlePermission() { 
		let that = this;
		that.utils.getPermissionList(that,data =>{
			data.forEach(item =>{
				if(item.title == '编辑') {
					that.isEdit = true
				}	
				if(item.title == '担保额度') {
					that.isLimitPrice = true
				}	
				if(item.title == '退社') {
					that.isOutClub = true
				}	
			})
		})
	},
	// 获取社员列表
	getUserList() {
		let that = this
		that.loading = true
		that.ajax('userList',{
			page: that.curPage,
			size: 10,
			name: that.userName,
            idcard: that.idCard,
			status: that.status,
			cls: that.confrereAttr,
			coopera_cls: that.cooperaCls,
			start_time: that.dateArr ? (that.utils.dateFormat('yyyy-MM-dd',that.dateArr[0]) + ' 00:00:00') : '',
			end_time: that.dateArr ? (that.utils.dateFormat('yyyy-MM-dd',that.dateArr[1]) +' 23:59:59') : '',
			coopera_id: that.cooperaId
		},'获取'+(that.confrereAttr == 1 ? '自然人' : (that.confrereAttr == 2 ? '机构' : '集体经济组织'))+'列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
				res.data.data.forEach(item =>{
					if(item.add_time) {
						item.add_time = that.utils.dateFormat('yyyy-MM-dd HH:mm:ss', new Date(parseInt(item.add_time)*1000))
					}
				})
				that.data = res.data.data
				that.curPage = Number(res.data.current_page)
				that.totalPage = res.data.total
				that.lastSearch = that.userName+that.idCard
				that.drawer = false
			}
		}, err =>{
			that.loading = false
		})
	},
	// 处理分页
	handleCurPageChange(val) {
		this.curPage = val;
		this.getUserList()
	},
	// 退社
	handleOutAdd(row) {
		let that = this;
		if(row.out_status == 1 && row.out_status == 1) return
		that.$prompt('确定申请退社吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
			inputPlaceholder: '请输入退社理由',
			type: 'warning',
			center: true
		}).then(({ value }) => {
			this.outAdd(value, row)
		}).catch(action =>{})
	},
	// 请求退社api
	outAdd(val,row) {
		let that = this
		that.ajax('outAdd',{
			user_id: row.user_id,
			note: val,
		},'设置失败',res =>{
			if(res.errno == 0) {
				this.$set(row,'out_status',1)
				this.$message.success('申请退社成功,请去退社列表查看审批状态')
			}
		})
	},
	// 设置担保额度btn
	handleAssureBtn(row) {
		let that = this;
		that.$prompt('请设置【'+row.name+'】的担保额度？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
			inputPattern: /^\d+$|^\d*\.\d+$/,
			inputPlaceholder: '请输入要设置的担保额度',
			inputErrorMessage: '请输入正确的金额',
			type: 'warning',
			center: true
		}).then(({ value }) => {
			this.setAssure(value, row)
		}).catch(action =>{})
	},
	// 请求设置担保额度api
	setAssure(val,row) {
		let that = this
		that.ajax('setAmount',{
			user_id: row.user_id,
			amount: val,
		},'设置失败',res =>{
			if(res.errno == 0) {
				row.guarantee_amount = val
				this.$message.success('设置成功')
			}
		})
	},
	//提交股金form
	submitForm(formName) {
		let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
			  that.submitLoading = true
			  let params = JSON.parse(JSON.stringify(that.gujinForm))
			  params.user_id = that.curItem.user_id
			  params.imgs = ''
			  if(that.gujinForm.imgs && that.gujinForm.imgs.length > 0) {
				  that.gujinForm.imgs.forEach((item,index) =>{
					  if(index == 0) {
						  params.imgs = item.url
					  } else {
						  params.imgs+= ','+item.url
					  }
				  })
			  }
              that.ajax('guaranteeAdd',params,'添加股金失败',res =>{
                that.submitLoading = false
                if(res.errno == 0) {
					that.ziOptions.forEach(item =>{
						if(item.id == params.zi_id) {
							params.zi_type = item.name
						}
					})
					that.guaranOptions.forEach(item =>{
						if(item.id == params.guaran_id) {
							params.gu_type = item.name
						}
					})
					params.zi_note = params.note
					params.imgs = params.imgs.split(',')
                    that.$message.success('添加成功')
					that.gujinDialog = false
					if(!that.data[that.curIndex].guarantee) {
						that.data[that.curIndex].guarantee = []
					}
					that.data[that.curIndex].guarantee.push(params)
                }
              }, err =>{
                   that.submitLoading = false
              })
          } else {
            setTimeout(()=>{
                let isError= document.getElementsByClassName("is-error");
                let firstErrInput = isError[0].querySelector('input')
				firstErrInput.focus();
            },100);
            return false;
          }
        });
	},
	// 查看详情
	detail(row) {
		if (this.cooperationInfo && this.cooperationInfo.id == 151 && this.loginPostId == 2) {
			this.$router.push({
				path: '/confrereDetail',
				query: {
					userId: row.user_id,
					path: '/confrereList',
					isEdit: true
				}
			})
			return
		}
		let isEdit = this.isEdit
		if(this.selectName) {
			isEdit = false
		} else {
			if(this.adminType == 3) {
				if(row.status != 2) {
					isEdit = false
				} else {
					if(this.cooperationInfo && this.cooperationInfo.id == row.coopera_id) {
						isEdit = this.isEdit
					} else {
						isEdit = false
					}
				}
				
			} else {
				if(row.status != 2) {
					isEdit = false
				} else {
					isEdit = this.isEdit
				}
			}
		}
		
		this.$router.push({
			path: '/confrereDetail',
			query: {
				userId: row.user_id,
				path: '/confrereList',
				isEdit: isEdit
			}
		})
	},
	// 导出excel
	importExcel() {
		let that = this;
		let startDate = that.dateArr ? (that.utils.dateFormat('yyyy-MM-dd',that.dateArr[0])) : ''
		let endDate = that.dateArr ? (that.utils.dateFormat('yyyy-MM-dd',that.dateArr[1])) : ''
		let statusText = ''
		if(that.status == 4) {
			statusText = '全部'
		} else if(that.status == 0){
			statusText = '未审核'
		} else if(that.status == 1){
			statusText = '已通过'
		} else if(that.status == 2){
			statusText = '已拒绝'
		} else if(that.status == 3){
			statusText = '审核中'
		}
		let cooperaClsText = ''
		if(that.cooperaCls == '') {
			cooperaClsText = '全部'
		} else if(that.cooperaCls == 1){
			cooperaClsText = '基本成员'
		} else if(that.cooperaCls == 2){
			cooperaClsText = '核心成员'
		} else if(that.cooperaCls == 3){
			cooperaClsText = '联系成员'
		} else if(that.cooperaCls == 4){
			cooperaClsText = '特邀成员'
		}
		let clsText = ''
		if(that.confrereAttr == 1) {
			clsText = '自然人'
		} else if(that.confrereAttr == 2) {
			clsText = '机构'
		} else if(that.confrereAttr == 3) {
			clsText = '集体经济组织'
		}
		let cooperaName = ''
		if(that.selectName) {
			if(that.selectName == '全部') {
				cooperaName = '全部合作社'
			} else {
				cooperaName = that.selectName
			}
		} else {
			cooperaName = that.cooperationInfo.name
		}
		that.$confirm('<p>合作社:【'+cooperaName+'】</p>'+ (startDate && endDate ? ('<p>日期范围:'+'【'+startDate +' 至 '+endDate+'】</p>') : '' +(that.userName ? '<p>社员名称:【'+that.userName+'】</p>' : '')+ (that.idCard ? '<p>身份证号:【'+that.idCard+'】</p>' : '')+(statusText ? '<p>审批状态:【'+statusText+'】</p>' : '')+(cooperaClsText ? '<p>社员类型:【'+cooperaClsText+'】</p>':'')+(clsText ? '<p>社员属性:【'+clsText+'】</p>' : '')), '确认导出参数', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			center: true,
			dangerouslyUseHTMLString: true
		}).then(() => {
			that.excelLoading = true
			that.ajax('exportUrl',{
				name: that.userName,
				idCard: that.idCard,
				status: that.status,
				cls: that.confrereAttr,
				coopera_cls: that.cooperaCls,
				start_time: that.dateArr ? (that.utils.dateFormat('yyyy-MM-dd',that.dateArr[0]) + ' 00:00:00') : '',
				end_time:  that.dateArr ? (that.utils.dateFormat('yyyy-MM-dd',that.dateArr[1]) +' 23:59:59') : '',
				coopera_id: that.cooperaId
			},'导出失败',res =>{
				if(res.errno == 0) {
					window.location.href = res.data
					setTimeout(() =>{
						that.$message.success('数据处理成功,正在打开保存窗口...')
						that.excelLoading = false
					},800)
				} else {
					that.excelLoading = false
				}
			}, err =>{
				that.excelLoading = false
			})
		}).catch(() => {});
		
	}

  }
};
</script>
<style lang="less">
.confrere-list {
  padding: 20px;
  p.title {
    display: flex;
    justify-content: space-between;
	align-items: center;
	font-weight: bold;
  }
  .operate-con {
	  padding: 10px 0;
    .search-con {
	  width: 100%;
	  .el-form-item {
		width: 25%;
		float: left;
		margin-bottom: 0;
		.el-form-item__label {
			font-size: 0.9rem;
		}
		.el-form-item__content {
			margin-right: 30px;
			.el-input {
			width: 90%;
			.read-idCard {
				color: #3B6AF1;
				background: #F0F8FF;
				font-size: 0.75rem;
				cursor: pointer;
			}
		}
		}
		.el-range-editor {
			width: 90%;
		}
		
	}
	.btn-form-item {
		.el-form-item__content {
			margin-left: 0!important;
		}
	}
	}
	.admin-search-con {
		 width: 85%;
		.el-form-item {
			width: 30%;
			.el-form-item__content {
				margin-right: 30px;
				.el-input {
				width: 80%;
				}
			}
			.el-range-editor {
				width: 100%;
			}
		}
		
	}
   
  }
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
	.table-con {
		.inner-table-tit-con {
			display: flex;
			align-content: center;
			justify-content: space-between;
			.inner-table-tit {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 1.2rem;
				padding-bottom: 1.25rem;
				text-align: center;
				.btn-con {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}	
        
        .inner-table {
            thead {
                tr th{
                    background: #f9f9f9!important;
                }
            }
        }
	}
	.assets-form-item {
		width: 100%;
		margin-bottom: 0;
		height: auto;
		.pic-item {
			position: relative;
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

	.el-dialog {
		.el-form {
			padding: 0 2rem;
			.el-form-item__content {
				.el-select {
					.el-input {
						width: 100%;
					}
				}
				.el-input {
					width: 40%;
				}
			}
		}
	}
	.scan-iframe {
        position: absolute;
        top:50%;
        left: 50%;
        width: 500px;
        height: 600px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .scan-iframe2 {
        position: absolute;
        top:50%;
        left: 50%;
        width: 500px;
        height: 410px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .scan-iframe3 {
        position: absolute;
        top:50%;
        left: 50%;
        width: 800px;
        height: 700px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .iframe-absolute-con {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
		background: rgba(0,0,0,0.6);
		z-index: 9999;
    }
}
</style>