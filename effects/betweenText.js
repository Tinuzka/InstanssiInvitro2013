			function ValiTextEffect(textArray, size)
			{
				camera.position.z = 0;//500;
				camera.position.x = 0;//document.body.clientWidth/2;
				camera.position.y = 0;//document.body.clientHeight/2;

                
                var ambientLight;
				var textGeo;	
				var textMaterial;
				var textObject;
				var textMesh1;
				var event = new Event("effectEnd");
				var t;
				var kerroin = 1;
				var glitched = false;
                var i = 0;
                var textObject2;
                var korkeusvaihtelu = 10;
                             var arrayMoving;
                var luoUusi = true;
                var pituusArray = [380, 240, 150]
                var glitchStart = [2, -100]
                
                var pumppausMeniJo = false;
                var pumppauslaskuri = 1;
                var voiPumpata = false;
                var pumppausalkaa = [2, -200]; //kun indexissä (eka numero) on ensimmäisenä oleva tekstin x kohdassa (toinen numero)
				
                var pumppausKerroin = 1;
                var pumppausVali = 20;
                var pumppauskesto = pumppausVali*6;
                
				this.start = function()
				{
                
                    ambientLight = new THREE.PointLight(0x442255);
                ambientLight.position.set(0, 0, 100);
                scene.add(ambientLight);
					textGeo = new THREE.TextGeometry(textArray[i], { size: size, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
					textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
					textObject = new THREE.Object3D();
					textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
					textMesh1.position.x = 0;
					textMesh1.position.y = -20;
					textMesh1.position.z = 0;

					textMesh1.rotation.x = 0;
					textMesh1.rotation.y = 0;
                    arrayMoving = [textObject];
					textObject.add( textMesh1 );
					
					textObject.position.y = 0;
					textObject.position.x = 76;
					textObject.position.z = -100;
					scene.add( textObject );
				
					R = 0;
					i = 1;
				
				}
								
				this.animate = function(glitch) {
                t = new Date().getTime();
                        var index;
                    for(index = 0; index < arrayMoving.length; ++index)
                    {
					if (i == pumppausalkaa[0] && arrayMoving[0].position.x<pumppausalkaa[1] && !pumppausMeniJo && voiPumpata) {
                        arrayMoving[0].position.z = arrayMoving[0].position.z +3*pumppausKerroin;
                        if(pumppauslaskuri%pumppausVali == 0) {pumppausKerroin = pumppausKerroin*(-1);}
                        pumppauslaskuri++;
                        if(pumppauslaskuri>pumppauskesto)
                        pumppausMeniJo = true;
                    } else if (typeof glitch === 'undefined') {
                        
                            arrayMoving[index].position.x = arrayMoving[index].position.x-(1);
                        
						//textObject.position.x = textObject.position.x-(1/3);
					}
					else if (glitch == true) {
						arrayMoving[index].position.x = arrayMoving[index].position.x-(2*kerroin/1);	
						
					}
					else {
						arrayMoving[index].position.x = arrayMoving[index].position.x+(2*kerroin/1);
					}
                    }
					
					if(i == glitchStart[0] & voiPumpata & arrayMoving[0].position.x < glitchStart[1] & !glitched) { document.dispatchEvent(new Event("glitch")); glitched=true; }
					
                    if(arrayMoving[0].position.x<-pituusArray[i-1] && i<textArray.length && luoUusi)
                    {
                        textGeo = new THREE.TextGeometry(textArray[i], { size: size, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
                        textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
                        textObject = new THREE.Object3D();
                        textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
                        textMesh1.position.x = 0;
                        textMesh1.position.y = -20;
                        textMesh1.position.z = 0;

                        textMesh1.rotation.x = 0;
                        textMesh1.rotation.y = 0;

                        textObject.add( textMesh1 );
                        arrayMoving.push(textObject);
					
                        textObject.position.y = textObject.position.y+(korkeusvaihtelu*kerroin);//document.body.clientHeight/2;
                        textObject.position.x = 76;//document.body.clientWidth/2;
                        textObject.position.z = -100;
                        scene.add( textObject );
                        kerroin=kerroin*-1;
                        luoUusi = false;
                        i++;
                        
                    }
                    
                    if(i==textArray.length && arrayMoving.length == 1 && arrayMoving[0].position.x<(-300 ))
                        {   
                            document.dispatchEvent(event);
                            
                            return;
                            
		
                        }
                    
                    if(arrayMoving[0].position.x<(-470))
                    {
                        
                        
                        scene.remove(arrayMoving[0]);
                        arrayMoving.splice( 0, 1 );
                        luoUusi = true;
                        if(i==pumppausalkaa[0]) voiPumpata = true;
                    }
	
				 }
				
				this.delete = function () {
                var index;
                for(index = 0; index < arrayMoving.length; ++index)
                    scene.remove(arrayMoving[index]);
                scene.remove(ambientLight);    
                } 
                   
			}