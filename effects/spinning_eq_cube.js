function sEqCube(length) {
    var barGraph;
    var t;
    var startTime;
    var grid;
    var max;
    var last;
    var asdf = true;
    var down = false;
    var light;
    var ambientLight;

    this.start = function () {
        renderer.setClearColor(0x000000, 1.0);

        light = new THREE.SpotLight();
        light.castShadow = true;
        light.position.set(-170, 300, 100);
        //scene.add(light);

        ambientLight = new THREE.PointLight(0x442255);
        ambientLight.position.set(20, 150, -120);
        scene.add(ambientLight);

        last = new Date().getTime();
        startTime = new Date().getTime();

        grid = [];
        for (var y = 0; y < 9; y++) {
            grid[y] = [];
            for (var x = 0; x < 9; x++) {
                grid[y][x] = 10 + Math.random() * (15);
            }
        }

        max = grid.reduce(function (s, i) {
            return Math.max(s, Math.max.apply(null, i));
        }, grid[0][0]);

        barGraph = new THREE.Object3D();
        scene.add(barGraph);
        barGraph.position.z = -500;
        barGraph.position.x = 0;

        for (var j = 0; j < grid.length; j++) {
            var array = grid[j];
            for (var i = 0; i < array.length; i++) {
                var mat = new THREE.MeshLambertMaterial({
                    color: 0xFFAA55
                });
                var barHeight = array[i] + 20;

                mat.color.setHSL(0.2 + 0.8 * array[i] / max, 0.8, 1);
                var geo = new THREE.CubeGeometry(8, barHeight, 8);
                var mesh = new THREE.Mesh(geo, mat);
                mesh.position.x = (i - (array.length - 1) / 2) * 16;
                mesh.position.y = 0;
                mesh.position.z = -(j - (grid.length - 1) / 2) * 16;
                mesh.castShadow = mesh.receiveShadow = true;
                mesh.directionup = true;
                barGraph.add(mesh);
            }
        }
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0;

        camera.lookAt(scene.position);
    }

    this.delete = function () {
        scene.remove(barGraph);
    }

    this.animate = function () {
        t = new Date().getTime();
        if ((t - last) > 1 | (t - last) < 0) {
            for (var i in barGraph.children) {
                var e = barGraph.children[i];
                var s = e.scale;
                var sy2 = 0.15 * Math.random() + 0.01;

                if (!e.directionup) {
                    sy2 *= -1;
                }
                if (s.y + sy2 > 2) e.directionup = false;
                if (s.y + sy2 < 0.2) e.directionup = true;

                e.scale = new THREE.Vector3(1, s.y + sy2, 1);

                e.material.color.setHSL(0.2 + 0.9 * (s.y + sy2), 1.5, 2.9);
            }
            last = t;
        }
        barGraph.rotation.x = Math.tan(t / 3141) * 0.3;
        barGraph.rotation.y += 0.01;
        if (Math.tan(t / 3141) > 10 | Math.tan(t / 3141) < -10) {
            if (asdf) {
                renderer.setClearColor(0x000000, 1.0);
                asdf = false;
            } else {
                renderer.setClearColor(0x7777FF, 1.0);
                asdf = true;
            }
        } else renderer.setClearColor(0x000000, 1.0);
        if (t > startTime + length) {
            var event = new Event("effectEnd");
            document.dispatchEvent(event);
        }
    }
}