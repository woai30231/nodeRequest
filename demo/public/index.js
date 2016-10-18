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