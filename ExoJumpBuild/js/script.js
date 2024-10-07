import * as THREE from '//unpkg.com/three/build/three.module.js';


window.addEventListener('resize', () => {
  const globeElement = document.getElementById('total'); //cambiar main container a 'total'
  world.width(globeElement.clientWidth).height(globeElement.clientHeight)
})

const Bases = [
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-wasp-6b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-wasp-31b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-wasp-39b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-hd189733b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-hat-p-12b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-wasp-17b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-wasp-19b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-hat-p-1b.jpg',
  '/ExoJumpBuild/images/ExoMaterials/Bases/base-hd209458b.jpg',
];

const bumps = [
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
  'blob_https___eyes.nasa.gov_1b749ce8-1b92-4c18-8fab-07d45c6257d7',
];

const Nubes = [
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-wasp-6b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-wasp-31b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-wasp-39b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-hd189733b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-hat-p-12b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-wasp-17b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-wasp-19b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-hat-p-1b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-hd209458b.png',
];

const Nubes2 = [
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail2-wasp-6b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail2-wasp-31b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-wasp-39b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail2-hd189733b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail2-hat-p-12b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail2-wasp-17b.png',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail2-wasp-19b.png',
  'null',
  '/ExoJumpBuild/images/ExoMaterials/Clouds/detail1-hd209458b.png',
];

const Velocidades = [
  0.5,  // WASP-6b
  0.8,  // WASP-31b
  1.2,  // WASP-39b
  -1.5,  // HD189733b
  1.1,  // HAT-P-12b
  -0.3,  // WASP-17b
  0.7,  // WASP-19b
  1.0,  // HAT-P-1b
  -0.9   // HD209458b
];


const atmosfera = [
  0xE67300, // WASP-6b (naranja intenso para una atmósfera cálida)
  0x99CCFF, // WASP-31b (azul claro representando nubes brillantes y dispersión de luz)
  0x6699FF, // WASP-39b (azul medio para una atmósfera más fría y brumosa)
  0x808080, // HD189733b (gris para nubes densas y tormentosas)
  0x080317, // HAT-P-12b (azul marino profundo, evocando una atmósfera densa y oscura)
  0x66B2FF, // WASP-17b (azul claro para una atmósfera tenue y dispersa)
  0xFF9933, // WASP-19b (naranja suave que evoca una atmósfera cálida y turbulenta)
  0xB0C4DE, // HAT-P-1b (azul grisáceo para una atmósfera fría y difusa)
  0x99CCFF, // HD209458b (azul muy claro, sugiriendo nubes finas y dispersión de luz)
];



var selector = 0;
var clouds, clouds2;
const cloudGroup = new THREE.Group();

 const world = Globe()
      .globeImageUrl('https://i.ibb.co/h94JBXy/saturn3-ljge5g.jpg')
      .bumpImageUrl(null)
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      (document.getElementById('globeViz'));

    // Configuración de luces
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz blanca, intensidad 1
    directionalLight.position.set(2, 1, 1).normalize(); // Posición de la luz
    world.scene().add(directionalLight); // Agrega la luz direccional a la escena

    const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiental
    world.scene().add(ambientLight); // Agrega la luz ambiental a la escena

    // Continuar con tu código...
    function createAtmosphere() {
      const atmosphereGeometry = new THREE.SphereGeometry(world.getGlobeRadius() * (1 + 0.009), 75, 75);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: atmosfera[selector],
        transparent: true,
        opacity: 0.2,
        depthWrite: false
      });

      const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      cloudGroup.add(atmosphereMesh);
    }









    
function loadClouds() {
  cloudGroup.clear();

  new THREE.TextureLoader().load(Nubes[selector], cloudsTexture => {
    clouds = new THREE.Mesh(
      new THREE.SphereGeometry(world.getGlobeRadius() * (1 + 0.004), 75, 75),
      new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true, depthWrite: false })
    );
    cloudGroup.add(clouds);
    rotateClouds(clouds);
  });

  new THREE.TextureLoader().load(Nubes2[selector], cloudsTexture2 => {
    clouds2 = new THREE.Mesh(
      new THREE.SphereGeometry(world.getGlobeRadius() * (1 + 0.004 + 0.002), 75, 75),
      new THREE.MeshPhongMaterial({ map: cloudsTexture2, transparent: true, depthWrite: false })
    );
    cloudGroup.add(clouds2);
    rotateClouds(clouds2);
  });

  world.scene().add(cloudGroup);
  createAtmosphere();
}

