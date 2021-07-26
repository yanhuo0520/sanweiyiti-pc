<template>
    <div class="index" v-loading="loading">
		<!-- <img class="welcome-bg" src="../images/welcome-bg.png" alt=""> -->
		<div class="user-data-con">
			<div class="data-item">
				<div class="text">98755654</div>
				<div class="desc">股金金额 / 元</div>
				<img class="index-icon" src="../images/index-data-icon1.png" alt="">
			</div>
			<div class="data-item data-item-type2">
				<div class="text">344845646</div>
				<div class="desc">投放金金额 / 元</div>
				<img class="index-icon" src="../images/index-data-icon2.png" alt="">
			</div>
			<div class="data-item data-item-type3">
				<div class="text">4515415546</div>
				<div class="desc">自然人社员人数 / 人</div>
				<img class="index-icon" src="../images/index-data-icon3.png" alt="">
			</div>
			<div class="data-item data-item-type4">
				<div class="text">1415696893</div>
				<div class="desc">企业社员人数 / 人</div>
				<img class="index-icon" src="../images/index-data-icon4.png" alt="">
			</div>
		</div>
		<div class="pie-echart-con">
			<div class="pie-echart-item" ref="todayGujin" id="todayGujin"></div>
			<div class="pie-echart-item" ref="todayTouGujin" id="todayTouGujin" ></div>
			<div class="pie-echart-item" ref="todayConfrere" id="todayConfrere" ></div>
		</div>
		<div class="bar-echart-tit-con">
			<div class="tit-item">股金余额（合作社前5名）</div>
			<div class="tit-item">投放金余额（合作社前5名）</div>
		</div>
		<div class="bar-echart-con">
			<div class="bar-echart-item" ref="gujinTop" id="gujinTop"></div>
			<div class="bar-echart-item" ref="touGUjinTop" id="touGUjinTop" ></div>
		</div>

		<!-- 地图分布测试 -->
		<div class="map-echart">
			<div class="map-cont" style="width: 100%;height: 800px;border: 1px solid red;" ref="mapCont" id="mapCont"></div>
		</div>
    </div>
</template>
<script>
// 本地调取地图json数据
import echarts from 'echarts'
import linFenJson from "../../static/json/linfen_full.json"; //引入临汾json文件

