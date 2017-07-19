			function MassiveText(textArray, size, width)
			{          
				var textGeo;	
				var textMaterial;
				var textObject;
				var textMesh1;
				var event = new Event("effectEnd");
				var t;
				var kerroin = 1;
				var glitched = false;
                var light;
				
				this.start = function()
				{
                    renderer.setClearColor(0x000000, 1.0);
                    
                    camera.position.z = 0;
                    camera.position.x = 0;
                    camera.position.y = 0;
                
                    light = new THREE.SpotLight();
                    light.castShadow = true;
                    light.position.set(500, 0, -100);
                    scene.add(light);
                
					textGeo = new THREE.TextGeometry(textArray, { size: size, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
					textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
					textObject = new THREE.Object3D();
					textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
					textMesh1.position.x = 0;
					textMesh1.position.y = -20;
					textMesh1.position.z = 0;

					textMesh1.rotation.x = 0;
					textMesh1.rotation.y = 0;

					textObject.add( textMesh1 );
					
					textObject.position.y = 0;
					textObject.position.x = 76;
					textObject.position.z = -100;
					scene.add( textObject );
				}
								
				this.animate = function(glitch) {
					if (typeof glitch === 'undefined') {
						textObject.position.x = textObject.position.x-1;
					}
					else if (glitch == true) {
						textObject.position.x = textObject.position.x-(2*kerroin/1);						
					}
					else {
						textObject.position.x = textObject.position.x+(2*kerroin/1);
					}
					
					if(textObject.position.x < -850 & !glitched) { document.dispatchEvent(new Event("glitch")); glitched=true}
					if(textObject.position.x<(-width)) //Should be but according to the width of the text
					{
						document.dispatchEvent(event);	
						return;
					}
				}
				
				this.delete = function () {scene.remove(textObject); scene.remove(light);}
			}