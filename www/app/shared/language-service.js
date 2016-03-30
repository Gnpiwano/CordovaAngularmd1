"use strict";

// bevat alles strings in de pokedex
// haalt op het begin de taal van systeem op en slaat deze op op het apparaat.

angular.module("ngapp").service("language", function(){ // One of The Ways To Share Informations Across the Controllers

    var ctrl = this;

    this.language = "";

    this.str = {};

    var english = {
        changeCurrentName: "Change Current Name",
        settings: "Settings",
        linkMorePokemon: "More Pokemon",
        pokemonType: "Pokemon type",
        standardInformation: "Standard Information",
        baseExperience: "Base Experience",
        height: "Height",
        weight: "Width",
        navigate_to: "Start navigation",
        myProfile: "My Profile",
        catchedPokemon: "Catched Pokemon",
        fullName: "Full Name",
        inYourNeighbourhood: "Is near you. Throw your phone to catch him!",
        addedToInventory : "Added to inventory"
    }

    var dutch = {
        changeCurrentName: "Naam veranderen",
        settings: "Instellingen",
        linkMorePokemon:"Meer Pokemon",
        pokemonType:"Pokemon type",
        standardInformation: "Standaard informatie",
        baseExperience: "Basis ervaring",
        height: "Hoogte",
        weight: "Gewicht",
        navigate_to: "navigatie starten",
        myProfile: "Mijn Profiel",
        catchedPokemon: "Gevangen Pokemon",
        fullName: "Volledige Naam: ",
        inYourNeighbourhood: "is in de buurt. Gooi je telefoon om hem te vangen!",
        addedToInventory : "toegevoegd aan je verzameling"
    }

    this.updatePreferredLanguage = function(language) {
        ctrl.language = language;
        switch(language) {
            case "en":
                ctrl.str = english;
                break;
            case "nl":
                ctrl.str = dutch;
                break;
        }
    };

    this.setLanguage = function() {
        if(navigator.globalization) {
            navigator.globalization.getPreferredLanguage(function(language) {
                var arr = language.value.split("-");
                ctrl.updatePreferredLanguage(arr[0]);
            },function() {});

        } else if(window.navigator.language){
            var arr = window.navigator.language.split("-");
            ctrl.updatePreferredLanguage(arr[0]);
        } else {
            alert("globalization is null");
            ctrl.updatePreferredLanguage("en");
        }
    };
});