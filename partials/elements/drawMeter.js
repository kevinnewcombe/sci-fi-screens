import { createElement, getPointOnCircle, randomInteger } from "../shared/shared"
import addRandomPanel from "../shared/panels";
const drawMeter = (specs) =>{
  const {x,y,width, height} = specs;
  if(width !== height){
    addRandomPanel(specs);
    return;
  }
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
  
  angle = randomInteger(0, 360);
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

export default drawMeter;