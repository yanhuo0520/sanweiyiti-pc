<template>
    <div class="loan-detail-list"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">借款期限配置</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
            <el-button size="small" @click="initData()">刷新</el-button>
		</div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="年份设置" name="1"></el-tab-pane>
            <el-tab-pane label="月份设置" name="2"></el-tab-pane>
            <el-tab-pane label="天数设置" name="3"></el-tab-pane>
            <div class="data-con  clearfix">
                <div class="data-item" v-for="(item,index) in data" :key="index">
                    <div class="text">{{item.loan_term_name}}</div>
                    <div class="btn-con" v-if="isEdit || isDel">
                        <el-button   type="primary" size="small" @click="editLoanTerm(item,index)"  v-if="isEdit" >编辑</el-button>
                        <el-button   type="danger" size="small" @click="delLoanTerm(item,index)" v-if="isDel">删除</el-button>
                    </div>
                </div>
                <el-button type="primary" @click="AddLoanTerm" v-if="isAdd" >添加</el-button>
            </div>
        </el-tabs>

    </div>
</template>
<script>
export default {
  name: "loanDetailList",
  data() {
    return {
      activeName: '1',
      data: [],
      yearData: [],
      monthData: [],
      dayData: [],
      loading: false,

      isEdit: false,// 是否有编辑权限
      isDel: false, //是否有删除权限
      isAdd: false, //是否有添加权限
    };
  },
  activated() {
      this.initData()
  },	
  methods: {
    // 初始化信息
	initData() {
      this.activeName = '1'
      this.getLoanTermList()
      this.handlePermission()
    },
    // 判断当前页面都有什么权限
	handlePermission() { 
		let that = this;
		that.utils.getPermissionList(that,data =>{
			data.forEach(item =>{
				if(item.title == '编辑') {
					that.isEdit = true
                }	
                if(item.title == '删除') {
					that.isDel = true
                }	
                if(item.title == '添加') {
					that.isAdd = true
				}	
			})
		})
	},
	// 获取期限列表
	getLoanTermList() {
		let that = this
		that.loading = true;
		that.ajax('loanTermLists',{},'获取期限列表失败',res =>{
            that.loading = false
			if(res.errno == 0) {
                that.data = res.data.data.y
                that.yearData = res.data.data.y
                that.monthData = res.data.data.m
                that.dayData = res.data.data.d
			}
		}, err =>{
			that.loading = false
		})
    },
    // 切换 年月日
     handleClick(tab, event) {
        this.activeName = tab.name
        if(tab.name == '1') {
            this.data = this.yearData
        } else if(tab.name == '2') {
            this.data = this.monthData
        } else if(tab.name == '3') {
            this.data = this.dayData
        }
    },
    // 添加 年月日
    AddLoanTerm() {
        let that = this
        that.$prompt((that.activeName == '1' ? '年份' : that.activeName == '2' ? '月份' : '天数') + '必须为数字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[0-9]*[1-9][0-9]*$/,
          inputPlaceholder: '请输入数字',
          inputErrorMessage: '请输入正确的'+(that.activeName == '1' ? '年份' : that.activeName == '2' ? '月份' : '天数'),
           type: 'warning',
           center: true
        }).then(({ value }) => {
            let numText = that.utils.noToChinese(value) 
            if(parseFloat(value) >= 10 && parseFloat(value) <= 19) {
                numText = numText.substring(1,3)
            }
            let params = {
                loan_term_name: numText+ (that.activeName == '1' ? '年' : that.activeName == '2' ? '个月' : '天'),
                sign: that.activeName,
                number: value,
            }
            that.ajax('loanTermAdd',params,'添加失败',res =>{
                if(res.errno == 0) {
                    params.loan_term_id = res.loan_term_id
                    that.data.push(params)
                    // if(that.activeName == '1') {
                    //     that.yearData.push(params)
                    // } else if(that.activeName == '2') {
                    //     that.monthData.push(params)
                    // } else if(that.activeName == '3') {
                    //     that.dayData.push(params)
                    // }
                    that.$message.success('添加成功')
                }
            })
        }).catch(() => {});
		
    },
    // 修改 年月日
    editLoanTerm(row,index) {
        let that = this
        that.$prompt((that.activeName == '1' ? '年份' : that.activeName == '2' ? '月份' : '天数') + '必须为数字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: row.number,
          inputPattern: /^[0-9]*[1-9][0-9]*$/,
          inputPlaceholder: '请输入数字',
          inputErrorMessage: '请输入正确的'+(that.activeName == '1' ? '年份' : that.activeName == '2' ? '月份' : '天数'),
          type: 'warning',
          center: true
        }).then(({ value }) => {
            let numText = that.utils.noToChinese(value) 
            if(parseFloat(value) >= 10 && parseFloat(value) <= 19) {
                numText = numText.substring(1,3)
            }
            let params = {
                loan_term_name: numText + (that.activeName == '1' ? '年' : that.activeName == '2' ? '个月' : '天'),
                sign: that.activeName,
                number: value,
                loan_term_id: row.loan_term_id
            }
            that.ajax('loanTermMod',params,'修改失败',res =>{
                if(res.errno == 0) {
                    that.data[index] = params
                    that.$forceUpdate()
                    that.$message.success('修改成功')
                }
            })
        }).catch(() => {
            
        });
		
    },
    delLoanTerm(row,index) {
        let that = this;
        that.$confirm('此操作将永久删除该设置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
           center: true
        }).then(() => {
            that.ajax('loanTermDel',{
                loan_term_id: row.loan_term_id
            },'删除失败',res =>{
                if(res.errno == 0) {
                    that.data.splice(index,1)
                    // if(that.activeName == '1') {
                    //     that.yearData.splice(index,1)
                    // } else if(that.activeName == '2') {
                    //     that.monthData.splice(index,1)
                    // } else if(that.activeName == '3') {
                    //     that.dayData.splice(index,1)
                    // }
                    that.$message.success('删除成功')
                }
            })
        }).catch(() => {});
    },
    
  }
};
</script>
<style lang="less">
.loan-detail-list {
  padding: 20px;
  .data-con {
      padding: 1rem;
      .data-item {
          padding: 1rem;
          float: left;
          margin-right: 1rem;
          margin-bottom: 1rem;
          background-color:#ecf5ff;
          color: #409eff;
          border: 1px solid #d9ecff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .text {
              font-weight: bold;
          }
          .btn-con {
              display: flex;
              align-items: center;
              justify-content: center;
              padding-top: 1rem;
          }
      }
      .add-btn-con {
          display: flex;
          align-items: center;
          justify-content: center;
      }
  }

  .button-new-tag {
    margin-top: 1rem;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  
 
}

</style>