<template>
    <div class="taskList" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>赏金任务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">任务列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
              <el-form-item label="任务标题">
                <el-input placeholder="请输入任务标题" v-model="searchName" clearable></el-input>
              </el-form-item>
              <el-form-item label="发布状态">
                <el-select v-model="status" placeholder="请选择发布状态">
                    <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期范围" style="width:auto"  >
                <el-date-picker v-model="dateArr" :picker-options="pickerOptions" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"> </el-date-picker>
              </el-form-item>
              <el-button type="primary" size="small" :loading="loading" @click="search()">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form>
        </div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="margin-top:20px">
          <el-tab-pane label="普通任务" name="1"></el-tab-pane>
          <el-tab-pane label="平台任务" name="2"></el-tab-pane>
          <div class="table-con">
            <div>
                <el-table :data="tableData" v-if="tableData && tableData.length > 0" border >
                    <el-table-column prop="reward_id" label="ID" width="80" align="center"></el-table-column>
                    <el-table-column prop="status" label="发布状态"  align="center">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 0" type="primary">待审核</el-tag>
                        <el-tag v-if="scope.row.status == 1" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status == 2" type="success" effect="plain">该任务已完结</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="danger" effect="plain" >已删除</el-tag>
                        <el-tag v-if="scope.row.status == 4" type="info">未付款</el-tag>
                        <el-tag v-if="scope.row.status == 5" type="danger">已拒绝</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="title" label="任务标题"  align="center"></el-table-column>
                      <el-table-column prop="name" label="项目名称"  align="center"></el-table-column>
                      <el-table-column prop="name" label="项目名称"  align="center"></el-table-column>
                    <el-table-column  label="上下架"  align="center" width="140">
                      <template slot-scope="scope">
                        <template v-if="scope.row.status == 1">
                          <el-radio-group v-model="scope.row.is_show" @change="handleIsShow(scope.row)">
                            <el-radio :label="1">上架</el-radio>
                            <el-radio :label="0">下架</el-radio>
                          </el-radio-group>
                        </template>
                        <template v-else>
                          --
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column prop="user_name" label="发布人"  align="center"></el-table-column>
                    <el-table-column prop="note" label="任务说明"  align="center"></el-table-column>
                    <el-table-column prop="address" label="任务所属区域"  align="center"></el-table-column>
                    <!-- <el-table-column prop="time_limit_name" label="接单限时"  align="center"></el-table-column>
                    <el-table-column prop="verify_time_name" label="审核时间"  align="center"></el-table-column>
                    <el-table-column prop="make_num_name" label="做单次数"  align="center"></el-table-column> -->
                    <el-table-column prop="price" label="悬赏单价(元)"  align="center"></el-table-column>
                    <el-table-column prop="num" label="悬赏数量"  align="center"></el-table-column>
                    <!-- <el-table-column prop="advance" label="预付赏金(元)"  align="center"></el-table-column> -->
                    <el-table-column prop="add_time" label="发布时间"  align="center"></el-table-column>
                    <el-table-column label="操作"  align="center" width="180" >
                        <template slot-scope="scope">
                          <el-button  size="small" @click="editItem(scope.row)">任务详情</el-button>
                          <el-button type="primary" size="small" v-if="scope.row.status == 0"  @click="checkItem(scope.row)">审核</el-button>
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
        </el-tabs>
        

        <el-drawer :visible.sync="isDetail" :with-header="false" size="60%">
            <div class="drawer-tit-con" >
              <div class="tit">任务详情</div>
              <div class="icon-con" @click="isDetail = false">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <el-form >
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">发布信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                  <!-- <el-form-item label="营业执照" style="height:auto" :label-width="formLabelWidth">
                    <el-image fit="cover" :src="form.license" :preview-src-list="[form.license]">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                        <span class="text">暂无图片</span>
                      </div>
                    </el-image>
                  </el-form-item>
                  <el-form-item label="其他相关证件照片" style="height:auto" :label-width="formLabelWidth">
                     <el-image fit="cover" :src="form.certificates_img" :preview-src-list="[form.certificates_img]">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                          <span class="text">暂无图片</span>
                        </div>
                      </el-image>
                  </el-form-item> -->
                  <el-form-item label="发布人" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.user_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="发布时间" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.add_time" readonly></el-input>
                  </el-form-item>
                </div>
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">任务基本信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                   <el-form-item label="任务标题" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.title" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="项目名称" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="任务所属区域" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.address" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="接单限时" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.time_limit_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="审核时间" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.verify_time_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="做单次数" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.make_num_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="悬赏单价" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.price" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="悬赏数量" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.num" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="预付赏金" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.advance" readonly></el-input>
                  </el-form-item>
                </div>
                <div class="tit-con">
                  <div class="shu"></div>
                  <span class="tit">任务说明</span>
                  <div class="bg"></div>
                </div>
                  <div class="form-item-con clearfix">
                    <el-form-item  style="height:auto" label-width="20px">
                       <p>{{selectRow.note}}</p>
                    </el-form-item>
                  </div>
                <div class="tit-con">
                  <div class="shu"></div>
                  <span class="tit">做单步骤</span>
                  <div class="bg"></div>
                </div>
                  <div class="form-item-con clearfix">
                    <el-form-item :label="'步骤'+(index+1)" style="height:auto" :label-width="formLabelWidth" v-for="(item, index) in stepList" :key="index">
                      <p class="dome_p p_tit">{{item.step_title}}</p>
                      <p class="dome_p p_content">{{item.type == 2 ? '链接/口令: ' : ''}}{{item.content}}</p>
                      <p class="dome_p p_desc"><span v-if="item.type == 1 && item.pic" @click="toShowViewer(item.pic)">点击查看步骤一{{index+1}}截图</span> <span v-if="item.type == 2 || item.type == 1 && !item.pic" style="opacity:0">占位符</span></p>
                      <!-- <el-image fit="cover" :src="item.pic" :preview-src-list="[selectRow.photo]">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                          <span class="text">暂无图片</span>
                        </div>
                      </el-image> -->
                    </el-form-item>
                  </div>
              </el-form>
             
              <div class="drawer-footer" >
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">审核状态</span>
                    <div class="bg"></div>
                </div>
                <p v-if="selectRow.status== 5">拒绝原因:<span style="color:#999">{{selectRow.remarks ? selectRow.remarks : '未填写拒绝原因'}}</span></p>
                <div class="btn-con">
                    <template v-if="selectRow.status == 0">
                      <el-button  type="primary" @click="handleStatus(1)">通 过</el-button>
                      <el-button type="danger"  @click="handleStatus(5)">拒 绝</el-button>
                    </template>
                    <template v-if="selectRow.status == 1">
                      <el-button type="success" >审核通过</el-button>
                    </template>
                    <template v-if="selectRow.status== 2">
                      <el-button type="success" plain>该任务已完结</el-button>
                    </template>
                    <template v-if="selectRow.status== 3">
                      <el-button type="danger" plain>已删除</el-button>
                    </template>
                    <template v-if="selectRow.status== 4">
                      <el-button type="info" plain>未付款</el-button>
                    </template>
                    <template v-if="selectRow.status== 5">
                      <el-button type="danger" >已拒绝</el-button>
                    </template>
                </div>
              </div>
        </el-drawer>
        <template v-if="showViewer">
            <el-image-viewer :on-close="closeImgView"  :url-list="showViewImgs" />
        </template> 
    </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: "taskList",
  data() {
    return {
      activeName: '1',
      searchName: '',
      status: '',
      statusOptions: [{
        name: '全部',
        value: ''
      },{
        name: '待审核',
        value: 0
      },{
        name: '审核通过',
        value: 1
      },{
        name: '任务已完结',
        value: 2
      },{
        name: '已删除',
        value: 3
      },{
        name: '未付款',
        value: 4
      },{
        name: '已拒绝',
        value: 5
      }],
      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      dateArr: '',
      isDetail: false, // 是否显示金额明细列表
      selectRow: '',
      stepList: [],
      formLabelWidth: "135px",
      showViewer: false,
      showViewImgs: [],
      pickerOptions: {
        disabledDate(time) {
          // 大于某个日期不能选择
          let myDate = new Date();
          let _beforeDay = myDate.setDate(new Date().getDate());		
          return time.getTime() >= _beforeDay;
        }
      },
    };
  },
  components: { ElImageViewer },
  activated() {
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    this.totalPage = null
    this.dateArr = ''
    this.selectRow = ''
    this.searchName = ''
    this.activeName = '1'
    this.status = ''
    this.showViewer = false
    this.showViewImgs = []
    this.getTaskList();
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.dateArr = '';
      this.selectRow = ''
      this.searchName = ''
      this.status = ''
      this.showViewer = false
      this.showViewImgs = []
      this.getTaskList();
    },
    // 查询
    search() {
      this.loading = true
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.getTaskList()
    },
    //切换 普通任务/平台任务
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.curPage = 1
      this.totalPage = null
      this.loading = true
      this.tableData = []
      this.getTaskList()
    },
    getTaskList() {
      let params = {
          page: this.curPage,
          size: 10,
          coopera_id: "",
          start: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
          end: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
          title: this.searchName,
          publish: this.activeName
      }
      if (this.status) {
          params.status = this.status
      } else {
        if(typeof this.status == 'number') {
          params.status = this.status
        }
      }
      this.ajax("rewardLists", params, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            res.data.data.forEach(item =>{
              let tmpAddr = ''
              if (item.province_name || item.city_name || item.area_name) {
                if (item.province_name) {
                  tmpAddr += item.province_name
                }
                if (item.city_name) {
                  tmpAddr += item.city_name
                }
                if (item.area_name) {
                  tmpAddr += item.area_name
                }
              } else {
                tmpAddr = '全部地区'
              }
              item.address = tmpAddr
            })
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
      this.getTaskList();
    },
    // 查看/编辑
    editItem(row) {
      this.rewardDetail(row)
      this.selectRow = row
      this.isDetail = true
    },
    // 审核
    checkItem (row) {
      this.$confirm('是否同意审核?', '提示', {
          confirmButtonText: '同意',
          cancelButtonText: '拒绝',
          type: 'warning',
          distinguishCancelAndClose: true,
          center: true
        }).then(() => {
          this.handleCheck(1,row,'')
        }).catch(action  => {
          if (action == 'cancel') {
            this.$prompt('请输入拒绝理由', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(({ value }) => {
              this.handleCheck(5,row,value)         
            }).catch(() => {});
          }
           
        });
        
    },
    // 请求审核api
    handleCheck (status,row,value) {
      this.ajax("rewardUpdateStatus", {
          reward_id: row.reward_id,
          status: status,
          remarks: value
        }, "审核失败",
        res => {
          if (res.errno == 0) {
            row.status = status
            if (status == 5) {
              row.remarks = value
            }
            this.$message.success(status == 1 ? '已同意' : '已拒绝')
          }
        },
        err => {
        }
      );
    },
    // 获取任务详情
    rewardDetail (row) {
      this.ajax("rewardDetail", {
          reward_id: row.reward_id
        }, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            if (res.data && res.data.step_data) {
              res.data.step_data.forEach(item =>{
                if (item.pic) {
                  item.pic = item.pic.split(',')
                }
              })
              this.stepList = res.data.step_data
            }
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    // 显示步骤图片
    toShowViewer (pic) {
      if(pic) {
          this.showViewer = true
          this.showViewImgs = pic
      }
    },
    // 关闭图片大图
    closeImgView() {
        this.showViewer = false
        this.showViewImgs = []
    },
    // 详情页同意 拒绝按钮
    handleStatus (status) {
      if (status == 1) {
        this.$confirm('确定同意审核吗?', '提示', {
          confirmButtonText: '同意',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.handleCheck(1, this.selectRow, '')
        }).catch(action  => {
        });
      } else if (status == 5){
        this.$prompt('请输入拒绝理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(({ value }) => {
          this.handleCheck(5,this.selectRow,value)         
        }).catch(() => {});
      }
    },
    // 上下架
    handleIsShow (row) {
      this.ajax("rewardIsShow", {
          reward_id: row.reward_id,
          is_show: row.is_show
        }, "上下架失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            this.$message.success(row.is_show == 1 ? '上架成功' : '下架成功')
          } else {
            row.is_show = row.is_show == 1 ? 0 : 1
          }
        },
        err => {
          row.is_show = row.is_show == 1 ? 0 : 1
        }
      );
    }
  }
};
</script>
<style lang="less">
.taskList {
  padding: 20px;
  .el-table {
    background: transparent;
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
  .el-form {
    height: calc(100% - 20vh);
    overflow-y:auto;
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
  }
  .el-form::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    border-radius: 100px;

  }
  .el-form::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 100px;
      background: rgba(94, 92, 92, 0.2);
  }
  .el-form::-webkit-scrollbar-track {/*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      // border-radius: 0;
      // background: rgba(0,0,0,0.1);
  }
  .form-item-con {
        margin: 2rem 0;
        position: relative;
        .dome_p {
          line-height: auto;
        }
        .p_tit {
          font-weight: bold;
        }
        .p_desc {
          color: #3B6AF1;
          cursor: pointer;
        }
        .el-form-item {
            width: 50%;
            height: 2.5rem  ;
            float: left;
            margin-bottom: 20px;
            .el-form-item__label {
                font-size: 0.9rem;
            }
            .el-input {
                width: 100%;
                .read-idCard {
                    color: #3B6AF1;
                    background: #F0F8FF;
                    font-size: 0.75rem;
                    cursor: pointer;
                }
                .read-idCard:active {
                    opacity: 0.6;
                }
            }
            .el-image {
              width: 100px;
              height: 100px;
              cursor: pointer;
              .image-slot {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: #f5f7fa;
                .text {
                  height: 22px;
                  font-size: 0.7rem;
                  color: #999;
                }
              }
            }
        }
        .upload-con {
            width: 30%;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            .el-form-item__content {
                margin-left: 0!important;
            }
            .img-con {
                max-width: 100%;
                border: 1px solid #E4EDF6;
                border-bottom: 0;
                padding: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 10rem;
                height: 15rem;
                cursor: pointer;
                img {
                    max-width: 100%;
                    max-height: 100%
                }
            }
           
            .upload-btn {
                width: 100%;
                padding: 0.3rem 0;
                background: #E4EDF6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #3B6AF1;
                font-size: 0.9rem;
                cursor: pointer;
            }
            .upload-btn:hover {
                opacity: 0.6;
            }
        }
        .assets-form-item {
            width: 100%;
            margin-bottom: 0;
            height: auto;
            .pic-item {
                position: relative;
                float: left;
                width: 8rem;
                height: 8rem;
                padding: 0.5rem;
                border: 1px solid #dcdfe6;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                margin-bottom: 1rem;
                .pic {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
         .idcard-item-con {
            height: auto;
            .idcard-img {
                width: 160px;
                height: 102px;
                background: #fff;
                border: 1px solid #eee;
                border-radius: 8px;
                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .idcard-text {
                width: 160px;
                padding: 0.2rem 0;
                background: #E4EDF6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #3B6AF1;
                font-size: 0.9rem;
                cursor: pointer;
            }
        }
        
    }
  
}
.el-image-viewer__wrapper {
    z-index: 99999999!important
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