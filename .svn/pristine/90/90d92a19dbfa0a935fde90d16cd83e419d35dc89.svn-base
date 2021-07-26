<template>
    <div class="cateList" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>供应商城</el-breadcrumb-item>
                    <el-breadcrumb-item class="breadcrumb-tit">店铺分类列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="operate-con clearfix">
					<div class="search-con"  >	</div>
          <div class="btn-con" v-if="!loading && isAdd">
            <el-button type="primary" size="small" @click="add('1',0)">添加分类</el-button>
          </div>
				</div>
        <div class="table-con">
          <div>
              <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
                <el-table-column type="expand">
                  <template slot-scope="props" v-if="props.row.son_data && props.row.son_data.length > 0">
                    <div class="histroy-tit">二级分类</div>
                    <el-table :data="props.row.son_data" border>
                      <el-table-column prop="assort_id" label="ID" width="70" align="center"></el-table-column>
                      <el-table-column prop="assort_name" label="分类名称" align="center"></el-table-column>
                      <el-table-column prop="assort_name" label="分类图标" align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" alt="" v-if="scope.row.icon">
                            <span v-else>-</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="log_date" label="操作" align="center" width="400" v-if="isEdit || isDel">
                        <template slot-scope="scope">
                            <el-button type="primary"  v-if="isEdit" plain size="small" @click="edit(scope.row.assort_id,scope.row.assort_name,scope.row.icon,'2',props.row.assort_id)" >编辑</el-button>
                            <el-button type="danger"  v-if="isDel" plain size="small" @click="del(scope.row.assort_id)" >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column prop="assort_id" label="ID" width="70" align="center"></el-table-column>
                <el-table-column prop="assort_name" label="分类名称" align="center"></el-table-column>
                <el-table-column prop="assort_name" label="分类图标" align="center">
                  <template slot-scope="scope">
                      <img :src="scope.row.icon" alt="" v-if="scope.row.icon">
                      <span v-else>-</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="cate_code" label="分类编码" align="center"></el-table-column>
                <el-table-column prop="is_mobile_show" label="是否手机端展示" align="center">
                  <template slot-scope="scope">
                      {{scope.row.is_mobile_show==1?'是':'否'}}
                  </template>
                </el-table-column>
                <el-table-column prop="is_recommend" label="是否手机端菜单显示" align="center">
                  <template slot-scope="scope">
                      {{scope.row.is_recommend==1?'是':'否'}}
                  </template>
                </el-table-column> -->
                <el-table-column prop="log_date" label="操作" align="center" width="400" v-if="isEdit || isDel">
                  <template slot-scope="scope">
                      <el-button v-if="isAdd" plain size="small" @click="add('2',scope.row.assort_id)">添加下级分类</el-button>
                      <el-button type="primary"  v-if="isEdit" plain size="small" @click="edit(scope.row.assort_id,scope.row.assort_name,scope.row.icon,'1',0)" >编辑</el-button>
                      <el-button type="danger"  v-if="isDel" plain size="small" @click="del(scope.row.assort_id)" >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next" :total="totalPage*10" @current-change="handleCurPageChange"> </el-pagination>
          </div>
          <div v-if="!tableData || tableData.length == 0">
              <div class="no-data-con" >
                  <div class="absolute-center">
                      <div class="err-info-text ">暂无店铺分类</div>
                  </div>
              </div>
          </div>
        </div>
        <el-dialog :title="title" :visible.sync="isCate">
          <div class="add">
            
            <p>
              {{tag == 1 ? '一级分类：' : '二级分类：'}}
              <el-input v-model="assort_name" :placeholder="tag == 1 ? '请输入一级分类' : '请输入二级分类'"></el-input>
            </p>
            <p>
              商品图标：
              <el-button @click="isPic = true">选择图片</el-button>
              
            </p>
            <!-- <p>
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
            </p> -->
            <el-button type="primary" :loading="submitLoading" @click="submit">{{submitLoading ? '提交中...' : '确认'}}</el-button>
          </div>
        </el-dialog>

        <el-dialog title="选择图片" :visible.sync="isPic" class="selectPic">
          <p>
            上传本地图片：
            <el-upload  class="avatar-uploader"  action="http://coopera.xfd365.com/user/auth/uploadImg" :show-file-list="false" :on-success="handlePic" :on-error="uploadErr">
              <img :src="icon" alt="" v-if="icon">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
          <div>
            <span v-for="(item,index) in picData" :key="index">
              <span v-if="curPic == index"><img src="../../../images/public/select-icon.png" alt=""></span>
              <img :src="item.icon" alt="" @click="curPic = index">
            </span>
          </div>
          <el-pagination v-if="picTotalPage && picTotalPage > 0" background :current-page="picPage" layout="prev, pager, next" :total="picTotalPage*10" @current-change="handlePicPageChange"> </el-pagination>
          <el-button @click="isPic = false; icon = picData[curPic].icon">使用选中的图片</el-button>
        </el-dialog>
    </div>
