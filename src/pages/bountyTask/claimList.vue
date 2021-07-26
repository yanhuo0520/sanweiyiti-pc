<template>
    <div class="claimList" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>赏金任务</el-breadcrumb-item>
                    <el-breadcrumb-item  class="breadcrumb-tit">领取记录</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button size="small" @click="initData()">刷新</el-button>
        </div>
        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
              <el-form-item label="领取ID" style="width:18%">
                <el-input type="number" placeholder="请输入领取ID" v-model="searchId" clearable></el-input>
              </el-form-item>
              <el-form-item label="任务标题" style="width:18%">
                <el-input placeholder="请输入任务标题" v-model="searchName" clearable></el-input>
              </el-form-item>
              <el-form-item label="领取状态" style="width:16%">
                <el-select v-model="status" placeholder="请选择领取状态">
                    <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期范围" style="width:auto;margin-right:10px"  >
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
                    <el-table-column prop="reward_make_id" label="领取ID" width="80" align="center"></el-table-column>
                    <el-table-column  label="领取状态"  align="center">
                      <template slot-scope="scope">
                        <!-- <el-tag v-if="scope.row.status == 0" type="info">未审核</el-tag> -->
                        <el-tag v-if="scope.row.status == 1">进行中</el-tag>
                        <el-tag v-if="scope.row.status == 2" palin>审核中</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="success">已完成</el-tag>
                        <el-tag v-if="scope.row.status == 4" type="danger">审核失败</el-tag>
                        <el-tag v-if="scope.row.status == 5" plain>已取消</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="title" label="任务标题"  align="center"></el-table-column>
                    <el-table-column prop="name" label="项目名称"  align="center"></el-table-column>
                    <el-table-column prop="ling_name" label="领取人"  align="center"></el-table-column>
                    <el-table-column prop="fa_name" label="发布人"  align="center"></el-table-column>
                    <el-table-column label="不合格原因"  align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.note}} </span>
                        <p style="color:red" v-if="scope.row.note == '保证金不足'">用户手机端显示不合格原因为【任务已关闭】</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" label="悬赏单价(元)"  align="center"></el-table-column>
                    <el-table-column prop="add_time" label="领取时间"  align="center"></el-table-column>
                    <template v-if="activeName == 1">
                      <el-table-column label="操作"  align="center" width="100">
                          <template slot-scope="scope">
                            <el-button  size="small" @click="editItem(scope.row)">任务详情</el-button>
                          </template>
                      </el-table-column>
                    </template>
                    <template v-if="activeName == 2">
                      <el-table-column label="操作"  align="center" width="180" >
                        <template slot-scope="scope">
                          <el-button  size="small" @click="editItem(scope.row)">任务详情</el-button>
                          <el-button type="primary" size="small" v-if="scope.row.status == 2"  @click="toVerify(scope.row)">去审核</el-button>
                        </template>
                    </el-table-column>
                    </template>
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
                    <span class="tit">人物信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                  <el-form-item label="接单人" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.ling_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="发布人" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="selectRow.fa_name" readonly></el-input>
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
                      <el-input autocomplete="off" v-model="detail.address" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="接单限时" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="detail.time_limit_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="审核时间" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="detail.verify_time_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="做单次数" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="detail.make_num_name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="悬赏单价" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="detail.price" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="悬赏数量" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="detail.num" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="预付赏金" :label-width="formLabelWidth">
                      <el-input autocomplete="off" v-model="detail.advance" readonly></el-input>
                  </el-form-item>
                </div>
                <div class="tit-con">
                  <div class="shu"></div>
                  <span class="tit">任务说明</span>
                  <div class="bg"></div>
                </div>
                  <div class="form-item-con clearfix">
                    <el-form-item  label-width="20px">
                        <p>{{detail.note}}</p>
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
                      <p class="dome_p p_desc"><span v-if="item.type == 1 && item.pic" @click="toShowViewer(item.pic)">点击查看步骤一{{index+1}}截图</span> <span v-if="item.type == 2 || (item.type == 1 && !item.pic)" style="opacity:0">占位符</span></p>
                      <!-- <el-image fit="cover" :src="item.pic" :preview-src-list="[selectRow.photo]">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                          <span class="text">暂无图片</span>
                        </div>
                      </el-image> -->
                    </el-form-item>
                  </div>
              </el-form>
               <!-- <el-tag v-if="scope.row.status == 0" type="info">未审核</el-tag>
                        <el-tag v-if="scope.row.status == 1" type="success">进行中</el-tag>
                        <el-tag v-if="scope.row.status == 2" type="danger">审核中</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="danger">已完成</el-tag>
                        <el-tag v-if="scope.row.status == 4" type="danger">审核失败</el-tag>
                        <el-tag v-if="scope.row.status == 5" type="danger">已取消</el-tag> -->
              <div class="drawer-footer" >
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">领取状态</span>
                    <div class="bg"></div>
                </div>
                <p v-if="selectRow.status== 4">失败原因:<span style="color:#999">{{selectRow.note ? selectRow.note : '未填写失败原因'}}</span></p>
                <div class="btn-con">
                    <template v-if="selectRow.status == 1">
                      <el-button type="primary" >任务进行中</el-button>
                    </template>
                    <template v-if="selectRow.status == 2">
                      <el-button type="primary" plain>任务审核中</el-button>
                    </template>
                    <template v-if="selectRow.status == 3">
                      <el-button type="success" >任务已完成</el-button>
                    </template>
                    <template v-if="selectRow.status == 4">
                      <el-button type="danger" >审核失败</el-button>
                    </template>
                    <template v-if="selectRow.status == 5">
                      <el-button type="danger" plain>已取消</el-button>
                    </template>
                </div>
              </div>
        </el-drawer>
        <el-dialog title="审核详情" :visible.sync="isVerticalShow">
            <el-form :model="verticalForm" label-width="80px">
                <el-form-item label="提交描述" >
                    <el-input v-model="verticalForm.desc" placeholder="暂无提交描述"  readonly></el-input>
                </el-form-item>
                <el-form-item label="提交时间" >
                    <el-input v-model="verticalForm.add_time" placeholder="暂无提交时间"  readonly></el-input>
                </el-form-item>
                <div class="pic-con">
                    <img class="pic-item" v-for="(item, index) in verticalForm.picList" :key="index" :src="item" @click.stop="imgPreview(verticalForm.picList,index)" alt="">
                </div>
                <el-form-item label="审核状态" >
                  <el-radio-group v-model="verticalForm.type">
                      <el-radio label="3">同意</el-radio>
                      <el-radio label="4">拒绝</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="拒绝原因" v-if="verticalForm.type == 4">
                    <el-input v-model="verticalForm.remarks" placeholder="请输入拒绝原因"  ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isVerticalShow = false">取 消</el-button>
                <el-button type="primary" @click="verticalConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <template v-if="showViewer">
            <el-image-viewer :on-close="closeImgView"  :url-list="showViewImgs" />
        </template> 
    </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: "claimList",
  data() {
    return {
      activeName: '1',
      searchId: '',
      searchName: '',
      status: '',
      statusOptions: [{
        name: '全部',
        value: ''
      },{
        name: '进行中',
        value: 1
      },{
        name: '审核中',
        value: 2
      },{
        name: '审核完成',
        value: 3
      },{
        name: '不合格',
        value: 4
      },{
        name: '已取消',
        value: 5
      }],

      tableData: [],
      curPage: 1,
      totalPage: 1,
      loading: false,
      dateArr: '',
      formLabelWidth: "135px",
      isDetail: false, // 是否显示任务详情弹窗
      detail: '',
      selectRow: '',
      stepList: [],
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

      isVerticalShow: false,
      verticalForm: ''
    };
  },
  components: { ElImageViewer },
  activated() {
    this.activeName = '1'
    this.tableData = [];
    this.curPage = 1;
    this.loading = true;
    this.totalPage = null
    this.dateArr = ''
    this.status = ''
    this.searchId = ''
    this.searchName = ''
    this.detail = ''
    this.showViewer = false
    this.showViewImgs = []
    this.getTaskList();
    
    // this.getConfig('reward_type')
  },
  methods: {
    initData() {
      this.tableData = [];
      this.curPage = 1;
      this.totalPage = null
      this.loading = true;
      this.dateArr = '';
      this.status = ''
      this.searchId = ''
      this.searchName = ''
      this.detail = ''
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
    // 图片预览
    imgPreview (picArr,index) {
        this.showViewImgs = [picArr[index]]
        this.showViewer = true
    },
    // // 获取任务类型
    // getConfig (table) {
    //   this.ajax("getConfig", {
    //       table: table
    //     }, "查询失败",
    //     res => {
    //       if (res.errno == 0) {
    //         let tmpArr = [{
    //           type_id: '',
    //           type_name: '全部类型'
    //         }]
    //         this.taskTypeOptions = res.data;
    //       }
    //     });
    // },

    // 去审核
    toVerify (row) {
      this.selectRow = row
      this.ajax("makeDetail", {
          reward_make_id: row.reward_make_id
        }, "查询失败",
        res => {
          this.loading = false;
          if (res.errno == 0) {
            if (res.data.make_pic) {
              this.verticalForm = {
                picList: res.data.make_pic ? res.data.make_pic.split(',') : [],
                desc: res.data.make_content,
                add_time: res.data.add_time,
                type: '3'
              }
              this.isVerticalShow = true
            } else {
              this.$message.error('用户未提交审核,不合格原因为: '+ row.note)
            }
          }
        }
      );
    },
    // 确认审核
    verticalConfirm () {
      this.ajax("verifyTask", {
          reward_make_id: this.selectRow.reward_make_id,
          status: this.verticalForm.type,
          note: this.verticalForm.remarks
        }, "审核失败",
        res => {
          if (res.errno == 0) {
            this.selectRow.status = this.verticalForm.type
            if (this.selectRow.status == 4) {
              this.selectRow.note = this.verticalForm.remarks
            }
            this.$message.success(this.selectRow.status == 3 ? '已同意' : '已拒绝')
            this.isVerticalShow = false
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
            let tmpAddr = ''
            if (res.data.province_name || res.data.city_name || res.data.area_name) {
              if (res.data.province_name) {
                tmpAddr += res.data.province_name
              }
              if (res.data.city_name) {
                tmpAddr += res.data.city_name
              }
              if (res.data.area_name) {
                tmpAddr += res.data.area_name
              }
            } else {
              tmpAddr = '全部地区'
            }
            res.data.address = tmpAddr
            this.stepList = res.data.step_data
            this.detail = res.data
            console.log(res)
          }
        },
        err => {
          this.loading = false;
        }
      );
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
    // 获取领取记录
    getTaskList() {
      this.ajax("userRewardLists", {
          page: this.curPage,
          size: 10,
          coopera_id: "",
          start_time: this.dateArr ? (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[0])) : '',
          end_time: this.dateArr ?  (this.utils.dateFormat('yyyy-MM-dd',this.dateArr[1])) : '', 
          status: this.status,
          reward_make_id: this.searchId,
          title: this.searchName,
          publish: this.activeName
        }, "查询失败",
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
      this.loading = true;
      this.getTaskList();
    },
    // 查看/编辑
    editItem(row) {
      this.rewardDetail(row)
      this.isDetail = true
      this.selectRow = row
    },
    // 显示步骤图片
    toShowViewer (pic) {
      if(pic) {
          this.showViewer = true
          this.showViewImgs = pic.split(',')
      }
    },
    // 关闭图片大图
    closeImgView() {
        this.showViewer = false
        this.showViewImgs = []
    },
  }
};
</script>
<style lang="less">
.claimList {
  padding: 20px;
  .pic-con {
      img {
          width: 100px;
          height: 100px;
          object-fit: cover;
      }
  }
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
        // margin-right: 10px;
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
.el-popover__title {
  font-weight: bold
}
.popover-btn-con {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
    .el-image-viewer__wrapper {
    z-index: 99999999!important
  }
</style>