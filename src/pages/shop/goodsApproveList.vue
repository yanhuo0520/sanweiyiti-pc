<template>
    <div class="goods-approve-list"  v-loading="loading">
      <div class="breadcrumb-con">
          <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
          <div class="breadcrumb-info">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                    <!-- <el-breadcrumb-item>合作商城'</el-breadcrumb-item> -->
                  <el-breadcrumb-item  class="breadcrumb-tit">商品审核列表</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          <el-button size="small" @click="initData()">刷新</el-button>
      </div>
        <div class="operate-con clearfix">
          <div class="search-con"  >
              <el-form class="clearfix"  label-width="80px">
                <el-form-item label="商品名称">
                  <el-input placeholder="请输入商品名称" v-model="goods_name" clearable=""></el-input>
                </el-form-item>
                <el-form-item label="一级分类">
                  <el-select v-model="assort_id" placeholder="请选择一级分类" @change="changeCate">
                    <el-option v-for="(item,index) in assortOptions" :key="index" :label="item.assort_name" :value="item.assort_id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                  <el-select v-model="son_assort_id" placeholder="请选择二级分类">
                    <el-option v-for="(item,index) in cateOptions" :key="index" :label="item.assort_name" :value="item.assort_id"></el-option>
                  </el-select>
                </el-form-item>
                <el-button style="margin-left:15px" type="primary" size="small" :loading="loading" @click="amountList()">{{loading ? '获取数据中...' : '查询'}}</el-button>
              </el-form>
          </div>
      </div>
      <div class="btns-manage">
          <el-button size="mini" type="success" round  @click="getData" v-if="adminType == 3">管理我的合作社</el-button>
          <el-button size="mini" type="warning"  round @click="chooseCoopera" v-if="adminType != 0">查看下级合作社</el-button>
        </div>
        <div class="tip" :class="{'manage-tip':!selectName}" v-if="adminType != 0">
          <span v-if="selectName">正在查看下级【{{selectName}}】的数据</span>
          <span v-else>正在管理我的合作社</span>
        </div>
        <div class="table-con">
			<template v-if="tableData && tableData.length > 0">
				<el-table :data="tableData" border >
						<el-table-column prop="goods_id" label="ID" width="70" align="center"></el-table-column>
						<el-table-column prop="goods_name" label="商品名称" width="120" show-overflow-tooltip align="center"></el-table-column>
						<el-table-column prop="coopera_name" label="所属合作社" align="center" width="180" show-overflow-tooltip></el-table-column>
						<el-table-column prop="storage" label="库存" align="center" ></el-table-column>
						<el-table-column prop="retail_price" label="价格" align="center"></el-table-column>
						<el-table-column prop="assort_name" label="一级分类" align="center">
              <template slot-scope="scope">
                  {{scope.row.assort_name ? scope.row.assort_name : '-'}}
                </template>
            </el-table-column>
						<el-table-column prop="son_assort_name" label="二级分类" align="center">
              <template slot-scope="scope">
                  {{scope.row.son_assort_name ? scope.row.son_assort_name : '-'}}
                </template>
            </el-table-column>
						<el-table-column prop="add_time" label="申请时间" align="center" width="140"></el-table-column>
						<el-table-column  label="操作" align="center" :width="isApprove ? '240' : '160'" fixed="right">
							<template slot-scope="scope">
								<el-button  plain size="small" @click="toDetail(scope.row)">查看详情</el-button>
								<template v-if="isApprove">
									<el-button plain type="primary" size="small" @click="handleBtn(1,scope.row,scope.$index)">同意</el-button>
									<el-button plain type="danger" size="small" @click="handleBtn(2,scope.row,scope.$index)">拒绝</el-button>
								</template>
							</template>
						</el-table-column>
					</el-table>
				<el-pagination background v-if="totalPage && totalPage > 0" :current-page="curPage" layout="prev, pager, next" :total="totalPage*10" @current-change="handleCurPageChange"></el-pagination>
			</template>
			<div v-if="!tableData || tableData.length == 0">
				<div class="no-data-con" >
					<div class="absolute-center">
						<div class="err-info-text ">暂无审批数据</div>
					</div>
				</div>
			</div>
        </div>
         <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List" ></my-drawer>
    </div>
</template>
<script>
import myDrawer from "../../components/drawer.vue";

