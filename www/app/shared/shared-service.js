"use strict";

angular.module("ngapp").service("shared", function(){ // One of The Ways To Share Informations Across the Controllers

    this.pokemons = [];
    this.currentPokemon = {};
    this.info = {
        auth: window.localStorage['name'] || ''
    };
});
