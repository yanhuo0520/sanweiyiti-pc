<template>
    <div class="addGoods" v-loading="loading">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
            <div class="breadcrumb-con">
                <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
                <div class="breadcrumb-info">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: lastPath }">商品列表</el-breadcrumb-item>
                        <el-breadcrumb-item class="breadcrumb-tit">商品详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                  <div class="back-con" @click="goBack">
                    <img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
                    <span class="back-text">返回上一页</span>
                  </div>
            </div>

            <div class="form-item-con clearfix">
                <el-form-item label="商品名称:" prop="goods_name">
                    <el-input v-model="ruleForm.goods_name"   placeholder="请输入商品名称" readonly></el-input>
                </el-form-item>
                <el-form-item label="助记码:">
                    <el-input v-model="ruleForm.simple_code"  placeholder="请输入助记码" readonly></el-input>
                </el-form-item>
                <el-form-item label="条码:">
                    <el-input v-model="ruleForm.bar_code"  placeholder="请输入商品条码" readonly></el-input>
                </el-form-item>
                <el-form-item label="分类:" prop="cate_id">
                   <el-input style="width:40%;display:inline-block" v-model="ruleForm.assort_name" placeholder="请选择商城分类"  readonly></el-input>
                   <el-input style="width:40%;display:inline-block" v-model="ruleForm.cate_name" placeholder="请选择店铺分类"  readonly></el-input>
                </el-form-item>
                <el-form-item label="商品缩略图:" prop="thumb" style="height:88px;">
                    <template v-if="thumbs && thumbs.length > 0">
                        <el-upload class="avatar-uploader" action="http://coopera.xfd365.com/user/auth/uploadImg" disabled list-type="picture-card"  :on-preview="handleThumbPreview"   :show-file-list='true'  :file-list='thumbs'>
                          <i class="el-icon-plus thumb-icon" ></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </template>
                    <template v-else>
                      <span>暂未上传</span>
                    </template>
                </el-form-item>
                <el-form-item label="商品视频:">
                  <template v-if="ruleForm.video_url">
                    <el-upload class="avatar-uploader" action="http://coopera.xfd365.com/user/auth/uploadImg" :show-file-list="false"  disabled>
                        <video :src="ruleForm.video_url" class="avatar" autoplay controls></video>
                    </el-upload>
                  </template>
                  <template v-else>
                      <span>暂未上传</span>
                  </template>
                </el-form-item>
                <el-form-item label="生产日期:">
                    <el-date-picker v-model="ruleForm.production_date" type="date" placeholder="选择生产日期" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="保质期:">
                    <el-input v-model="ruleForm.guarantee_period" placeholder="请输入保质期" readonly></el-input>
                    <span>天(-1为不过期)</span>
                </el-form-item>
                <el-form-item label="库存警告:">
                    <el-input v-model="ruleForm.storage_warning" placeholder="请输入库存警告" readonly></el-input>
                    <span>-1为不警告</span>
                </el-form-item>
                <el-form-item label="商品相册:">
                  <template v-if="imageUrls && imageUrls.length > 0">
                    <el-upload class="avatar-uploader" disabled action="http://coopera.xfd365.com/user/auth/uploadImg" :on-preview="handlePictureCardPreview" list-type="picture-card" :show-file-list='true' :file-list='imageUrls'>
                      <i class="el-icon-plus album-icon" ></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogThumbVisible">
                      <img width="100%" :src="dialogThumb" alt="">
                    </el-dialog>
                  </template>
                  <template v-else>
                    <span>暂未上传</span>
                  </template>
                </el-form-item>
                <el-form-item label="是否优选:">
                  <template v-if="youxuanRadio == 0">
                      <span>非优选商品</span>
                  </template>
                  <template v-if="youxuanRadio == 1">
                      <span>优选商品</span>
                  </template>
                </el-form-item>
            </div>
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">商品规格</span>
                <div class="bg"></div>
            </div>
            <template v-if="specArr && specArr.length > 0">
                <el-table :data="specArr"  border  class="specData" >
                  <el-table-column label="商品名称" width="180" align="center">{{ruleForm.goods_name}}</el-table-column>
                  <el-table-column  width="180" v-if="ruleForm.spcifi && ruleForm.spcifi.length > 0 && ruleForm.spcifi[0].oneStylesTitle != ''" :label="ruleForm.spcifi[0].oneStylesTitle" align="center">
                      <template slot-scope="scope">
                          {{scope.row.oneStylesName}}
                      </template>
                  </el-table-column>
                  <el-table-column width="180" v-if="ruleForm.spcifi && ruleForm.spcifi.length > 0 && ruleForm.spcifi[0].twoStylesTitle != ''" :label="ruleForm.spcifi[0].twoStylesTitle" align="center">
                      <template slot-scope="scope">
                          {{scope.row.twoStylesName}}
                      </template>
                  </el-table-column>
                  <el-table-column  width="180" v-if="ruleForm.spcifi && ruleForm.spcifi.length > 0 && ruleForm.spcifi[0].threeStylesTitle != ''" :label="ruleForm.spcifi[0].threeStylesTitle" align="center">
                      <template slot-scope="scope">
                          {{scope.row.threeStylesName}}
                      </template>
                  </el-table-column>
                  <el-table-column prop="pic" label="图片" width="180" align="center">
                      <template slot-scope="scope">
                          <template v-if="scope.row.pic">
                            <el-upload class="avatar-uploader" action="http://coopera.xfd365.com/user/auth/uploadImg" :show-file-list="false" accept="image/*" disabled >
                                <img :src="scope.row.pic" class="avatar">
                            </el-upload>
                          </template>
                          <template v-else>
                            <span>暂未上传</span>
                          </template>
                      </template>
                  </el-table-column>
                  <el-table-column prop="retail_price" label="价格" align="center">
                      <template slot-scope="scope">
                          <el-input v-model="scope.row.retail_price" readonly></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column prop="purchase_price" label="成本价" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.purchase_price" readonly></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="discount_price" label="会员价" align="center">
                      <template slot-scope="scope">
                          <el-input v-model="scope.row.discount_price" readonly></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column prop="storage" label="库存" align="center">
                      <template slot-scope="scope">
                          <el-input v-model="scope.row.storage" readonly></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column prop="self_code" label="自编码" align="center">
                      <template slot-scope="scope">
                          <el-input v-model="scope.row.self_code" readonly></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column prop="bar_code" label="条码" align="center">
                      <template slot-scope="scope">
                          <el-input v-model="scope.row.bar_code" readonly></el-input>
                      </template>
                  </el-table-column>
              </el-table>
            </template>
             <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">商品详情</span>
                <div class="bg"></div>
            </div>
            <div class="order-detail-con" v-if="ruleForm.content">
              <div v-html="ruleForm.content"></div>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "addGoods",
  data() {
    return {
      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      lastPath: '',
      lastPathName: '',
      goods_id: null,
      isEdit: true, // 是否可以编辑
      isApprove: false,
      ruleForm: {
        goods_name: "", //商品名称
        simple_code: "", //助记码
        bar_code: "", //条码
        desc: "", //描述
        thumb: "", //商品缩略图
        video_url: "", //商品视频
        cate_id: "", //店铺分类id
        assort_id:'',//商城分类id
        production_date: new Date(), //生产日期
        guarantee_period: "-1", //保质期
        storage_warning: "-1", //库存警告
        fahuo_date:'',//发货时间
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        thumb: [
          { required: true, message: "请选择商品缩略图", trigger: "blur" }
        ]
      },
      assort: "",
      cate: "",
      assortOptions: [],
      cateOptions: [],
      submitLoading: false,

      isFanli: false,
      isAdd: false,
      specs: [],
      specPrices: [],
      // 批量填写价格
      defaultAddPrices: {
        price: "", //价格，
        cost: "", //成本价
        stock: "", //库存
        self_code: "", //自编码
        bar_code: "", //条码
        discount_price: "", //会员价
        tiered:[],//阶梯价格
      },
      newSpecName: [
        { name: "", imgUrl: "" },
        { name: "", imgUrl: "" },
        { name: "", imgUrl: "" }
      ],
      propIdx: 0,
      goodsIndex: 0,
      piliangData: [
        {
          prices: {
            price: "",
            cost: "", //成本价
            stock: "", //库存
            // self_code: "", //自编码
            // bar_code: "", //条码
            discount_price: "" //会员价
          }
        }
      ],

      specArr: [],
      loading: false,

      isRefresh:1,
      imageUrls: [],//存放图片路径的数组
		  dialogImageUrl: '',
      dialogVisible: false,
      
      dialogThumbVisible:false,
      dialogThumb:'',
      thumbs:[],

      yushouRadio:'0',
      youxuanRadio: '0',

      pickerOptions: {
         disabledDate: (time) => {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
          }
      },
      
      isAddPrice:false,//阶梯价格
      priceList:[{
        least: 1,
        most: '',
        price: '',
        addorReduce:'+'
      },{
        least: 1,
        most: '0',
        price: '',
        addorReduce:''
      }],//阶梯列表
      addPriceIndex:0,
    };
  },
  computed: {
    tableData() {
      var arr = this.specPrices;
      return arr;
    }
  },
  activated() {
    let that = this;
    this.assortList();
    this.cateList();
    //判断是否为管理员
    let adminType = localStorage.getItem('is_admin')
    if(adminType && Number(adminType) >= 1) {
      this.isAdmin = true
      this.adminType = adminType
    }
    this.isEdit = true
    this.lastPath = this.$route.query.lastPath
    this.lastPathName = '商品审核列表',
    this.isApprove = this.$route.query.isApprove
    this.isEdit = false
    this.imageUrls = []
    this.thumbs = []
    this.youxuanRadio = '0'
    if(this.$route.query.goods_id) {
      this.loading = true
      this.ruleForm = {}
      this.ajax("goodsDetail",{goods_id: this.$route.query.goods_id},"查询失败",res => {
          this.loading = false
          if (res.errno == 0) {
            this.goods_id = this.$route.query.goods_id ? this.$route.query.goods_id : null
            this.ruleForm = res.data;
            this.ruleForm.production_date = this.$timestampToTime(
              this.ruleForm.production_date
            );
            this.specArr = res.data.spcifi;
            this.yushouRadio = res.data.booking.toString()
            this.youxuanRadio = res.data.is_you+''
            // if(res.data.cate_id) {
            //   this.ruleForm.cate_id = Number(res.data.cate_id);
            // }
            if(Number(res.data.cate_id)) {
              this.ruleForm.cate_id = Number(res.data.cate_id);
            } else {
                this.ruleForm.cate_id = ''
            }
            if(Number(res.data.assort_id)) {
              this.ruleForm.assort_id = Number(res.data.cate_id);
            } else {
              this.ruleForm.assort_id = ''
            }
            if(res.data.thumb) {
              let tmpThumb = res.data.thumb.split(',')
              tmpThumb.forEach((item,index) =>{
                this.thumbs.push({url: item})
              })
            }
            if(res.data.album) {
              let tmpAlbum = res.data.album.split(',')
              tmpAlbum.forEach((item,index) =>{
                this.imageUrls.push({url: item})
              })
            }
            setTimeout(() =>{
              if(document.querySelector('.thumb-icon') && document.querySelector('.thumb-icon').parentNode) {
                  if(that.thumbs && that.thumbs.length > 0) {
                    document.querySelector('.thumb-icon').parentNode.style.display = 'none'
                  } else {
                    document.querySelector('.thumb-icon').parentNode.style.display = 'block'    
                  }
                  that.initThumb = false
              }
            })
            setTimeout(() =>{
              if(document.querySelector('.album-icon') && document.querySelector('.album-icon').parentNode) {
                  if(that.thumbs && that.thumbs.length > 0) {
                    document.querySelector('.album-icon').parentNode.style.display = 'none'
                  } else {
                    document.querySelector('.album-icon').parentNode.style.display = 'block'    
                  }
                  that.initThumb = false
              }
            })

          }
        },
        err => {
          this.loading = false
        }
      );
    } else {
      this.ruleForm = {
        goods_name: "", //商品名称
        simple_code: "", //助记码
        bar_code: "", //条码
        desc: "", //描述
        thumb: "", //商品缩略图
        video_url: "", //商品视频
        cate_id: "", //分类id
        assort_id:'',
        production_date: new Date(), //生产日期
        guarantee_period: "-1", //保质期
        storage_warning: "-1" //库存警告
      };
      this.thumbs = []
       this.imageUrls = []
      this.specArr = []
    }
    
  },
  methods: {
    // 返回上一页
    goBack() {
        this.$router.push({
            path:this.lastPath,
            query:{
                isRefresh: this.isRefresh
            }
        })
    },
    // 商城分类
    assortList() {
      let cooperaInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
      this.ajax("cateList",{table: "assort",},"",res => {
          if (res.errno == 0) {
            this.assortOptions = res.data;
          }
        },err => {}
      );
    },
    // 店铺分类
    cateList() {
      let cooperationInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
      this.ajax("cateList",{
          table: "cate",
          coopera_id: cooperationInfo.id,
        },"",res => {
          if (res.errno == 0) {
            this.cateOptions = res.data;
          }
        },err => {}
      );
    },
    // 预览
    handleThumbPreview(file){
      this.dialogThumb = file.url;
      this.dialogThumbVisible = true;
    },
    //点击图片预览时
    handlePictureCardPreview(file) {  
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 审核商品
    handleBtn(type) { //1-同意 2-拒绝
      if(type == 1) {
        this.$confirm('是否同意审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          this.goodsVerifyApi(type,'')
        }).catch(() => {});
      } else {
        this.$prompt('请输入拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: '请输入拒绝原因',
          type: 'warning',
          center: true,
        }).then(({ value }) => {
          this.goodsVerifyApi(type,value)
        }).catch(() => {});
      }
    },
    // 请求商品审核API
	goodsVerifyApi(status,value) {
		this.ajax( "goodsVerify",{
        goods_id: this.$route.query.goods_id,
        status: status,
        note: value
        },(status == 1 ? '同意' : '拒绝') + '失败',res => {
          if (res.errno == 0) {
              this.isRefresh = 2
              this.ruleForm.check_status = status
              this.$message.success((status == 1 ? '同意' : '拒绝') + '成功');
          }
        },err => {}
      );
  },
  }
};
</script>
<style lang="less">
.addGoods {
  padding: 20px;
  .tit-con {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        padding: 20px 0;
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
    .order-detail-con {
      padding: 20px 0;
      max-height: 300px;
      overflow-y: auto;
    }
  // 去除upload组件过渡效果
  .el-upload-list__item {
    transition: none !important;
  }
   .color-blue {
        color: #3b6af1;
      }
  .form-item-con {
    margin: 2rem 0;
    position: relative;
    .el-form-item {
      width: 50%;
      float: left;
      .el-form-item__label {
        font-size: 0.9rem;
      }
      .el-input {
        width: 80%;
        .read-idCard {
          color: #3b6af1;
          background: #f0f8ff;
          font-size: 0.75rem;
          cursor: pointer;
        }
        .read-idCard:active {
          opacity: 0.6;
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
        margin-left: 0 !important;
      }
      .img-con {
        max-width: 100%;
        border: 1px solid #e4edf6;
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
          max-height: 100%;
        }
      }

      .upload-btn {
        width: 100%;
        padding: 0.3rem 0;
        background: #e4edf6;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3b6af1;
        font-size: 0.9rem;
        cursor: pointer;
      }
     
      .upload-btn:hover {
        opacity: 0.6;
      }
    }
  }
  .el-form-item {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 6.25rem;
      height: 6.25rem;
      line-height: 6.25rem
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
    .el-upload--picture-card{
      background: transparent;
    }
    .el-upload-list--picture-card{
      .el-upload-list__item{
        width: 6.25rem;
        height: 6.25rem;
      }
    }
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .btn-con {
    margin: 20px auto;
    display: block;
  }

  /* 规格 */
  .specification {
    /* 规格 */

    > p {
      color: #000;
      margin: 10px 0;
    }
    > button {
      width: 130px;
      height: 34px;
      line-height: 34px;
      border: 1px solid #00cd92;
      color: #00cd92;
      background-color: #f1f1f1;
      border-radius: 6px;
      margin: 10px 0;
    }
    > .goodsNorm {
      .goodsInput {
        .el-row {
          background: #f8f8f8;
          padding: 10px 6px;
          display: flex;
          align-items: center;
          .el-col:last-of-type {
            text-align: right;
            i {
              color: #00cd92;
              cursor: pointer;
              font-size: 20px;
            }
          }
        }

        .goodsImg {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          > div {
            margin-right: 10px;
            > div {
              margin-bottom: 10px;
            }
            > p {
              position: relative;
              > i {
                position: absolute;
                right: 5px;
                top: 12px;
                cursor: pointer;
              }
            }
          }
          .goodsProp {
            width: 130px;
            height: 130px;
            text-align: center;
            line-height: 130px;
            .avatar {
              width: 130px;
              height: 130px;
            }
          }
          > button {
            margin: 0 0 10px 0;
            height: 40px;
          }
        }
      }
      button {
        width: 130px;
        height: 34px;
        line-height: 34px;
        border: 1px solid #00cd92;
        color: #00cd92;
        background-color: #f1f1f1;
        border-radius: 6px;
        margin: 10px 0;
      }
    }

    .el-table {
      .cell {
        display: flex;
        align-items: center;
        > span {
          width: 50px;
          border: 1px solid #00cd92;
          color: #00cd92;
          background: #f1f1f1;
          border-radius: 6px;
          margin: 0 10px;
          cursor: pointer;
        }
      }
    }
  }


  // 阶梯价格
  .list{
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    p{
      width: 40%;
    }
    .el-input{
      width: 50%;
    }
    span{
      font-size: 20px;
      border: 1px solid #409EFF;
      color: #409EFF;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
  }
}
.specData img {
  width: 60px;
  height: 60px;
}
.goodsImg .el-input,
.goodsImg .el-input__inner {
  width: 130px !important;
}
.specTable .cell {
  padding-left: 2px !important;
}
.specTable td,
.specTable th {
  padding-left: 8px;
}
.specTable .el-input__inner,
.piliang .el-input__inner {
  width: 100px !important;
  padding: 0 5px;
}
.goodsProp .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 130px;
  height: 100%;
}

.piliang thead {
  display: none !important;
}
.wid80 {
  // margin:0 auto 50px
}
.wid80 .el-dialog {
  width: 80%;
  //   margin: 0 !important;
}
.goodsProp img {
  width: 130px;
  height: 130px;
  object-fit: cover;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.hide {
  display: none !important;
}
.goods-title {
  color: #333;
  font-weight: 700;
  padding: 10px 0;
}
.goods-norm-input {
  width: 80%;
  background-color: #f8f8f8;
  position: relative;
  padding: 10px 6px;
}
.goods-norm-input .form-control {
  width: 130px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 6px 12px;
}
.form-control:focus {
  border: 1px solid rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
.goods-properties-con {
  overflow: auto;
  zoom: 1;
}
.goods-properties-con .goods-properties-item {
  width: 130px;
  position: relative;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
  border-radius: 6px;
}
.goods-properties-con .form-control {
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 6px 0 6px 4px;
}
#addProperties,
#addGoodsNorm {
  display: inline-block;
  width: 130px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #016087;
  text-align: center;
  color: #016087;
  background-color: #f1f1f1;
  margin-top: 10px;
  border-radius: 6px;
}
/* .del-icon-hover { color: #00a0d2;} */
#delProperties,
#delGoodsNorm {
  position: absolute;
  top: 14px;
  right: 10px;
  transform: translateY(-50%);
  font-weight: 700;
  opacity: 0.1;
  color: #00a0d2;
  cursor: pointer;
  font-size: 20px;
}
#delGoodsNorm {
  top: 50%;
}
#delProperties:hover {
  opacity: 1;
}
.approve-btn-con {
        display: flex;
        align-items: center;
       justify-content: center;
        padding-top: 5rem;
        padding-bottom: 2rem;
        .el-button {
            width: 23%;
            padding: 0.9rem;
        }
    }
</style>