function rotateClouds(cloudsMesh, direction = 1) {
  (function rotate() {
    cloudsMesh.rotation.y += .02 * direction * Math.PI / 180;
    requestAnimationFrame(rotate);
  })();
}

// Inicializa los botones
const buttons = [
  'WASP-6b',
  'WASP-31b',
  'WASP-39b',
  'HD189733b',
  'HAT-P-12b',
  'WASP-17b',
  'WASP-19b',
  'HAT-P-1b',
  'HD209458b'
];

let rotationSpeed = Velocidades[selector]; // Initial rotation speed
buttons.forEach((id, index) => {
  document.getElementById(id).addEventListener('click', function() {
    selector = index;
    world.globeImageUrl(Bases[selector]);
    world.bumpImageUrl(bumps[selector]);
    rotationSpeed = Velocidades[selector]; // Set the rotation speed based on the selected planet
    loadClouds();
    world.controls().autoRotateSpeed = rotationSpeed; // Update the auto rotate speed
  });
});

// Cargar nubes inicialmente
loadClouds();

let toggleState = true; // Estado inicial
world.controls().autoRotate = toggleState;
world.controls().autoRotateSpeed = rotationSpeed;

document.getElementById('AutoRotate').addEventListener('click', function() {
    toggleState = !toggleState; // Cambiar el estado
    console.log(toggleState); // Muestra el estado en la consola (opcional)
    world.controls().autoRotate = toggleState; // Actualiza el autoRotate
});

document.getElementById('speedSlider').addEventListener('input', function() {
  rotationSpeed = parseFloat(this.value); // Obtener el valor actual del slider
  world.controls().autoRotateSpeed = rotationSpeed; // Actualiza la velocidad de rotación
  console.log("Velocidad de rotación:", rotationSpeed); // Muestra la velocidad en la consola
});


// Selecciona el elemento del título
const planetTitle = document.getElementById('planet-title');

// Función para actualizar el título
function updatePlanetTitle(planetName) {
    planetTitle.textContent = planetName; // Cambia el texto del título
}

//Escondiendo el panel de detalles para cada planeta y mostrandolo despues de elegir un planeta
const button = document.getElementById('botones-planetas'); //Referencia al boton que activara la funcionalidad
const details = document.getElementById('item-details') //Referencia al elemento a mostrar

button.addEventListener('click', () => {
  if(details.style.display === 'none' || details.style.display === ''){
    details.style.display = 'grid';
  }
})


// Añade eventos a los botones de planetas
document.getElementById('WASP-6b').addEventListener('click', () => updatePlanetTitle('WASP-6b'));
document.getElementById('WASP-31b').addEventListener('click', () => updatePlanetTitle('WASP-31b'));
document.getElementById('WASP-39b').addEventListener('click', () => updatePlanetTitle('WASP-39b'));
document.getElementById('HD189733b').addEventListener('click', () => updatePlanetTitle('HD189733b'));
document.getElementById('HAT-P-12b').addEventListener('click', () => updatePlanetTitle('HAT-P-12b'));
document.getElementById('WASP-17b').addEventListener('click', () => updatePlanetTitle('WASP-17b'));
document.getElementById('WASP-19b').addEventListener('click', () => updatePlanetTitle('WASP-19b'));
document.getElementById('HAT-P-1b').addEventListener('click', () => updatePlanetTitle('HAT-P-1b'));
document.getElementById('HD209458b').addEventListener('click', () => updatePlanetTitle('HD209458b'));


