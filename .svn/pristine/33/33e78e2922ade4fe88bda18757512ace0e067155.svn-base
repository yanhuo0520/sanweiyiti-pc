<template>
    <div class="point-setting"  :class="{'admin-tmp-con': isAdmin}" v-loading="loading">
      <div class="breadcrumb-con">
			  <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
        <div class="breadcrumb-info">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>系统配置</el-breadcrumb-item>
            <el-breadcrumb-item  class="breadcrumb-tit">积分配置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-button size="small" @click="initData()">刷新</el-button>
	  	</div>
      <el-tabs type="border-card" v-model="intergalSource" @tab-click="handleClick" >
        <el-tab-pane :label="item.name" :name="item.id" v-for="(item,index) in intergalSourceList" :key="index"></el-tab-pane>
        <div class="operate-con clearfix">
            <div class="search-con">
              <el-form class="clearfix"  label-width="65px">
                <el-form-item label="合作社" v-if="isAdmin">
                  <el-select v-model="cooperaId" filterable placeholder="请选择合作社">
                    <el-option v-for="(item,index) in cooperativeList" :key="index" :label="item.coopera_name" :value="item.coopera_id"></el-option>
                  </el-select>
                </el-form-item>
                          <el-form-item label="规则名称">
                              <el-input v-model="ruleName" placeholder="请输入规则名称" clearable></el-input>
                          </el-form-item>
                          <el-button  type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
                      </el-form>
                  </div>
                  <div class="btn-con" v-if="!loading">
                      <el-button slot="trigger" size="small"  type="primary" v-if="isAdd" @click="addPointSetting()" >添加配置</el-button>
                  </div>
              </div>
            <div class="table-con">
              <template v-if="data && data.length > 0">
                  <el-table :data="data" border >
            <el-table-column prop="inter_id" label="ID" width="70" align="center" ></el-table-column>
                      <el-table-column prop="name" label="积分配置名称" align="center"></el-table-column>
                      <el-table-column prop="coopera_name" label="所属合作社" width="200" show-overflow-tooltip v-if="isAdmin"  align="center"></el-table-column>
                      <el-table-column prop="type" label="积分类型" align="center"></el-table-column>
                      <el-table-column prop="inter_type_name" label="积分累计方式" align="center"></el-table-column>
                      <el-table-column label="积分兑换比例" align="center">
                          <template slot-scope="scope">
                              <span v-if="scope.row.inter_type == 1">{{scope.row.money + '(元) : ' + scope.row.num+'(积分)'}}</span>
                              <span v-if="scope.row.inter_type == 2">{{scope.row.num+'(积分)'}}</span>
                          </template>
                      </el-table-column>
                      <!-- <el-table-column prop="note" label="备注" align="center"></el-table-column> -->
                      <el-table-column prop="add_time" label="创建时间" align="center" width="140"></el-table-column>
                      <el-table-column prop="worker_name" label="创建人" align="center"></el-table-column>
                      <el-table-column  label="操作" align="center" v-if="isEdit" width="100">
              <template slot-scope="scope">
                <el-button plain type="primary" size="small"  @click="editPointSetting(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
                  </el-table>
              </template>
              <template v-if="!data || data.length == 0">
                  <div class="no-data-con" >
                      <div class="absolute-center">
                          <div class="err-info-text ">暂无积分规则列表</div>
                      </div>
                  </div>
              </template>
              <el-pagination @current-change="handleCurPageChange" v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10"> </el-pagination>
          </div>
      </el-tabs>

        <el-dialog :title="(ruleForm.inter_id ? '编辑' : '添加') + '【'+ intergalSourceText +'】积分配置'" :visible.sync="formDialog" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
				<el-form-item label="规则名称" prop="name">
					<el-input v-model="ruleForm.name" placeholder="请输入规则名称"></el-input>
				</el-form-item>
                <el-form-item label="积分规则" prop="inter_type">
					<el-select v-model="ruleForm.inter_type" filterable placeholder="请选择积分规则">
                        <el-option v-for="(item,index) in interTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="金额" prop="money" v-if="ruleForm.inter_type == 1">
					<el-input v-model="ruleForm.money" placeholder="请输入金额"></el-input>
				</el-form-item>
                <el-form-item label="积分数" prop="num">
					<el-input v-model="ruleForm.num" placeholder="请输入积分数"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="formDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>

