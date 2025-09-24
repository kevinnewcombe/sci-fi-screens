const stage = document.getElementById('stage');
const svgns = "http://www.w3.org/2000/svg";
const htmlns = "http://www.w3.org/1999/xhtml";

export const randomItem = (arr) => {
  return arr[Math.floor(Math.random()*arr.length)];
}

export const randomNumber = (min, max) => {
  return  min + Math.round(Math.random() * (max - min));
}

export const randomChar = () =>{
  return String.fromCharCode(randomNumber(65, 90));
}

export const colors = {
  'white' : '#fff',
  'green' : '#0a9164',
  'offwhite': '#eee',
  'yellow': '#FFF200',
  'orange' : '#ff8630',
  'red'   : '#FF4400',
  'darkgrey' : '#222'
}

export const createElement = (name, attrs, textContent = null, parent = null) =>{
  const el = document.createElementNS(svgns, name);
  for(const [key, value] of Object.entries(attrs)){
    el.setAttribute(key, value);
  }
  if(textContent){
    el.textContent = textContent;
  }

  if(parent !== null){
    // console.log('parent', parent);
    parent.appendChild(el);
  }else{
    stage.appendChild(el);
  }
  return el;
}

export const createForeignObject = (attrs) =>{
  const el = document.createElementNS(svgns, 'foreignObject');
  for(const [key, value] of Object.entries(attrs)){
    el.setAttribute(key, value);
  }
  stage.appendChild(el);

  const child = document.createElementNS(htmlns, 'div');
  child.style = `width: 100%; height: 100%;`
  el.appendChild(child);
}

export const getRandomCoordinateInCircle = radius => {
  var angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius * Math.random();
  const y = Math.sin(angle) * radius * Math.random();
  return { x, y };
};

const degreesToRadians = (deg) =>{
  return deg * (Math.PI/180);
}
export const getPointOnCircle = (angle, center, radius)=>{
  return {
    x: center.x + radius * Math.cos(degreesToRadians(angle)),
    y: center.y + radius * Math.sin(degreesToRadians(angle))
  };
}