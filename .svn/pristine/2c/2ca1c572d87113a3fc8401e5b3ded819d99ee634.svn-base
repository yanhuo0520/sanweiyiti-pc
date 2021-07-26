<template>
    <div class="add-task" v-loading="loading">
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>赏金任务</el-breadcrumb-item>
                    <el-breadcrumb-item>添加任务</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" style="margin-top: 0.5rem" label-width="90px">
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">基础信息</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <!-- <el-form-item  prop="card_front" class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con idcard-z">
                        <div class="idcard-img" @click="showImgView(ruleForm.card_front)">
                            <img class="img" :src="ruleForm.card_front ? ruleForm.card_front : idCardZ" alt="">
                        </div>
                        <div class="idcard-text" >
                            <el-upload action="http://coopera.xfd365.com/user/auth/uploadImg"  :disabled="uploadIdCardZLoading || !isEdit" :before-upload="uploadCardZBefore" :on-success="uploadCardZSuccess" :on-error="uploadCardZErr" :show-file-list="false" accept="image/*" >
                                {{uploadIdCardZLoading ? '重新上传...' : (uploadIdCardZErr ? '重新上传' : '点击上传身份证正面')}}
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item  prop="card_back" class="idcard-item-con" style="height:auto">
                   <div class="idcard-img-con idcard-f">
                        <div class="idcard-img" @click="showImgView(ruleForm.card_back)">
                            <img class="img" :src="ruleForm.card_back ? ruleForm.card_back : idCardF" alt="">
                        </div>
                        <div class="idcard-text" >
                            <el-upload action="http://coopera.xfd365.com/user/auth/uploadImg"  :disabled="uploadIdCardFLoading || !isEdit" :before-upload="uploadCardFBefore" :on-success="uploadCardFSuccess" :on-error="uploadCardFErr" :show-file-list="false" accept="image/*" >
                                {{uploadIdCardFLoading ? '正在上传...' : (uploadIdCardFErr ? '重新上传' : '点击上传身份证反面')}}
                            </el-upload>
                        </div>
                    </div>
                </el-form-item> -->
                <el-form-item label="任务类型:" prop="type" style="width:24%">
                    <el-select v-model="ruleForm.type"  placeholder="请选择任务类型">
                        <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务标题:" prop="title" style="width:24%">
                    <el-input v-model="ruleForm.title"  maxlength="12" placeholder="请输入任务标题" ></el-input>
                </el-form-item>
                <el-form-item label="项目名称:" prop="name" style="width:24%">
                    <el-input v-model="ruleForm.name"  maxlength="7" placeholder="项目名称(非必填)" ></el-input>
                </el-form-item>
               
                <el-form-item label="任务所属区域:"  style="width:24%">
                    <el-cascader ref="address" v-model="addressActive" :options="addressOptions" placeholder="请选择任务所属区域" :props="{ label: 'name', value: 'code' }" @change="selectAddress" @expand-change="expandAddress"></el-cascader>
                    <!-- <el-input v-model="ruleForm.address" placeholder="请选择任务所属区域" readonly></el-input> -->
                </el-form-item>
            </div>
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">任务说明</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="任务说明:" prop="note" style="height:auto; width:50%">
                    <el-input type="textarea" :rows="2" placeholder="请输入任务说明" maxlength="200" show-word-limit v-model="ruleForm.note"></el-input>
                </el-form-item>
            </div>
             <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">做单信息</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="接单限时:" prop="time_limit"  style="height:auto">
                    <el-select v-model="ruleForm.time_limit"  placeholder="请选择接单限时">
                        <el-option v-for="item in timeLimitOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核时间:" prop="verify_time"  style="height:auto">
                    <el-select v-model="ruleForm.verify_time"  placeholder="请选择审核时间">
                        <el-option v-for="item in verifyTimeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="做单次数:" prop="make_num" style="height:auto">
                    <el-select v-model="ruleForm.make_num"  placeholder="请选择做单次数">
                        <el-option v-for="item in makeNumOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">悬赏信息</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="悬赏单价:" prop="price">
                    <el-input v-model="ruleForm.price" placeholder="请输入悬赏单价" ></el-input>
                </el-form-item>
                <el-form-item label="悬赏数量:" prop="num">
                    <el-input v-model="ruleForm.num" placeholder="请输入悬赏数量" ></el-input>
                </el-form-item>
                <el-form-item label="预付赏金:">
                    <el-input v-model="ruleForm.advance" readonly></el-input>
                </el-form-item>
            </div>
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">做单步骤</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-button type="primary"  @click="showStepList">{{stepList && stepList.length > 0 ? '已添加'+stepList.length+'步,点击查看' : '添加做单步骤' }}</el-button>
            </div>
            <div class="btn-con" >
                <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">{{submitLoading ? '提交中...' : '发布任务'}}</el-button>
            </div>
        </el-form>
        <el-drawer  :visible.sync="isShowDetail" :with-header="false" size="55%">
            <div class="drawer-tit-con" >
              <div class="tit">步骤列表</div>
              <div class="icon-con" @click="isShowDetail = false" >
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <el-form>
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">步骤列表</span>
                    <div class="bg"></div>
                </div>
                <div class="tab-box">
                    <div class="tab-btn-con">
                        <div>
                            <!-- <el-button type="primary" plain round :disabled="!stepList || stepList.length < 2">设置排序</el-button> -->
                            <el-button type="primary" round @click="addStep('add')">添加步骤</el-button>
                        </div>
                    </div>
                    <el-tabs v-model="curStepIndex" type="border-card" v-if="stepList && stepList.length > 0">
                        <el-tab-pane v-for="(item, index) in stepList" :key="index" :label="'步骤'+(index+1)" :name="index">
                            <div style="padding:10px;text-align: right">
                                <el-button type="primary" plain round @click="addStep('edit', item)">编辑</el-button>
                                <el-button type="danger" round @click="delStepItem(item, index)">删除</el-button>
                            </div>
                            <div class="tab-con">
                                <p class="title">{{stepList[index].step_title}}</p>
                                <p class="desc">{{stepList[index].content}}</p>
                                <div class="pic-con">
                                    <img class="pic-item" v-for="(subItem, subIndex) in stepList[index].picList" :key="subIndex" :src="subItem" @click.stop="imgPreview(subItem,subIndex,'step')" alt="">
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-form>
        </el-drawer>   

        <el-dialog title="添加步骤" :visible.sync="isAddEditShow">
            <el-form :model="stepItemForm">
                <el-form-item label="步骤类型" >
                    <el-radio-group v-model="stepItemForm.type">
                        <el-radio label="1">图文信息</el-radio>
                        <el-radio label="2">链接/口令</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题" >
                    <el-input v-model="stepItemForm.step_title" placeholder="请输入步骤标题" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="stepItemForm.type == 2 ? '口令/链接' : '描述'" >
                    <el-input v-model="stepItemForm.content" :placeholder="'请输入' + (stepItemForm.type == 2 ? '任务口令/链接' : '步骤描述')" autocomplete="off"></el-input>
                </el-form-item>
                <template v-if="stepItemForm.type == 1">
                    <el-upload action="http://coopera.xfd365.com/user/auth/uploadImg"  list-type="picture-card" 
                        :before-upload="uploadPicBefore" 
                        :on-success="uploadPicSuccess" 
                        :on-error="uploadPicErr"  
                        :file-list="stepItemForm.fileList"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAddEditShow = false">取 消</el-button>
                <el-button type="primary" @click="addStepConfirm">确 定</el-button>
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
  name: "addTask",
  data() {
    return {
      loading: false,
      ruleForm: {
        title: '',
        name: '',
        type: '',
        note: '',
        time_limit: '',
        verify_time: '',
        make_num: '',
        price: '',
        num: '',
        advance: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入任务标题', trigger: 'blur' }
        ], 
        type: [{
            required: true, message: '请选择任务类型', trigger: 'change' 
        }],
        note: [
          { required: true, message: '请输入任务说明', trigger: 'blur' }
        ], 
        time_limit: [
          { required: true, message: '请选择接单限时', trigger: 'change' }
        ], 
        verify_time: [
          { required: true, message: '请选择审核时间', trigger: 'change' }
        ], 
        make_num: [
          { required: true, message: '请选择做单次数', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入悬赏单价', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入悬赏数量', trigger: 'blur' }
        ],
      },

      provinceCode: '',
      cityCode: '',
      areaCode: '',

      timeLimitOption: [],
      verifyTimeOption: [],
      makeNumOption: [],
      typeOption: [],

      addressOptions: [],
      addressActive:  [],

      submitLoading: false,
      showViewer: false, // 是否显示图片大图
      showViewImgs: [], // 大图url
      

      isShowDetail: false,
      curStepIndex: 0,
      

      stepList: [],
      addEditType: 'add',
      isAddEditShow: false,
      stepItemForm: {
        step_title: '',
        content: '',
        type: '1',
        picList: [],
        fileList: []
      }
      
    };
  },
   components: { ElImageViewer },
  activated() {
    this.getConfig('reward_time_limit')
    this.getConfig('reward_verify_time')
    this.getConfig('reward_make_num')
    this.getConfig('reward_type')
    this.getAddress(1,'')
    this.initData()
  },
