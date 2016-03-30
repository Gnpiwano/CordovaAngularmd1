"use strict";

angular.module("ngapp").controller("loadingController", function(shared,language, location , data, menu,$state, $scope){


    $scope.lan = language;

    $scope.init = function() {
        data.checkForupdates();

    }

    document.addEventListener("pokedex_ready", function(e) {
        window.location.replace("#/main");
    });

});