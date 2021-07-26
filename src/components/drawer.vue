<template>
  <div class="drawer">
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      :with-header="false" :size="level2List && level2List.length > 0 ? '40%' : '20%'" :before-close="closeDrawer" :modal="false">
	  	<div class="drawer-tit-con" style="width:90%">
			<div class="tit"></div>
			<div class="icon-con" @click="closeDrawer">
				<i class="el-icon-circle-close"></i>
			</div>
		</div>
      <div class="drawer-cooperative-con">
        <div class="level-con level1-con" :style="level2List && level2List.length > 0 ? 'width:45%' : 'width:90%'">
           <div class="search-con">
             <el-input v-model="parentName" placeholder="搜索父级合作社/联社" @input="bindInput(1)" clearable></el-input>
           </div>
           <template v-if="hasParentData">
             <div class="level-item-con">
              <div class="level-item" :class="{'active': item.isSelect,'hidden': parentName && !item.isSearch}"  v-for="(item,index) in cooperativeList" :key="index" @click="selectLevel1(item)">
                  <div class="level-icon" v-if="item.parent_id == item.coopera_id && item.count == 1 && item.isSelect">
                  <i class="el-icon-check"></i>
                  </div>
                <div class="level-text ">
                    <span  v-html="markedRedKeyword(item.coopera_name,parentName)"></span>
                    <span>{{item.count > 1 ? (' ('+item.count+') ') : ''}}</span>
                  </div>
                <div class="level-icon" v-if="item.count && item.count > 1">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
           </template>
           <template v-else>
             <div class="no-data-text">暂未搜索到数据,请换个关键词试试</div>
           </template>
        </div>
         <div class="level-con level2-con" v-if="level2List && level2List.length > 0">
           <div class="search-con">
             <el-input v-model="childName" placeholder="搜索子级合作社" @input="bindInput(2)" clearable></el-input>
           </div>
           <template v-if="hasChildData">
              <div class="level-item-con">
                <div class="level-item" :class="{'active': subItem.isSelect,'hidden': childName && !subItem.isSearch}"  v-for="(subItem,subIndex) in level2List" :key="subIndex"  @click="selectLevel2(subItem)">
                  <div class="level-icon" v-if="subItem.isSelect">
                    <i class="el-icon-check"></i>
                  </div>
                  <div class="level-text">
                    <span  v-html="markedRedKeyword(subItem.coopera_name,childName)"></span>
                  </div>
                </div>
              </div>
           </template>
            <template v-else>
             <div class="no-data-text">暂未搜索到数据,请换个关键词试试</div>
           </template>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "drawer",
  props: {
    cooperativeList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    level2List: {
      type: Array,
      default: () => {
        return [];
      }
    },
    drawer: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    // hasParentData: {
    //   type: Boolean,
    //   default: true
    // },
    // hasChildData: {
    //   type: Boolean,
    //   default: true
    // },
    // parentName: {
    //   type: String,
    //   default: ''
    // },
    // childName: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
       parentName: '',
      childName: '',
      hasParentData: true,
      hasChildData: true
    }
   
  },
  created(){
    eventWatch.$on('initData',() =>{
      this.parentName = ''
      this.childName = ''
      this.hasParentData = true
      this.hasChildData = true
    })
  },
  methods: {
     // 选中一级合作社
    selectLevel1(row) {
      eventWatch.$emit('selectLevel1',row)
    },
    // 选中二级合作社
    selectLevel2(row) {
       eventWatch.$emit('selectLevel2',row)
    },
    // 搜索事件
    bindInput(type) { //1父级搜索 2是子级搜索
      if(type == 1) {
        let hasParentData = false
        this.cooperativeList.forEach(item =>{
          if(item.coopera_name.indexOf(this.parentName) > -1) {
            this.$set(item, 'isSearch', true)
             hasParentData = true
          } else {
             this.$set(item, 'isSearch', false)
          }
        })
        this.hasParentData = hasParentData
      } else if(type == 2) {
        let hasChildData = false
        this.level2List.forEach(item =>{
          if(item.coopera_name.indexOf(this.childName) > -1) {
             this.$set(item, 'isSearch', true)
             hasChildData = true
          } else {
            this.$set(item, 'isSearch', false)
          }
        })
        this.hasChildData = hasChildData
      }
    },
    // 关闭弹窗
    closeDrawer() {
      eventWatch.$emit('closeDrawer', false)
    },
     // 搜索关键字标红
    markedRedKeyword(val, keyword) {
      const Reg = new RegExp(keyword, 'i');
      let res = '';
      if (val) {
          res = val.replace(Reg, `<span style="color: red">${keyword}</span>`);
        return res;
      }
    },
  }
};
</script>
<style  lang="less">
.el-drawer {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 10px 8px 18px #000;
}
.el-drawer.rtl {
  top: 5rem;
  bottom: 0.5rem;
  height: calc(100% - 5.5rem);
}
.drawer-tit-con {
	display: flex;
	align-items: center;
	justify-content: space-between;
  padding: 15px 0 5px 0;
  margin-left: 5%;
	.icon-con {
		font-size: 1.5rem;
		color: #666;
		cursor: pointer;
	}
}
.drawer-cooperative-con {
  display: flex;
  padding: 10px 0;
  justify-content: center;
  .level-con {
    display: flex;
    flex-direction: column;
    border: 1px solid  #e4e7ed;
    min-height: 200px;
    max-height: 700px;
    overflow-y: auto;
    padding: 8px 0;
    font-size: 0.9rem;
    // width: 80%;
    .search-con {
      padding:8px 15px;
      padding-top: 0;
      .el-input__inner {
        border-radius: 100px;
      }
    }
    .level-item-con {
      flex: 1;
      overflow-y: auto;
    }
    .no-data-text {
      font-size: 0.9rem;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
    }
    .level-item-con::-webkit-scrollbar {/*滚动条整体样式*/
        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
        border-radius: 100px;

    }
    .level-item-con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 100px;
        background: rgba(94, 92, 92, 0.2);
    }
    .level-item-con::-webkit-scrollbar-track {/*滚动条里面轨道*/
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        // border-radius: 0;
        // background: rgba(0,0,0,0.1);
    }
    .level-item {
      display: flex;
      align-items: center;
      color: #606266;
      padding: 10px 15px;
      cursor: pointer;
      .level-icon {
        .el-icon-check {
          margin-right: 10px;
        }
        .el-icon-arrow-right {
          margin-left: 10px;
        }
      }
      .level-text {
        display: flex;
        align-items: center;
      }
      .level-icon {
        display: flex;
        align-items: center;
      }
      
    }
    .active {
      font-weight: bold;
      color: #409eff;
      background: #f5f7fa;
    }
    .hidden {
      display: none;
    }
  }
  .level-con::-webkit-scrollbar {/*滚动条整体样式*/
      width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
      border-radius: 100px;

  }
  .level-con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 100px;
      background: rgba(94, 92, 92, 0.2);
  }
  .level-con::-webkit-scrollbar-track {/*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      // border-radius: 0;
      // background: rgba(0,0,0,0.1);
  }
  .level1-con {
    // width: 45%;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .level2-con {
    width: 45%;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-left: 0;
  }
}
</style>