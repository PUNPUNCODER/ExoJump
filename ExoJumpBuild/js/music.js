const audio = new Audio();
audio.src = '/ExoJumpBuild/assets/MusicaFondo.mp3';
audio.type = 'audio/mp3'; // Especifica que es de tipo MP3

audio.loop = true;
audio.volume = 0.2;

// Recuperar el estado de la música y la posición desde localStorage
const musicState = localStorage.getItem('musicState');
const currentTime = localStorage.getItem('currentTime');

if (musicState === 'playing') {
    audio.currentTime = currentTime ? parseFloat(currentTime) : 0; // Restablecer al tiempo guardado
    audio.play();
} else {
    audio.pause();
}

document.addEventListener('DOMContentLoaded', () => {
    // Pedir interacción del usuario para reproducir
    document.body.addEventListener('click', () => {
        audio.play().catch(error => {
            console.log("No se puede reproducir la música automáticamente. Debes interactuar primero.");
        });
    });

    // Guardar el estado y la posición antes de salir
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicState', 'playing');
        localStorage.setItem('currentTime', audio.currentTime); // Guardar el tiempo actual
    });

    // Escuchar el evento de pausa
    audio.addEventListener('pause', () => {
        localStorage.setItem('musicState', 'paused');
        localStorage.setItem('currentTime', audio.currentTime); // Guardar el tiempo actual
    });

    // Escuchar el evento de reproducción
    audio.addEventListener('play', () => {
        localStorage.setItem('musicState', 'playing');
    });
});
