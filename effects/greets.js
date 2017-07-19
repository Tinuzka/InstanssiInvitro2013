//Green bouncing text on a green line
function greets(textsArray) {
	var textGeo;	
	var textMaterial;
	var textObject;
	var textMesh1;
	var t;
	var start;
	var tog = false;
	var event = new Event("effectEnd");
	var lightt;
	var line;
	var last
	var m = 1;
	var textn = 0;
	var flag = true;
	var raise = 1;
	
	this.start = function() {
		
		lightt = new THREE.SpotLight();
		lightt.position.set( 0, 0, 10 );
		//scene.add(lightt);

		renderer.setClearColor(0x000000, 1);
		
		line = new THREE.Object3D();
		scene.add(line);
		var mat = new THREE.MeshBasicMaterial({color: 0x00FF00});
		var geo = new THREE.CubeGeometry(1000, 1, 1);
		var mesh = new THREE.Mesh(geo, mat);
		mesh.position.x=0;
		mesh.position.y=0;
		mesh.position.z=0;
		line.add(mesh);
		line.position.x=0;
		line.position.y=0;
		line.position.z = -600;
		
		
		textGeo = new THREE.TextGeometry(textsArray[textn], { size: 50, height: 5, curveSegments: 20, font: "helvetiker", weight: "normal", style: "normal" });
		textMaterial = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: false } );
		textObject = new THREE.Object3D();
		textMesh1 = new THREE.Mesh( textGeo, textMaterial );
		
		textMesh1.position.x = -40;
		textMesh1.position.y = 0;
		textMesh1.position.z = 0;

		textMesh1.rotation.x = 0;
		textMesh1.rotation.y = 0;
		

		textObject.add( textMesh1 );
		textMesh1.scale.y = 0.000001;
		textObject.position.y = 0;
		textObject.position.z = -600;
		scene.add( textObject );
		//textObject.position.x = textObject.children[0].geometry.boundingSphere.radius / 2;
		camera.position.x=0;
		camera.position.y=0;
		camera.position.z=0;
		camera.lookAt(line.position);
		
		start = new Date().getTime();
		last = start;
	}
	
	this.delete = function() {
		//scene.remove(line);
		scene.remove(lightt);
		scene.remove(textObject);
	}
	
	this.animate = function() {
		t = new Date().getTime();
		if (t > last+1) {
			if (typeof textsArray[textn + 1] === 'undefined') {
				if (flag) {
					var textGeo1 = new THREE.TextGeometry("Next spring @ Jkl", { size: 50, height: 5, curveSegments: 20, font: "helvetiker", weight: "normal", style: "normal" });
					var textMaterial1 = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: false } );
					var textMesh2 = new THREE.Mesh( textGeo1, textMaterial1 );
					
					textMesh2.position.x = 0;
					textMesh2.position.y = 0;
					textMesh2.position.z = 0;

					textMesh2.rotation.x = 0;
					textMesh2.rotation.y = 0;
					textMesh2.rotation.z = 0;
					textObject.add(textMesh2);
					textObject.children[1].scale.y = 0.001;
					flag = false;
				}
					textObject.children[0].scale.y += 0.01*m;
					textObject.children[1].scale.y += 0.01*m;
					textObject.children[1].position.y -= 0.5*m;
					if (textObject.children[0].geometry.boundingSphere != null) {
						textObject.children[0].position.x = (textObject.children[0].geometry.boundingSphere.radius/1)*-1;
					}
					if (textObject.children[1].geometry.boundingSphere != null) {
						textObject.children[1].position.x = (textObject.children[1].geometry.boundingSphere.radius/1)*-1;
					}
				
				if (textObject.children[0].scale.y >= raise) {
					m *= -1;
				}
				
				if (textObject.children[0].scale.y < 0) {
					m *= -0.5;
					textObject.children[0].scale.y += 0.01*m;
					textObject.children[1].scale.y += 0.01*m;
					textObject.children[1].position.y -= 0.5*m;
					//if (Math.abs(m) <= 0.25) m = 0;
					if (raise <= 0.1) { m = 0;document.dispatchEvent(event);return;}
					raise *= 0.5;
				}
				
			}
			else {
				textObject.children[0].scale.y += 0.03*m;
				if (textObject.children[0].geometry.boundingSphere != null) {
					textObject.children[0].position.x = (textObject.children[0].geometry.boundingSphere.radius/1)*-1;
				}
				if (textObject.children[0].scale.y >= 1) {
					m *= -1;
				}
				if (textObject.children[0].scale.y <= 0.00) {
					textn++;
					if (typeof textsArray[textn] === 'undefined') {
						
						document.dispatchEvent(event);
						return;
					}
					textObject.remove(textObject.children[0]);
					textGeo = new THREE.TextGeometry(textsArray[textn], { size: 50, height: 5, curveSegments: 20, font: "helvetiker", weight: "normal", style: "normal" });
					textMaterial = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: false } );
					textMesh1 = new THREE.Mesh( textGeo, textMaterial );
					
					textMesh1.position.x = -40;
					textMesh1.position.y = 0;
					textMesh1.position.z = 0;

					textMesh1.rotation.x = 0;
					textMesh1.rotation.y = 0;
					textObject.add(textMesh1);
					textObject.children[0].scale.y = 0.001;
					m *= -1;
				}
			}
		}
		if (t > start+5000) {
			//document.dispatchEvent(event);
		}
	}
}