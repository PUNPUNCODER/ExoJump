const canvas = document.getElementById("canvas");
const body = document.querySelector('body');
canvas.height = window.innerHeight
canvas.width = window.innerWidth
var theColor = '';
var lineW = 10;
let prevX = null
let prevY = null
let draw = false

body.style.backgroundColor = "#FFFFFF";

// Cambiar el color de fondo con el botón original
var theInput = document.getElementById("favcolor");
theInput.addEventListener("input", function(){
  theColor = theInput.value;
  body.style.backgroundColor = theColor;
  // Dibujar el color de fondo en el canvas
  ctx.fillStyle = theColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height); 
}, false);

// Nuevo botón para cambiar el color de pintura
var paintColorInput = document.getElementById("paintcolor");
paintColorInput.addEventListener("input", function() {
  ctx.strokeStyle = paintColorInput.value;
});

const ctx = canvas.getContext("2d")
ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = function() {
    draw = null
    lineW = document.getElementById("ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
};  

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // Redibujar el color de fondo después de limpiar
    ctx.fillStyle = theColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let imagen = guardarDibujo();
    localStorage.setItem('savedImage', imagen); // Guardar la imagen en localStorage
    window.location.href = "ownworld.html"; // Redirigir a otra página
});

function guardarDibujo() {
    let dataURL = canvas.toDataURL(); // Obtener el Data URL del canvas con el fondo
    return dataURL; // Devolver el Data URL
}

function callSavedImage() {
  const img = new Image();
  img.src = imagen; 
  document.body.appendChild(img)
  window.location.href = "ownworld.html";
}

window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let currentX = e.clientX
    let currentY = e.clientY

    ctx.beginPath()
    ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})
