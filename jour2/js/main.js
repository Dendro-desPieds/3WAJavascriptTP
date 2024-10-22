// Un booléen qui, lorsqu'il est vrai, indique que le déplacement de
// la souris entraîne un dessin sur le canevas
let isDrawing = false;
let x = 0;
let y = 0;
let lineColor = "black";
let lineThickness = 1;

const canvas = document.querySelector("#canvas");
const colorBtns = document.querySelectorAll(".color");
const slider = document.querySelector("#lineThickness");
const removeBtn = document.querySelector("#reset");
const saveBtn = document.querySelector("#save");
const downloadLink = document.querySelector('#downloadLink');
const imgImport = document.querySelector('#import');
const context = canvas.getContext("2d");

// On récupère le décalage du canevas en x et y par rapport aux bords
// de la page
// const rect = canvas.getBoundingClientRect();

// On ajoute les gestionnaires d'évènements pour mousedown, mousemove
// et mouseup
canvas.addEventListener("mousedown", (e) => {
  x = e.clientX ;
  y = e.clientY ;
  isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX, e.clientY, lineColor, lineThickness);
    x = e.clientX ;
    y = e.clientY ;
  }
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX, e.clientY, lineColor, lineThickness);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2, curColor, lineThick) {
  context.beginPath();
  context.strokeStyle = curColor;
  context.lineWidth = lineThick;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

//On attribue un evenement qui change la couleur du tracé à tous les boutons
for (let color of colorBtns){
    color.addEventListener('click', ()=>{
        lineColor = color.style.backgroundColor;
    })
}

//On récupère la valeur du slider
slider.addEventListener('mouseup', (e)=>{
    e.preventDefault;
    lineThickness = slider.value;
})

//On reset l canva apres avoir cliquer sur le bouton
removeBtn.addEventListener('click', (e)=>{
    e.preventDefault;
    context.clearRect(0,0,canvas.width,canvas.height);
})

//BONUS: Fonction pour sauvegarder le canevas
saveBtn.addEventListener('click', ()=>{
    const dataURL = canvas.toDataURL('image/png');
    downloadLink.href = dataURL;
})


//BONUS: Importer une image
imgImport.addEventListener('change', ()=>{
    const img = new Image();
    img.src = imgImport.value;
    img.onload = ()=>{
        context.drawImage(img, 0,0, canvas.width, canvas.height);
    }
})