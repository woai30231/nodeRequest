var http = require('http');//此模块为node核心模块，用于构建服务器
// var path = require('path');

http.createServer(function(req,res){
	res.write("hello,world!");
	res.end();
}).listen("3333",function(){
	console.log("服务器正在运行，端口为3333!");
});
