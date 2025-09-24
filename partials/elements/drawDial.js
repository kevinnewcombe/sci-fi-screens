import { randomItem, randomNumber, colors, createElement } from "../shared/shared";

const drawDial = (specs) => {
  const {x,y,width,height} = specs;
  console.log( specs );
  const color = randomItem([colors.green, colors.orange, colors.yellow, '#fff', colors.red]);
  for(let dialX = x; dialX<x+width; dialX+=10){
    for(let dialY = y; dialY<y+height; dialY+=10){
      if(randomItem([0,1])){
        createElement('rect', {
          x: dialX,
          y: dialY,
          width:8,
          height:8,
          rx: 2,
          fill: `color-mix(in lab, ${randomItem([colors.green, colors.orange, colors.yellow, '#fff', colors.red])}, ${colors.darkgrey} ${randomNumber(0, 100)}%)`,
          fill: `color-mix(in lab, ${color}, ${colors.darkgrey} ${randomNumber(20, 40)}%)`,
        });
      }
    }
  }
}

export default drawDial;