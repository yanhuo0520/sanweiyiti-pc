<template>
    <div class="depositDraw">
        <el-form ref="ruleForm" label-width="100px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>互助金业务</el-breadcrumb-item>
                        <el-breadcrumb-item  class="breadcrumb-tit">互助金支取</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
             <div class="form-item-con clearfix" style="margin-top:50px">
                <el-form-item label="定期账号（卡号）:" label-width="120px">
                    <el-input v-model="passbook_num" placeholder="请输入互助金卡号" clearable :readonly="isRead">
                        <template #append>
                            <span class="read-idCard" @click="readBankNo()">读卡号</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click="findcard()" size="small" >查找</el-button>
             </div>
            <template v-if="info && info.relation_id">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">互助金支取</span>
                    <div class="bg"></div>
                </div>

                <div class="form-item-con clearfix">
                    <!-- <el-form-item label="定期账号（卡号）:">
                        <el-input v-model="passbook_num" placeholder="请输入互助金卡号" clearable :readonly="isRead">
                            <template #append>
                                <span class="read-idCard" @click="readBankNo()">读卡号</span>
                            </template>
                        </el-input>
                        <el-button type="primary" @click="findcard()" size="small" >查找</el-button>
                    </el-form-item> -->
                    <el-form-item label="社员姓名:">
                        <el-input v-model="info.name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="卡状态:">
                        <span>{{info.user_status==1?'正常':info.user_status==0?'锁定':info.user_status==2?'退社':''}}</span>
                    </el-form-item>
                    <el-form-item label="存入金额:">
                        <el-input v-model="info.money" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="借款金额:">
                        <el-input v-model="info.loan" clearable readonly></el-input>
                    </el-form-item>
                </div>

                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">选择支取类型</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="选择支取类型:">
                        <el-radio-group v-model="type" @change="moneyAll" :disabled="isRead">
                            <el-radio label="1">互助金</el-radio>
                            <el-radio label="2">定期存款</el-radio>
                            <el-radio label="3">活期存款</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div v-if="tableData && tableData.length > 0" class="clearfix">
                    <el-table
                        :data="tableData"
                        max-height="550"
                        style="width: 100%"
                        @row-click="clickRow">
                        <el-table-column prop="id" label="ID" width="100%">
                            <!-- <template slot-scope="scope">
                            <span>{{(curPage - 1) * 10 + scope.$index + 1}}</span>
                            (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 ,翻页序号从1开始解决方案
                        </template> -->
                        </el-table-column>
                        <el-table-column prop="passbook_num" label="账户" ></el-table-column>
                        <el-table-column prop="save_rate" label="利率" ></el-table-column>
                        <el-table-column prop="type_name" label="类型" ></el-table-column>
                        <el-table-column prop="money" label="余额" ></el-table-column>
                        <el-table-column prop="save_date" label="存款日期" ></el-table-column>
                        <el-table-column prop="end_rate_date" label="到期日期" v-if="type==2" ></el-table-column>
                    </el-table>

                    <el-pagination
                        background
                        :current-page="curPage"
                        layout="prev, pager, next"
                        :total="totalPage*10"
                        @current-change="handleCurPageChange">
                    </el-pagination>
                </div>
                <p v-if="type==1 && isFind">互助金总额：{{info.stock_money}}</p>
                <p v-if="type==2 && isFind">定期投资金总额：{{info.regular_money}}</p>
                <p v-if="type==3 && isFind">活期投资金总额：{{info.money}}</p>
                <!-- <div v-if="!tableData || tableData.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                    <div class="err-info-text ">暂无社员开户</div>
                    </div>
                </div>
                </div> -->
                <div class="form-item-con clearfix" v-if="type==3">
                    <el-form-item label="支取金额:">
                        <el-input v-model="drawMoney" placeholder="请输入支取金额" clearable @input="inputMoney" :readonly="isRead"></el-input>
                    </el-form-item>
                    <el-form-item label="大写:">
                        <el-input v-model="daxiedrawMoney" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input v-model="password" placeholder="请输入密码" clearable type="password" :readonly="isRead"></el-input>
                    </el-form-item>
                </div>

                <div class="form-item-con clearfix" v-if="type==2 && isFind">
                    <el-form-item label="凭证号:">
                        <el-input v-model="dingqi.save_proof" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取类型:">
                        <el-input v-model="dingqi.type_name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取金额:">
                        <el-input v-model="drawMoney" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="提前天数:">
                        <el-input v-model="dingqi.advance" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="利息:">
                        <el-input v-model="dingqi.interest" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="起息日期:">
                        <el-input v-model="dingqi.start_rate_date" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="超期天数:">
                        <el-input v-model="dingqi.overdue" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="到期日期:">
                        <el-input v-model="dingqi.end_rate_date" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="存入期限:">
                        <el-input v-model="dingqi.term_name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="定期利率‰:">
                        <el-input v-model="dingqi.save_rate" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="合计:">
                        <el-input v-model="dingqi.total" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="大写:">
                        <el-input v-model="daxieDingqi" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input v-model="password" placeholder="请输入密码" clearable type="password"></el-input>
                    </el-form-item>
                </div>

                <div class="form-item-con clearfix" v-if="type==1 && isFind">
                    <el-form-item label="凭证号:">
                        <el-input v-model="huzhujin.save_proof" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取类型:">
                        <el-input v-model="huzhujin.type_name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取金额:">
                        <el-input v-model="drawMoney" clearable readonly>
                            <template #append>
                                <span class="read-idCard" @click="drawAll">全部</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="分红总金额:">
                        <el-input v-model="huzhujin.bonus" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="大写:">
                        <el-input v-model="daxieHuzhu" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input v-model="password" placeholder="请输入密码" clearable type="password"></el-input>
                    </el-form-item>
                </div>
                <div class="btn-con">
                    <!-- <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : '保存并打印'}}</el-button> -->
                    <el-button type="warning" round v-if="isRead">该卡状态暂不能支取</el-button>
                    <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading" v-else>{{submitLoading ? '提交中...' : '保存'}}</el-button>
                </div>
            </template>
        </el-form>

        <div ref="print" class="print" style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;background:#fff;display:none;">
            <el-form ref="ruleForm" label-width="150px">
            
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">互助金支取</span>
                    <div class="bg"></div>
                </div>

                <div class="form-item-con clearfix">
                    <el-form-item label="定期账号（卡号）:">
                        <el-input v-model="passbook_num" placeholder="请输入互助金卡号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="社员姓名:">
                        <el-input v-model="info.name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="卡状态:">
                        <span>{{info.user_status==1?'正常':info.user_status==0?'锁定':info.user_status==2?'退社':''}}</span>
                    </el-form-item>
                    <el-form-item label="存入金额:">
                        <el-input v-model="info.money" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="借款金额:">
                        <el-input v-model="info.loan" clearable readonly></el-input>
                    </el-form-item>
                </div>

                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">支取类型</span>
                    <span>{{type==1?'互助金':type==2?'定期存款':type==3?'活期存款':''}}</span>
                    <div class="bg"></div>
                </div>
                <p v-if="type==1 && isFind">互助金总额：{{info.stock_money}}</p>
                <p v-if="type==2 && isFind">定期投资金总额：{{info.regular_money}}</p>
                <p v-if="type==3 && isFind">活期投资金总额：{{info.money}}</p>
                <div class="form-item-con clearfix" v-if="type==3">
                    <el-form-item label="支取金额:">
                        <el-input v-model="drawMoney" placeholder="请输入支取金额" clearable @input="inputMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="大写:">
                        <el-input v-model="daxiedrawMoney" clearable readonly></el-input>
                    </el-form-item>
                </div>

                <div class="form-item-con clearfix" v-if="type==2 && isFind">
                    <el-form-item label="凭证号:">
                        <el-input v-model="dingqi.save_proof" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取类型:">
                        <el-input v-model="dingqi.type_name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取金额:">
                        <el-input v-model="drawMoney" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="提前天数:">
                        <el-input v-model="dingqi.advance" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="利息:">
                        <el-input v-model="dingqi.interest" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="起息日期:">
                        <el-input v-model="dingqi.start_rate_date" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="超期天数:">
                        <el-input v-model="dingqi.overdue" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="到期日期:">
                        <el-input v-model="dingqi.end_rate_date" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="存入期限:">
                        <el-input v-model="dingqi.term_name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="定期利率‰:">
                        <el-input v-model="dingqi.save_rate" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="合计:">
                        <el-input v-model="dingqi.total" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="大写:">
                        <el-input v-model="daxieDingqi" clearable readonly></el-input>
                    </el-form-item>
                </div>

                <div class="form-item-con clearfix" v-if="type==1 && isFind">
                    <el-form-item label="凭证号:">
                        <el-input v-model="huzhujin.save_proof" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取类型:">
                        <el-input v-model="huzhujin.type_name" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="支取金额:">
                        <el-input v-model="drawMoney" clearable readonly>
                            <template #append>
                                <span class="read-idCard" @click="drawAll">全部</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="分红总金额:">
                        <el-input v-model="huzhujin.bonus" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="大写:">
                        <el-input v-model="daxieHuzhu" clearable readonly></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
         <div class="iframe-absolute-con" v-if="showReadIc" @click="showReadIc = false">
            <iframe @click.stop=""  class="ic-iframe" id="readIcIframeId"  frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
