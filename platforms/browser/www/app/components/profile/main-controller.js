"use strict";

angular.module("ngapp").controller("profileController", function(shared, $mdToast, data,menu, language, $state, $scope, $mdDialog){

    this.title = $state.current.title;
    $scope.menu = menu;
    $scope.lan = language;
    $scope.shared = shared;
    $scope.pictureSrc = window.localStorage['profilePicture'] || 'assets/images/add_user.png'
    $scope.pokemons = [];
    $scope.pokemonGroups = [];

    $scope.init = function() {
        getCatchedPokemon();


    }

    $scope.updateProfilePicture = function() {

        if(window.navigator.camera != undefined) {

            window.navigator.camera.getPicture(function(imageData) {
                window.localStorage['profilePicture'] = imageData;
                $scope.pictureSrc = imageData;
                $scope.$apply();
            }, function(error) {alert(error) }, { quality: 50,
                destinationType: Camera.DestinationType.FILE_URI });
        } else {
            alert("2");
            cameraError("Platform not supported");
        }
    }

    var cameraSuccess = function(imageData) {
        window.localStorage['profilePicture'] = imageData;
        $scope.pictureSrc = imageData;
        $mdToast.hide();
    }

    var cameraError = function(message) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Error getting camera app')
                .textContent('Our application was not able to start the camera app on your device!')
                .ariaLabel('Alert Dialog')
                .ok('Got it!')
        );
    }
    var getCatchedPokemon = function() {
        var count = 0;
        var group = [];
        for(var i = 0; i < shared.pokemons.length; i++) {

            if(shared.pokemons[i].catched == "true") {
                count++;
                group.push(shared.pokemons[i]);
            }

            if(count == 3) {
                count = 0;
                $scope.pokemonGroups.push(group);
                group = [];
            }
        }
    }

});