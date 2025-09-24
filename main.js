const stage = document.getElementById('stage');
const svgns = "http://www.w3.org/2000/svg";
const htmlns = "http://www.w3.org/1999/xhtml";
const stageWidth = 1000;
const stageHeight = 1000;
const gridPadding = 5;
const sizes = [20,40,80,160];
const randomItem = (arr) => {
  return arr[Math.floor(Math.random()*arr.length)];
}

const colors = {
  'white' : '#fff',
  'green' : '#0a9164',
  'offwhite': '#eee',
  'yellow': '#FFF200',
  'red'   : '#FF4400',
  'darkgrey' : '#222'
}
let runCount = 0;

/* ************************ */
/*                          */
/*     Helper functions     */
/*                          */
/* ************************ */

const randomNumber = (min, max) => {
  return  min + Math.round(Math.random() * (max - min));
}

const getRandomCoordinateInCircle = radius => {
  var angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius * Math.random();
  const y = Math.sin(angle) * radius * Math.random();
  return { x, y };
};

const degreesToRadians = (deg) =>{
  return deg * (Math.PI/180);
}
const getPointOnCircle = (angle, center, radius)=>{
  return {
    x: center.x + radius * Math.cos(degreesToRadians(angle)),
    y: center.y + radius * Math.sin(degreesToRadians(angle))
  };
}

