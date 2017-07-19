//Blindness text with fading
function blindness() {
	var textGeo;	
	var textMaterial;
	var textObject;
	var textMesh1;
	var t;
	var start;
	var last;
	var tog = false;
	var event = new Event("effectEnd");
	var lightt;
	var clearc = 0xffffff;
	
	this.start = function() {
		lightt = new THREE.SpotLight();
		lightt.castShadow = true;
		lightt.position.set( 0, 0, 160 );
		scene.add(light);

		renderer.setClearColor(clearc, 1);
		textGeo = new THREE.TextGeometry('BLINDNESS', { size: 30, height: 5, curveSegments: 20, font: "helvetiker", weight: "normal", style: "normal" });
		textMaterial = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: false } );
		textObject = new THREE.Object3D();
		textMesh1 = new THREE.Mesh( textGeo, textMaterial );
		
		textMesh1.position.x = 0;
		textMesh1.position.y = -20;
		textMesh1.position.z = 0;

		textMesh1.rotation.x = 0;
		textMesh1.rotation.y = 0;

		textObject.add( textMesh1 );
		
		textObject.position.y = 0;
		textObject.position.x = -90;
		textObject.position.z = -300;
		scene.add( textObject );
		start = new Date().getTime();
		last = start;
		camera.position.z = 0;
		camera.position.x = 0;
		camera.position.y = 0;
		camera.lookAt(textObject.position);
	}
	
	this.delete = function() {
		scene.remove(textObject);
		scene.remove(lightt);
	}
	
	this.animate = function() {
		t = new Date().getTime();	
		if (t > last+1) {
			clearc -= 0x020202;
			renderer.setClearColor(clearc);
			last = t;
		}
		if (clearc <= 0x030303) {
			document.dispatchEvent(event);
			return;
		}
	}
}