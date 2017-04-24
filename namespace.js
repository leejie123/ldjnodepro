
/*
 * 配置文件
 * 需要支持页面传值
 * 自定义文件目录
 * 安全性配置
 * 提供config方法来设置debug内容
 * 以后扩展出来，一个项目一个目录
*/

var url = require("url");
// global > devenv  在global开启的情况下devenv才有用
var NS = function() {
	this._devenv = false;
	this.setNS(this._devenv);
	this._NS;
}
NS.prototype = {
	setNS:function(obj) {
		this._NS = {
			returnsetting: {
				staticPath: true,
				isDebug: true,
				keeplog: false,
				returnsetting: false
			},
			staticPath: {
				// 自定义错误页面
				errpage: {
					"404": __dirname + "/html/error.html",
					"staticnotfound": __dirname + "/html/staticnotfound.html"
				},
				// html目录文件
				html: __dirname + "/html",
				// css目录文件
				css: __dirname + "/css",
				// js目录文件
				js: __dirname + "/js",
				images: __dirname + "/images"
			},
			isDebug: {
				// 全局开关
				global: false,
				// 页面传值
				querydebug: obj._devenv || false,
				// 页面的基本信息
				pagedebug: obj._devenv || false,
				// 未来添加的：cookie，postparams，
				cookie: obj._devenv || null,
				databasedebug: obj._devenv || null,
				showconfig: false,
				// 路由规则
				debugrouterule: true
			},
			// 写日志，可以写到数据库或者文件。
			keeplog: {

			}
		}
	},
	config: function(config) {
		var self = this;
		// 设置开发环境
		if(config.devenv) {
			this._devenv = config.devenv;
			self.setNS({_devenv:this._devenv});
		}
		// 设置返回
		for(var i in this._NS.returnsetting) {
			if(config.returnsetting[i]!=undefined) {
				self._NS.returnsetting[i] = config.returnsetting[i];
			}
		}

		// staticpath
		for(var i in this._NS.staticPath) {
			if(config.staticPath[i]!=undefined) {
				if(i == "errpage") {
					// 添加新的
					for(var j in config.staticPath.errpage) {
						self._NS.staticPath.errpage[j] = config.staticPath.errpage[j];
					}
				} else {
					self._NS.staticPath[i] = config.staticPath[i];
				}
			}
		}
		// 设置debug
		for(var i in this._NS.isDebug) {
			if(config[i]!=undefined) {
				this._NS.isDebug[i] = config[i];
			}
		}
		if(this._NS.isDebug.showconfig) {
			console.log(this._NS);
		}
	},
	getconfig: function() {
		var returnconf = {},
			self = this;
		for(var i in self._NS.returnsetting) {
			if(self._NS.returnsetting[i]) {
				returnconf[i] = self._NS[i];
			}
		}
		return returnconf;
	}
}

// user config
var project1 = new NS();
project1.config({
	// 返回其他页面可用，全局可见，有些设置不可乱动
	returnsetting: {
		keeplog: false
	},
	// ==== 调试专用 ====
	global: false,
	devenv: true,
	// querydebug: false,
	// pagedebug: false,
	// 查看全部设置
	showconfig: false,
	// ==== 开发目录 ====
	staticPath: {
		html: __dirname + "/html",
		errpage: {
			"200": __dirname + "sf"
		}
	}
})

// console.log(ns.getconfig())
module.exports = project1.getconfig();
