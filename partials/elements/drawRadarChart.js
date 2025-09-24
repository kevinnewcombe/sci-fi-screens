import { randomChar, createElement, colors, randomInteger, getPointOnCircle } from "../shared/shared";
const drawRadarChart = (specs) => {
  // createElement("rect", {
  //   ...specs,
  //   fill: 'green'
  // });

  const {x,y,width,height} = specs;
  
  let d = '';
  const lines = [
    {
      rgb: '0,255,255',
      d: ''
    },
    {
      rgb: '255,0,255',
      d: ''
    },
    // {
    //   rgb: '255,255,0',
    //   d: ''
    // }
  ]
  let firstLine = ''; 
  const center = {x: x+width/2, y: y+height/2};
  const crossPoints = [0.3, 0.6, 0.9];
  const pointCount = 6;
  for(let i=0; i<pointCount; i++){
    const r = Math.min(width, height) / 2 ;
    const q = 360/pointCount*i-90;
    const s = getPointOnCircle(q, center, r*0.9)

    for(let j = 0; j<lines.length; j++){
      const p = getPointOnCircle(q, center, r*(Math.max(0.1, Math.random()-0.1)));
      createElement('circle', {
        cx: p.x,
        cy: p.y,
        r: 2,
        fill: `rgb(${lines[j].rgb})`,
      });  
      if(i === 0){
        lines[j].d += `M ${p.x},${p.y} `;
      }else{
        lines[j].d += `L ${p.x},${p.y} `;
      }
        
    }
    crossPoints.forEach((cp) =>{
      const crossStart = getPointOnCircle(q, center, r*cp);
      const crossEnd = getPointOnCircle( 360/pointCount*(i+1)-90, center, r*cp);
      createElement("line", {
        x1: crossStart.x,
        y1: crossStart.y,
        x2: crossEnd.x,
        y2: crossEnd.y,
        'stroke': '#333',
        'stroke-width' : '1',
      });
    })
  



    createElement("line", {
      x1: center.x,
      y1: center.y,
      x2: s.x,
      y2: s.y,
      'stroke': '#333',
      'stroke-width' : '1',
    });


  }
  for(let j = 0; j<lines.length; j++){
    createElement("path", {
      d: `${lines[j].d} Z`,
      stroke: `rgba(${lines[j].rgb}, 1)`,
      // fill: `rgba(${lines[j].rgb}, 0.25)`,
      'fill' : 'transparent',
      'stroke-width' : '1',
    });
  }
}

export default drawRadarChart;