let renderer,
    camera,
    planet,
    moon,
    sphereBg,
    terrainGeometry,
    container = document.getElementById("canvas_container"),
    timeout_Debounce,
    frame = 0,
    cameraDx = 0.05,
    count = 0,
    t = 0;

/*   Lines values  */
let lineTotal = 1000;
let linesGeometry = new THREE.BufferGeometry();
linesGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6 * lineTotal), 3));
linesGeometry.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(2 * lineTotal), 1));
let l_positionAttr = linesGeometry.getAttribute("position");
let l_vertex_Array = linesGeometry.getAttribute("position").array;
let l_velocity_Array = linesGeometry.getAttribute("velocity").array;

init();
animate();

// Nueva variable para controlar la velocidad de escritura del texto
 // Ajusta esta variable para cambiar la velocidad del texto

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    scene.fog = new THREE.Fog("#3c1e02", 0.5, 50);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 1, 32);

    pointLight1 = new THREE.PointLight("#ffffff", 1, 0);
    pointLight1.position.set(0, 30, 30);
    scene.add(pointLight1);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    // Planet
    const texturePlanet = loader.load('https://i.ibb.co/h94JBXy/saturn3-ljge5g.jpg');
    texturePlanet.anisotropy = 16;
    const planetGeometry = new THREE.SphereBufferGeometry(10, 50, 50);
    const planetMaterial = new THREE.MeshLambertMaterial({
        map: texturePlanet,
        fog: false
    });
    planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(0, 8, -30);
    scene.add(planet);

    // Moon
    const textureMoon = loader.load('https://i.ibb.co/64zn361/moon-ndengb.jpg');
    textureMoon.anisotropy = 16;
    let moonGeometry = new THREE.SphereBufferGeometry(2, 32, 32);
    let moonMaterial = new THREE.MeshPhongMaterial({
        map: textureMoon,
        fog: false
    });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(0, 8, 0);
    scene.add(moon);

    // Sphere Background 
    const textureSphereBg = loader.load('https://i.ibb.co/JCsHJpp/stars2-qx9prz.jpg');
    textureSphereBg.anisotropy = 16;
    const geometrySphereBg = new THREE.SphereBufferGeometry(150, 32, 32);
    const materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureSphereBg,
        fog: false
    });
    sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    sphereBg.position.set(0, 50, 0);
    scene.add(sphereBg);

    // Terrain
    const textureTerrain = loader.load();
    textureTerrain.rotation = THREE.MathUtils.degToRad(5);
    terrainGeometry = new THREE.PlaneBufferGeometry(70, 70, 20, 20);
    const terrainMaterial = new THREE.MeshBasicMaterial({
        map: textureTerrain,
        fog: true
    });
    // Stars
    for (let i = 0; i < lineTotal; i++) {
        let x = THREE.MathUtils.randInt(-100, 100);
        let y = THREE.MathUtils.randInt(10, 40);
        if (x < 7 && x > -7 && y < 20) x += 14;
        let z = THREE.MathUtils.randInt(0, -300);

        l_vertex_Array[6 * i + 0] = l_vertex_Array[6 * i + 3] = x;
        l_vertex_Array[6 * i + 1] = l_vertex_Array[6 * i + 4] = y;
        l_vertex_Array[6 * i + 2] = l_vertex_Array[6 * i + 5] = z;

        l_velocity_Array[2 * i] = l_velocity_Array[2 * i + 1] = 0;
    }
    let starsMaterial = new THREE.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.5,
        fog: false
    });
    let lines = new THREE.LineSegments(linesGeometry, starsMaterial);
    linesGeometry.getAttribute("position").setUsage(THREE.DynamicDrawUsage);
    scene.add(lines);


    
    const welcomeText = "Welcome, explorer! In this app, you will embark on an exciting journey through the universe of exoplanets. Discover distant worlds, learn about the latest NASA research, and be amazed by fascinating facts. Get ready to unveil the most astonishing secrets of the cosmos while having fun and expanding your knowledge. Onward, the space adventure awaits!";
    const textContainer = document.createElement("div");
    textContainer.style.position = "absolute";
    textContainer.style.top = "50%";
    textContainer.style.left = "50%";
    textContainer.style.transform = "translate(-50%, -50%)";
    textContainer.style.color = "#FFFFFF";
    textContainer.style.fontFamily = "VCR OSD Mono";
    textContainer.style.fontSize = "24px";
    textContainer.style.textAlign = "center";
    textContainer.style.pointerEvents = "none"; // Evita que los eventos del mouse afecten al texto
    document.body.appendChild(textContainer);

    const typingSpeed = 40;
    let index = 0;

    function typeText() {
        if (index < welcomeText.length) {
            // Aquí se usa innerHTML para permitir el salto de línea
            textContainer.innerHTML += welcomeText.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed); // Velocidad de escritura (en milisegundos)
        }
        else {
            // Llama a la función `showContinueText` cuando el texto de bienvenida haya terminado
            showContinueText();
        }
    }

   
  
    function showContinueText() {
        const continueText = document.createElement("div");
        continueText.innerHTML = "Ready To Jump?";
        continueText.style.position = "absolute";
        continueText.style.top = "calc(50% + 230px)"; // Ajusta la posición según sea necesario
        continueText.style.left = "50%";
        continueText.style.transform = "translate(-50%, 0)";
        continueText.style.color = "#FFFFFF";
        continueText.style.fontFamily = "VCR OSD Mono";
        continueText.style.fontSize = "24px";
        continueText.style.pointerEvents = "none"; // Evita que los eventos del mouse afecten al texto
        document.body.appendChild(continueText);
        continueText.style.opacity = "1";
    }
    
      // Llama a la función cuando la página está completamente cargada
      window.addEventListener("load", () => {
        typeText();
    });

    // Botón que redirige al hacer clic
    document.body.addEventListener('click', function() {
        window.location.href = "index.html"; // Cambia "tu_archivo.html" por el nombre de tu archivo HTML
    });
}

