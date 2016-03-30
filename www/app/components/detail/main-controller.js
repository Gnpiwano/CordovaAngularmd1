"use strict";

angular.module("ngapp").controller("detailController", function(shared, menu, language, location, $state, $scope, $mdDialog){
    this.title = $state.current.title;
    $scope.name = shared.info.auth;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.pokemon = shared.currentPokemon;

    $scope.init = function() {
        alert("longitude : " + $scope.pokemon.name + " - " + $scope.pokemon.longitude + " latitude : " + $scope.pokemon.latitude );
    }


    $scope.startNavigation = function() {
        if($scope.pokemon.latitude != null) {
            launchnavigator.navigate([shared.currentPokemon.latitude, shared.currentPokemon.longitude], {
                start: location.gps.latitude+","+location.gps.longitude
            });

        } else {
            errorGettingLocation();
        }
    }

    var errorGettingLocation = function() {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Error getting location')
                .textContent('Our application was not able to get the location of your device!')
                .ariaLabel('Alert Dialog')
                .ok('Got it!')
        );
    }

});