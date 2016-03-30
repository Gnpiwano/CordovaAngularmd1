"use strict";

angular.module("ngapp").service("data", function($resource, shared, location){

    var url = 'http://pokeapi.co/api/v2/pokemon/';
    var pokemonCount = 15;
    var ctrl = this;
    var count = 1;

    var getRandomNumber = function(number) {
        var scale = 7;
        if(Math.random() < 0.5) {
            return number + (Math.random() / 7);
        } else {
            return number - (Math.random() / 7);
        }
    }

    var getPokemonFromApi = function(id) {
        var resource = $resource( url + id + "/").get();
        resource.$promise.then(function(data) {
            var pokemon = {};
            pokemon.id = data.id;
            pokemon.name = data.name;
            pokemon.sprites = data.sprites;
            pokemon.abilities = data.abilities;
            pokemon.types = data.types;
            pokemon.latitude = getRandomNumber(location.gps.latitude);
            pokemon.longitude = getRandomNumber(location.gps.longitude);
            pokemon.height = data.height;
            pokemon.weight = data.weight;
            //pokemon.catched = "true";
            pokemon.base_experience = data.base_experience;
            pokemon.order = data.order;
            window.localStorage.setItem("pokemon_"+data.id , JSON.stringify(pokemon));

            shared.pokemons[pokemon.id -1] = pokemon;

            count++;

            if(count == pokemonCount) {

                var event = new CustomEvent("pokedex_ready");
                document.dispatchEvent(event);
            }

            return pokemon;
        });
    };

    var getPokemonFromStorage = function(id) {
        return JSON.parse(window.localStorage.getItem("pokemon_"+id));
    };

    this.checkForupdates = function() {
        var today = new Date().getDay();
        //window.localStorage.removeItem("lastUpdatedDay");
        if(window.localStorage.getItem("lastUpdatedDay")) {
            var lastToday = window.localStorage.getItem("lastUpdatedDay");
            //if today > lastTody dan update behalve als today 0 is.
            if(today != lastToday && today > lastToday || today != lastToday && today == 0) {
                var event = new CustomEvent("pokedex_ready");
                document.dispatchEvent(event);

                updatePokemon();
                window.localStorage.setItem("lastUpdatedDay", today);
            } else {
                for(var i = 1; i <= pokemonCount; i++) {
                    shared.pokemons.push(getPokemonFromStorage(i));
                }
                window.location.replace("#/main");
            }
        } else {
            window.localStorage.setItem("lastUpdatedDay", today);
            updatePokemon();
        }
    };

    this.updatePokemonwithId = function(pokemon) {
        window.localStorage.setItem("pokemon_"+pokemon.id , JSON.stringify(pokemon));
    }

    var updatePokemon = function() {
        for(var i = 1; i <= pokemonCount; i++) {
            var poke = getPokemonFromApi(i);
        }
    }

});