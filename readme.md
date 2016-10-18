# http.requrest实现跨域请求

## 项目结构


> demo
>> server.js

>> getBaidu.js

>> /public

>>> jquery.js

>>> index.js

>> index.html 

## 首先，先用node来实现一个服务器吧!,代码如下：

``` javascript

	var http = require('http');


	http.createServer(function(req,res){
		//req和res分别代表请求对象和响应对象
		res.write("hello world!");
		req.end();
	}).listen("3333",function(){
		console.log("服务器正在运行，端口为3333!");
	});


```

首先我们来看一下上面的代码能否正常运行呢？用下面的代码就可以启动服务器了！


``` bash
	node server.js
```

然后在浏览器中输入如下地址：

``` bash
  127.0.0.1:3333
```

我们看到浏览器正确打印了“hello world！”,截图如下：

![截图](https://github.com/woai30231/nodeRequest/blob/master/z_img/_1.png)


## 需求

* 我们要解决的问题暂定就是请求百度首页的代码吧！

如果我们直接在客户端用js代码请求这个页面，浏览器会报错，因为存在跨域问题！截图如下：

![截图](https://github.com/woai30231/nodeRequest/blob/master/z_img/_2.png)

请求代码如下:

``` javascript

$.ajax({
	url:'./baidu/',
	type:'GET',
	success:function(data){
		console.log(data);
	},
	error : function(xhr,msg,err){
		console.log(msg);
	},
	timeout:3000
});

```

我们知道这是一个跨域错误，这是由于浏览器的同源策略造成的，相关概念，可自行查阅！


## 这里实现跨域的原理

实际上，我们在浏览器端直接请求资源，浏览器会有一个同源策略限制着我们，这个策略的目的就是要求我们在浏览器端请求接口的时候，如果页面和服务器的协议、域名、端口只要有一个不同，那么就是不同源的，请求的时候浏览器就会报跨域错误，这实际上是浏览器的一种安全机制，如果没有它，估计浏览器得乱套了，因为接口可以随便请求！（有关跨域请求怎么实现的资料需另去查阅！）

好了，既然浏览器端有个同源策略限制着我们，那我们把这个请求放在服务器端呢？让服务器去帮我们请求，然后把请求到的资源返回给前台，这是完全可以的，至少目前我来说，我还没有遇到服务器端有同源策略的限制问题！实际上，此时的node服务器充当的是一个请求代理的角色！

原理用一幅图表示如下：

![截图](https://github.com/woai30231/nodeRequest/blob/master/z_img/_3.png)


## 完善代码


我们把服务器入口文件server.js代码改动如下：


``` javascript




var http = require('http');//此模块为node核心模块，用于构建服务器
var path = require('path');
var fs = require('fs');
var gB = require('./getBaidu.js')

http.createServer(function(req,res){
	//静态资源路径
	//__dirname在node里面是个特殊的全局变量，它永远表示它所在文件的路径
	var staticPath = path.join(__dirname,'/public/');//join方法的作用就是一个字符串的拼接
	var body;
	if(req.url == '/'){
		fs.readFile('./index.html',function(err,data){
			if(err) throw new Error(err);
			body = data;
			res.setHeader('Content-Length',Buffer.byteLength(body));
			res.write(body);
			res.end();
		});
	}else if(req.url == '/favicon.ico'){
		fs.readFile('./favicon.ico',function(err,data){
			if(err) throw new Error(err);
			body = data;
			res.setHeader('Content-Length',Buffer.byteLength(body));
			res.write(body);
			res.end();
		});
	}else if(req.url == '/baidu/'){
		gB.getThingFromBaidu(http,function(data){
			body = data;
			res.setHeader('Content-Length',Buffer.byteLength(body));
			res.write(body);
			res.end();
		});
	}else{
		var filename = path.join(staticPath,req.url);
		console.log(filename);
		fs.readFile(filename,function(err,data){
			if(err) throw new Error(err);
			body = data;
			res.setHeader('Content-Length',Buffer.byteLength(body));
			res.write(body);
			res.end();
		});
		
	};
}).listen("3333",function(){
	console.log("服务器正在运行，端口为3333!");
});



```

在来建立一个模块getBaidu，用来实请求百度首页源码，代码如下:

``` javascript

var config = {
	method : 'GET',
	hostname : 'www.baidu.com',
	path : '/'
};
exports.getThingFromBaidu = function(http,callback){
	var req = http.request(config,function(res){
		var returnData = '';
		res.setEncoding("utf8");
		res.on('data',function(churk){
			returnData += churk;
		}).on("end",function(){
			console.log("there is no more things to be gotten!");
			callback(returnData);//返回一个回调函数
		});
	});
	req.on('error',function(e){
		console.log(e.msg);
	});
	req.write('');//为一个字符串或者object
	req.end();
};

```
 

 ## 测试结果

 我们打开浏览器，看到正确打印了百度的首页源码，说明请求是成功的！截图如下：

 ![截图](https://github.com/woai30231/nodeRequest/blob/master/z_img/_4.png);


 ## 结语

上面的代码其实看着是臃肿的，很不好，不过还好这里实现了我们的需求，也大致知道里面需要掌握的一些东西，而且越是丑陋的代码，越能看出当时是怎么实现的，所以在这里不做进一步处理！后期如果用上框架，那么结构将会更直观、清晰一些！
