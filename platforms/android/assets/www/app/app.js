"use strict";

angular.module("ngapp", [ "ngTouch", "ui.router", "ngMdIcons", "ngMaterial", "ngCordova", "ngStorage" ,"ngResource",'uiGmapgoogle-maps'])
// ngTouch is No Longer Supported by Angular-Material

.run(function($rootScope, $cordovaDevice, $state, $cordovaStatusbar, $mdToast){
  document.addEventListener("deviceready", function () {
    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#E53935'); // Status Bar With Red Color, Using Angular-Material Style
    window.plugins.orientationLock.lock("portrait");
  }, false);

  document.addEventListener("backbutton", function (e) {
      if($state.is("main")) {
          navigator.app.exitApp();
      }else {
          $mdToast.hide();
        location.replace("#/main");
        $scope.apply();
      }
      location.replace("#/main");
    }, false);
})

.config(function($mdThemingProvider) { // Angular-Material Color Theming
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
});
