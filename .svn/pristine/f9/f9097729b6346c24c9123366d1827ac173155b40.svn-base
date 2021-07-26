<template>
  <div class="goodsList" v-loading="loading">
    <div class="breadcrumb-con">
      <img class="left-icon" src="../../../images/breadcrumb-left-icon.png" alt="">
      <div class="breadcrumb-info">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>供应商城</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-tit">商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button size="small" @click="initData()">刷新</el-button>
    </div>
    <div class="operate-con clearfix">
      <div class="search-con">
        <el-form class="clearfix" label-width="80px">
          <el-form-item label="商品名称">
            <el-input placeholder="请输入商品名称" v-model="goods_name"></el-input>
          </el-form-item>
          <el-form-item label="一级分类">
            <el-select v-model="assort_id" placeholder="请选择一级分类" @change="changeCate">
              <el-option v-for="(item,index) in assortOptions" :key="index" :label="item.assort_name"
                :value="item.assort_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select v-model="son_assort_id" placeholder="请选择二级分类">
              <el-option v-for="(item,index) in cateOptions" :key="index" :label="item.assort_name"
                :value="item.assort_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分销商品">
            <el-select v-model="is_team_tg" @change="currentSel" placeholder="请选择分销商品">
              <el-option v-for="(item,index) in fxoptions" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" size="small" style="margin-left:15px" :loading="loading" @click="search()">
            {{loading ? '获取数据中...' : '查询'}}</el-button>
        </el-form>
      </div>
      <div class="btn-con" v-if="!loading && isAdd">
        <el-button type="primary" size="small"
          @click="$router.push({path: '/supplyAddGoods',query: {lastPath: '/supplyGoodsList'}})">添加商品</el-button>
      </div>
    </div>
    <div class="table-con">
      <div>
        <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
          <el-table-column prop="goods_id" label="ID" width="70" align="center"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="storage" label="库存" align="center"></el-table-column>
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
          <el-table-column prop="log_money" label="状态" align="center" v-if="isShow">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.on_sale" @change="changeRadio(scope.row.on_sale,scope.row.goods_id)">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="0">下架</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="log_date" label="操作" align="center" width="160">
            <template slot-scope="scope">
              <template v-if="isEdit">
                <el-button type="primary" plain size="small" @click="toEdit(scope.row)">
                  {{scope.row.check_status == 0 ? '查看' : '编辑'}}</el-button>
              </template>
              <template v-else>
                <el-button type="primary" plain size="small" @click="toLook(scope.row)">查看</el-button>
              </template>
              <el-button v-if="isDel" type="danger" plain size="small" @click="del(scope.row.goods_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="totalPage && totalPage > 0" background :current-page="curPage" layout="prev, pager, next"
          :total="totalPage*10" @current-change="handleCurPageChange"></el-pagination>
      </div>
      <div v-if="!tableData || tableData.length == 0">
        <div class="no-data-con">
          <div class="absolute-center">
            <div class="err-info-text ">暂无商品</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "goodsList",
    data() {
      return {
        tableData: [],
        curPage: 1,
        totalPage: null,
        loading: false,

        check_status: '1',
        checkOptions: [{
          name: '全部',
          id: ''
        }, {
          name: '未审核',
          id: '0'
        }, {
          name: '已通过',
          id: '1'
        }, {
          name: '已拒绝',
          id: '2'
        }],
        fxoptions:[
          {name: '是', id: '1'},
          {name: '否', id: '0'}
        ],
        assort_id: "",
        goods_name: "",
        assortOptions: [],
        son_assort_id: "",
        is_team_tg: '',
        cateOptions: [],
        radio: "1",
        cooperaId: '',

        isEdit: false, // 是否有编辑权限
        isDel: false, //是否有删除权限
        isAdd: false, //是否有添加权限
        isSort: false, //是否有排序权限
        isShow: false, //是否有上下架权限
        goodsList: {
          page: '',
          size: 10,
          goods_name: '',
          assort_id: '',
          son_assort_id: '',
          check_status: ''
        },
      };
    },
    activated() {
      let isRefresh = this.$route.query.isRefresh // 1不刷新 2或者undefined刷新
      if (isRefresh && isRefresh == 1) return
      this.loading = true
      this.initData()
      this.getAssortList();
      this.getCateList()
    },
    methods: {
      currentSel(selVal){
        if(selVal == '是'){
          this.goodsList.is_team_tg = '1';
        }else if(selVal == '否'){
          this.goodsList.is_team_tg = '0';
        }
      },
      initData() {
        let cooperaInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem(
          'cooperationInfo')) : ''
        this.cooperaId = cooperaInfo ? cooperaInfo.id : ''
        this.goodsList = [];
        this.tableData = [];
        this.curPage = 1;
        this.totalPage = null;
        this.assort_id = "";
        this.is_team_tg = "";
        this.check_status = "1";
        this.goods_name = "";
        this.getGoodsList()
        this.handlePermission()
      },
      // 判断当前页面都有什么权限
      handlePermission() {
        let that = this;
        that.utils.getPermissionList(that, data => {
          data.forEach(item => {
            if (item.title == '编辑') {
              that.isEdit = true
            }
            if (item.title == '删除') {
              that.isDel = true
            }
            if (item.title == '添加') {
              that.isAdd = true
            }
            if (item.title == '排序') {
              that.isSort = true
            }
            if (item.title == '上下架') {
              that.isShow = true
            }
          })
        }, '', 'goods_mod_id')
      },
      changeCate() {
        this.getCateList()
      },
      // 商城分类
      getAssortList() {
        this.ajax("cateList", {}, "获取商城分类失败", res => {
          if (res.errno == 0) {
            res.data.data.unshift({
              assort_name: '全部',
              assort_id: '',
            })
            this.assortOptions = res.data.data;
          }
        }, err => {});
      },
      // 店铺分类
      getCateList() {
        this.ajax("cateList", {
          assort_id: this.assort_id
        }, "获取店铺分类失败", res => {
          if (res.errno == 0) {
            res.data.data[0].son_data.unshift({
              assort_name: '全部',
              assort_id: ''
            })
            this.cateOptions = res.data.data[0].son_data;
          }
        }, err => {});
      },
      // 搜索
      search() {
        this.curPage = 1
        this.tableData = [];
        this.getGoodsList()
      },
      // 获取商品列表
      getGoodsList() {
        this.loading = true
        this.goodsList.page = this.curPage;
        this.goodsList.goods_name = this.goods_name;
        this.goodsList.assort_id = this.assort_id;
        this.goodsList.check_status = this.check_status;
        this.ajax("goodsLists", this.goodsList, "获取商品列表失败", res => {
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
        this.getGoodsList();
      },
      // 上下架
      changeRadio(val, id) {
        this.ajax("goodsOnSale", {
            goods_id: id,
            on_sale: val,
            coopera_id: this.cooperaId
          }, (val == 0 ? '下架' : '上架') + '失败', res => {
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
      toEdit(row) {
        let isEdit = true
        if (row.check_status == 0) {
          isEdit = false
          this.toLook(row)
          return
        }
        this.$router.push({
          path: "/supplyAddGoods",
          query: {
            tag: "edit",
            goods_id: row.goods_id,
            isEdit: isEdit,
            lastPath: '/supplyGoodsList'
          }
        });
      },
      // 查看
      toLook(row) {
        this.$router.push({
          path: "/supplyGoodsDetail",
          query: {
            tag: "edit",
            goods_id: row.goods_id,
            isEdit: false,
            lastPath: '/supplyGoodsList',
            curPage: this.curPage
          }
        });
      },
      // 删除
      del(id) {
        this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.ajax("goodsDel", {
              goods_id: id,
              is_del: 1,
              coopera_id: this.cooperaId
            }, "删除失败", res => {
              if (res.errno == 0) {
                this.$message.success("删除成功");
                this.tableData = [];
                this.curPage = 1;
                this.loading = true;
                this.getGoodsList();
              }
            },
            err => {}
          );
        }).catch(() => {});
      }
    }
  };
</script>
<style lang="less">
  .goodsList {
    padding: 20px;

    .el-pagination {
      float: right;
      margin-top: 30px;
      margin-bottom: 30px;
    }

    .operate-con {
      padding: 10px 0;
      margin-bottom: 20px;
      .search-con {
        float: left;
        width: 80%;

        .el-form-item {
          width: 23%;
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

          .el-range-editor {
            width: 90%;
          }

        }
      }


    }

    .btn-con {
      float: right;
    }
  }
</style>