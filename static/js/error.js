var alertOptions = {
	  title: "Oops! Something went wrong :(",
	  text: "Project Manhattan needs to be reloaded. Check your internet connection if the problem persists.",
	  type: "error",
	  showCancelButton: true,
	  confirmButtonColor: "#000",
	  confirmButtonText: "Reload",
	  closeOnConfirm: true
	};
	
var alertAction =	function(){
		location.reload();
	}

window.onerror = function (){
	swal(alertOptions, alertAction);
}