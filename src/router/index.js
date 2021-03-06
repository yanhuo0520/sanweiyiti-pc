import Vue from 'vue'
import Router from 'vue-router'
import appMain from '@/components/appMain'

import login from '@/pages/login'
import index from '@/pages/index'
import noPermission from '@/pages/noPermission'
import changeRole from '@/pages/changeRole'

// 基础信息
import addConfrere from '@/pages/baseInfo/addConfrere'
import confrereList from '@/pages/baseInfo/confrereList'
import confrereDetail from '@/pages/baseInfo/confrereDetail'
import confrereApproveList from '@/pages/baseInfo/confrereApproveList'
import outClubList from '@/pages/baseInfo/outClubList'
import staffManage from '@/pages/baseInfo/staffManage'
import addStaff from '@/pages/baseInfo/addStaff'
//借款业务
import loanStepList from '@/pages/loan/loanStepList'
import loanStepDetail from '@/pages/loan/loanStepDetail'
import loanList from '@/pages/loan/loanList'
import loanApply from '@/pages/loan/loanApply'
import loanWithdrawList from '@/pages/loan/loanWithdrawList'
import loanWithdraw from '@/pages/loan/loanWithdraw'
//系统设置
import loanDateList from '@/pages/systemSettings/loanDateList'
import loanProductList from '@/pages/systemSettings/loanProductList'
import passbookTermList from '@/pages/systemSettings/passbookTermList'
import logList from '@/pages/systemSettings/logList'
import codelists from '@/pages/systemSettings/codelists'
import personal from '@/pages/systemSettings/personal'
import loanExamList from '@/pages/systemSettings/loanExamList'
import postList from '@/pages/systemSettings/postList'
import permissionLit from '@/pages/systemSettings/permissionLit'
import accountingTitleList from '@/pages/systemSettings/accountingTitleList'
import whitelist from '@/pages/systemSettings/whitelist'
import presidentPermission from '@/pages/systemSettings/presidentPermission'
import adminList from '@/pages/systemSettings/adminList'
import pointSetting from '@/pages/systemSettings/pointSetting'
import noteList from '@/pages/systemSettings/noteList'
import versionList from '@/pages/systemSettings/versionList'

// 互助金
import openAccount from '@/pages/mutualfund/openAccount'
import depositAmount from '@/pages/mutualfund/depositAmount'
import depositDraw from '@/pages/mutualfund/depositDraw'
import accountList from '@/pages/mutualfund/accountList'
import unloading from '@/pages/mutualfund/unloading'
import dividendList from '@/pages/mutualfund/dividendList'
import mutualDepositList from '@/pages/mutualfund/mutualDepositList'
import mutualfundList from '@/pages/mutualfund/mutualfundList'
// import depositDrawList from '@/pages/mutualfund/depositDrawList'
// import transferAccountList from '@/pages/mutualfund/transferAccountList'
// 商户认证
import weixinAuth from '@/pages/identification/weixinAuth'
import identyInfo from '@/pages/identification/identyInfo'
import yinlianAuth from '@/pages/identification/yinlianAuth'

// 机构列表
import organizationList from '@/pages/organization/list'
import childList from '@/pages/organization/childList'
import memberList from '@/pages/organization/memberList'

// 柜员管理
import reportList from '@/pages/teller/reportList'
import signRecord from '@/pages/teller/signRecord'
import tieUp from '@/pages/teller/tieUp'

// 转账审批管理
import transferList from '@/pages/finance/transferList'
import transferDetail from '@/pages/finance/transferDetail'
import depositList from '@/pages/finance/depositList'
import depositDetail from '@/pages/finance/depositDetail'

// 收益账户
import accountListByIncome from '@/pages/income/accountListByIncome'
import incomeList from '@/pages/income/incomeList'
import withdrawal from '@/pages/income/withdrawal'

// 商品列表
import goodsApproveList from '@/pages/goods/goodsApproveList'
import goodsList from '@/pages/goods/goodsList'
import addGoods from '@/pages/goods/addGoods'
import orderList from '@/pages/goods/orderList'
import orderDetail from '@/pages/goods/orderDetail'
import bannerList from '@/pages/goods/bannerList'
import pointList from '@/pages/goods/pointList'
import pointDetailList from '@/pages/goods/pointDetailList'
import assortList from '@/pages/goods/assortList'
import cateList from '@/pages/goods/cateList'

