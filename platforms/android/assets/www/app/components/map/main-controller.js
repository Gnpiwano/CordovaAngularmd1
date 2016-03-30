"use strict";

angular.module("ngapp").controller("mapController", function(shared, menu, data , language, location, $state, $scope, $mdToast){
    this.title = $state.current.title;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.closestPokemon = {};
    var watchID;

    $scope.map = {
        center: { latitude: location.gps.latitude, longitude: location.gps.longitude },
        zoom: 11,
        bounds: {}
    };

    $scope.Markers = [];

    var createMapMarkers = function() {
        var M = [];
        for(var i = 0; i < shared.pokemons.length; i++) {
            if(shared.pokemons[i].longitude != null && shared.pokemons[i].latitude != null && shared.pokemons[i].catched != true ) {
                var pointer = {};
                pointer.id = i;
                pointer.latitude = shared.pokemons[i].latitude;
                pointer.longitude = shared.pokemons[i].longitude;
                pointer.icon = shared.pokemons[i].sprites.front_default;
                M.push(pointer);
            }
        }
        $scope.Markers = M;
    }



    $scope.init = function() {
        createMapMarkers();
        checkSurrounding();
    }

    var showToast = function(tekst) {

        //show toast
        $mdToast.show({
            template: '<md-toast class="md-toast">' + $scope.closestPokemon.name + " " + tekst + '</md-toast>',
            hideDelay: 120000,
            position: 'top left'
        });
    }

    var hideToast = function() {
        //hide toast
        $mdToast.hide();

        //stop acceleration watch
        if(watchID != null) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    function distance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344
        return dist
    }

    var checkSurrounding = function() {
        var margin = 30;
        setTimeout(function() {
            for(var i = 0; i < shared.pokemons.length; i++) {
                var p = shared.pokemons[i];

                //console.log("distance:", distance(p.latitude, p.longitude, location.gps.latitude, location.gps.longitude));
                //console.log(distance(p.latitude, p.longitude, location.gps.latitude, location.gps.longitude));
                if(distance(p.latitude, p.longitude, location.gps.latitude, location.gps.longitude) < margin) {

                        if($scope.closestPokemon != shared.pokemons[i]) {
                            $scope.closestPokemon = shared.pokemons[i];
                            $scope.$apply();

                            showToast( $scope.lan.str.inYourNeighbourhood );

                            //Start Accelerometer watch
                            if(navigator.accelerometer != null && watchID == null ) {
                                watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 1000 });
                            }
                        }
                        checkSurrounding();
                        return;
                }
            }
            //stop watch
            if(watchID != null) {
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
            }
            checkSurrounding();
        }, 6000);
    }

    function onSuccess(acceleration) {
        if($scope.closestPokemon != null) {

            if(acceleration.x > 10 || acceleration.y > 10 || acceleration.z > 10) {

                shared.pokemons[$scope.closestPokemon.id - 1].latitude = null;
                shared.pokemons[$scope.closestPokemon.id - 1].longitude = null;

                for(var i = 0; i < $scope.Markers.length; i++) {
                    if(($scope.closestPokemon.id - 1) == $scope.Markers[i].id) {
                        $scope.Markers.splice(i, 1);

                        $scope.$apply();
                        alert($scope.Markers.length);

                        shared.pokemons[$scope.closestPokemon.id - 1].catched = "true";
                        hideToast();
                        showToast( $scope.lan.str.addedToInventory );

                        data.updatePokemonwithId(shared.pokemons[$scope.closestPokemon.id - 1]);
                        $scope.closestPokemon = null;

                        checkSurrounding();
                        return;
                    }
                }
            }
        }
    }

    function onError() {
        alert('onError!');
    }
});