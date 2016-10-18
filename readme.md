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

![]()
