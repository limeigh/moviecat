(function(angular){
	var app=angular.module('cooming_soon',['ngRoute'])
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/cooming_soon/:page?',{
			templateUrl:'./cooming_soon/cooming_soon.html',
			controller:'cooming_soon_controller'
		}).when('/detail',{
      templateUrl:'./detail/detail.html'
    })
	}])
	app.controller('cooming_soon_controller',['$scope','$routeParams','$route','myServiceName',function($scope,$routeParams,$route,myServiceName){
    $scope.pageSize=20
    $scope.page=($routeParams.page || '1')-0
    $scope.getPage=function(nowPage){
       if(nowPage<1 || nowPage>$scope.totalPage){
         return
       }
       $route.updateParams({
         page:nowPage
       })
    }
    myServiceName.myJsonp('http://api.douban.com/v2/movie/coming_soon',{start:($scope.page-1)*$scope.pageSize,count:$scope.pageSize},function(data){
        $scope.data=data
        $scope.totalPage=Math.ceil(data.total/$scope.pageSize)
        $scope.$apply()
     })
  }])
})(angular)