export default {
  name: "index",
  data() {
    return {
      loading: false,
	  todayGujin: '',
    };
  },
  activated() {
    this.loading = true
    this.utils.checkToken(this,res =>{
      if(res && res.errno == 0) {
        this.loading = false
      } else {
        this.loading = false
      }
	})
    this.todayGujin = this.$echarts.init(document.getElementById('todayGujin'))
    this.todayTouGujin = this.$echarts.init(document.getElementById('todayTouGujin'))
	this.todayConfrere = this.$echarts.init(document.getElementById('todayConfrere'))
	this.gujinTop = this.$echarts.init(document.getElementById('gujinTop'))
    this.touGUjinTop = this.$echarts.init(document.getElementById('touGUjinTop'))
    this.getTodayGujinData()
    this.getTodayTouGujinData()
	this.getTodayConfrereData()
	this.getGujinTopData()
	this.getTouGujinTopData()
	
	// 地图分布
	this.mapCont = this.$echarts.init(document.getElementById('mapCont'))
	this.mapData()
  },
  methods: {
	//   地图分布数据
	mapData(){
		echarts.registerMap('临汾市', linFenJson, {})//引入地图文件
		let options = {
			title: {
				text: '临汾市数据'
			},
			type: '',
			tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>{c} (个)'
			  },
			visualMap: {
				min: 800,
				max: 50000,
				text: ['High', 'Low'],
				realtime: false,
				calculable: true,
				inRange: {
					color: ['lightskyblue', 'yellow', 'orangered']
				}
			},
			series: [
				{
					type: 'map',
					mapType: '临汾市', //地图名称
					itemStyle: {
						normal: {
							label: {show: true},
						// 	borderWidth: 1, // 省份的边框宽度
						// 	borderColor: '#eeeeee', // 省份的边框颜色
						// 	areaColor: 'red',
						},
					},
					emphasis:{ 
						label: {show: true},
						// itemStyle: {
						// 	areaColor: 'yellow', //鼠标经过颜色
						// }
					},
					data: [
						{name: '大宁县', value: '10'}
					]
				},
				
			]
		}
		this.mapCont.setOption(options)

		// this.$api.areaJson({areas_id: 141000}).then(res=>{
		// 	console.log(res)
		// })
	},
    getTodayGujinData() {
      let options = {
        title: {
            text: '今日股金',
            bottom: '0',
            left: '50%',
            backgroundColor: '#ABC0D7',
            color: '#fff',
            borderRadius: 1000,
            textStyle: {
              fontSize: 10,
              color: '#fff'
            },
            padding:[5,8,5,8],
            textAlign: 'center'
        },
        color: ['#3B6AF1','#EDB800'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     left: 10,
          //     data: ['存入', '支取']
          // },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['40%', '65%'],
                  label: {
                      formatter: '{b|{b}：}\n {c|{c}}  ',
                      backgroundColor: '#FFFBE3',
                      borderColor: '#EDB800',
                      borderWidth: 0.5,
                      borderRadius:[0, 0, 0, 10],
                      padding: [5,10,5,15],
                      shadowBlur:3,
                      shadowColor: '#FFFBE3',
                      rich: {
                          b: {
                            fontSize: 12,
                            lineHeight: 20,
							align:'labelLine',
                          },
                          c: {
                             fontSize: 14,
                             align:'labelLine',
                             color:'#444444',
                             fontWeight: 'bold'
                          }
                      }
                  },
                  data: [
                      {value: 155555, name: '存入'},
                      {value: 95555, name: '支取'},
                  ]
              }
          ]
	  };
	  this.$nextTick(() =>{
		this.todayGujin.setOption(options)
		window.addEventListener('resize', () => {
			this.todayGujin.resize(); 
		});
	  })
	 
    },
    getTodayTouGujinData() {
      let options = {
        title: {
            text: '今日投放金',
            bottom: '0',
            left: '50%',
            backgroundColor: '#ABC0D7',
            color: '#fff',
            borderRadius: 1000,
            textStyle: {
              fontSize: 10,
              color: '#fff'
            },
            padding:[5,8,5,8],
            textAlign: 'center'
        },
        color: ['#F1D93B','#F1993B','#6AD9C5'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     left: 10,
          //     data: ['占用费收回', '投放金发放', '本金收回']
          // },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['40%', '65%'],
                  label: {
                      formatter: '{b|{b}:}\n {c|{c}}  ',
                      backgroundColor: '#E2FFFA',
                      borderColor: '#6AD9C5',
                      borderWidth: 0.5,
                      borderRadius:[0, 0, 0, 10],
					  padding: [5,10,5,15],
                      shadowBlur:3,
                      shadowColor: '#FFFBE3',
                      rich: {
                          b: {
                            fontSize: 12,
                            lineHeight: 20,
							align:'labelLine',
                          },
                          c: {
                             fontSize: 14,
                             align:'labelLine',
                             color:'#444444',
                             fontWeight: 'bold'
                          }
                      }
                  },
                  data: [
					  {value: 35555, name: '投放金发放'},
					  {value: 35555, name: '本金收回'},
                      {value: 36893, name: '占用费收回'},

                  ]
              }
          ]
	  };
	  this.$nextTick(() =>{
		this.todayTouGujin.setOption(options)
		window.addEventListener('resize', () => {
			this.todayTouGujin.resize(); 
		});
	  })
	 
    },
    getTodayConfrereData() {
      let options = {
        title: {
            text: '今日社员入社人数',
            bottom: '0',
            left: '50%',
            backgroundColor: '#ABC0D7',
            color: '#fff',
            borderRadius: 1000,
            textStyle: {
              fontSize: 10,
              color: '#fff'
            },
            padding:[5,8,5,8],
            textAlign: 'center'
        },
        color: ['#527FE7','#AFE26E'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     left: 10,
          //     data: ['企业社员', '个人社员']
          // },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['40%', '65%'],
                  label: {
                      formatter: '{b|{b}：}\n {c|{c}}  ',
                      backgroundColor: '#E7EEFF',
                      borderColor: '#527FE7',
                      borderWidth: 0.5,
                      borderRadius:[0, 0, 0, 10],
					  padding: [5,10,5,15],
                      shadowBlur:3,
                      shadowColor: '#FFFBE3',
                      rich: {
                          b: {
                            fontSize: 12,
                            lineHeight: 20,
							align:'labelLine',
                          },
                          c: {
                             fontSize: 14,
                             align:'labelLine',
                             color:'#444444',
                             fontWeight: 'bold'
                          }
                      }
                  },
                  data: [
					  {value: 95555, name: '个人社员'},
                      {value: 155555, name: '企业社员'},
                  ]
              }
          ]
	  };
	  this.$nextTick(() =>{
		  	this.todayConfrere.setOption(options)
			window.addEventListener('resize', () => {
				this.todayConfrere.resize(); 
			});
	  })
	  
	},
	getGujinTopData() {
		let options =  {
			color: ['#D0DDEB'],
			tooltip: {
				trigger: 'axis',
			},
			 grid: {
				left: '0',
				right: '6%',
				bottom: '0',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: ['中和互联合作社', '攀枝花水合作社', '爱莎安娜合作社', '牧野之家合作社', '相信有你合作社'],
				'axisLabel':{'interval':0},
				splitLine: {show: false}
			},
			yAxis: [{
				type: 'value',
				name: '元',
				nameTextStyle: {
					color: '#8F9BA7',
				}
			},{
				type: 'value',
				name: '单位:元',
				nameTextStyle: {
					backgroundColor: "#E6F0F9",
					color: '#8F9BA7',
					padding: [5,10,5,10],
					borderRadius: 1000
				}
			}],
			series: [{
				data: [120, 300, 150, 80, 70],
				type: 'bar',
				label: {
					show: true,
					position: "outside",
					backgroundColor: '#3B6AF1',
					padding: [3,13,2,13],
					borderRadius:1000
				},
				// markPoint: {
				// 	data: [
				// 		{type: 'max', name: '最大值'},
				// 		{type: 'min', name: '最小值'}
				// 	],
				// 	symbol: 'pin',
				// 	symbolOffset: [0, -10],
				// 	itemStyle: {
				// 		color: "#3B6AF1"
				// 	}
				// },
				barWidth: '35%'
			}]
		}
		this.$nextTick(() =>{
			this.gujinTop.setOption(options)
			window.addEventListener('resize', () => {
				this.gujinTop.resize(); 
			});
		})
	  
	},
	getTouGujinTopData() {
		let options =  {
			color: ['#D1E7F6'],
			tooltip: {
				trigger: 'axis',
			},
			 grid: {
				left: '0',
				right: '6%',
				bottom: '0',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: ['中和互联合作社', '攀枝花水合作社', '爱莎安娜合作社', '牧野之家合作社', '相信有你合作社'],
				'axisLabel':{'interval':0},
				splitLine: {show: false}
			},
			yAxis: [{
				type: 'value',
				name: '元',
				nameTextStyle: {
					color: '#8F9BA7',
				}
			},{
				type: 'value',
				name: '单位:元',
				nameTextStyle: {
					backgroundColor: "#E6F0F9",
					color: '#8F9BA7',
					padding: [5,10,5,10],
					borderRadius: 1000
				}
			}],
			series: [{
				data: [120, 300, 150, 80, 70],
				type: 'bar',
				label: {
					show: true,
					position: "outside",
					backgroundColor: '#29A2F6',
					padding: [3,13,2,13],
					borderRadius:1000
				},
				// markPoint: {
				// 	data: [
				// 		{type: 'average', name: '最大值'},
				// 	],
				// 	symbol: 'pin',
				// 	symbolOffset: [0, -10],
				// 	itemStyle: {
				// 		color: "#3B6AF1"
				// 	}
				// },
				barWidth: '35%'
			}]
		}
		this.$nextTick(() =>{
			this.touGUjinTop.setOption(options)
			window.addEventListener('resize', () => {
				this.touGUjinTop.resize(); 
			});
		})
	  
	}
  }
};
</script>
<style lang="less">
.index {
  min-height: 75vh;
  padding: 20px;
  .user-data-con {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  margin-bottom: 20px;
	  .data-item {
		  width: 24%;
		  padding: 30px 20px;
		  background: #FAF7E9;
		  position: relative;
		  border-radius: 8px;
		  box-shadow: 0 0 6px #FAF7E9;
		  .text {
			  font-weight: bold;
			  font-size: 1.4rem;
			  color: #444444;
			  padding-bottom: 10px;
		  }
		  .desc {
			  color: #A79B8F;
			  font-size: 0.9rem;
			  padding-left: 5px;
			  line-height: 14px;
			  margin-left: 3px;
			  border-left: 4px solid #A79B8F
		  }
		  .index-icon {
			  position: absolute;
			  bottom: 0;
			  right: 0;
			  width: 30%;
		  }
	  }
	  .data-item-type2 {
		  background: #EBF8F7;
		  box-shadow: 0 0 6px #EBF8F7;
		  .desc {
			  color: #8FA7A3;
			  border-color:#8FA7A3
		  }
	  }
	  .data-item-type3 {
		  background: #F0F8FF;
		  box-shadow: 0 0 6px #F0F8FF;
		  .desc {
			  color: #8F9BA7;
			  border-color: #8F9BA7
		  }
	  }
	  .data-item-type4 {
		  background: #FBF2F0;
		  box-shadow: 0 0 6px #FBF2F0;
		  .desc {
			  color: #A78F92;
			  border-color: #A78F92
		  }
	  }

  }
  .pie-echart-con {
    padding: 20px;
    background: #F5FBFE;
    display: flex;
    align-items: center;
	justify-content: center;
	border-radius: 10px;
	box-shadow: 0 0 6px #F5FBFE;
	.pie-echart-item {
		width: 33%;
		height: 200px;
	}
  }
  .bar-echart-tit-con {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding-left: 30px;
	  padding-top: 30px;
	  .tit-item {
		  flex: 1;
		  border-left: 5px solid #3B6AF1;
		  padding-left: 15px;
		  color: #444444;
		  font-weight: bold;
	  }
  }
  .bar-echart-con {
	   padding: 20px;
	   padding-top: 0;
    display: flex;
    align-items: center;
	justify-content: center;
	.bar-echart-item {
		width: 49%;
		height: 400px;
	}
  }
	.welcome-bg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		height: 40vh;
	}
}

</style>