"use strict";

angular.module("ngapp").controller("loadingController", function(shared,language, location , data, menu,$state, $scope){
    $scope.lan = language;

    data.checkForupdates();

    document.addEventListener("pokedex_ready", function(e) {
        window.location.replace("#/main");
    });

});