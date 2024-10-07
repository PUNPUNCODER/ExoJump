document.getElementById('try-again').addEventListener('click', function() {
    console.log('Try Again clicked');
    //reinciar juego
    window.location.href = 'game.html'; 
});

document.getElementById('back-to-menu').addEventListener('click', function() {
    console.log('Back to Main Menu clicked');
    
    window.location.href = 'index.html'; 
});
