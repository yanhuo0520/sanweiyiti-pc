<template>
    <div class="helpList" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>赏金任务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">帮助中心</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
              <div style="flex:1"></div> 
              <el-form-item label="排序模式" style="width:auto"  >
                <el-switch
                    v-model="isShowSort"
                    @change="changeSortType"
                    >
                </el-switch>
              </el-form-item>
              <el-form-item style="width:auto"  >
                   <el-button type="primary" size="small" @click="addArticle">添加文章</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="table-con">
            <template v-if="!isShowSort">
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border >
                    <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
                    <el-table-column prop="content" label="文章标题"  align="center"></el-table-column>
                    <el-table-column prop="add_time" label="添加时间"  align="center"></el-table-column>
                    <el-table-column prop="update_time" label="更新时间"  align="center"></el-table-column>
                    <el-table-column label="操作"  align="center">
                        <template slot-scope="scope">
                            <el-button plain type="primary" size="small" @click="editItem(scope.row)">编辑</el-button>
                            <el-button  type="danger" size="small"  @click="delItem(scope.row, scope.$index)">删除</el-button>
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
            </template>
            <template v-else>
               <div class="draggable-box">
                   <el-alert title="可拖拽排序" type="warning"> </el-alert>
                   <div class="draggable-con">
                        <vue-draggable v-model="sortData"  :options="{ draggable: '.draggable-item' }" @end="onEnd()">
                            <div class="draggable-item" v-for="(item,index) in sortData" :key="index">
                                <div class="draggable-item-con">
                                    <span class="article-id" >文章ID:{{item.id}}</span>
                                    <span class="article-con">{{item.content}}</span>
                                </div>
                            </div>
                        </vue-draggable>
                    </div>
                    <div class="sort-btn-con">
                        <el-button type="primary"  @click="submitSort">提交排序</el-button>
                    </div>
               </div>
            </template>
            <div v-if="!tableData || tableData.length == 0">
                <div class="no-data-con" >
                <div class="absolute-center">
                    <div class="err-info-text ">暂无信息</div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueDraggable from 'vuedraggable';
import SortableJS from 'sortablejs';
export default {
  name: "helpList",
  data() {
    return {
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      dateArr: '',
      isDetail: false, // 是否显示金额明细列表
      sortData: [],
     
      selectRow: '',
      isShowSort: false,
      idArr: [],
      oldIdArr: []
    };
  },
  components: {
        VueDraggable, SortableJS
    },
  activated() {
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    this.totalPage = null
    this.dateArr = ''
    this.selectRow = ''
    this.getReportList();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.dateArr = '';
      this.selectRow = ''
      this.getReportList();
    },
    // 是否为排序模式
    changeSortType () {
        if(this.tableData && this.tableData.length < 2) {
            this.$message.info('至少要有两篇文章才可排序')
            this.isShowSort = !this.isShowSort
            return
        }
        if (this.isShowSort) {
            this.sortData = JSON.parse(JSON.stringify(this.tableData))
        } else {
            this.sortData = []
            this.idArr = []
        }
    },
    // 拖拽事件
    onEnd() {
        let tmpIdArr = []
        this.sortData.forEach(item =>{
            tmpIdArr.push(item.id)
        })
        this.idArr = tmpIdArr
    },
    // 查询
    search() {
      this.loading = true
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.getReportList()
    },
    getReportList() {
       let oldIdArr = []
      this.ajax("helpLists", {
          page: this.curPage,
          size: 10,
        }, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
              res.data.data.forEach(item =>{
                  oldIdArr.push(item.id)
              })
            this.oldIdArr = oldIdArr
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
      this.loading = true;
      this.getReportList();
    },
    // 提交排序
    submitSort () {
        if (this.idArr && this.idArr.length > 0) {
            if (JSON.stringify(this.oldIdArr) == JSON.stringify(this.idArr)) {
                this.$message.info('顺序没有发生改变')
                return
            } else {
                this.ajax("helpSort", {
                    ids: this.idArr.join(','),
                    }, "排序失败",
                    res => {
                        if (res.errno == 0) {
                            this.getReportList()
                            this.sortData = []
                            this.idArr = []
                            this.isShowSort = false
                            this.$message.success('排序成功')
                        }
                    },
                    err => {
                    }
                )
            }
        } else {
            this.$message.error('请先排序')
        }
    },
    // 添加
    addArticle (row) {
        this.$router.push({
            path: '/articleDetail',
            query: {
                id: null
            }
        })
    },
    // 编辑
    editItem (row,index) {
        this.$router.push({
            path: '/articleDetail',
            query: {
                id: row.id
            }
        })
    },
    // 删除
    delItem (row,index) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.ajax("helpDel", {
                id: row.id,
                }, "删除失败",
                res => {
                    if (res.errno == 0) {
                      this.tableData.splice(index, 1)
                      this.$message.success('删除成功')
                    }
                },
                err => {
                }
            )
        }).catch(() => {
        })
    }
  }
};
</script>
<style lang="less">
.helpList {
  padding: 20px;
  .el-table {
    background: transparent;
    margin-top: 50px;
  }
  .el-table::before {
    height: 0;
  }
  .el-pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .search-con {
    .el-form {
      width: 100%;
      display: flex;
    }
    .el-form-item {
      width: 23%;
      // float: left;
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
    }
  }
  .table-con {
    .el-icon-warning {
      font-size: 20px;
      color: #5cb6ff;
      margin-left: 6px;
      cursor: pointer;
    }
  }
  .el-drawer {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 10px 8px 18px #000;
  }
  .el-drawer.rtl {
    top: 5rem;
    bottom: 0.5rem;
    height: calc(100% - 5.5rem);
    .el-drawer__body {
      display: flex;
      flex-direction: column;
    }
  }
  .drawer-tit-con {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 15px;
    .tit {
      font-weight: bold;
    }
    .icon-con {
      font-size: 1.5rem;
      color: #666;
      cursor: pointer;
    }
  }

  .drawer-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    padding: 0 25px;
    .tit-con {
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .shu {
          width: 0.28rem;
          height: 1rem;
          background-color: #3B6AF1;
      }
      .tit {
          color: #444444;
          padding: 0 0.8rem;
          line-height: 1rem;
      }
      .bg {
          flex: 1;
          background: url('../../images/baseInfo/tit-bg.png');
          height: 1rem;
          background-size: 100% 100%;
      }
      .del-family-icon {
          position:absolute;
          right: 0;
          top: 0.5rem;
          height: 1.5rem;
          cursor: pointer;
      }
    }
    .btn-con {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
    

  }
  .draggable-box {
      box-shadow: 3px 3px 6px #ccc;
      border-radius: 10px;
      padding: 20px;
  }
  .draggable-con {
        padding: 20px 10px;
        .draggable-item {
            display: inline-block;
            font-size: 14px;
            color: #409eff;
            border: 1px solid #d9ecff;
            border-radius: 4px;
            background-color: #ecf5ff;
            padding: 10px; 
            white-space: nowrap;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: move;
            .draggable-item-con {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .article-id {
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .article-con {
                    font-weight: bold;
                }
            }
        }
    }
    .sort-btn-con {
        display: flex;
        align-content: center;
        justify-content: center;
    }
}
.el-popover__title {
  font-weight: bold
}
.popover-btn-con {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
</style>