export default {
  name: "depositDraw",
  data() {
    return {
      passbook_num:'',
      drawMoney:'',
      daxiedrawMoney:'',
      password:'',
      type:"3",
      info:{},
      isFind:false,

      dingqi:{},//支取信息
      huzhujin:{},
      daxieDingqi:'',
      daxieHuzhu:'',
      id:'',
      
      tableData: [],
      curPage: 1,
      totalPage: 1,

      showReadIc: false, // 读取卡号弹窗
      icUuid: '', // IC卡芯片卡号
      submitLoading: false,

      isRead:false
    };
  },
  created() {
    window.addEventListener("message",(event)=>{
         if(event.data && event.data.path && event.data.path == 'depositDrawReadIc') {
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
  activated(){
      this.passbook_num = ''
      this.info = {}
      this.tableData = []
        this.curPage = 1;
      this.isFind = false
      this.isRead = false
  },
  methods: {
     // 读卡号
    readBankNo() {
      this.showReadIc = true
      this.passbook_num = ''
      setTimeout(() =>{
          document.getElementById('readIcIframeId').src='./static/autoGetCardSN.html?path=depositDrawReadIc';
      },100)
    },
    // 根据IC芯片卡号获取卡号
    getBankNo() {
      let that = this;
      that.ajax('searchICCard',{
        uuid:that.icUuid
      },'获取卡号失败',res => {
          if (res.errno == 0) {
            that.passbook_num  = res.data.card;
            that.findcard()
          }
        });
    },
      
    inputMoney(){
        this.daxiedrawMoney = this.$upDigit(this.drawMoney)
    },
    findcard() {
      if (this.passbook_num == "") {
        this.$message.error("请输入互助金卡号");
        return;
      }
      this.info = {}
      this.ajax(
        "searchCard",
        { card: this.passbook_num },
        "查询失败",
        res => {
          if (res.errno == 0) {
            
            if(res.data.passbook_status == 1){
              this.$message.success("查找完成");
                this.info = res.data
                this.isFind = true;
                this.moneyAll()
              this.isRead = false
            }else if(res.data.passbook_status == 0){
              this.$message.error('该卡已挂失，请补卡')
              this.isRead = true
            }else if(res.data.passbook_status == 2){
              this.$message.error('该卡已删除')
              this.isRead = true
            }
          }
        },
        err => {}
      );
    },
    // 查询表单
    moneyAll(){
        this.password = ''
        this.drawMoney = ''
        this.daxiedrawMoney = ''
        this.ajax('fixedMoneyAll',{
            passbook_num: this.info.passbook_num,
            save_type_id: this.type
        },'查询失败',res=>{
            if(res.errno == 0){
                this.tableData = res.data.data
                this.curPage = Number(res.data.current_page);
                this.totalPage = res.data.total;
            }
        },err=>{

        })
    },
    // 翻页
    handleCurPageChange(val){
        this.curPage = val;
        this.moneyAll();
    },
     doPrint () {
        let subOutputRankPrint = this.$refs.print;
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        // window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
    submitForm(){
        
        this.submitLoading = true
        let param = {}
        param.relation_id = this.info.relation_id
        param.save_type_id = this.type
        param.pwd = this.utils.recursiveMD5(this.password, 1)
        if(this.type == 3){
            param.id = 0
            param.money = this.drawMoney
            param.interest = 0
            param.outtype = 1
        }else if(this.type == 1){
            param.id = this.id
            param.money = this.huzhujin.money
            param.interest = 0
            if(this.drawMoney == this.info.stock_money){
                param.outtype = 0
            }else{
                param.outtype = 1
            }
        }else if(this.type == 2){
            param.id = this.id
            param.money = this.dingqi.money
            param.interest = this.dingqi.interest
            param.outtype = 1
        }
        // param.interest = this
        // if(this.info.passbook_num == ''){
        //     this.$message.error('请输入卡号')
        //     this.submitLoading = false
        //     return
        // }
        // if(!this.isFind){
        //     this.$message.error('请查找卡号是否存在')
        //     this.submitLoading = false
        //     return
        // }
        
        if(this.drawMoney == ''){
            if(this.type == 1 || this.type == 2){
                this.$message.error('请点击每一条记录来获取支取金额')
            }else{
                this.$message.error('请输入支取金额')
            }
            this.submitLoading = false
            return
        }
        if(this.password == ''){
            this.$message.error('请输入密码')
            this.submitLoading = false
            return
        }
                
        this.ajax('outMoney',param,'支取失败',res=>{
            this.submitLoading = false
            if(res.errno == 0){
                // this.$refs.print.style.display = 'block'
                // this.$print(this.$refs.print)
                // this.$refs.print.style.display = 'none'

                this.$message.success(res.errmsg)
                this.passbook_num = ''
                this.info = {}
                this.tableData = []
                this.type = '3'
                this.isFind = false
                this.dingqi = {}
                this.huzhujin = {}
                this.drawMoney = ''
                this.password = ''
            }
            // else if(res.errno == 1){
            //     this.$message.error('余额不足')
            // } else {
            //     this.$message.error((res.errmsg && res.errmsg.length > 0) ? res.errmsg : '支取失败')
            // }
        },err=>{
            this.submitLoading = false
        })
    },

    // 点击表单行
    clickRow(row, column, event){
        if(this.type == 1 || this.type == 2){
                        this.id = row.id
            this.ajax('fixedMoneyById',{id:row.id},'',res=>{
                if(res.errno == 0){
                        this.drawMoney = res.data.money
                    if(this.type == 2){
                        this.dingqi = res.data
                        this.daxieDingqi = this.$upDigit(res.data.total)
                    }else if(this.type == 1){
                        this.huzhujin = res.data
                        this.daxieHuzhu = this.$upDigit(res.data.money)
                    }
                }
            },err=>{})
        }
    },

    drawAll(){
        this.drawMoney=this.info.stock_money
        this.daxieHuzhu = this.$upDigit(this.drawMoney)
    }
  }
};
</script>
<style lang="less">
.depositDraw {
  padding: 20px;
  .tit-con {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .shu {
      width: 0.28rem;
      height: 1rem;
      background-color: #3b6af1;
    }
    .tit {
      color: #444444;
      padding: 0 0.8rem;
      line-height: 1rem;
    }
    .bg {
      flex: 1;
      background: url("../../images/baseInfo/tit-bg.png");
      height: 1rem;
      background-size: 100% 100%;
    }
    .del-family-icon {
      position: absolute;
      right: 0;
      top: 0.5rem;
      height: 1.5rem;
      cursor: pointer;
    }
  }
  .el-form{
      >p{
          text-align: center;
          height: 30px;
          line-height: 30px;
          background: #eee;
      }
  }
  .form-item-con {
    margin: 2rem 0;
    position: relative;
    .el-form-item {
      width: 35%;
      height: 2.5rem;
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

  .print{
      
      .el-form-item__label,.el-input__inner{
          color:#000;
          border: none;
      }
      .el-input__inner::placeholder{
          color: #000;
      }
      .tit {
        color: #000;
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
}
</style>