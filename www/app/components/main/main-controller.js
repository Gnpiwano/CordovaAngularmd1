"use strict";

angular.module("ngapp").controller("mainController", function(shared, menu, language, data, $state, $scope){

    this.title = $state.current.title;

    $scope.name = shared.info.auth;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.shared = shared;

    $scope.init = function() {
        language.setLanguage();
        $scope.pokemons = shared.pokemons;
        console.log(shared.pokemons);
    }

    $scope.goDetail = function(pokemon) {
        shared.currentPokemon = pokemon;
        location.replace("#/detail");
    }

    $scope.goMap = function() {
        location.replace("#/map");
    }
});