// 合作商城管理
import goodsApproveListByShop from '@/pages/shop/goodsApproveList'
import bannerListByShop from '@/pages/shop/bannerList'
import assortListByShop from '@/pages/shop/assortList'
import addGoodsByShop from '@/pages/shop/addGoods'

// 股金
import capopenAccount from '@/pages/capital/openAccount'
import capdepositAmount from '@/pages/capital/depositAmount'
import capdepositDraw from '@/pages/capital/depositDraw'
import capdividend from '@/pages/capital/dividend'
import capunloading from '@/pages/capital/unloading'
import capdividendDraw from '@/pages/capital/dividendDraw'
import capmutualDepositList from '@/pages/capital/mutualDepositList'
import capdrawList from '@/pages/capital/drawList'
import capdividendList from '@/pages/capital/dividendList'
import capaccountList from '@/pages/capital/accountList'
import capitalSetting from '@/pages/capital/capitalSetting'
import capdividendDrawList from '@/pages/capital/dividendDrawList'

// 监管查询报表
import monthForm from '@/pages/supervise/monthForm'
import propertyForm from '@/pages/supervise/propertyForm'
import fullForm from '@/pages/supervise/fullForm'
import zijin from '@/pages/supervise/zijin'

// 聊天
import msgList from '@/pages/chat/msgList'
import contactList from '@/pages/chat/contactList'
import fileList from '@/pages/chat/fileList'
import imgList from '@/pages/chat/imgList'

// 供应商城
import supplyIndex from '@/pages/supplyShop/index'
import supplyGoodsList from '@/pages/supplyShop/goods/goodsList'
import supplyAddGoods from '@/pages/supplyShop/goods/addGoods'
import supplyGoodsDetail from '@/pages/supplyShop/goods/goodsDetail'
import supplyCateList from '@/pages/supplyShop/goods/cateList'
import supplyAssortList from '@/pages/supplyShop/goods/assortList'
import supplyOrderList from '@/pages/supplyShop/sales/orderList'
import supplyOrderDetail from '@/pages/supplyShop/sales/orderDetail'
import supplyBannerList from '@/pages/supplyShop/systemSetting/bannerList'
import supplyPointList from '@/pages/supplyShop/sales/pointList'
import supplyPointDetailList from '@/pages/supplyShop/sales/pointDetailList'
// 合作商城
import cooperateIndex from '@/pages/cooperateShop/index'
import cooperateGoodsList from '@/pages/cooperateShop/goods/goodsList'
import cooperateAddGoods from '@/pages/cooperateShop/goods/addGoods'
import cooperateGoodsDetail from '@/pages/cooperateShop/goods/goodsDetail'
import cooperateCateList from '@/pages/cooperateShop/goods/cateList'
import cooperateOrderList from '@/pages/cooperateShop/sales/orderList'
import cooperateOrderDetail from '@/pages/cooperateShop/sales/orderDetail'
// 农资商城
import nzIndex from '@/pages/nzShop/index'
import nzGoodsList from '@/pages/nzShop/goods/goodsList'
import nzAddGoods from '@/pages/nzShop/goods/addGoods'
import nzGoodsDetail from '@/pages/nzShop/goods/goodsDetail'
import nzCateList from '@/pages/nzShop/goods/cateList'
import nzAssortList from '@/pages/nzShop/goods/assortList'
import nzOrderList from '@/pages/nzShop/sales/orderList'
import nzOrderDetail from '@/pages/nzShop/sales/orderDetail'
import nzBannerList from '@/pages/nzShop/systemSetting/bannerList'
import nzWithDraw from '@/pages/nzShop/systemSetting/withDraw'
import nzNoteList from '@/pages/nzShop/systemSetting/noteList'
import nzPostList from '@/pages/nzShop/systemSetting/postList'
import nzStaffManage from '@/pages/nzShop/systemSetting/staffManage'
import nzAddStaff from '@/pages/nzShop/systemSetting/addStaff'

