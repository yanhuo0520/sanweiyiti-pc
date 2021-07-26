<template>
  <div class="wxVirtualAccount" >
    <div class="breadcrumb-con">
      <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt />
      <div class="breadcrumb-info">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-tit">微信运营充值</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="small" @click="initData()">刷新</el-button>
    </div>
    <el-tabs style="margin-top:10px" type="border-card" v-model="tabActive" @tab-click="changeTab">
        <el-tab-pane label="三位一体团队" name="6"></el-tab-pane>
        <el-tab-pane label="三位一体账户" name="7"></el-tab-pane>
        <el-tab-pane label="三位一体赏金" name="8"></el-tab-pane>
        <el-alert  type="warning" :closable="false">
            <template #title>
                <span>微信服务商所剩余额:<span style="color:red;font-size:16px;margin:10px">{{balance}}</span>元</span>
            </template>
        </el-alert>
        <div class="data-con clearfix" v-if="tabActive == 7">
            <div class="data-item">
                <div class="label">充值金额：</div>
                <div>
                    <el-input placeholder="请输入要充值的金额"  v-model="price" @input="priceInput" clearable> </el-input>
                </div>
            </div>
            <div class="data-item">
                <div class="label">提示：</div>
                <span class="desc">该充值功能仅用来同步记录财务向微信服务商账户充值金额，并不能真实的向微信账户进行充值。</span>
            </div>
        </div>
        <div class="btn-con">
            <el-button v-if="tabActive == 7" type="primary" style="margin-right: 20px" @click="submit">充值</el-button>
            <el-button @click="toDetail()">查看充值记录</el-button>
        </div>
    </el-tabs>
    
  </div>
</template>
<script>
export default {
  name: "wxVirtualAccount",
  data() {
    return {
        tabActive: '6', // 6-三位一体团队 7-三位一体账户 8-三位一体赏金

        balance: 0,
        price: '',

    };
  },
  activated() {
      this.getBalance()
  },
  methods: {
    // 切换tab栏获取对应的渠道
	changeTab(tab) {
        this.balance = 0
        this.price = ''
		this.getBalance()
	},
    getBalance() {
        this.ajax("searchWXAmount",{
            shopType: this.tabActive
        },"获取微信余额失败",res => {
			if(res.errno == 0) {
                this.balance = res.amount
			} else {
				this.balance = 0
			}
			},err => {
				this.balance = 0
			}
		);
    },
    // 金额输入事件
    priceInput(val) {
        let tmpPrice = this.utils.handlePrice(val)
        this.price = tmpPrice
    },
    // 微信虚拟账户充值
    submit () {
        if (!this.price) {
            this.$message.error('请输入大于0的金额!')
            return
        }
        this.ajax("addWXAmount",{
            amount: this.price,
            shopType: this.tabActive
        },"充值失败",res => {
			if(res.errno == 0) {
                this.balance = (Number(this.balance)*1000 + Number(this.price)*1000)/1000
                this.price = ''
                this.$message.success('充值成功!')
			} 
			}
		);
    },
    // 跳转详情列表
    toDetail (path) {
        this.$router.push({
            path: '/wxAccountBill',
            query: {
                type: this.tabActive
            }
        })
    }
  }
};
</script>
<style lang="less">
.wxVirtualAccount {
  padding: 20px;
    .data-con {
        padding: 1rem;
        .data-item {
            display: flex;
            align-items: center;
            margin-top: 15px;
            .label {
                width: 120px;
                text-align: right;
            }
            .el-input__inner {
                width: 300px;
            }
            .desc {
                color: red;
            }
        }
    }
    .btn-con {
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 180px;
        padding-top: 20px;
    }

}
</style>