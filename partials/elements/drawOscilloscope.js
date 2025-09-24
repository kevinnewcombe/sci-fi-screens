import { createElement, colors, randomInteger, randomNumber } from "../shared/shared"
const drawOscilloscope = (specs) =>{
  
  const {x,y,width, height} = specs;
  const centerY = y+height/2;
  const numberOfArcs = randomInteger(2, 10);
  const arcHeight= height * randomNumber(0.1, 0.3);
  const arcWidth = width / numberOfArcs;

  
  let d = `M ${x} ${centerY} `;
  let a = arcWidth/4;
  for(let i=0; i<numberOfArcs; i++){
    const start = x + arcWidth*i;
    d+= `Q ${start+a} ${centerY+arcHeight} ${start+a*2} ${centerY} T ${start+a*4} ${centerY} `;
  }
  createElement("rect", {
    ...specs,
    rx: 5,
    fill: colors.darkgrey,
  });
  createElement("path", {
    d,
    stroke: '#32CD32',
    'fill' : 'transparent',
    'stroke-width' : '1',
    filter: 'url(#blur-0point5)'
  });

}

export default drawOscilloscope;