<template>
    <div class="loan-withdraw">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>借款业务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">借款收回</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- <el-button size="small" @click="initData()">刷新</el-button> -->
        </div>
        <el-form ref="ruleForm" style="margin-top: 0.5rem" label-width="120px">
            <div class="loan-title">{{cooperationInfo.name ? cooperationInfo.name : '合作社'}}借款收回</div>
            <div class="loan-date">{{loanDate}}</div>
             <div class="form-item-con clearfix">
                 <el-form-item label="账号卡号:" style="width:37%">
                    <el-input v-model="bankNo" placeholder="请输入账号卡号" clearable @keyup.enter.native="inquireBankNo" >
                         <template #append>
                            <span class="read-idCard" @click="readBankNo()">读卡号</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" size="small" @click="inquireBankNo" :loading="searchLoading">查询</el-button>
             </div>
            <template v-if="isInquire">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">社员基本信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="身份证号码:">
                        <el-input v-model="userLoanInfo.idcard"  readonly></el-input>
                    </el-form-item>
                    <el-form-item label="社员姓名:">
                        <el-input v-model="userLoanInfo.name" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址:">
                        <el-input :value="userLoanInfo.address ? userLoanInfo.address : userLoanInfo.native_place" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码:">
                        <el-input v-model="userLoanInfo.phone" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">待还款列表</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-tabs  type="border-card" v-model="loanListType" @tab-click="changeTabs" v-loading="tabLoading" >
                        <el-tab-pane label="今日可还" name="1">
                            <span slot="label">
                            <el-tooltip class="item" effect="dark"  content="今日可还包含：已逾期贷款 + 今日应还贷款 + 近10日贷款" placement="top-start">
                                <i style="cursor:pointer" class="el-icon-warning" ></i>
                            </el-tooltip>
                            今日可还</span>
                        </el-tab-pane>
                        <el-tab-pane label="提前还款" name="2">
                            <span slot="label">
                            <el-tooltip class="item" effect="dark"  content="提前还款不支持一期一期提前还,必须一次结清当前这笔贷款" placement="top-start">
                                <i style="cursor:pointer" class="el-icon-warning" ></i>
                            </el-tooltip>
                            提前还款</span>
                        </el-tab-pane>
                         <div style="text-align:right;margin-bottom:10px">
                            <el-button size="small" @click="refreshTabList()">刷新</el-button>
                         </div>
                         <el-table v-if="loanListType == 1" :data="backList" border class="inner-table" header-row-class-name ="inner-table-header" >
                            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                            <el-table-column prop="loan_code" label="借款编号" align="center"></el-table-column>
                            <el-table-column  label="应还款金额" align="center">
                                <template slot-scope="scope">
                                    <span class="masker">{{scope.row.back_price}}</span>
                                        <el-tooltip v-if="scope.row.back_price_str" class="item" effect="dark"  :content="scope.row.back_price_str" placement="top-start">
                                            <i style="cursor:pointer" class="el-icon-warning" v-if="scope.row.back_price_str"></i>
                                        </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="借款金额" align="center"></el-table-column>
                            <!-- <el-table-column prop="overdue_rate" label="应还期数" align="center">
                                <template slot-scope="scope">
                                    第<span class="masker">{{scope.row.huan_yi}}</span>/{{scope.row.huan_all}}期
                                </template>
                            </el-table-column> -->
                            <el-table-column prop="product_name" label="借款产品" align="center">
                                <template slot-scope="scope">
                                   {{scope.row.product_name}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="loan_type_name" label="借款类型" align="center"></el-table-column>
                            <el-table-column prop="back_type" label="还款方式" align="center"></el-table-column>
                            <!-- <el-table-column prop="should_back_date" label="应还款日期" align="center"></el-table-column> -->
                            <el-table-column prop="loan_date" label="借款日期" align="center">
                                <template slot-scope="scope">
                                    <span class="masker">{{scope.row.loan_date}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="提示" align="center">
                                <template slot-scope="scope">
                                    需要还<span class="masker">{{scope.row.backList.length}}</span>笔
                                    <template v-if="scope.row.isyu > 0">
                                        , 其中有<span class="masker danger">{{scope.row.isyu}}</span>笔逾期
                                    </template>
                                    <template v-if="scope.row.isToday > 0">
                                        {{scope.row.isyu > 0 ? ',' : ',其中有'}}<span class="masker success">{{scope.row.isToday}}</span>笔今日应还
                                    </template>
                                    <template v-if="scope.row.isSoon > 0">
                                        {{(scope.row.isyu > 0 || scope.row.isToday) ? ',' : ',其中有'}} <span class="masker info">{{scope.row.isSoon}}</span>笔10日内可还
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" align="center"  width="200">
                                <template slot-scope="scope">
                                    <el-button  size="small" @click="showBackList(scope.row)">选择还款</el-button>
                                    <el-button type="primary" size="small" @click="confirmPay(1, scope.row)">全部还款</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <template v-if="loanListType == 1">
                            <el-pagination @current-change="handleTab1PageChange" v-if="tab1TotalPage && tab1TotalPage > 0" background :current-page="tab1Page" layout="prev, pager, next" :total="tab1TotalPage*10"> </el-pagination>
                        </template>
                        <!-- <template v-if="loanListType == 1">
                            <el-pagination @current-change="handleTab1PageChange" v-if="tab1TotalPage && tab1TotalPage > 0" background :current-page="tab1Page" layout="prev, pager, next" :total="tab1TotalPage*10"> </el-pagination>
                            <div class="form-item-con clearfix">
                                <p class="today-desc">共<span class="active">{{count}}条</span>待还业务,合计应还<span class="active">{{totalPrice}}元</span></p>
                                <el-form-item label="支付方式:" style="width:60%">
                                    <el-radio v-model="userLoanInfo.pay_type" label="1">社内账户</el-radio>
                                    <el-radio v-model="userLoanInfo.pay_type" label="2">现金</el-radio>
                                    <el-radio v-model="userLoanInfo.pay_type" label="3">微信</el-radio>
                                    <el-radio v-model="userLoanInfo.pay_type" label="4">支付宝</el-radio>
                                    <el-radio v-model="userLoanInfo.pay_type" label="5">银联</el-radio>
                                </el-form-item>
                            </div>
                            <div class="btn-con" v-if="isInquire">
                                <el-button type="primary" round @click="submitForm(1)" :loading="submitLoading">{{submitLoading ? '提交中...' : '还款'}}</el-button>
                            </div>
                        </template> -->
                         <el-table v-if="loanListType == 2" :data="backList2" border class="inner-table" header-row-class-name ="inner-table-header">
                            <el-table-column prop="loan_code" label="借款编号" align="center"></el-table-column>
                            <el-table-column  label="已还款金额" align="center">
                                <template slot-scope="scope">
                                    <span >{{scope.row.back_price}}
                                        <el-tooltip v-if="scope.row.back_price_str" class="item" effect="dark"  :content="scope.row.back_price_str" placement="top-start">
                                            <i style="cursor:pointer" class="el-icon-warning" v-if="scope.row.back_price_str"></i>
                                        </el-tooltip>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="借款金额" align="center"></el-table-column>
                            <el-table-column prop="overdue_rate" label="已还期数" align="center">
                                <template slot-scope="scope">
                                    已还<span class="masker">{{scope.row.huan_yi}}</span>/{{scope.row.huan_all}}期
                                </template>
                            </el-table-column>
                            <el-table-column prop="product_name" label="借款产品" align="center"></el-table-column>
                            <el-table-column prop="loan_type_name" label="借款类型" align="center"></el-table-column>
                            <el-table-column prop="back_type" label="还款方式" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.back_type}}
                                </template>
                            </el-table-column>
                            <el-table-column  label="上次还款日期" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.real_back_date ? scope.row.real_back_date : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="loan_date" label="借款日期" align="center">
                                <template slot-scope="scope">
                                    <span class="masker">{{scope.row.loan_date}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="提示" align="center">
                                <template slot-scope="scope">
                                    剩余应还<span class="masker">{{scope.row.should_num}}</span>笔
                                    <template v-if="scope.row.isyu > 0">
                                        , 其中有<span class="masker danger">{{scope.row.isyu}}</span>笔逾期
                                    </template>
                                    <template v-if="scope.row.isToday > 0">
                                        {{scope.row.isyu > 0 ? ',' : ',其中有'}}<span class="masker success">{{scope.row.isToday}}</span>笔今日应还
                                    </template>
                                    <template v-if="scope.row.isSoon > 0">
                                        {{(scope.row.isyu > 0 || scope.row.isToday) ? ',' : ',其中有'}}<span class="masker info">{{scope.row.isSoon}}</span>笔可提前还款
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" align="center" width="200">
                                <template slot-scope="scope">
                                    <el-button  size="small" @click="showBackList(scope.row)">查看分期记录</el-button>
                                    <el-button type="primary" size="small" @click="confirmPay(2, scope.row)" :loading="countLoading">{{countLoading ? '正在重算利息...' : '提前还款'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <template v-if="loanListType == 2">
                            <el-pagination @current-change="handleTab2PageChange" v-if="tab2TotalPage && tab2TotalPage > 0" background :current-page="tab2Page" layout="prev, pager, next" :total="tab2TotalPage*10"> </el-pagination>
                        </template>
                    </el-tabs>
                </div>
                <!-- <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">借款收回</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix"> -->
                    <!-- <el-form-item label="借款编号:" >
                        <el-input v-model="userLoanInfo.loan_code" readonly></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="借款类型:">
                        <el-input v-model="userLoanInfo.loan_type" readonly></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="担保类型名称:" v-if="userLoanInfo.guarantee_type_nam">
                        <el-input v-model="userLoanInfo.guarantee_type_name" readonly></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="借款利率:">
                        <el-input :value="userLoanInfo.loan_rate+'‰'" readonly></el-input>
                    </el-form-item> -->
                     <!-- <el-form-item label="逾期加罚利率:">
                        <el-input :value="userLoanInfo.overdue_rate+'‰'" readonly></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="还款方式:">
                        <el-input v-model="userLoanInfo.repayment_name" readonly></el-input>
                    </el-form-item> -->
                     <!-- <el-form-item label="起息日期:">
                        <el-input v-model="userLoanInfo.start_rate_date" readonly></el-input>
                    </el-form-item> -->
                     <!-- <el-form-item label="结算日期:">
                        <el-input v-model="userLoanInfo.end_date" readonly></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="计息天数:">
                        <el-input v-model="userLoanInfo.jie_tian" readonly></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="需偿还本金:">
                        <el-input v-model="userLoanInfo.back_principal" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="需要偿还的利息:">
                        <el-input v-model="userLoanInfo.back_interest" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="需偿还的罚息:">
                        <el-input v-model="userLoanInfo.back_principal" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="需要偿还的总钱数:">
                        <el-input v-model="userLoanInfo.all_repaid" readonly></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="支付方式:" style="width:60%">
                        <el-radio v-model="userLoanInfo.pay_type" label="1">社内账户</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="2">现金</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="3">微信</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="4">支付宝</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="5">银联</el-radio>
                    </el-form-item>
                </div> -->
            </template>
            <!-- <div class="btn-con" v-if="isInquire">
                <el-button type="primary" round @click="submitForm()" :loading="submitLoading">{{submitLoading ? '提交中...' : '还款'}}</el-button>
            </div> -->
        </el-form>
        <div class="iframe-absolute-con" v-if="showReadIc" @click="showReadIc = false">
            <iframe @click.stop=""  class="ic-iframe" id="readIcIframeId"  frameborder="0"></iframe>
        </div>
        <el-drawer :visible.sync="isShowBackList" :with-header="false" size="60%">
            <div class="drawer-tit-con" >
              <div class="tit">【{{curLoanDate}} 编号为 {{curLoanCode}}】的{{loanListType == 1 ? '应还记录' : '借款分期'}}列表</div>
              <div class="icon-con" @click="closeDrawer">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <div class="tabs-con" >
                <div class="table-scroll">
                    <template v-if="loanListType == 1">
                        <p class="rule-desc">还款顺序: 逾期订单 => 今日应还 => 近十日内可还</p>
                        <p class="rule-desc">提示: 必须<span class="masker danger">顺序选择</span>最近<span class="masker danger">一笔或者多笔订单</span>还款，若<span class="masker danger">不符合</span>还款规则，则<span class="masker danger">清空</span>所有已选择的订单</p>
                    </template>
                    <el-table  ref="multipleTable" :data="backDetailList" border class="inner-table"  @select="handleSelectionChange" @select-all="handleSelectAllChange" header-row-class-name ="inner-table-header">
                        <el-table-column type="selection" :selectable="selectable" width="55"></el-table-column>
                        <el-table-column  label="应还款金额" align="center">
                            <template slot-scope="scope">
                                <span >{{scope.row.back_price}}
                                    <el-tooltip v-if="scope.row.back_price_str" class="item" effect="dark"  :content="scope.row.back_price_str" placement="top-start">
                                        <i style="cursor:pointer" class="el-icon-warning" v-if="scope.row.back_price_str"></i>
                                    </el-tooltip>
                                </span>
                            </template>
                        </el-table-column>
                        <template v-if="loanListType == 2">
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
                        </template>
                        <el-table-column prop="price" label="借款金额" align="center"></el-table-column>
                        <el-table-column prop="overdue_rate" label="应还期数" align="center">
                            <template slot-scope="scope">
                                第<span class="masker">{{scope.row.huan_yi}}</span>/{{scope.row.huan_all}}期
                            </template>
                        </el-table-column>
                        <el-table-column prop="back_type" label="还款方式" align="center"></el-table-column>
                        <el-table-column prop="should_back_date" label="应该还款日期" align="center"></el-table-column>
                        <!-- <el-table-column prop="loan_date" label="借款日期" align="center">
                            <template slot-scope="scope">
                                <span class="masker">{{scope.row.loan_date}}</span>
                            </template>
                        </el-table-column> -->
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
                    <div class="checkbox-btn-group" v-if="loanListType == 1">
                        <div class="checkbox-btn-con">
                            <el-checkbox border size="small" :indeterminate="isAllIndeterminate" v-model="isCheckAll" @change="handleCheckAllChange(backDetailList)">全部</el-checkbox>
                            <el-checkbox border size="small" :indeterminate="isOverdueIndeterminate" v-model="isCheckOverdueAll" @change="handleCheckOverdueAllChange(overdueList)" :disabled="!(overdueList.length > 0)">仅逾期</el-checkbox>
                            <el-checkbox border size="small" :indeterminate="isTodayIndeterminate" v-model="isCheckTodayAll" @change="handleCheckTodayAllChange(todayList)" :disabled="!(overdueList.length > 0 || todayList.length > 0)">逾期+今日应还</el-checkbox>
                        </div>
                        <div class="desc">
                            已选择<span class="masker">{{multipleSelection.length}}</span>笔,需还<span class="masker danger">{{selectPayObj.back_price}}</span>元
                            <template v-if="selectPayObj.isyu > 0">
                                , 其中有<span class="masker danger">{{selectPayObj.isyu}}</span>笔逾期
                            </template>
                            <template v-if="selectPayObj.isToday > 0">
                                {{selectPayObj.isyu > 0 ? ',' : ',其中有'}} <span class="masker success">{{selectPayObj.isToday}}</span>笔今日应还
                            </template>
                            <template v-if="selectPayObj.isSoon > 0">
                                {{(selectPayObj.isyu > 0 || selectPayObj.isToday) ? ',' : ',其中有'}}<span class="masker info">{{selectPayObj.isSoon}}</span>笔10日内可还
                            </template>
                        </div>
                        <div class="submit-con">
                            <el-button type="primary" round @click="confirmPayBySelect">提交还款</el-button>
                        </div>
                    </div>
                </div>
            </div>
              <!-- <div class="drawer-footer" >
                <div class="btn-con">
                  <el-button   type="primary">关 闭</el-button>
                </div>
              </div> -->    
        </el-drawer>
        <el-drawer  :visible.sync="isShowDetail" :with-header="false"  size="40%">
            <div class="drawer-tit-con" >
              <div class="tit">【{{confirmRow.loan_date}} 编号为 {{confirmRow.loan_code}}】的借款信息</div>
              <div class="icon-con" @click="closePayDetail">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <el-form>
                <!-- <div class="yu-pre-pay">逾期2期</div> -->
                <div class="pre-form-con form-item-con clearfix">
                    <el-form-item label="原应还款金额:" style="width:100%">
                        <span>{{reCountObj.old_price}}(本金{{reCountObj.old_back_principal}}+利息{{reCountObj.old_back_interest}}{{reCountObj.old_overdue_rate ? ('+罚息'+reCountObj.old_overdue_rate) : ''}})</span>
                    </el-form-item>
                    <el-form-item label="现需还款金额:" style="width:100%">
                        <span>{{reCountObj.new_price}}(本金{{reCountObj.new_back_principal}}+利息{{reCountObj.new_back_interest}}{{reCountObj.new_overdue_rate ? ('+罚息'+reCountObj.new_overdue_rate) : ''}})</span>
                    </el-form-item>
                    <el-form-item label="提示:" style="width:100%">
                        <span>现在还款要比按期还款少付<span class="masker danger">{{reCountObj.difference}}</span></span>元
                    </el-form-item>
                    <el-form-item label="支付方式:" style="width:100%">
                        <el-radio v-model="userLoanInfo.pay_type" label="1">社内账户</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="2">现金</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="3">微信</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="4">支付宝</el-radio>
                        <el-radio v-model="userLoanInfo.pay_type" label="5">银联</el-radio>
                    </el-form-item>
                </div>
                <div style="text-align:center">
                    <el-button type="primary" round @click="submitForm(2)" :loading="submitLoading">{{submitLoading ? '提交中...' : '确认还款'}}</el-button>
                </div>
           </el-form>
        </el-drawer>

        <el-dialog :title="'结清编号为【'+confirmRow.loan_code+'】的可还订单'" :visible.sync="dialogByPayType" width="40%" >
            <div class="dialog-item">
                <span class="tit">应还金额{{confirmRow.back_price}}</span>
            </div>
            <div class="dialog-item">
                共还<span class="masker">{{confirmRow && confirmRow.backList && confirmRow.backList.length}}</span>笔
                <template v-if="confirmRow.isyu > 0">
                    , 其中有<span class="masker danger">{{confirmRow.isyu}}</span>笔逾期
                </template>
                <template v-if="confirmRow.isToday > 0">
                    {{confirmRow.isyu > 0 ? ',' : ',其中有'}} <span class="masker success">{{confirmRow.isToday}}</span>笔今日应还
                </template>
                <template v-if="confirmRow.isSoon > 0">
                    {{(confirmRow.isyu > 0 || confirmRow.isToday) ? ',' : ',其中有'}} <span class="masker info">{{confirmRow.isSoon}}</span>笔10日内可还
                </template>
            </div>
            <div class="radio-con">
                <div class="label-con">支付方式:</div>
                <div class="choose-con">
                    <el-radio v-model="userLoanInfo.pay_type" label="1">社内账户</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="2">现金</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="3">微信</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="4">支付宝</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="5">银联</el-radio>
                </div>
            </div> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogByPayType = false">取 消</el-button>
                <el-button type="primary" @click="submitForm(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择还款" :visible.sync="dialogBySelectPay" width="40%" >
            <div class="dialog-item">
                <span class="tit">应还金额{{selectPayObj.back_price}}</span>
            </div>
            <div class="dialog-item">
                共选择了<span class="masker">{{multipleSelection.length}}</span>笔
                <template v-if="selectPayObj.isyu > 0">
                    , 其中有<span class="masker danger">{{selectPayObj.isyu}}</span>笔逾期
                </template>
                <template v-if="selectPayObj.isToday > 0">
                    {{selectPayObj.isyu > 0 ? ',' : ',其中有'}} <span class="masker success">{{selectPayObj.isToday}}</span>笔今日应还
                </template>
                <template v-if="selectPayObj.isSoon > 0">
                    {{(selectPayObj.isyu > 0 || selectPayObj.isToday) ? ',' : ',其中有'}} <span class="masker info">{{selectPayObj.isSoon}}</span>笔10日内可还
                </template>
            </div>
            <div class="radio-con">
                <div class="label-con">支付方式:</div>
                <div class="choose-con">
                    <el-radio v-model="userLoanInfo.pay_type" label="1">社内账户</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="2">现金</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="3">微信</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="4">支付宝</el-radio>
                    <el-radio v-model="userLoanInfo.pay_type" label="5">银联</el-radio>
                </div>
            </div> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogBySelectPay = false">取 消</el-button>
                <el-button type="primary" @click="submitPayBySelect()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "loanWithdraw",
  data() {
    return {
      cooperationInfo: {},
	  bankNo: '',
      lastBankNo: '',
      isInquire: false,
      loanDate: '',  // 借款日期
      searchLoading: false,
      submitLoading: false,

      showReadIc: false, // 读取卡号弹窗
      icUuid: '', // IC卡芯片卡号
      
      userLoanInfo: {},
      loanListType: '1',
      backList: [],
      backList2: [],
      backDetailList: [],
      multipleSelection: [],
      isShowBackList: false,
      curLoanUser: '',
      curLoanDate: '',
      curLoanCode: '',
      isShowDetail: false,
      totalPrice: 0,
      count: 0,
      tabLoading: false,
      tab1Page: 1,
      tab1TotalPage: null,
      tab2Page: 1,
      tab2TotalPage: null,
      dialogByPayType: false,
      confirmRow: '',
      countLoading: false,
      reCountObj: '',
      todayList: [],
      overdueList: [],
      soonList: [],
      isAllIndeterminate: false,
      isCheckAll: false,
      isOverdueIndeterminate: false,
      isCheckOverdueAll: false,
      isTodayIndeterminate: false,
      isCheckTodayAll: false,
      dialogBySelectPay: false,
      selectPayObj: ''
    };
  },
  activated() {
    this.utils.checkToken(this,res =>{
        if(res && res.errno == 0) {
           this.initData()
        } else {
        }
    })
  },
  created() {
    window.addEventListener("message",(event)=>{
        if(event.data && event.data.path && event.data.path == 'loanWithdrawReadIc') {
            if(event.data.type == 'data') {
                this.icUuid = event.data.data
                this.getBankNo()
                this.showReadIc = false	
            }
            if(event.data.type == 'close') {
                this.showReadIc = false	
            }
        }
    }, false)
  },	
  methods: {
    // 是否可以多选
    selectable () {
        return this.loanListType == 1
    },
    // 选择全部
    handleCheckAllChange(rows) {
        if (rows) {
            // this.$refs.multipleTable.clearSelection()
            rows.forEach(row => {
                this.$refs.multipleTable.toggleAllSelection();
            });
            // console.log(this.isCheckAll)
            if(!this.isCheckAll) {
                this.changeCheckType(this.backDetailList,this.overdueList,this.todayList)
            } else {
                this.changeCheckType([],[],[])
            }
        }
    },
    // 选择全部逾期
    handleCheckOverdueAllChange(rows) {
        if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row,this.isCheckOverdueAll)
            });
            let tmpArr = []
            let tmpMulTodayList = []
            let tmpMulSoonList = []
            let tmpMulOverdueList = []
            if (this.isCheckOverdueAll == true) {
                this.isOverdueIndeterminate = false
                tmpArr = this.multipleSelection.concat(rows)
                tmpArr = this.utils.delObjByParam(tmpArr,'back_code')
            } else {
                let curArr = JSON.parse(JSON.stringify(this.multipleSelection))
                curArr.forEach((item, index) =>{
                    item.del = 0
                    rows.forEach(subItem =>{
                        if (item.back_code == subItem.back_code) {
                            item.del = 1
                        }
                    })
                    if (item.del == 0) {
                       tmpArr.push(item) 
                    }
                })
            }
            tmpArr.forEach(item =>{
                if (item.orderType == 'today') {
                    tmpMulTodayList.push(item)
                } else if (item.orderType == 'soon') {
                    tmpMulSoonList.push(item)
                } else if (item.orderType == 'overdue') {
                    tmpMulOverdueList.push(item)
                }
            })
            if (tmpMulTodayList.length > 0 || tmpMulSoonList.length > 0) {
                this.$refs.multipleTable.clearSelection()
                this.$message.warning('还款订单选择顺序错乱,已重置')
                tmpArr = []
                tmpMulOverdueList = []
                tmpMulTodayList = []
            }
            this.changeCheckType(tmpArr,tmpMulOverdueList,tmpMulTodayList)
        }
    },
    // 选择今日应还
    handleCheckTodayAllChange(rows) {
        if (rows) {
            rows = rows.concat(this.overdueList)
            let tmpArr = []
            let tmpMulTodayList = []
            let tmpMulSoonList = []
            let tmpMulOverdueList = []
            // this.multipleSelection.forEach(item =>{
            //     if(item.orderType == 'overdue') {
            //         tmpMulOverdueList.push(item)
            //     }
            // })
            // if (this.overdueList.length === 0 || (this.overdueList.length  > 0 && this.overdueList.length === tmpMulOverdueList.length)) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row,this.isCheckTodayAll)
                });
            //     tmpMulOverdueList = []
            // } else {
                // this.$message('请先选择逾期订单')
                // tmpArr = this.multipleSelection
                // tmpArr.forEach(item =>{
                //     if (item.orderType == 'today') {
                //         tmpMulTodayList.push(item)
                //     } else if (item.orderType == 'soon') {
                //         tmpMulSoonList.push(item)
                //     } else if (item.orderType == 'overdue') {
                //         tmpMulOverdueList.push(item)
                //     }
                // })
                // this.isCheckTodayAll = false
                // this.isTodayIndeterminate = false
                // this.changeCheckType(tmpArr,tmpMulOverdueList,tmpMulTodayList)
                // return
            // }
            if (this.isCheckTodayAll == true) {
                this.isTodayIndeterminate = false
                tmpArr = this.multipleSelection.concat(rows)
                tmpArr = this.utils.delObjByParam(tmpArr,'back_code')
            } else {
                let curArr = JSON.parse(JSON.stringify(this.multipleSelection))
                curArr.forEach((item, index) =>{
                    item.del = 0
                    rows.forEach(subItem =>{
                        if (item.back_code == subItem.back_code) {
                            item.del = 1
                        }
                    })
                    if (item.del == 0) {
                       tmpArr.push(item) 
                    }
                })
            }
            tmpArr.forEach(item =>{
                if (item.orderType == 'today') {
                    tmpMulTodayList.push(item)
                } else if (item.orderType == 'soon') {
                    tmpMulSoonList.push(item)
                } else if (item.orderType == 'overdue') {
                    tmpMulOverdueList.push(item)
                }
            })
            if (tmpMulSoonList.length > 0) {
                this.$refs.multipleTable.clearSelection()
                this.$message.warning('还款订单选择顺序错乱,已重置')
                tmpArr = []
                tmpMulOverdueList = []
                tmpMulTodayList = []
            }
            this.changeCheckType(tmpArr,tmpMulOverdueList,tmpMulTodayList)
        }
    },
    // 表格-点击选择每一行
    handleSelectionChange(val,row) {
        let tmpTodayList = []
        let tmpOverdueList = []
        let tmpSoonList = []
        let tmpMulTodayList = []
        let tmpMulOverdueList = []
        let tmpMulSoonList = []
        let shouldSelectList = []
        let selectType = 1 // 1-选中 2-取消
        val = val.sort(this.utils.sortBy('curIndex'))
        val.forEach(item =>{
            if (item.orderType == 'today') {
                tmpTodayList.push(item)
            } else if (item.orderType == 'soon') {
                tmpSoonList.push(item)
            } else if (item.orderType == 'overdue') {
                tmpOverdueList.push(item)
            }
        })
        if (this.multipleSelection && this.multipleSelection.length > 0) {
            this.multipleSelection.forEach(item => {
                if (row.back_code == item.back_code) {
                    selectType = 2
                }
                if (item.orderType == 'today') {
                    tmpMulTodayList.push(item)
                } else if (item.orderType == 'soon') {
                    tmpMulSoonList.push(item)
                } else if (item.orderType == 'overdue') {
                    tmpMulOverdueList.push(item)
                }
            })
        }
        if (selectType == 1) {
            if (row.curIndex > 0) {
                if (this.multipleSelection.length === 0) {
                    this.$message.warning('请按顺序选择还款订单')
                    this.$refs.multipleTable.clearSelection()
                    val = []
                    tmpTodayList = []
                    tmpSoonList = []
                    tmpOverdueList = []
                    this.changeCheckType(val,tmpOverdueList,tmpTodayList)
                    return
                }
                for(let i = 0; i <= row.curIndex; i++) {
                    shouldSelectList.push(this.backDetailList[i])
                }
                if (JSON.stringify(shouldSelectList) == JSON.stringify(val)) {

                } else {
                    if (row.orderType == 'overdue') {
                        if (row.back_code != this.backDetailList[this.multipleSelection.length].back_code) {
                            this.$message.warning('请按顺序选择要还款的逾期订单')
                            val = this.multipleSelection
                            tmpTodayList = tmpMulTodayList
                            tmpSoonList = tmpMulSoonList
                            tmpOverdueList = tmpMulOverdueList
                            this.changeCheckType(val,tmpOverdueList,tmpTodayList)
                            this.$refs.multipleTable.clearSelection()
                            this.multipleSelection.forEach(item => {
                                this.$refs.multipleTable.toggleRowSelection(item, true);
                            })
                            return
                        }
                    } else if (row.orderType == 'today') {
                        // if (this.overdueList.length > 0) {
                        //     if (tmpOverdueList.length != this.overdueList.length) {
                        //         this.$message.error('请先勾选逾期订单')
                        //         val = this.multipleSelection
                        //         tmpTodayList = tmpMulTodayList
                        //         tmpSoonList = tmpMulSoonList
                        //         tmpOverdueList = tmpMulOverdueList
                        //         this.changeCheckType(val,tmpOverdueList,tmpTodayList)
                        //         this.$refs.multipleTable.clearSelection()
                        //         this.multipleSelection.forEach(item => {
                        //             this.$refs.multipleTable.toggleRowSelection(item, true);
                        //         })
                        //         return
                        //     }
                        // }
                        if (row.back_code != this.backDetailList[this.multipleSelection.length].back_code) {
                            this.$message.warning('请按顺序选择今日要还款的订单')
                            val = this.multipleSelection
                            tmpTodayList = tmpMulTodayList
                            tmpSoonList = tmpMulSoonList
                            tmpOverdueList = tmpMulOverdueList
                            this.changeCheckType(val,tmpOverdueList,tmpTodayList)
                            this.$refs.multipleTable.clearSelection()
                            this.multipleSelection.forEach(item => {
                                this.$refs.multipleTable.toggleRowSelection(item, true);
                            })
                            return
                        }
                    } else if (row.orderType == 'soon') {
                        if (this.overdueList.length > 0) {
                            if (tmpOverdueList.length != this.overdueList.length) {
                                this.$message.warning('请先勾选逾期订单')
                                val = this.multipleSelection
                                tmpTodayList = tmpMulTodayList
                                tmpSoonList = tmpMulSoonList
                                tmpOverdueList = tmpMulOverdueList
                                this.changeCheckType(val,tmpOverdueList,tmpTodayList)
                                this.$refs.multipleTable.clearSelection()
                                this.multipleSelection.forEach(item => {
                                    this.$refs.multipleTable.toggleRowSelection(item, true);
                                })
                                return
                            }
                        }
                        if (this.todayList.length > 0) {
                            if (tmpTodayList.length != this.todayList.length) {
                                this.$message.warning('请先勾选今日应还订单')
                                val = this.multipleSelection
                                tmpTodayList = tmpMulTodayList
                                tmpSoonList = tmpMulSoonList
                                tmpOverdueList = tmpMulOverdueList
                                this.changeCheckType(val,tmpOverdueList,tmpTodayList)
                                this.$refs.multipleTable.clearSelection()
                                this.multipleSelection.forEach(item => {
                                    this.$refs.multipleTable.toggleRowSelection(item, true);
                                })
                                return
                            }
                        }
                        if (row.back_code != this.backDetailList[this.multipleSelection.length].back_code) {
                            this.$message.warning('请按顺序选择近日要还款的订单')
                            val = this.multipleSelection
                            tmpTodayList = tmpMulTodayList
                            tmpSoonList = tmpMulSoonList
                            tmpOverdueList = tmpMulOverdueList
                            this.changeCheckType(val,tmpOverdueList,tmpTodayList)
                            this.$refs.multipleTable.clearSelection()
                            this.multipleSelection.forEach(item => {
                                this.$refs.multipleTable.toggleRowSelection(item, true);
                            })
                            return
                        }
                    }
                    return   
                }
            }
        } else {
            if (this.multipleSelection[this.multipleSelection.length - 1].back_code == row.back_code) {
                // this.$message.info('正常取消')
            } else {
                val = []
                tmpOverdueList = []
                tmpTodayList = []
                tmpSoonList = []
                this.$refs.multipleTable.clearSelection()
                this.$message.warning('还款订单选择顺序错乱,已重置')
            }
        }
        this.changeCheckType(val,tmpOverdueList,tmpTodayList)
    },
    // 改变底部按钮状态
    changeCheckType (val, tmpOverdueList, tmpTodayList) {
        if (val.length === this.backDetailList.length) {
            this.isCheckAll = true
            this.isAllIndeterminate = false
            if (this.overdueList.length > 0) {
                this.isOverdueIndeterminate = false
                this.isCheckOverdueAll = true
            }
            if (this.todayList.length > 0 || this.overdueList.length > 0) {
                this.isTodayIndeterminate = false
                this.isCheckTodayAll = true
            }
        } else {
            this.isCheckAll = false
            this.isAllIndeterminate = true
            if (val.length === 0) {
                this.isCheckAll = false
                this.isAllIndeterminate = false
                this.isOverdueIndeterminate = false
                this.isCheckOverdueAll = false
                this.isTodayIndeterminate = false
                this.isCheckTodayAll = false
            } else {
                if (this.overdueList.length > 0) {
                    if (tmpOverdueList.length === this.overdueList.length) {
                        this.isOverdueIndeterminate = false
                        this.isCheckOverdueAll = true
                    } else {
                        if (tmpOverdueList.length > 0) {
                            this.isOverdueIndeterminate = true
                            this.isCheckOverdueAll = false
                        } else {
                            this.isOverdueIndeterminate = false
                            this.isCheckOverdueAll = false
                        }
                    }
                    if (this.todayList.length > 0) {
                        if (tmpTodayList.length === this.todayList.length && tmpOverdueList.length === this.overdueList.length) {
                            this.isTodayIndeterminate = false
                            this.isCheckTodayAll = true
                        } else {
                            if (tmpTodayList.length > 0 || tmpOverdueList.length > 0) {
                                this.isTodayIndeterminate = true
                                this.isCheckTodayAll = false
                            } else {
                                this.isTodayIndeterminate = false
                                this.isCheckTodayAll = false
                            }
                        }
                    } else {
                        this.isTodayIndeterminate = false
                        this.isCheckTodayAll = false      
                    }
                } else {
                    this.isOverdueIndeterminate = false
                    this.isCheckOverdueAll = false
                    
                    if (this.todayList.length > 0) {
                        if (tmpTodayList.length === this.todayList.length) {
                            this.isTodayIndeterminate = false
                            this.isCheckTodayAll = true
                        } else {
                            if (tmpTodayList.length > 0) {
                                this.isTodayIndeterminate = true
                                this.isCheckTodayAll = false
                            } else {
                                this.isTodayIndeterminate = false
                                this.isCheckTodayAll = false
                            }
                        }
                    } else {
                        this.isTodayIndeterminate = false
                        this.isCheckTodayAll = false      
                    }
                }

                
            }
        }
        this.multipleSelection = val
        let tmpObj = {
            back_price: 0,
            isyu: 0,
            isToday: 0,
            isSoon: 0,
            back_code: ''
          }
        this.multipleSelection.forEach((item, index) =>{
            tmpObj.back_price += Number(item.back_price)*1000
            if (item.orderType == 'overdue') {
                tmpObj.isyu+=1
            }
            if (item.orderType == 'today') {
                tmpObj.isToday+=1
            }
            if (item.orderType == 'soon') {
                tmpObj.isSoon+=1
            }
            if (index == 0) {
                tmpObj.back_code = item.back_code
            } else {
                tmpObj.back_code+=(','+item.back_code)
            }
        })
        tmpObj.back_price = tmpObj.back_price/1000
        this.selectPayObj = tmpObj
    },
    // 表格-点击全选
    handleSelectAllChange (rows) {
        if(!this.isCheckAll) {
            this.changeCheckType(this.backDetailList,this.overdueList,this.todayList)
        } else {
            this.changeCheckType([],[],[])
        }
        
        // if (this.multipleSelection.length === this.backDetailList.length) {
        //     this.isCheckAll = true
        //     this.isAllIndeterminate = false
        //     if (this.overdueList.length > 0) {
        //         this.isOverdueIndeterminate = false
        //         this.isCheckOverdueAll = true
        //     }
        //     if (this.todayList.length > 0) {
        //         this.isTodayIndeterminate = false
        //         this.isCheckTodayAll = true
        //     }
        // } else {
        //     this.isCheckAll = false
        //     this.isAllIndeterminate = false
        //     this.isOverdueIndeterminate = false
        //     this.isCheckOverdueAll = false
        //     this.isTodayIndeterminate = false
        //     this.isCheckTodayAll = false
        // }
    },
    // 初始化信息
    initData() {
        this.dialogByPayType = false
        this.dialogBySelectPay = false
        this.selectPayObj = ''
        this.countLoading = false
        this.lastBankNo = ''
        this.bankNo = ''
        this.isInquire = false
        this.totalPrice = 0
        this.count = 0
        this.confirmRow = ''
        this.backList = []
        this.backList2 = []
        this.isShowDetail = false
        this.backDetailList = []
        this.curLoanUser = ''
        this.curLoanDate = ''
        this.curLoanCode = ''
        this.loanListType = '1'
        this.tabLoading = false
        this.tab1Page = 1
        this.tab1TotalPage = null
        this.tab2Page = 1
        this.tab2TotalPage = null
        this.cooperationInfo = JSON.parse(localStorage.getItem('cooperationInfo'))
        this.loanDate = this.utils.dateFormat('yyyy年MM月dd日')
        this.todayList = []
        this.overdueList = []
        this.soonList = []
        this.isAllIndeterminate = false
        this.isCheckAll = false
        this.isOverdueIndeterminate = false
        this.isCheckOverdueAll = false
        this.isTodayIndeterminate = false
        this.isCheckTodayAll = false
        this.isShowBackList = false
    },
    refreshTabList (isAll) {
        if (isAll) {
            this.tab1Page = 1
            this.tab1TotalPage = null
            this.tab2Page = 1
            this.tab2TotalPage = null
            this.todayLoanList()
            this.advanceLoanList()
        } else {
            if (this.loanListType == 1) {
                this.tab1Page = 1
                this.tab1TotalPage = null
                this.todayLoanList()
            } else {
                this.tab2Page = 1
                this.tab2TotalPage = null
                this.advanceLoanList()
            }
        }
    },
       // 读卡号
      readBankNo() {
        this.showReadIc = true
        this.bankNo = ''
        setTimeout(() =>{
            document.getElementById('readIcIframeId').src='./static/autoGetCardSN.html?path=loanWithdrawReadIc';
        },100)
      },
      // 根据IC芯片卡号获取卡号
    getBankNo() {
        let that = this;
        that.ajax('searchICCard',{
            uuid:that.icUuid
        },'获取卡号失败',res => {
            if (res.errno == 0) {
                that.bankNo = res.data.card;
                that.inquireBankNo()
            } else {
                that.lastBankNo = ''
                that.isInquire =  false
            }
        });
    },
    // 今日待还列表
    todayLoanList () {
        let that = this;
        that.tabLoading = true
        that.ajax('todayLoan',{
            page: that.tab1Page,
			size: 10,
			card: that.bankNo,
		},'',res =>{
            that.tabLoading = false
			if(res.errno == 0) {
                let tmpArr = []
                if (res.data && res.data.data && res.data.data.length > 0) {
                    res.data.data.forEach(item =>{
                        let tmpObj = {
                            back_price: 0,
                            price: item.loan_money,
                            huan_all: item.huan_all,
                            huan_yi: item.huan_yi,
                            product_name: item.product_name,
                            loan_type_name: item.loan_type_name,
                            back_type: item.repayment_name,
                            should_back_date: that.utils.dateFormat('yyyy-MM-dd', new Date(item.should_back_date)),
                            loan_date: item.loan_date,
                            real_back_date: item.real_back_date,
                            backList: [],
                            isyu: 0,
                            isToday: 0,
                            isSoon: 0,
                            loan_code: item.loan_code,
                            user_id: item.user_id
                        }
                        item.backlist.forEach((subItem,subIndex) => {
                            let tmpPriceStr = '本金('+subItem.back_principal+') '
                            if (Number(subItem.back_interest)) {
                                tmpPriceStr+='+ 利息('+subItem.back_interest+') '
                            }
                            if (Number(subItem.overdue_rate)) {
                                tmpPriceStr+= '+ 罚息('+subItem.overdue_rate+')'
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
                                    subItem.orderType = 'today'
                                    tmpObj.isToday+=1
                                } else if (days > 0) {
                                    realBackStatus = 1
                                    tmpNote = '距离还款日还有' + days +'天'
                                    subItem.orderType = 'soon'
                                    tmpObj.isSoon+=1
                                } else {
                                    realBackStatus = 3
                                    tmpNote = '已经逾期' + (-days) + '天'
                                    tmpObj.isyu+=1
                                    subItem.orderType = 'overdue'
                                }
                            }
                            subItem.curIndex = subIndex
                            
                            let tmpSubObj = {
                                back_price: (Number(subItem.back_principal)*1000 + Number(subItem.back_interest)*1000 + Number(subItem.overdue_rate)*1000)/1000,
                                back_price_str: tmpPriceStr,
                                price: item.loan_money,
                                back_type: item.repayment_name,
                                should_back_date: that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.should_back_date)),
                                real_back_date: subItem.real_back_date,
                                loan_date: item.loan_date,
                                note: tmpNote,
                                huan_all: subItem.all,
                                huan_yi: subItem.num,
                                status: subItem.status,
                                realBackStatus: realBackStatus,
                                back_code: subItem.back_code,
                                orderType: subItem.orderType,
                                curIndex: subItem.curIndex
                            }
                            tmpObj.backList.push(tmpSubObj)
                            tmpObj.back_price += tmpSubObj.back_price*1000
                        })
//                         tmpObj.backList = [
//     {
//         "back_price":1083.96
//  ,
//         "back_price_str":"本金(804.34) + 利息(84.15) + 罚息(195.47)",
//         "price":"10000.00",
//         "back_type":"每月等额",
//         "should_back_date":"2021-05-16",
//         "real_back_date":"",
//         "loan_date":"2021-05-13 16:04:38",
//         "note":"已经逾期11天",
//         "huan_all":14,
//         "huan_yi":5,
//         "status":0,
//         "realBackStatus":3,
//         "back_code":"BA609cde21d83ce",
//         "orderType":"overdue",
//         "curIndex":0
//     },
//     {
//         "back_price":1066.19,
//         "back_price_str":"本金(812.38) + 利息(76.11) + 罚息(177.70)",
//         "price":"10000.00",
//         "back_type":"每月等额",
//         "should_back_date":"2021-05-17",
//         "real_back_date":"",
//         "loan_date":"2021-05-13 16:04:38",
//         "note":"已经逾期10天",
//         "huan_all":14,
//         "huan_yi":6,
//         "status":0,
//         "realBackStatus":3,
//         "back_code":"BA609cde21dae37",
//         "orderType":"overdue",
//         "curIndex":1
//     },
//     {
//         "back_price":1066.19,
//         "back_price_str":"本金(812.38) + 利息(76.11) + 罚息(177.70)",
//         "price":"10000.00",
//         "back_type":"每月等额",
//         "should_back_date":"2021-05-17",
//         "real_back_date":"",
//         "loan_date":"2021-05-13 16:04:38",
//         "note":"今日应还",
//         "huan_all":14,
//         "huan_yi":6,
//         "status":0,
//         "realBackStatus":5,
//         "back_code":"BA609cde21dae375",
//         "orderType":"today",
//         "curIndex":2
//     },
//     {
//         "back_price":1066.19,
//         "back_price_str":"本金(812.38) + 利息(76.11) + 罚息(177.70)",
//         "price":"10000.00",
//         "back_type":"每月等额",
//         "should_back_date":"2021-05-17",
//         "real_back_date":"",
//         "loan_date":"2021-05-13 16:04:38",
//         "note":"距离还款期3日",
//         "huan_all":14,
//         "huan_yi":6,
//         "status":0,
//         "realBackStatus":1,
//         "back_code":"BA609cde21dae378",
//         "orderType":"soon",
//         "curIndex":3
//     },
//     {
//         "back_price":1066.19,
//         "back_price_str":"本金(812.38) + 利息(76.11) + 罚息(177.70)",
//         "price":"10000.00",
//         "back_type":"每月等额",
//         "should_back_date":"2021-05-17",
//         "real_back_date":"",
//         "loan_date":"2021-05-13 16:04:38",
//         "note":"距离还款日5日",
//         "huan_all":14,
//         "huan_yi":6,
//         "status":0,
//         "realBackStatus":1,
//         "back_code":"BA609cde21dae3759",
//         "orderType":"soon",
//         "curIndex":4
//     },
//     {
//         "back_price":1066.19,
//         "back_price_str":"本金(812.38) + 利息(76.11) + 罚息(177.70)",
//         "price":"10000.00",
//         "back_type":"每月等额",
//         "should_back_date":"2021-05-17",
//         "real_back_date":"",
//         "loan_date":"2021-05-13 16:04:38",
//         "note":"距离还款日9日",
//         "huan_all":14,
//         "huan_yi":6,
//         "status":0,
//         "realBackStatus":1,
//         "back_code":"BA609cde21dae37558",
//         "orderType":"soon",
//         "curIndex":5
//     },
//     {
//         "back_price":1066.19,
//         "back_price_str":"本金(812.38) + 利息(76.11) + 罚息(177.70)",
//         "price":"10000.00",
//         "back_type":"每月等额",
//         "should_back_date":"2021-05-17",
//         "real_back_date":"",
//         "loan_date":"2021-05-13 16:04:38",
//         "note":"距离还款日10日",
//         "huan_all":14,
//         "huan_yi":6,
//         "status":0,
//         "realBackStatus":1,
//         "back_code":"BA609cde21dae375555",
//         "orderType":"soon",
//         "curIndex":6
//     }
// ]
                        tmpObj.back_price = tmpObj.back_price/1000
                        tmpArr.push(tmpObj)
                    })
                }
                // that.totalPrice = res.total
                // that.count = res.count
                that.backList = tmpArr
                that.tab1Page = Number(res.data.current_page)
				that.tab1TotalPage = res.data.total
            }  else {
                that.lastBankNo = ''
            }
		}, err =>{
            that.$message.error('获取今日可还贷款列表失败')
            that.tabLoading = false
        })
    },
     // 提前还款列表
    advanceLoanList () {
        let that = this;
        that.tabLoading = true
        that.ajax('advanceLoan',{
            page: that.tab2Page,
			size: 10,
			card: that.bankNo,
		},'',res =>{
            that.tabLoading = false
			if(res.errno == 0) {
                let tmpArr = []
                if (res.data && res.data.data && res.data.data.length > 0) {
                    res.data.data.forEach(item =>{
                        let tmpObj = {
                            back_price:item.back_repaid,
                            price: item.loan_money,
                            huan_all: item.huan_all,
                            huan_yi: item.huan_yi,
                            product_name: item.product_name,
                            loan_type_name: item.loan_type_name,
                            back_type: item.repayment_name,
                            should_back_date: that.utils.dateFormat('yyyy-MM-dd', new Date(item.should_back_date)),
                            loan_date: item.loan_date,
                            real_back_date: item.real_back_date,
                            backList: [],
                            loan_code:item.loan_code,
                            user_id: item.user_id,
                            should_num: item.huan_all - item.huan_yi,
                            isyu: 0,
                            isToday: 0,
                            isSoon: 0
                        }
                        item.backlist.forEach((subItem,subIndex) => {
                            let tmpPriceStr = '本金('+subItem.back_principal+') '
                            if (Number(subItem.back_interest)) {
                                tmpPriceStr+='+ 利息('+subItem.back_interest+') '
                            }
                            if (Number(subItem.overdue_rate)) {
                                tmpPriceStr+= '+ 罚息('+subItem.overdue_rate+')'
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
                                    tmpObj.isToday+=1
                                } else if (days > 0) {
                                    realBackStatus = 1
                                    tmpNote = '距离还款日还有' + days +'天'
                                    tmpObj.isSoon+=1
                                } else {
                                    realBackStatus = 3
                                    tmpNote = '已经逾期' + (-days) + '天'
                                    tmpObj.isyu+=1
                                }
                            }
                            
                            let tmpSubObj = {
                                back_price: (Number(subItem.back_principal)*1000 + Number(subItem.back_interest)*1000 + Number(subItem.overdue_rate)*1000)/1000,
                                back_price_str: tmpPriceStr,
                                price: item.loan_money,
                                back_type: item.repayment_name,
                                should_back_date: that.utils.dateFormat('yyyy-MM-dd', new Date(subItem.should_back_date)),
                                real_back_date: subItem.real_back_date,
                                loan_date: item.loan_date,
                                note: tmpNote,
                                huan_all: subItem.all,
                                huan_yi: subItem.num,
                                status: subItem.status,
                                realBackStatus: realBackStatus,
                                back_code: subItem.back_code
                            }
                            tmpObj.backList.push(tmpSubObj)
                        })
                        tmpArr.push(tmpObj)
                    })
                }
                that.backList2 = tmpArr
                that.tab2Page = Number(res.data.current_page)
                that.tab2TotalPage = res.data.total
                    // that.backList2 = [{
                    //     back_price: '1260',
                    //     back_price_str: '本金(1000) + 利息(240) + 罚息(20)',
                    //     price: 1000,
                    //     hai_back_count: 0,
                    //     back_count: 12,
                    //     back_type: '等额本息',
                    //     should_back_date: '2021-05-07',
                    //     loan_date: '2021-04-07',
                    //     note: '已逾期1天',
                    // },{
                    //     back_price: '1320',
                    //     back_price_str: '本金(1200) + 利息(120)',
                    //     price: 1200,
                    //     hai_back_count: 2,
                    //     back_count: 6,
                    //     back_type: '等额本息',
                    //     should_back_date: '2021-05-08',
                    //     loan_date: '2021-02-08',
                    //     note: '',
                    // }]
            }  else {
                that.tabLoading = false
                if (that.backList.length == 0 && that.backList2.length == 0) {
                    that.$message.error('今日可还列表与提前还款列表为空')
                } else {
                    if (that.backList.length == 0) {
                        that.$message.error('今日可还列表为空')
                    } else if (that.backList2.length == 0) {
                        that.$message.error('提前还款列表为空')
                    }
                }
            }
		}, err =>{
            that.tabLoading = false
            that.$message.error('获取提前可还贷款列表失败')
        })
    },
      // 查找银行卡号
      inquireBankNo() {
        let that = this
        if(!that.bankNo) {
            that.$message.error('请输入您的卡号')
            return
        }
        if(that.lastBankNo && that.lastBankNo == that.bankNo) {
            that.$message.error('请不要重复查询')
            return
        }
        that.searchLoading = true
		that.ajax('searchPassbook_num',{
			card: that.bankNo,
		},'查询失败',res =>{
             that.searchLoading = false
			if(res.errno == 0) {
                that.isInquire =  true
                that.lastBankNo = that.bankNo
                res.data.start_rate_date = that.utils.dateFormat('yyyy-MM-dd', new Date(res.data.start_rate_date))
                res.data.end_date = that.utils.dateFormat('yyyy-MM-dd', new Date(res.data.end_date))
                that.userLoanInfo = res.data
                that.curLoanUser = res.data.name
                that.todayLoanList()
                that.advanceLoanList()
            }  else {
                that.lastBankNo = ''
                that.isInquire =  false
            }
		}, err =>{
            that.searchLoading = false
        })
      },
      // 显示分期记录弹窗
      showBackList (row) {
          this.backDetailList = row.backList
          this.curLoanUser = ''
          this.curLoanDate = row.loan_date
          this.curLoanCode = row.loan_code
          if (this.loanListType == 1) {
            this.todayList = []
            this.overdueList = []
            this.soonList = []
            this.backDetailList.forEach(item => {
                if (item.orderType == 'today') {
                    this.todayList.push(item)
                } else if (item.orderType == 'overdue') {
                    this.overdueList.push(item)
                } else if (item.orderType == 'soon') {
                    this.soonList.push(item)
                }
            })
            this.multipleSelection = []
            this.isAllIndeterminate = false
            this.isCheckAll = false
            this.isOverdueIndeterminate = false
            this.isCheckOverdueAll = false
            this.isTodayIndeterminate = false
            this.isCheckTodayAll = false
            this.selectPayObj = ''
          }
          this.confirmRow = row
          this.isShowBackList = true
      },
      // 关闭分期记录弹窗
      closeDrawer () {
            this.isShowBackList = false
            this.backDetailList = []
            this.curLoanUser = ''
            this.curLoanDate = ''
            this.curLoanCode = ''
            this.selectPayObj = ''
            this.dialogBySelectPay = false
            this.multipleSelection = []
            this.isCheckAll = false
            this.isAllIndeterminate = false
            this.isOverdueIndeterminate = false
            this.isCheckOverdueAll = false
            this.isTodayIndeterminate = false
            this.isCheckTodayAll = false
            this.todayList = []
            this.overdueList = []
            this.soonList = []
      },
      // 切换tabs
      changeTabs (tab) {
        this.loanListType = tab.name
      },
      // 按期选择还款
      confirmPayBySelect () {
          if (!this.multipleSelection || this.multipleSelection.length <= 0) {
              this.$message.error('请先选择要还款的订单!')
              return
          }
          let tmpObj = {
            back_price: 0,
            isyu: 0,
            isToday: 0,
            isSoon: 0,
            back_code: ''
          }
          this.multipleSelection.forEach((item, index) =>{
              tmpObj.back_price += Number(item.back_price)*1000
              if (item.orderType == 'overdue') {
                  tmpObj.isyu+=1
              }
              if (item.orderType == 'today') {
                  tmpObj.isToday+=1
              }
              if (item.orderType == 'soon') {
                  tmpObj.isSoon+=1
              }
              if (index == 0) {
                  tmpObj.back_code = item.back_code
              } else {
                  tmpObj.back_code+=(','+item.back_code)
              }
          })
          tmpObj.back_price = tmpObj.back_price/1000
          this.selectPayObj = tmpObj
          this.dialogBySelectPay = true
          
      },
      submitPayBySelect () {
        let that = this
        let data = that.userLoanInfo
        let params = {}
        params.back_code_str = this.selectPayObj.back_code
        params.bank_num = that.bankNo
        params.user_id = that.confirmRow.user_id
        params.loan_code = that.confirmRow.loan_code
        if(data.pay_type) {
            params.pay_type = data.pay_type
            if(data.pay_type == 1) {
                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputType: 'password',
                    type: 'warning',
                    center: true
                    }).then(({ value }) => {
                        value = value.trim()
                        if(value) {
                            params.pay_pwd = that.utils.recursiveMD5(value,1)
                            that.submitLoading = true
                            that.loanBackRequest(params, 'selectPay')
                        } else {
                            this.$message.error('请输入密码')
                        }
                    }).catch(() => {});
            } else {
                that.$confirm('确定进行还款操作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        params.pay_pwd = ''
                        that.submitLoading = true
                        that.loanBackRequest(params, 'selectPay')
                    }).catch(() => {
                });
            }
        } else {
            that.$message.error('请先选择支付方式!')
        }
      },
      // 重新计算当前借款下所需还款订单数组
      resetCountMulArr () {
          let tmpArr = []
          this.backDetailList.forEach((item,index) =>{
              item.isDel = 0
              this.multipleSelection.forEach((subItem,subIndex) =>{
                  if(item.back_code == subItem.back_code) {
                      item.isDel = 1
                  }
              })
              if (item.isDel == 0) {
                tmpArr.push(item)
              }
          })
          if (tmpArr && tmpArr.length > 0) {
              tmpArr.forEach((item,index) =>{
                  item.curIndex = index
              })
          }
          return tmpArr
      },
      // 提交还款
      submitForm(formName) {
        let that = this
        let data = that.userLoanInfo
        let params = {}
        let code_str = ''
        if (that.loanListType == 1) {
            if (that.confirmRow.backList && that.confirmRow.backList.length > 0) {
                that.confirmRow.backList.forEach((item,index) => {
                    if (index == 0) {
                        code_str = item.back_code
                    } else {
                        code_str+=(','+item.back_code)
                    }
                })
            }
            params.back_code_str = code_str
        }
        params.bank_num = that.bankNo
        params.user_id = that.confirmRow.user_id
        params.loan_code = that.confirmRow.loan_code
        if(data.pay_type) {
            params.pay_type = data.pay_type
            if(data.pay_type == 1) {
                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputType: 'password',
                    type: 'warning',
                    center: true
                    }).then(({ value }) => {
                        value = value.trim()
                        if(value) {
                            params.pay_pwd = that.utils.recursiveMD5(value,1)
                            that.submitLoading = true
                            that.loanBackRequest(params)
                        } else {
                            this.$message.error('请输入密码')
                        }
                    }).catch(() => {});
            } else {
                that.$confirm('确定进行还款操作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        params.pay_pwd = ''
                        that.submitLoading = true
                        that.loanBackRequest(params)
                    }).catch(() => {
                });
            }
        } else {
            that.$message.error('请先选择支付方式!')
        }
    },
    // 请求还款接口
    loanBackRequest(params, type) {
        let that = this;
        that.ajax(that.loanListType == 1 ? 'todayLoanPay' : 'advanceLoanPay',params,'还款失败',res =>{
            that.submitLoading = false
            if(res.errno == 0) {
                // that.bankNo = ''
                // that.lastBankNo = ''
                // that.isInquire = false
                if (that.loanListType == 1 && type == 'selectPay') {
                    let tmpArr = this.resetCountMulArr()
                    if (tmpArr.length > 0) {
                        that.$confirm('此笔借款还有'+tmpArr.length+'笔订单可还,是否继续还款?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(() => {
                            that.backDetailList = tmpArr
                            that.multipleSelection = []
                            that.todayList = []
                            that.overdueList = []
                            that.soonList = []
                            tmpArr.forEach(item =>{
                                if(item.orderType == 'overdue') {
                                    that.overdueList.push(item)
                                }
                                if(item.orderType == 'today') {
                                    that.todayList.push(item)
                                }
                                if(item.orderType == 'soon') {
                                    that.soonList.push(item)
                                }
                            })
                            that.dialogBySelectPay = false
                            that.selectPayObj = ''
                            that.refreshTabList(true)
                            that.isCheckAll = false
                            that.isAllIndeterminate = false
                            that.isOverdueIndeterminate = false
                            that.isCheckOverdueAll = false
                            that.isTodayIndeterminate = false
                            that.isCheckTodayAll = false
                        }).catch(() => {
                            that.backDetailList = []
                            that.multipleSelection = []
                            that.todayList = []
                            that.overdueList = []
                            that.soonList = []
                            that.isAllIndeterminate = false
                            that.isOverdueIndeterminate = false
                            that.isCheckOverdueAll = false
                            that.isTodayIndeterminate = false
                            that.isCheckTodayAll = false
                            that.dialogByPayType = false
                            that.isShowBackList = false
                            that.isShowDetail = false
                            that.dialogBySelectPay = false
                            that.selectPayObj = ''
                            that.$message.success('还款成功')
                            that.refreshTabList(true)
                        });     
                    } else {
                        // that.isInquire = false
                        that.backDetailList = []
                        that.multipleSelection = []
                        that.todayList = []
                        that.overdueList = []
                        that.soonList = []
                        that.isAllIndeterminate = false
                        that.isOverdueIndeterminate = false
                        that.isCheckOverdueAll = false
                        that.isTodayIndeterminate = false
                        that.isCheckTodayAll = false
                        that.dialogByPayType = false
                        that.isShowBackList = false
                        that.isShowDetail = false
                        that.dialogBySelectPay = false
                        that.selectPayObj = ''
                        that.$message.success('还款成功')
                        that.refreshTabList(true)
                    }
                } else {
                    that.backDetailList = []
                    that.multipleSelection = []
                    that.todayList = []
                    that.overdueList = []
                    that.soonList = []
                    that.isAllIndeterminate = false
                    that.isOverdueIndeterminate = false
                    that.isCheckOverdueAll = false
                    that.isTodayIndeterminate = false
                    that.isCheckTodayAll = false
                    that.dialogByPayType = false
                    that.isShowBackList = false
                    that.isShowDetail = false
                    that.dialogBySelectPay = false
                    that.selectPayObj = ''
                    that.$message.success('还款成功')
                    that.refreshTabList(true)
                }
                
            }
        }, err =>{
            that.submitLoading = false
        })
    },
    // 处理tab1分页
	handleTab1PageChange(val) {
		this.tab1Page = val;
		this.todayLoanList()
    },
     // 处理tab2分页
	handleTab2PageChange(val) {
		this.tab2Page = val;
		this.advanceLoanList()
    },
    // 点击还款按钮
    confirmPay (type, row) {
        this.confirmRow = row
        if (type == 1) {
            this.dialogByPayType = true
        } else {
            this.countLoading = true
            this.reCountBackPrice()
        }
    },
    reCountBackPrice () {
        let that = this;
        that.reCountObj = ''
        that.ajax('advanceLoanDetail',{
            loan_code: this.confirmRow.loan_code,
            user_id: this.confirmRow.user_id
        },'计算失败,请稍后重试',res =>{
            that.countLoading = false
            if(res.errno == 0) {
              res.data.old_price = (Number(res.data.old_back_principal)*1000 + Number(res.data.old_back_interest)*1000 + Number(res.data.old_overdue_rate)*1000)/1000
              res.data.new_price = (Number(res.data.new_back_principal)*1000 + Number(res.data.new_back_interest)*1000 + Number(res.data.new_overdue_rate)*1000)/1000
              res.data.difference = (Number(res.data.old_price)*1000 - Number(res.data.new_price)*1000)/1000
              that.reCountObj = res.data
              that.isShowDetail = true
            }
        }, err =>{
            that.countLoading = false
        })
    },
    // 关闭还款弹窗
    closePayDetail () {
        this.isShowDetail = false
    }
  }
};
</script>
<style lang="less">
.loan-withdraw {
    padding: 20px;
    .el-pagination{
        float: right;
        margin-top: 30px;
        margin-bottom: 30px;
	}
    .loan-title {
        text-align: center;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .loan-date {
        text-align: center;
        color: #333;
        margin-top: 0.4rem;
    }
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
            width: 35%;
            float: left;
            .el-form-item__label {
                font-size: 0.9rem;
            }
            .el-input {
                width: 80%;
                .read-idCard {
                    color: #3B6AF1;
                    background: #F0F8FF;
                    font-size: 0.75rem;
                    cursor: pointer;
                }
                .read-idCard:active {
                    opacity: 0.6;
                }
            }
        }
        .today-desc {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: #409EFF;
            .active {
                color:#F56C6C
            }
        }
        .add-btn-con {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .yu-pre-pay {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-top: 2rem;
        color: #f56c6c;
    }
    .pre-form-con {
        padding-left:30px;
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
        padding-top: 2rem;
        padding-bottom: 2rem;
        .el-button {
            width: 23%;
            padding: 0.9rem;
        }
    }
    .ic-iframe {
        position: absolute;
        top:50%;
        left: 50%;
        width: 500px;
        height: 200px;
        transform: translate(-50%,-70%);
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
        background: rgba(0,0,0,0.6)
    }
    .el-drawer {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 10px 8px 18px #000;
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
    .checkbox-btn-group {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 20px;
       .checkbox-btn-con {
           width: 100%;
           display: flex
       } 
       .desc {
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 12px;
           padding: 5px;
       }
       .submit-con {
           display: flex;
           align-items: center;
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
    .dialog-item {
        margin-bottom: 20px;
        text-align: center;
        .tit {
            font-weight: bold;
            font-size: 20px;
            color: #f56c6c
        }
    }
    .radio-con {
        display: flex;
        align-items: center;
        .label-con {
            width: 70px;
        }
        .choose-con {
            flex: 1;
            .el-radio {
                margin-bottom: 8px;
            }
        }
    }
}
 

</style>