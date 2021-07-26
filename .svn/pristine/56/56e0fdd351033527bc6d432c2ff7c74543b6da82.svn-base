<template>
    <div class="nav-menu">
        <div class="top-con">
            <div class="top-nav">
                <div class="logo-con" @click="toIndex()">
                    <div class="logo-text">三位一体</div>
                    <div class="desc">后台管理系统</div>
                </div>
                <div class="nav-con">
                    <template v-if="!isNzShop && adminType != 4">
                        <div class="nav-item" :class="{'nav-active-item' : item.active}" v-for="(item,index) in navArr" :key="index" @click="clickTopNavItem(item)">
                            <img :src="item.icon" alt=""> 
                            <span>{{item.name}}</span>
                        </div>
                        <div v-if="adminType == 3 || adminType == 0 || adminType == 1" class="nav-item" :class="{'nav-active-item' : isShowCooperate}"  @click="toCooperateIndex()">
                            <img src="../images/shop-icon.png" alt=""> 
                            <span>{{(adminType == 1 || adminType == 4) ? '供应商城管理' : '合作商城管理'}}</span>
                        </div>
                        <!-- <div class="nav-item" :class="{'nav-active-item' : isChat}"  @click="toChat()">
                            <img src="../images/chat/top-nav-chat-icon.png" alt=""> 
                            <span>对话</span>
                            <div class="dot" v-if="unreadPeople > 0"></div>
                        </div> -->
                    </template>
                    <!-- <template v-else>
                        <div class="nav-item" :class="{'nav-active-item': isNzIndex}" @click="toIndex">
                            <img src="../images/public/home-icon.png" alt=""> 
                            <span>首页</span>
                        </div>
                    </template> -->
                </div>
                <div class="manage-con">
                    <div class="manage-item account" @click="accountManage()">
                        <img src="../images/public/account-icon.png" alt="">
                        <span>账号管理</span>
                    </div>
                    <div class="manage-item account" @click="signOut()" v-if="isShowSign">
                        <img src="../images/public/logout-icon.png" alt="">
                        <span>签退</span>
                    </div>
                    <div class="manage-item logout" @click="logout()">
                        <img src="../images/public/logout-icon.png" alt="">
                        <span>退出系统</span>
                    </div>
                </div>
            </div>
            <div class="placeholder"></div>
        </div>
        <template v-if="isNzShop">
            <div class="left-routes-con">
                <div class="routes-con">
                    <div class="user-info">
                        <img class="header" :src="defaultAvatar" alt="">
                        <div class="change-role">
                            <!-- <img class="change-icon" src="../images/public/change-role-icon.png" alt=""> -->
                            <span class="desc">农资商城</span>
                        </div>
                    </div>
                    <div class="routers">
                        <el-scrollbar wrap-class="scrollbar-wrapper">
                            <div class="router-item"  @click.stop="toIndex()">
                                <div class="item-info" :class="{'select-index-color': isNzIndex}">
                                    <img class="item-icon" :src="isNzIndex ? shopIndexSelectIcon : shopIndexIcon" alt="">
                                    <span class="tit">首页</span>
                                    <!-- <img class="arrow-icon" :class="{'select-arrow': item.active}" v-if="item.children && item.children.length > 0" :src="item.active ? arrowVIcon : arrowHIcon" alt=""> -->
                                </div>
                            </div>
                            <div class="router-item" v-for="(item,index) in nzShopMenu" :key="index" @click.stop="clickMenuItemByNz(1,item)">
                                <div class="item-info" :class="{'select-border-color': item.active}" >
                                    <img class="item-icon" :src="item.active ? item.selectIcon : item.icon" alt="">
                                    <span class="tit" :class="{'select-tit': item.active}">{{item.title}}</span>
                                    <img class="arrow-icon" :class="{'select-arrow': item.active}" v-if="item.children && item.children.length > 0" :src="item.active ? arrowVIcon : arrowHIcon" alt="">
                                </div>
                                <el-collapse-transition>
                                    <div v-if="item.active">
                                        <div class="router-sub-item"  v-for="(subItem,subIndex) in item.children" :key="subIndex" @click.stop="clickMenuItemByNz(2,subItem,index)">
                                            <div class="subItem-info">
                                                <img class="item-icon" :src="subItem.active ? subItem.selectIcon : subItem.icon" alt="">
                                                <span class="tit" :class="{'select-tit': subItem.active}">{{subItem.title}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-collapse-transition>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="isSupplyShop">
            <div class="left-routes-con">
                <div class="routes-con">
                    <div class="user-info">
                        <img class="header" :src="defaultAvatar" alt="">
                        <div class="change-role">
                            <!-- <img class="change-icon" src="../images/public/change-role-icon.png" alt=""> -->
                            <span class="desc">供应商城管理</span>
                        </div>
                    </div>
                    <div class="routers">
                        <el-scrollbar wrap-class="scrollbar-wrapper">
                            <div class="router-item"  @click.stop="toSupplyShopIndex()">
                                <div class="item-info" :class="{'select-index-color': isSupplyIndex}">
                                    <img class="item-icon" :src="isSupplyIndex ? shopIndexSelectIcon : shopIndexIcon" alt="">
                                    <span class="tit">首页</span>
                                    <!-- <img class="arrow-icon" :class="{'select-arrow': item.active}" v-if="item.children && item.children.length > 0" :src="item.active ? arrowVIcon : arrowHIcon" alt=""> -->
                                </div>
                            </div>
                            <div class="router-item" v-for="(item,index) in supplyShopMenu" :key="index" @click.stop="clickMenuItemBySupply(1,item)">
                                <div class="item-info" :class="{'select-border-color': item.active}" >
                                    <img class="item-icon" :src="item.active ? item.selectIcon : item.icon" alt="">
                                    <span class="tit" :class="{'select-tit': item.active}">{{item.title}}</span>
                                    <img class="arrow-icon" :class="{'select-arrow': item.active}" v-if="item.children && item.children.length > 0" :src="item.active ? arrowVIcon : arrowHIcon" alt="">
                                </div>
                                <el-collapse-transition>
                                    <div v-if="item.active">
                                        <div class="router-sub-item"  v-for="(subItem,subIndex) in item.children" :key="subIndex" @click.stop="clickMenuItemBySupply(2,subItem,index)">
                                            <div class="subItem-info">
                                                <img class="item-icon" :src="subItem.active ? subItem.selectIcon : subItem.icon" alt="">
                                                <span class="tit" :class="{'select-tit': subItem.active}">{{subItem.title}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-collapse-transition>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="!isNzShop && !isSupplyShop">
            <div class="left-routes-con">
                <div class="routes-con">
                    <div class="user-info">
                        <el-tooltip content="在线" placement="top" effect="light">
                            <div class="line-dot"></div>
                        </el-tooltip>
                        <template v-if="isChat">
                             <el-tooltip class="item" effect="light" :content="socketTypeText" placement="right-start">
                                <div :class="socketType == 'success' ? 'socket-type success' : (socketType == 'openLoading' ? 'socket-type warn' : 'socket-type close')"  ></div>
                            </el-tooltip>
                        </template>
                       
                        <div class="header">
                            <img class="img" :src="isChat ? chatDefaultAvatar : defaultAvatar" alt="">
                        </div>
                        <div class="change-role" @click="changeRole()">
                            <template v-if="roleArr && roleArr.length > 1">
                                <span class="desc">切换身份</span>
                            </template>
                            <template v-else>
                                <template v-if="workerJobArr && workerJobArr.length > 1">
                                    <span class="desc">切换身份</span>
                                </template>
                                <template v-if="workerJobArr && workerJobArr.length == 1">
                                    <template v-if="workerJobArr[0].job && workerJobArr[0].job.length > 1">
                                        <span class="desc">切换身份</span>
                                    </template>
                                    <template v-else>
                                        <span class="desc">{{userInfo ? userInfo.post_name : ''}}</span>
                                    </template>
                                </template>
                            </template>
                            <!-- <template v-if="wokerJob.length > 0">
                                <template v-if="wokerJob.length == 1 && wokerJob[0].job.length == 1">
                                    <span class="desc">{{userInfo.post_name}}</span>
                                </template>
                                <template v-else>
                                    <img class="change-icon" src="../images/public/change-role-icon.png" alt="">
                                    <span class="desc">切换身份</span>
                                </template>
                            </template> -->
                        </div>
                    </div>
                    <div class="routers">
                        <el-scrollbar wrap-class="scrollbar-wrapper">
                            <template v-if="!isChat && !isShowCooperate" >
                                <div class="router-item" v-for="(item,index) in routes" :key="index" @click.stop="clickMenuItem(1,item)">
                                    <div class="item-info" :class="{'select-border-color': item.active}" @mouseover.stop="mouseoverMenu($event,1,item,index)" @mouseout.stop="mouseoutMenu($event,1,item,index)">
                                        <img class="item-icon" :src="item.active ? item.selectIcon : item.icon" alt="">
                                        <span class="tit" :class="{'select-tit': item.active}">{{item.title}}</span>
                                        <img class="arrow-icon" :class="{'select-arrow': item.active}" v-if="item.children && item.children.length > 0" :src="item.active ? arrowVIcon : arrowHIcon" alt="">
                                    </div>
                                    <el-collapse-transition>
                                        <div v-if="item.active">
                                            <div class="router-sub-item"  v-for="(subItem,subIndex) in item.children" :key="subIndex" @click.stop="clickMenuItem(2,subItem,index)">
                                                <div class="subItem-info" @mouseover.stop="mouseoverMenu($event,2,subItem,subIndex,index)" @mouseout.stop="mouseoutMenu($event,2,subItem,subIndex,index)">
                                                    <img class="item-icon" :src="subItem.active ? subItem.selectIcon : subItem.icon" alt="">
                                                    <span class="tit" :class="{'select-tit': subItem.active}">{{subItem.title}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </template>
                            <template v-if="isChat">
                                <div style="height:20px"></div>
                                <div class="chat-item" v-for="(item,index) in charArr" :key="index" @click.stop="clickChatItem(item)">
                                    <div class="item-info">
                                        <img class="item-icon" :src="item.active ? item.selectIcon : item.icon" alt="">
                                        <span class="tit" :class="{'select-tit': item.active}">{{item.title}}</span>
                                        <div class="num" v-if="item.num && item.num > 0">{{item.num}}</div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="isShowCooperate">
                                <div class="router-item"  @click.stop="toCooperateIndex()">
                                    <div class="item-info" :class="{'select-index-color': isCooperIndex}">
                                        <img class="item-icon" :src="isCooperIndex ? shopIndexSelectIcon : shopIndexIcon" alt="">
                                        <span class="tit">首页</span>
                                        <!-- <img class="arrow-icon" :class="{'select-arrow': item.active}" v-if="item.children && item.children.length > 0" :src="item.active ? arrowVIcon : arrowHIcon" alt=""> -->
                                    </div>
                                </div>
                                <div class="router-item" v-for="(item,index) in cooperateShopMenu" :key="index" @click.stop="clickMenuItemByCooperate(1,item)">
                                    <div class="item-info" :class="{'select-border-color': item.active}" >
                                        <img class="item-icon" :src="item.active ? item.selectIcon : item.icon" alt="">
                                        <span class="tit" :class="{'select-tit': item.active}">{{item.title}}</span>
                                        <img class="arrow-icon" :class="{'select-arrow': item.active}" v-if="item.children && item.children.length > 0" :src="item.active ? arrowVIcon : arrowHIcon" alt="">
                                    </div>
                                    <el-collapse-transition>
                                        <div v-if="item.active">
                                            <div class="router-sub-item"  v-for="(subItem,subIndex) in item.children" :key="subIndex" @click.stop="clickMenuItemByCooperate(2,subItem,index)">
                                                <div class="subItem-info">
                                                    <img class="item-icon" :src="subItem.active ? subItem.selectIcon : subItem.icon" alt="">
                                                    <span class="tit" :class="{'select-tit': subItem.active}">{{subItem.title}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </template>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </template>
     </div>
</template>
<script>
import { Loading } from 'element-ui';
export default {
  name: "bottom",
  props: [],
  data() {
    return {
      routes:[], // 左侧导航栏
      navArr:[], // 顶部快捷栏
      arrowHIcon: require('../images/public/arrow-h-icon.png'),
      arrowVIcon: require('../images/public/arrow-v-icon.png'),
      defaultAvatar: require('../images/public/default-avatar.png'),
      chatDefaultAvatar: require('../images/public/default-avatar.png'),

      isShowCooperate: false,//是否为点击了合作商城
      isCooperIndex: false,// 否为点击了合作商城首页
      shopIndexIcon: require('../images/shop-index.png'),
      shopIndexSelectIcon: require('../images/shop-index-select.png'),
      cooperateShopMenu: [],
    //   cooperateShopMenu: [{
    //       title: '商品管理',
    //       icon: require('../images/supply/goods-manage-icon.png'),
    //       selectIcon: require('../images/supply/goods-manage-select-icon.png'),
    //       active: false,
    //       push: '/cooperateGoodsList',
    //       children: [{
    //         title: '商品列表',
    //         push: '/cooperateGoodsList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       },{
    //         title: '店铺分类',
    //         push: '/cooperateCateList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }]
    //   },{
    //       title: '销售管理',
    //       icon: require('../images/supply/sale-manage-icon.png'),
    //       selectIcon: require('../images/supply/sale-manage-select-icon.png'),
    //       active: false,
    //       push: '/cooperateOrderList',
    //       children: [{
    //         title: '订单列表',
    //         push: '/cooperateOrderList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }]
    //   }], //合作商城导航

      isSupplyShop: false, //是否为供应商城权限
      isSupplyIndex: false, // 是否点击了供应商城首页
      supplyShopMenu: [],
    //   supplyShopMenu: [{
    //       title: '商品管理',
    //       icon: require('../images/supply/goods-manage-icon.png'),
    //       selectIcon: require('../images/supply/goods-manage-select-icon.png'),
    //       active: false,
    //       push: '/supplyGoodsList',
    //       children: [{
    //         title: '商品列表',
    //         push: '/supplyGoodsList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }
    //     //   ,{
    //     //     title: '商城分类',
    //     //     push: '/supplyAssortList',
    //     //     icon: require('../images/public/base-info-icon2.png'),
    //     //     selectIcon: require('../images/public/base-info-select-icon1.png'),
    //     //     active: false,
    //     //   }
    //       ,{
    //         title: '店铺分类',
    //         push: '/supplyCateList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }]
    //   },{
    //       title: '销售管理',
    //       icon: require('../images/supply/sale-manage-icon.png'),
    //       selectIcon: require('../images/supply/sale-manage-select-icon.png'),
    //       active: false,
    //       push: '/supplyOrderList',
    //       children: [{
    //         title: '订单列表',
    //         push: '/supplyOrderList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }
    //     //   ,{
    //     //     title: '积分列表',
    //     //     push: '/supplyPointList',
    //     //     icon: require('../images/public/base-info-icon2.png'),
    //     //     selectIcon: require('../images/public/base-info-select-icon1.png'),
    //     //     active: false,
    //     //   }
    //       ]
    //   },{
    //       title: '系统设置',
    //       icon: require('../images/public/setting-icon.png'),
    //       selectIcon: require('../images/public/setting-select-icon.png'),
    //       active: false,
    //       push: '/supplyBannerList',
    //       children: [{
    //         title: '轮播图设置',
    //         push: '/supplyBannerList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }]
    //   }], //供应商城导航

      isNzShop: false, //是否为农资商城权限
      isNzIndex: false, // 是否点击了农资城首页
      nzShopMenu:[],
    //   nzShopMenu: [{
    //       title: '商品管理',
    //       icon: require('../images/supply/goods-manage-icon.png'),
    //       selectIcon: require('../images/supply/goods-manage-select-icon.png'),
    //       active: false,
    //       push: '/nzGoodsList',
    //       children: [{
    //         title: '商品列表',
    //         push: '/nzGoodsList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }
    //     //   ,{
    //     //     title: '商城分类',
    //     //     push: '/supplyAssortList',
    //     //     icon: require('../images/public/base-info-icon2.png'),
    //     //     selectIcon: require('../images/public/base-info-select-icon1.png'),
    //     //     active: false,
    //     //   }
    //       ,{
    //         title: '店铺分类',
    //         push: '/nzCateList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }]
    //   },{
    //       title: '销售管理',
    //       icon: require('../images/supply/sale-manage-icon.png'),
    //       selectIcon: require('../images/supply/sale-manage-select-icon.png'),
    //       active: false,
    //       push: '/nzOrderList',
    //       children: [{
    //         title: '订单列表',
    //         push: '/nzOrderList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }]
    //   },{
    //       title: '系统设置',
    //       icon: require('../images/public/setting-icon.png'),
    //       selectIcon: require('../images/public/setting-select-icon.png'),
    //       active: false,
    //       push: '/nzBannerList',
    //       children: [{
    //         title: '轮播图设置',
    //         push: '/nzBannerList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       },{
    //         title: '部门配置',
    //         push: '/nzPostList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       },{
    //         title: '员工管理',
    //         push: '/nzStaffManage',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       },{
    //         title: '短信模板',
    //         push: '/nzNoteList',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       },{
    //         title: '农行提现',
    //         push: '/nzWithDraw',
    //         icon: require('../images/public/base-info-icon2.png'),
    //         selectIcon: require('../images/public/base-info-select-icon1.png'),
    //         active: false,
    //       }]
    //   }], //农资商城导航

      isChat: false, // 是否点击了对话
      charArr: [{
          title: '消息',
          icon: require('../images/chat/nav-msg-icon.png'),
          selectIcon: require('../images/chat/nav-msg-select-icon.png'),
          active: false,
          num: 0,
          push: '/msgList'
      },{
          title: '联系人',
          icon: require('../images/chat/nav-people-icon.png'),
          selectIcon: require('../images/chat/nav-people-select-icon.png'),
          active: false,
          num: 0,
          push: '/contactList'
      },{
          title: '文件',
          icon: require('../images/chat/nav-file-icon.png'),
          selectIcon: require('../images/chat/nav-file-select-icon.png'),
          active: false,
          num: 0,
          push: '/fileList'
      },{
          title: '图片',
          icon: require('../images/chat/nav-img-icon.png'),
          selectIcon: require('../images/chat/nav-img-select-icon.png'),
          active: false,
          num: 0,
          push: '/imgList'
      }], // 左侧消息栏

      fullScreenLoading: '', //全局loading

      isAdmin: false, // 是否为管理员
      adminType: '', // 管理员类型
      wokerJob: [], // 合作社与身份二维数组
      userInfo:{}, //用户登录信息
      jobArr: [],
      roleArr: [], //角色数组
      workerJobArr: [], // 所有合作社与身份数组

      unreadPeople: 0, // 未读消息的人数
      socketType: '',
      socketTypeText: '',

      msgLoading: false, 
      msgErr: false,
      msgSuccess: false,
      isShowSign: false
    };
  },
  watch:{
    $route(to,from){ // 监听路由变化 注: 目前只准备用来监听聊天相关
    //   console.log(from.path);//从哪来
    //   console.log(to.path);//到哪去
      eventWatch.$off('closeDrawer')
      eventWatch.$off('selectLevel1')
      eventWatch.$off('selectLevel2')
    }, 
  },
created() {
    // window.addEventListener('storage', function (k) { // 监听本地存储变量 把本地存储变量模拟为全局变量
        // console.log(k);
        // console.log(v);
    // });
    // this.utils.initChatWebSocket()
    eventWatch.$on('chatLogin', data =>{
      this.chatDefaultAvatar = data.headerimg
    })
    // 监听新增好友数量
    eventWatch.$on('newFriendNum', num =>{
        this.charArr[1].num = num
    })
    // 监听消息列表数量
    eventWatch.$on('msgNum', num =>{
        this.unreadPeople = num
    })
    // 监听webScocket连接状态
    eventWatch.$on('socket',data =>{
        if(data.type == 'openLoading') {
            this.socketTypeText = '正在连接'
        } else if(data.type == 'success') {
            this.socketTypeText = '连接成功'
        } else if(data.type == 'err') {
            this.socketTypeText = '连接错误'
        } else if(data.type == 'close') {
            this.socketTypeText = '连接关闭'
        } 
        this.socketType = data.type
    })
    // 监听首次点击对话初始化数据状态
    eventWatch.$on('msgRequestType', data =>{
        this.msgLoading = data.isLoading
        this.msgErr = data.isErr
        this.msgSuccess = data.isSuccess
    })

    // 监听 从联系人页面中 点击好友或者群发送消息
    eventWatch.$on('sendMsgByContactList', data =>{
        this.clickChatItem(this.charArr[0])
    })
    // 监听 是否有签到签退功能
    eventWatch.$on('isSign', data =>{
      this.isShowSign = data
    })
},
  mounted() {
    // 测试数据-模拟登录存储权限router
    // localStorage.setItem('routes',JSON.stringify(this.routes))
    let adminType = localStorage.getItem('is_admin')
    if(adminType && Number(adminType) >= 1) {
        this.isAdmin = true
        this.adminType = adminType
        if(this.adminType == 5) {
            this.isNzShop = true
            this.isNzShop = true
            // return
        }  else if(this.adminType == 4) {
            this.isSupplyShop = true
            this.isSupplyShop = true
            // return
        }else {
            // this.isDuCount()
        }
    }
    this.wokerJob = localStorage.getItem('worker_job') ?  JSON.parse(localStorage.getItem('worker_job')) : []
    this.workerJobArr = localStorage.getItem('workerJobArr') ? JSON.parse(localStorage.getItem('workerJobArr')) : []
    this.userInfo = localStorage.getItem('userInfo') ?  JSON.parse(localStorage.getItem('userInfo')) : {}
    this.roleArr = localStorage.getItem('roleArr') ? JSON.parse(localStorage.getItem('roleArr')) : []
    this.getRoutes() 
   },
  methods: {
    // 点击logo返回首页
    toIndex() {
        let adminType = localStorage.getItem('is_admin')
        if(adminType && adminType == 5) {
            if(this.$route.path == '/nzIndex') return
            this.nzShopMenu.forEach(item =>{
                item.active = false
                if(item.children && item.children.length > 0) {
                    item.children.forEach(subItem =>{
                        subItem.active = false
                    })
                }
            })
            this.isNzIndex = true
            this.$router.push('/nzIndex')
        } else if(adminType && adminType == 4) {
            if(this.$route.path == '/supplyIndex') return
            this.supplyShopMenu.forEach(item =>{
                item.active = false
                if(item.children && item.children.length > 0) {
                    item.children.forEach(subItem =>{
                        subItem.active = false
                    })
                }
            })
            this.isSupplyIndex = true
            this.$router.push('/supplyIndex')
        } else {
             if(this.$route.path == '/index') return
             this.isSupplyShop = false
            this.routes.forEach(routeItem =>{
                routeItem.active = false
            })
            this.isShowCooperate = false
            this.isChat = false
            this.navArr[0].active = true
            this.$router.push('/index')
            
        }
        
    },
    // 点击供应商城首页
    toSupplyShopIndex() {
        if(this.$route.path == '/supplyIndex') return
        this.supplyShopMenu.forEach(item =>{
            item.active = false
            if(item.children && item.children.length > 0) {
                item.children.forEach(subItem =>{
                    subItem.active = false
                })
            }
        })
        this.isSupplyIndex = true
        this.$router.push('/supplyIndex')
    },
    // 点击合作社商城首页
    toCooperateIndex() {
        let adminType = JSON.parse(localStorage.getItem('is_admin'))
        if(adminType == 1) {
            if(this.$route.path == '/supplyIndex') return
            this.supplyShopMenu.forEach(item =>{
                item.active = false
                if(item.children && item.children.length > 0) {
                    item.children.forEach(subItem =>{
                        subItem.active = false
                    })
                }
            })
            this.initRoutesActive()
            this.isShowCooperate = false
            this.isCooperIndex = false
            this.isChat = false
            this.isSupplyShop = true
            this.isSupplyIndex = true
            this.$router.push('/supplyIndex')
        } else {
            if(this.$route.path == '/supplyIndex') return
            this.cooperateShopMenu.forEach(item =>{
                item.active = false
                if(item.children && item.children.length > 0) {
                    item.children.forEach(subItem =>{
                        subItem.active = false
                    })
                }
            })
            this.initRoutesActive()
            this.isShowCooperate = true
            this.isCooperIndex = true
            this.isChat = false
            this.$router.push('/cooperateIndex')
        }
    },
    // 获取 未读消息的人数
    isDuCount() {
      let that = this;
      that.ajax("isDuCount",{},"",res => {
        if(res.errno == 0) {
          that.unreadPeople = res.data.count
          if(that.unreadPeople > 0) {
              this.$notify({
                title: '未读消息',
                message: '您有'+res.data.count+'位好友/群消息未读,点击对话查看',
                position: 'bottom-right',
                duration: 3000,
                onClick: function(){
                    that.toChat()
                }
            });
          }
        } 
        },err => {}
      );
    },
    // 账号管理 
    accountManage() {
        this.routes.forEach(routeItem =>{
            routeItem.active = false
        })
        this.$router.push('/personal')
    },
    // 签退
    signOut () {
        this.$confirm('请确定今日工作已经结束, 是否继续签退?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.signApi()
        }).catch(() => {});
    },
    signApi () {
       this.ajax('signAdd', {
			type: 2
		}, '签到失败', res => {
			if (res.errno == 0) {
                this.$message.success('签退成功!')
                localStorage.clear()
                this.$router.push('/login')
				
			}
		}) 
    },
    // 退出系统
    logout() {
        this.$confirm('此操作将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            localStorage.clear()
            this.$router.push('/login')
        }).catch(() => {});
    },
    // 切换身份
    changeRole() {
        // let wokerJob = localStorage.getItem('worker_job') ?  JSON.parse(localStorage.getItem('worker_job')) : ''
        if(this.workerJobArr.length > 0) {
            if(this.workerJobArr.length == 1) {
                if(this.workerJobArr[0].job.length == 1) return
            }
            this.$router.push({
                path: '/changeRole',
                query: {
                    source: 'navMenu'
                }
            })
        } else {
            this.$message.error('登录已过期,请重新登录')
            let account = localStorage.getItem('account')
            localStorage.clear()
            localStorage.setItem('account',account)
            this.$router.push('/login')
        }        
    },
    // 鼠标经过menu路由事件 主要用于改变img的src
    mouseoverMenu(e,level,item,index,partentIndex) {// level: 1-一级menu 2- 二级menu
        // if(level == 1) {
        //     document.querySelectorAll('.item-info')[index].children[0].src = item.selectIcon
        // } else if(level == 2) {
        //     document.querySelectorAll('.subItem-info')[index].children[0].src = item.selectIcon
        // }
    },
   // 鼠标离开menu路由事件 主要用于还原img的src 
    mouseoutMenu(e,level,item,index,partentIndex) { // level: 1-一级menu 2- 二级menu  
        // if(level == 1) {
        //     if(!item.active) {
        //         document.querySelectorAll('.item-info')[index].children[0].src = item.icon
        //     }
        // } else if(level == 2) {
        //     if(!item.active) {
        //         document.querySelectorAll('.subItem-info')[index].children[0].src = item.icon
        //     }
        // }
    },
    // 置空menu的active状态
    initRoutesActive() { 
        let routes = this.routes
        let navArr = this.navArr
        routes.forEach(item =>{
            if(!item.children || item.children.length == 0) {
                item.active = false
            }
            if(item.children && item.children.length > 0) {
                item.children.forEach(subItem =>{
                    subItem.active = false
                })
            }
        })
        navArr.forEach(item =>{
            item.active = false
        })
    },
    // 获取当前权限所有路由
    getRoutes() { 
        let that = this;
        if(that.adminType == 5 || that.adminType == 4) {
            let shopData = localStorage.getItem('shopRoutes') ? that.utils.handleShopNav(JSON.parse(localStorage.getItem('shopRoutes'))) : '';
            if(shopData) {
                if(that.adminType == 5) {
                    that.nzShopMenu = shopData
                } else {
                    that.supplyShopMenu = shopData
                }
            } else {
                that.fullScreenLoading = that.$loading({ text: '正在重新获取商城权限...', background: 'rgba(0, 0, 0, 0.7)' })
                if(that.adminType == 5) {
                    that.requestShopRoutes(2)
                } else {
                    that.requestShopRoutes(4)
                }
            }
        } else {
            let data = localStorage.getItem('routes') ? that.utils.handleRoutesData(JSON.parse(localStorage.getItem('routes'))) : '';
            if(data) {
                that.routes = data[0]
                that.navArr = data[1]
            }else {
                that.fullScreenLoading = that.$loading({ text: '正在重新获取权限...', background:'rgba(0, 0, 0, 0.7)' });
                that.requestRoutes()  
            }
            if(that.adminType == 0 || that.adminType == 1 || that.adminType == 3) {
                let shopData = localStorage.getItem('shopRoutes') ? that.utils.handleShopNav(JSON.parse(localStorage.getItem('shopRoutes'))) : '';
                if(shopData) {
                    if(that.adminType == 1) {
                        that.supplyShopMenu = shopData
                    } else {
                        that.cooperateShopMenu = shopData
                    }
                } else {
                    that.fullScreenLoading = that.$loading({ text: '正在重新获取商城权限...', background: 'rgba(0, 0, 0, 0.7)' })
                    if(that.adminType == 1) {
                        that.requestShopRoutes(4)
                    } else {
                        that.requestShopRoutes(3)
                    }
                }
            } 

        }
    },
    // 请求当前权限所有路由接口
    requestRoutes() {
        let that = this;
        let userInfo = JSON.parse( localStorage.getItem('userInfo'))
        if(userInfo && userInfo.post_id) {
             that.ajax('get_privilege',{
                post_id:userInfo.post_id
            },'获取权限列表失败',res =>{
                if(that.fullScreenLoading) {
                    that.fullScreenLoading.close()  
                }
                if(res.errno == 0) {
                    that.routes = res.data
                    localStorage.setItem('routes',JSON.stringify(that.routes))
                    that.routes = that.utils.handleRoutesData(res.data)[0]
                    that.navArr = that.utils.handleRoutesData(res.data)[1]
                    that.$router.push('/index')
                } else {
                    that.$message.error(res.data.errmsg ? res.data.errmsg : '获取权限接口服务异常,请刷新重试');
                }
            }, err =>{
                 if(that.fullScreenLoading) {
                    that.fullScreenLoading.close()  
                }
            })
        } else {
            if(that.fullScreenLoading) {
                that.fullScreenLoading.close()
            }
            that.$router.push('/login');
        }
       
    },
    // 请求当前商城导航栏
    requestShopRoutes(type) {
        let that = this;
        let userInfo = JSON.parse( localStorage.getItem('userInfo'))
        if(userInfo && userInfo.post_id) {
             that.ajax('getShopNav',{
                type:type,
            },'',res =>{
                if(that.fullScreenLoading) {
                    that.fullScreenLoading.close()  
                }
                if(res.errno == 0) {
                    that.shopRoutes = res.data
                    localStorage.setItem('shopRoutes',JSON.stringify(that.shopRoutes))
                    if(type == 2) {
                        that.nzShopMenu = that.utils.handleRoutesData(res.data)[0]
                        that.$router.push('/nzIndex')
                    } else if(type == 3) { 
                        that.cooperateShopMenu = that.utils.handleRoutesData(res.data)[0]
                        that.$router.push('/index')
                    } else if(type == 4) {
                        that.supplyShopMenu = that.utils.handleRoutesData(res.data)[0]
                        if(that.adminType == 1) {
                            that.$router.push('/index')
                        } else {
                            that.$router.push('/supplyIndex')
                        }
                    }
                    
                } else {
                    // that.$message.error(res.errmsg ? res.errmsg : '获取商城权限接口服务异常,请刷新重试');
                }
            }, err =>{
                 if(that.fullScreenLoading) {
                    that.fullScreenLoading.close()  
                }
            })
        } else {
            if(that.fullScreenLoading) {
                that.fullScreenLoading.close()
            }
            that.$router.push('/login');
        }
       
    },
    // 点击对话
    toChat() {
        if(this.$route.path == 'msgList') return
        this.initRoutesActive()
        this.routes.forEach(routeItem =>{
            routeItem.active = false
        })
        this.isChat = true
        this.charArr.forEach(item =>{
            item.active = false
        })
        this.charArr[0].active = true
        this.isShowCooperate = false
        this.isCooperIndex = false
        this.isSupplyShop = false
        this.$router.push({ path: '/msgList' })
    },
    // 点击左侧导航栏
    clickChatItem(item) {
        if(this.$route.path == item.push) return // 点击已打开页面不跳转
        if(this.msgLoading) {
            this.$message.error('正在加载数据请稍后点击')
            return
        }
        if(this.msgErr) {
            this.$message.error('数据初始化失败,请点击重新加载')
            return
        }
        this.charArr.forEach(item =>{
            item.active = false
        })
        this.$set(item,'active',true)
        this.$router.push({ path: item.push ? item.push : '/noPermission' })
    },
    // 点击上侧导航栏
    clickTopNavItem(item) {
        this.isChat = false
        this.isShowCooperate = false
        this.isCooperIndex = false
        this.isSupplyShop = false
        this.isSupplyIndex = false
        if(this.$route.path == item.push) return
        this.initRoutesActive()
        if(item.push == '/index') {
            this.routes.forEach(routeItem =>{
                routeItem.active = false
            })
            item.active = true
            this.$router.push({ path: item.push ? item.push : '/noPermission' })
            return
        }
        let routes = JSON.parse(JSON.stringify(this.routes))
        let isHasRoute = false
        routes.forEach(routeItem =>{
            if(routeItem.children && routeItem.children.length > 0) {
                routeItem.children.forEach(routeChildItem =>{
                    if(routeChildItem.push == item.push) {
                        routeItem.active = true
                        routeChildItem.active = true
                        isHasRoute = true
                    }
                })
            } else {
                if(item.push == routeItem.push) {
                    routeItem.active = true
                    isHasRoute = true
                }
            }
        })
        item.active = true
        this.$router.push({
             path: isHasRoute ? item.push : '/noPermission',
             query: {
                 pathName: item.name
             }
        })
        this.routes = routes
    },
    // 判断该路由存不存在router里面
    hasRoute(path, routeList) {
        !routeList && (routeList = this.$router.options.routes)
        for (let i = 0; i < routeList.length; i++) {
          if (routeList[i].path === path) {
            return true
          }
          if (routeList[i].children) {
            let flag = this.hasRoute(path, routeList[i].children)
            if(flag){
              return flag
            }
          }
        }
        return false
    },
    //点击左侧跳转路由
    clickMenuItem(type,item,parentIndex){ //type: 1-一级menu 2-二级menu  item:当前router配置
        let that = this;
        let navArr = this.navArr
        let isHasRoute = this.hasRoute(item.push)
        if (isHasRoute) {
            if(type == 1) {
                if(item.children.length > 0) {
                    setTimeout(() =>{
                        item.active = !item.active
                    },100)
                } else {
                    if(that.$route.path == item.push) return // 点击已打开页面不跳转
                    that.initRoutesActive()
                    that.$set(item,'active',!item.active)
                    that.$router.push({ path: item.push ? item.push : '/noPermission' })
                }
            } else if(type == 2) {
                if(that.$route.path == item.push) return // 点击已打开页面不跳转
                that.initRoutesActive()
                that.$set(item,'active',!item.active)
                that.$router.push({ path: item.push ? item.push : '/noPermission' })
            }
            navArr.forEach(navItem =>{
                if(item.push == navItem.push) {
                    navItem.active = true
                } 
            })
        } else {
            that.$router.push({ path: '/noPermission' })
        }
        
    },
    // 初始化农资商城左侧状态
    initRoutesActiveByNz() {
        let routes = this.nzShopMenu
        routes.forEach(item =>{
            if(!item.children || item.children.length == 0) {
                item.active = false
            }
            if(item.children && item.children.length > 0) {
                item.children.forEach(subItem =>{
                    subItem.active = false
                })
            }
        })
    },
     // 初始化供应商城左侧状态
    initRoutesActiveBySupply() {
        let routes = this.supplyShopMenu
        routes.forEach(item =>{
            if(!item.children || item.children.length == 0) {
                item.active = false
            }
            if(item.children && item.children.length > 0) {
                item.children.forEach(subItem =>{
                    subItem.active = false
                })
            }
        })
    },
    // 供应商城点击左侧跳转路由
    clickMenuItemBySupply(type,item,parentIndex) { //type: 1-一级menu 2-二级menu  item:当前router配置
        let that = this;
        that.isSupplyIndex = false
        if(type == 1) {
            if(item.children.length > 0) {
                setTimeout(() =>{
                    item.active = !item.active
                },100)
            } else {
                if(that.$route.path == item.push) return // 点击已打开页面不跳转
                that.initRoutesActiveBySupply()
                that.$set(item,'active',!item.active)
                that.$router.push({ path: item.push ? item.push : '/noPermission' })
            }
        }else if(type == 2) {
            if(that.$route.path == item.push) return // 点击已打开页面不跳转
            that.initRoutesActiveBySupply()
            that.$set(item,'active',!item.active)
            that.$router.push({ path: item.push ? item.push : '/noPermission' })
        }
    },
    //农资商城点击左侧跳转路由
    clickMenuItemByNz(type,item,parentIndex){ //type: 1-一级menu 2-二级menu  item:当前router配置
        let that = this;
        that.isNzIndex = false
        if(type == 1) {
            if(item.children.length > 0) {
                setTimeout(() =>{
                    item.active = !item.active
                },100)
            } else {
                if(that.$route.path == item.push) return // 点击已打开页面不跳转
                that.initRoutesActiveByNz()
                that.$set(item,'active',!item.active)
                that.$router.push({ path: item.push })
            }
        }else if(type == 2) {
            if(that.$route.path == item.push) return // 点击已打开页面不跳转
            that.initRoutesActiveByNz()
            that.$set(item,'active',!item.active)
            that.$router.push({ path: item.push })
        }
    },
    // 初始化合作商城状态
    initRoutesActiveByCooperate() {
        let routes = this.cooperateShopMenu
        routes.forEach(item =>{
            if(!item.children || item.children.length == 0) {
                item.active = false
            }
            if(item.children && item.children.length > 0) {
                item.children.forEach(subItem =>{
                    subItem.active = false
                })
            }
        })
        this.isCooperIndex = false  

    },
    // 合作上层点击左侧做跳转
    clickMenuItemByCooperate(type,item,parentIndex){ //type: 1-一级menu 2-二级menu  item:当前router配置
        let that = this;
        // that.isShowCooperate = false
        that.isChat = false
        if(type == 1) {
            if(item.children.length > 0) {
                setTimeout(() =>{
                    item.active = !item.active
                },100)
            } else {
                if(that.$route.path == item.push) return // 点击已打开页面不跳转
                that.initRoutesActiveByCooperate()
                that.$set(item,'active',!item.active)
                that.$router.push({ path: item.push })
            }
        }else if(type == 2) {
            if(that.$route.path == item.push) return // 点击已打开页面不跳转
            that.initRoutesActiveByCooperate()
            that.$set(item,'active',!item.active)
            that.$router.push({ path: item.push })
        }
    },
  }
};
</script>
<style lang="less">
.nav-menu {
    .top-con {
        display: flex;
        align-items: center;
        flex-direction: column;
        background:url('../images/public/nav-bg.png');
        background-size: 100% 100%;
        height: 14rem;
        .top-nav {
            width: 100%;
            height: 7rem;
            padding: 0 5rem;
            display: flex;
            align-items: center; 
            .logo-con {
                cursor: pointer;
                .logo-text {
                    color: #fff;
                    font-size: 2rem;
                    font-weight: bold;
                    border-bottom: 0.06rem solid #EBF0FE;
                    padding-bottom: 0.2rem;
                }
                .desc {
                    font-size: 1.33rem;
                    color: #ACC2FF;
                }
            }
            .nav-con {
                display: flex;
                align-items: center;
                padding-left: 8rem;
                .nav-item {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    padding: 0 3rem;
                    color: #B8D4FF;
                    position: relative;
                    img {
                        width: 2rem;
                        height: 2rem;
                    }
                    span {
                        font-size: 1rem;
                        padding-top: 0.2rem;
                        position: relative;
                    }
                    .dot {
                        width: 10px;
                        height: 10px;
                        background: #F61060;
                        border-radius: 50%;
                        position: absolute;
                        top: calc(50% - 2rem);
                        left: calc(50% + 0.8rem);
                    }
                }
                .nav-item:hover {
                    cursor: pointer;
                    color: #fff;
                    span:after {
                        content: '';
                        height: 4px;
                        width: 60%;
                        background: #fff;
                        position: absolute;
                        bottom: -6px;
                        left: 50%;
                        transform: translateX(-50%);
                        border-radius: 100px;
                    }
                }
                .nav-active-item {
                    cursor: pointer;
                    color: #fff;
                    span:after {
                        content: '';
                        height: 4px;
                        width: 60%;
                        background: #fff;
                        position: absolute;
                        bottom: -6px;
                        left: 50%;
                        transform: translateX(-50%);
                        border-radius: 100px;
                    }
                }

            }
            .manage-con {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .manage-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    padding: 0.5rem;
                    border: 1px solid #7FABEE;
                    color: #B8D4FF;
                    margin-left: 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    img {
                        width: 1rem;
                        height: 1rem;
                        margin-right: 0.5rem;
                    }

                }
                .manage-item:last-child{
                    background: rgba(255, 255, 255, 0.2);
                    border-color: #f9f9f9;
                    color: #f9f9f9;
                }
            }
        }
        .placeholder {
            width: 100%;
            height: 7rem;
        }
    }
    .left-routes-con {
        padding-left: 5rem;
        height: calc(100vh - 12rem);
        margin-top: -7rem;
        background: transparent;
        .routes-con {
            width: 13rem;
            background: #F0F8FF;
            border-radius: 6rem 0 0 0;
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-top: 3rem;
            .user-info {
                display: flex;
                align-items: center;
                flex-direction: column;
                position: relative;
                .line-dot {
                    width: 10px;
                    height: 10px;
                    background: #07c160;
                    border-radius: 50%;
                    position: absolute;
                    top: 4.5rem;
                    right: 0;
                    cursor: pointer;
                }
                .socket-type {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    overflow: hidden;
                    position: absolute;
                    top: 5rem;
                    right: 0;
                    transform: translate(-50%,-50%);
                    cursor: pointer;
                }
                .success {
                    background: #5daf34;
                }
                .warn {
                    background: #e6a23c;
                }
                .close {
                    background: #f56c6c;
                }
                .header {
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                    .img {
                        width: 100%;
                    }
                }
                .change-role {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.2rem 0.4rem;
                    border: 1px solid #3B6AF1;
                    background: #E3F2FF;
                    border-radius: 4px;
                    margin-top: 0.5rem;
                    margin-bottom: 0.8rem;
                    cursor: pointer;
                    .change-icon {
                        width: 0.8rem;
                        height: 0.8rem;
                    }
                    .desc {
                        color: #3B6AF1;
                        font-size: 0.75rem;
                        padding-left: 0.2rem;
                    }
                }
            }
            .routers {
                width: 100%;
                padding-left: 2rem;
                height: calc(100% - 9.5rem);
                overflow: hidden;
                .router-item {
                    width: 100%;
                    cursor: pointer;
                    .item-info {
                        display: flex;
                        align-items: center;
                        border-bottom: 2px solid #D0DDEB;
                        margin-right: 2rem;
                        margin-bottom: 0.5rem;
                        margin-top: 0.5rem;
                        padding-bottom: 0.2rem;
                        cursor: pointer;
                        .tit {
                            color: #8F9BA7;
                            font-size: 0.9rem;
                            padding: 0.2rem;
                            flex: 1;
                        }
                        .select-tit {
                             color: #444444;
                        }
                        .item-icon {
                            width: 1rem;
                            height: 1rem;
                            margin-right: 0.2rem;
                        }
                        .arrow-icon {
                            width: 1rem;
                        }
                        .select-arrow {
                           width: 0.6rem 
                        }
                        
                    }
                    .select-border-color {
                        border-color: #3B6AF1;
                    }
                    .select-index-color {
                        border-color: #3B6AF1;
                        .tit {
                            color: #3B6AF1;
                        }
                    }
                    .item-info:hover {
                        border-color: #3B6AF1;
                        .tit {
                            color: #444444;
                        }
                    }
                    .router-sub-item {
                        padding-top: 0.5rem;
                        cursor: pointer;
                        .subItem-info {
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            .tit {
                                color: #444;
                                font-size: 0.9rem;
                                padding: 0.2rem;
                                flex: 1;
                            }
                            .select-tit {
                                color: #3B6AF1;
                            }
                            .item-icon {
                                width: 0.9rem;
                                height: 0.9rem;
                                margin-right: 0.2rem;
                            }
                        }
                        .subItem-info:hover {
                            .tit {
                                color: #3B6AF1;
                            }
                        }
                    }
                   
                }
                .chat-item {
                     width: 100%;
                    cursor: pointer;
                    .item-info {
                        position: relative;
                        display: flex;
                        align-items: center;
                        margin-right: 2rem;
                        margin-bottom: 0.5rem;
                        margin-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        cursor: pointer;
                        .tit {
                            color: #8F9BA7;
                            font-size: 0.9rem;
                            padding: 0.2rem;
                            flex: 1;
                        }
                        .select-tit {
                             color: #444444;
                        }
                        .item-icon {
                            width: 1.2rem;
                            height: 1.2rem;
                            margin-right: 0.2rem;
                        }
                        .arrow-icon {
                            width: 1rem;
                        }
                        .select-arrow {
                           width: 0.6rem 
                        }
                        .num {
                            position: absolute;
                            top: 50%;
                            right: 0;
                            background: #F61060;
                            border-radius: 1000px;
                            color: #fff;
                            font-size: 10px;
                            padding: 2px 4px;
                             border: 1px solid #F61060;
                            min-width: 22px;
                            height: 22px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        
                    }
                    .select-border-color {
                        border-color: #3B6AF1;
                    }
                    .item-info:hover {
                        .tit {
                            color: #444444;
                        }
                    }
                }

            }
        }
    }
    
}
</style>