// Array de descripciones de los planetas
const planetDescriptions = [
  "WASP-6b is scorching hot and has a dense atmosphere filled with tiny particles and scattered clouds. Despite having only about one-third of Jupiter's mass, its radius is nearly the same, making it unusually large for its weight. The thick atmosphere might play a role in its size, trapping heat and gases, which keeps the planet puffed up. Scientists are intrigued by this strange combination of light mass and large size, making it a unique world to study.",
  'WASP-31b is a massive gas planet, even larger than our Sun! Its bright clouds reflect a lot of light, making it one of the most reflective planets we know of. These clouds are made up of special particles that scatter starlight, giving the planet a glowing appearance. Being such a giant, it’s a fascinating target for scientists trying to understand how these distant, gas-filled worlds form and evolve.',
  'WASP-39b was the first one ever studied by the powerful James Webb Space Telescope! Its atmosphere is like a swirling fog, making it mysterious and hard to see clearly. The blue color comes from its special gases that reflect starlight in a unique way. Scientists are fascinated by it because they think its hazy atmosphere might hold clues about what these distant worlds are really like.',
  "HD 189733b is a wild planet with powerful storms and thick, gray clouds. But what makes it really amazing is its weather—it rains glass! Winds on this planet blow at incredible speeds, making tiny glass particles whip through the air like a storm of sharp crystals. It's a dangerous and extreme world, very different from anything we see on Earth!",
  "HAT-P-12b is a mysterious planet with a thick, dark atmosphere, making it really hard to see directly. Its atmosphere blocks out most of the light, keeping it hidden from view. What’s really cool is that its official name, 'Puli,' comes from a breed of Hungarian dogs! Scientists are still working to uncover the secrets of this shadowy world, but its dense atmosphere makes it a real challenge to study.",
  'WASP-17b is one of the largest exoplanets ever discovered! Its atmosphere is thin and clear, letting lots of light pass through. But here’s something really cool—this planet orbits its star backwards! Most planets orbit in the same direction that their star spins, but WASP-17b moves the other way, making it a rare and fascinating world for scientists to study.',
  'WASP-19b is a blazing hot planet with a turbulent, swirling atmosphere. What’s incredible is how fast it moves—it takes less than a single day to orbit around its star! Imagine a year flying by in just 18 hours. Its close orbit to the star makes it superheated, creating wild storms in its thick atmosphere. This makes WASP-19b a fast and furious world that scientists love to explore.',
  'HAT-P-1b has a cold and diffuse atmosphere that scatters light in a soft, gentle way, giving it a faint glow. But here’s something curious—this planet is much puffier than expected! Even though it’s about the size of Jupiter, it’s surprisingly lightweight, almost like a big balloon floating in space. Scientists are still trying to figure out why it’s so puffed up, making it a mystery in the galaxy.',
  'HD 209458b is one of the first exoplanets ever discovered, and it has a clear, bluish atmosphere. But here’s an amazing detail—it’s one of the few planets where scientists have actually observed its atmosphere escaping into space! The intense heat from its nearby star is causing gases to stream off the planet like a long tail, almost like a comet. This makes HD 209458b a trailblazer in exoplanet studies and a true wonder to explore!'
];

const planetRadiusArr = [
  "1.03x Jupiters",
  "1.549x Jupiters",
  "1.27x Jupiters",
  "1.13x Jupiters",
  "0.959x Jupiters",
  "1.87x Jupiters",
  "1.415x Jupiters",
  "1.319x Jupiters",
  "1.39x Jupiters"
];

const planetTypeArr = [
  "Gas Giant",
  "Gas Giant",
  "Gas Giant",
  "Gas Giant",
  "Gas Giant",
  "Gas Giant",
  "Gas Giant",
  "Gas Giant",
];

const discoveryMethodArr = [
  "Transit",
  "Transit",
  "Transit",
  "Radial Velocity",
  "Transit",
  "Transit",
  "Transit",
  "Radial Velocity",
  "Radial Velocity",
];

const planetMassArr = [
  "0.37 Jupiters",
  "0.478 Jupiters",
  "0.28 Jupiters",
  "1.13 Jupiters",
  "0.211 Jupiters",
  "0.78 Jupiters",
  "1.154 Jupiters",
  "0.73 Jupiters",
  "0.73 Jupiters"
];

const discoveryDateArr = [
  "2009",
  "2010",
  "2011",
  "2005",
  "2009",
  "2009",
  "2009",
  "2006",
  "1999"
];

const orbitalRadiusArr = [
  "0.04217 AU",
  "0.04659 AU",
  "0.0486 AU",
  "0.03126 AU",
  "0.0384 AU",
  "0.0515 AU",
  "0.01652 AU",
  "0.05561 AU",
  "0.04707 AU"
];

const orbitalPeriodArr = [
  "3.4 days",
  "3.4 days",
  "4.1 days",
  "2.2 days",
  "3.2 days",
  "0.8 days",
  "0.8 days",
  "4.5 days",
  "3.5 days"
];
const eccentricityArr = [
  "0.05",
  "0.0",
  "0.0",
  "0.0",
  "0.0",
  "0.01",
  "0.01",
  "0.0",
  "0.0"
];


