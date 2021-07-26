<template>
    <div class="monthForm" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>监管查询报表</el-breadcrumb-item>
                    <el-breadcrumb-item class="breadcrumb-tit">月季业务状况表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <el-button size="small" @click="initData()">刷新</el-button>
        </div>

        <div class="search-con">
            <el-form class="clearfix"  label-width="80px">
                <el-form-item label="机构名称">
                    <el-input placeholder="请输入机构名称" v-model="coopera_name"></el-input>
                </el-form-item>
                <el-form-item label="年份">
                    <el-date-picker
                        v-model="year"
                        type="year"
                        placeholder="选择年">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker
                    v-model="start"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-date-picker
                    v-model="end"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" size="small" :loading="loading">{{loading ? '获取数据中...' : '查询'}}</el-button>
            </el-form>
        </div>

        <div class="table-con">
            <div>
              <el-table border :data="tableData" v-if="tableData && tableData.length > 0" default-expand-all>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table border :data="props.row.children" :show-header="false" default-expand-all >
                            <el-table-column type="expand">
                                <template slot-scope="prop">
                                    <el-table border :data="prop.row.children" :show-header="false" >
                                        <el-table-column width="50" align="center"></el-table-column>
                                        <el-table-column prop="title" label="会计科目" align="center">
                                            <template slot-scope="scope">
                                                ({{scope.row.num}}){{scope.row.title}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="chuJie" label="期初借方余额" align="center"></el-table-column>
                                        <el-table-column prop="chuDai" label="期初贷方余额" align="center"></el-table-column>
                                        <el-table-column prop="benJie" label="本期借方发生额" align="center"></el-table-column>
                                        <el-table-column prop="benDai" label="本期贷方发生额" align="center"></el-table-column>
                                        <el-table-column prop="qiJie" label="期末借方余额" align="center"></el-table-column>
                                        <el-table-column prop="qiDai" label="期末贷方余额" align="center"></el-table-column>
                                        <el-table-column prop="num" label="科目代号" align="center"></el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                            <el-table-column prop="title" label="会计科目" align="center">
                                <template slot-scope="scope">
                                    ({{scope.row.num}}){{scope.row.title}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="chuJie" label="期初借方余额" align="center"></el-table-column>
                            <el-table-column prop="chuDai" label="期初贷方余额" align="center"></el-table-column>
                            <el-table-column prop="benJie" label="本期借方发生额" align="center"></el-table-column>
                            <el-table-column prop="benDai" label="本期贷方发生额" align="center"></el-table-column>
                            <el-table-column prop="qiJie" label="期末借方余额" align="center"></el-table-column>
                            <el-table-column prop="qiDai" label="期末贷方余额" align="center"></el-table-column>
                            <el-table-column prop="num" label="科目代号" align="center"></el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="会计科目" align="center">
                    <template slot-scope="scope">
                        (1){{scope.row.title}}
                    </template>
                </el-table-column>
                <el-table-column prop="chuJie" label="期初借方余额" align="center"></el-table-column>
                <el-table-column prop="chuDai" label="期初贷方余额" align="center"></el-table-column>
                <el-table-column prop="benJie" label="本期借方发生额" align="center"></el-table-column>
                <el-table-column prop="benDai" label="本期贷方发生额" align="center"></el-table-column>
                <el-table-column prop="qiJie" label="期末借方余额" align="center"></el-table-column>
                <el-table-column prop="qiDai" label="期末贷方余额" align="center"></el-table-column>
                <el-table-column prop="num" label="科目代号" align="center"></el-table-column>
              </el-table>

              <!-- <el-pagination
              background
              :current-page="curPage"
              layout="prev, pager, next"
              :total="totalPage*10"
              @current-change="handleCurPageChange">
              </el-pagination> -->
          </div>
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
export default {
  name: "monthForm",
  data() {
    return {
      tableData: [
        {
          title: "资产类合计",
          chuJie: 0,
          chuDai: 0,
          benJie: 0,
          benDai: 0,
          qiJie: 0,
          qiDai: 0,
          num: "",
          children: [
            {
              title: "库存现金",
              chuJie: 0,
              chuDai: 0,
              benJie: 0,
              benDai: 0,
              qiJie: 0,
              qiDai: 0,
              num: "101"
            },
            {
              title: "银行存款",
              chuJie: 0,
              chuDai: 0,
              benJie: 0,
              benDai: 0,
              qiJie: 0,
              qiDai: 0,
              num: "102",
              children: [
                {
                  title: "合作社银行存款",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "10201"
                }
              ]
            },
            {
              title: "流动性准备金存款",
              chuJie: 0,
              chuDai: 0,
              benJie: 0,
              benDai: 0,
              qiJie: 0,
              qiDai: 0,
              num: "103",
              children: [
                {
                  title: "股金流动性准备金存款",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "10301"
                },
                {
                  title: "互助金流动性准备金存款",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "10302"
                },
                {
                  title: "超额流动性准备金存款",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "10303"
                }
              ]
            },
            {
              title: "社员投放金",
              chuJie: 0,
              chuDai: 0,
              benJie: 0,
              benDai: 0,
              qiJie: 0,
              qiDai: 0,
              num: "111",
              children: [
                {
                  title: "投放金",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "11101"
                },
                {
                  title: "消费借款投放金",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "11102"
                }
              ]
            },
            {
              title: "减：呆账准备",
              chuJie: 0,
              chuDai: 0,
              benJie: 0,
              benDai: 0,
              qiJie: 0,
              qiDai: 0,
              num: "112"
            },
            {
              title: "应收资金占用费",
              chuJie: 0,
              chuDai: 0,
              benJie: 0,
              benDai: 0,
              qiJie: 0,
              qiDai: 0,
              num: "113",
              children: [
                {
                  title: "应收占用费",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "11301"
                },
                {
                  title: "消费借款计提",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "11302"
                }
              ]
            },
            {
              title: "其他应收款",
              chuJie: 0,
              chuDai: 0,
              benJie: 0,
              benDai: 0,
              qiJie: 0,
              qiDai: 0,
              num: "114",
              children: [
                {
                  title: "pos应收款",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "11401"
                },
                {
                  title: "通总应收",
                  chuJie: 0,
                  chuDai: 0,
                  benJie: 0,
                  benDai: 0,
                  qiJie: 0,
                  qiDai: 0,
                  num: "11402"
                }
              ]
            },
          ]
        }
      ],
      curPage: 1,
      totalPage: 1,
      loading: false,
      coopera_name: "",
      year: "",
      start: "",
      end: ""
    };
  },
  methods:{
      handleCurPageChange(val){

      }
  }
};
</script>
<style lang="less">
.monthForm {
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
      width: 20%;
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
  .el-table__expanded-cell[class*="cell"] {
    padding: 0;
  }
}
</style>