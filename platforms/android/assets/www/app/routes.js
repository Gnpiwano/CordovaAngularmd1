"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider, language){

    $urlRouterProvider.otherwise("/loading");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main/main.html",
        title: "Pokedex",
        controller: "mainController",
        controllerAs: "main"
    }).state("detail",{
        url: "/detail",
        templateUrl: "app/components/detail/main.html",
        title: "Pokedex Detail Page",
        controller: "detailController",
        controllerAs: "PokeDetail"
    }).state("map", {
        url: "/map",
        templateUrl: "app/components/map/main.html",
        title: "Pokedex Detail Page",
        controller: "mapController",
        controllerAs: "main"
    }).state("loading", {
        url: "/loading",
        templateUrl: "app/components/loading/main.html",
        title: "Loading pokedex",
        controller: "loadingController",
        controllerAs: "main"
    }).state("profile", {
        url: "/profile",
        templateUrl: "app/components/profile/main.html",
        title: 'Profile page',
        controller: "profileController",
        controllerAs: "main"
    });

}]);
