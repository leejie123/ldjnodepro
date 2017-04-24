// 所有可能出错的地方
// 安全性的增强
// error的定义
// 粒度是在页面级别的。从几个不同层级和几个不同的部分去定义
// 还可以从这里写入数据库，错误信息，
// 这个文件捕捉错误信息，可以写入数据库

var NS = require("./namespace");
var debug = {
	// 启动检测程序,xieru log, jiancha bianlian
	testcommnad: function() {},
	routedebug: function() {
		if(NS.isDebug.global) {
			if(NS.isDebug.route) {
				
			}
		}
	},
	pagedebug: function(obj) {
		if(NS.isDebug.global) {
			if(NS.isDebug.pagedebug) {
				var str = "";
				if(obj.err) {
					str = "页面 " + obj.page + " 未找到" + obj.err;
				} else {
					str = "页面 " + obj.page + " 基本参数==>" + JSON.stringify(obj.params);
				}
				console.log(str + "\n");
			}
		}
	},
	// 页面传值的测试
	// 可以通过那个页面的那些参数
	querydebug: function(obj) {
		if(NS.isDebug.global) {
			var str = "";
			if(NS.isDebug.querydebug) {
				str = "页面 " + obj.path +" 的请求参数为==>" + obj.params;
				console.log(str + "\n");
			} else {
				// str = "页面 " + obj.path + " 的请求参数为空";
			}
		}
	}
}

module.exports = debug;