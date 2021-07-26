<template>
    <div class="versionList"  v-loading="loading">
		<div class="breadcrumb-con">
			<img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
			<div class="breadcrumb-info">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>系统配置</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">版本列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-button size="small" @click="initData()">刷新</el-button>
		</div>
		<div class="operate-con clearfix">
			<div class="search-con"></div>
            <div class="btn-con">
                <el-button size="small" type="primary" @click="addVersion()">添加版本号</el-button>
            </div>
		</div>
        <div class="table-con">
            <template v-if="data && data.length > 0">
                <el-table :data="data" border >
                    <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
                    <el-table-column prop="version_id" label="大版本号" align="center" ></el-table-column>
                    <el-table-column prop="version_mini" label="小版本号" align="center"></el-table-column>
                    <el-table-column prop="version_code" label="完整版本号" align="center"></el-table-column>
                    <el-table-column prop="upgrade_point" label="升级提示" align="center"></el-table-column>
                    <el-table-column prop="create_time" label="添加时间" align="center"></el-table-column>
                    <!-- <el-table-column  label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" effect="dark">{{scope.row.status == 1 ? '可用' : '不可用'}}</el-tag>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column  label="操作" width="100" align="center" >
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" plain ></el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </template>
            <template v-if="!data || data.length == 0">
                <div class="no-data-con" >
                    <div class="absolute-center">
                        <div class="err-info-text ">暂无版本列表</div>
                    </div>
                </div>
            </template>
            <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
        </div>

        <el-dialog title="添加版本号" :visible.sync="versionDialog" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form ref="versionForm" :model="versionForm" :rules="versionRules" label-width="80px">
				<el-form-item label="大版本号" prop="version_id">
					<el-input v-model="versionForm.version_id" @blur="bindBlur('version_id')"  @input="bindInput('version_id')" placeholder="请输入大版本号（整数，如1）	"></el-input>
				</el-form-item>
                <el-form-item label="小版本号" prop="version_mini">
                    <el-input v-model="versionForm.version_mini" @blur="bindBlur('version_mini')"  @input="bindInput('version_mini')" placeholder="请输入小版本号（小数，如：1.27）"></el-input>
				</el-form-item>
                <el-form-item label="完整版本号" >
                    <el-input v-model="versionForm.version_code"  readonly></el-input>
				</el-form-item>
                <el-form-item label="升级提示" prop="upgrade_point">
                    <el-input v-model="versionForm.upgrade_point" placeholder="请输入升级提示" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="versionDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('versionForm')" :loading="submitLoading">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
export default {
  name: "versionList",
  data() {
    return {
      data: [],
      curPage: 1,
      totalPage: null,
      loading: false,
      versionDialog: false,
      versionForm: {
          version_id: '',
          version_mini: '',
          version_code: '',
          upgrade_point: '',
          status: 1
      },
      versionRules: {
        version_id: [
            { required: true,  message: '请输入大版本号', trigger: 'blur' }
        ],
      },

      submitLoading: false,
      handleLoading: false,
    };
  },
  activated() {
    this.initData()  
  },
  methods: {
	// 初始化信息
	initData() {
      this.data = []
      this.curPage = 1
      this.totalPage = null
      this.cooperaId = ''
	  this.getVersionList()
    },
    // 查询
	search() {
        this.curPage = 1;
        this.totalPage = null;
        this.data = [];
        this.loading = true;
        this.getVersionList()
    },
    // 添加版本号
    addVersion() {
        this.versionForm = {
            version_id: '',
            version_mini: '',
            version_code: '',
            upgrade_point: '',
            status: 1
        }
        this.versionDialog = true
    },
    // 处理小数
    handlePoint(val) {
        var regStrs = [
            ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
            ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
            ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
        ];
        for(var i=0; i<regStrs.length; i++){
            var reg = new RegExp(regStrs[i][0]);
            val = val.replace(reg, regStrs[i][1]);
        }
        let miniArr = val.split('.')
        if (miniArr.length > 2) {
            val = miniArr[0] + '.' + miniArr[1]
        }
        return val
    },
    bindInput (type) {
        if (type == 'version_id') {
            this.$set(this.versionForm, 'version_id', this.versionForm.version_id.replace(/^(0+)|[^\d]+/g,''))
        } else if (type == 'version_mini') {
            this.$set(this.versionForm, 'version_mini', this.handlePoint(this.versionForm.version_mini))
        }
    },
    bindBlur (type) {
        if (this.versionForm.version_id) {
            this.$set(this.versionForm, 'version_code', this.versionForm.version_id + '.0.0')
        }
        if (this.versionForm.version_id && this.versionForm.version_mini) {
            let miniArr = this.versionForm.version_mini.split('.')
            this.$set(this.versionForm, 'version_code', this.versionForm.version_id + '.' + miniArr[0] + (miniArr[1] && miniArr[1] != 'undefined' ? ('.'+miniArr[1]) : '.0'))
        }
    }, 
	// 获取版本号列表
	getVersionList(isAddEdit) {
        let that = this
        if(isAddEdit) {
            that.loading = false
        } else {
            that.loading = true;
        }
		that.ajax('versionList',{
            page: that.curPage,
            size: 10
        },'获取版本列表失败',res =>{
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
    // 提交版本号表单
    submitForm(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
        if (valid) {
            let params = JSON.parse(JSON.stringify(that.versionForm))
            that.submitLoading = true
            that.ajax('versionAdd',params,'添加版本失败',res =>{
                that.submitLoading = false
                if(res.errno == 0) {
                    that.$message.success('添加版本号成功')
                    that.versionDialog = false
                    that.getVersionList(true)
                }
            }, err =>{
                that.submitLoading = false
            })
        } else {
            return false;
        }
        });
    },
    // 处理分页
	handleCurPageChange(val) {
		this.curPage = val;
		this.getVersionList()
	},
  }
};
</script>
<style lang="less">
.versionList {
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
        width: 50%;
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