//Epilepsy effect
function epilepsy() {
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

	this.start = function() {
		lightt = new THREE.SpotLight();
		lightt.castShadow = true;
		lightt.position.set( 0, 0, 160 );
		scene.add(light);

		renderer.setClearColor("0x000000");
		textGeo = new THREE.TextGeometry('EPILEPSY', { size: 30, height: 5, curveSegments: 20, font: "helvetiker", weight: "normal", style: "normal" });
		textMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false } );
		textObject = new THREE.Object3D();
		textMesh1 = new THREE.Mesh( textGeo, textMaterial );
		
		textMesh1.position.x = 0;
		textMesh1.position.y = -20;
		textMesh1.position.z = 0;

		textMesh1.rotation.x = 0;
		textMesh1.rotation.y = 0;

		textObject.add( textMesh1 );
		
		textObject.position.y = 0;
		textObject.position.x = -70;
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
		if (t > last+80) {
			if (tog) {
				
				textMesh1.material = new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: false } );
				renderer.setClearColor(0xFFFFFF, 1);
				textObject.position.z = -300;
				tog=false;
			}
			else {			
				
				textMesh1.material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } ); 
				renderer.setClearColor(0x000000, 1);
				textObject.position.z = -250;
				tog=true;
			}
			last = t;
		}
		if (t > start+2609) {
			document.dispatchEvent(event);
			return;
		}
	}

}