const createElement = (name, attrs, textContent = null, parent = null) =>{
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
const randomChar = () =>{
  return String.fromCharCode(randomNumber(65, 90));
}

const createForeignObject = (attrs) =>{
  const el = document.createElementNS(svgns, 'foreignObject');
  for(const [key, value] of Object.entries(attrs)){
    el.setAttribute(key, value);
  }
  stage.appendChild(el);

  const child = document.createElementNS(htmlns, 'div');
  child.style = `width: 100%; height: 100%;`
  el.appendChild(child);
}

/*
 * Elements
 */

const drawMeter = (specs) =>{
  const {x,y,width, height} = specs;

  const cx = x + width / 2;
  const cy = y + height / 2;
  const r = width / 2
  
  createElement('circle', {
    cx,
    cy,
    r,
    'stroke': '#ccc',
    'stroke-width' : '1',
    fill: '#333'
  });

  // draw the markers
  const incremenets = 45;
  let angle = 0;
  while(angle < 360){
    const p1 = getPointOnCircle(angle, {x: cx,y: cy}, r - 2);
    const p2 = getPointOnCircle(angle, {x: cx,y: cy}, r- 5);
    createElement('line', {
      x1: p1.x,
      x2: p2.x,
      y1: p1.y,
      y2: p2.y,
      'stroke': '#aaa',
      'stroke-width' : '2',
    });
    angle+= incremenets;
  }
  
  angle = randomNumber(0, 360);
  const p2 = getPointOnCircle(angle, {x: cx,y: cy}, r-2);
  createElement('line', {
    x1: cx,
    x2: p2.x,
    y1: cy,
    y2: p2.y,
    'stroke': '#fff',
    'stroke-width' : '2',
  });
}

const drawRadar = (specs) =>{
  const {x,y,width,height} = specs;
  createForeignObject({
    ...specs,
    style: `--rotation:45deg`,
    class: 'radar__sweep'
  });

  for(let i=0; i<randomNumber(1,3); i++){
    const c = getRandomCoordinateInCircle(width / 2 - 6);
    createElement('circle', {
      cx: x + width / 2 + c.x,
      cy: y + width / 2 + c.y,
      r: width * 0.04,
      fill: colors.green,
      filter: 'url(#blur-0point5)'
    });  
  }
  
  createElement('use', {
    ...specs,
    'href' : '#radar__stroke',
    class: 'radar__stroke'
  });
}

const drawTextScreen = (specs) => {
  // console.log('drawTextScreen', specs);
  const {x,y,width} = specs;
  createElement('rect', {
    ...specs,
    rx: 5,
    fill: colors.green,
  });
  
  let screenWidth = width - 20;
  let remainingColumnWidth = screenWidth;
  const columnWidths = [];
  while(remainingColumnWidth > 10){
    const w = randomNumber(10, Math.min(remainingColumnWidth, screenWidth / 3) );
    remainingColumnWidth = remainingColumnWidth - w - 5;
    columnWidths.push(w);
  }

  let currentX = x+10;
  let z = 0;
  for(let i=0; i<columnWidths.length; i++){

    let currentY = y + 17;
    const cellType = randomNumber(0, 1);
    while(currentY < y + height - 15){
      let str = '';
 
      for(let j=0; j<randomNumber(Math.max(1, Math.floor(columnWidths[i] / 5.5) - 3), Math.floor(columnWidths[i] / 5.5)); j++){
        str += (cellType === 0) ? randomChar() : randomNumber(0,9);
      }
      createElement('text', {
        x: currentX,
        y: currentY
        
      }, str);

      // console.log(currentX, currentY);
      currentY += 12;
    }
    currentX += columnWidths[i]+5;
  }
}

const drawLevels = (specs) => {
  // Something like volume meters, where it's a collection of columns that go from green to yellow to red
  const {x,y,width,height} = specs;
  createElement('rect', {
    ...specs,
    rx: 5,
    fill: colors.darkgrey,
  });
  
  const maskID = `mask-levels-x${x}y${y}`;

  const mask = createElement('mask', {
    id: maskID
  });
  
  const padding = 15;
  const maskSpecs = {
    x: x+padding,
    y: y+padding,
    width: width - padding*2,
    height: height - padding*2
  }
  const gridOffset = 2;
  const legendColor = '#aaa';
  const gridLines = randomItem([4,5,10]);
  for(let i=0; i<gridLines; i++){
    lineY = maskSpecs.y+(maskSpecs.height+gridOffset) * (i+1)/gridLines;
    createElement('line', {
      x1: maskSpecs.x-gridOffset,
      x2: (i === (gridLines - 1)) ? maskSpecs.x+maskSpecs.width : maskSpecs.x-gridOffset - 3,
      y1: lineY,
      y2: lineY,
      'stroke-width' : 1,
      'vector-effect' : 'non-scaling-stroke',
      stroke: (i === (gridLines - 1)) ? legendColor : '#999'
    });

  }

  // Draw the graph lines
  createElement('line', {
    x1: maskSpecs.x-gridOffset,
    x2: maskSpecs.x-gridOffset,
    y1: maskSpecs.y,
    y2: maskSpecs.y+maskSpecs.height+gridOffset,
    'stroke-width' : 1,
    'vector-effect' : 'non-scaling-stroke',
    stroke: legendColor
  });

  // createElement('line', {
  //   x1: maskSpecs.x-gridOffset,
  //   x2: maskSpecs.x+maskSpecs.width,
  //   y1: maskSpecs.y+maskSpecs.height+gridOffset,
  //   y2: maskSpecs.y+maskSpecs.height+gridOffset,
  //   'stroke-width' : 1,
  //   'vector-effect' : 'non-scaling-stroke',
  //   stroke: legendColor
  // });


  // Draw the individual blocks for the levels mask
  const numberOfBars = randomNumber(4,8);
  const barSpacing = 3;
  const barWidth = (maskSpecs.width - (barSpacing * (numberOfBars - 1))) / numberOfBars;
  console.log(barWidth);
  const numberOfChars = Math.floor(barWidth / 7);
  for(let i=0; i<numberOfBars; i++){
    createElement('rect', {
      x: maskSpecs.x + (barWidth+barSpacing)*i,
      y: maskSpecs.y,
      y: maskSpecs.y + maskSpecs.height / (randomNumber(100, 11) / 10),
      fill: '#fff',
      width: barWidth,
      height: maskSpecs.height,
    }, null, mask);

    let str = '';
    for(let j=0; j<numberOfChars; j++){
      str+= randomChar();
    }
    createElement('text', {
      x: maskSpecs.x + (barWidth+barSpacing)*i + barWidth / 2,
      y: maskSpecs.y + maskSpecs.height + 12,        
      'text-anchor' : 'middle'
    },`${str}`);
  }



  // Draw the mask
  createElement('rect', {
    ...maskSpecs,
    mask: `url(#${maskID})`,
    fill: 'url(#Gradient2)',
  });



}

/**
 * Draw the grid
 */
const grid = [];
let columnSizes = [0];
let rowSizes = [0];
for(let x = 0; x<stageWidth;){
  columnSizes.push(x+= Math.min(randomItem(sizes), stageWidth - x) );
}
for(let y = 0; y<stageHeight;){
  rowSizes.push( y+= Math.min(randomItem(sizes), stageHeight - y) )
}

let x = 0;
let y = 0;


const fillArea = (specs) =>{
  if(specs.width <= 40 && specs.width == specs.height){
    
  }
  if(specs.width <= 40 && specs.width == specs.height){
    // drawDial(specs);
    drawMeter(specs);
  }else if(specs.width >= 40 && specs.width == specs.height && runCount < 1){
    switch(randomNumber(0,3)){
      case 0:
        drawTextScreen(specs);
        break;
      case 1:
        drawRadar(specs);
      case 2:
        drawLevels(specs)
      break;
    }
  }
}



for(let columnIndex=0; columnIndex<columnSizes.length - 1; columnIndex++){
  x = columnSizes[columnIndex];
  width = columnSizes[columnIndex+1] - x;
  // createElement('line', {
  //   x1: x,
  //   x2: x,
  //   y1: 0,
  //   y2: stageHeight,
  //   'stroke-width' : 1,
  //   'vector-effect' : 'non-scaling-stroke',
  //   stroke: '#ccc'
  // });
  for(let rowIndex=0; rowIndex<rowSizes.length - 1; rowIndex++){
    y = rowSizes[rowIndex];
    height = rowSizes[rowIndex+1] - y;
    // createElement('line', {
    //   x1: 0,
    //   x2: stageWidth,
    //   y1: y,
    //   y2: y,
    //   'stroke-width' : 1,
    //   'vector-effect' : 'non-scaling-stroke',
    //   stroke: '#ccc'
    // });
  
    fillArea({
      x: x + gridPadding,
      y: y+ gridPadding,
      width: width - gridPadding*2,
      height: height - gridPadding*2
    });
  }
}
