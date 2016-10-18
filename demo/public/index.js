$.ajax({
		url:'./baidu/',
		type:'GET',
		success : function(data){
			console.log(data);
		},
		error : function(){
			alert("网络出错了！");
		}
	})