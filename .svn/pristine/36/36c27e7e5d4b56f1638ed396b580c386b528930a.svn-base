<template>
    <div class="loan-detail-list"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item  class="breadcrumb-tit">商城分类列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
            <el-button size="small" @click="initData()">刷新</el-button>
		</div>
      
      <div class="data-con  clearfix">
          <div class="data-item" v-for="(item,index) in data" :key="index">
              <div class="text">{{item.assort_name}}</div>
              <div class="btn-con" v-if="isEdit || isDel">
                  <el-button   type="primary" size="small" @click="editAssort(item,index)"  v-if="isEdit" >编辑</el-button>
                  <el-button   type="danger" size="small" @click="delAssort(item,index)" v-if="isDel">删除</el-button>
              </div>
          </div>
          <el-button type="primary" @click="AddLoanTerm" v-if="isAdd" >添加</el-button>
      </div>

    </div>
</template>
<script>
export default {
  name: "assortList",
  data() {
    return {
      data: [],
   
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
      this.getAssortList()
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
	getAssortList() {
		let that = this
		that.loading = true;
		that.ajax('cateList',{ table: "assort" },'',res =>{
            that.loading = false
			if(res.errno == 0) {
          that.data = res.data
			}
		}, err =>{
			that.loading = false
		})
    },
   
    // 添加 年月日
    AddLoanTerm() {
        let that = this
        that.$prompt('请输入商城分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: '请输入商城分类',
           type: 'warning',
           center: true
        }).then(({ value }) => {
          if(value) {
            let params = {
                assort_name: value,
                parent_id:'',
                // icon: this.icon,
                is_show: 1,
                assort_id: ''
            }
            that.ajax('assortAdd',params,'添加失败',res =>{
                if(res.errno == 0) {
                    that.getAssortList()
                    that.$message.success('添加成功')
                }
            })
          } else {
            that.$message.error('请输入商城分类')
          }
            
        }).catch(() => {});
		
    },
    // 修改 年月日
    editAssort(row,index) {
        let that = this
        that.$prompt('请输入商城分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: row.assort_name,
          inputPlaceholder: '请输入商城分类',
          type: 'warning',
          center: true
        }).then(({ value }) => {
            if(value) {
              let params = {
                  assort_name: value,
                    parent_id:'',
                    // icon: this.icon,
                    is_show: 1,
                    assort_id: row.assort_id
              }
              that.ajax('assortAdd',params,'修改失败',res =>{
                  if(res.errno == 0) {
                      that.data[index] = params
                      that.$forceUpdate()
                      that.$message.success('修改成功')
                  }
              })
            } else {
              that.$message.error('请输入商城分类')
            }
            
        }).catch(() => {
            
        });
		
    },
    delAssort(row,index) {
        let that = this;
        that.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
           center: true
        }).then(() => {
            that.ajax('cateDel',{
               table: "assort",
                id: row.assort_id,
                is_show: 0
            },'删除失败',res =>{
                if(res.errno == 0) {
                    that.data.splice(index,1)
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