//   beforeRouteLeave (to, from, next) {
//       this.$confirm('是否保留此次编辑?', '提示', {
//         confirmButtonText: '保留',
//         cancelButtonText: '离开',
//         type: 'warning'
//         }).then(() => {
//         this.$message({
//             type: 'success',
//             message: '删除成功!'
//         });
//         next()
//         }).catch(() => {
//         this.$message({
//             type: 'info',
//             message: '已取消删除'
//         }); 
//         next(false)         
//     });
      
//   },
  methods: {
    // 获取配置列表
    getConfig(table) {
      this.ajax("getConfig", {
          table: table
      }, "获取身份列表失败", res => {
        if (res.errno == 0) {
            if (table == 'reward_time_limit') {
                res.data.forEach(item =>{
                    item.label = item.time_limit_name,
                    item.value = item.time_limit_id
                })
                this.timeLimitOption = res.data
            } else if (table == 'reward_verify_time') {
                res.data.forEach(item =>{
                    item.label = item.verify_time_name,
                    item.value = item.verify_time_id
                })
                this.verifyTimeOption = res.data
            } else if (table == 'reward_make_num') {
                res.data.forEach(item =>{
                    item.label = item.make_num_name,
                    item.value = item.make_num_id
                })
                this.makeNumOption = res.data
            } else if (table == 'reward_type') {
                res.data.forEach(item =>{
                    item.label = item.type_name,
                    item.value = item.type_id
                })
                this.typeOption = res.data
            }
        }
      });
    },
    // 获取省市区
    getAddress(level,code) {
        let that = this
        // that.loading = true;
		that.ajax('cooperative',{
            level: level,
			code: code,
        },'获取地址失败',res =>{
            // that.loading = false
            if(level < 3) {
                res.data.forEach(item =>{
                    item.children = []
                })
            }
			if(res.errno == 0) {
                if(level == 1) {
				    that.addressOptions = res.data
                } else if(level == 2){
                    that.addressOptions[that.oneIndex].children = res.data
                } else if(level == 3){
                    that.addressOptions[that.oneIndex].children[that.twoIndex].children = res.data
                }
			}
		}, err =>{
			// that.loading = false
		})
    },
    // 展开地址
    expandAddress(arr) {
        if(arr.length == 1) {
            for(let i = 0; i < this.addressOptions.length; i++) {
                if(this.addressOptions[i].code == arr[0]) {
                    this.oneIndex = i
                    this.oneText = this.addressOptions[i].name
                    this.addressOptions[i].children = []
                    break;
                }
            }
        } else if(arr.length == 2) {
            let twoArr = this.addressOptions[this.oneIndex].children
           for(let i = 0; i < twoArr.length; i++) {
                if(twoArr[i].code == arr[1]) {
                    this.twoIndex = i
                    this.twoText = twoArr[i].name
                    twoArr[i].children = []
                    break;
                }
            }
        }
        this.getAddress(arr.length+1,arr[arr.length - 1])
    },
    // 选择省市区
    selectAddress(val) {
        if(val.length == 1) {
            this.provinceCode = val[0]
        } else if(val.length == 2) {
            this.cityCode = val[1]
        } else if(val.length == 3) {
            let tmpArr = this.addressOptions[this.oneIndex].children[this.twoIndex].children
            let tmpText = ''
            for(let i = 0; i < tmpArr.length; i++) {
                if(tmpArr[i].code == val[2]) {
                    tmpText = tmpArr[i].name
                    break;
                }
            }
            this.provinceCode = val[0]
            this.cityCode = val[1]
            this.areaCode = val[2]
            this.ruleForm.address = this.oneText + this.twoText + tmpText 
        }
    },
    // 显示步骤条
    showStepList () {
        this.isShowDetail = true
    },
    // 显示 添加步骤条弹窗
    addStep (type, row) {
        if (type == 'edit') {
            let tmpFileArr = []
            row.picList.forEach((item,index) =>{
                tmpFileArr.push({
                    name: index+'.png',
                    uid: index+1,
                    url: item
                })
            })
            this.stepItemForm = {
                type: row.type,
                step_title: row.step_title,
                content: row.content,
                picList: row.picList,
                fileList: tmpFileArr
            }
        } else {
            this.stepItemForm = {
                type: '1',
                step_title: '',
                content: '',
                picList: [],
                fileList: []
            }
        }
        this.addEditType = type
        this.isAddEditShow = true

        // this.stepItemForm.picList = []
    },
    // 删除步骤
    delStepItem (item, index) {
        this.stepList.splice(index, 1)
        this.curStepIndex = '0'
    },
    // 添加步骤条确定按钮
    addStepConfirm () {
        if (!this.stepItemForm.step_title) {
            this.$message.error('请输入步骤标题')
            return
        }
        let tmpForm = JSON.parse(JSON.stringify(this.stepItemForm))
        tmpForm.step = this.stepList.length + 1
        this.stepList.push(tmpForm)
        this.curStepIndex = this.stepList.length - 1
        this.isAddEditShow = false
    },
    // 验证上传图片
    checkFile(file) {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024 < 10;
      if (
        fileType.search("jpg") < 0 &&
        fileType.search("jpeg") < 0 &&
        fileType.search("png") < 0 &&
        fileType.search("JPG") < 0 &&
        fileType.search("PNG") < 0
      ) {
        this.$message.error("图片类型必须是jpeg,jpg,png中的一种");
        return false;
      } else {
          return true;
      }
    },
    uploadPicBefore(file) {
      if(!this.checkFile(file)) {
          return false
      }
    },
    uploadPicSuccess(res,file) {
     if (res.errno == 0) {
         try {
            this.$message.success("上传成功");
            this.stepItemForm.picList.push(res.data.url)
            // this.stepItemForm.fileList.push({
            //     name: new Date().getTime() + 'pic',
            //     url: res.data.url
            // })
         } catch (error) {
            //  console.log(error)
         }
      }
    },
    // 照片上传时
    // uploadPicProgress (event, file, fileList) {
    //     console.log(file)
    //     return
    // },
    uploadPicErr() {
        this.$message.error('上传失败')
    },
    handleRemove(file, fileList) {
      let curIndex = 0
      fileList.forEach((item,index) =>{
          if (file.uid == item.uid) {
              curIndex = index
          }
      })
        this.stepItemForm.fileList = fileList
        this.stepItemForm.picList.splice(curIndex,1)
    },
    // 图片预览
    imgPreview (picArr,index,type) {
        if (type == 'step') {
            this.showViewImgs = [picArr]
        } else {
            this.showViewImgs = picArr
        }
        this.showViewer = true

    },
    // 初始化信息
    initData() {
        this.loading = false
        this.ruleForm = {
            title: '',
            name: '',
            type: '',
            note: '',
            time_limit: '',
            verify_time: '',
            make_num: '',
            price: '',
            num: '',
            advance: 0
        }
        this.stepList = []
        this.addEditType = 'add'
        this.isAddEditShow = false
        this.stepItemForm = {
            step_title: '',
            content: '',
            type: '1',
            picList: [],
            fileList: []
        }
        this.isShowDetail = false
        this.curStepIndex = 0
        this.submitLoading = false
        this.showViewer = false // 是否显示图片大图
        this.showViewImgs = [] // 大图url
        this.addressActive =  []
        this.provinceCode = ''
        this.cityCode = ''
        this.areaCode = ''
    },
    // 添加编辑员工提交
    submitForm(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
            if (valid) {
                if (!this.stepList || this.stepList.length == 0) {
                    this.$message.error('请添加做单步骤')
                    return
                }
                let params = JSON.parse(JSON.stringify(that.ruleForm))
                params.type_id = params.type
                params.time_limit_id = params.time_limit
                params.make_num_id = params.make_num
                params.verify_time_id = params.verify_time
                params.provinceCode = that.provinceCode
                params.cityCode = that.cityCode
                params.areaCode = that.areaCode
                params.advance = (Number(params.price)*1000 * Number(this.num))/1000
                delete params.type
                delete params.time_limit
                delete params.make_num
                 delete params.verify_time

               let tmpStepList = JSON.parse(JSON.stringify(this.stepList))
                tmpStepList.forEach(item =>{
                    item.pic = item.picList.join(',')
                    delete item.picList
                })
                params.step_data = tmpStepList

                that.submitLoading = true
                that.ajax('reward_add',params,'添加失败',res =>{
                    that.submitLoading = false
                    if(res.errno == 0) {
                        this.$message.success('添加成功')
                        this.ruleForm = {
                            title: '',
                            name: '',
                            type: '',
                            note: '',
                            time_limit: '',
                            verify_time: '',
                            make_num: '',
                            price: '',
                            num: '',
                            advance: 0
                        }
                        this.provinceCode = ''
                        this.cityCode = ''
                        this.areaCode = ''
                        this.stepList = []
                    }
                }, err =>{
                    that.submitLoading = false
                })
            } else {
                return false;
            }
        });
    },
    // 关闭图片大图
    closeImgView() {
        this.showViewer = false
        this.showViewImgs = []
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>
<style lang="less">
.add-task {
    padding: 20px;
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
      
    }
     .form-item-con {
        margin: 2rem 0;
        position: relative;
        .el-form-item {
            width: 30%;
            float: left;
            height: 2.5rem;
            .el-form-item__label {
                font-size: 0.9rem;
            }
            .el-input {
                width: 80%;
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
        .idcard-item-con {
            height: auto;
            .idcard-img {
                width: 175px;
                height: 112px;
                background: #fff;
                border: 1px solid #eee;
                border-radius: 8px;
                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .idcard-text {
                width: 175px;
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
        .add-btn-con {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .btn-con {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 2rem;
        padding-bottom: 2rem;
        .el-button {
            width: 23%;
            padding: 0.9rem;
        }
    }

    .rule-dialog-con {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 9;
        .dialog-info {
            position: absolute;
            top: 50%;
            left: 50%;
            background:#fff;
            transform:translate(-50%,-50%);
            border-radius: 10px;
            width: 35%;
            padding: 30px 20px;
            display:flex;
            align-items: center;
            justify-content:center;
            flex-direction: column;
            .rule-tit-con {
                display: flex;
                align-items: center;
                justify-content: center;
                .el-icon-warning {
                    font-size: 24px;
                    color:#e6a23c;
                }
                .dialog-tit {
                    font-size: 18px;
                    color:#303133;
                    font-weight: bold;
                    padding-left: 8px;
                }
            }
            .rule-dialog-desc {
                font-size: 1rem;
                color: #888;
                padding: 15px 0;
            }
            .el-form {
                width: 80%;
                .el-form-item {
                    margin-bottom: 0;
                }
            }
            .rule-btn-con {
                padding-top: 20px;
            }
        }
    }
    .tab-box {
        padding: 15px;
        .tab-btn-con {
            margin-bottom: 10px;
        }
        .tab-con {
            .title {
                font-weight: bold;
                margin-bottom: 10px;
            }
            .desc {
                color: #666;
                margin-bottom: 10px
            }
            .pic-con {
                img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                }
            }
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
//   .form-item-con {
//         margin: 2rem 0;
//         position: relative;
//         .dome_p {
//           line-height: auto;
//         }
//         .p_tit {
//           font-weight: bold;
//         }
//         .p_desc {
//           color: #3B6AF1;
//           cursor: pointer;
//         }
//         .el-form-item {
//             width: 50%;
//             height: 2.5rem  ;
//             float: left;
//             margin-bottom: 20px;
//             .el-form-item__label {
//                 font-size: 0.9rem;
//             }
//             .el-input {
//                 width: 100%;
//                 .read-idCard {
//                     color: #3B6AF1;
//                     background: #F0F8FF;
//                     font-size: 0.75rem;
//                     cursor: pointer;
//                 }
//                 .read-idCard:active {
//                     opacity: 0.6;
//                 }
//             }
//             .el-image {
//               width: 100px;
//               height: 100px;
//               cursor: pointer;
//               .image-slot {
//                 width: 100%;
//                 height: 100%;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 flex-direction: column;
//                 background: #f5f7fa;
//                 .text {
//                   height: 22px;
//                   font-size: 0.7rem;
//                   color: #999;
//                 }
//               }
//             }
//         }
//         .upload-con {
//             width: 30%;
//             position: absolute;
//             top: 50%;
//             right: 0;
//             transform: translateY(-50%);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             .el-form-item__content {
//                 margin-left: 0!important;
//             }
//             .img-con {
//                 max-width: 100%;
//                 border: 1px solid #E4EDF6;
//                 border-bottom: 0;
//                 padding: 0.5rem;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 width: 10rem;
//                 height: 15rem;
//                 cursor: pointer;
//                 img {
//                     max-width: 100%;
//                     max-height: 100%
//                 }
//             }
           
//             .upload-btn {
//                 width: 100%;
//                 padding: 0.3rem 0;
//                 background: #E4EDF6;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 color: #3B6AF1;
//                 font-size: 0.9rem;
//                 cursor: pointer;
//             }
//             .upload-btn:hover {
//                 opacity: 0.6;
//             }
//         }
//         .assets-form-item {
//             width: 100%;
//             margin-bottom: 0;
//             height: auto;
//             .pic-item {
//                 position: relative;
//                 float: left;
//                 width: 8rem;
//                 height: 8rem;
//                 padding: 0.5rem;
//                 border: 1px solid #dcdfe6;
//                 border-radius: 8px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 margin-right: 1rem;
//                 margin-bottom: 1rem;
//                 .pic {
//                     max-width: 100%;
//                     max-height: 100%;
//                 }
//             }
//         }
//          .idcard-item-con {
//             height: auto;
//             .idcard-img {
//                 width: 160px;
//                 height: 102px;
//                 background: #fff;
//                 border: 1px solid #eee;
//                 border-radius: 8px;
//                 .img {
//                     width: 100%;
//                     height: 100%;
//                 }
//             }
//             .idcard-text {
//                 width: 160px;
//                 padding: 0.2rem 0;
//                 background: #E4EDF6;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 color: #3B6AF1;
//                 font-size: 0.9rem;
//                 cursor: pointer;
//             }
//         }
        
//     }
  
}

.el-image-viewer__wrapper {
    z-index: 99999999!important
  }
</style>