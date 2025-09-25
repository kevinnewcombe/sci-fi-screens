import { randomItem, randomInteger, colors, createElement } from "../shared/shared";
import addRandomPanel from "../shared/panels";
const drawButtonPanel = (specs) => {
  // addRandomPanel(specs);
  // return;

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
        fill: `color-mix(in lab, ${color}, ${colors.darkgrey} ${randomInteger(25, 75)}%)`,
      });
    }
  }
}

export default drawButtonPanel;