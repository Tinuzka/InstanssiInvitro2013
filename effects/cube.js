//Makes a moving cube
			function kuutio(){
				var litCube;
				var t;
				var startTime;

				this.start = function() {
                    //Draw a cube
					litCube = new THREE.Mesh(
						new THREE.CubeGeometry(50, 50, 50),
						new THREE.MeshLambertMaterial({color: 0xffffff}));
					litCube.position.y = 50;
					litCube.castShadow = true;
					scene.add(litCube);
					startTime = new Date().getTime();
				}

				this.delete = function() {
					scene.remove(litCube);
				}

				this.animate = function() {
					t = new Date().getTime();
                    //Move the cube
					litCube.position.y = 60-Math.sin(t/900)*25;
					litCube.position.x = Math.cos(t/600)*85;
					litCube.position.z = Math.sin(t/600)*85;
					litCube.rotation.x = t/500;
					litCube.rotation.y = t/800;
					//Stop if the effect has run enough
                    if(t>startTime+10000) 
					{
						var event = new Event("effectEnd");
						document.dispatchEvent(event); 
					}	
				}
			}