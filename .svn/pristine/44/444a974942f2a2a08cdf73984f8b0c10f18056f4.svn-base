<template>
    <div class="reportList" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>柜员管理</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">柜员扎帐</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
              <el-form-item label="日期范围" style="width:auto"  >
                <el-date-picker v-model="dateArr" :picker-options="pickerOptions" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
              </el-form-item>
              <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
              <el-button type="primary" size="small" @click="showTipUpDialog">扎帐</el-button>
            </el-form>
        </div>
        <div class="table-con">
            <div>
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border >
                    <el-table-column prop="settlement_id" label="ID" width="80" align="center">
                      <template slot-scope="scope">
                         {{scope.row.settlement_id ? scope.row.settlement_id : '--'}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="扎帐类型"  align="center">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.type == 0" type="info">未扎帐</el-tag>
                        <el-tag v-if="scope.row.type == 1" type="success">正常扎帐</el-tag>
                        <el-tag v-if="scope.row.type == 2" type="danger">异常扎帐</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remarks" label="扎帐备注"  align="center"></el-table-column>
                     <el-table-column prop="add_time" label="扎帐时间"  align="center">
                       <template slot-scope="scope">
                         {{scope.row.add_time ? scope.row.add_time : scope.row.date}}
                       </template>
                     </el-table-column>
                    <el-table-column prop="price" label="异常金额(元)"  align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.price}}
                          <el-tooltip v-if="scope.row.priceStr" class="item" effect="dark"  :content="scope.row.priceStr" placement="top-start">
                            <i class="el-icon-warning" v-if="scope.row.priceStr"></i>
                          </el-tooltip>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作"  align="center">
                        <template slot-scope="scope">
                          <el-button type="primary" size="small" v-if="scope.row.type == 2"  @click="showFormDetail(scope.row)">添加跟踪轨迹</el-button>
                          <el-button type="success" size="small"  v-if="scope.row.type != 0" @click="showDetail(scope.row)">跟踪轨迹</el-button>
                        </template>
                    </el-table-column>
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
        <el-drawer :visible.sync="isDetail" :with-header="false" size="60%">
            <div class="drawer-tit-con" >
              <div class="tit">【{{selectRow.date}}】跟踪轨迹列表</div>
              <div class="icon-con" @click="closeDrawer(1)">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <div class="tabs-con">
                <el-table :data="trackList" border >
                    <el-table-column prop="track_id" label="ID" width="80" align="center"></el-table-column>
                    <el-table-column prop="remarks" label="跟踪备注"  align="center"></el-table-column>
                    <el-table-column prop="add_time" label="录入时间"  align="center"></el-table-column>
                </el-table>
            </div>
              <!-- <div class="drawer-footer" >
                <div class="btn-con">
                  <el-button   type="primary">关 闭</el-button>
                </div>
              </div> -->
        </el-drawer>
        <el-drawer :visible.sync="isTieUp" :with-header="false" size="60%">
            <div class="drawer-tit-con" >
              <div class="tit">今日扎帐信息</div>
              <div class="icon-con" @click="closeDrawer(2)">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <el-form :model="form">
                <!-- <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">今日入账额度</span>
                    <div class="bg"></div>
                </div> -->
                <div class="form-item-con clearfix">
                  <el-form-item label="互助金存入金额" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="form.price1" @input="form.price1 = changeNum(form.price1)"></el-input>
                  </el-form-item>
                  <el-form-item label="互助金支取金额" :label-width="formLabelWidth">
                        <el-input autocomplete="off" v-model="form.price2" @input="form.price2 = changeNum(form.price2)"></el-input>
                    </el-form-item>
                    <el-form-item label="收益支取金额" :label-width="formLabelWidth">
                        <el-input autocomplete="off" v-model="form.price3" @input="form.price3 = changeNum(form.price3)"></el-input>
                    </el-form-item>
                    <el-form-item label="投放金投放金额" :label-width="formLabelWidth">
                        <el-input autocomplete="off" v-model="form.price4" @input="form.price4 = changeNum(form.price4)" ></el-input>
                    </el-form-item>
                    <el-form-item label="投放金收回金额" :label-width="formLabelWidth">
                        <el-input autocomplete="off" v-model="form.price5" @input="form.price5 = changeNum(form.price5)" ></el-input>
                    </el-form-item>
                </div>
              </el-form>
              <div class="drawer-footer" >
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">扎帐状态</span>
                    <div class="bg"></div>
                </div>
                <div class="btn-con">
                    <template v-if="curApproveStatus == 1">
                      <el-button type="success" plain>已扎帐</el-button>
                    </template>
                    <template v-if="curApproveStatus == 2">
                      <el-popover ref="popoverByDeviant" title="是否确定扎帐" placement="bottom-start" width="550" trigger="click" :disabled="isDisabled">
                        <el-input type="textarea" :rows="4" v-model="note" placeholder="扎帐备注(可不填)"></el-input>
                        <el-divider >扎帐之后今日不可再操作涉及金额的业务</el-divider>
                        <div class="popover-btn-con">
                           <el-button @click="doClose(2)" >取消</el-button>
                          <el-button  type="primary" @click="confirm(2)">确定扎帐</el-button>
                        </div>
                        <el-button slot="reference" type="danger" @click="tieUp(2)">异常扎帐</el-button>
                      </el-popover>
                      <el-popover ref="popoverByNormal" title="是否确定扎帐" placement="bottom-start" width="550" trigger="click" :disabled="isDisabled">
                        <el-divider >扎帐之后今日不可再操作涉及金额的业务</el-divider>
                        <div class="popover-btn-con">
                           <el-button @click="doClose(1)" >取消</el-button>
                          <el-button  type="primary" @click="confirm(1)">确定扎帐</el-button>
                        </div>
                        <el-button style="margin-left: 20px" slot="reference"  type="primary"  @click="tieUp(1)">正常扎帐</el-button>
                      </el-popover>
                    </template>
                </div>
              </div>
        </el-drawer>
        <el-drawer :visible.sync="isShowAddForm" :with-header="false" size="40%">
            <div class="drawer-tit-con" >
              <div class="tit">【{{selectRow.date}}】扎帐跟踪</div>
              <div class="icon-con" @click="closeDrawer(3)">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <el-form :model="addForm">
                <!-- <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">今日入账额度</span>
                    <div class="bg"></div>
                </div> -->
                <div class="form-item-con add-form-item clearfix">
                  <el-form-item label="跟踪备注" style="height:auto" :label-width="formLabelWidth">
                      <el-input autocomplete="off"  type="textarea" :rows="4" v-model="addForm.remarks" @input="form.price1 = changeNum(form.price1)"></el-input>
                  </el-form-item>
                  <el-form-item label="扎帐是否已经正常" :label-width="formLabelWidth">
                       <el-switch v-model="addForm.isNormal"></el-switch>
                    </el-form-item>
                </div>
              </el-form>
              <div class="drawer-footer" >
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">是否确认添加跟踪记录</span>
                    <div class="bg"></div>
                </div>
                <div class="btn-con">
                  <el-button @click="isShowAddForm = false" >取消</el-button>
                  <el-button  type="primary" @click="addTrack()">确定</el-button>
                </div>
              </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
  name: "reportList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      dateArr: '',
      isDetail: false, // 是否显示金额明细列表
      isTieUp: false, // 扎帐弹窗
      form: {
        price1: '',
        price2: '',
        price3: '',
        price4: '',
        price5: '',
      },
      formLabelWidth: "135px",
      curApproveStatus: 1, // 1-已经扎帐 2-未扎帐
      getTipUpForm: {
        price1: '',
        price2: '',
        price3: '',
        price4: '',
        price5: '',
      },
      note: '', // 扎帐备注
      isDisabled: false, // 是否显示扎帐popover
      isShowPopover: false,
      isShowAddForm: false, // 是否显示添加跟踪轨迹form
      settlement_id: '',
      addForm: {
        remarks: '',
        isNormal: false
      },
      trackList: [], //跟踪轨迹列表
      selectRow: '',
      pickerOptions: {
        disabledDate(time) {
          // 大于某个日期不能选择
          let myDate = new Date();
          let _beforeDay = myDate.setDate(new Date().getDate());		
          return time.getTime() >= _beforeDay;
        }
      },
    };
  },
  activated() {
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    this.totalPage = null
    this.dateArr = ''
    this.isDetail = false
    this.isShowAddForm = false
    this.isTieUp = false
    this.selectRow = ''
    this.settlementSearch()
    this.getReportList();
    this.getTodayTipUpInfo();
    this.handlePermission();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.dateArr = '';
      this.isDetail = false
      this.isShowAddForm = false
      this.isTieUp = false
      this.selectRow = ''
      this.getReportList();
      this.getTodayTipUpInfo();
      this.handlePermission();
    },
    // 判断当前页面都有什么权限
    handlePermission() {
      let that = this;
      that.utils.getPermissionList(that, data => {
        data.forEach(item => {
          if (item.title == "审批") {
            that.isApprove = true;
          }
          if (item.title == "转账") {
            that.isTransfer = true;
          }
          if (item.title == "查看") {
            that.isLook = true;
          }
        });
      });
    },
    // 关闭金额明细弹窗
    closeDrawer (type) { // 1-跟踪轨迹 2-今日扎帐 3-添加跟踪轨迹
      this.isDetail = false
      this.isTieUp = false
      this.isShowAddForm = false
      this.drawerTit = ''
    },
    // 显示扎帐信息弹窗
    showTipUpDialog () {
      this.isTieUp = true
    },
    // 金额保留两位小数
    changeNum(num) {
      // 如果用户第一位输入的是小数点，则重置输入框内容
      if (num != '' && num.substr(0, 1) == '.') {
        num = "";
      }
      num = num.replace(/^0*(0\.|[1-9])/, '$1'); // 粘贴不生效
      num = num.replace(/[^\d.]/g, "");  // 清除“数字”和“.”以外的字符
      num = num.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的
      num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
      if (num.indexOf(".") < 0 && num != "") { // 以上已经过滤，若无小数点，首位不能为类似于 01、02的金额
        if (num.substr(0, 1) == '0' && num.length == 2) {
          num = num.substr(1, num.length);
        }
      }
      return num
    },
    // 扎帐按钮
    tieUp (type) { // 1-正常扎帐 2-异常扎帐
      if (type == 1) {
        let inputForm = JSON.parse(JSON.stringify(this.form))
        let initForm = JSON.parse(JSON.stringify(this.getTipUpForm))
        if (Number(inputForm.price1) == Number(initForm.price1) && Number(inputForm.price2) == Number(initForm.price2) && Number(inputForm.price3) == Number(initForm.price3) && Number(inputForm.price4) == Number(initForm.price4) && Number(inputForm.price5) == Number(initForm.price5)) {
          this.isDisabled = false
        } else {
          this.isDisabled = true
          this.$message.error('输入金额与系统记录金额不一致，请仔细检查下流水')
        }
      } else if (type == 2) {
        this.isDisabled = false
      }
      
    },
    // 关闭扎帐popover
    doClose (type) { // 1-正常 2-异常
      if (type == 1) {
        this.$refs['popoverByNormal'].doClose()
      } else if (type == 2) {
        this.$refs['popoverByDeviant'].doClose()
      }
    },
    // 确定扎帐
    confirm (type) { // 1-正常 2-异常
      let params = JSON.parse(JSON.stringify(this.form))
      this.ajax("settlementAdd",{
          hzj_cun: params.price1,
          hzj_qu: params.price2,
          sy_qu: params.price3,
          loan: params.price4,
          back_loan: params.price5,
          type: type,
          remarks: this.note,
        },"扎帐失败", res => {
          if (res.errno == 0) {
            this.$message.success('扎帐成功')
            this.getReportList()
            this.doClose(type)
            this.isTieUp = false
          }
        },
        err => {
          this.loading = false;
        }
      )
    },
    // 展示 跟踪记录表单弹窗
    showFormDetail (row) {
      this.isShowAddForm = true
      this.selectRow = row
      this.settlement_id = row.settlement_id
      this.addForm = {
        remarks: '',
        isNormal: false
      }
    },
    // 查询
    search() {
      this.loading = true
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.getReportList()
    },
    getTodayTipUpInfo() {
      this.ajax("settlementAll", {},"",res => {
          if (res.errno == 0) {
            let data = res.data
            let tmpObj = {
              price1: data.hzj_cun,
              price2: data.hzj_qu,
              price3: data.sy_qu,
              price4: data.loan,
              price5: data.back_loan
            }
            this.getTipUpForm = JSON.parse(JSON.stringify(tmpObj))
            this.form = tmpObj
          }
        }
      );
    },
    getReportList() {
      this.ajax("settlementListsTotal", {
          page: this.curPage,
          size: 10,
          coopera_id: "",
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
			    end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
        }, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            res.data.data.forEach(item =>{
              item.price = (Number(item.hzj_cun)*1000 + Number(item.hzj_qu)*1000 + Number(item.sy_qu)*1000 + Number(item.back_loan)*1000 + Number(item.loan)*1000)/1000 
              item.priceStr = ''
              if (Number(item.hzj_cun) != 0) {
                item.priceStr+='互助金存入'
                if (Number(item.hzj_cun) > 0) {
                  item.priceStr+='多了' + item.hzj_cun +'元; '
                } else {
                  item.priceStr+='少了' + (-Number(item.hzj_cun)) +'元; '
                }
              }
              if (Number(item.hzj_qu) != 0) {
                item.priceStr+='互助金支取'
                if (Number(item.hzj_qu) > 0) {
                  item.priceStr+='多了' + item.hzj_qu +'元; '
                } else {
                  item.priceStr+='少了' + (-Number(item.hzj_qu)) +'元; '
                }
              }
              if (Number(item.sy_qu) != 0) {
                item.priceStr+=' 收益支取'
                if (Number(item.sy_qu) > 0) {
                  item.priceStr+='多了' + item.sy_qu +'元; '
                } else {
                  item.priceStr+='少了' + (-Number(item.sy_qu)) +'元; '
                }
              }
              if (Number(item.loan) != 0) {
                item.priceStr+=' 投放金投放'
                if (Number(item.loan) > 0) {
                  item.priceStr+='多了' + item.loan +'元; '
                } else {
                  item.priceStr+='少了' + (-Number(item.loan)) +'元; '
                }
              }
              if (Number(item.back_loan) != 0) {
                item.priceStr+=' 投放金收回'
                if (Number(item.back_loan) > 0) {
                  item.priceStr+='多了' + item.back_loan +'元; '
                } else {
                  item.priceStr+='少了' + (-Number(item.back_loan)) +'元; '
                }
              }
            })

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
    handleCurPageChange(val) {
      this.curPage = val;
      this.loading = true;
      this.getReportList();
    },
    // 添加跟踪记录
    addTrack () {
      if (!this.addForm.remarks) {
        this.$message.error('请输入跟踪备注')
        return
      }
      this.ajax("trackAdd", {
          remarks: this.addForm.remarks,
          type	: this.addForm.isNormal ? 1 : 2,
          settlement_id: this.settlement_id
        }, "添加失败",
        res => {
          if (res.errno == 0) {
            this.$message.success('添加成功!')
            this.getReportList()
            this.isShowAddForm = false
          }
        },
        err => {})
    },
    // 跟踪记录列表
    showDetail (row) {
      this.isDetail = true
      this.trackList = []
      this.selectRow = row
      this.ajax("trackLists", {
        settlement_id: row.settlement_id
      }, "获取失败",
      res => {
        if (res.errno == 0) {
          this.trackList = res.data
        }
      },
      err => {})
    },
    // 查询今日是否扎帐
    settlementSearch () {
      this.ajax("settlementSearch", {}, "",
      res => {
        if (res.errno == 0) {
          this.curApproveStatus = 1
        } else if (res.errno == 1) {
          this.curApproveStatus = 2
        } else {
          this.$message.error(res.errmsg ? res.errmsg : '今日未扎帐')
        }
      },
      err => {})
    }
  }
};
</script>
<style lang="less">
.reportList {
  padding: 20px;
  .el-table {
    background: transparent;
    margin-top: 50px;
  }
  .el-table::before {
    height: 0;
  }
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .search-con {
    .el-form {
      width: 100%;
      display: flex;
    }
    .el-form-item {
      width: 23%;
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
  .table-con {
    .el-icon-warning {
      font-size: 20px;
      color: #5cb6ff;
      margin-left: 6px;
      cursor: pointer;
    }
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
  .form-item-con {
    margin: 2rem 0;
    position: relative;
    .el-form-item {
        width: 50%;
        height: 2.5rem  ;
        float: left;
        margin-bottom: 20px;
        .el-form-item__label {
            font-size: 0.9rem;
        }
        .el-input {
            width: 100%;
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
        .el-image {
          width: 100px;
          height: 100px;
          cursor: pointer;
          .image-slot {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: #f5f7fa;
            .text {
              height: 22px;
              font-size: 0.7rem;
              color: #999;
            }
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
            margin-left: 0!important;
        }
        .img-con {
            max-width: 100%;
            border: 1px solid #E4EDF6;
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
                max-height: 100%
            }
        }
        
        .upload-btn {
            width: 100%;
            padding: 0.3rem 0;
            background: #E4EDF6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #3B6AF1;
            font-size: 0.9rem;
            cursor: pointer;
        }
        .upload-btn:hover {
            opacity: 0.6;
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
      .idcard-item-con {
        height: auto;
        .idcard-img {
            width: 160px;
            height: 102px;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 8px;
            .img {
                width: 100%;
                height: 100%;
            }
        }
        .idcard-text {
            width: 160px;
            padding: 0.2rem 0;
            background: #E4EDF6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #3B6AF1;
            font-size: 0.9rem;
            cursor: pointer;
        }
    }
    
}
.add-form-item {
     .el-form-item { 
       width: 80%;
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
  .drawer-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    padding: 0 25px;
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
    .btn-con {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
    

  }
  
}
.el-popover__title {
  font-weight: bold
}
.popover-btn-con {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
</style>