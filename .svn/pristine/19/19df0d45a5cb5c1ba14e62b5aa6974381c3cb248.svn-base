<template>
    <div class="distributionList"  v-loading="loading">
      <div class="breadcrumb-con">
          <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
          <div class="breadcrumb-info">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                   <el-breadcrumb-item>分销管理</el-breadcrumb-item>
					<el-breadcrumb-item  class="breadcrumb-tit">分销团队管理列表</el-breadcrumb-item>
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
        <div class="table-con">
			<template v-if="tableData && tableData.length > 0">
				<el-table :data="tableData" border >
						<el-table-column prop="team_id" label="团队ID" width="70" align="center"></el-table-column>
						<el-table-column prop="team_name" label="团队名称"  show-overflow-tooltip align="center" ></el-table-column>
            <el-table-column prop="name" label="团长" align="center"  show-overflow-tooltip></el-table-column>
            <!-- 团队状态：0关闭团体，1审核通过，2待审核，3驳回 -->
            	<el-table-column prop="team_status" label="团队状态"  show-overflow-tooltip align="center" >
                	<template slot-scope="scope">
									<template v-if="scope.row.team_status == 0">
										<el-tag size="medium" type="warning">关闭团体</el-tag>
									</template>
									<template v-if="scope.row.team_status == 1">
										<el-tag size="medium" type="success">审核通过</el-tag>
									</template>
									<template v-if="scope.row.team_status == 2">
										<el-tag size="medium" type="info">待审核</el-tag>
									</template>
                     <template v-if="scope.row.team_status == 3">
										<el-tag size="medium" type="danger">驳回</el-tag>
									</template>
								</template>
              </el-table-column>
						
						<el-table-column prop="num" label="成员数" align="center"  ></el-table-column>
						<el-table-column prop="all_profit" label="团队业务收入" align="center"></el-table-column>
						<el-table-column prop="business_num" label="交易笔数" align="center" ></el-table-column>
						<el-table-column  label="操作" align="center" :width="'300'" fixed="right">
							<template slot-scope="scope">
								<el-button  plain size="small" @click="toPeopleList(scope.row)">查看团队成员</el-button>
								<el-button  plain size="small" @click="toGoodsList(scope.row)">查看分销商品</el-button>
                 <el-button v-if="scope.row.team_status == 2"  type="primary" size="small"  @click="handleBtn(1,scope.row)">审核</el-button>
							</template>
						</el-table-column>
              
					</el-table>
				<el-pagination background v-if="totalPage && totalPage > 0" :current-page="curPage" layout="prev, pager, next" :total="totalPage*10" @current-change="handleCurPageChange"></el-pagination>
			</template>
			<div v-if="!tableData || tableData.length == 0">
				<div class="no-data-con" >
					<div class="absolute-center">
						<div class="err-info-text ">暂无团队数据数据</div>
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
  name: "distributionList",
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
      isLook:false,
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
          if (item.title == "查看") {
            that.isLook = true
          }
          	if(item.title == '审批') {
            that.isApprove = true
          }	
        });
      });
    },
    // 获取分销团队列表
    amountList() {
      this.loading = true;
      this.ajax(
        "teamLists",{},
        "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
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
    // 团队列表
    toPeopleList(row) {
      this.$router.push({
        path: "/teamPeopleList",
        query: {
          team_id: row.team_id,
          isEdit: false,
          lastPath: "/distributionList",
        }
      });
    },
    // 商品列表
    toGoodsList(row){
      this.$router.push({
        path: "/goodsAuditByDistr",
        query: {
          team_id: row.team_id,
          isEdit: false,
          lastPath: "/distributionList",
        }
      });
    },
    //审核按钮
    handleBtn(type, row) {
      //1-同意 2-拒绝
      if (type == 1) {
        this.$confirm("是否同意审核?", "提示", {
          confirmButtonText: "同意",
          cancelButtonText: "拒绝",
          type: "warning",
          center: true
        })
          .then(() => {
            this.goodsVerifyApi(type, row);
          })
          .catch(() => {
             this.$prompt("请输入拒绝原因", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPlaceholder: "请输入拒绝原因",
              type: "warning",
              center: true
            })
              .then(({ value }) => {
                this.goodsVerifyApi(2, row);
              })
              .catch(() => {});
          }); 
      }
    },
    // 请求商品审核API
    goodsVerifyApi(status, row) {
      this.ajax(
        "updateTeamStatus",
        {
          team_id: row.team_id,
          team_status: status,
        },
        (status == 1 ? "同意" : "拒绝") + "失败",
        res => {
          if (res.errno == 0) {
              this.amountList();
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
.distributionList {
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