/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
const colorPalette = [
     '#1abc9c', '#2ecc71',
     '#3498db', '#9b59b6',
     '#34495e', '#16a085',
     '#27ae60', '#2980b9',
     '#8e44ad', '#2c3e50',
     '#f1c40f', '#e67e22',
     '#e74c3c', '#ecf0f1',
     '#95a5a6', '#f39c12',
     '#d35400', '#c0392b',
     '#bdc3c7', '#7f8c8d'
];

const canvas = document.getElementById('canvasGrid');
const palette = document.getElementById('colorPalette');
const smallbtn = document.getElementById('small');
const mediumbtn = document.getElementById('medium');
const largebtn = document.getElementById('large');
let mouseColor = '#2c3e50';

function createCanvas(size = 32){
    canvas.innerHTML = '';
    canvas.style.gridTemplateColumns = `repeat(${size}, auto)`;
    for(let i=1; i<= size*size; i++){
        const pixel = document.createElement('div');
        canvas.appendChild(pixel);
    }
}

function createPalette(){
    palette.style.gridTemplateColumns = `repeat(${5}, auto)`;
    for(let i=0; i< 4*5; i++){
        const pixel = document.createElement('div');
        pixel.style.backgroundColor = `${colorPalette[i]}`;
        palette.appendChild(pixel);
    }
}

function setMouseColor(color){
    mouseColor = color;
    let style = document.createElement('style');
    let hover = `#canvasGrid div:hover { background-color: ${mouseColor} }`;  
    if (style.styleSheet) {
        style.styleSheet.cssText = hover;
    } else {
        style.appendChild(document.createTextNode(hover));
    }
    document.getElementsByTagName('head')[0].appendChild(style); 
}

function changeColor(){

}

let allPixel = canvas.childNodes;
allPixel.forEach(pixel => {
    pixel.addEventListener('click', () => changeColor);
});

let paletteColor = palette.childNodes;
console.log(paletteColor);
paletteColor.forEach(color => {
    color.addEventListener('click', () =>{
        setMouseColor(color.style.backgroundColor);
        console.log('test');
        this.stopPropagation();
    });
});

createCanvas();
createPalette();
setMouseColor(mouseColor);

smallbtn.addEventListener('click', ()=> createCanvas(16));
mediumbtn.addEventListener('click', ()=> createCanvas(32));
largebtn.addEventListener('click', ()=> createCanvas(64));
