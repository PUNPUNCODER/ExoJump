const texts = [
    {
        content: "............",
        background: "finally no use it xd", // in case we want to change it
    },
    {
        content: "After years of traveling through the void of space, something appears in the distance, barely visible among the stars. Wrapped in a turbulent atmosphere, your ship shakes as you enter orbit. The sensors are failing, and the data makes no sense.",
        background: "finally no use it xd", 
    },
    {
        content: "'ALERT: Anomaly detected. Unstable orbit.'",
        background: "finally no use it xd", 
    },
    {
        content: "The ship struggles to stabilize. Everything around you feels hostile, the atmosphere denser than expected, winds almost knocking you off course. Suddenly, a flash reveals a deep blue giant within the storm.",
        background: "finally no use it xd", 
    },
    {
        content: "............",
        background: "finally no use it xd", 
    },
    {
        content: "Finally, you realize: you've arrived at the Hot Jupiter, HD189733b. But something else is watching you from the storm... What awaits you here? Only time will tell, but it may not be friendly",
        background: "finally no use it xd", 
    },
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
        window.location.href = "backtomenugame.html"; 
    }
});
