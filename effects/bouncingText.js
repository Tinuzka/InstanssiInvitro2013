//Bouncing text from the distans closer until it comes throug the screen
			function TextEffect(text)
			{
				//Variables for text
				var textGeo;	
				var textMaterial;
				var textObject;
				var textMesh1;
                //1 if the text is going forward and -1 if the text is going backwards
				var kerroin = 1;
				//In what distance text turns back
                var turn;
                //How long to go from the turning point to turn again
				var interval=5000;
                var ambientLight;
   
				
				this.start = function()
				{
                    renderer.setClearColor(0x000000, 1.0);
                    camera.position.z = 0;
                    camera.position.x = 0;
                    camera.position.y = 0;
                
                    //Make light
                    ambientLight = new THREE.PointLight(0xffffff);
                    ambientLight.position.set(20, 150, -120);
                    scene.add(ambientLight);
                    
                    //Make text
					textGeo = new THREE.TextGeometry(text, { size: 50, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
					textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
					textObject = new THREE.Object3D();
					textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
                    //Position the text and add to screen
					textMesh1.position.x = 0;
					textMesh1.position.y = -20;
					textMesh1.position.z = 0;
					textObject.add( textMesh1 );
					
					textObject.position.y = 0;
					textObject.position.x = -170;
					textObject.position.z = -11000;
					
                    scene.add( textObject );
					
					turn = -1500;
				}
								
				this.animate = function() {
                    //Moves the text
					textObject.position.z = textObject.position.z+(kerroin*100);
                    //Turns the moving direction of the text
					if(kerroin>0 & textObject.position.z>turn)
					{
						kerroin=kerroin*-1;
						turn = turn-(interval-1000);
						interval=interval-200;
					}
					else if (kerroin<0 & textObject.position.z<turn){
						kerroin=kerroin*-1;
						turn = turn+interval;
					}
                    
                    //End when the object goes through the screen
					if(textObject.position.z>0) 
					{
						document.dispatchEvent(new Event("effectEnd"));
						return;
					}
				}
				
                //Delete the put objects from the scene
				this.delete = function () {scene.remove(textObject); scene.remove(ambientLight);}
			}