// Selecciona el elemento para la descripción
const planetDescriptionElement = document.querySelector('.informacion p');

const planetRadius = document.querySelector('#planet-radius p');
const planetType = document.querySelector('#planet-type p');
const discoveryMethod = document.querySelector('#discovery-method p');
const planetMass = document.querySelector('#planet-mass p');
const discoveryDate = document.querySelector('#discovery-date p');
const orbitalRadius = document.querySelector('#orbital-radius p');
const orbitalPeriod = document.querySelector('#orbital-period p');
const eccentricity = document.querySelector('#eccentricity p');


 

// Función para actualizar la descripción del planeta
function updatePlanetDescription(description) {
  planetDescriptionElement.textContent = description; // Cambia el texto de la descripción
}

function updatePlanetRadius(text){
  planetRadius.textContent = text;
}

function updatePlanetType(text){
  planetType.textContent = text;
}

function updateDiscoveryMethod(text){
  discoveryMethod.textContent = text;
}

function updatePlanetMass(text){
  planetMass.textContent = text;
}

function updateDiscoveryDate(text){
  discoveryDate.textContent = text;
}

function updateOrbitalRadius(text){
  orbitalRadius.textContent = text;
}

function updateOrbitalPeriod(text){
  orbitalPeriod.textContent = text;
}

function updateEccentricity(text){
  eccentricity.textContent = text;
}



// Añade eventos a los botones de planetas para cambiar la descripción
document.getElementById('WASP-6b').addEventListener('click',    () => {
  updatePlanetDescription(planetDescriptions[0]),
  updatePlanetRadius(planetRadiusArr[0]),
  updatePlanetType(planetTypeArr[0]),
  updateDiscoveryMethod(discoveryMethodArr[0]),
  updatePlanetMass(planetMassArr[0]),
  updateDiscoveryDate(discoveryDateArr[0]),
  updateOrbitalRadius(orbitalRadiusArr[0]),
  updateOrbitalPeriod(orbitalPeriodArr[0]),
  updateEccentricity(eccentricityArr[0])
});

document.getElementById('WASP-31b').addEventListener('click',   () => {
  updatePlanetDescription(planetDescriptions[1]);
  updatePlanetRadius(planetRadiusArr[1]);
  updatePlanetType(planetTypeArr[1]);
  updateDiscoveryMethod(discoveryMethodArr[1]);
  updatePlanetMass(planetMassArr[1]);
  updateDiscoveryDate(discoveryDateArr[1]);
  updateOrbitalRadius(orbitalRadiusArr[1]);
  updateOrbitalPeriod(orbitalPeriodArr[1]);
  updateEccentricity(eccentricityArr[1]);
});

document.getElementById('WASP-39b').addEventListener('click',   () => {
  updatePlanetDescription(planetDescriptions[2]);
  updatePlanetRadius(planetRadiusArr[2]);
  updatePlanetType(planetTypeArr[2]);
  updateDiscoveryMethod(discoveryMethodArr[2]);
  updatePlanetMass(planetMassArr[2]);
  updateDiscoveryDate(discoveryDateArr[2]);
  updateOrbitalRadius(orbitalRadiusArr[2]);
  updateOrbitalPeriod(orbitalPeriodArr[2]);
  updateEccentricity(eccentricityArr[2])
});

document.getElementById('HD189733b').addEventListener('click',  () => {
  updatePlanetDescription(planetDescriptions[3]);
  updatePlanetRadius(planetRadiusArr[3]);
  updatePlanetType(planetTypeArr[3]);
  updateDiscoveryMethod(discoveryMethodArr[3]);
  updatePlanetMass(planetMassArr[3]);
  updateDiscoveryDate(discoveryDateArr[3]);
  updateOrbitalRadius(orbitalRadiusArr[3]);
  updateOrbitalPeriod(orbitalPeriodArr[3]);
  updateEccentricity(eccentricityArr[3]);
});

document.getElementById('HAT-P-12b').addEventListener('click',  () => {
  updatePlanetDescription(planetDescriptions[4]);
  updatePlanetRadius(planetRadiusArr[4]);
  updatePlanetType(planetTypeArr[4]);
  updateDiscoveryMethod(discoveryMethodArr[4]);
  updatePlanetMass(planetMassArr[4]);
  updateDiscoveryDate(discoveryDateArr[4]);
  updateOrbitalRadius(orbitalRadiusArr[4]);
  updateOrbitalPeriod(orbitalPeriodArr[4]);
  updateEccentricity(eccentricityArr[4]);
});

