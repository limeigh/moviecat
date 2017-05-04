(function(angular){
	var app=angular.module('in_theaters',['ngRoute','myService'])
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/in_theaters/:page?',{
			templateUrl:'./in_theaters/in_theaters.html',
			controller:'in_theaters_controller'
		}).when('/detail',{
      templateUrl:'./detail/detail.html'
    })
	}])
	app.controller('in_theaters_controller',['$scope','$http','$sce','myServiceName','$timeout','$routeParams','$route',function($scope,$http,$sce,myServiceName,$timeout,$routeParams,$route){
    // $scope.data=null
    // $scope.getData=(function(){
    //   var xmlhttp;
    //     if (window.XMLHttpRequest)
    //     {
    //       //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    //       xmlhttp=new XMLHttpRequest();
    //     }
    //     else
    //     {
    //       // IE6, IE5 浏览器执行代码
    //       xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    //     }
    //     xmlhttp.open("GET","./in_theaters/data.json",true);
    //     xmlhttp.send();
    //     xmlhttp.onreadystatechange=function()
    //     {
    //       if (xmlhttp.readyState==4 && xmlhttp.status==200)
    //       {
    //         $timeout(function(){
    //           $scope.data=JSON.parse(xmlhttp.responseText)
    //         })
    //       }
    //     }
    // })()
    // $http.get('./in_theaters/data.json').then(function(res){
    //   // console.log(res.data)
    //   $scope.data=res.data
    // })
        // $scope.url=$sce.trustAsResourceUrl(url)
       // $http.jsonp($sce.trustAsResourceUrl('http://api.douban.com/v2/movie/in_theaters'),{
       //  jsonCallbackParam:'callback'
       // }).then(function(res){
       //   console.log(res)
       // })
       // console.dir($routeParams.page)
       $scope.pageSize=5
       $scope.page=($routeParams.page || '1')-0
       $scope.getPage=function(nowPage){
          if(nowPage<1 || nowPage>$scope.totalPage){
            return
          }
          $route.updateParams({
            page:nowPage
          })
       }
       myServiceName.myJsonp('http://api.douban.com/v2/movie/in_theaters',{start:($scope.page-1)*$scope.pageSize,count:$scope.pageSize},function(data){
        // console.log(data)
        // $timeout(function(){
        //    $scope.data=data
        // })
            $scope.data=data
            $scope.totalPage=Math.ceil(data.total/$scope.pageSize)
            $scope.$apply()
       })
	}])
})(angular)