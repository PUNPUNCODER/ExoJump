// Mostrar la pantalla de carga después de 1.5 segundos

setTimeout(() => {
    document.querySelector('.fondo img').classList.add('fondo-desvanecer');
  
    // Redirigir a otro HTML después de un tiempo adicional (por ejemplo, 3 segundos)
    setTimeout(() => {
        window.location.href = "intropart2.html"; // Cambia "tu_archivo.html" por el nombre de tu archivo HTML
    }, 3000); // Tiempo de espera antes de la redirección (3 segundos)
  }, 1500);
  
  
  