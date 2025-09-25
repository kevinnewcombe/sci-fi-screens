import { createForeignObject, randomInteger, getRandomCoordinateInCircle, createElement, colors } from "../shared/shared";
const drawRadar = (specs) =>{
  const {x,y,width,height} = specs;
  createForeignObject({
    ...specs,
    style: `--rotation:45deg`,
    class: 'radar__sweep'
  });

  for(let i=0; i<randomInteger(1,3); i++){
    const c = getRandomCoordinateInCircle(width / 2 - 6);
    createElement('circle', {
      cx: x + width / 2 + c.x,
      cy: y + width / 2 + c.y,
      r: width * 0.04,
      fill: colors.green,
      // filter: 'url(#blur-0point5)'
    });  
  }
  
  createElement('use', {
    ...specs,
    'href' : '#radar__stroke',
    class: 'radar__stroke'
  });
}

export default drawRadar;