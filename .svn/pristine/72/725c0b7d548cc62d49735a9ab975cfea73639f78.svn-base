<template>
    <div class="white-list"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">白名单列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
			<div class="search-con">
                <el-form class="clearfix"  label-width="65px">
                    <el-form-item label="合作社" >
                        <el-select v-model="cooperaId" filterable placeholder="请选择合作社">
                            <el-option v-for="(item,index) in cooperativeList" :key="index" :label="item.coopera_name" :value="item.coopera_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
                </el-form>
            </div>
            <div class="btn-con">
                <el-button size="small" type="primary" @click="addIpWhite()">添加白名单</el-button>
            </div>
		</div>
        <div class="table-con">
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                    <el-table-column prop="list_id" label="ID" width="70" align="center"></el-table-column>
                    <el-table-column prop="coopera_name" label="合作社名称" align="center" ></el-table-column>
                    <el-table-column prop="ip" label="请求IP" align="center"></el-table-column>
                    <el-table-column  label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" effect="dark">{{scope.row.status == 1 ? '已启用' : '已禁用'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="add_time" label="添加时间" align="center"></el-table-column>
                   
                    <el-table-column  label="操作" width="100" align="center" >
                        <template slot-scope="scope">
                            <el-button :type="scope.row.status == 1 ? 'danger' : 'primary'" size="small" plain  @click="handleBtn(scope.row)">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无白名单列表</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>

        <el-dialog title="添加白名单" :visible.sync="whiteDialog" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form ref="whiteForm" :model="whiteForm" :rules="whiteRules" label-width="60px">
				<el-form-item label="IP地址" prop="ip">
					<el-input v-model="whiteForm.ip" placeholder="请输入IP地址"></el-input>
				</el-form-item>
                <el-form-item label="合作社" prop="coopera_id">
                    <el-select v-model="whiteForm.coopera_id" filterable  placeholder="请选择合作社">
                        <el-option v-for="(item,index) in noAllCooperativeList" :key="index" :label="item.coopera_name" :value="item.coopera_id"></el-option>
                    </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="whiteDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('whiteForm')" :loading="submitLoading">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
export default {
  name: "whitelist",
  data() {
      var checkIp = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入IP地址'));
        }
        let ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (!ipReg.test(value)) {
        callback(new Error('请输入正确的IP地址'));
        } else {
            callback();
        }
    };
    return {
      data: [],
      curPage: 1,
      totalPage: null,
      loading: false,

      whiteDialog: false,
      whiteForm: {
          ip: '',
          coopera_id: '',
      },
      whiteRules: {
        ip: [
            { required: true,  validator: checkIp, trigger: 'blur' }
        ],
        coopera_id: [
            { required: true, message: '请选择合作社',trigger: 'change' }
        ],
      },

      submitLoading: false,
      handleLoading: false,
      
      cooperaId: '', //合作社id
      cooperativeList:[],
      noAllCooperativeList: []
    };
  },
  activated() {
      this.utils.getCooperativeList(this, data =>{
        this.cooperativeList = data
        let tmpList = JSON.parse(JSON.stringify(this.cooperativeList))
        tmpList[0].coopera_name = '平台'
        this.noAllCooperativeList = tmpList
        this.cooperaId = ''
      })
	  this.initData()
  },	
  methods: {
	// 初始化信息
	initData() {
      this.data = []
      this.curPage = 1
      this.totalPage = null
      this.cooperaId = ''
	  this.getIpWhiteLists()
    },
    // 查询
	search() {
        this.curPage = 1;
        this.totalPage = null;
        this.data = [];
        this.loading = true;
        this.getIpWhiteLists()
    },
    // 添加白名单
    addIpWhite() {
        this.whiteForm = {
            ip: '',
            coopera_id: '',
        }
        this.whiteDialog = true
    },
	// 获取白名单列表
	getIpWhiteLists(isAddEdit) {
        let that = this
        if(isAddEdit) {
            that.loading = false
        } else {
            that.loading = true;
        }
		that.ajax('ipWhiteLists',{
            page: that.curPage,
            size: 10,
            coopera_id: that.cooperaId
        },'获取白名单列表失败',res =>{
			that.loading = false
			if(res.errno == 0) {
                that.curPage = Number(res.data.current_page)
				that.totalPage = res.data.total
				that.data = res.data.data
			}
		}, err =>{
			that.loading = false
		})
    },
    // 提交白名单表单
    submitForm(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
        if (valid) {
            let params = JSON.parse(JSON.stringify(that.whiteForm))
            that.submitLoading = true
            that.ajax('ipWhiteAdd',params,'添加白名单失败',res =>{
                that.submitLoading = false
                if(res.errno == 0) {
                    that.$message.success('添加白名单成功')
                    that.whiteDialog = false
                    that.getIpWhiteLists(true)
                }
            }, err =>{
                that.submitLoading = false
            })
        } else {
            return false;
        }
        });
    },
    // 禁用启用
    handleBtn(row) {
        let that = this
        let status = row.status == 1 ? 2 : 1
        that.handleLoading = true;
		that.ajax('ipWhiteMod',{
            list_id: row.list_id,
            status: status,
        },'操作失败',res =>{
			that.handleLoading = false
			if(res.errno == 0) {
               row.status = status
               that.$message.success('操作成功')
			}
		}, err =>{
			that.handleLoading = false
		})
    },
    // 处理分页
	handleCurPageChange(val) {
		this.curPage = val;
		this.getIpWhiteLists()
	},
  }
};
</script>
<style lang="less">
.white-list {
  padding: 20px;
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
		width: 28%;
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
    }
    
    .el-dialog {
        width: 30%;
		.el-form {
			padding: 0 1rem;
			.el-form-item__content {
				.el-input {
					width: 60%;
				}
			}
        }
       
	}


 
}

</style>