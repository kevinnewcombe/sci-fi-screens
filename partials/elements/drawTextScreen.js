import { randomChar, createElement, colors, randomInteger } from "../shared/shared";
const drawTextScreen = (specs) => {
  // console.log('drawTextScreen', specs);
  const {x,y,width,height} = specs;
  createElement('rect', {
    ...specs,
    rx: 5,
    fill: colors.green,
  });
  
  let screenWidth = width - 20;
  let remainingColumnWidth = screenWidth;
  const columnWidths = [];
  while(remainingColumnWidth > 10){
    const w = randomInteger(10, Math.min(remainingColumnWidth, screenWidth / 3) );
    remainingColumnWidth = remainingColumnWidth - w - 5;
    columnWidths.push(w);
  }

  let currentX = x+10;
  let z = 0;
  for(let i=0; i<columnWidths.length; i++){

    let currentY = y + 17;
    const cellType = randomInteger(0, 1);
    while(currentY < y + height ){
      let str = '';
 
      for(let j=0; j<randomInteger(Math.max(1, Math.floor(columnWidths[i] / 5.5) - 3), Math.floor(columnWidths[i] / 5.5)); j++){
        str += (cellType === 0) ? randomChar() : randomInteger(0,9);
      }
      createElement('text', {
        x: currentX,
        y: currentY
        
      }, str);

      currentY += 12;
    }
    currentX += columnWidths[i]+5;
  }
}

export default drawTextScreen;