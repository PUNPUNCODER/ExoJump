// Recuperar la imagen guardada en localStorage
const savedImage = localStorage.getItem('savedImage');

    const img = new Image();
    img.src = savedImage; // Asignar la imagen guardada


// Importar Three.js
import * as THREE from '//unpkg.com/three/build/three.module.js';
import Globe from '//unpkg.com/globe.gl'; // Asegúrate de importar Globe también

// Inicializar Globe
const world = Globe({ animateIn: false })
  (document.getElementById('globeViz'))
  .globeImageUrl("savedImage") // Usar la imagen guardada como textura del globo
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');

// Configuración de auto-rotación
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.35;