function animate() {
    planet.rotation.y += 0.002;
    sphereBg.rotation.x += 0.002;
    sphereBg.rotation.y += 0.002;
    sphereBg.rotation.z += 0.002;

    // Moon Animation
    moon.rotation.y -= 0.007;
    moon.rotation.x -= 0.007;
    moon.position.x = 15 * Math.cos(t) + 0;
    moon.position.z = 20 * Math.sin(t) - 35;
    t += 0.015;

    // Stars Animation  
    for (let i = 0; i < lineTotal; i++) {
        l_velocity_Array[2 * i] += 0.0049;
        l_velocity_Array[2 * i + 1] += 0.005;

        l_vertex_Array[6 * i + 2] += l_velocity_Array[2 * i];
        l_vertex_Array[6 * i + 5] += l_velocity_Array[2 * i + 1];

        if (l_vertex_Array[6 * i + 2] > 50) {
            l_vertex_Array[6 * i + 2] = l_vertex_Array[6 * i + 5] = THREE.MathUtils.randInt(-200, 10);
            l_velocity_Array[2 * i] = 0;
            l_velocity_Array[2 * i + 1] = 0;
        }
    }

    // Camera Movement
    camera.position.x += cameraDx;
    camera.position.y = -1.2 * (1 - Math.abs(frame / 2000 - 0.5) / 0.5);
    camera.lookAt(0, 0, 0);
    frame += 8;
    if (frame > 2000) frame = 0;
    if (camera.position.x > 18) cameraDx = -cameraDx;
    if (camera.position.x < -18) cameraDx = Math.abs(cameraDx);

    l_positionAttr.needsUpdate = true;
    terrainGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

/*     Resize     */
window.addEventListener("resize", () => {
    clearTimeout(timeout_Debounce);
    timeout_Debounce = setTimeout(onWindowResize, 80);
});
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
