			function TextPingPong(text)
			{
				camera.position.z = 0;//500;
				camera.position.x = 0;//document.body.clientWidth/2;
				camera.position.y = 0;//document.body.clientHeight/2;
				
				 var ambientLight = new THREE.PointLight(0x442255);
				
				var R, i;
				var textGeo;	
				var textMaterial;
				var textObject;
				var textMesh1;
				var event = new Event("effectEnd");
				var t;
				var kerroin = -1;
				var start;

				
				this.start = function()
				{
                ambientLight.position.set(20, 150, -120);
					scene.add(ambientLight);
					start = new Date().getTime();
					textGeo = new THREE.TextGeometry(text, { size: 40, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
					textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
					textObject = new THREE.Object3D();
					textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
					textMesh1.position.x = 0;
					textMesh1.position.y = -20;
					textMesh1.position.z = 0;

					textMesh1.rotation.x = 0;
					textMesh1.rotation.y = 0;

					textObject.add( textMesh1 );
					
					textObject.position.y = 0;//document.body.clientHeight/2;
					textObject.position.x = -850;//document.body.clientWidth/2;
					textObject.position.z = -700;
					scene.add( textObject );
				
					R = 0;
					i = -1;
					
					
				
				}
				
				
					
				this.animate = function(glitch) {
					
					//textObject.rotation.y = Math.PI+(t/600);
					
					if (typeof glitch === 'undefined') {
						textObject.position.x = textObject.position.x-(4*kerroin);
                        textObject.position.z = textObject.position.z-1;
                        textObject.rotation.y = 1*kerroin;
					}
					else if (glitch == true) {
						textObject.position.x = textObject.position.x-(4*kerroin/1);						
					}
					else {
						textObject.position.x = textObject.position.x+(4*kerroin/1);
					}
	
					if(textObject.position.x>(920) || textObject.position.x < (-1360)) 
					{
						//textObject.position.z = textObject.position.z-100;
						//textObject.position.x = textObject.position.x-(kerroin*100);
						kerroin=kerroin*(-1);
						textObject.rotation.y = 1*kerroin;
						if(R<1)
						R=R+0.1;
						else R=0;
						textMesh1.material.color.setRGB(R,0.9,0.9);
					}	
				}
				
				this.delete = function () {scene.remove(textObject); scene.remove(ambientLight);}
			}
            
            			function kuutio(){
				var litCube;
				var t;
				var startTime;

				this.start = function() {
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
					litCube.position.y = 60-Math.sin(t/900)*25;
					litCube.position.x = Math.cos(t/600)*85;
					litCube.position.z = Math.sin(t/600)*85;
					litCube.rotation.x = t/500;
					litCube.rotation.y = t/800;
						
				}
			}