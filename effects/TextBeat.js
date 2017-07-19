			function TextBeat(textArray)
			{
				camera.position.z = 0;//500;
				camera.position.x = 0;//document.body.clientWidth/2;
				camera.position.y = 0;//document.body.clientHeight/2;
				var R, i;
				var textGeo;	
				var textMaterial;
				var textObject;
				var textMesh1;
				var event = new Event("effectEnd");
				var t;
				var kerroin = 1;
				var turn;
				var interval=10000;
				
				this.start = function()
				{
					textGeo = new THREE.TextGeometry(textArray[0], { size: 50, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
					textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
					textObject = new THREE.Object3D();
					textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
					textMesh1.position.x = 0;
					textMesh1.position.y = -20;
					textMesh1.position.z = 0;

					textMesh1.rotation.x = 0;
					textMesh1.rotation.y = 0;

					textObject.add( textMesh1 );
					
					//alert(document.body.clientWidth);
					
					textObject.position.y = 0;//document.body.clientHeight/2;
					textObject.position.x = -100;//document.body.clientWidth/2;
					textObject.position.z = -11000;
					scene.add( textObject );
					
					turn = textObject.position.z+interval;
				
					R = 0;
					i = -1;
				
				}
				
								
				this.animate = function() {
					t = new Date().getTime();
					
					
					textObject.position.z = textObject.position.z+(kerroin*100);
					if(kerroin>0 & textObject.position.z>turn)
					{
						kerroin=kerroin*-1;
						turn = turn-(interval-1000);
						interval=interval-900;
					}
					else if (kerroin<0 & textObject.position.z<turn){
						kerroin=kerroin*-1;
						turn = turn+interval;
					}
		
					if(textObject.position.z>0) 
					{
						document.dispatchEvent(event);
						
						return;
		
					}
				}
				
				this.delete = function () {scene.remove(textObject);}
			}