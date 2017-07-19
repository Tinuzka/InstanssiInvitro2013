//Text in the shape of heart. After few pump of heart, the text explodes in the different directions
function HeartAttackText()
{
    var textArray = ["demo", "music", "graphic", "summamutikka", "programmable lighting", "beginner friendly"];
    var textArrayPosition = [[0, 10], [-50, 90], [50, 90], [-30, 50], [5, -50],[110, 80]];
    var textArrayRotation = [[0, 0, 0], [-0.5, 0, 0], [-0.5, 0, 0], [-0.4, 0, 0], [0, -0.2, 2], [0, 0.2, -2]];
    var textArrayDirection = [[0,0],[-1,1],[1,1],[0,1],[-1,-1],[1,-1]];
    var textObjects = []; 
	var textGeo;	
	var textMaterial;
	var textObject;
	var textMesh1;
	var event = new Event("effectEnd");
	var t;
	var kerroin = 1;
	var startTime = 0;
    var pumppausMatka = 150;
    var alkuPaikka = -500;
    var pumppausaika = pumppausMatka*4;
    var pumppausLaskuri = 1;
    var pumppausOn = true;
    var textAttack;
                
	this.start = function()
	{
        camera.position.z = 0;
		camera.position.x = 0;
		camera.position.y = 0;
                
        renderer.setClearColor(0x000000, 1.0);
        light = new THREE.SpotLight();
        light.castShadow = false;
        light.position.set(-170, 300, 100);
        //scene.add(light);

        ambientLight = new THREE.PointLight(0xffffff);
        ambientLight.position.set(20, 150, -120);
        scene.add(ambientLight);
                    
        textGeo = new THREE.TextGeometry("HEART ATTACK", { size: 40, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
        textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
		textAttack = new THREE.Object3D();
		textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
		textMesh1.position.x = 0;
		textMesh1.position.y = 0;
		textMesh1.position.z = 0;

		textMesh1.rotation.x = 0;
		textMesh1.rotation.z =  0;
                    
		textAttack.add( textMesh1 );
					
		textAttack.position.x = -140;
		textAttack.position.y = -140;
        textAttack.position.z = -600;
		scene.add( textAttack );
                    
        startTime = new Date().getTime();
        var i;
        for(i = 0; i<textArray.length; i++){
            textGeo = new THREE.TextGeometry(textArray[i], { size: 13, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
			textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
			textObject = new THREE.Object3D();
			textMesh1 = new THREE.Mesh( textGeo, textMaterial );
				
			textMesh1.position.x = 0;
			textMesh1.position.y = 0;
			textMesh1.position.z = 0;

			textMesh1.rotation.x = textArrayRotation[i][0];
            textMesh1.rotation.y = textArrayRotation[i][1];
			textMesh1.rotation.z =  textArrayRotation[i][2];
            textMesh1.material.color.setRGB(1,0,0);
                    
			textObject.add( textMesh1 );
					
            textObjects.push(textObject);
			textObject.position.x = textArrayPosition[i][0];
			textObject.position.y = textArrayPosition[i][1];
			textObject.position.z = alkuPaikka;
			scene.add( textObject );
        }
		i = -1;
	}
								
	this.animate = function() {
        t = new Date().getTime();
        pumppausLaskuri++;
        var index;
        for(index = 0; index < textObjects.length; ++index)
        {
            textObjects[index].position.z = textObjects[index].position.z+kerroin;
            if(!pumppausOn)
            {
                textObjects[index].position.x = textObjects[index].position.x+textArrayDirection[index][0];
                textObjects[index].position.y = textObjects[index].position.y+textArrayDirection[index][1];
            }
        }
                    
        if(pumppausOn && textObjects[0].position.z > alkuPaikka+pumppausMatka || textObjects[0].position.z < alkuPaikka)
            kerroin = kerroin*-1;
                    
        if(pumppausOn && pumppausLaskuri > pumppausaika && textObjects[0].position.z > alkuPaikka+pumppausMatka)
        {
            pumppausOn = false;
            kerroin = 4;
            scene.remove(textAttack);
        } 
                   
		if(textObjects[0].position.z>0) 
		{
			var event = new Event("effectEnd");
			document.dispatchEvent(event); 
		}	
	}
				
	this.delete = function () {
        var index;
        for(index = 0; index < textObjects.length; ++index)
        {
            scene.remove(textObjects[index]);
        }
    }
}