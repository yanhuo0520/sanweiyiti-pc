import axios from 'axios';
import qs from 'QS'

axios.defaults.timeout = 50000;
axios.defaults.baseURL ='http://coopera.xfd365.com'; //线上地址
// axios.defaults.baseURL ='http://www.coopera.com/index.php'; //林浩本地地址
// axios.defaults.baseURL ='http://coop.com/index.php'; //陆雨晨本地地址

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // const token = localStorage.getItem('token')
    const token = sessionStorage.getItem('token')
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
    config.data = qs.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    if(token || userInfo){
      config.params = {'token':token,'post_id':userInfo ? userInfo.post_id : ''}
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return Promise.resolve(response)
}, err => {
  // if (err && err.response) {
  //   switch (err.response.status) {
  //     case 400: console.log('错误请求')
  //       break; case 401: console.log('未授权，请重新登录')
  //       break; case 403: console.log('拒绝访问')
  //       break; case 404: console.log('请求错误,未找到该资源')
  //       break; case 405: console.log('请求方法未允许')
  //       break; case 408: console.log('请求超时')
  //       break; case 500: console.log('服务器端出错')
  //       break; case 501: console.log('网络未实现')
  //       break; case 502: console.log('网络错误')
  //       break; case 503: console.log('服务不可用')
  //       break; case 504: console.log('网络超时')
  //       break; case 505: console.log('http版本不支持该请求')
  //       break; default: console.log(`连接错误${err.response.status}`)
  //   }
  // } else {
  //   console.log('连接到服务器失败')
  // }
  return Promise.reject(err.response)
})


//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(res => {
            resolve(res.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}


