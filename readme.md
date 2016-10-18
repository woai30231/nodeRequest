# http.requrest实现跨域请求

## 项目结构


> demo
>> server.js
>> /public
>>> jquery.js
>>> index.js
>> index.html 

## 首先，先用node来实现一个服务器吧!,代码如下：

``` javascript

	var http = require('http');


	http.createServer(function(req,res){
		//req和res分别代表请求对象和响应对象
		res.write();
		req.end();
	}).listen("3333",function(){
		console.log("服务器正在运行，端口为3333!");
	});


```
