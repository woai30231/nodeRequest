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

![](https://github.com/woai30231/nodeRequest/blob/master/z_img/_3.png)
