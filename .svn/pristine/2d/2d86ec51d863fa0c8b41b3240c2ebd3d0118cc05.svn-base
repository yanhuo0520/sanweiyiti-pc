<template>
    <div class="goodsList" v-loading="loading">
      <div class="breadcrumb-con">
        <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
        <div class="breadcrumb-info">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>{{adminType == 1 ? '供应商城' : '合作商城'}}</el-breadcrumb-item>
                <el-breadcrumb-item class="breadcrumb-tit">商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <el-button size="small" @click="initData()">刷新</el-button>
    </div>

    <div class="search-con">
        <el-form class="clearfix"  label-width="80px">
            <el-form-item label="商品名称">
                <el-input placeholder="请输入商品名称" v-model="goods_name"></el-input>
            </el-form-item>
            <el-form-item label="审核状态"  v-if="!isAdmin">
                <el-select v-model="check_status" placeholder="请选择审核状态">
                    <el-option v-for="(item,index) in checkOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商城分类">
                <el-select v-model="assort_id" placeholder="请选择商城分类">
                    <el-option v-for="(item,index) in assortOptions" :key="index" :label="item.assort_name" :value="item.assort_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺分类">
                <el-select v-model="cate_id" placeholder="请选择店铺分类">
                    <el-option v-for="(item,index) in cateOptions" :key="index" :label="item.cate_name" :value="item.cate_id"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" size="small" style="margin-left:15px" :loading="loading" @click="amountList()">{{loading ? '获取数据中...' : '查询'}}</el-button>
        </el-form>
    </div>
     <div class="btns-manage">
          <el-button size="mini" type="success" round  @click="getData" v-if="adminType == 3">管理我的合作社</el-button>
          <el-button size="mini" type="warning"  round @click="chooseCoopera" v-if="adminType != 0">查看下级合作社</el-button>
        </div>
        <div class="tip" :class="{'manage-tip':!selectName}" v-if="adminType != 0">
          <span v-if="selectName">正在查看下级【{{selectName}}】的数据</span>
          <span v-else>正在管理我的合作社</span>
        </div>
    <el-button type="primary" v-if="isAdd" size="small" @click="$router.push({path: '/addGoods',query: {lastPath: '/goodsList'}})">添加商品</el-button>
    <div class="table-con">
        <div>
          <el-table :data="tableData" v-if="tableData && tableData.length > 0" border>
          <el-table-column prop="goods_id" label="ID" width="80" align="center"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="coopera_name" label="所属合作社" width="200" align="center" show-overflow-tooltip v-if="isAdmin"></el-table-column>
          <el-table-column prop="storage" label="库存" align="center"></el-table-column>
          <el-table-column prop="retail_price" label="价格" align="center"></el-table-column>
          <el-table-column prop="assort_name" label="商城分类" align="center"></el-table-column>
          <el-table-column prop="cate_name" label="店铺分类" align="center"></el-table-column>
          <el-table-column prop="log_money" label="状态" align="center">
              <template slot-scope="scope">
                  <template v-if="!isAdmin">
                    <template v-if="isSale">
                      <el-radio-group  v-model="scope.row.on_sale" @change="changeRadio(scope.row.on_sale,scope.row.goods_id)">
                          <el-radio :label="1">上架</el-radio>
                          <el-radio :label="0">下架</el-radio>
                      </el-radio-group>
                    </template>
                    <template v-else>
                        <el-tag>{{scope.row.on_sale == 1 ? '已上架' : '已下架'}}</el-tag>
                    </template>
                  </template>
                  <template v-else>
                      <template v-if="isSale && adminCooperaId == scope.row.coopera_id">
                        <el-radio-group  v-model="scope.row.on_sale" @change="changeRadio(scope.row.on_sale,scope.row.goods_id)">
                            <el-radio :label="1">上架</el-radio>
                            <el-radio :label="0">下架</el-radio>
                        </el-radio-group>
                      </template>
                      <template v-else>
                          <el-tag>{{scope.row.on_sale == 1 ? '已上架' : '已下架'}}</el-tag>
                      </template>
                  </template>
              </template>
          </el-table-column>
          <el-table-column prop="cate_name" label="审核状态" v-if="!isAdmin">
              <template slot-scope="scope">
                  <template v-if="scope.row.check_status == 0">
                      <span>未审核</span>
                  </template>
                  <template v-if="scope.row.check_status == 1">
                      <span>已审核</span>
                  </template>
                  <template v-if="scope.row.check_status == 2">
                    <el-popover trigger="hover" placement="top" v-if="!isAdmin">
                          <p>拒绝原因: {{scope.row.note}}</p>
                          <div slot="reference" class="name-wrapper">
                              <span style="cursor: pointer" >已拒绝</span>
                          </div>
                      </el-popover>
                  </template>
              </template>
          </el-table-column>
          <el-table-column prop="log_date" label="操作" align="center">
              <template slot-scope="scope">
                  <template v-if="!isAdmin">
                    <el-button type="text" size="small" @click="toEdit(scope.row)">{{ isEdit ? (scope.row.check_status == 0 ? '查看' : '编辑') : '查看'}}</el-button>
                  </template>
                  <template v-else>
                    <el-button type="text" size="small" @click="toEdit(scope.row)">{{adminCooperaId && adminCooperaId == scope.row.coopera_id ? (isEdit ? '编辑' : '查看') : '查看'}}</el-button>
                  </template>
                  <el-button type="text" v-if="(!isAdmin || (isAdmin  && adminCooperaId && adminCooperaId == scope.row.coopera_id)) && isDel"  size="small" @click="del(scope.row.goods_id)">删除</el-button>
              </template>
          </el-table-column>
          </el-table>

          <el-pagination
          background
          :current-page="curPage"
          layout="prev, pager, next"
          :total="totalPage*10"
          @current-change="handleCurPageChange">
          </el-pagination>
      </div>
      <div v-if="!tableData || tableData.length == 0">
          <div class="no-data-con" >
              <div class="absolute-center">
                  <div class="err-info-text ">暂无信息</div>
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
  name: "goodsList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,

      check_status: '1',
      checkOptions:[{
        name: '全部',
        id: ''
      },{
        name: '未审核',
        id: '0'
      },{
        name: '已通过',
        id: '1'
      },{
        name: '已拒绝',
        id: '2'
      }],

      date: "",
      assort_id: "",
      cate_id: "",
      goods_name: "",
      assortOptions: [],
      cateOptions: [],
      radio: "1", 

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      adminCooperaId: '',
      cooperaId: '', //合作社id
      cooperativeList:[],
      
      isSale: false, // 是否有上下架权限
      isEdit: false, //是否有编辑权限
      isDel: false, //是否有删除权限
      isAdd: false, //是否有添加权限

      cooperationInfo: '',

      drawer: false,
      selectName: '',
      level2List: [],
    };
  },
  components: { myDrawer },
  activated() {
    this.initEventWatch()
    let isRefresh = this.$route.query.isRefresh // 1不刷新 2或者undefined刷新
    if(isRefresh && isRefresh == 1) return
     this.selectName = '';
    this.level2List = []
    this.loading = true
    //判断是否为管理员
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
    this.assortList();
    this.cateList();
    // this.handlePermission()
  },
  methods: {
    initData() {
      this.selectName = '';
      this.level2List = []
      this.tableData = [];
      this.curPage = 1;
      this.assort_id = "";
      this.cate_id = "";
      this.check_status = "1";
      if(this.cooperativeList && this.cooperativeList.length > 1 && this.adminType == 3) {
          this.cooperaId = this.cooperativeList[1].coopera_id
      } else {
          this.cooperaId = ''
          if(this.cooperativeList && this.cooperativeList.length > 0) {
              this.selectName = this.cooperativeList[0].coopera_name
            }
      }
      this.amountList()
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
          this.amountList()
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
        this.amountList()
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
          this.amountList()
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
          if(item.title == '上下架') {
            that.isSale = true
          }	
        })
      })
    },
    // 商城分类
    assortList() {
      this.ajax(
        "cateList",
        {
          table: "assort"
        },
        "",
        res => {
          if (res.errno == 0) {
            res.data.unshift({
              assort_name: '全部',
              assort_id: ''
            })
            this.assortOptions = res.data;
          }
        },
        err => {}
      );
    },
    // 店铺分类
    cateList() {
      this.ajax(
        "cateList",
        {
          table: "cate"
        },
        "",
        res => {
          if (res.errno == 0) {
            res.data.unshift({
              cate_name: '全部',
              cate_id: ''
            })
            this.cateOptions = res.data;
          }
        },
        err => {}
      );
    },
    amountList() {
      this.loading = true
      this.ajax(
        "goodsLists",
        {
          page: this.curPage,
          size: 10,
          goods_name: this.goods_name,
          cate_id: this.cate_id,
          assort_id: this.assort_id,
          check_status: this.check_status,
          coopera_id: this.cooperaId
        },
        "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.drawer = false
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
    toEdit(row) {
      let isEdit = false
      if(this.isAdmin) {
        if(this.adminCooperaId && this.adminCooperaId == row.coopera_id) {
          isEdit = this.isEdit
        } else {
          isEdit = false
        }
        
      } else {  
        if(row.check_status == 0) {
          isEdit = false
        } else {
          isEdit = this.isEdit
        }
      }

      this.$router.push({
        path: "/addGoods",
        query: {
          tag: "edit",
          goods_id: row.goods_id,
          isEdit: isEdit,
          lastPath: '/goodsList'
        }
      });
    },
    // 删除
    del(id) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ajax(
            "goodsDel",
            {
              goods_id: id,
              is_del: 1
            },
            "删除失败",
            res => {
              if (res.errno == 0) {
                this.$message.success("删除成功");
                this.tableData = [];
                this.curPage = 1;
                this.loading = true;
                this.amountList();
              }
            },
            err => {}
          );
        })
        .catch(() => {});
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

  .search-con {
    margin-bottom: 10px;
    .el-form {
      width: 100%;
      display: flex;
    }
    .el-form-item {
      width: 22%;
      // float: left;
      margin-bottom: 0;
      .el-form-item__label {
        font-size: 0.9rem;
      }
      .el-form-item__content {
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
    }
  }
}
</style>