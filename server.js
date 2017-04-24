var http = require("http");
var fs = require("fs");
var url =require("url");
var Route = require("./Route");

var server = http.createServer();
var route = new Route();
server.on("request", function(req,res) {
	res.writeHead(200, {"Content-Type": "text/html", "charset": "utf8"});
	route.init(req,res);
});
server.listen(8888);
console.log("server running");
module.exports = server;	