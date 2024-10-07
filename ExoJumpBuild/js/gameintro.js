const texts = [
    {
        content: "In the not-so-distant future, humanity has made extraordinary technological advances, but also faces unprecedented challenges... With Earth in crisis, our only hope lies in the exploration of deep space. Scientists have detected an intriguing exoplanet: a nearby Hot Jupiter, which orbits its star at a very short distance. A world that hides secrets, but also dangers.",
        background: "url('/ExoJumpBuild/images/Logos/gameintro.jpg')", 
    },
    {
        content: "Your mission is ambitious: to travel to the nearest Hot Jupiter to Earth to gather valuable data and uncover the secrets of this strange world. Although it is uninhabitable, its dense, warm atmosphere hosts unique phenomena that could reveal new opportunities... for research and the survival of humanity.",
        background: "url('path/to/your/background2.jpg')", 
    },
    {
        content: "However, the journey to the Hot Jupiter is fraught with dangers... You will need to demonstrate your piloting skills and destroy these obstacles to reach your destination. Each meteorite you destroy will bring you closer to your goal and allow you to collect data that could change the course of the future.",
        background: "url('path/to/your/background3.jpg')", 
    },
    {
        content: "Stay calm, act swiftly, and remember: humanity is counting on you to unravel the mysteries of this intriguing Hot Jupiter...",
        background: "url('path/to/your/background4.jpg')", 
    }
];

const textContainer = document.getElementById("welcomeText");
const continueTextContainer = document.getElementById("continueText");

let currentIndex = 0;
let typingInterval; // Intervalo para la escritura

function showSlide() {
    // Cambia el fondo
    document.body.style.backgroundImage = texts[currentIndex].background;
    
    // Limpia el contenedor de texto
    textContainer.innerHTML = ""; 
    continueTextContainer.style.opacity = "0"; // Oculta el texto de continuación

    // Reinicia el índice de escritura
    let index = 0;
    const welcomeText = texts[currentIndex].content;

    function typeText() {
        if (index < welcomeText.length) {
            textContainer.innerHTML += welcomeText.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval); // Detiene la escritura
            continueTextContainer.innerHTML = "Click to Continue"; // Muestra el texto de continuación
            continueTextContainer.style.opacity = "1"; // Hacer visible el texto de continuación
        }
    }

    // Comienza a escribir el texto
    typingInterval = setInterval(typeText, 50); // Velocidad de escritura
}

// Muestra la primera diapositiva al cargar
window.addEventListener("load", () => {
    showSlide();
});

// Avanza al siguiente texto al hacer clic en cualquier parte de la pantalla
document.body.addEventListener('click', function() {
    if (currentIndex < texts.length - 1) {
        currentIndex++;
        clearInterval(typingInterval); // Detiene la escritura actual
        showSlide();
    } else {
        window.location.href = "game.html"; 
    }
});