export default {
  name: "pointSetting",
  data() {
    var checkNum = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入数字'));
        }
        let numReg = /^[0-9]*[1-9][0-9]*$/;
        if (!numReg.test(value)) {
        callback(new Error('请输入正确的数字'));
        } else {
            callback();
        }
    }
    var checkPrice = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入金额'));
        }
        let priceReg = /^\d+$|^\d*\.\d+$/;
        if (!priceReg.test(value)) {
        callback(new Error('请输入正确的金额'));
        } else {
            callback();
        }
    };
    return {
	  ruleName: '',
      data: [],
	  curPage: 1,
	  totalPage: null,
      loading: false,

      ruleForm: {
          name: '',
          inter_type: '',
          type: 1 , //1-商城积分
          money: '',
          num: '',
          inter_id: '',
      },
      rules: {
        name: [
            { required: true, message: "请输入规则名称", trigger: "blur" }
        ],
        inter_type: [
            { required: true, message: "请选择积分规则规则", trigger: "change" }
        ],
        money: [
            { required: true, validator: checkPrice, trigger: "blur" }
        ],
        num: [
            { required: true, validator: checkNum, trigger: "blur" }
        ]
      },
      interTypeList: [{
          name: '交易额累计',
          id: '1'
      },{
          name: '交易次数',
          id: '2'
      }],

      intergalSource: '1', //当前积分来源类型
      intergalSourceText: '商城购买积分', // 当前积分来源类型文字
      intergalSourceList: [],// 积分来源列表

      formDialog: false,
      submitLoading: false,

      isEdit: false,//是否有编辑权限
      isAdd: false,// 是否有添加权限

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      cooperaId: '', //合作社id
      cooperativeList:[],
      
      activeMenu: '0',
      activeMenuArr: [],
      adminLoading: false,
      cooperationInfo: '',
    };
  },
  activated() {
    this.loading = true
    this.initData()
    this.handlePermission()
  },	
  methods: {
	// 初始化信息
	initData() {
        this.data = []
        this.curPage = 1
        this.totalPage = null
        this.ruleName = ''
        this.getIntergalSourceList(true)
    },
    // 获取积分来源列表
    getIntergalSourceList(isFirst) {
      let that = this
      that.ajax('interClass',{},'获取来源列表失败',res =>{
        if(res.errno == 0) {
           res.data.forEach(item =>{
                item.id = item.id+''
            })
          that.intergalSourceList = res.data
          if(isFirst) {
            that.intergalSource = res.data[0].id
            that.intergalSourceText = res.data[0].name
          }
          that.getPointSettingList()
        }
      })
    },
    // 切换积分来源模板
    handleClick(tab, event) {
      console.log(tab)
          // this.intergalSource = tab.name
          // this.intergalSourceText = tab.label
        this.getIntergalSourceList()
    },
    // 判断当前页面都有什么权限
	handlePermission() { 
		let that = this;
		that.utils.getPermissionList(that,data =>{
			data.forEach(item =>{
				if(item.title == '编辑') {
					that.isEdit = true
				}	
				if(item.title == '添加') {
					that.isAdd = true
				}	
			})
		})
	},
    // 搜索
    search() {
        this.data = []
        this.curPage = 1
        this.totalPage = null
        this.getPointSettingList()  
    },
	// 获取积分规则列表
	getPointSettingList(isAddEdit) {
        let that = this
        if(isAddEdit) {
            that.adminLoading = false
            that.loading = false
        } else {
            if(that.isAdmin) {
                that.adminLoading = true
            } else {
                that.loading = true
            }
        }
		    that.ajax('interLIsts',{
            page: that.curPage,
            size: 10,
            name: that.ruleName,
            type: that.intergalSource
        },'获取积分规则列表失败',res =>{
            that.loading = false
            that.adminLoading = false
			if(res.errno == 0) {
                that.curPage = Number(res.data.current_page)
				that.totalPage = res.data.total
				that.data = res.data.data
			}
		}, err =>{
            that.loading = false
            that.adminLoading = false
		})
    },
    // 添加规则
    addPointSetting() {
        this.ruleForm = {
          name: '',
          inter_type: '',
          type: this.intergalSource,//1-商城积分
          money: '',
          num: '',
          inter_id: '',
        }
        this.formDialog = true
    },
     // 编辑规则
    editPointSetting(row) {
        this.ruleForm = {
          name: row.name,
          inter_type: row.inter_type+'',
          type: this.intergalSource , //1-商城积分
          money: row.money,
          num: row.num,
          inter_id: row.inter_id,
        }
        this.formDialog = true
    },
    // 提交添加修改form
    submitForm(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
			  that.submitLoading = true
			  let params = JSON.parse(JSON.stringify(that.ruleForm))
              that.ajax(params.inter_id ? 'interEdit' : 'interAdd',params,(params.inter_id ? '编辑' : '添加') +'积分规则失败',res =>{
                that.submitLoading = false
                if(res.errno == 0) {
                    that.$message.success((params.inter_id ? '编辑' : '添加')+'积分规则成功')
                    that.getPointSettingList(true)
                    that.formDialog = false
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
    // 处理分页
	handleCurPageChange(val) {
		this.curPage = val;
		this.getPointSettingList()
	},
  }
};
</script>
<style lang="less">
.point-setting {
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
	
    }
    .el-dialog {
        width: 30%;
		.el-form {
			padding: 0 1rem;
			.el-form-item__content {
				.el-input {
					width: 100%;
				}
			}
        }
	}
 
}

</style>