</template>
<script>
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
      assort_name: "",
      icon: "",
      assort_id: "", //编辑分类时用的
      submitLoading: false,

      assort_name: "",
      assortOptions: [],

      is_mobile_show: 1,
      is_recommend: 1,

      cooperaId: "",

      isEdit: false, // 是否有编辑权限
      isDel: false, //是否有删除权限
      isAdd: false, //是否有添加权限

      tag: 1,
      parent_id: 0,

      isPic: false,
      picData: [],
      picPage: 1,
      picTotalPage: null,
      curPic:''
    };
  },
  activated() {
    let cooperaInfo = localStorage.getItem("cooperationInfo")
      ? JSON.parse(localStorage.getItem("cooperationInfo"))
      : "";
    this.tableData = [];
    this.curPage = 1;
    this.totalPage = null;
    this.picPage = 1;
    this.picTotalPage = null;
    this.loading = true;
    this.title = "添加分类";
    this.isCate = false;
    this.assort_name = "";
    this.icon = "";
    this.assort_id = "";
    this.cooperaId = cooperaInfo ? cooperaInfo.id : "";
    this.iconList();
    this.cateList();
    this.handlePermission();
  },
  watch: {
    isCate(newVal, oldVal) {
      if (newVal) {
        // 店铺分类
        this.ajax(
          "cateList",
          {
            table: "assort",
            coopera_id: this.cooperaId,
            page: this.curPage,
            size: 10
          },
          "",
          res => {
            this.loading = false;

            if (res.errno == 0) {
              this.assortOptions = res.data.data;
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
      let cooperaInfo = localStorage.getItem("cooperationInfo")
        ? JSON.parse(localStorage.getItem("cooperationInfo"))
        : "";
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null;
      this.picPage = 1;
      this.picTotalPage = null;
      this.loading = true;
      this.title = "添加分类";
      this.isCate = false;
      this.assort_name = "";
      this.icon = "";
      this.assort_id = "";
      this.cooperaId = cooperaInfo ? cooperaInfo.id : "";
      this.cateList();
      this.iconList();
      this.handlePermission();
    },
    // 判断当前页面都有什么权限
    handlePermission() {
      let that = this;
      that.utils.getPermissionList(
        that,
        data => {
          data.forEach(item => {
            if (item.title == "编辑") {
              that.isEdit = true;
            }
            if (item.title == "删除") {
              that.isDel = true;
            }
            if (item.title == "添加") {
              that.isAdd = true;
            }
          });
        },
        "",
        "goods_mod_id"
      );
    },
    iconList() {
      this.ajax(
        "cateIconList",
        {
          page: this.picPage,
          size: 35
        },
        "",
        res => {
          if (res.errno == 0) {
            this.picData = res.data.data;
            this.picTotalPage = res.data.total;
          }
        },
        err => {}
      );
    },
    // 店铺分类
    cateList() {
      let cooperationInfo = localStorage.getItem("cooperationInfo")
        ? JSON.parse(localStorage.getItem("cooperationInfo"))
        : "";
      this.ajax(
        "cateList",
        {
          table: "cate",
          coopera_id: cooperationInfo ? cooperationInfo.id : "",
          page: this.curPage,
          size: 10
        },
        "",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.tableData = res.data.data;
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
      this.totalPage = null;
      this.tableData = [];
      this.cateList();
    },
    handlePicPageChange(val){
      this.picPage = val;
      this.picTotalPage = null;
      this.iconList();
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

    // 添加分类
    add(tag, id) {
      this.isCate = true;
      this.assort_name = "";
      this.icon = "";
      this.title = "添加分类";
      this.assort_id = "";
      this.assort_name = "";
      this.tag = tag;
      this.parent_id = id;
    },
    // 添加、编辑分类
    submit() {
      if (this.assort_name == "") {
        this.$message.error("请填写分类名");
        return;
      }
      if (this.icon == "") {
        this.$message.error("请上传图标");
        return;
      }
      let assort_id = "";
      if (this.assort_id != "") {
        assort_id = this.assort_id;
      } else {
        assort_id = "";
      }
      this.submitLoading = true;
      this.ajax(
        "assortAdd",
        {
          assort_name: this.assort_name,
          parent_id: this.parent_id,
          is_show: 1,
          icon: this.icon,
          assort_id: assort_id,
          level: this.tag //1一级分类 2二级分类
        },
        "失败",
        res => {
          this.submitLoading = false;
          if (res.errno == 0) {
            this.isCate = false;
            this.cateList();
            if (this.assort_id != "") {
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
    edit(id, name, icon, tag, parent_id) {
      this.isCate = true;
      this.title = "编辑分类";
      this.assort_id = id;
      this.assort_name = name;
      this.icon = icon;
      // this.is_mobile_show = Number(is_mobile_show);
      // this.is_recommend = Number(is_recommend);
      this.tag = tag;
      this.parent_id = parent_id;
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
              table: "assort",
              id: id,
              is_show: 0,
              coopera_id: this.cooperaId
            },
            "删除失败",
            res => {
              if (res.errno == 0) {
                this.$message.success("删除成功");
                this.cateList();
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
  .operate-con {
    padding: 10px 0;
    .search-con {
      float: left;
      width: 80%;
      .el-form-item {
        width: 30%;
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
              color: #3b6af1;
              background: #f0f8ff;
              font-size: 0.75rem;
              cursor: pointer;
            }
          }
        }
        .el-range-editor {
          width: 90%;
        }
      }
    }

    .btn-con {
      float: right;
    }
  }

  .el-table {
    img {
      width: 60px;
      height: 60px;
    }
  }
  .table-con {
    .histroy-tit {
      text-align: center;
      font-weight: bold;
      padding-bottom: 20px;
      font-size: 1.2rem;
    }
    
    .el-pagination {
      float: right;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }

  .add {
    p {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding-left: 30%;
      > .el-input {
        width: 40%;
        margin-left: 10px;
      }
      > .el-button {
        margin-left: 10px;
      }
    }
    .el-radio {
      margin-left: 10px;
    }
    > .el-button {
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

  .selectPic{
    div{
      display: flex;
      flex-wrap: wrap;
      >span{
        position: relative;
        >img{
          width: 120px;
          height: 120px;
          margin-bottom: 20px;
          margin-right: 10px;
          margin-left: 10px;
          cursor: pointer;
        }
        >span{
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          left: 10px;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
          line-height: 120px;
          color: #FFF;
          font-size: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          >img{
            width: 30px;
            height: 30px;

          }
        }
      }
    }
    .el-pagination{
      text-align: right;
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
    p{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }
}
</style>