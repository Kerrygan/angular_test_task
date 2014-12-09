var notesApp = angular.module('notesModule', ['toastModule']);

notesApp.controller("notesCtrl", ['$http','$scope', function($http, $scope){
    var notes = this;
    notes.note = [];
    notes.host = "http://localhost:3000";
    notes.messenger = {};

    $http.get(notes.host+'/note/get').success(function(data){
        notes.note = data;
        notes.messenger.showMessage("All notes successfully retrieved!");
    }).error(function(status){
        notes.messenger.showErrorMessage("Notes aren't retrieved!");
    });

    this.setMessenger = function (obj){
        notes.messenger = obj;
    }

    this.getNewItemId = function(){
       $http.get(notes.host+'/note/newItem').success(function(newItem){
           notes.note.items.push(newItem);
           notes.messenger.showMessage("New note item created!");
       }).error(function(status){
           notes.messenger.showErrorMessage("New item isn't created!");
       });
    };

    this.updateItemIsDone = function(id, isDone) {
        var request=notes.host+'/note/'+id+'/updateItemIsDone';
        $http.post(request,"isDone="+isDone,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(item){
            $("li[data-id="+id+"] input[type='text']").toggleClass('item-done');
            notes.messenger.showMessage("Item status was updated to "+ (isDone ? 'done' : 'not done'));
        }).error(function(status){
            notes.messenger.showErrorMessage("Error during item status update");
        });
    };

    this.updateTitle = function(title){
        $http.post(notes.host+'/note/updateTitle',"value="+title,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(){
            notes.messenger.showMessage("List title was updated");
        }).error(function(status){
                notes.messenger.showErrorMessage("Error during list title update");
        });
    };

    this.updateItem = function(id, value){
        var request=notes.host+'/note/'+id+'/updateItem';
        $http.post(request,"value="+value,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(){
             notes.messenger.showMessage("Item title was updated");
        }).error(function(status){
                notes.messenger.showErrorMessage("Error during item title update");
        });
    };

    this.deleteItem = function(id){
        var request=notes.host+'/note/'+id+'/delete';
        $http.post(request).success(function(){
            notes.note.items.splice(notes.getItemIndexById(id,notes.note.items),1);
            notes.messenger.showMessage("Item was deleted");
        }).error(function(status){
            notes.messenger.showErrorMessage("Error!!!");
        });
    };

    this.updateColor = function(color){
        $http.post(notes.host+'/note/updateColor',"color="+color,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(){
            notes.note.color = color;
            notes.messenger.showMessage("Color was updated");
        }).error(function(status){
            notes.messenger.showErrorMessage("Error during color update");
        });
    };

    this.getItemIndexById = function(id, arr) {
        var i,
            isFound = false;
        for (i = 0; i < arr.length && !isFound; i++) {
            if (arr[i].id === id) {
                isFound = true;
            }
        }
        if (isFound) {
            return i - 1;
        } else {
            return -1;
        }
    };

}]);