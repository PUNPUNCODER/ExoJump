let listElements = document.querySelectorAll('.list__button--click');

listElements.forEach(listElement => {
    listElement.addEventListener('click', () => {
        
        listElement.classList.toggle('arrow'); // Alternar la clase para la rotación de la flecha

        let height = 0;
        let menu = listElement.nextElementSibling; // Selecciona el menú desplegable
        if (menu.clientHeight == 0) {
            height = menu.scrollHeight; // Ajusta la altura del menú para que se despliegue
        }

        menu.style.height = `${height}px`; // Aplica la nueva altura
    });
});
