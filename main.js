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

const rainbowPalette = [
    '#e74c3c', '#e67e22' , '#f1c40f',
    '#2ecc71', '#1abc9c',
    '#3498db', '#9b59b6'
];

const canvas = document.getElementById('canvasGrid');
const palette = document.getElementById('colorPalette');
const smallbtn = document.getElementById('small');
const mediumbtn = document.getElementById('medium');
const largebtn = document.getElementById('large');
const clearbtn = document.getElementById('clear');
const rainbowModeBtn= document.getElementById('rainbowMode');
const randomModeBtn= document.getElementById('randomMode');
const eraserBtn= document.getElementById('eraser');

let mouseColor = '#2c3e50';
let rainbowCounter = 0;
let mouseDown = false;
let currentMode = 'default';
let size;

function createCanvas(value = 32){
    size = value;
    canvas.innerHTML = '';
    canvas.style.gridTemplateColumns = `repeat(${size}, auto)`;
    for(let i=1; i<= size*size; i++){
        const pixel = document.createElement('div');
        pixel.addEventListener('mousedown', drawColor);
        pixel.addEventListener('mouseenter', drawColor);
        canvas.appendChild(pixel);
    }
}

function createPalette(){
    palette.style.gridTemplateColumns = `repeat(${5}, auto)`;
    for(let i=0; i< 4*5; i++){
        const pixel = document.createElement('div');
        pixel.style.backgroundColor = `${colorPalette[i]}`;
        pixel.addEventListener('click', () => {
            setMouseColor(colorPalette[i]);
            currentMode ='default';
        });
        palette.appendChild(pixel);
    }
}

function setMouseColor(color){
    mouseColor = color;
    setHoverColor(color);
}

function setHoverColor(color){
    let style = document.createElement('style');
    let hover = `#canvasGrid div:hover { background-color: ${mouseColor} !important}`;  
    if (style.styleSheet) {
        style.styleSheet.cssText = hover;
    } else {
        style.appendChild(document.createTextNode(hover));
    }
    document.getElementsByTagName('head')[0].appendChild(style); 
}

function drawColor(e){
    if (e.type === 'mouseenter' && !mouseDown) return;
    if(currentMode == 'random'){
        e.target.style.backgroundColor = mouseColor;
        setMouseColor(getRandomColor());
    }
    else if(currentMode == 'rainbow'){
        e.target.style.backgroundColor = mouseColor;
        rainbowCounter = ++rainbowCounter%7;
        setMouseColor(rainbowPalette[rainbowCounter]);
    }
    else if(currentMode == 'eraser'){
        e.target.style.backgroundColor = mouseColor;
        console.log(mouseColor);
    }
    else e.target.style.backgroundColor = mouseColor;
}

function getRandomColor(){
    let i = Math.floor(Math.random()*20);
    return colorPalette[i];
}

smallbtn.addEventListener('click', () => createCanvas(16));
mediumbtn.addEventListener('click', () => createCanvas(32));
largebtn.addEventListener('click', () => createCanvas(64));
clearbtn.addEventListener('click',() => createCanvas(size));
eraserBtn.addEventListener('click', () =>{
    currentMode = 'eraser';
    setMouseColor('#ffffff');
});
rainbowModeBtn.addEventListener('click', () =>{
    currentMode = 'rainbow';
    rainbowCounter = 0;
    setMouseColor(rainbowPalette[0]);
});
randomModeBtn.addEventListener('click', () =>{
    currentMode = 'random';
    setMouseColor(getRandomColor);
});

window.onload = () =>{
    createCanvas();
    createPalette();
    setMouseColor(mouseColor);
}
window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);