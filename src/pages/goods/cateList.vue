<template>
    <div class="cateList"  v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>{{adminType == 1 ? '供应商城' : '合作商城'}}</el-breadcrumb-item>
                    <el-breadcrumb-item class="breadcrumb-tit">店铺分类列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <el-button size="small" @click="initData()">刷新</el-button>
        </div>
         <div class="btns-manage">
          <el-button size="mini" type="success" round  @click="getData" v-if="adminType == 3">管理我的合作社</el-button>
          <el-button size="mini" type="warning"  round @click="chooseCoopera" v-if="adminType != 0">查看下级合作社</el-button>
        </div>
        <div class="tip" :class="{'manage-tip':!selectName}" v-if="adminType != 0">
          <span v-if="selectName">正在查看下级【{{selectName}}】的数据</span>
          <span v-else>正在管理我的合作社</span>
        </div>
        <el-button type="primary" size="small" @click="add" v-if="isAdd">添加分类</el-button>
        <div class="table-con">
            <div>
              <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
                <el-table-column prop="cate_id" label="ID" width="70" align="center"></el-table-column>
                <el-table-column prop="cate_name" label="分类名称" align="center"></el-table-column>
                <el-table-column prop="assort_name" label="分类图标" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" alt="" v-if="scope.row.icon">
                    </template>
                </el-table-column>
                <el-table-column prop="coopera_name" label="所属合作社" width="200" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="cate_code" label="分类编码" align="center" ></el-table-column>
                <el-table-column prop="is_mobile_show" label="是否手机端展示" align="center">
                    <template slot-scope="scope">
                        {{scope.row.is_mobile_show==1?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="is_recommend" label="是否手机端菜单显示" align="center">
                    <template slot-scope="scope">
                        {{scope.row.is_recommend==1?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="log_date" label="操作" v-if="isDel || isEdit">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row.cate_id,scope.row.cate_name,scope.row.icon,scope.row.is_mobile_show,scope.row.is_recommend)" v-if="isEdit">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.cate_id)" v-if="isDel">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>
              <el-pagination v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10" @current-change="handleCurPageChange"> </el-pagination>
          </div>
          <div v-if="!tableData || tableData.length == 0">
              <div class="no-data-con" >
                  <div class="absolute-center">
                      <div class="err-info-text ">暂无信息</div>
                  </div>
              </div>
          </div>
        </div>
        <el-dialog :title="title" :visible.sync="isCate">
          <div class="add">
            <p>
                商城分类：
                <el-select v-model="assort_name" placeholder="请选择商城分类" @change="changeAssort">
                    <el-option v-for="(item,index) in assortOptions" :key="index" :label="item.assort_name" :value="item.assort_name"></el-option>
                </el-select>
            </p>
            
            <p>
              商品分类:
              <el-input v-model="cate_name" placeholder="请输入商品分类"></el-input>
            </p>
            <p>
              商品图标:
              <el-upload
                  class="avatar-uploader"
                  action="http://coopera.xfd365.com/user/auth/uploadImg"
                  :show-file-list="false"
                  :on-success="handlePic"
                  :on-error="uploadErr">
                  <img :src="icon" alt="" v-if="icon">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
            <p>
              手机端显示:
              <el-radio-group v-model="is_mobile_show">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </p>
            <p>
              菜单显示:
              <el-radio-group v-model="is_recommend">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </p>

            <el-button type="primary" :loading="submitLoading" @click="submit">{{submitLoading ? '提交中...' : '确认'}}</el-button>
          </div>
        </el-dialog>

        <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
    </div>
</template>
<script>
import myDrawer from "../../components/drawer.vue";
export default {
  name: "cateList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: null,
      loading: true,

      isCate: false,
      title: "添加分类",
      cate_name: "",
      icon: "",
      cate_id: "", //编辑分类时用的
      submitLoading: false,
      
      assort_name:'',
      assortOptions:[],

      is_mobile_show: 1,
      is_recommend:1,

      isEdit: false, //是否有编辑权限
      isDel: false, //是否有删除权限
      isAdd: false, //是否有添加权限
 
      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      adminCooperaId: '',
      cooperaId: '', //合作社id
      cooperativeList:[],

      cooperationInfo: '',

      drawer: false,
      selectName: '',
      level2List: [],
    };
  },
  components: { myDrawer },
  activated() {
    this.initEventWatch()
    this.selectName = '';
    this.level2List = []
     let adminType = localStorage.getItem('is_admin')
      if(adminType && Number(adminType) >= 1) {
        this.isAdmin = true
        this.adminType = adminType
      }
      if(this.isAdmin) {
        let cooperationInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
        if(cooperationInfo) {
          this.cooperationInfo = cooperationInfo
          this.adminCooperaId = cooperationInfo.id
        }
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
         this.initData();
      }
    // this.handlePermission()
  },
  watch:{
      isCate(newVal,oldVal){
          if(newVal){
              // 店铺分类
            this.ajax(
                "cateList",
                {
                table: "assort"
                },
                "",
                res => {
                this.loading = false;

                if (res.errno == 0) {
                    this.assortOptions = res.data;
                }
                },
                err => {
                this.loading = false;
                }
            );
          }
      }
  },
  methods: {
    initData() {
      this.selectName = '';
      this.level2List = []
      this.tableData = [];
      this.curPage = 1;
      this.loading = true;
      this.title = "添加分类";
      this.isCate = false;
      this.cate_name = "";
      this.icon = "";
      this.cate_id = "";
      if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
          this.cooperaId = this.cooperativeList[1].coopera_id
      } else {
          this.cooperaId = ''
          if(this.cooperativeList && this.cooperativeList.length > 0) {
            this.selectName = this.cooperativeList[0].coopera_name
          }
      }
      this.cateList();
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
          this.tableData = []
          this.curPage = 1
          this.totalPage = null
          this.cooperaId = row.coopera_id
          this.selectName = row.coopera_name
          this.cateList()
        }
      })
      eventWatch.$on('selectLevel2', row=>{
        this.level2List.forEach(item =>{
          this.$set(item,'isSelect', false)
        })
        this.$set(row,'isSelect', true)

        this.tableData = []
        this.curPage = 1
        this.totalPage = null
        this.cooperaId = row.coopera_id
        this.selectName = row.coopera_name
        this.cateList()
      })
    },
    // 获取我的合作社数据
      getData() {
      if(!this.selectName) return
          let cooperaInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
          this.tableData = []
          this.curPage = 1
          this.totalPage = null
          this.cooperaId = cooperaInfo ? cooperaInfo.id : ''
          this.selectName = ''
          this.level2List = []
          this.cateList()
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
    // initData() {
    //   this.tableData = [];
    //   this.curPage = 1;
    //   this.loading = true;
    //   this.title = "添加分类";
    //   this.isCate = false;
    //   this.cate_name = "";
    //   this.icon = "";
    //   this.cate_id = "";
    // },
    // 店铺分类
    cateList() {
      this.loading = true
      this.ajax(
        "cateList",
        {
          table: "cate",
          coopera_id: this.cooperaId
        },
        "",
        res => {
          this.loading = false;
          this.drawer = false
          if (res.errno == 0) {
            this.tableData = res.data;
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    handleCurPageChange(val) {
      this.curPage = val;
      this.cateList();
    },
    // 上传视频
    handlePic(res, file) {
      if (res.errno == 0) {
        this.icon = res.data.url;
        this.$forceUpdate();
        this.$message("上传成功");
      }
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024 < 10;
      if (
        fileType.search("jpg") < 0 &&
        fileType.search("jpeg") < 0 &&
        fileType.search("png") < 0 &&
        fileType.search("JPG") < 0 &&
        fileType.search("PNG") < 0
      ) {
        this.$message.error("图片类型必须是jpeg,jpg,png中的一种");
        return false;
      }
    },
    // 上传图片失败
    uploadErr() {
      this.$message.error("上传图片失败");
    },

    // 切换商城分类
    changeAssort(val){
        this.cate_name = this.assort_name
    },

    // 添加分类
    add() {
      this.isCate = true;
      this.cate_name = "";
      this.icon = "";
      this.title = "添加分类";
      this.cate_id = "";
      this.assort_name = ''
    },
    // 添加、编辑分类
    submit() {
      if (this.cate_name == "") {
        this.$message.error("请填写分类名");
        return;
      }
      if (this.icon == "") {
        this.$message.error("请上传图标");
        return;
      }
      let cate_id = "";
      if (this.cate_id != "") {
        cate_id = this.cate_id;
      } else {
        cate_id = "";
      }
      this.submitLoading = true;
      this.ajax(
        "cateAdd",
        {
          cate_name: this.cate_name,
          pid:'',
          is_show:1,
          is_mobile_show:this.is_mobile_show,
          is_recommend:this.is_recommend,
          icon: this.icon,
          cate_id: cate_id
        },
        "失败",
        res => {
          this.submitLoading = false;
          if (res.errno == 0) {
            this.isCate = false;
            this.cateList();
            if (this.cate_id != "") {
              this.$message.success("编辑成功");
            } else {
              this.$message.success("添加成功");
            }
          } else {
            this.$message.error(res.errmsg);
          }
        },
        err => {
          this.submitLoading = false;
        }
      );
    },

    // 编辑
    edit(id, name, icon,is_mobile_show,is_recommend) {
      this.isCate = true;
      this.title = "编辑分类";
      this.cate_id = id;
      this.cate_name = name;
      this.icon = icon;
      this.is_mobile_show = Number(is_mobile_show);
      this.is_recommend = Number(is_recommend);
    },

    // 删除分类
    del(id) {
      this.$confirm("此操作将删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ajax(
            "cateDel",
            {
              table: "cate",
              id: id,
              is_show: 0
            },
            "删除失败",
            res => {
              if (res.errno == 0) {
                this.$message.success("删除成功");
                this.cateList()
              }
            },
            err => {}
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less">
.cateList {
  padding: 20px;
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .el-table {
    img {
      width: 60px;
      height: 60px;
    }
  }

  .add {
    p {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding-left: 30%;
      >.el-input {
        width: 40%;
        margin-left: 10px;
      }
    }
    .el-radio {
        margin-left: 10px;
      }
    .el-button {
      display: block;
      margin: 20px auto;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin-left: 10px;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .el-upload img {
      width: 100px;
      height: 100px;
    }
  }
}
.admin-tmp-con { 
  padding: 0;
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  .breadcrumb-con {
    margin-bottom: 0;
  }
  .admin-con {
    display: flex;
    width: 100%;
    height: 100%;
    .org-menu-con {
      width: 16rem;
      height: 100%;
      background: #F8FCFF;
      .level2-title {
          color: #8F9BA7;
      }
      .level2-title::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 35px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #8F9BA7;
        transform: translateY(-50%);
      }
      .is-opened {
        .el-icon-arrow-down {
          color: #409EFF;
        }
        .is-active {
          .level2-title {
            color: #409EFF;
          }
          .level2-title::after {
            background: #409EFF;
          }
        }
        
      }
      .is-active {
        background: #fff!important;
      }
      .menu-title {
        width: 10rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .menu-item-title {
        width: 7.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .no-menu-con {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .menu-absolute-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          .text {
            font-size: 0.9rem;
            color: #999;

          }
        }
      }
    }
    .right-con {
      position: relative;
      width: calc(100% - 16rem);
      height: 99%;
      padding: 10px;
      .info-con {
        position: relative;
        width: 100%;
        padding-top: 10px;
      }
      .operate-con {
        padding: 0;
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
          margin-right: 0;
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
     
      .operate-con+.el-table {
        margin-top: 10px;
      }
    }
    
    .hide-menu {
      width: 54px;
    }
    .page-con {
      position: absolute;
      bottom: 0;
      right: 5rem;
    }
  }
}

.admin-tmp-con { 
  padding: 0;
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  .breadcrumb-con {
    margin-bottom: 0;
  }
  .admin-con {
    display: flex;
    width: 100%;
    height: 100%;
    .org-menu-con {
      width: 16rem;
      height: 100%;
      background: #F8FCFF;
      .level2-title {
          color: #8F9BA7;
      }
      .level2-title::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 35px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #8F9BA7;
        transform: translateY(-50%);
      }
      .is-opened {
        .el-icon-arrow-down {
          color: #409EFF;
        }
        .is-active {
          .level2-title {
            color: #409EFF;
          }
          .level2-title::after {
            background: #409EFF;
          }
        }
        
      }
      .is-active {
        background: #fff!important;
      }
      .menu-title {
        width: 10rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .menu-item-title {
        width: 7.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .no-menu-con {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .menu-absolute-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          .text {
            font-size: 0.9rem;
            color: #999;

          }
        }
      }
    }
    .right-con {
      position: relative;
      width: calc(100% - 16rem);
      height: 99%;
      padding: 10px;
      .info-con {
        position: relative;
        width: 100%;
        padding-top: 10px;
      }
      .operate-con {
        padding: 0;
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
          margin-right: 0;
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
     
      .operate-con+.el-table {
        margin-top: 10px;
      }
    }
    
    .hide-menu {
      width: 54px;
    }
    .page-con {
      position: absolute;
      bottom: 0;
      right: 5rem;
    }
  }
}
</style>