<template>
    <div class="add-confrere" v-loading="loading">
        <div v-if="loading" style="height:500px"></div>
        <div class="breadcrumb-con">
            <img class="left-icon" src="../../images/breadcrumb-left-icon.png" alt="">
            <div class="breadcrumb-info">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>基础信息</el-breadcrumb-item>
                    <el-breadcrumb-item  :to="{ path: lastPath }">{{lastPathName}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="confrere_attr"  class="breadcrumb-tit">{{confrere_attr == 1 ? '自然人' : confrere_attr == 2 ? '机构' : '集体经济'}}档案详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-button style="margin-right:1rem" size="small" @click="initData()">刷新</el-button>
			<div class="back-con" @click="goBack">
				<img class="back-icon" src="../../images/breadcrumb-back-icon.png" alt="">
				<span class="back-text">返回上一页</span>
			</div>
        </div>
        <div class="accout" v-if="lastPath == '/confrereList'  && ruleForm.status == 1">
            <div class="accout-item" >
                <span class="price">{{score ? score : 0}}</span>
                <span class="desc">积分余额</span>
            </div>
            <div class="accout-item">
                <span class="price">0</span>
                <span class="desc">互助余额</span>
            </div>
        </div>
        <el-form v-if="ruleForm && ruleForm.cls == 1" ref="ruleForm" :model="ruleForm" :rules="isEdit ? rules : {}" style="margin-top: 0.5rem" label-width="100px">
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">自然人建档</span>
                <div class="bg"></div>
            </div>
             
            <div class="form-item-con clearfix">
                <el-form-item label="身份证正面"  prop="idcard_just"  class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con">
                        <template v-if="isEdit">
                            <div class="idcard-img" @click="showImgView(ruleForm.idcard_just)">
                                <img class="img" :src="ruleForm.idcard_just ? ruleForm.idcard_just : idCardZ" alt="">
                            </div>
                            <div class="idcard-text" @click="scanIdcardZ()">{{uploadIdCardZLoading ? '正在识别信息...' : (uploadIdCardZErr ? '重新识别' : '扫描身份证正面')}}</div>
                        </template>
                        <template v-else>
                            <div class="idcard-img" @click="showImgView(ruleForm.idcard_just)">
                                <img class="img" :src="ruleForm.idcard_just ? ruleForm.idcard_just : idCardZ" alt="">
                            </div>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="身份证反面" prop="idcard_reverse"  class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con">
                        <template v-if="isEdit">
                            <div class="idcard-img" @click="showImgView(ruleForm.idcard_reverse)">
                                <img class="img" :src="ruleForm.idcard_reverse ? ruleForm.idcard_reverse : idCardF" alt="">
                            </div>
                            <div class="idcard-text" @click="scanIdcardF()">{{uploadIdCardFLoading ? '正在上传...' : (uploadIdCardFErr ? '重新上传' : '扫描身份证反面')}}</div>
                        </template>
                        <template v-else>
                            <div class="idcard-img" @click="showImgView(ruleForm.idcard_reverse)">
                                <img class="img" :src="ruleForm.idcard_reverse ? ruleForm.idcard_reverse : idCardF" alt="">
                            </div>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="社员类型:" prop="coopera_cls">
                    <el-select v-model="ruleForm.coopera_cls" placeholder="请选择社员类型" v-if="isEdit">
                        <el-option v-for="(item,index) in confrereTypeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input v-else :value="ruleForm.coopera_cls_name"  readonly></el-input>
                </el-form-item>
                <el-form-item label="社员名称:" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入社员名称" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码:" prop="idcard">
                    <el-input v-model="ruleForm.idcard" placeholder="请输入身份证号码" clearable :readonly="!isEdit">
                        <!-- <template #append v-if="isEdit">
                            <span class="read-idCard" @click="readCert()">{{uploadIdCardLoading ? '正在识别...' : (uploadIdCardErr ? '重新识别' : '读身份证')}}</span>
                        </template> -->
                    </el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
                    <el-radio-group v-model="ruleForm.sex" v-if="isEdit">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                    <el-input v-else :value="ruleForm.sex == 2 ? '女' : '男'"  readonly></el-input>
                </el-form-item>
                <el-form-item label="出生年月:" prop="birth_date">
                    <el-date-picker v-if="isEdit" type="date" placeholder="请选择家庭成员出生年月" v-model="ruleForm.birth_date" style="width: 80%;"></el-date-picker>
                    <el-input v-else v-model="ruleForm.birth_date" readonly></el-input>
                </el-form-item>
                <el-form-item label="籍贯:" prop="native_place">
                    <el-input v-model="ruleForm.native_place" :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="民族:" prop="nation_id">
                    <el-select v-if="isEdit" v-model="ruleForm.nation_id" placeholder="请选择社员民族">
                        <el-option v-for="(item,index) in nationOptions" :key="index" :label="item.nation" :value="item.id"></el-option>
                    </el-select>
                    <el-input v-else v-model="ruleForm.nation_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="户口类型:" prop="permanent_type">
                    <el-select v-if="isEdit" v-model="ruleForm.permanent_type" placeholder="请选择户口类型">
                        <el-option label="农业户口" value="1"></el-option>
                        <el-option label="城镇户口" value="2"></el-option>
                    </el-select>
                    <el-input v-else :value="ruleForm.permanent_type == 1 ? '农业户口' : '城镇户口'" readonly></el-input>
                </el-form-item>
                 <el-form-item label="手机号:" prop="phone">
                    <template v-if="cooperationInfo && cooperationInfo.id == 151 && loginPostId == 2">
                        <el-input v-model="ruleForm.phone" :readonly="!isEdit"></el-input> 
                    </template>
                    <template v-else>
                        <el-input v-model="ruleForm.phone" readonly></el-input>
                    </template>
                    <!-- 手机号作为唯一暂不可修改 -->
                    <!-- <el-input v-model="ruleForm.phone" :readonly="!isEdit"></el-input> --> 
                </el-form-item>
                 <el-form-item label="学历:" :prop="isEdit ? 'edu_id' : ''">
                     <el-select v-if="isEdit" v-model="ruleForm.edu_id" placeholder="请选择社员学历">
                        <el-option v-for="(item,index) in eduOptions" :key="index" :label="item.name" :value="item.edu_id"></el-option>
                    </el-select>
                    <el-input v-else v-model="ruleForm.edu_name" readonly></el-input>
                </el-form-item>
                 <el-form-item label="政治面貌:" :prop="isEdit ? 'political_outlook_id' : ''">
                     <el-select v-if="isEdit" v-model="ruleForm.political_outlook_id" placeholder="请选择社员政治面貌">
                        <el-option v-for="(item,index) in politicalOptions" :key="index" :label="item.name" :value="item.political_outlook_id"></el-option>
                    </el-select>
                    <el-input v-else v-model="ruleForm.political_outlook_name" readonly></el-input>
                </el-form-item>
                <el-form-item class="upload-con" :prop="isEdit ? 'photo' : ''" >
                    <template v-if="isEdit" >
                        <div class="img-con">
                            <img :src="ruleForm.photo ? ruleForm.photo : defaultPhoto" @click="showImgView(ruleForm.photo)" alt="">
                        </div>
                        <div class="upload-btn" @click="uploadPic">{{uploadLoading ? '上传中...' : uploadErr ? '重新上传' : '打开摄像头'}}</div>
                    </template>
                    <template v-else>
                         <div class="img-con">
                            <img :src="ruleForm.photo ? ruleForm.photo : defaultPhoto" @click="showImgView(ruleForm.photo)" alt="">
                        </div>
                        <div class="upload-btn">自然人照片</div>
                    </template>
                </el-form-item>
            </div>
            <!-- <div v-for="(item,index) in ruleForm.guarantee" :key="index">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">股金信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="出资类型:" prop="zi_id">
                        <el-input v-model="item.zi_type" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="出资金额:" prop="money">
                        <el-input v-model="item.money" placeholder="请输入出资金额" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="股金类型:" prop="gu_id">
                        <el-input v-model="item.gu_type" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="备注:" prop="note">
                        <el-input v-model="item.note" placeholder="请输入备注" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="相关资料上传:" class="assets-form-item">
                        <div class="pic-item" v-for="(imgItem,imgIndex) in item.imgs" :key="imgIndex" >
                            <img @click="showImgView(imgItem)" class="pic" :src="imgItem" alt="">
                        </div>
                    </el-form-item>
                </div>
            </div> -->
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">工作信息</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="工作单位:" >
                    <el-input v-model="ruleForm.work_unit" :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="从事行业:" >
                    <el-select v-if="isEdit" v-model="ruleForm.occ_id" placeholder="请选择社员从事行业">
                        <el-option v-for="(item,index) in occOptions" :key="index" :label="item.name" :value="item.occ_id"></el-option>
                    </el-select>
                    <el-input v-else v-model="ruleForm.occ_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="工作职位:" >
                    <el-input v-model="ruleForm.position" :readonly="!isEdit"></el-input>
                </el-form-item>
            </div>
            <!-- <div v-for="(item,index) in ruleForm.familys" :key="index">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">家庭成员</span>
                    <div class="bg"></div>
                    <img v-if="index > 0  && isEdit" class="del-family-icon" src="../../images/baseInfo/del-family.png" @click="delFamily(index)" alt="">
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="姓名:"   >
                        <el-input v-model="item.name" :readonly="!isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月:">
                        <el-date-picker v-if="isEdit" type="date" placeholder="请选择家庭成员出生年月" v-model="item.birth_date" style="width: 80%;"></el-date-picker>
                        <el-input v-else v-model="item.birth_date" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="与本人关系:" >
                        <el-input v-model="item.user_relation" :readonly="!isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:">
                        <el-input v-model="item.mobile" :readonly="!isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码:" >
                        <el-input v-model="item.idcard" :readonly="!isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="工作单位:" >
                        <el-input v-model="item.work_unit" :readonly="!isEdit"></el-input>
                    </el-form-item>
                </div>
            </div> -->
            <!-- <div class="add-family-con" @click="addFamily()" v-if="lastPath == '/confrereList' && isEdit">
                <img width="100%" src="../../images/baseInfo/add-family.png" alt="">
            </div> -->
            <div class="btn-con" v-if="lastPath == '/confrereApproveList' && isApprove">
                <template v-if="ruleForm.status == 0">
                    <el-button type="primary" round @click="handleBtn(1)">同意</el-button>
                    <el-button type="danger" round @click="handleBtn(2)">拒绝</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" round >{{ruleForm.status == 1 ? '已同意' : (ruleForm.status == 2 ? '已拒绝' : '审核中') }}</el-button>
                </template>
            </div>
            <template v-if="cooperationInfo && cooperationInfo.id == 151 && loginPostId == 2">
                <div class="btn-con" v-if="lastPath == '/confrereList'">
                    <el-button type="primary" round @click="orgSubmitForm('ruleForm')" :loading="orgSubmitLoading">{{orgSubmitLoading ? '提交中...' : '编辑'}}</el-button>
                </div>
            </template>
            <template v-else>
                <div class="btn-con" v-if="lastPath == '/confrereList' && isEdit && ruleForm.status == 2">
                    <el-button type="primary" round @click="submitForm('ruleForm')" :loading="submitLoading">编辑</el-button>
                </div>
            </template>
        </el-form>
        <el-form v-if="licenceForm && licenceForm.cls == 2" ref="licenceForm" :model="licenceForm" :rules="isEdit ? licenceRules : {}" style="margin-top: 0.5rem" label-width="100px">
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">机构建档</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="社员类型:" prop="coopera_cls">
                    <el-select v-model="licenceForm.coopera_cls" placeholder="请选择社员类型" v-if="isEdit">
                        <el-option v-for="(item,index) in confrereTypeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input v-else v-model="licenceForm.coopera_cls_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="机构名称:" prop="short_name">
                    <el-input v-model="licenceForm.short_name" placeholder="请输入机构名称" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="机构地址:" prop="address">
                    <el-input v-model="licenceForm.address" placeholder="请输入地址" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="社会信用代码:" prop="license_num">
                    <el-input v-model="licenceForm.license_num" placeholder="请输入社会信用代码" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="成立日期:" prop="license_start">
                    <el-date-picker v-if="isEdit" type="date" value-format="yyyy-MM-dd" placeholder="请选择成立日期" v-model="licenceForm.license_start" style="width: 80%;"></el-date-picker>
                    <el-input v-else v-model="licenceForm.license_start"  readonly></el-input>
                </el-form-item>
                 <el-form-item label="营业有效期:" prop="license_end">
                    <el-date-picker v-if="isEdit" type="date" value-format="yyyy-MM-dd" placeholder="请选择营业有效期" v-model="licenceForm.license_end" style="width: 80%;"></el-date-picker>
                    <el-input v-else v-model="licenceForm.license_end"  readonly></el-input>
                </el-form-item>
                <el-form-item label="法人姓名:" prop="name">
                    <el-input v-model="licenceForm.name" placeholder="请输入法人姓名" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人手机号:" prop="phone">
                    <el-input v-model="licenceForm.phone" placeholder="请输入法人手机号" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <!-- <el-form-item label="法人身份证:" class="assets-form-item" style="width:50%" >
                   <template v-if="isEdit">
                       <div class="pic-item" v-if="licenceForm.idcard_url || uploadLicenseIdCardLoading || uploadLicenseIdCardErr">
                            <img v-if="licenceForm.idcard_url" @click="showImgView(licenceForm.idcard_url)" class="pic" :src="licenceForm.idcard_url" alt="">
                            <div v-if="uploadLicenseIdCardLoading || uploadLicenseIdCardErr" style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;flex-direction:column">
                                <i style="color:#fff;font-size:1.5rem" :class="uploadLicenseIdCardLoading ? 'el-icon-loading' : 'el-icon-circle-close'"></i>
                                <span style="color:#fff;font-size:1rem">{{uploadLicenseIdCardLoading ? '上传中...' : '上传失败'}}</span>
                            </div>
                            <img v-if="licenceForm.idcard_url || uploadLicenseIdCardErr" @click.stop="licenceForm.idcard_url = ''" style="position:absolute; top:0;right:0;transform:translate(50%, -50%);width:20px;height:20px;cursor:pointer" src="/static/img/iframe-close.png" alt="">
                        </div>
                        <el-button style="float:left" plain type="primary" size="small" @click="uploadLicenseIdCard()" >{{ uploadLicenseIdCardLoading ? '正在上传...' : (!licenceForm.idcard_url ? '扫描上传' : '重新上传')}}</el-button>
                   </template>
                   <template v-else>
                       <div class="pic-item" v-if="licenceForm.idcard_just">
                            <img @click="showImgView(licenceForm.idcard_just)" class="pic" :src="licenceForm.idcard_just" alt="">
                        </div>
                   </template>
                </el-form-item> -->
                <el-form-item label="法人身份证正面"  prop="idcard_just"  class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con">
                        <template v-if="isEdit">
                            <div class="idcard-img" @click="showImgView(licenceForm.idcard_just)">
                                <img class="img" :src="licenceForm.idcard_just ? licenceForm.idcard_just : idCardZ" alt="">
                            </div>
                            <div class="idcard-text" @click="uploadLicenseIdCard()">{{uploadLicenseIdCardLoading ? '正在上传...' : (uploadLicenseIdCardErr ? '重新上传' : '扫描身份证正面')}}</div>
                        </template>
                        <template v-else>
                            <div class="idcard-img" @click="showImgView(licenceForm.idcard_just)">
                                <img class="img" :src="licenceForm.idcard_just ? licenceForm.idcard_just : idCardZ" alt="">
                            </div>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="法人身份证反面" prop="idcard_reverse"  class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con">
                        <template v-if="isEdit">
                            <div class="idcard-img" @click="showImgView(licenceForm.idcard_reverse)">
                                <img class="img" :src="licenceForm.idcard_reverse ? licenceForm.idcard_reverse : idCardF" alt="">
                            </div>
                            <div class="idcard-text" @click="uploadLicenseIdCardF()">{{uploadLicenseIdCardFLoading ? '正在上传...' : (uploadLicenseIdCardFErr ? '重新上传' : '扫描身份证反面')}}</div>
                        </template>
                        <template v-else>
                            <div class="idcard-img" @click="showImgView(licenceForm.idcard_reverse)">
                                <img class="img" :src="licenceForm.idcard_reverse ? licenceForm.idcard_reverse : idCardF" alt="">
                            </div>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item class="upload-con" prop="photo" >
                   <template v-if="isEdit">
                        <div class="img-con" style="width:10.5rem">
                            <img id="devPhoto2" :src="licenceForm.photo ? licenceForm.photo : defaultPhoto" @click="showImgView(licenceForm.photo)" alt="">
                        </div>
                        <div  class="upload-btn" @click="uploadLicense">{{uploadLicenseLoading ? '正在识别...' : (uploadLicenseErr ? '重新识别' : '识别营业执照')}}</div>
                   </template>
                   <template v-else>
                        <div class="img-con" style="width:10.5rem">
                            <img id="devPhoto2" :src="licenceForm.photo ? licenceForm.photo : defaultPhoto" @click="showImgView(licenceForm.photo)" alt="">
                        </div>
                        <div  class="upload-btn">营业执照</div>
                   </template>
                </el-form-item>
            </div>
            <!-- <div v-for="(item,index) in licenceForm.guarantee" :key="index">
                <div class="tit-con">
                    <div class="shu"></div>
                    <span class="tit">股金信息</span>
                    <div class="bg"></div>
                </div>
                <div class="form-item-con clearfix">
                    <el-form-item label="出资类型:" prop="zi_id">
                        <el-input  v-model="item.zi_type" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="出资金额:" prop="money">
                        <el-input v-model="item.money" placeholder="请输入出资金额" clearable :readonly="!isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="股金类型:" prop="guaran_id">
                        <el-input v-model="item.gu_type" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="备注:" prop="note">
                        <el-input v-model="item.note" placeholder="请输入备注" clearable readonly></el-input>
                    </el-form-item>
                    <el-form-item label="相关资料上传:" class="assets-form-item">
                        <div class="pic-item" v-for="(imgItem,imgIndex) in item.imgs" :key="imgIndex" >
                            <img @click="showImgView(imgItem)" class="pic" :src="imgItem" alt="">
                        </div>
                    </el-form-item>
                </div>
            </div> -->
            <div class="btn-con" v-if="lastPath == '/confrereApproveList' && isApprove">
                <template v-if="licenceForm.status == 0">
                    <el-button type="primary" round @click="handleBtn(1)">同意</el-button>
                    <el-button type="danger" round @click="handleBtn(2)">拒绝</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" round >{{licenceForm.status == 1 ? '已同意' : (licenceForm.status == 2 ? '已拒绝' : '审核中') }}</el-button>
                </template>
            </div>
            <template v-if="cooperationInfo && cooperationInfo.id == 151 && loginPostId == 2">
                <div class="btn-con" v-if="lastPath == '/confrereList'">
                    <el-button type="primary" round @click="licenceSubmitForm('licenceForm')" :loading="licenceSubmitLoading">{{licenceSubmitLoading ? '提交中...' : '编辑'}}</el-button>
                </div>
            </template>
            <template v-else>
                <div class="btn-con" v-if="lastPath == '/confrereList' && isEdit && licenceForm.status == 2">
                    <el-button type="primary" round @click="licenceSubmitForm('licenceForm')" :loading="licenceSubmitLoading">{{licenceSubmitLoading ? '提交中...' : '编辑'}}</el-button>
                </div>
            </template>
        </el-form>
        <el-form v-if="orgForm && orgForm.cls == 3" ref="orgForm" :model="orgForm" :rules="isEdit ? orgRules : {}" style="margin-top: 0.5rem" label-width="100px">
            <div class="tit-con">
                <div class="shu"></div>
                <span class="tit">集体经济组织</span>
                <div class="bg"></div>
            </div>
            <div class="form-item-con clearfix">
                <el-form-item label="社员类型:" prop="coopera_cls">
                    <el-select v-model="orgForm.coopera_cls" placeholder="请选择社员类型" v-if="isEdit">
                        <el-option v-for="(item,index) in confrereTypeOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input v-else v-model="orgForm.coopera_cls_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="组织名称:" prop="short_name">
                    <el-input v-model="orgForm.short_name" placeholder="请输入组织名称" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="组织地址:" prop="address">
                    <el-input v-model="orgForm.address" placeholder="请输入地址" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="社会信用代码:" prop="license_num">
                    <el-input v-model="orgForm.license_num" placeholder="请输入社会信用代码" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="成立日期:" prop="license_start">
                    <el-date-picker v-if="isEdit" type="date" value-format="yyyy-MM-dd" placeholder="请选择成立日期" v-model="orgForm.license_start" style="width: 80%;"></el-date-picker>
                    <el-input v-else v-model="orgForm.license_start"  readonly></el-input>
                </el-form-item>
                 <el-form-item label="营业有效期:" prop="license_end">
                    <el-date-picker v-if="isEdit" type="date" value-format="yyyy-MM-dd" placeholder="请选择营业有效期" v-model="orgForm.license_end" style="width: 80%;"></el-date-picker>
                    <el-input v-else v-model="orgForm.license_end"  readonly></el-input>
                </el-form-item>
                 <el-form-item label="单位电话:" prop="mobile">
                    <el-input v-model="orgForm.mobile" placeholder="请输入单位电话" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="业务范围:" prop="scope">
                    <el-input v-model="orgForm.scope" placeholder="请输入业务范围" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人姓名:" prop="name">
                    <el-input v-model="orgForm.name" placeholder="请输入法人姓名" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人手机号:" prop="phone">
                    <el-input v-model="orgForm.phone" placeholder="请输入法人手机号" clearable :readonly="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证正面"  prop="idcard_just"  class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con">
                        <template v-if="isEdit">
                            <div class="idcard-img" @click="showImgView(orgForm.idcard_just)">
                                <img class="img" :src="orgForm.idcard_just ? orgForm.idcard_just : idCardZ" alt="">
                            </div>
                            <div class="idcard-text" @click="uploadOrgIdCard()">{{uploadOrgIdCardLoading ? '正在上传...' : (uploadOrgIdCardErr ? '重新上传' : '扫描身份证正面')}}</div>
                        </template>
                        <template v-else>
                            <div class="idcard-img" @click="showImgView(orgForm.idcard_just)">
                                <img class="img" :src="orgForm.idcard_just ? orgForm.idcard_just : idCardZ" alt="">
                            </div>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="法人身份证反面" prop="idcard_reverse"  class="idcard-item-con" style="height:auto">
                    <div class="idcard-img-con">
                        <template v-if="isEdit">
                            <div class="idcard-img" @click="showImgView(orgForm.idcard_reverse)">
                                <img class="img" :src="orgForm.idcard_reverse ? orgForm.idcard_reverse : idCardF" alt="">
                            </div>
                            <div class="idcard-text" @click="uploadOrgIdCardF()">{{uploadOrgIdCardFLoading ? '正在上传...' : (uploadOrgIdCardFErr ? '重新上传' : '扫描身份证反面')}}</div>
                        </template>
                        <template v-else>
                            <div class="idcard-img" @click="showImgView(orgForm.idcard_reverse)">
                                <img class="img" :src="orgForm.idcard_reverse ? orgForm.idcard_reverse : idCardF" alt="">
                            </div>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item class="upload-con" prop="photo" >
                   <template v-if="isEdit">
                        <div class="img-con" style="width:10.5rem">
                            <img id="devPhoto2" :src="orgForm.photo ? orgForm.photo : defaultPhoto" @click="showImgView(orgForm.photo)" alt="">
                        </div>
                        <div  class="upload-btn" @click="uploadOrg">{{uploadOrgLoading ? '正在识别...' : (uploadOrgErr ? '重新识别' : '识别组织登记证')}}</div>
                   </template>
                   <template v-else>
                        <div class="img-con" style="width:10.5rem">
                            <img id="devPhoto2" :src="orgForm.photo ? orgForm.photo : defaultPhoto" @click="showImgView(orgForm.photo)" alt="">
                        </div>
                        <div  class="upload-btn">组织登记证</div>
                   </template>
                </el-form-item>
            </div>
            
            
            <div class="btn-con" v-if="lastPath == '/confrereApproveList' && isApprove">
                <template v-if="orgForm.status == 0">
                    <el-button type="primary" round @click="handleBtn(1)">同意</el-button>
                    <el-button type="danger" round @click="handleBtn(2)">拒绝</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" round >{{orgForm.status == 1 ? '已同意' : (orgForm.status == 2 ? '已拒绝' : '审核中') }}</el-button>
                </template>
            </div>
            <template v-if="cooperationInfo && cooperationInfo.id == 151 && loginPostId == 2">
                <div class="btn-con" v-if="lastPath == '/confrereList'">
                    <el-button type="primary" round @click="orgSubmitForm('orgForm')" :loading="orgSubmitLoading">{{orgSubmitLoading ? '提交中...' : '编辑'}}</el-button>
                </div>
            </template>
            <template v-else>
                <div class="btn-con" v-if="lastPath == '/confrereList' && isEdit && orgForm.status == 2">
                    <el-button type="primary" round @click="orgSubmitForm('orgForm')" :loading="orgSubmitLoading">{{orgSubmitLoading ? '提交中...' : '编辑'}}</el-button>
                </div>
            </template>
        </el-form>
        <template v-if="showViewer">
            <el-image-viewer :on-close="closeImgView"  :url-list="showViewImgs" />
        </template> 

        <div class="iframe-absolute-con" v-if="showIframe" @click="showIframe = false">
            <iframe @click.stop=""  class="scan-iframe" id="iframeId" src="./static/scanSubPhoto.html?path=confrereDetail" frameborder="0"></iframe>
        </div> 
        <div class="iframe-absolute-con" v-if="showReadIframe" @click="showReadIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="readIframeId" src="./static/readCert.html?path=confrereDetailread" frameborder="0"></iframe>
        </div> 
        <div class="iframe-absolute-con" v-if="showAssetsIframe" @click="showAssetsIframe = false">
            <iframe @click.stop=""  class="scan-iframe3" id="assetsIframeId" src="./static/scanPrimaryPhoto.html?path=confrereDetailassets" frameborder="0"></iframe>
        </div>
         <div class="iframe-absolute-con" v-if="showLicenseIframe" @click="showLicenseIframe = false">
            <iframe @click.stop=""  class="scan-iframe3" id="licenseIframeId" src="./static/scanPrimaryPhoto.html?path=confrereDetailLicense" frameborder="0"></iframe>
        </div>
        <div class="iframe-absolute-con" v-if="showLicenseReadIframe" @click="showLicenseReadIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="licenseReadIframeId" src="./static/readCert.html?path=confrereDetailLicenseread" frameborder="0"></iframe>
        </div> 

        <div class="iframe-absolute-con" v-if="showLicenseAssetsIframe" @click="showLicenseAssetsIframe = false">
            <iframe @click.stop=""  class="scan-iframe3" id="licenseAssetsIframeId" src="./static/scanPrimaryPhoto.html?path=confrereDetailLicenseassets" frameborder="0"></iframe>
        </div>
         <div class="iframe-absolute-con" v-if="showLicenseReadFIframe" @click="showLicenseReadFIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="licenseReadFIframeId" src="./static/readCert.html?path=confrereDetailLicenseFread" frameborder="0"></iframe>
        </div>

        <div class="iframe-absolute-con" v-if="showReadZIframe" @click="showReadZIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="readZIframeId" src="./static/readCert.html?path=confrereDetailZread" frameborder="0"></iframe>
        </div>
        <div class="iframe-absolute-con" v-if="showReadFIframe" @click="showReadFIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="readFIframeId" src="./static/readCert.html?path=confrereDetailFread" frameborder="0"></iframe>
        </div>

        <div class="iframe-absolute-con" v-if="showOrgIframe" @click="showOrgIframe = false">
            <iframe @click.stop=""  class="scan-iframe3" id="orgIframeId" src="./static/scanPrimaryPhoto.html?path=confrereDetailOrg" frameborder="0"></iframe>
        </div>
        <div class="iframe-absolute-con" v-if="showOrgReadIframe" @click="showOrgReadIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="orgReadIframeId" src="./static/readCert.html?path=confrereDetailOrgread" frameborder="0"></iframe>
        </div> 
         <div class="iframe-absolute-con" v-if="showOrgReadFIframe" @click="showOrgReadFIframe = false">
            <iframe @click.stop=""  class="scan-iframe2" id="orgReadFIframeId" src="./static/readCert.html?path=confrereDetailOrgFread" frameborder="0"></iframe>
        </div>
        <!-- <object id="CertCtl" type="application/cert-reader" width="0" height="0"></object> -->
    </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: "confrereDetail",
  data() {
    var checkIdcardNum = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入身份证号'));
        }
        let idCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!idCardreg.test(value)) {
        callback(new Error('请输入正确的身份证号'));
        } else {
            callback();
        }
    };
    var checkTel = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入您的手机号'));
        }
        let telreg = /^1[3456789]\d{9}$/;
        if (!telreg.test(value)) {
        callback(new Error('请输入正确的手机号'));
        } else {
            callback();
        }
    };
    var checkPrice = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入借款金额'));
        }
        let priceReg = /^\d+$|^\d*\.\d+$/;
        if (!priceReg.test(value)) {
        callback(new Error('请输入正确的借款金额'));
        } else {
            callback();
        }
    };
    return {
        userId: '',
        lastPath: '',
        lastPathName: '',
        isRefresh: 1,
        idCardZ: require('../../images/public/idCard-z.png'),
        idCardF: require('../../images/public/idCard-f.png'),
        confrere_attr: null, // 1-自然人 2-机构 3-集体经济
        score: null, // 积余额
        ruleForm: {
            cls: '',
            coopera_cls: '',
            name: '',
            sex: '1',
            birth_date: '',
            native_place: '',
            photo: '',
            idcard: '',
            nation_id: '',
            permanent_type: '',
            edu_id: '',
            political_outlook_id: '',
            phone: '',
            work_unit: '',
            position: '',
            occ_id: '',
            familys: [{
                name: '',
                user_relation: '',
                idcard: '',
                birth_date: '',
                mobile: '',
                work_unit: '',
            }],

            zi_id: '',
            guaran_id: '',
            money: '',
            note: '',
            imgs: []
        },// 创建自然人form表单
        rules: {
         coopera_cls: [
            { required: true, message: '请选择社员类型', trigger: 'change' }
          ],
        //   zi_id: [
        //     { required: true, message: '请选择出资类型', trigger: 'change' }
        //   ],
        //   gu_id: [
        //     { required: true, message: '请选择股金类型', trigger: 'change' }
        //   ],
        //    money: [
        //     { required: true, validator: checkPrice, trigger: 'blur' }
        //   ],
          photo: [
            { required: true, message: '请上传照片', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入社员名称', trigger: 'blur' }
          ],
          idcard: [
           { required: true, validator: checkIdcardNum, trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择社员性别', trigger: 'change' }
          ],
          birth_date: [
            { required: true, message: '请选择出生年月', trigger: 'blur' }
          ],
          native_place: [
            { required: true, message: '请输入社员籍贯', trigger: 'blur' }
          ],
          nation_id: [
            { required: true, message: '请选择社员民族', trigger: 'change' }
          ],
          permanent_type: [
            { required: true, message: '请选择社员户口类型', trigger: 'change' }
          ],
          phone: [
           { required: true, validator: checkTel, trigger: 'blur' }
          ],
          edu_id: [
            { required: true, message: '请选择学历', trigger: 'change' }
          ],
          political_outlook_id: [
            { required: true, message: '请选择政治面貌', trigger: 'change' }
          ],
           work_unit: [
            { required: true, message: '请输入工作单位', trigger: 'blur' }
          ],
           occ_id: [
            { required: true, message: '请选择从事行业', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请输入工作职位', trigger: 'blur' }
          ],
        },// 创建自然人验证规则
        licenceForm: {
            cls: '',
            coopera_cls: '',
            short_name: '',
            license_num: '',
            license_start: '',
            license_end: '',
            address: '',
            zi_id: '',
            guaran_id: '',
            money: '',
            note: '',
            imgs: [],
            photo: '',
            legal_person: '',
            phone: '',
            idcard_url: '',

        },// 创建机构form表单
        licenceRules: {
         coopera_cls: [
            { required: true, message: '请选择社员类型', trigger: 'change' }
          ],
        //   zi_id: [
        //     { required: true, message: '请选择出资类型', trigger: 'change' }
        //   ],
        //   guaran_id: [
        //     { required: true, message: '请选择股金类型', trigger: 'change' }
        //   ],
           address: [
            { required: true, message: '请输入机构地址', trigger: 'blur' }
          ],
        //    money: [
        //     { required: true, validator: checkPrice, trigger: 'blur' }
        //   ],
          photo: [
            { required: true, message: '请上传营业照片', trigger: 'blur' }
          ],
          short_name: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
           license_num: [
            { required: true, message: '请输入社会信用代码', trigger: 'blur' }
          ],
           license_start: [
            { required: true, message: '请选择成立日期', trigger: 'blur' }
          ],
           license_end: [
            { required: true, message: '营业有效期', trigger: 'blur' }
          ],
           name: [
            { required: true, message: '法人姓名', trigger: 'blur' }
          ],
           phone: [
            { required: true, message: '法人手机号', trigger: 'blur' }
          ],
        }, // 创建机构验证规则
         orgForm: {
            cls: '',
            coopera_cls: '',
            short_name: '',
            license_num: '',
            license_start: '',
            license_end: '',
            address: '',
            // zi_id: '',
            // guaran_id: '',
            // money: '',
            // note: '',
            // imgs: [],
            photo: '',
            legal_person: '',
            phone: '',
            idcard_url: '',
            idcard_just:'',
            idcard_reverse: '',
            mobile: '',
            scope: '',
        },// 集体经济组织表单
         orgRules: {
         coopera_cls: [
            { required: true, message: '请选择社员类型', trigger: 'change' }
          ],
        //   zi_id: [
        //     { required: true, message: '请选择出资类型', trigger: 'change' }
        //   ],
        //   guaran_id: [
        //     { required: true, message: '请选择股金类型', trigger: 'change' }
        //   ],
           address: [
            { required: true, message: '请输入机构地址', trigger: 'blur' }
          ],
        //    money: [
        //     { required: true, validator: checkPrice, trigger: 'blur' }
        //   ],
        //   photo: [
        //     { required: true, message: '请上传组织登记证', trigger: 'blur' }
        //   ],
          short_name: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
           license_num: [
            { required: true, message: '请输入社会信用代码', trigger: 'blur' }
          ],
           license_start: [
            { required: true, message: '请选择成立日期', trigger: 'blur' }
          ],
           license_end: [
            { required: true, message: '营业有效期', trigger: 'blur' }
          ],
           name: [
            { required: true, message: '法人姓名', trigger: 'blur' }
          ],
           phone: [
            { required: true, message: '法人手机号', trigger: 'blur' }
          ],
        }, // 创建集体经济组织验证规则
        defaultPhoto: require('../../images/baseInfo/default-photo.png'),
        nationOptions: [], // 民族列表
        eduOptions: [], // 学历列表
        politicalOptions: [], // 政治面貌列表
        occOptions: [], // 行业列表
        ziOptions: [], // 行业列表
        guaranOptions: [], // 行业列表
        confrereTypeOptions: [{
            name: '基本成员',
            id: 1
        },{
            name: '核心成员',
            id: 2
        },{
            name: '联系成员',
            id: 3
        },{
            name: '特邀成员',
            id: 4
        }], //社员类型列表

        checkIdcardNum: checkIdcardNum, 
        checkTel: checkTel,

        submitLoading: false, // 自然人提交创建loading
        licenceSubmitLoading: false, //机构提交创建loading

        showIframe: false, // 自然人摄像头上传照片
        uploadBase64: '', // 自然人上传图片base64
        uploadLoading: false, // 自然人上传图片loading
        uploadErr: false, // 自然人上传图片失败

        showReadIframe: false, // 自然人身份证识别iframe弹窗
        idcardBase64: '', // 自然人身份证base64
        uploadIdCardLoading: false, //自然人上传身份证loading
        uploadIdCardErr: false, //自然人上传身份证err

        showAssetsIframe: false, // 自然人资产证明iframe弹窗
        assetsBase64: '', // 自然人资产base64

        showReadZIframe: false, // 自然人身份证正面识别iframe弹窗
        idcardZBase64: '', // 自然人身份证正面base64
        uploadIdCardZLoading: false, //自然人上传身份证正面loading
        uploadIdCardZErr: false, //自然人上传身份证正面err

        showReadFIframe: false, // 自然人身份证反面识别iframe弹窗
        idcardFBase64: '', // 自然人身份证反面base64
        uploadIdCardFLoading: false, //自然人上传身份证反面loading
        uploadIdCardFErr: false, //自然人上传身份证反面err

        
        showLicenseIframe: false, //营业执照识别iframe弹窗
        uploadLicenseBase64: '', //营业执照base64
        uploadLicenseErr:false, // 识别营业执照信息失败
        uploadLicenseLoading: false,// 识别营业执照信息loading

        showLicenseReadIframe: false, // 法人身份证识别iframe弹窗
        uploadLicenseIdcardBase64: '', // 法人身份证base64
        uploadLicenseIdCardLoading: false, //上传法人身份证loading
        uploadLicenseIdCardErr: false, //上传法人身份证err

        showLicenseReadFIframe: false, // 法人身份证反面iframe弹窗
        uploadLicenseIdcardFBase64: '', // 法人身份证反面base64
        uploadLicenseIdCardFLoading: false, //上传法人身份证反面loading
        uploadLicenseIdCardFErr: false, //上传法人身份证反面err

        showOrgIframe: false, //集体经济等级制识别iframe弹窗
        uploadOrgBase64: '', //集体经济登记证base64
        uploadOrgErr:false, // 识别集体经济登记证信息失败
        uploadOrgLoading: false,// 识别集体经济登记证信息loading

        showOrgReadIframe: false, // 集体经济法人身份证识别iframe弹窗
        uploadOrgIdcardBase64: '', // 集体经济法人身份证base64
        uploadOrgIdCardLoading: false, //集体经济上传法人身份证loading
        uploadOrgIdCardErr: false, //集体经济上传法人身份证err

        showOrgReadFIframe: false, // 集体经济法人身份证反面iframe弹窗
        uploadOrgIdcardFBase64: '', // 集体经济法人身份证反面base64
        uploadOrgIdCardFLoading: false, //集体经济上传法人身份证反面loading
        uploadOrgIdCardFErr: false, //集体经济上传法人身份证反面err

        showLicenseAssetsIframe: false, // 机构资产证明iframe弹窗
        licenseAssetsBase64: '', // 机构资产base64

        showViewer: false, // 是否显示图片大图
        showViewImgs: [], // 大图url

        loading: false,
        isEdit: false,
        orgSubmitLoading: false,
        // connectText:''

        cooperationInfo: '',
        loginPostId: '', // 仅用于合作社id为151
    };
  },
   components: { ElImageViewer },
  created() {
    window.addEventListener("message",(event)=>{
        //自然人上传照片
        if(event.data && event.data.path && event.data.path == 'confrereDetail') {
            if(event.data.type == 'data') {
                this.uploadBase64 = event.data.data
                this.base64Upload(this.uploadBase64)
                this.showIframe = false	
            }
            if(event.data.type == 'close') {
                this.showIframe = false	
            }
        }
        // 自然人身份证识别
        // if(event.data && event.data.path && event.data.path == 'confrereDetailread') {
        //     if(event.data.type == 'data') {
        //         this.idcardBase64 = event.data.data
        //         this.idcardBase64Upload(this.idcardBase64)
        //         this.showReadIframe = false	
        //     }
        //     if(event.data.type == 'close') {
        //         this.showReadIframe = false	
        //     }
        // }
        // 自然人身份证正面识别
        if(event.data && event.data.path && event.data.path == 'confrereDetailZread') {
            if(event.data.type == 'data') {
                this.idcardZBase64 = event.data.data
                this.idcardZBase64Upload(this.idcardZBase64)
                this.showReadZIframe = false	
            }
            if(event.data.type == 'close') {
                this.showReadZIframe = false	
            }
        }
        // 自然人身份证反面上传
        if(event.data && event.data.path && event.data.path == 'confrereDetailFread') {
            if(event.data.type == 'data') {
                this.idcardFBase64 = event.data.data
                this.idcardFBase64Upload(this.idcardFBase64)
                this.showReadFIframe = false	
            }
            if(event.data.type == 'close') {
                this.showReadFIframe = false	
            }
        }
        // 自然人扫描资产上传
        if(event.data && event.data.path && event.data.path == 'confrereDetailassets') {
            if(event.data.type == 'data') {
                this.assetsBase64 = event.data.data
                this.assetsBase64Upload(event.data.data)
                this.showAssetsIframe = false	
            }
            if(event.data.type == 'close') {
                this.showAssetsIframe = false	
            }
        }
        
        // 机构识别营业执照
         if(event.data && event.data.path && event.data.path == 'confrereDetailLicense') {
            if(event.data.type == 'data') {
                this.uploadLicenseBase64 = event.data.data
                this.licenseBase64Upload(event.data.data)
                this.showLicenseIframe = false	
            }
            if(event.data.type == 'close') {
                this.showLicenseIframe = false	
            }
        }
        // 法人身份证正面上传
         if(event.data && event.data.path && event.data.path == 'confrereDetailLicenseread') {
            if(event.data.type == 'data') {
                this.uploadLicenseIdcardBase64 = event.data.data
                this.licenseIdCardBase64Upload(event.data.data)
                this.showLicenseReadIframe = false	
            }
            if(event.data.type == 'close') {
                this.showLicenseReadIframe = false	
            }
        }
        // 法人身份证反面上传
         if(event.data && event.data.path && event.data.path == 'confrereDetailLicenseFread') {
            if(event.data.type == 'data') {
                this.uploadLicenseIdcardFBase64 = event.data.data
                this.licenseIdCardFBase64Upload(event.data.data)
                this.showLicenseReadFIframe = false	
            }
            if(event.data.type == 'close') {
                this.showLicenseReadFIframe = false	
            }
        }
        // 机构扫描资产上传
         if(event.data && event.data.path && event.data.path == 'confrereDetailLicenseassets') {
            if(event.data.type == 'data') {
                this.licenseAssetsBase64 = event.data.data
                this.licenseAssetsBase64Upload(event.data.data)
                this.showLicenseAssetsIframe = false	
            }
            if(event.data.type == 'close') {
                this.showLicenseAssetsIframe = false	
            }
        }

        // 集体经济识别登记证
         if(event.data && event.data.path && event.data.path == 'confrereDetailOrg') {
            if(event.data.type == 'data') {
                this.uploadOrgBase64 = event.data.data
                this.orgBase64Upload(event.data.data)
                this.showOrgIframe = false	
            }
            if(event.data.type == 'close') {
                this.showOrgIframe = false	
            }
        }
        // 法人身份证正面上传
         if(event.data && event.data.path && event.data.path == 'confrereDetailOrgread') {
            if(event.data.type == 'data') {
                this.uploadOrgIdcardBase64 = event.data.data
                this.orgIdCardBase64Upload(event.data.data)
                this.showOrgReadIframe = false	
            }
            if(event.data.type == 'close') {
                this.showOrgReadIframe = false	
            }
        }
        // 法人身份证反面上传
         if(event.data && event.data.path && event.data.path == 'confrereDetailOrgFread') {
            if(event.data.type == 'data') {
                this.uploadOrgIdcardFBase64 = event.data.data
                this.orgIdCardFBase64Upload(event.data.data)
                this.showOrgReadFIframe = false	
            }
            if(event.data.type == 'close') {
                this.showOrgReadFIframe = false	
            }
        }
    }, false)
  },
  activated() {
       this.initData()
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
    // 添加股金
    addGUjin() {
        this.$message.info('你点击了添加股金')
    },
     // 处理操作btn
	handleBtn(status) {
        let that = this;
        if(status == 1) {
            that.$confirm('是否同意审批?', '提示', {
          		confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			}).then(() => {
				that.handleUserStep(status,'')
			}).catch(() => {});
        } else {
            that.$prompt('是否'+(status == 1 ? '同意' : '拒绝')+'审批？', '提示', {
                inputPlaceholder: '请输入拒绝原因',
                type: 'warning',
                center: true
            }).then((data) => {
                that.handleUserStep(status,data.value)
            }).catch(data =>{})
        }
		
    },
    // 请求审批接口
	handleUserStep(status,note) { //status 2-拒绝 1-通过
        let that = this
		that.ajax('userStep',{
			user_id: that.confrere_attr == 1 ? that.ruleForm.user_id : (that.confrere_attr == 2 ? that.licenceForm.user_id : that.orgForm.user_id),
            status: status,
            job_id: that.confrere_attr == 1 ? that.ruleForm.job_id : (that.confrere_attr == 2 ? that.licenceForm.job_id : that.orgForm.job_id),
			note: note,
		},'社员审批失败',res =>{
			if(res.errno == 0) {
                that.isRefresh = 2
                that.$message.success((status == 1 ? '审批' : '拒绝' )+ '成功')
                if(status == 1) {
                    if(that.confrere_attr == 1) {
                        that.ruleForm.status = 1
                    } else if (that.confrere_attr == 2) {
                        that.licenceForm.status = 1
                    }else if (that.confrere_attr == 3) {
                        that.orgForm.status = 1
                    }
                } else {
                    if(that.confrere_attr == 1) {
                        that.ruleForm.status = 2
                    } else if (that.confrere_attr == 2) {
                        that.licenceForm.status = 2
                    }else if (that.confrere_attr == 3) {
                        that.orgForm.status = 2
                    }
                }
                that.$forceUpdate()
			}
		})
    },
    // 自然人扫描资产上传
    scanUpload() {
        this.showAssetsIframe = true
        setTimeout(() =>{
            document.getElementById('assetsIframeId').src='./static/scanPrimaryPhoto.html?path=confrereDetailassets';
        },500)
    },
    // 机构扫描资产上传
    licenseScanUpload() {
        this.showLicenseAssetsIframe = true
        setTimeout(() =>{
            document.getElementById('licenseAssetsIframeId').src='./static/scanPrimaryPhoto.html?path=confrereDetailLicenseassets';
        },500)
    },
    // 删除自然人当前资产img
    delImgItem(index) {
        this.ruleForm.imgs.splice(index,1)
    },
    // 删除机构当前资产img
    delLicenseImgItem(index) {
        this.licenceForm.imgs.splice(index,1)
    },
    // base64上传到服务器
    base64Upload(base64) {
        let that = this
        that.uploadErr = false
        that.uploadLoading = true
        that.ajax('base64Upload',{
            file: base64
        },'图片上传服务器失败',res =>{
            that.uploadLoading = false
            if(res.errno == 0) {
                that.ruleForm.photo = res.data
            } else {
                that.uploadErr = true
            }
        },err =>{
            that.uploadLoading = false
            that.uploadErr = true
        })
    },
    // 点击扫描自然人身份证正面
    scanIdcardZ() {
        if(this.uploadIdCardZLoading) {
            this.$message({
                message: '正在识别身份证信息...',
                type: 'warning'
            });
            return
        }
        if(this.uploadIdCardZErr) {
            this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.idcardZBase64Upload(this.idcardZBase64)
                }).catch(() => {
                    this.showReadZIframe = true
                    setTimeout(() =>{
                        document.getElementById('readZIframeId').src='./static/readCert.html?path=confrereDetailZread';
                    },500)
            });
            return
        }
        this.showReadZIframe = true
        setTimeout(() =>{
            document.getElementById('readZIframeId').src='./static/readCert.html?path=confrereDetailZread';
        },500)
        return
    },
    // 识别自然人身份证正面
    idcardZBase64Upload(base64) {
        let that = this
        that.uploadIdCardZErr = false
        that.uploadIdCardZLoading = true
        that.ajax('idcardBase64',{
            file: base64
        },'识别身份证失败',res =>{
            that.uploadIdCardZLoading = false
            if(res.errno == 0) {
                that.uploadIdCardZErr = false
                let data = res.data
                this.ruleForm.idcard = data.certNumber
                let str = data.bornDay;
                let arr = str.split('');
                arr.splice(4,0,'-');
                arr.splice(7,0,'-');
                str = arr.join('');  //ab-cdef
                this.ruleForm.birth_date = str
                this.ruleForm.sex = data.gender== '男'? '1':'2'
                this.ruleForm.native_place = data.certAddress
                this.ruleForm.name = data.partyName
                that.ruleForm.idcard_just = res.data.url
                this.nationOptions.forEach(element => {
                    if(element.nation == data.nation + '族'){
                        this.ruleForm.nation_id = element.id
                    }
                });
                
            } else {
                that.uploadIdCardZErr = true
            }
        },err =>{
            that.uploadIdCardZErr = true
            that.uploadIdCardZLoading = false
        })
    },
    // 点击上传自然人身份证反面
    scanIdcardF() {
        if(this.uploadIdCardFLoading) {
            this.$message({
                message: '正在上传身份证反面...',
                type: 'warning'
            });
            return
        }
        if(this.uploadIdCardFErr) {
            this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.idcardFBase64Upload(this.idcardFBase64)
                }).catch(() => {
                    this.showReadFIframe = true
                    setTimeout(() =>{
                        document.getElementById('readFIframeId').src='./static/readCert.html?path=confrereDetailFread';
                    },500)
            });
            return
        }
        this.showReadFIframe = true
        setTimeout(() =>{
            document.getElementById('readFIframeId').src='./static/readCert.html?path=confrereDetailFread';
        },500)
        return
    },
    // 上传自然人身份证反面
    idcardFBase64Upload(base64) {
        let that = this
        that.uploadIdCardFErr = false
        that.uploadIdCardFLoading = true
        that.ajax('base64Upload',{
            file: base64
        },'上传身份证反面失败',res =>{
            that.uploadIdCardFLoading = false
            if(res.errno == 0) {
                that.uploadIdCardFErr = false
                that.ruleForm.idcard_reverse = res.data
            } else {
                that.uploadIdCardFErr = true
            }
        },err =>{
            that.uploadIdCardFErr = true
            that.uploadIdCardFLoading = false
        })
    },
    // 自然人资产base64上传到服务器
    assetsBase64Upload(base64) {
        let that = this
        that.ruleForm.imgs.push({status:'uploading',url: ''})
        let curUploadIndex = that.ruleForm.imgs.length - 1
        that.ajax('base64Upload',{
            file: base64
        },'图片上传服务器失败',res =>{
            if(res.errno == 0) {
                 that.ruleForm.imgs[curUploadIndex] ={status:'done',url: res.data}
            } else {
                that.ruleForm.imgs[curUploadIndex] ={status:'failed',url: ''}
            }
            that.$forceUpdate()
        },err =>{
            that.ruleForm.imgs[curUploadIndex] ={status:'failed',url: ''}
            that.$forceUpdate()
        })
    },
    // 机构资产证明上传到服务器
    licenseAssetsBase64Upload(base64) {
        let that = this
        that.licenceForm.imgs.push({status:'uploading',url: ''})
        let curUploadIndex = that.licenceForm.imgs.length - 1
        that.ajax('base64Upload',{
            file: base64
        },'图片上传服务器失败',res =>{
            if(res.errno == 0) {
                 that.licenceForm.imgs[curUploadIndex] ={status:'done',url: res.data}
            } else {
                that.licenceForm.imgs[curUploadIndex] ={status:'failed',url: ''}
            }
            that.$forceUpdate()
        },err =>{
            that.licenceForm.imgs[curUploadIndex] ={status:'failed',url: ''}
            that.$forceUpdate()
        })
    },
    //自然人识别身份证
    idcardBase64Upload(base64) {
        let that = this
        that.uploadIdCardErr = false
        that.uploadIdCardLoading = true
        that.ajax('idcardBase64',{
            file: base64
        },'识别身份证失败',res =>{
            that.uploadIdCardLoading = false
            if(res.errno == 0) {
                that.uploadIdCardErr = false
                let data = res.data
                this.ruleForm.idcard = data.certNumber
                let str = data.bornDay;
                let arr = str.split('');
                arr.splice(4,0,'-');
                arr.splice(7,0,'-');
                str = arr.join('');  //ab-cdef
                this.ruleForm.birth_date = str
                this.ruleForm.sex = data.gender== '男'? '1':'2'
                this.ruleForm.native_place = data.certAddress
                this.ruleForm.name = data.partyName

                this.nationOptions.forEach(element => {
                    if(element.nation == data.nation + '族'){
                        this.ruleForm.nation_id = element.id
                    }
                });
            } else {
                that.uploadIdCardErr = true
            }
        },err =>{
            that.uploadIdCardErr = true
            that.uploadIdCardLoading = false
        })
    },
    // 点击扫描法人身份证正面上传按钮
    uploadLicenseIdCard() {
        if(this.uploadLicenseIdCardLoading) {
            this.$message({
                message: '正在上传法人身份证...',
                type: 'warning'
            });
            return
        }
        if(this.uploadLicenseIdCardErr) {
             this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.licenseIdCardBase64Upload(this.uploadLicenseIdcardBase64)

                }).catch(() => {
                    this.showLicenseReadIframe = true
                    setTimeout(() =>{
                        document.getElementById('licenseReadIframeId').src='./static/readCert.html?path=confrereDetailLicenseread';
                    },500)
            });
            return
        }
        this.showLicenseReadIframe = true
        setTimeout(() =>{
            document.getElementById('licenseReadIframeId').src='./static/readCert.html?path=confrereDetailLicenseread';
       },500)
    },
    // 点击集体经济扫描法人身份证正面上传按钮
    uploadOrgIdCard() {
        if(this.uploadOrgIdCardLoading) {
            this.$message({
                message: '正在上传法人身份证...',
                type: 'warning'
            });
            return
        }
        if(this.uploadOrgIdCardErr) {
             this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.orgIdCardBase64Upload(this.uploadOrgIdcardBase64)

                }).catch(() => {
                    this.showOrgReadIframe = true
                    setTimeout(() =>{
                        document.getElementById('orgReadIframeId').src='./static/readCert.html?path=confrereDetailOrgread';
                    },500)
            });
            return
        }
        this.showOrgReadIframe = true
        setTimeout(() =>{
            document.getElementById('orgReadIframeId').src='./static/readCert.html?path=confrereDetailOrgread';
       },500)
    },
    // 集体经济法人身份证上传
    orgIdCardBase64Upload(base64) {
        let that = this
        that.uploadOrgIdCardErr = false
        that.uploadOrgIdCardLoading = true
        that.ajax('base64Upload',{
            file: base64
        },'上传身份证失败',res =>{
            that.uploadOrgIdCardLoading = false
            if(res.errno == 0) {
                that.orgForm.idcard_just = res.data
                that.uploadOrgIdCardErr = false
            } else {
                that.uploadOrgIdCardErr = true
            }
        },err =>{
            that.uploadOrgIdCardErr = true
            that.uploadOrgIdCardLoading = false
        })
    },
    // 法人身份证上传
    licenseIdCardBase64Upload(base64) {
        let that = this
        that.uploadLicenseIdCardErr = false
        that.uploadLicenseIdCardLoading = true
        that.ajax('base64Upload',{
            file: base64
        },'上传身份证失败',res =>{
            that.uploadLicenseIdCardLoading = false
            if(res.errno == 0) {
                that.licenceForm.idcard_just = res.data
                that.uploadLicenseIdCardErr = false
            } else {
                that.uploadLicenseIdCardErr = true
            }
        },err =>{
            that.uploadLicenseIdCardErr = true
            that.uploadLicenseIdCardLoading = false
        })
    },
    // 集体经济点击扫描法人身份证反面上传按钮
    uploadOrgIdCardF() {
        if(this.uploadOrgIdCardFLoading) {
            this.$message({
                message: '正在上传法人身份证反面...',
                type: 'warning'
            });
            return
        }
        if(this.uploadOrgIdCardFErr) {
             this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.orgIdCardFBase64Upload(this.uploadOrgIdcardFBase64)

                }).catch(() => {
                    this.showOrgReadFIframe = true
                    setTimeout(() =>{
                        document.getElementById('orgReadFIframeId').src='./static/readCert.html?path=confrereDetailOrgFread';
                    },500)
            });
            return
        }
        this.showOrgReadFIframe = true
        setTimeout(() =>{
            document.getElementById('orgReadFIframeId').src='./static/readCert.html?path=confrereDetailOrgFread';
       },500)
    },
    // 点击扫描法人身份证反面上传按钮
    uploadLicenseIdCardF() {
        if(this.uploadLicenseIdCardFLoading) {
            this.$message({
                message: '正在上传法人身份证反面...',
                type: 'warning'
            });
            return
        }
        if(this.uploadLicenseIdCardFErr) {
             this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.licenseIdCardFBase64Upload(this.uploadLicenseIdcardFBase64)

                }).catch(() => {
                    this.showLicenseReadFIframe = true
                    setTimeout(() =>{
                        document.getElementById('licenseReadFIframeId').src='./static/readCert.html?path=confrereDetailLicenseFread';
                    },500)
            });
            return
        }
        this.showLicenseReadFIframe = true
        setTimeout(() =>{
            document.getElementById('licenseReadFIframeId').src='./static/readCert.html?path=confrereDetailLicenseFread';
       },500)
    },
    // 法人身份证上传
    licenseIdCardFBase64Upload(base64) {
        let that = this
        that.uploadLicenseIdCardFErr = false
        that.uploadLicenseIdCardFLoading = true
        that.ajax('base64Upload',{
            file: base64
        },'上传身份证反面失败',res =>{
            that.uploadLicenseIdCardFLoading = false
            if(res.errno == 0) {
                that.licenceForm.idcard_reverse = res.data
                that.uploadLicenseIdCardFErr = false
            } else {
                that.uploadLicenseIdCardFErr = true
            }
        },err =>{
            that.uploadLicenseIdCardFErr = true
            that.uploadLicenseIdCardFLoading = false
        })
    },
     // 集体经济法人身份证上传
    orgIdCardFBase64Upload(base64) {
        let that = this
        that.uploadOrgIdCardFErr = false
        that.uploadOrgIdCardFLoading = true
        that.ajax('base64Upload',{
            file: base64
        },'上传身份证反面失败',res =>{
            that.uploadOrgIdCardFLoading = false
            if(res.errno == 0) {
                that.orgForm.idcard_reverse = res.data
                that.uploadOrgIdCardFErr = false
            } else {
                that.uploadOrgIdCardFErr = true
            }
        },err =>{
            that.uploadOrgIdCardFErr = true
            that.uploadOrgIdCardFLoading = false
        })
    },
    // 识别营业执照信息
    licenseBase64Upload(base64) {
        let that = this
        that.uploadLicenseErr = false
        that.uploadLicenseLoading = true
        that.ajax('licenseBase64',{
            file: base64
        },'识别营业执照失败',res =>{
            that.uploadLicenseLoading = false
            if(res.errno == 0) {
                that.uploadLicenseErr = false
                let data = res.data
                that.licenceForm.address = data.address
                that.licenceForm.short_name = data.short_name
                that.licenceForm.name = data.legal_person
                that.licenceForm.license_num = data.license_num
                that.licenceForm.photo = data.url
                if(data.license_start) {
                    that.licenceForm.license_start = data.license_start.substring(0,4) + '-'+ data.license_start.substring(5,7) +'-'+data.license_start.substring(8,10)
                }
                if(data.license_end) {
                    that.licenceForm.license_end =  data.license_end.substring(0,4) + '-'+data.license_end.substring(5,7) +'-'+data.license_end.substring(8,10)
                }
            } else {
                that.uploadLicenseErr = true
            }
        },err =>{
            that.uploadLicenseErr = true
            that.uploadLicenseLoading = false
        })
    },
    // 点击识别营业执照
    uploadLicense() {
        if(this.uploadLicenseLoading) {
            this.$message({
                message: '正在识别营业执照...',
                type: 'warning'
            });
            return
        }
        if(this.uploadLicenseErr) {
             this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.licenseBase64Upload(this.uploadLicenseBase64)

                }).catch(() => {
                    this.showLicenseIframe = true
                    setTimeout(() =>{
                        document.getElementById('licenseIframeId').src='./static/scanPrimaryPhoto.html?path=confrereDetailLicense';
                    },500)
            });
            return
        }
        this.showLicenseIframe = true
        setTimeout(() =>{
            document.getElementById('licenseIframeId').src='./static/scanPrimaryPhoto.html?path=confrereDetailLicense';
       },500)
    },
     // 识别组织登记证信息
    orgBase64Upload(base64) {
        let that = this
        that.uploadOrgErr = false
        that.uploadOrgLoading = true
        that.ajax('licenseBase64',{
            file: base64
        },'识别组织登记证失败',res =>{
            that.uploadOrgLoading = false
            if(res.errno == 0) {
                that.uploadOrgErr = false
                let data = res.data
                that.orgForm.address = data.address
                that.orgForm.short_name = data.short_name
                that.orgForm.name = data.legal_person
                that.orgForm.license_num = data.license_num
                that.orgForm.photo = data.url
                if(data.license_start) {
                    that.orgForm.license_start = data.license_start.substring(0,4) + '-'+ data.license_start.substring(5,7) +'-'+data.license_start.substring(8,10)
                }
                if(data.license_end) {
                    that.orgForm.license_end =  data.license_end.substring(0,4) + '-'+data.license_end.substring(5,7) +'-'+data.license_end.substring(8,10)
                }
            } else {
                that.uploadOrgErr = true
            }
        },err =>{
            that.uploadOrgErr = true
            that.uploadOrgLoading = false
        })
    },
    // 点击识别组织登记证
    uploadOrg() {
        if(this.uploadOrgLoading) {
            this.$message({
                message: '正在识别组织登记证...',
                type: 'warning'
            });
            return
        }
        if(this.uploadOrgErr) {
             this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.orgBase64Upload(this.uploadOrgBase64)

                }).catch(() => {
                    this.showOrgIframe = true
                    setTimeout(() =>{
                        document.getElementById('orgIframeId').src='./static/scanPrimaryPhoto.html?path=confrereDetailOrg';
                    },500)
            });
            return
        }
        this.showOrgIframe = true
        setTimeout(() =>{
            document.getElementById('orgIframeId').src='./static/scanPrimaryPhoto.html?path=confrereDetailOrg';
       },500)
    },
    // 上传照片
    uploadPic() {
        if(this.uploadLoading) {
            this.$message({
                message: '正在上传图片到服务器...',
                type: 'warning'
            });
            return
        }
        if(this.uploadErr) {
             this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.base64Upload(this.uploadBase64)

                }).catch(() => {
                    this.showIframe = true
                    setTimeout(() =>{
                        document.getElementById('iframeId').src='./static/scanSubPhoto.html?path=confrereDetail';
                    },500)
            });
            return
        }
        this.showIframe = true
        setTimeout(() =>{
            document.getElementById('iframeId').src='./static/scanSubPhoto.html?path=confrereDetail';
        },500)

    }, 
    // 验证浏览器
    verifyBrowser(){
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.connect();
            return true;
          } else {
            this.$message({
              message: "身份证验证仅支持IE浏览器",
              type: "error",
              customClass: "zZindex",
              duration: 5000,
              showClose: true
            });
            return false;
          }
    },
    clearForm(){
    },
    connect() {
      this.clearForm();
      var CertCtl = document.getElementById("CertCtl");
      try {
        var result = CertCtl.connect();
        var newresult = JSON.parse(result);
        if (newresult.resultFlag == 0) {
          this.connectText = "已连接";
        } else {
          this.connectText = "未连接";
        }
      } catch (e) {
      }
    },
    readCert() {
        if(this.uploadIdCardLoading) {
            this.$message({
                message: '正在识别身份证信息...',
                type: 'warning'
            });
            return
        }
        if(this.uploadIdCardErr) {
            this.$confirm('请选择重新上传或重新拍照?', '提示', {
                confirmButtonText: '重新上传',
                cancelButtonText: '重新拍照',
                type: 'warning'
                }).then(() => {
                    this.idcardBase64Upload(this.idcardBase64)
                }).catch(() => {
                    this.showReadIframe = true
                    setTimeout(() =>{
                        document.getElementById('readIframeId').src='./static/readCert.html?path=confrereDetailread';
                    },500)
            });
            return
        }
        this.showReadIframe = true
        setTimeout(() =>{
            document.getElementById('readIframeId').src='./static/readCert.html?path=confrereDetailread';
        },500)
        return
      var CertCtl = document.getElementById("CertCtl");
      try {
        var startDt = new Date();
        var result = CertCtl.readCert();
        var endDt = new Date();
        var newresult = JSON.parse(result);
        this.ruleForm.idcard = newresult.resultContent.certNumber
        let str = newresult.resultContent.bornDay;
        let arr = str.split('');
        arr.splice(4,0,'-');
        arr.splice(7,0,'-');
        str = arr.join('');  //ab-cdef
        this.ruleForm.birth_date = str
        this.ruleForm.sex = newresult.resultContent.gender==0?'2':'1'
        this.ruleForm.native_place = newresult.resultContent.certAddress
        this.ruleForm.name = newresult.resultContent.partyName

        this.nationOptions.forEach(element => {
            if(element.nation == newresult.resultContent.nation + '族'){
                this.ruleForm.nation_id = element.id
            }
        });
      } catch (e) {}
    },
    // 初始化数据
    initData() {
        this.cooperationInfo = localStorage.getItem('cooperationInfo') ? JSON.parse(localStorage.getItem('cooperationInfo')) : ''
        let tmpUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
		if (tmpUserInfo) {
			this.loginPostId = tmpUserInfo.post_id
		}
        this.showIframe = false;
        this.showReadIframe = false;
        this.showAssetsIframe = false;
        this.showLicenseIframe = false;
        this.showLicenseReadIframe = false;
        this.showLicenseAssetsIframe = false;
        this.confrere_attr = null;
        this.lastPath = this.$route.query.path
        this.loading = false
        this.isEdit = false
        this.licenceSubmitLoading = false;
        this.submitLoading = false;
        this.isRefresh = 1;
        if(this.lastPath == '/confrereList') {
            this.lastPathName = '社员档案列表'
            this.isEdit = this.$route.query.isEdit
            if(this.isEdit) {
                this.getLists()
            }
        } else if(this.lastPath == '/confrereApproveList'){
            this.lastPathName = '社员审批列表'
            this.isApprove = this.$route.query.isApprove
        }
        this.ruleForm = {
            cls: '',
            coopera_cls: '',
            name: '',
            sex: '1',
            birth_date: '',
            native_place: '',
            photo: '',
            idcard: '',
            nation_id: '',
            permanent_type: '',
            edu_id: '',
            political_outlook_id: '',
            phone: '',
            work_unit: '',
            position: '',
            occ_id: '',
            familys: [{
                name: '',
                user_relation: '',
                idcard: '',
                birth_date: '',
                mobile: '',
                work_unit: '',
            }],

            zi_id: '',
            guaran_id: '',
            money: '',
            note: '',
            imgs: []
        }
        this.licenceForm = {
            cls: '',
            coopera_cls: '',
            short_name: '',
            license_num: '',
            license_start: '',
            license_end: '',
            address: '',
            zi_id: '',
            guaran_id: '',
            money: '',
            note: '',
            imgs: [],
            photo: '',
            legal_person: '',
            phone: '',
            idcard_url: '',
        }
        this.orgForm = {
            cls: '',
            coopera_cls: '',
            short_name: '',
            license_num: '',
            license_start: '',
            license_end: '',
            address: '',
            // zi_id: '',
            // guaran_id: '',
            // money: '',
            // note: '',
            // imgs: [],
            photo: '',
            legal_person: '',
            phone: '',
            idcard_url: '',
            idcard_just:'',
            idcard_reverse: '',
            mobile: '',
            scope: '',
        }
      this.initBase64()
      this.userId = this.$route.query.userId
      this.getConfrereDetail(this.$route.query.userId)
    },
    // 初始化扫描仪报错桉树及base64
    initBase64() {
        this.uploadBase64 = '' // 自然人上传图片base64
        this.uploadErr = false // 自然人上传图片失败
        this.idcardBase64 = '' // 自然人身份证base64
        this.uploadIdCardErr = false //自然人上传身份证err
        this.idcardZBase64 = '' // 自然人身份证正面base64
        this.uploadIdCardZErr = false //自然人上传身份证正面err
        this.idcardFBase64 =''// 自然人身份证反面base64
        this.uploadIdCardFErr = false //自然人上传身份证反面err
        this.assetsBase64 ='' // 自然人资产base64
        this.uploadLicenseBase64 = '' //营业执照base64
        this.uploadLicenseErr = false // 识别营业执照信息失败
        this.uploadLicenseIdcardBase64 = ''// 法人身份证base64
        this.uploadLicenseIdCardErr = false//上传法人身份证err
        this.uploadLicenseIdcardFBase64 = ''// 法人身份证反面base64
        this.uploadLicenseIdCardFErr = false //上传法人身份证反面err
        this.licenseAssetsBase64 = '' // 机构资产base64
        this.uploadOrgBase64 = '' //组织登记证base64
        this.uploadOrgErr = // 识别组织登记证信息失败
        this.uploadOrgLoading = false// 识别组织登记证信息loading
        this.uploadOrgIdcardBase64 = ''// 法人身份证base64
        this.uploadOrgIdCardErr = false//上传法人身份证err
        this.uploadOrgIdcardFBase64 = '' // 法人身份证反面base64
        this.uploadOrgIdCardFErr = false //上传法人身份证反面err
    },
    // 获取社员详情
    getConfrereDetail(id) {
        let that = this
        that.loading = true
        that.ajax('userDetail',{user_id: id},'获取社员详情失败',res =>{
			if(res.errno == 0) {
                res.data.coopera_cls = res.data.coopera_cls ? res.data.coopera_cls : null
                res.data.birth_date = that.utils.dateFormat('yyyy-MM-dd',new Date(res.data.birth_date))
                if(res.data.familys && res.data.familys.length > 0) {
                    res.data.familys.forEach(item =>{
                        item.birth_date = that.utils.dateFormat('yyyy-MM-dd',new Date(item.birth_date))
                    })
                }
               
                res.data.sex = res.data.sex+''
                res.data.permanent_type = res.data.permanent_type ? (res.data.permanent_type + '') : ''
                that.confrere_attr = res.data.cls
                that.score = res.data.score

                if(that.confrere_attr == 1) {
                    res.data.nation_id = res.data.nation_id ? res.data.nation_id : null
                    res.data.edu_id = res.data.edu_id ? res.data.edu_id : null
                    res.data.occ_id = res.data.occ_id ? res.data.occ_id : null
                    res.data.occ_id = res.data.occ_id ? res.data.occ_id : null
                    setTimeout(() =>{
                        that.ruleForm =  res.data
                    })
                } else if(that.confrere_attr == 2) {
                    setTimeout(() =>{
                        that.licenceForm =  res.data
                        that.licenceForm.guaran_id = res.data.gu_id ? res.data.gu_id : null
                    })
                } else if(that.confrere_attr == 3) {
                    setTimeout(() =>{
                        that.orgForm =  res.data
                    })
                }
               
                that.loading = false

			} else {
                that.loading = false
            }
		}, err =>{
            that.loading = false
        })
    },
    // 获取选择列表
    getLists() {
        this.getNationList()
        this.getEduList()
        this.getPoliticalList()
        this.getOccList()
        this.getDicList(1) // type   1-出资类型
        this.getDicList(2) // type   2-股金类型
    },
    // 获取股金类型 type   1-出资类型  2-股金类型
    getDicList(type) {
        let that = this
        that.ajax('dicList',{
            type: type
        },'获取股金类型失败',res =>{
            if(res.errno == 0) {
                if(type == 1) {
                    that.ziOptions = res.data
                } else if(type == 2) {
                    that.guaranOptions = res.data
                }
            }
        })
    },
    // 获取民族列表
    getNationList() {
        let that = this
        that.ajax('nation',{},'获取民族列表失败',res =>{
            if(res.errno == 0) {
                that.nationOptions = res.data
            }
        })
    },
    // 获取学历列表
    getEduList() {
        let that = this
        that.ajax('edu',{},'获取学历列表失败',res =>{
            if(res.errno == 0) {
                that.eduOptions = res.data
            }
        })
    },
    // 获取政治面貌列表
    getPoliticalList() {
        let that = this
        that.ajax('politicalList',{},'获取政治面貌列表失败',res =>{
            if(res.errno == 0) {
                that.politicalOptions = res.data
            }
        })
    },
    // 获取行业列表
    getOccList() {
        let that = this
        that.ajax('occList',{},'获取行业列表失败',res =>{
            if(res.errno == 0) {
                that.occOptions = res.data
            }
        })
    },
    // 添加家庭成员
	addFamily() {
        let tmpObj = {
            family_id: 0,
            name: '',
            user_relation: '',
            idcard: '',
            birth_date: '',
            mobile: '',
            work_unit: '',
        }
        this.ruleForm.familys.push(tmpObj)
        let curDomScrollTop = document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop
         setTimeout(() =>{
             document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop = curDomScrollTop + 120
         },300)
    },
    // 删除家庭成员
    delFamily(index) {
        this.ruleForm.familys.splice(index,1)
    },
    // 显示图片大图
    showImgView(url) {
        if(url) {
            this.showViewer = true
            this.showViewImgs = [url]
        }
    },
    // 关闭图片大图
    closeImgView() {
        this.showViewer = false
        this.showViewImgs = []
    },
    // 自然人提交表单
    submitForm(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            if(!that.ruleForm.idcard_just) {
                document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop = 50
                that.$message.error('请上传身份证正面')
                return
              }
              if(!that.ruleForm.idcard_reverse) {
                document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop = 50
                that.$message.error('请上传身份证反面')
                return
              }
              that.submitLoading = true
              that.ruleForm.cls = that.confrere_attr
              let params = JSON.parse(JSON.stringify(that.ruleForm))
              params.familys = JSON.stringify(that.ruleForm.familys)
              delete params.familys
            //   params.imgs = ''
            //   that.ruleForm.imgs.forEach((item,index) =>{
            //     if(index == 0) {
            //         params.imgs = item.url
            //     } else {
            //         params.imgs+=','+item.url
            //     }
            //   })
              params.guaran_id = params.gu_id
              that.ajax('userEdit',params,'自然人建档信息修改失败',res =>{
                that.submitLoading = false
                if(res.errno == 0) {
                    that.isRefresh = 2
                    that.isEdit = false
                    that.$message.success('自然人建档信息修改成功')
                    that.getConfrereDetail(that.userId)
                }
              }, err =>{
                   that.submitLoading = false
              })
          } else {
            setTimeout(()=>{
                let isError= document.getElementsByClassName("is-error");
                let firstErrInput = isError[0].querySelector('input')
                if(!firstErrInput.type) {
                    document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop = 50
                } else {
                    firstErrInput.focus();
                }
            },100);
            return false;
          }
        });
      },
      // 机构表单提交
      licenceSubmitForm(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
              that.licenceSubmitLoading = true
              that.licenceForm.cls = that.confrere_attr
              let params = JSON.parse(JSON.stringify(that.licenceForm))
            //   params.imgs = ''
            //   that.licenceForm.imgs.forEach((item,index) =>{
            //     if(index == 0) {
            //         params.imgs = item.url
            //     } else {
            //         params.imgs+=','+item.url
            //     }
            //   })
              params.legal_person = that.licenceForm.name
              params.guaran_id = that.licenceForm.gu_id
              that.ajax('licenseEdit',params,'机构建档信息修改失败',res =>{
                that.licenceSubmitLoading = false
                if(res.errno == 0) {
                    that.isRefresh = 2
                    that.isEdit = false
                    that.$message.success('机构建档信息修改成功')
                    that.getConfrereDetail(that.userId)
                }
              }, err =>{
                   that.licenceSubmitLoading = false
              })
          } else {
            setTimeout(()=>{
                let isError= document.getElementsByClassName("is-error");
                let firstErrInput = isError[0].querySelector('input')
                if(!firstErrInput) {
                    document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop = 50
                } else {
                    firstErrInput.focus();
                }
            },100);
            return false;
          }
        });
      },
      // 集体经济表单提交
      orgSubmitForm(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
              that.orgSubmitLoading = true
              that.orgForm.cls = that.confrere_attr
              let params = JSON.parse(JSON.stringify(that.orgForm))
              params.legal_person = that.orgForm.name
              that.ajax('collectiveEdit',params,'集体经济组织信息修改失败',res =>{
                that.orgSubmitLoading = false
                if(res.errno == 0) {
                    that.isRefresh = 2
                    that.isEdit = false
                    that.$message.success('集体经济组织信息修改成功')
                    that.getConfrereDetail(that.userId)
                }
              }, err =>{
                   that.orgSubmitLoading = false
              })
          } else {
            setTimeout(()=>{
                let isError= document.getElementsByClassName("is-error");
                let firstErrInput = isError[0].querySelector('input')
                if(!firstErrInput) {
                    document.querySelectorAll('.el-scrollbar__wrap')[1].scrollTop = 50
                } else {
                    firstErrInput.focus();
                }
            },100);
            return false;
          }
        });
      },
      // 重置form表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  beforeRouteEnter(to,form,next) {
    next(that =>{})
}

};
</script>
<style lang="less">
.add-confrere {
    padding: 20px;
    .confrere-attr {
        padding-top:10%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .tit {
            width: 100%;
            font-weight: bold;
            text-align: center;
            padding-bottom: 5rem;
        }
        .attr-btn-con {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-button {
                width: 15%;
            }
        }
    }
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
    .accout {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 1rem;
        .accout-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 1.5rem 4rem;
            border-radius: 8px;
            background: #409EFF;
            color: #fff;
            .price {
                font-weight: bold;
                font-size: 2rem;
                padding-bottom: 0.5rem;
            }
            .desc {
                font-weight: bold;
                font-size: 1.1rem;
            }
        }
        .accout-item:nth-child(2) {
            background: #E6A23C;
            margin-left: 6rem;
        }
    }
    .form-item-con {
        margin: 2rem 0;
        position: relative;
        .el-form-item {
            width: 35%;
            height: 2.5rem  ;
            float: left;
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
    
    .add-family-con {
        width: 100%;
        // background: url('../../images/baseInfo/add-family.png');
        // background-size: 100% 100%;
        // height: 3.5rem;
        cursor: pointer;
    }
    .btn-con {
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

    .scan-iframe {
        position: absolute;
        top:50%;
        left: 50%;
        width: 500px;
        height: 600px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .scan-iframe2 {
        position: absolute;
        top:50%;
        left: 50%;
        width: 500px;
        height: 410px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .scan-iframe3 {
        position: absolute;
        top:50%;
        left: 50%;
        width: 800px;
        height: 700px;
        transform: translate(-50%,-50%);
        background:#fff;
        z-index: 999;
        box-shadow: 0 0 10px #ccc;
        border-radius: 8px;
    }
    .iframe-absolute-con {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6)
    }
}

</style>