export const server = {
  // 登录
  login: function(paramObj){
    return post('/admin/index/login',paramObj)
  },
  // 检查token是否过期
  checkToken: function(paramObj){
    return post('admin/index/checkToken',paramObj)
  },
  // 获取权限
  // get_privilege: function(paramObj){
  //   return post('/admin/common/get_privilege',paramObj)
  // },
  get_privilege: function(paramObj){
    return post('/admin/index/get_privilege',paramObj)
  },
 // 获取token 注:仅当is_admin=4 post_id=5 时权限为供应商城权限使用
 get_token: function(paramObj){
    return post('/admin/index/get_token',paramObj)
  },
  // 民族列表
  nation: function(paramObj){
    return post('/user/auth/nation',paramObj)
  },
  // 学历列表
  edu: function(paramObj){
    return post('/user/auth/edu',paramObj)
  },
  // 政治面貌列表
  politicalList: function(paramObj){
    return post('/user/auth/politicalList',paramObj)
  },
  // 获取行业列表
  occList: function(paramObj){
    return post('/user/auth/occList',paramObj)
  },
  // 社员建档
  addUser: function(paramObj){
    return post('/admin/users/add',paramObj)
  },
  // 机构建档
  licenceadd: function(paramObj){
    return post('/admin/users/licenceadd',paramObj)
  },
  // 集体经济组织建档
  collectiveAdd: function(paramObj){
    return post('/admin/users/collectiveAdd',paramObj)
  },
  // 机构建档修改
  licenseEdit: function(paramObj){
    return post('/admin/users/licenseEdit',paramObj)
  },
  // 社员档案修改
  userEdit: function(paramObj){
    return post('/admin/users/userEdit',paramObj)
  },
  // 集体经济修改
  collectiveEdit: function(paramObj){
    return post('/admin/users/collectiveEdit',paramObj)
  },
  // 社员列表
  userList: function(paramObj) {
    return post('/admin/users/lists',paramObj)
  },
  // 社员详情
  userDetail: function(paramObj) {
    return post('/admin/users/userDetail',paramObj)
  },
  // 社员审批
  userStep: function(paramObj) {
    return post('/admin/users/userStep',paramObj)
  },
  // 设置担保额度
  setAmount: function(paramObj) {
    return post('/admin/users/amount',paramObj)
  },

  // 借款审批列表
  loanStepLists: function(paramObj) {
    return post('/admin/loan/loanStepLists',paramObj)
  },
  // 借款审批详情
  loanDetail: function(paramObj) {
    return post('/admin/loan/loanDetail',paramObj)
  },
  // 查找银行卡号
  searchPassbook_num: function(paramObj) {
    return post('/admin/common/searchCard',paramObj)
  },
  // 生成编号
  loanCode: function(paramObj) {
    return post('/admin/loan/loanCode',paramObj)
  },
  // 借款类型
  loanType: function(paramObj) {
    return post('/admin/loan/loanType',paramObj)
  },
  // 担保类型
  loanGuar: function(paramObj) {
    return post('/admin/loan/loanGuar',paramObj)
  },
  // 还款方式
  repayment: function(paramObj) {
    return post('/admin/loan/repayment',paramObj)
  },
  // 借款年限
  loanTerm: function(paramObj) {
    return post('/admin/loan/loanTerm',paramObj)
  },
  // 借款用途
  loanUse: function(paramObj) {
    return post('/admin/loan/loanUse',paramObj)
  },
  // 借款利率
  loanRate: function(paramObj) {
    return post('/admin/loan/loanRate',paramObj)
  },
  // 担保人搜索
  userLists: function(paramObj) {
    return post('/admin/loan/userLists',paramObj)
  },
  // 资产类型列表
  guaranteeType: function(paramObj) {
    return post('/admin/loan/guaranteeType',paramObj)
  },
  // 借款产品下拉列表
   loanProductSelect: function(paramObj) {
    return post('/admin/loan/loanProductSelect',paramObj)
  },
  // 借款申请添加
  loanAdd: function(paramObj) {
    return post('/admin/loan/loanAdd',paramObj)
  },
  // 借款列表
  loanLists: function(paramObj) {
    return post('/admin/loan/loanLists',paramObj)
  },
  // 借款审批
  loanStepAdd: function(paramObj) {
    return post('/admin/loan/loanStepAdd',paramObj)
  },
  // 借款收回最近一笔详情
  userLoanDetail: function(paramObj) {
    return post('/admin/loan/userLoanDetail',paramObj)
  },
  // 借款收回
  loanBackAdd: function(paramObj) {
    return post('/admin/loan/loanBackAdd',paramObj)
  },
  // 借款回收列表
  loanBackList: function(paramObj) {
    return post('/admin/loan/loanBackList',paramObj)
  },
  // 自定义期限列表
  loanTermLists: function(paramObj) {
    return post('/admin/loan/loanTermLists',paramObj)
  },
  // 自定义期限添加
  loanTermAdd: function(paramObj) {
    return post('/admin/loan/loanTermAdd',paramObj)
  },
  // 自定义期限编辑
  loanTermMod: function(paramObj) {
    return post('/admin/loan/loanTermMod',paramObj)
  },
  // 自定义期限删除
  loanTermDel: function(paramObj) {
    return post('/admin/loan/loanTermDel',paramObj)
  },
  // 产品列表
  loanProductLists: function(paramObj) {
    return post('/admin/loan/loanProductLists',paramObj)
  },
  // 借款产品添加
  loanProductAdd: function(paramObj) {
    return post('/admin/loan/loanProductAdd',paramObj)
  },
  // 借款产品编辑
  loanProductMod: function(paramObj) {
    return post('/admin/loan/loanProductMod',paramObj)
  },
   // 借款产品删除
   loanProductDel: function(paramObj) {
    return post('/admin/loan/loanProductDel',paramObj)
  },
  // 借款利率添加
  loanRateAdd: function(paramObj) {
    return post('/admin/loan/loanRateAdd',paramObj)
  },
  // 借款利率编辑
  loanRateMod: function(paramObj) {
    return post('/admin/loan/loanRateMod',paramObj)
  },
  // 借款利率删除
  loanRateDel: function(paramObj) {
    return post('/admin/loan/loanRateDel',paramObj)
  },
  // 股金利率列表
  passbookTermLists: function(paramObj) {
    return post('/admin/loan/passbookTermLists',paramObj)
  },
  // 股金利率添加
  passbookTermAdd: function(paramObj) {
    return post('/admin/loan/passbookTermAdd',paramObj)
  },
  // 股金利率修改
  passbookTermMod: function(paramObj) {
    return post('/admin/loan/passbookTermMod',paramObj)
  },
  // 股金利率删除
  passbookTermDel: function(paramObj) {
    return post('/admin/loan/passbookTermDel',paramObj)
  },
  // 存入类型列表
  passbookType: function(paramObj) {
    return post('/admin/mutualfund/passbookType',paramObj)
  },
  // 系统日志
  systemLog: function(paramObj) {
    return post('/admin/system/systemLog',paramObj)
  },
  // 短信列表
  codelists: function(paramObj) {
    return post('/admin/system/codelists',paramObj)
  },
  // 获取个人信息
  userInfoDetail: function(paramObj) {
    return post('/admin/users/workerDetail',paramObj)
  },
  // 密码修改
  psdMod: function(paramObj) {
    return post('/admin/users/psdMod',paramObj)
  },
  // 验证码获取
  get_code: function(paramObj) {
    return post('/admin/users/get_code',paramObj)
  },

  // 审批流程列表
  loanExamLists: function(paramObj) {
    return post('/admin/system/loanExamLists',paramObj)
  },
  // 审批流程添加
  loanExamAdd: function(paramObj) {
    return post('/admin/system/loanExamAdd',paramObj)
  },
  // 审批流程修改
  loanExamMod: function(paramObj) {
    return post('/admin/system/loanExamMod',paramObj)
  },
  // 审批流程删除
  loanExamStatus: function(paramObj) {
    return post('/admin/system/loanExamStatus',paramObj)
  },
  // 合作社员工职位列表
  jobPostList: function(paramObj) {
    return post('/admin/users/jobPostList',paramObj)
  },
  // 员工列表
  workerListsSelect: function(paramObj) {
    return post('/admin/users/workerListsSelect',paramObj)
  },
  // 员工详情
  workerDetail: function(paramObj) {
    return post('/admin/users/detail',paramObj)
  },
  // 审批模板列表
  examType: function(paramObj) {
    return post('/admin/system/examType',paramObj)
  },
  // 部门列表
  postLists: function(paramObj) {
    return post('/admin/system/postLists',paramObj)
  },
  // 添加编辑 部门
  postAdd: function(paramObj) {
    return post('/admin/system/postAdd',paramObj)
  },
  // 为部门添加权限
  postAddModule: function(paramObj) {
    return post('/admin/system/postAddModule',paramObj)
  },
  // 权限列表
  moduleLists: function(paramObj) {
    return post('/admin/system/moduleLists',paramObj)
  },
  // 添加编辑权限
  moduleAdd: function(paramObj) {
    return post('/admin/system/moduleAdd',paramObj)
  },
  // 根据路径获取当前功能权限
  functionList: function(paramObj) {
    return post('/admin/system/functionList',paramObj)
  },

  // 根据base64上传图片到服务器
  base64Upload: function(paramObj) {
    return post('admin/users/base64',paramObj)
  },

  
  // 合作社添加员工
  workerAdd:function(paramObj){
    return post('/admin/users/workerAdd',paramObj)
  },
  // 员工列表
  workerLists:function(paramObj){
    return post('/admin/users/workerLists',paramObj)
  },
  // 合作社员工职位列表接口
  jobPostList:function(paramObj){
    return post('/admin/users/jobPostList',paramObj)
  },
  // 员工删除接口
  workderDel:function(paramObj){
    return post('/admin/users/workderDel',paramObj)
  },
  // 修改员工密码
  workPwdMod:function(paramObj){
    return post('/admin/users/workPwdMod',paramObj)
  },
  // 员工编辑
  workerEdit:function(paramObj){
    return post('/admin/users/workerEdit',paramObj)
  },

  // 互助金开户
  openAccount:function(paramObj){
    return post('/admin/mutualfund/openAccount',paramObj)
  },
  // 身份证号查找
  searchIdcard:function(paramObj){
    return post('/admin/common/searchIdcard',paramObj)
  },
  // 开户列表
  userRelationLists:function(paramObj){
    return post('/admin/mutualfund/userRelationLists',paramObj)
  },
  // 删除、挂失卡
  updateCardStatus:function(paramObj){
    return post('/admin/mutualfund/updateCardStatus',paramObj)
  },
  // 补卡
  updateCard:function(paramObj){
    return post('/admin/mutualfund/updateCard',paramObj)
  },
  // 存入类型查询
  passbookType:function(paramObj){
    return post('/admin/mutualfund/passbookType',paramObj)
  },
  // 入股期限查询
  passbookTerm:function(paramObj){
    return post('/admin/mutualfund/passbookTerm',paramObj)
  },
  // 互助金卡号查询
  searchCard:function(paramObj){
    return post('/admin/common/searchCard',paramObj)
  },
  // 互助金存入
  saveMoney:function(paramObj){
    return post('/admin/mutualfund/saveMoney',paramObj)
  },
  // 所有股金，定期，活期存款查询
  fixedMoneyAll:function(paramObj){
    return post('/admin/mutualfund/fixedMoneyAll',paramObj)
  },
  // 定期存款支取信息查询
  fixedMoneyById:function(paramObj){
    return post('/admin/mutualfund/fixedMoneyById',paramObj)
  },
  // 互助金支取
  outMoney:function(paramObj){
    return post('/admin/mutualfund/outMoney',paramObj)
  },
  // 互助金转存
  turnMoney:function(paramObj){
    return post('/admin/mutualfund/turnMoney',paramObj)
  },
  // 分红列表
  bonusLists:function(paramObj){
    return post('/admin/mutualfund/bonusLists',paramObj)
  },
  // 执行分红
  bonus:function(paramObj){
    return post('/admin/mutualfund/bonus',paramObj)
  },
  // 入股列表
  saveMoneyLists:function(paramObj){
    return post('/admin/mutualfund/saveMoneyLists',paramObj)
  },

  // 获取省市区与合作社
  cooperative: function(paramObj){
    return post('/user/auth/addresss',paramObj)
  },
  // 根据开户行获取开户支行
  getBranchBank:function(paramObj){
    return post('/admin/system/getBranchBank',paramObj)
  },
  // 微信认证提交资料
  weixinCertify:function(paramObj){
    return post('/admin/system/weixinCertify',paramObj)
  },

  // 合作社列表
  cooperaList:function(paramObj){
    return post('/admin/cooperation/lists',paramObj)
  },
  // 合作社审核
  updateCooperaStatus:function(paramObj){
    return post('/admin/cooperation/updateCooperaStatus',paramObj)
  },
  // 合作社详情
  cooperaDetail:function(paramObj){
    return post('/admin/cooperation/detail',paramObj)
  },
   //游客列表
   touristLists:function(paramObj){
    return post('/admin/cooperation/touristLists',paramObj)
  },

  // 开通微信
  isWeixin:function(paramObj){
    return post('/admin/system/isWeixin',paramObj)
  },
  // 开通支付宝
  isAli:function(paramObj){
    return post('/admin/system/isAli',paramObj)
  },

  // 支取列表
  outMoneyLists:function(paramObj){
    return post('/admin/mutualfund/outMoneyLists',paramObj)
  },
  // 转账列表
  turnMoneyLists:function(paramObj){
    return post('/admin/mutualfund/turnMoneyLists',paramObj)
  },
  // 根据base64识别身份证信息
  idcardBase64:function(paramObj){
    return post('/admin/users/idcardBase64',paramObj)
  },
  // 根据base64识别营业执照信息
  licenseBase64:function(paramObj){
    return post('/admin/users/licenseBase64',paramObj)
  },
  // 管理员查询合作社列表
  cooperativeList:function(paramObj){
    return post('/admin/loan/cooperativeList',paramObj)
  },
  // 数据字典
  dicList:function(paramObj){
    return post('/admin/users/dicList',paramObj)
  },
  // 导出
  exportUrl:function(paramObj){
    return post('/admin/users/exportUrl',paramObj)
  },
  // 退社列表
  outLists:function(paramObj){
    return post('/admin/users/outLists',paramObj)
  },
  // 退社审核
  outSave:function(paramObj){
    return post('/admin/users/outSave',paramObj)
  },
  // 申请退社
  outAdd:function(paramObj){
    return post('/admin/users/outAdd',paramObj)
  },
  // 添加股金
  guaranteeAdd:function(paramObj){
    return post('/admin/users/guaranteeAdd',paramObj)
  },
  // 会计科目列表
  accountingTitleList:function(paramObj){
    return post('/admin/mutualfund/accountingTitleList',paramObj)
  },
  // 会计科目搜索
  accountingTitleSearch:function(paramObj){
    return post('/admin/mutualfund/accountingTitleSearch',paramObj)
  },
  // 编辑或添加会计科目
  accountingTitleAdd:function(paramObj){
    return post('/admin/mutualfund/accountingTitleAdd',paramObj)
  },
  // 订单列表
  orderLists:function(paramObj){
    return post('/admin/order/orderLists',paramObj)
  },
  // 发货
  send:function(paramObj){
    return post('/admin/order/send',paramObj)
  },
  // 订单详情
  orderDetail:function(paramObj){
    return post('/admin/order/orderDetail',paramObj)
  },
  // 广告列表
  picLists:function(paramObj){
    return post('/admin/order/picLists',paramObj)
  },
  // 添加广告图
  shopPicAdd:function(paramObj){
    return post('/admin/order/shopPicAdd',paramObj)
  },
  // 修改广告图
  shopPicUpdate:function(paramObj){
    return post('/admin/order/shopPicUpdate',paramObj)
  },
  // 删除广告图
  shopPicDel:function(paramObj){
    return post('/admin/order/shopPicDel',paramObj)
  },
  // 白名单列表
  ipWhiteLists:function(paramObj){
    return post('/admin/system/ipWhiteLists',paramObj)
  },
  // 添加白名单
  ipWhiteAdd:function(paramObj){
    return post('/admin/system/ipWhiteAdd',paramObj)
  },
  // 禁用白名单
  ipWhiteMod:function(paramObj){
    return post('/admin/system/ipWhiteMod',paramObj)
  },
  // 支取转账详情
  turnMoneyDetail:function(paramObj){
    return post('/admin/mutualfund/turnMoneyDetail',paramObj)
  },

  // 支取转账审核
  turnMoneyVerify:function(paramObj){
    return post('/admin/mutualfund/turnMoneyVerify',paramObj)
  },

// 所有存取款查询
mutualfundMoneyAll:function(paramObj){
  return post('/admin/mutualfund/MoneyAll',paramObj)
},
// 商品列表
goodsLists:function(paramObj){
  return post('/admin/Goods/goodsLists',paramObj)
},
// 分类列表
cateList:function(paramObj){
  return post('/admin/Goods/cateList',paramObj)
},
// 添加商品
goodsAdd:function(paramObj){
  return post('/admin/Goods/goodsAdd',paramObj)
},
// 添加商品规格
// spcifiAdd:function(paramObj){
//   return post('/admin/Goods/spcifiAdd',paramObj)
// },
// 商品上下架
goodsOnSale:function(paramObj){
  return post('/admin/Goods/goodsOnSale',paramObj)
},
// 商品详情
goodsDetail:function(paramObj){
  return post('/admin/Goods/goodsDetail',paramObj)
},
// 商品删除
goodsDel:function(paramObj){
return post('/admin/Goods/goodsDel',paramObj)
},
// 商品审核
goodsVerify:function(paramObj){
  return post('/admin/Goods/goodsVerify',paramObj)
  },

// 添加商城分类
assortAdd:function(paramObj){
return post('/admin/Goods/assortAdd',paramObj)
},
// 删除分类
cateDel:function(paramObj){
return post('/admin/Goods/cateDel',paramObj)
},
// 添加编辑店铺分类
cateAdd:function(paramObj){
return post('/admin/Goods/cateAdd',paramObj)
},
// 积分配置列表
interLIsts:function(paramObj){
  return post('/admin/intergal/interLIsts',paramObj)
},
// 添加积分配置
interAdd:function(paramObj){
  return post('/admin/intergal/interAdd',paramObj)
},
// 编辑积分配置
interEdit:function(paramObj){
  return post('/admin/intergal/interEdit',paramObj)
},
// 积分来源类型列表
interClass:function(paramObj){
  return post('/admin/intergal/interClass',paramObj)
},
// 用户积分列表
userInterLists:function(paramObj){
  return post('/admin/users/userInterLists',paramObj)
},
// 用户积分列表
userInterLogLists:function(paramObj){
  return post('/admin/users/userInterLogLists',paramObj)
},
// 卡号生成
getCard:function(paramObj){
  return post('/admin/common/getCard',paramObj)
},
// 根据IC芯片卡号查询卡号
searchICCard:function(paramObj){
  return post('/admin/common/searchIC_Card',paramObj)
},
// 添加区域管理员
districtAdd:function(paramObj){
  return post('/admin/users/districtAdd',paramObj)
},
// 编辑区域管理员
districtMod:function(paramObj){
  return post('/admin/users/districtMod',paramObj)
},
// 区域管理员列表
adminLists:function(paramObj){
  return post('/admin/users/adminLists',paramObj)
},

// 股金开户
openStockAccount:function(paramObj){
  return post('/admin/mutualfund/openStockAccount',paramObj)
},
// 分红金额总计
bonusTotal:function(paramObj){
  return post('/admin/mutualfund/bonusTotal',paramObj)
},
// 合作社分红
bonusCooperative:function(paramObj){
  return post('/admin/mutualfund/bonusCooperative',paramObj)
},
// 获取下级合作社列表
cooperativeLevelList:function(paramObj){
  return post('/admin/loan/cooperativeLevelList',paramObj)
},
// 根据手机号验证用户信息
checkTel:function(paramObj){
  return post('/admin/users/isUser',paramObj)
},
// 二级商户信息同步
regSubMerInfoRequest:function(paramObj){
  return post('/admin/system/regSubMerInfoRequest',paramObj)
},
// 二级商户签约确认
verifyMessageCodeAndRandomAmount:function(paramObj){
  return post('/admin/system/verifyMessageCodeAndRandomAmount',paramObj)
},
// 二级商户账簿余额查询
subMerAccBalQryRequest:function(paramObj){
  return post('/admin/system/subMerAccBalQryRequest',paramObj)
},
// 农行提现
outPaymentRequest:function(paramObj){
  return post('/admin/system/outPaymentRequest',paramObj)
},
// 二级商户信息查询
qrySubMerchantInfoRequest:function(paramObj){
  return post('/admin/system/qrySubMerchantInfoRequest',paramObj)
},
// 农行认证提交资料
abcCertify:function(paramObj){
  return post('/admin/system/abcCertify',paramObj)
},
// 设置股金利率
setStockAmount:function(paramObj){
  return post('/admin/mutualfund/setStockAmount',paramObj)
},
// 查询银行名称
selectBank:function(paramObj){
  return post('/admin/system/selectBank',paramObj)
},
//获取地图json数据
areaJson: function(paramObj){
  return post('/admin/common/areaJson',paramObj)
},
// 获取所有置顶用户/群及最近十条聊天记录
userCluterList: function(paramObj) {
  return post('/admin/chat/userCluterList',paramObj)
},
// 首次进来左边显示聊天记录 注: 此列表前端自己把置顶用户隐藏掉
userRecordList: function(paramObj) {
  return post('/admin/chat/userRecordList',paramObj)
},
// 用户群列表
clusterLists: function(paramObj) {
  return post('/admin/chat/clusterLists',paramObj)
},
// 当前用户（取消）免打扰
setSendType: function(paramObj) {
  return post('/admin/chat/sendType',paramObj)
},
// 当前用户（取消）置顶
setTopType: function(paramObj) {
  return post('/admin/chat/topType',paramObj)
},
// 用户好友列表
friendLists: function(paramObj) {
  return post('/admin/chat/friendLists',paramObj)
},
// 点击聊天把未读的消息设置成已读
setDu: function(paramObj) {
  return post('/admin/chat/setDu',paramObj)
},
// 点击聊天把未读的消息设置成已读
recordLogDel: function(paramObj) {
  return post('/admin/chat/recordLogDel',paramObj)
},
// 获取消息人数
isDuCount: function(paramObj) {
  return post('/admin/chat/isDuCount',paramObj)
},
// 根据手机号查询用户添加
searcUser: function(paramObj) {
  return post('/admin/chat/searcUser',paramObj)
},
// 资金业务
statisticByUser: function(paramObj) {
  return post('/admin/mutualfund/statisticByUser',paramObj)
},
// 用户申请添加用户为好友
firendsAdd: function(paramObj) {
  return post('/admin/chat/firendsAdd',paramObj)
},
// 同意/拒绝好友申请
firendType: function(paramObj) {
  return post('/admin/chat/firendType',paramObj)
},
// 申请添加好友列表
firendAddList: function(paramObj) {
  return post('/admin/chat/firendAddList',paramObj)
},
// 订单退款接口（12月8号新加）
orderRefund: function(paramObj) {
  return post('/admin/order/orderRefund',paramObj)
},
// 根据userId获取用户信息
searcUserId: function(paramObj) {
  return post('/admin/chat/searcUserId',paramObj)
},
// 股金总额
stockCount: function(paramObj) {
  return post('/admin/Statistic/stockCount',paramObj)
},

// 股金总额
stockCount: function(paramObj) {
  return post('/admin/Statistic/stockCount',paramObj)
},
// 股金总额
stockCount: function(paramObj) {
  return post('/admin/Statistic/stockCount',paramObj)
},
// 统计合作联社, 合作社
cooperaCount: function(paramObj) {
  return post('/admin/Statistic/cooperaCount',paramObj)
},
// 基础成员,今日入社人数
cooperaUserCount: function(paramObj) {
  return post('/admin/Statistic/cooperaUserCount',paramObj)
},
// 股金余额,互助金余额
stockSort: function(paramObj) {
  return post('/admin/Statistic/stockSort',paramObj)
},
// 市数据
areaData: function(paramObj) {
  return post('/admin/Statistic/areaData',paramObj)
},
// 今日股金
stockToday: function(paramObj) {
  return post('/admin/Statistic/stockToday',paramObj)
},
// 删除二级科目
accountingTitleDel: function(paramObj) {
  return post('/admin/mutualfund/accountingTitleDel',paramObj)
},
// 身份证ocr识别
aip_idcard_new: function(paramObj) {
  return post('/admin/system/aip_idcard_new',paramObj)
},
// 营业执照ocr识别
aip_business_license: function(paramObj) {
  return post('/admin/system/aip_business_license',paramObj)
},
// 农行-查询农行账户余额
abcBalance: function(paramObj) {
  return post('/admin/order/abcBalance',paramObj)
},
// 信服达农资商城农行提现
abcWithdraw: function(paramObj) {
  return post('/admin/order/abcWithdraw',paramObj)
},
// 银联认证
miniCertify_new: function(paramObj){
  return post('/admin/system/miniCertify_new',paramObj)
},
// 阶梯价格删除
tieredDel: function(paramObj){
  return post('/admin/Goods/tieredDel',paramObj)
},
// 短信配置列表
messageLists:function(paramObj){
  return post('/admin/system/messageLists',paramObj)
  },
  // 添加编辑短信配置
  messageAdd:function(paramObj){
  return post('/admin/system/messageAdd',paramObj)
  },
  // 删除短信配置
  messageDel:function(paramObj){
  return post('admin/system/messageDel',paramObj)
  },
  // 配置短信发送人员
  messageUser:function(paramObj){
  return post('/admin/system/messageUser',paramObj)
  },
  // 短信配置详情
  messageDetail:function(paramObj){
  return post('/admin/system/messageDetail',paramObj)
  },
  // 商品排序
  goodsSort:function(paramObj){
  return post('/admin/Goods/goodsSort',paramObj)
  },
  // 获取商城权限
  getShopNav:function(paramObj) {
    return post('/admin/System/get_privilege',paramObj)
  },
  // 获取商城权限
  goodsAddModule:function(paramObj) {
    return post('/admin/system/goodsAddModule',paramObj)
  },
  // 获取每日报表
  settlement:function(paramObj) {
    return post('/admin/statistic/settlement',paramObj)
  },
  // 金额明细
  settlementLists:function(paramObj) {
    return post('/admin/statistic/settlementLists',paramObj)
  },
  // 签到签退
  signAdd:function(paramObj) {
    return post('/admin/sign/signAdd',paramObj)
  },
  // 签到签退列表
  signLists:function(paramObj) {
    return post('/admin/sign/signLists',paramObj)
  },
  // 签到签退查询
  signSearch:function(paramObj) {
    return post('/admin/sign/signSearch',paramObj)
  },
  // 查询今日扎帐发生额
  settlementAll:function(paramObj) {
    return post('/admin/statistic/settlementAll',paramObj)
  },
  // 柜员扎帐
  settlementAdd:function(paramObj) {
    return post('/admin/statistic/settlementAdd',paramObj)
  },
  // 扎帐列表
  settlementListsTotal:function(paramObj) {
    return post('/admin/statistic/settlementListsTotal',paramObj)
  },
  // 添加跟踪记录
  trackAdd:function(paramObj) {
    return post('/admin/statistic/trackAdd',paramObj)
  },
  // 跟踪记录列表
  trackLists:function(paramObj) {
    return post('/admin/statistic/trackLists',paramObj)
  },
  // 扎帐查询
  settlementSearch:function(paramObj) {
    return post('/admin/statistic/settlementSearch',paramObj)
  },
  // 提前还款
  advanceLoan:function(paramObj) {
    return post('/admin/loan/advanceLoan',paramObj)
  },
  // 今日应还
  todayLoan:function(paramObj) {
    return post('/admin/loan/todayLoan',paramObj)
  },
  // 今日应还全部还款
  todayLoanPay:function(paramObj) {
    return post('/admin/loan/todayLoanPay',paramObj)
  },
  // 我要还款提前还款
  advanceLoanPay:function(paramObj) {
    return post('/admin/loan/advanceLoanPay',paramObj)
  },
  // 提前还款明细
  advanceLoanDetail:function(paramObj) {
    return post('/admin/loan/advanceLoanDetail',paramObj)
  },
  // 商品分类图标列表
  cateIconList:function(paramObj){
    return post('/admin/Goods/cateIconList',paramObj)
  },
  // 赏金任务列表
  rewardLists:function(paramObj){
    return post('/admin/reward/reward_lists',paramObj)
  },
  // 审核领取任务
  verifyTask:function(paramObj){
		return post('/api/reward/verify',paramObj)
	},
  // 赏金任务审核
  rewardUpdateStatus:function(paramObj){
    return post('/admin/reward/reward_update_status',paramObj)
  },
  // 帮助中心列表
  helpLists:function(paramObj){
    return post('/admin/system/helpLists',paramObj)
  },
  // 帮助中心拖拽排序
  helpSort:function(paramObj){
    return post('/admin/system/helpSort',paramObj)
  },
  // 帮助中心 文章详情
  helpDetail:function(paramObj){
    return post('/admin/system/helpDetail',paramObj)
  },
  // 帮助中心 删除文章
  helpDel:function(paramObj){
    return post('/admin/system/helpDel',paramObj)
  },
  // 帮助中心 添加/编辑文章
  helpAdd:function(paramObj){
    return post('/admin/system/helpAdd',paramObj)
  },
  // 悬赏举报列表
  taskLists:function(paramObj){
    return post('/admin/reward/taskLists',paramObj)
  },
  // 用户领取列表
  userRewardLists:function(paramObj){
    return post('/admin/reward/userRewardLists',paramObj)
  },
  // 获取接单限时，审核时间，做单次数 任务类型配置信息
	getConfig: function(paramObj) {
		return post('/api/reward/get_config', paramObj)
  },
  // 赏金任务详情
  rewardDetail: function(paramObj) {
		return post('/admin/reward/reward_detail', paramObj)
  },
  // 提现审核列表
  rewardbankLists: function(paramObj) {
		return post('/admin/reward/rewardbankLists', paramObj)
  },
  // 提现审核
  rewardBankStatus: function(paramObj) {
		return post('/admin/reward/reward_bank_status', paramObj)
  },
  // 任务上下架
  rewardIsShow: function(paramObj) {
		return post('/admin/reward/reward_is_show', paramObj)
  },
  // 查询微信服务商余额
  searchWXAmount: function(paramObj) {
		return post('/admin/reward/search_weixin_amount', paramObj)
  },
  // 微信虚拟账户充值
  addWXAmount: function(paramObj) {
		return post('/admin/reward/add_weixin_amount', paramObj)
  },
  // 微信虚拟账户账单明细
  searchWXAddList: function(paramObj) {
		return post('/admin/reward/search_weixin_add_list', paramObj)
  },
  // 分销管理--团队列表
  teamLists:function(paramObj){
    return post('/admin/team/teamLists',paramObj)
  },
  // 分销管理--团队列表--成员列表
  memberList:function(paramObj){
    return post('/admin/team/memberList',paramObj)
  },
  // 分销管理--团队列表--分销商品列表
  fxGoodsList:function(paramObj){
    return post('/admin/team/goodsList',paramObj)
  },
  // 平台账户资金
  walletUserLists:function(paramObj){
    return post('/admin/wallet/user_lists',paramObj)
  },
  // 账户资金明细
  wallet_lists:function(paramObj){
    return post('/admin/wallet/wallet_lists',paramObj)
  },
  // 零钱转到银行卡审核详情
  wallet_verify_details:function(paramObj){
    return post('/admin/wallet/wallet_verify_details',paramObj)
  },
  // 零钱转到银行卡审核
  wallet_verify:function(paramObj){
    return post('/admin/wallet/wallet_verify',paramObj)
  },
  // 分销管理--团队审核
  updateTeamStatus: function (paramObj) {
    return post('/admin/team/updateTeamStatus', paramObj)
  },
  // 赏金任务添加
  reward_add: function (paramObj) {
      return post('/admin/reward/reward_add', paramObj)
  },
  // 任务完成情况
	makeDetail:function(paramObj){
		return post('/api/reward/make_detail',paramObj)
  },
  // 版本号列表
  versionList:function(paramObj){
		return post('/admin/system/versionList',paramObj)
  },
  // 添加版本号
  versionAdd:function(paramObj){
		return post('/admin/system/versionAdd',paramObj)
  },
}
