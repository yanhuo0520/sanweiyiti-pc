<template>
  <div class="teamPeopleList" v-loading="loading">
    <div class="breadcrumb-con">
      <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
      <div class="breadcrumb-info">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>分销管理</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-tit">分销团队管理列表</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-tit">团队成员列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="small" style="margin-right: 20px;" @click="initData()">刷新</el-button>
      <div class="back-con" @click="goBack">
        <img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
        <span class="back-text">返回上一页</span>
      </div>
    </div>
    <div class="table-con">
      <template v-if="tableData && tableData.length > 0">
        <el-table :data="tableData" border>
          <el-table-column prop="user_id" label="ID" width="70" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="mem_status" label="状态" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.mem_status == 0">
                <el-tag size="medium" type="warning">该团团长不可分销</el-tag>
              </template>
              <template v-if="scope.row.mem_status == 1">
                <el-tag size="medium" type="success">审核通过</el-tag>
              </template>
              <template v-if="scope.row.mem_status == 2">
                <el-tag size="medium" type="info">待审核</el-tag>
              </template>
              <template v-if="scope.row.mem_status == 3">
                <el-tag size="medium" type="danger">驳回</el-tag>
              </template>
            </template>
          </el-table-column>
          <!-- 成员状态：0转为该团团长不可分销了，1审核通过，2待审核，3驳回 -->
          <el-table-column prop="add_date" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="member_profit" label="作为团员时所得总分润" align="center"></el-table-column>
          <el-table-column prop="owner_profit" label="作为团长时所得总分润" align="center"></el-table-column>
          <el-table-column prop="sum_profit" label="作为团长或团员累计收益" align="center"></el-table-column>
          <el-table-column prop="total_profit" label="剩余收益" align="center"></el-table-column>
        </el-table>
        <el-pagination background v-if="totalPage && totalPage > 0" :current-page="curPage" layout="prev, pager, next"
          :total="totalPage*10" @current-change="handleCurPageChange"></el-pagination>
      </template>
      <div v-if="!tableData || tableData.length == 0">
        <div class="no-data-con">
          <div class="absolute-center">
            <div class="err-info-text ">暂无团队成员数据数据</div>
          </div>
        </div>
      </div>
    </div>
    <my-drawer :drawer="drawer" :cooperativeList="cooperativeList" :level2List="level2List"></my-drawer>
  </div>
</template>
<script>
  import myDrawer from "../../components/drawer.vue";

  export default {
    name: "teamPeopleList",
    data() {
      return {
        tableData: [],
        curPage: 1,
        totalPage: null,
        loading: true,

        isApprove: false, // 是否有审批权限

        isAdmin: false, // 是否为管理员
        adminType: "", // 管理员类型
        cooperaId: "", //合作社id
        cooperativeList: [],

        adminLoading: false,
        cooperationInfo: "",

        drawer: false,
        isLook: false,
        selectName: "",
        level2List: [],


        lastPath: '',
        lastPathName: '',
        team_id: '',
        isRefresh: 1,
      };
    },
    components: {
      myDrawer
    },
    activated() {
      this.initData();
    },
    methods: {
      // 返回上一页
      goBack() {
        this.$router.push({
          path: this.lastPath,
          query: {
            isRefresh: this.isRefresh
          }
        })
      },
      initData() {
        this.lastPath = this.$route.query.lastPath
        this.team_id = this.$route.query.team_id
        this.teamList();
      },
      // 判断当前页面都有什么权限
      handlePermission() {
        let that = this;
        that.utils.getPermissionList(that, data => {
          data.forEach(item => {
            if (item.title == "查看") {
              that.isLook = true
            }
          });
        });
      },
      // 获取分销团队列表
      teamList() {
        this.loading = true;
        this.ajax(
          "memberList", {
            team_id: this.team_id
          },
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
          "goodsOnSale", {
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
      // toPeopleList(row) {
      //   this.$router.push({
      //     path: "/distributionList",
      //     query: {
      //       tag: "approve",
      //       team_id: row.team_id,
      //       isEdit: false,
      //       lastPath: "/teamPeopleList",
      //       isApprove: this.isApprove
      //     }
      //   });
      // },
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
            .then(({
              value
            }) => {
              this.goodsVerifyApi(type, row, index, value);
            })
            .catch(() => {});
        }
      },
      // 请求商品审核API
      goodsVerifyApi(status, row, index, value) {
        this.ajax(
          "goodsVerify", {
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
  .teamPeopleList {
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