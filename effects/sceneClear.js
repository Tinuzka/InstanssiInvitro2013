//Empties the screen
function sceneClear() {
	var t;
	var start;
	
	this.start = function() {
		start = new Date().getTime();
	}
	
	this.delete = function() {
		for (var i in scene.children) {
			scene.remove(scene.children[1]);
		}
	}
	
	this.animate = function() {
		t = new Date().getTime();
		for (var i in scene.children) {
			scene.remove(scene.children[i]);
        }
		if (t - start > 100) { document.dispatchEvent(new Event("effectEnd")); }
	}
}

//Does nothing for the given time
function wait(waitTime) {
    var t;
	var start;
	
	this.start = function() {
		start = new Date().getTime();
	}
	
	this.delete = function() {
		//Nothing to delete
	}
	
	this.animate = function() {
		t = new Date().getTime();
		if (t - start > waitTime) { document.dispatchEvent(new Event("effectEnd")); }
	}
}