document.getElementById('WASP-17b').addEventListener('click',   () => {
  updatePlanetDescription(planetDescriptions[5]);
  updatePlanetRadius(planetRadiusArr[5]);
  updatePlanetType(planetTypeArr[5]);
  updateDiscoveryMethod(discoveryMethodArr[5]);
  updatePlanetMass(planetMassArr[5]);
  updateDiscoveryDate(discoveryDateArr[5]);
  updateOrbitalRadius(orbitalRadiusArr[5]);
  updateOrbitalPeriod(orbitalPeriodArr[5]);
  updateEccentricity(eccentricityArr[5]);
});

document.getElementById('WASP-19b').addEventListener('click',   () => {
  updatePlanetDescription(planetDescriptions[6]);
  updatePlanetRadius(planetRadiusArr[6]);
  updatePlanetType(planetTypeArr[6]);
  updateDiscoveryMethod(discoveryMethodArr[6]);
  updatePlanetMass(planetMassArr[6]);
  updateDiscoveryDate(discoveryDateArr[6]);
  updateOrbitalRadius(orbitalRadiusArr[6]);
  updateOrbitalPeriod(orbitalPeriodArr[6]);
  updateEccentricity(eccentricityArr[6]);
});

document.getElementById('HAT-P-1b').addEventListener('click',   () => {
  updatePlanetDescription(planetDescriptions[7]);
  updatePlanetRadius(planetRadiusArr[7]);
  updatePlanetType(planetTypeArr[7]);
  updateDiscoveryMethod(discoveryMethodArr[7]);
  updatePlanetMass(planetMassArr[7]);
  updateDiscoveryDate(discoveryDateArr[7]);
  updateOrbitalRadius(orbitalRadiusArr[7]);
  updateOrbitalPeriod(orbitalPeriodArr[7]);
  updateEccentricity(eccentricityArr[7]);
});

document.getElementById('HD209458b').addEventListener('click',  () => {
  updatePlanetDescription(planetDescriptions[8]);
  updatePlanetRadius(planetRadiusArr[8]);
  updatePlanetType(planetTypeArr[8]);
  updateDiscoveryMethod(discoveryMethodArr[8]);
  updatePlanetMass(planetMassArr[8]);
  updateDiscoveryDate(discoveryDateArr[8]);
  updateOrbitalRadius(orbitalRadiusArr[8]);
  updateOrbitalPeriod(orbitalPeriodArr[8]);
  updateEccentricity(eccentricityArr[8]);
});


let isSpeaking = false; // Variable para rastrear el estado del discurso
let currentUtterance; // Variable para almacenar la instancia actual de SpeechSynthesisUtterance

document.getElementById('speakButton').addEventListener('click', function() {
    // Si ya está hablando, detén la reproducción
    if (isSpeaking) {
        speechSynthesis.cancel(); // Detiene cualquier discurso en reproducción
        isSpeaking = false; // Actualiza el estado
        return; // Sal de la función
    }

    // Crea una cadena con todos los datos del planeta
    const fullPlanetInfo = `
      Description: ${planetDescriptionElement.textContent}.
      Radius: ${planetRadius.textContent}.
      Type: ${planetType.textContent}.
      Discovery Method: ${discoveryMethod.textContent}.
      Mass: ${planetMass.textContent}.
      Discovery Date: ${discoveryDate.textContent}.
      Orbital Radius: ${orbitalRadius.textContent}.
      Orbital Period: ${orbitalPeriod.textContent}.
      Eccentricity: ${eccentricity.textContent}.
    `;

    // Crea una nueva instancia de SpeechSynthesisUtterance
    currentUtterance = new SpeechSynthesisUtterance(fullPlanetInfo);

    // Opcional: Configurar la voz y el volumen
    currentUtterance.voice = speechSynthesis.getVoices()[0]; // Primer voz disponible
    currentUtterance.volume = 1; // Valor entre 0 y 1
    currentUtterance.rate = 1; // Velocidad entre 0.1 y 10
    currentUtterance.pitch = 1; // Tono entre 0 y 2

    // Reproducir el texto
    speechSynthesis.speak(currentUtterance);
    isSpeaking = true; // Actualiza el estado

    // Evento para cambiar el estado cuando termine el discurso
    currentUtterance.onend = function() {
        isSpeaking = false; // Actualiza el estado cuando termina
    };
});
