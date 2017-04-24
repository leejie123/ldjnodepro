var url = require("url");
var fs = require("fs");
var NS = require("./namespace");
var debug = require("./debug");
// 路由暂时实现静态网页
// 规则设置，那些通过路由


var Route = function(obj) {
		// 转发规则
		this.rules = {
			static: {
				reg: [/\.js/, /\.css/, /\.html/,/\.jpg|\.gif|\.png|\.ico|\.jpeg/],
				path: ""
			},
			api: {
				reg: [/\[api1\]:\w+&\w+&\w+/],
				path:""
			},
		};
}


Route.prototype = {
	getstatichandler: function(obj) {
		fs.readFile(obj.path, "utf8", function(err, data) {
			// debug.querydebug({
			// 	path: path,
			// 	params: parseUrl.query
			// });
			// debug.pagedebug({
			// 	err: err || 0,
			// 	page: path,
			// 	params: parseUrl
			// })
			if(err) {
				fs.readFile(obj.errpage, "utf8", function(err,data) {
					obj.res.end(data);
				});
			} else {
				obj.res.end(data);
			}
		})
	},
	get: function(obj) {
		var self = this;
		for(var i in self.rules.api.reg) {
			var match = obj.pathname.match(self.rules.api.reg[i]);
			if(match) {
				console.log(match);
				var match1 = match[0].split(":")[1].split("&");
				if(NS.isDebug.debugrouterule) {
					console.log("[route info]=> " + match);
					console.log("[get info]=> " + match1);
				}
				var xx = {
					page: match1[0],
					method: match1[1]
				}
				var json;
				switch(xx["method"]) {
					case "help":
						json = {
							success: true,
							status: 1
						};
						break;
					case "hello":
						json = {
							success:true,
							status: 1,
							msg: "hello world"
						};
						break;
					case "search":
						json = {
							success:1,
							data: {
								like: "eeeesdsd",
								unlike: ""
							},
							status:1
						}
						break;
					case "xxxx":
						json = {
							success: true,
							data: {
								like: "xxxxxxxx",
								xx:xx
							},
							status:1
						}
						break;
					default: 
						json = {
							success: false,
							status: 0
						};
				}
				obj.res.end(JSON.stringify(json));
				return;
			} else {
				var json = {
					status:1,
					success: false,
					msg: "路由参数非法"
				}
				obj.res.end(JSON.stringify(json));
			}
		}

	},
	// 匹配规则
	rule: function(obj) {
		var returnobj = {},
			self = this;

		// static source
		for(var i in self.rules.static.reg) {
			var match = obj.pathname.match(self.rules.static.reg[i]);
			if(match) {
				if(NS.isDebug.debugrouterule) {
					console.log("[route info]=>" + match);
				}
				var match = match[0];
				if(match == ".js") {
					returnobj["path"] = NS.staticPath.js;
				} else if(match == ".css") {
					returnobj["path"] = NS.staticPath.css;
				} else if(match == ".html") {
					returnobj["path"] = NS.staticPath.html;
				} else if(match == ".png" || ".ico" || ".gif" || ".jpg" || ".jpeg") {
					returnobj["path"] = NS.staticPath.images;
				}
				returnobj["errpage"] = NS.staticPath.errpage['staticnotfound'];
			}
		}

		
		if(NS.isDebug.debugrouterule) {
			console.log("[route return]=>" + JSON.stringify(returnobj));
		}

		return returnobj;
	},
	parse: function(path) {
		if(path) {
			try {
				var _urlInfo = url.parse(path);
				return _urlInfo;
			} catch(e) {
				console.log(e);
			}
		} else {

		}
	},
	init: function(req, res) {
		var url = req.url;
		var parseUrl = this.parse(url);
		if(parseUrl.path.match(/\[api1\]/)) {
			this.get({pathname: parseUrl.path, res:res, req: req});
		} else {
			var returnurl = this.rule({pathname:url});
			console.log(parseUrl);
			var path = returnurl.path + parseUrl.pathname;
			var errpage = returnurl.errpage;
			this.getstatichandler({path:path, errpage:errpage,res: res, req:req});
		}
		// var reg = /\.js/i;
		// //静态文件不通过路由

		// if(path.match(reg)) {
		// 	path = NS.staticPath.js + parseUrl.pathname;
		// }
		
	},
	// get: function() {

	// }, 
	post: function() {

	}
}

module.exports = Route;