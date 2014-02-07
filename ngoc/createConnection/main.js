window.onload() = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContexy('2d');
	var controller = new Leap.Controller();

	// connect controller
	// only happens when controller is connected
	// not when controller is connected when page loads
	controller.on( 'connect' , function(){
      console.log( 'Successfully connected.' );
    });
}