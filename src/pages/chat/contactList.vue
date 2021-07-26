<template>
    <div class="contact-list">
        <div class="contact-tit">通讯录</div>
        <div class="contact-con">
           <div class="nav-con">
                <el-scrollbar wrap-class="scrollbar-wrapper" id="navScroll" >
                    <div class="nav-item" @click="selectItem(1)">
                        <div class="avatar">
                            <img :src="myFriendImg" alt="">
                        </div>
                        <div class="tit-con">
                            <div class="tit">我的好友</div>
                        </div>
                    </div>
                    <div class="nav-item" @click="selectItem(2)">
                        <div class="avatar">
                            <img :src="newFriendImg" alt="">
                        </div>
                        <div class="tit-con">
                            <div class="tit">新的好友</div>
                        </div>
                        <div class="num" v-if="addFriendNum > 0">{{addFriendNum}}</div>
                    </div> 
                    <div class="nav-item" @click="selectItem(3)">
                        <div class="avatar">
                            <img :src="myGroupImg" alt="">
                        </div>
                        <div class="tit-con">
                            <div class="tit">我的群组</div>
                        </div>
                    </div>
                </el-scrollbar>
           </div>
           <div class="right-con" >
                <div class="right-tit" v-if="selectType">
                    <div class="avatar-con">
                        <img class="avatar" :src="selectType == 1 ? myFriendImg : (selectType == 2 ? newFriendImg : myGroupImg)" alt="">
                        <span class="desc">{{selectType == 1 ? '我的好友' : (selectType == 2 ? '新的好友' : '我的群组')}}</span>
                    </div>
                    <i class="el-icon-plus" @click="addFriend" v-if="selectType == 1"></i>
                </div> 
                <div class="users-con" >
                    <div class="scroll-box" v-show="selectType == 1">
                        <el-scrollbar wrap-class="scrollbar-wrapper" id="userScroll" >
                            <div class="user-item" v-for="(item,index) in myFriendList" :key="index" @click="searchUserByUserId(item)">
                                <div class="avatar-con">
                                    <img class="avatar" :src="item.user_headimg2 ? item.user_headimg2 :defaultAvatar" alt="">
                                </div>
                                <div class="user-info">
                                    <div class="info-con">
                                        <div class="name-con">
                                            <div class="name">{{item.user_name2}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                        <div class="no-data-con" v-if="!myFriendList || myFriendList.length == 0">
                            <img class="no-info" src="../../images/chat/no-file.png" alt="">
                            <span class="no-text">暂无信息</span>
                        </div>
                    </div>
                    <div class="scroll-box" v-show="selectType == 2">
                        <el-scrollbar wrap-class="scrollbar-wrapper" id="newFriendScroll" >
                            <div class="user-item" v-for="(item,index) in myFriendAddList" :key="'n_'+index">
                                <div class="avatar-con">
                                    <img class="avatar" :src="item.user_headimg2 ? item.user_headimg2 :defaultAvatar" alt="">
                                </div>
                                <div class="user-info">
                                    <div class="info-con">
                                        <div class="name-con">
                                            <div class="name">{{item.name}}</div>
                                        </div>
                                        <div class="desc" v-if="item.desc">{{item.desc}}</div>
                                    </div>
                                    <div class="btn-con">
                                        <template v-if="item.type == 1">
                                            <el-button size="mini" type="primary" @click="handleAddFriend(2,item,index)">同意</el-button>
                                            <el-button size="mini" type="danger" @click="handleAddFriend(3,item,index)">拒绝</el-button>
                                        </template>
                                        <template v-if="item.type == 2">
                                            <el-button size="mini" type="success" >已同意</el-button>
                                        </template>
                                         <template v-if="item.type == 3">
                                            <el-button size="mini" type="danger" >已拒绝</el-button>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                        <div class="no-data-con" v-if="!myFriendAddList || myFriendAddList.length == 0">
                            <img class="no-info" src="../../images/chat/no-file.png" alt="">
                            <span class="no-text">暂无信息</span>
                        </div>
                    </div>
                    <div class="scroll-box" v-show="selectType == 3">
                        <el-scrollbar wrap-class="scrollbar-wrapper" id="oldFriendScroll" >
                            <div class="user-item" v-for="(item,index) in myGroupList" :key="'g_'+index" @click.stop="getGroupDetail(item)">
                                <div class="avatar-con">
                                    <img class="avatar" :src="item.cluster_headimg ? item.cluster_headimg : myGroupImg" alt="">
                                </div>
                                <div class="user-info">
                                    <div class="info-con">
                                        <div class="name-con">
                                            <div class="name">{{item.cluster_name}}</div>
                                            <!-- <div class="tag">全员</div> -->
                                        </div>
                                        <div class="desc">{{item.user_lists.length}}人</div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                        <div class="no-data-con" v-if="!myGroupList || myGroupList.length == 0">
                            <img class="no-info" src="../../images/chat/no-file.png" alt="">
                            <span class="no-text">暂无信息</span>
                        </div>
                    </div>
                    <div class="no-data-con" v-if="!selectType">
                        <img class="no-info" src="../../images/chat/no-file.png" alt="">
                        <span class="no-text">暂无信息</span>
                    </div>
                </div>
           </div>
        </div>
        <!-- <div class="no-data-con">
            <img class="no-info" src="../../images/chat/no-file.png" alt="">
            <span class="no-text">暂无信息</span>
        </div> -->
        <div class="user-info-con" @click.stop v-if="searchFriendLoading || (userInfo && userInfo.id)">
            <template v-if="searchFriendLoading">
                <div class="search-loading">正在加载...</div>
            </template>
            <template v-else>
                <div class="user-con">
                    <div class="avatar-con">
                        <img class="avatar" :src="defaultAvatar" alt="">
                    </div>
                    <div class="info-con">
                        <div class="name">{{userInfo.name}}</div>
                        <div class="phone">手机号:{{userInfo.phone}}</div>
                    </div>
                </div>
                <div class="cooperation-con">
                    <el-scrollbar wrap-class="scrollbar-wrapper" id="cooperationScroll" >
                        <div class="total-cooperation">一共参与了<span style="color:#409EFF">{{userInfo.coopera_list.length}}</span>个合作社</div>
                        <div class="cooperation-item" v-for="(item,index) in userInfo.coopera_list" :key="index">
                            <div class="num">{{index + 1}}</div>
                            <div class="name">{{item.coopera_name}}</div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="btn-con">
                    <template v-if="userInfo.is_add == 4">
                        <el-button type="primary" class="btn" size="medium" @click.stop="confirmAdd()">添加好友</el-button>
                    </template>
                    <template v-if="userInfo.is_add == 3">
                        <el-button type="danger" class="btn" size="medium" @click.stop="againAdd(3)">已拒绝,再次申请</el-button>
                    </template>
                    <template v-if="userInfo.is_add == 2">
                        <el-button type="primary" class="btn" size="medium">已同意</el-button>
                    </template>
                    <template v-if="userInfo.is_add == 1">
                        <el-button type="primary" class="btn" size="medium" @click.stop="againAdd(1)">已申请</el-button>
                    </template>
                </div>
            </template>
        </div>

        <div class="user-detail-con" @click.stop v-if="userDetailLoading || (userDetail && userDetail.id)">
            <template v-if="userDetailLoading">
                <div class="user-detail-loading">正在加载...</div>
            </template>
            <template v-else>
                <div class="user-con">
                    <div class="avatar-con">
                        <img class="avatar" :src="defaultAvatar" alt="">
                    </div>
                    <div class="info-con">
                        <div class="name">{{userDetail.name}}</div>
                        <div class="phone">手机号:{{userDetail.phone}}</div>
                    </div>
                </div>
                <div class="cooperation-con">
                    <el-scrollbar wrap-class="scrollbar-wrapper" id="cooperationScroll" >
                        <div class="total-cooperation">一共参与了<span style="color:#409EFF">{{userDetail.coopera_list.length}}</span>个合作社</div>
                        <div class="cooperation-item" v-for="(item,index) in userDetail.coopera_list" :key="index">
                            <div class="num">{{index + 1}}</div>
                            <div class="name">{{item.coopera_name}}</div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="btn-con">
                    <el-button type="primary" class="btn" size="medium" @click.stop="toChat(1)">发消息</el-button>
                </div>
            </template>
        </div>

        <div class="group-con"  @click.stop v-if="groupDetail && groupDetail.cluster_id">
            <div class="tit-con">
                <div class="tit">{{groupDetail.cluster_name}}</div>
                <div class="num">（{{groupDetail.user_lists.length}}）</div>
            </div>
            <div class="user-list clearfix">
                <el-scrollbar wrap-class="scrollbar-wrapper" id="userListScroll" >
                    <div class="user-item clearfix" v-for="(item,index) in groupDetail.user_lists" :key="index">
                        <div class="avatar-con">
                            <img class="avatar" :src="item.user_headimgs ? item.user_headimgs : defaultAvatar" alt="">
                        </div>
                        <div class="desc">{{item.user_names}}</div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="btn-con">
                <el-button type="primary" class="btn" size="medium" @click.stop="toChat(2)">发消息</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "contactList",
  data() {
    return {
        userId: null, //当前登良路账号的用户id
        selectType: null, //1-我的好友 2-新的好友 3-群组
        defaultAvatar: require('../../images/chat/chat-default.png'), // 默认头像
        myFriendImg: require('../../images/chat/chat-default.png'), //我的好友图标
        newFriendImg: require('../../images/chat/new-friend.png'), //新的好友图标
        myGroupImg: require('../../images/chat/my-group.png'), //我的群组图标
        myFriendList: [],
        myFriendAddList: [],
        addFriendNum: 0,
        myGroupList: [],
        userInfo: null,
        searchFriendLoading: false,

        userDetail: null,
        userDetailLoading: false,
        groupDetail: null
    };
  },
  activated() {
    this.myFriendAddList = localStorage.getItem('firendAddList') ? JSON.parse(localStorage.getItem('firendAddList')) : []
    let addNum = 0
    this.myFriendAddList.forEach(item =>{
        if(item.type == 1) {
            addNum+=1
        }
    })
    this.addFriendNum = addNum
    this.myFriendList = localStorage.getItem('friendList') ? JSON.parse(localStorage.getItem('friendList')) : []
    this.myGroupList = localStorage.getItem('clusterList') ? JSON.parse(localStorage.getItem('clusterList')) : []

   
  },
  mounted() {
    let that = this;
    let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
    if(userInfo) {
        this.userId = userInfo.id
    }
    document.addEventListener('click', function (e) {
        that.userInfo = null
        that.userDetail = null
        that.groupDetail = null
        that.$forceUpdate()
    })
    eventWatch.$on('agreeFriend', data =>{
        this.myFriendList = localStorage.getItem('myFriendList') ? JSON.parse(localStorage.getItem('myFriendList')) : []
        localStorage.setItem('myFriendList', JSON.stringify(this.myFriendList))
    })
   
    eventWatch.$on('friendAdd', data =>{
        this.myFriendAddList = localStorage.getItem('firendAddList') ? JSON.parse(localStorage.getItem('firendAddList')) : []
        this.addFriendNum = this.myFriendAddList.length
        let addNum = 0
        this.myFriendAddList.forEach(item =>{
            if(item.type == 1) {
                addNum+=1
            }
        })
        this.addFriendNum = addNum
        localStorage.setItem('firendAddList', JSON.stringify(this.myFriendAddList))
    })
  },	
  methods: {
      selectItem(type) {
          this.selectType = type
      },
      addFriend() {
          if(this.searchFriendLoading) {
              this.$message({
                message: '正在获取好友信息,请稍后添加',
                type: 'warning'
              })
              return
          }
          this.$prompt('', '添加好友', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^1[3456789]\d{9}$/,
            inputErrorMessage: '请输入正确的手机号',
            inputPlaceholder: '请输入手机号',
            center: true,
            type: 'warning',
            closeOnClickModal: false
            }).then(({ value }) => {
                this.searchUserByPhone(value)
            }).catch(() => {});
      },
      // 根据手机号查询用户添加
      searchUserByPhone(phone) {
        let that = this;
        that.searchFriendLoading = true
        that.ajax("searcUser",{
            phone: phone
        },"查找好友失败",res => {
            that.searchFriendLoading = false
            if(res.errno == 0) {
                let data = res.data.user
                if(data.user_id == that.userId) {
                    that.$message({
                        message: '不可添加自己为好友',
                        type: 'warning'
                    })
                    return
                }
                that.userInfo = {
                    name: data.name,
                    phone: data.phone,
                    user_headimg: data.user_headimg,
                    coopera_list: data.coopera_list,
                    id: data.user_id,
                    is_add: data.is_add
                }
            } 
            },err => {
                that.searchFriendLoading = false
            }
        );
      },
      // 根据userId 查询用户信息
      searchUserByUserId(row) {
        let that = this;
        that.userDetailLoading = true
        that.ajax("searcUserId",{
            user_id: row.user_id2
        },"获取用户信息失败",res => {
            that.userDetailLoading = false
            if(res.errno == 0) {
                let data = res.data.user
                that.userDetail = {
                    name: data.name,
                    phone: data.phone,
                    user_headimg: data.user_headimg,
                    coopera_list: data.coopera_list,
                    id: data.user_id,
                    is_add: data.is_add
                }
            } 
            },err => {
                that.userDetailLoading = false
            }
        );
      },
      // 获取群信息
      getGroupDetail(row) {
        this.groupDetail = row
        this.$forceUpdate()
      },
      // 确认添加好友
      confirmAdd(userInfo) {
        let that = this;
        that.confirmLoading = true
        // console.log(1)
        that.ajax("firendsAdd",{
            id: userInfo ? userInfo.id : that.userInfo.id
        },"添加好友失败",res => {
            that.confirmLoading = false
            if(res.errno == 0) {
                let tmpObj = {
                    msg_type: 'friendAdd',friend_add_id: res.data.firend_add_id
                }
                sendMsg(tmpObj)
                that.$message.success('成功申请添加好友,请等待同意')
                that.userInfo = null
            } 
            },err => {
                that.confirmLoading = false
            }
        );
      },
      // 再次申请
      againAdd(type) { //type 1-已申请 3已拒绝
        let userInfo =  this.userInfo
        this.$confirm('是否再次申请添加好友?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
            this.confirmAdd(userInfo)
        }).catch(() => {});
      },
      // 同意/拒绝好友
      handleAddFriend(type,row,index) { // type 2-同意 3-拒绝
        let that = this;
        that.handleAddLoading = true
        that.ajax("firendType",{
            friend_add_id: row.friend_add_id,
            type: type
        },(type == 2 ? '同意' : '拒绝') + '好友失败',res => {
            that.handleAddLoading = false
            if(res.errno == 0) {
                row.type = type
                that.addFriendNum = that.addFriendNum - 1
                eventWatch.$emit('newFriendNum', that.addFriendNum)
                if(type == 2) {
                    let tmpObj = {
                        msg_type: 'agreeFriend', friend_add_id: row.friend_add_id
                    }
                    sendMsg(tmpObj)
                    // let tmpObj = {
                    //     chat_record_id: 1,
                    //     friend_id: 1,
                    //     send_type: 1,
                    //     top_type: 1,
                    //     user_headimg2: row.user_headimg,
                    //     user_id: that.userId,
                    //     user_id2: row.user_id,
                    //     user_name2: row.name
                    // }
                    that.$message.success('同意成功')
                } else {
                    that.$message.success('拒绝成功')
                }
            } 
            },err => {
                that.handleAddLoading = false
            }
        );
      },
      // 发送消息
      toChat(type) { // 1好友 2群
        let id = ''
        if(type == 1) {
            id = this.userDetail.id
            this.userDetail = null
        } else if(type == 2) {
            id = this.groupDetail.cluster_id
            this.groupDetail = null
        }
        eventWatch.$emit('sendMsgByContactList', {type: type,id: id})
      },
  },
};
</script>
<style lang="less">
.contact-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // font-family:"STHeiti";
    overflow: hidden;
    .user-info-con {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        transform: translate(-50%,-50%);
        box-shadow: 0 0  10px #ccc;
        border-radius: 8px;
        background: #eee;
        overflow: hidden;
        .search-loading {
            padding: 20px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .user-con {
          display: flex;
          align-items: center;  
          padding: 20px;
          background: #fff;
          .avatar-con {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              overflow: hidden;
              .avatar {
                  width: 100%;
                  height: 100%;
              }
          }
          .info-con {
              display: flex;
              flex-direction: column;
              padding-left: 15px;
              .name {
                  font-size: 1.1rem;
                  font-weight: bold;
                  padding-bottom: 8px;
              } 
              .phone {
                  color: #888;
              }           
          }
        }
        .cooperation-con {
            height: 160px;
            background: rgb(65, 33, 33);
            .total-cooperation {
                padding: 15px 20px;
                background: #fff;
                color: #333;
            }
            .cooperation-item {
                display: flex;
                align-items: center;
                background: #fff;
                height: 50px;
                padding: 0 20px;
                .num {
                    border: 1px solid #999;
                    min-width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999;
                    font-size: 10px;
                    padding: 2px 4px;
                    margin-right: 10px;
                }
                .name {
                    font-weight: bold;  
                }
            }

        }
        
        .btn-con {
            background: #fff;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .btn {
                width: 80%;
                cursor: pointer;
            }
        }
    }
    .user-detail-con {
       position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        transform: translate(-50%,-50%);
        box-shadow: 0 0  10px #ccc;
        border-radius: 8px;
        background: #eee;
        overflow: hidden;
        .user-detail-loading {
            padding: 20px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .user-con {
          display: flex;
          align-items: center;  
          padding: 20px;
          background: #fff;
          .avatar-con {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              overflow: hidden;
              .avatar {
                  width: 100%;
                  height: 100%;
              }
          }
          .info-con {
              display: flex;
              flex-direction: column;
              padding-left: 15px;
              .name {
                  font-size: 1.1rem;
                  font-weight: bold;
                  padding-bottom: 8px;
              } 
              .phone {
                  color: #888;
              }           
          }
        }
        .cooperation-con {
            height: 160px;
            background: #fff;
            .total-cooperation {
                padding: 15px 20px;
                background: #fff;
                color: #333;
            }
            .cooperation-item {
                display: flex;
                align-items: center;
                background: #fff;
                height: 50px;
                padding: 0 20px;
                .num {
                    border: 1px solid #999;
                    min-width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999;
                    margin-right: 10px;
                }
                .name {
                    font-weight: bold;  
                }
            }

        }
        
        .btn-con {
            background: #fff;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .btn {
                width: 80%;
                cursor: pointer;
            }
        } 
    }
    .group-con {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        transform: translate(-50%,-50%);
        box-shadow: 0 0  10px #ccc;
        border-radius: 8px;
        background: #eee;
        overflow: hidden;
        .tit-con {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            padding: 10px 0;
            .tit {
                font-weight: bold;
            }
            .num {
                
            }
        }
        .user-list {
            background: #fff;
            height: 240px;
            .user-item {
                width: 60px;
                float: left;
                margin-left: 30px;
                margin-bottom: 20px;
                .avatar-con {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .desc {
                    color: #999;
                    font-size: 0.9rem;
                    text-align: center;
                    padding-top: 6px;
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
        .btn-con {
            background: #fff;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .btn {
                width: 80%;
                cursor: pointer;
            }
        } 

    }
    .contact-tit {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        border-bottom: 2px solid #ebebeb;
        font-weight: bold;
    }
    .contact-con {
        width: 100%;
        height: calc(100% - 50px);
        display: flex;
        .nav-con {
            width: 20%;
            height: 100%;
            background: #fff;
            border-right: 1px solid #e9e9ea;
            overflow: hidden;
            .nav-item {
                position: relative;
                padding: 10px 10px;
                border-bottom: 2px solid #fbfbfc;
                display: flex;
                align-items: center;
                cursor: pointer;
                .avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .tit-con {
                    padding-left: 12px;
                    .tit {
                        font-weight: bold;
                        font-size: 0.95rem;
                    }
                }
                .num {
                    position: absolute;
                    left: 0;
                    top: 0;
                    min-width: 20px;
                    height: 20px;
                    color: #fff;
                    background: red;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                }
            }
            .nav-item:hover {
                background: #eeeeee!important;
            }
        }
        .right-con {
            width: 80%;
            position: relative;
            height: 100%;
            .right-tit {
                display: flex;
                padding: 0 30px;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e9e9ea;
                height: 65px;
                line-height: 65px;
                .avatar-con {
                    display: flex;
                    align-items: center;
                    .avatar {
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                    }
                    .desc {
                        font-weight: bold;
                        padding-left: 10px;
                    }
                }
                .el-icon-plus {
                    font-size: 20px;
                    font-weight: bold;
                    color: #8b9095;
                    cursor: pointer;
                }
            }
            .users-con {
                width: 100%;
                height: calc(100% - 65px);
                padding-top: 10px;
                padding-right: 10px;
                .scroll-box {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .user-item {
                    display: flex;
                    align-items: center;
                    padding: 0 30px;
                    height: 60px;
                    line-height: 60px;
                    cursor: pointer;
                    .avatar-con {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        .avatar {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .user-info {
                        flex: 1;
                        padding-left: 10px;
                        display: flex;
                        line-height: normal;
                        justify-content: space-between;
                        align-items: center;
                        .info-con {
                            .name-con {
                                display: flex;
                                align-items: center;
                                 .name {
                                    font-size: 0.95rem
                                 }
                                 .tag {
                                     margin-left: 10px;
                                     padding: 2px 6px;
                                     border: 1px solid orangered;
                                     border-radius: 1000px;
                                     color: orangered;
                                     font-size: 0.7rem;
                                 }
                            }
                            .desc {
                                padding-top: 5px;
                                font-size: 0.85rem;
                                color: #999;
                            }

                        }
                        // .btn-con {}
                    }
                }
                .user-item:hover {
                    background: #eeeeee;
                }
            }
             .no-data-con {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 30%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .no-info {
                    width: 100%;
                }
                .no-text {
                    color: #999;
                }
            }
            

        }
    }
   
   
}


</style>