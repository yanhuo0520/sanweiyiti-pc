// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'

import 'babel-polyfill'
require('es6-promise').polyfill()
import Print from '../static/js/print'
Vue.use(Print);  

import ElementUI, { TabPane } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import {server} from './request/http'
import echarts from 'echarts'
import { Popover } from 'element-ui';
Vue.use(Popover);

window.eventWatch = new Vue(); // 跨页面传送数据
// 发送调用 eventWatch.$emit(event, data)  event-事件名 data-发送的数据
// 接收调用 eventWatch.$on(event, fn) event-事件名 fn-接收的方法

import { formatDate,upDigit,getRndInteger,timestampToTime } from "./javascript/common";
Vue.prototype.$formatDate = formatDate
Vue.prototype.$timestampToTime = timestampToTime
Vue.prototype.$upDigit = upDigit
Vue.prototype.$getRndInteger = getRndInteger
Vue.prototype.$echarts = echarts
import utils from './utils'
Vue.prototype.utils = utils;

Vue.config.productionTip = false

Vue.prototype.$api = server
Vue.prototype.$axios = axios

Vue.prototype.ajax = function(apiFunName,params, errMsg, successCB, failedCB) {
	let that = this;
	if (!params) params = {};
  	that.$api[apiFunName](params).then(res => {
		if (typeof successCB === 'function') {
			try {
				successCB(res)
			} catch (error) {
				ElementUI.Message({
					message: error,
					type: 'error'
				});
			}
		}
		if(res.errno == 0) { // 登录成功
			// nothing to do
		} else if(res.errno == 40001) { // 登录过期
			that.utils.tokenExpired(that)
		} else if(res.errno == 40002) { // 角色不存在
			that.utils.roleNoExist(that)
		} else if(res.errno == 40003) { // 无访问权限
			that.utils.permissionsChange(that)
		} else {
			if (errMsg && errMsg.length > 0) {
				that.$message.error((res.errmsg && res.errmsg.length > 0) ? res.errmsg : errMsg)
			}
		}
	}).catch(err =>{
		if (typeof failedCB === 'function') {
			failedCB()
		}
		that.$message.error(err && err.statusText ? err.statusText : '服务异常,请稍后重试!')
	});
}

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})