//赏金任务
import taskList from '@/pages/bountyTask/taskList'
import helpList from '@/pages/bountyTask/helpList'
import articleDetail from '@/pages/bountyTask/articleDetail'
import claimList from '@/pages/bountyTask/claimList'
import reportRecordList from '@/pages/bountyTask/reportRecordList'
import taskSetting from '@/pages/bountyTask/taskSetting'
import taskType from '@/pages/bountyTask/taskType'
import withDrawList from '@/pages/bountyTask/withDrawList'
import wxVirtualAccount from '@/pages/bountyTask/wxVirtualAccount'
import wxAccountBill from '@/pages/bountyTask/wxAccountBill'
import addTask from '@/pages/bountyTask/addTask'

// 分销管理
import distributionList from '@/pages/distribution/distributionList'
import teamPeopleList from '@/pages/distribution/teamPeopleList'
import goodsAuditByDistr from '@/pages/distribution/goodslist'
import goodsDetailByDistr from '@/pages/distribution/goodsDetail'

// 资金管理
import userListByWallet from '@/pages/moneyManagement/userList'
import billDetailByWallet from '@/pages/moneyManagement/billDetail'

//在路由跳转的时候同一个路由多次添加是不被允许的
//重写路由的push方法
const routerResetPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return routerResetPush.call(this, to).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',redirect:'/'
    },
    {
      path: '/login',
      component: login,
      name: '登录',
    },
    {
      path: '/changeRole',
      component: changeRole,
      name: '切换身份',
    },{
      path: '/',
      component: appMain,
      redirect: '/index',
      children: [
        {
          path: '/index',
          component:index,
          name: '首页',
        }
      ]
    },{
      path: '/noPermission',
      component: appMain,
      redirect: '/noPermission',
      children: [
        {
          path: '/noPermission',
          component:noPermission,
          name: '无权限',
        }
      ]
    },
    {
      path: '/baseInfo',
      component: appMain,
      redirect: '/addConfrere',
      children: [
        {
          path: '/addConfrere',
          component:addConfrere,
          name: '社员建档',
        },{
          path: '/confrereList',
          component:confrereList,
          name: '社员档案',
        },{
          path: '/confrereApproveList',
          component:confrereApproveList,
          name: '社员审批',
        },{
          path: '/confrereDetail',
          component:confrereDetail,
          name: '社员详情',
        },{
          path: '/staffManage',
          component:staffManage,
          name: '员工管理',
        },{
          path: '/addStaff',
          component:addStaff,
          name: '添加员工',
        },{
          path: '/outClubList',
          component:outClubList,
          name: '退社列表',
        }
      ]
    },
    {
      path: '/mutualfund',
      component: appMain,
      redirect: '/openAccount',
      children: [
        {
          path: '/openAccount',
          component:openAccount,
          name: '社员开户',
          meta: { keepAlive: false },
        },
        {
          path: '/depositAmount',
          component:depositAmount,
          name: '互助金存入',
          meta: { keepAlive: false },
        },
        {
          path: '/depositDraw',
          component:depositDraw,
          name: '互助金支取',
          meta: { keepAlive: false },
        },
        // {
        //   path: '/transferAccountList',
        //   component:transferAccountList,
        //   name: '互助金转账列表',
        //   meta: { keepAlive: false },
        // },
        {
          path: '/unloading',
          component:unloading,
          name: '互助金转存',
          meta: { keepAlive: false },
        },
        {
          path: '/mutualDepositList',
          component:mutualDepositList,
          name: '互助金存入列表',
          meta: { keepAlive: false },
        },
        {
          path: '/mutualfundList',
          component:mutualfundList,
          name: '互助金列表',
          meta: { keepAlive: false },
        },
        {
          path: '/dividendList',
          component:dividendList,
          name: '分红列表',
          meta: { keepAlive: false },
        },
        {
          path: '/accountList',
          component:accountList,
          name: '开户列表',
          meta: { keepAlive: false },
        }
      ]
    },{
      path: '/capital',
      component: appMain,
      redirect: '/capopenAccount',
      children: [
      {
      path: '/capopenAccount',
      component:capopenAccount,
      name: '股金开户',
      meta: { keepAlive: false },
      },
      {
      path: '/capdepositAmount',
      component:capdepositAmount,
      name: '股金入股',
      meta: { keepAlive: false },
      },
      {
      path: '/capdepositDraw',
      component:capdepositDraw,
      name: '股金退股',
      meta: { keepAlive: false },
      },
      {
      path: '/capdividend',
      component:capdividend,
      name: '股金分红',
      meta: { keepAlive: false },
      },
      {
      path: '/capunloading',
      component:capunloading,
      name: '股金转让',
      meta: { keepAlive: false },
      },
      {
      path: '/capdividendDraw',
      component:capdividendDraw,
      name: '年终分红支取',
      meta: { keepAlive: false },
      },
      {
      path: '/capmutualDepositList',
      component:capmutualDepositList,
      name: '入股列表',
      meta: { keepAlive: false },
      },
      {
      path: '/capdrawList',
      component:capdrawList,
      name: '退股列表',
      meta: { keepAlive: false },
      },
      {
      path: '/capdividendList',
      component:capdividendList,
      name: '分红列表',
      meta: { keepAlive: false },
      },
      {
      path: '/capaccountList',
      component:capaccountList,
      name: '开户列表',
      meta: { keepAlive: false },
      },{
        path: '/capitalSetting',
        component:capitalSetting,
        name: '股金配置',
        meta: { keepAlive: false },
      },{
        path: '/capdividendDrawList',
        component:capdividendDrawList ,
        name: '分红支取列表',
        meta: { keepAlive: false },
      }
      ]
      },
    {
      path: '/identification',
      component: appMain,
      redirect: '/weixinAuth',
      children: [
        {
          path: '/identyInfo',
          component:identyInfo,
          name: '认证首页',
          meta: { keepAlive: false },
        },
        {
          path: '/weixinAuth',
          component:weixinAuth,
          name: '微信认证',
          meta: { keepAlive: false },
        },
        {
          path: '/yinlianAuth',
          component:yinlianAuth,
          name: '银联认证',
          meta: { keepAlive: false },
        }
      ]
    },
    {
      path: '/organization',
      component: appMain,
      redirect: '/organizationList',
      children: [
        {
          path: '/organizationList',
          component:organizationList,
          name: '机构列表',
          meta: { keepAlive: false },
        },
        {
          path: '/childList',
          component:childList,
          name: '合作社列表',
          meta: { keepAlive: false },
        },
        {
          path: '/memberList',
          component:memberList,
          name: '普通会员列表',
          meta: { keepAlive: false },
        }
      ]
    },
    {
      path: '/supervise',
      component: appMain,
      redirect: '/monthForm',
      children: [
        {
          path: '/monthForm',
          component:monthForm,
          name: '月季业务状况表',
          meta: { keepAlive: false },
        },
        {
          path: '/propertyForm',
          component:propertyForm,
          name: '资产负债表',
          meta: { keepAlive: false },
        },
        {
          path: '/fullForm',
          component:fullForm,
          name: '盈余及盈余分配表',
          meta: { keepAlive: false },
        },
        {
          path: '/zijin',
          component:zijin,
          name: '资金业务',
          meta: { keepAlive: false },
        }
      ]
    },{
      path: '/income',
      component: appMain,
      redirect: '/accountListByIncome',
      children: [
        {
          path: '/accountListByIncome',
          component:accountListByIncome,
          name: '账户列表',
          meta: { keepAlive: false },
        },
        {
          path: '/incomeList',
          component:incomeList,
          name: '收益列表',
          meta: { keepAlive: false },
        },
        {
          path: '/withdrawal',
          component:withdrawal,
          name: '收益支取',
          meta: { keepAlive: false },
        }
      ]
    },{
      path: '/teller',
      component: appMain,
      redirect: '/reportList',
      children: [
        {
          path: '/reportList',
          component:reportList,
          name: '每日报表'
        },
        {
          path: '/tieUp',
          component:tieUp,
          name: '柜员扎帐'
        },
        {
          path: '/signRecord',
          component:signRecord,
          name: '签到签退记录'
        }
      ]
    },{
      path: '/finance',
      component: appMain,
      redirect: '/transferList',
      children: [
        {
          path: '/transferList',
          component:transferList,
          name: '转账审批列表',
          meta: { keepAlive: false },
        },
        {
          path: '/transferDetail',
          component:transferDetail,
          name: '转账审批详情',
          meta: { keepAlive: false },
        },
        {
          path: '/depositList',
          component:depositList,
          name: '取款审批列表',
          meta: { keepAlive: false },
        },
        {
          path: '/depositDetail',
          component:depositDetail,
          name: '取款审批详情',
          meta: { keepAlive: false },
        }
      ]
    },
    {
      path: '/loan',
      component: appMain,
      redirect: '/loanStepList',
      children: [
        {
          path: '/loanStepList',
          component:loanStepList,
          name: '借款审批',
        },{
          path: '/loanStepDetail',
          component:loanStepDetail,
          name: '借款详情',
        },{
          path: '/loanApply',
          component:loanApply,
          name: '借款申请',
        },{
          path: '/loanList',
          component:loanList,
          name: '借款列表',
        },{
          path: '/loanWithdrawList',
          component:loanWithdrawList,
          name: '借款回收列表',
        },{
          path: '/loanWithdraw',
          component:loanWithdraw,
          name: '借款收回',
        }
      ]
    },
    {
      path: '/finance',
      component: appMain,
      redirect: '/transferList',
      children: [
        {
          path: '/transferList',
          component:transferList,
          name: '转账审批列表',
          meta: { keepAlive: false },
        },
        {
          path: '/transferDetail',
          component:transferDetail,
          name: '转账审批详情',
          meta: { keepAlive: false },
        },
        {
          path: '/depositList',
          component:depositList,
          name: '取款审批列表',
          meta: { keepAlive: false },
        },
        {
          path: '/depositDetail',
          component:depositDetail,
          name: '取款审批详情',
          meta: { keepAlive: false },
        }
      ]
    },
    {
      path: '/systemSettings',
      component: appMain,
      redirect: '/loanDateList',
      children: [
        {
          path: '/loanDateList',
          component:loanDateList,
          name: '借款期限',
        },{
          path: '/loanProductList',
          component:loanProductList,
          name: '借款产品',
        },{
          path: '/passbookTermList',
          component:passbookTermList,
          name: '互助金利率',
        },{
          path: '/pointSetting',
          component:pointSetting,
          name: '积分配置',
        },{
          path: '/noteList',
          component:noteList,
          name: '短信配置',
        },{
          path: '/logList',
          component:logList,
          name: '系统日志',
        },{
          path: '/codelists',
          component:codelists,
          name: '短信记录',
        },{
          path: '/personal',
          component:personal,
          name: '账号管理',
        },{
          path: '/loanExamList',
          component:loanExamList,
          name: '审批流程',
        },{
          path: '/postList',
          component:postList,
          name: '部门列表',
        },{
          path: '/permissionLit',
          component:permissionLit,
          name: '权限列表',
        },{
          path: '/accountingTitleList',
          component:accountingTitleList,
          name: '科目配置',
        },
        {
          path: '/whitelist',
          component:whitelist,
          name: '白名单列表',
        },
        {
          path: '/presidentPermission',
          component:presidentPermission,
          name: '社长权限',
        },
        {
          path: '/adminList',
          component:adminList,
          name: '区域管理员',
        },
        {
          path: '/versionList',
          component:versionList,
          name: '版本列表',
        }
      ]
    },
    {
      path: '/goodsList',
      component: appMain,
      redirect: '/goodsList',
      children: [{
        path: '/goodsApproveList',
        component:goodsApproveList,
        name: '商品审核列表',
        meta: { keepAlive: false },
      },{
        path: '/goodsList',
        component:goodsList,
        name: '商品列表',
        meta: { keepAlive: false },
      },
      {
        path: '/addGoods',
        component:addGoods,
        name: '添加商品',
        meta: { keepAlive: false },
      },
      {
        path: '/assortList',
        component:assortList,
        name: '商城分类列表',
        meta: { keepAlive: false },
      },
      {
        path: '/cateList',
        component:cateList,
        name: '店铺分类列表',
        meta: { keepAlive: false },
      },
      {
          path: '/orderList',
          component:orderList,
          name: '订单列表',
        },
        {
          path: '/orderDetail',
          component:orderDetail,
          name: '订单详情',
        },
        {
          path: '/bannerList',
          component:bannerList,
          name: '轮播图列表',
        },
        {
          path: '/pointList',
          component:pointList,
          name: '积分列表',
        },
        {
          path: '/pointDetailList',
          component:pointDetailList,
          name: '积分明细',
        }
        
      ]
    },
    {
      path: '/goodsApproveListByShop',
      component: appMain,
      redirect: '/goodsApproveListByShop',
      children: [{
        path: '/goodsApproveListByShop',
        component:goodsApproveListByShop,
        name: '商品审核列表',
        meta: { keepAlive: false },
      },
      {
        path: '/assortListByShop',
        component:assortListByShop,
        name: '商城分类列表',
        meta: { keepAlive: false },
      },
      {
        path: '/bannerListByShop',
        component:bannerListByShop,
        name: '轮播图列表',
      },
      {
        path: '/addGoodsByShop',
        component:addGoodsByShop,
        name: '商品详情',
      }
      ]
    },
    {
      path: '/supplyIndex',
      component: appMain,
      redirect: '/supplyIndex',
      children: [{
        path: '/supplyIndex',
        component:supplyIndex,
        name: '供应商城首页',
      },{
        path: '/supplyGoodsList',
        component:supplyGoodsList,
        name: '商品列表',
        meta: { keepAlive: false },
      },
      {
        path: '/supplyAddGoods',
        component:supplyAddGoods,
        name: '添加商品',
        meta: { keepAlive: false },
      },
      {
        path: '/supplyGoodsDetail',
        component:supplyGoodsDetail,
        name: '商品详情',
        meta: { keepAlive: false },
      },
      {
        path: '/supplyAssortList',
        component:supplyAssortList,
        name: '商城分类',
        meta: { keepAlive: false },
      },
      {
        path: '/supplyCateList',
        component:supplyCateList,
        name: '店铺分类',
        meta: { keepAlive: false },
      },
      {
          path: '/supplyOrderList',
          component:supplyOrderList,
          name: '订单列表',
        },
        {
          path: '/supplyOrderDetail',
          component:supplyOrderDetail,
          name: '订单详情',
        },
        {
          path: '/supplyPointList',
          component:supplyPointList,
          name: '积分列表',
        },
        {
          path: '/supplyPointDetailList',
          component:supplyPointDetailList,
          name: '积分明细列表',
        },
        {
          path: '/supplyBannerList',
          component:supplyBannerList,
          name: '轮播图列表',
        }
      ]
    },
    {
      path: '/nzIndex',
      component: appMain,
      redirect: '/nzIndex',
      children: [{
        path: '/nzIndex',
        component:nzIndex,
        name: '农资商城首页',
      },{
        path: '/nzGoodsList',
        component:nzGoodsList,
        name: '商品列表',
        meta: { keepAlive: false },
      },
      {
        path: '/nzAddGoods',
        component:nzAddGoods,
        name: '添加商品',
        meta: { keepAlive: false },
      },
      {
        path: '/nzGoodsDetail',
        component:nzGoodsDetail,
        name: '商品详情',
        meta: { keepAlive: false },
      },
      {
        path: '/nzAssortList',
        component:nzAssortList,
        name: '商城分类',
        meta: { keepAlive: false },
      },
      {
        path: '/nzCateList',
        component:nzCateList,
        name: '店铺分类',
        meta: { keepAlive: false },
      },
      {
          path: '/nzOrderList',
          component:nzOrderList,
          name: '订单列表',
        },
        {
          path: '/nzOrderDetail',
          component:nzOrderDetail,
          name: '订单详情',
        },
        {
          path: '/nzBannerList',
          component:nzBannerList,
          name: '轮播图列表',
        },
        {
          path: '/nzWithDraw',
          component:nzWithDraw,
          name: '农行提现',
        },
        {
          path: '/nzNoteList',
          component:nzNoteList,
          name: '短信模板',
        },
        {
          path: '/nzPostList',
          component:nzPostList,
          name: '部门配置',
        },
        {
          path: '/nzStaffManage',
          component:nzStaffManage,
          name: '员工管理',
        },
        {
          path: '/nzAddStaff',
          component:nzAddStaff,
          name: '员工详情',
        }
      ]
    },
    {
      path: '/cooperateIndex',
      component: appMain,
      redirect: '/cooperateIndex',
      children: [{
        path: '/cooperateIndex',
        component:cooperateIndex,
        name: '合作商城首页',
      },{
        path: '/cooperateGoodsList',
        component:cooperateGoodsList,
        name: '商品列表',
        meta: { keepAlive: false },
      },
      {
        path: '/cooperateAddGoods',
        component:cooperateAddGoods,
        name: '添加商品',
        meta: { keepAlive: false },
      },
      {
        path: '/cooperateGoodsDetail',
        component:cooperateGoodsDetail,
        name: '商品详情',
        meta: { keepAlive: false },
      },
      {
        path: '/cooperateCateList',
        component:cooperateCateList,
        name: '店铺分类',
        meta: { keepAlive: false },
      },
      {
          path: '/cooperateOrderList',
          component:cooperateOrderList,
          name: '订单列表',
        },
        {
          path: '/cooperateOrderDetail',
          component:cooperateOrderDetail,
          name: '订单详情',
        }
      ]
    },
    {
      path: '/chat',
      component: appMain,
      redirect: '/msgList',
      children: [{
        path: '/msgList',
        component:msgList,
        name: '消息列表',
      },{
        path: '/contactList',
        component:contactList,
        name: '联系人',
      },{
        path: '/fileList',
        component:fileList,
        name: '文件',
      },{
        path: '/imgList',
        component:imgList,
        name: '图片',
      }
      ]
    },
    {
      path: '/taskList',
      component: appMain,
      redirect: '/taskList',
      children: [{
        path: '/taskList',
        component:taskList,
        name: '发布管理',
      },{
        path: '/claimList',
        component:claimList,
        name: '领取记录',
      },{
        path: '/helpList',
        component:helpList,
        name: '帮助中心',
      },{
        path: '/articleDetail',
        component:articleDetail,
        name: '文章详情',
      },{
        path: '/taskSetting',
        component:taskSetting,
        name: '任务配置',
      },{
        path: '/reportRecordList',
        component:reportRecordList,
        name: '举报列表',
      },{
        path: '/taskType',
        component:taskType,
        name: '任务类型',
      },{
        path: '/withDrawList',
        component:withDrawList,
        name: '提现列表',
      },{
        path: '/wxVirtualAccount',
        component:wxVirtualAccount,
        name: '微信运营充值',
      },{
        path: '/wxAccountBill',
        component:wxAccountBill,
        name: '微信账单明细',
      },{
        path: '/addTask',
        component:addTask,
        name: '添加任务',
      }]
    },{
      path: '/userListByWallet',
      component: appMain,
      redirect: '/userListByWallet',
      children: [ {
          path: '/userListByWallet',
          component: userListByWallet,
          name: '平台账户资金',
          meta: {
            keepAlive: false
          },
        },{
          path: '/billDetailByWallet',
          component: billDetailByWallet,
          name: '资金明细',
          meta: {
            keepAlive: false
          },
        }
      ]
    },{
      path: '/distributionList',
      component: appMain,
      redirect: '/distributionList',
      children: [ {
          path: '/distributionList',
          component: distributionList,
          name: '分销团队管理列表',
          meta: {
            keepAlive: false
          },
        },
        {
          path: '/teamPeopleList',
          component: teamPeopleList,
          name: '分销团队管理列表--团队成员列表',
        },
        {
          path: '/goodsAuditByDistr',
          component: goodsAuditByDistr,
          name: '分销团队管理列表--分销商品列表',
          meta: {
            keepAlive: false
          },
        },
        {
          path: '/goodsDetailByDistr',
          component: goodsDetailByDistr,
          name: '商品详情',
        }
      ]
    },
  ]
})