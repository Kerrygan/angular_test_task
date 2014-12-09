var toast = angular.module('toastModule', []).controller('toastCtrl', function () {

    this.showMessage = function (message) {
        $("#toast-message").removeClass("error");
        this.showToast(message);
    }

    this.showErrorMessage = function (message) {
        $("#toast-message").addClass("error");
        this.showToast(message);
    }

    this.showToast = function(message) {
        $("#toast-message").html(message);
        $("#toast-message").show();
        setTimeout(function() {
            $("#toast-message").fadeOut(1000)
        }, 3000);
    }

});
