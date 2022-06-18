var app = angular.module("ngRoutingDemo", ["ngRoute"]);

app.directive("restrictInput", function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
          ctrl.$parsers.unshift(function(viewValue) {
            var options = scope.$eval(attr.restrictInput);
            if(options.type == 'lettersOnly'){
              options.regex = '^[a-zA-Z]*$';
            }else{
              options.regex = '';
            }
            var reg = new RegExp(options.regex);
            if (reg.test(viewValue)) { 
              return viewValue;
            } else { 
              var overrideValue = (reg.test(ctrl.$modelValue) ? ctrl.$modelValue : '');
              element.val(overrideValue);
              return overrideValue;
            }
          });
        }
      };
});

app.controller("loginController", function ($scope, $location) {
  $scope.authenticate = function (username) {

    $location.path("/student/" + username);
  };

  $scope.forgotpass = function () {
    $location.path("/forgotP/");
  };
});

app.controller("studentController", function ($scope, $routeParams, $location) {
  $scope.username = $routeParams.username;
  $scope.resetForm = function(){
    $scope.student.firstName = "";
    $scope.student.lastName = "";
    $scope.student.DoB = "";
    $scope.student.gender = "";
    $scope.student.trainingType = "";
    $scope.student.maths = "";
    $scope.student.physics = "";
    $scope.student.chemistry = "";
  }
});

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/login.html",
      controller: "loginController",
    })
    .when("/forgotP/", {
      templateUrl: "forgotP.html",
      controller: "loginController",
    })
    .when("/student/:username", {
      templateUrl: "/student.html",
      controller: "studentController",
    })
    .otherwise({
      redirectTo: "/",
    });
});
