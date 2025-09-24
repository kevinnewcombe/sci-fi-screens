import { randomItem, randomInteger, colors, createElement } from "../shared/shared";

const drawButtonPanel = (specs) => {
  const {x,y,width,height} = specs;
  const color = randomItem([colors.green, colors.orange, colors.yellow, colors.red]);
  for(let dialX = x; dialX<x+width; dialX+=10){
    for(let dialY = y; dialY<y+height; dialY+=10){
      createElement('rect', {
        x: dialX+1,
        y: dialY+1,
        width:8,
        height:8,
        rx: 2,
        fill: `color-mix(in lab, ${randomItem([colors.green, colors.orange, colors.yellow, '#fff', colors.red])}, ${colors.darkgrey} ${randomInteger(20, 20)}%)`,
      });
    }
  }
}

export default drawButtonPanel;