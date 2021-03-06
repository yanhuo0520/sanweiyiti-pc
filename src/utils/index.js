
export default {
	//初始化聊天websocket
	initChatWebSocket() {
		// const webSocketUrl = "ws://172.168.0.81:1234";
		// // 实例化socket
		// window.socket = new WebSocket(webSocketUrl)
	},
	/**
	 * 接口登录状态过期，统一处理
	 * @param that
	 * @constructor
	 */
	tokenExpired: function (that) {
		localStorage.clear()
		sessionStorage.clear()
		if(window.socket) {
			window.socket.close()
		}
		if(that.$route.path == '/login') {

		} else {
			that.$router.push('/login');
			that.$message.error('登录状态过期，请重新登录！');
		}
	},
	/**
	 * 角色不存在状态，统一处理
	 * @param that
	 * @constructor
	 */
	roleNoExist: function (that) {
		localStorage.clear()
		sessionStorage.clear()
		if(window.socket) {
			window.socket.close()
		}
		that.$message.error('角色不存在，请重新登录！');
		that.$router.push('/login');
	},
    /**
	 * 接口暂无权限状态，统一处理
	 * @param that
	 * @constructor
	 */
	permissionsChange: function (that) {
		localStorage.clear()
		sessionStorage.clear()
		if(window.socket) {
			window.socket.close()
		}
		that.$message.error('该访问暂无权限,请联系管理员确认');
		that.$router.push({
			path: '/noPermission',
			query: {
				parhName:that.$route.name
			}
		});
	},
	
	/**
	 * 多次遍历MD5
	 * @param {String} val 需要被遍历的内容
	 * @param {Number} num 遍历次数
	 */
	recursiveMD5: function (val, num) {
		let md5 = require('js-md5')
		for (let i = 0; i < num; i++) {
			val = md5(val)
		}
		return val
	},
	/**
    * 日期格式转换
    * @param fmt 要处理成的日期格式 例: 'yyyy-MM-dd hh:mm:ss'
    * @param date 要处理的日期，需Date类型
    */
   dateFormat: function(fmt, date) {
	date = date ? date : new Date();
	let o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
		"H+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	let week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
},
// 金额转中文
digitUppercase: function(price) {
	let fraction = ['角', '分'];
	let digit = [
		'零', '壹', '贰', '叁', '肆',
		'伍', '陆', '柒', '捌', '玖'
	];
	let unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
	];
	let head = price < 0 ? '欠' : '';
	price = Math.abs(price);
	let s = '';
	for (let i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(price * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	s = s || '整';
	price = Math.floor(price);
	for (let i = 0; i < unit[0].length && price > 0; i++) {
		let p = '';
		for (var j = 0; j < unit[1].length && price > 0; j++) {
			p = digit[price % 10] + unit[1][j] + p;
			price = Math.floor(price / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return head + s.replace(/(零.)*零元/, '元')
		.replace(/(零.)+/g, '零')
		.replace(/^整$/, '零元整');
},
// 数字转中文
noToChinese: function(num) {
    if (!/^\d*(\.\d*)?$/.test(num)) {
		return
        alert("Number is wrong!");
        return "Number is wrong!";
    }
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }
    if (a.length > 1) //加上小数部分(如果有小数部分) 
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
	}
    return re;
},
// 两个日期相差多少天
getDaysBetween(dateString1,dateString2){
	var startDate = Date.parse(dateString1);
	var endDate = Date.parse(dateString2);
	var days = (endDate - startDate) / (1*24*60*60*1000);
	// alert(days);
	return  Math.ceil(days);
},
// 根据数据组内obj内的某个参数去重
delObjByParam: function(allArr,param){
	let objItem = {}
	let tmpArr = []
	for (var i = 0; i < allArr.length; i++) {
		if (!objItem[allArr[i][param]]) {
			tmpArr.push(allArr[i]);
			objItem[allArr[i][param]] = true;
		}
	}
	return tmpArr
},
/**
* 根据数据组内obj内的某个参数去重
* @param allArr 要排序的参数名
* @param rev 没有传递 默认升序排列
*/
sortBy:function(attr,rev){
    //第二个参数没有传递 默认升序排列
    if(rev ==  undefined){
        rev = 1;
    }else{
        rev = (rev) ? 1 : -1;
    }
    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a < b){
            return rev * -1;
        }
        if(a > b){
            return rev * 1;
        }
        return 0;
    }
},
/**
* 处理聊天时间显示
* @param timestamp 要处理的时间戳
* @param chatType 1消息列表显示时间
*/
handelChatTime: function(timestamp, chatType){
	// 当前时间
	var curDate = new Date();
	// 目标判断时间
	var srcDate = new Date(parseInt(timestamp));

	var curYear = curDate.getFullYear();
	var curMonth = (curDate.getMonth()+1);
	var curDay = curDate.getDate();

	var srcYear = srcDate.getFullYear();
	var srcMonth = (srcDate.getMonth()+1);
	var srcDay = srcDate.getDate();

	var result = "";

	// 聊天记录中要额外显示的时间分钟
	var timeExtraStr = (chatType == 2 ? " " + this.dateFormat("HH:mm",srcDate):"");

	// 当年
	if(curYear == srcYear) {
		var curTimestamp = curDate.getTime();
		var srcTimestamp = timestamp;
		// 相差时间（单位：毫秒）
		var deltaTime = (curTimestamp-srcTimestamp);

		// 当天（月份和日期一致才是）
		if(curMonth == srcMonth && curDay == srcDay) {
		// 时间相差60秒以内
		if(deltaTime < 60 * 1000)
			// result = "刚刚";
			result = this.dateFormat("HH:mm",srcDate);
		// 否则当天其它时间段的，直接显示“时:分”的形式
		else
			result = this.dateFormat("HH:mm",srcDate);
		}
		// 当年 && 当天之外的时间（即昨天及以前的时间）
		else {
				// 昨天（以“现在”的时候为基准-1天）
				var yesterdayDate = new Date();
				yesterdayDate.setDate(yesterdayDate.getDate()-1);

				// 前天（以“现在”的时候为基准-2天）
				var beforeYesterdayDate = new Date();
				beforeYesterdayDate.setDate(beforeYesterdayDate.getDate()-2);

				// 用目标日期的“月”和“天”跟上方计算出来的“昨天”进行比较，是最为准确的（如果用时间戳差值的形式，是不准确的，比如：现在时刻是2020年12月16日1:00、而srcDate是2020年12月15日23:00，
				// 这两者间只相差2小时，直接用“deltaTime/(3600 * 1000)” > 24小时来判断是否昨天，这完全是行不通的）
				if(srcMonth == (yesterdayDate.getMonth()+1) && srcDay == yesterdayDate.getDate())
					result = "昨天"+timeExtraStr;// -1d
				// “前天”判断逻辑同上
				else if(srcMonth == (beforeYesterdayDate.getMonth()+1) && srcDay == beforeYesterdayDate.getDate())
					result = "前天"+timeExtraStr;// -2d
				else{
						// 跟当前时间相差的小时数
						var deltaHour = (deltaTime/(3600 * 1000));

						// 如果小于或等 7*24小时就显示星期几
						if (deltaHour <= 7*24){
						var weekday=new Array(7);
						weekday[0]="星期日";
						weekday[1]="星期一";
						weekday[2]="星期二";
						weekday[3]="星期三";
						weekday[4]="星期四";
						weekday[5]="星期五";
						weekday[6]="星期六";

						// 取出当前是星期几
						var weedayDesc = weekday[srcDate.getDay()];
							result = weedayDesc+timeExtraStr;
						}
						// 否则直接显示完整日期时间
						else
						result = this.dateFormat("yyyy/M/d",srcDate)+timeExtraStr;
				}
		}
	}
	// 往年
	else{
		result = this.dateFormat("yyyy/M/d",srcDate)+timeExtraStr;
	}
	return result;
},
/**
* 处理金额保留几位小数
* @param val 要处理的金额
* @param num 要保留几位小数,不传默认两位
*/
handlePrice(val, num) {
	var regStrs = [
		['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
		['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
		['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
		['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
	];
	for(var i=0; i<regStrs.length; i++){
		var reg = new RegExp(regStrs[i][0]);
		val = val.replace(reg, regStrs[i][1]);
	}
	return val
},
//返回true表示为pc端打开，返回false表示为手机端打开
checkPC() { 
	var userAgentInfo=navigator.userAgent; 
	var Agents =new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"); 
	var flag=true; 
	for(var v=0;v<Agents.length;v++) { 
	   if(userAgentInfo.indexOf(Agents[v])>0) { 
		 flag=false; 
		 break; 
	   } 
	 } 
	 return flag; 
	},
// 处理左侧路由与顶部导航数据 ,返回数组下标0为 左侧导航栏数组, 下标1为顶部导航栏数组
handleRoutesData: function(data) {
	let tmpRouteArr = []
	let tmpNavArr = [{
		name: "首页",
		push: "/index",
		icon: require("../images/public/home-icon.png"),
		active: true,
	}]
	let isAdmin = localStorage.getItem('is_admin')
	localStorage.removeItem('sign')
	data.forEach(item =>{
		let tmpIcon = item.icon+''
		let level1obj = {
			title: item.title,
			push: item.url,
			icon: './static/img/'+item.icon,
			selectIcon: './static/img/'+item.check_icon,
			active: false,
			children:[]
		}
		if(item.is_quick == 1) {
			tmpNavArr.push({
				name: item.quick_title,
				push: item.url,
				icon: './static/img/'+item.quick_icon,
				active: false,
			})
		}
		// if(isAdmin == 1) {
		// 	if(item.title == '合作商城') {
		// 		level1obj.title = '供应商城'
		// 	}
		// }
		if(item.child && item.child.length > 0) {
			item.child.forEach(subItem =>{
				let level2obj = {
					title: subItem.title,
					push: subItem.url,
					icon: './static/img/'+subItem.icon,
					selectIcon: './static/img/'+subItem.check_icon,
					active: false,
				}
				if(subItem.is_quick == 1) {
					tmpNavArr.push({
						name: subItem.quick_title,
						push: subItem.url,
						icon: './static/img/'+subItem.quick_icon,
						active: false,
					})
				}
				level1obj.children.push(level2obj)
			})
		}
		if (item.url === '/sign') {
			localStorage.setItem('sign', true)
		} else {
			if (item.url === '/teller') {
				let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
				if (userInfo && userInfo.post_id > 6) {
					tmpRouteArr.push(level1obj)
				}
			} else {
				tmpRouteArr.push(level1obj)
			}
		}
	})
	return[tmpRouteArr,tmpNavArr]
},
// 处理左侧商城导航栏
handleShopNav: function(data) {
	let tmpRouteArr = []
	data.forEach(item =>{
		let level1obj = {
			title: item.title,
			push: item.url,
			icon: './static/img/'+item.icon,
			selectIcon: './static/img/'+item.check_icon,
			active: false,
			children:[]
		}
	
		if(item.child && item.child.length > 0) {
			item.child.forEach(subItem =>{
				let level2obj = {
					title: subItem.title,
					push: subItem.url,
					icon: './static/img/'+subItem.icon,
					selectIcon: './static/img/'+subItem.check_icon,
					active: false,
				}
				level1obj.children.push(level2obj)
			})
		}
		tmpRouteArr.push(level1obj)
	})
	return tmpRouteArr
},
// 检查token是否过期
checkToken: function(that,callBack) {
	let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
	if(userInfo && userInfo.post_id) {
		that.ajax('checkToken',{},'',res =>{
			callBack && typeof callBack == 'function' && callBack(res)
		}, err =>{
			callBack && typeof callBack == 'function' && callBack(res)
		})
	} else {
		that.$message.error('请先登录')
		that.$router.push('/login')
	}
},
// 请求功能权限列表
getPermissionList: function(that,callBack,path,field) {
	let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
	if(userInfo && userInfo.post_id) {
		that.ajax('functionList',{
			url: path ? path : that.$route.path,
			post_id: userInfo.post_id,
			field:field
		},'',res =>{
			if(res.errno == 0) {
				if(res.data && res.data.length > 0) {
					callBack && typeof callBack == 'function' && callBack(res.data)
				}
			}
		})
	} else {
		that.$message.error('请先登录')
		that.$router.push('/login')
	}
	
},
// 管理员获取合作社
getCooperativeList: function(that,successCallBack,errCallBack) {
	that.ajax('cooperativeList',{},'',res =>{
		if(res.errno == 0) {
			if(res.data && res.data.length > 0) {
				res.data.unshift({
					coopera_name: '全部',
					coopera_id: ''
				})
				successCallBack && typeof successCallBack == 'function' && successCallBack(res.data)
			} else {
				errCallBack && typeof errCallBack == 'function' && errCallBack(res)
			}
		} else {
			errCallBack && typeof errCallBack == 'function' && errCallBack(res)
		}
	}, err =>{
		errCallBack && typeof errCallBack == 'function' && errCallBack(err)
	})
},
}