export default {
  name: "goodsApproveList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: null,
      loading: true,

      date: "",
      assort_id: "",
      son_assort_id: "",
      goods_name: "",
      assortOptions: [],
      cateOptions: [],
      radio: "1",

      isApprove: false, // 是否有审批权限

      isAdmin: false, // 是否为管理员
      adminType: "", // 管理员类型
      cooperaId: "", //合作社id
      cooperativeList: [],

      adminLoading: false,
      cooperationInfo: "",

      drawer: false,
      selectName: "",
      level2List: []
    };
  },
  components: { myDrawer },
  activated() {
    this.initEventWatch();
    let isRefresh = this.$route.query.isRefresh; // 1不刷新 2或者undefined刷新
    if (isRefresh && isRefresh == 1) return;
    this.selectName = "";
    this.level2List = [];
    this.loading = true;
    //判断是否为管理员
    let adminType = localStorage.getItem("is_admin");
    if (adminType && Number(adminType) >= 1) {
      this.isAdmin = true;
      this.adminType = adminType;
    }
    if (this.isAdmin) {
      let cooperationInfo = localStorage.getItem("cooperationInfo")
        ? JSON.parse(localStorage.getItem("cooperationInfo"))
        : "";
      if (cooperationInfo) {
        this.cooperationInfo = cooperationInfo;
        this.adminCooperaId = cooperationInfo.id;
      }
      this.utils.getCooperativeList(
        this,
        data => {
          if (data && data.length > 1 && adminType == 3) {
            this.cooperaId = data[1].coopera_id;
          } else {
            this.cooperaId = "";
            this.selectName = data[0].coopera_name;
            data[0].isSelect = true;
          }
          this.cooperativeList = data;
          this.initData();
        },
        err => {
          this.loading = false;
        }
      );
    } else {
      this.initData();
    }
    this.assortList();
    this.cateList();
    this.handlePermission();
  },
  methods: {
    initData() {
      this.selectName = "";
      this.level2List = [];
      this.loading = true;
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null;
      this.assort_id = "";
      this.son_assort_id = "";
      if (
        this.cooperativeList &&
        this.cooperativeList.length > 1 &&
        this.adminType == 3
      ) {
        this.cooperaId = this.cooperativeList[1].coopera_id;
      } else {
        this.cooperaId = "";
        if (this.cooperativeList && this.cooperativeList.length > 0) {
          this.selectName = this.cooperativeList[0].coopera_name;
        }
      }
      this.amountList();
    },
    // 初始化 监听合作社选择组件事件
    initEventWatch() {
      eventWatch.$on("closeDrawer", res => {
        this.drawer = false;
      });
      eventWatch.$on("selectLevel1", row => {
        this.cooperativeList.forEach(item => {
          this.$set(item, "isSelect", false);
        });
        this.$set(row, "isSelect", true);
        this.level2List = [];
        if (row.coopera_id == row.parent_id && row.count > 1) {
          this.getLevel2Data(row);
        } else {
          this.data = [];
          this.curPage = 1;
          this.totalPage = null;
          this.cooperaId = row.coopera_id;
          this.selectName = row.coopera_name;
          this.amountList();
        }
      });
      eventWatch.$on("selectLevel2", row => {
        this.level2List.forEach(item => {
          this.$set(item, "isSelect", false);
        });
        this.$set(row, "isSelect", true);

        this.data = [];
        this.curPage = 1;
        this.totalPage = null;
        this.cooperaId = row.coopera_id;
        this.selectName = row.coopera_name;
        this.amountList();
      });
    },
    // 获取我的合作社数据
    getData() {
      if (!this.selectName) return;
      let cooperaInfo = localStorage.getItem("cooperationInfo")
        ? JSON.parse(localStorage.getItem("cooperationInfo"))
        : "";
      this.data = [];
      this.curPage = 1;
      this.totalPage = null;
      this.cooperaId = cooperaInfo ? cooperaInfo.id : "";
      this.selectName = "";
      this.level2List = [];
      this.amountList();
    },
    // 展开选择合作社
    chooseCoopera() {
      this.drawer = true;
      eventWatch.$emit("initData");
    },
    getLevel2Data(row, callBack) {
      this.ajax(
        "cooperativeLevelList",
        { parent_id: row.coopera_id },
        "获取合作社列表失败",
        res => {
          if (res.errno == 0) {
            res.data.forEach(item => {
              item.disabled = true;
            });
            this.level2List = res.data;
            callBack && typeof callBack == "function" && callBack();
          } else {
            this.level2List = [];
          }
        },
        err => {
          this.level2List = [];
        }
      );
    },
    // 判断当前页面都有什么权限
    handlePermission() {
      let that = this;
      that.utils.getPermissionList(that, data => {
        data.forEach(item => {
          if (item.title == "审核") {
            that.isApprove = true;
          }
        });
      });
    },
    changeCate(){
      this.cateList()
    },
    // 商城分类
    assortList() {
      this.ajax(
        "cateList",
        {},
        "",
        res => {
          if (res.errno == 0) {
            res.data.data.unshift({
              assort_name: "全部",
              assort_id: ""
            });
            this.assortOptions = res.data.data;
          }
        },
        err => {}
      );
    },
    // 店铺分类
    cateList() {
      this.ajax(
        "cateList",
        {assort_id: this.assort_id},
        "",
        res => {
          if (res.errno == 0) {
            res.data.data[0].son_data.unshift({
              assort_name: "全部",
              assort_id: ""
            });
            this.cateOptions = res.data.data[0].son_data;
          }
        },
        err => {}
      );
    },
    // 获取商品审核列表
    amountList() {
      this.loading = true;
      this.ajax(
        "goodsLists",
        {
          page: this.curPage,
          size: 10,
          goods_name: this.goods_name,
          son_assort_id: this.son_assort_id,
          assort_id: this.assort_id,
          check_status: 0,
          coopera_id: this.cooperaId
        },
        "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.drawer = false;
            res.data.data.forEach(item => {
              if (item.add_time) {
                item.add_time = this.utils.dateFormat(
                  "yyyy-MM-dd HH:mm:ss",
                  new Date(
                    (item.add_time + "").length == 10
                      ? item.add_time * 1000
                      : item.add_time
                  )
                );
              }
            });
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
      this.totalPage = null;
      this.amountList();
    },

    // 上下架
    changeRadio(val, id) {
      this.ajax(
        "goodsOnSale",
        {
          goods_id: id,
          on_sale: val
        },
        "失败",
        res => {
          if (res.errno == 0) {
            if (val == 0) {
              this.$message.success("下架成功");
            } else {
              this.$message.success("上架成功");
            }
          }
        },
        err => {}
      );
    },
    // 编辑
    toDetail(row) {
      this.$router.push({
        path: "/addGoodsByShop",
        query: {
          tag: "approve",
          goods_id: row.goods_id,
          isEdit: false,
          lastPath: "/goodsApproveListByShop",
          isApprove: this.isApprove
        }
      });
    },
    //审核按钮
    handleBtn(type, row, index) {
      //1-同意 2-拒绝
      if (type == 1) {
        this.$confirm("是否同意审核?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.goodsVerifyApi(type, row, index, "");
          })
          .catch(() => {});
      } else {
        this.$prompt("请输入拒绝原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入拒绝原因",
          type: "warning",
          center: true
        })
          .then(({ value }) => {
            this.goodsVerifyApi(type, row, index, value);
          })
          .catch(() => {});
      }
    },
    // 请求商品审核API
    goodsVerifyApi(status, row, index, value) {
      this.ajax(
        "goodsVerify",
        {
          goods_id: row.goods_id,
          status: status,
          note: value
        },
        (status == 1 ? "同意" : "拒绝") + "失败",
        res => {
          if (res.errno == 0) {
            this.tableData.splice(index, 1);
            if (this.tableData && this.tableData.length == 0) {
              this.amountList();
            }
            this.$message.success((status == 1 ? "同意" : "拒绝") + "成功");
          }
        },
        err => {}
      );
    }
  }
};
</script>
<style lang="less">
.goods-approve-list {
  padding: 20px;
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .operate-con {
    padding: 10px 0;
    .search-con {
      float: left;
      width: 100%;
      .el-form-item {
        width: 20%;
        float: left;
        margin-bottom: 0;
        .el-form-item__label {
          font-size: 0.9rem;
        }
        .el-form-item__content {
          margin-right: 30px;
          .el-select {
            width: 100%;
            .el-input {
              width: 100%;
            }
          }
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
    .admin-search-con {
      width: 85%;
      .el-form-item {
        width: 30%;
        .el-form-item__content {
          margin-right: 30px;
          .el-input {
            width: 80%;
          }
        }
        .el-range-editor {
          width: 100%;
        }
      }
    }
    .btn-con {
      float: right;
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
    .operate-con {
      .search-con {
        .el-form-item {
          width: 25%;
          float: left;
        }
      }
    }
    .org-menu-con {
      width: 16rem;
      height: 100%;
      background: #f8fcff;
      .level2-title {
        color: #8f9ba7;
      }
      .level2-title::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 35px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #8f9ba7;
        transform: translateY(-50%);
      }
      .is-opened {
        .el-icon-arrow-down {
          color: #409eff;
        }
        .is-active {
          .level2-title {
            color: #409eff;
          }
          .level2-title::after {
            background: #409eff;
          }
        }
      }
      .is-active {
        background: #fff !important;
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
          transform: translate(-50%, -50%);
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
      }
      .operate-con + .el-table {
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