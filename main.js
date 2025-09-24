import {
  randomItem,
  randomInteger,
  createElement,
} from "./partials/shared/shared";
import drawButtonPanel from "./partials/elements/drawButtonPanel";
import drawRadar from "./partials/elements/drawRadar";
import drawTextScreen from "./partials/elements/drawTextScreen";
import drawOscilloscope from './partials/elements/drawOscilloscope';
import drawRadarChart from "./partials/elements/drawRadarChart";
// import drawMeter from "./partials/elements/drawMeter";
import drawLevels from "./partials/elements/drawLevels";
const stageWidth = 1000;
const stageHeight = 1000;
const gridPadding = 5;
// const sizes = [20, 40, 80, 160];
const sizes = [30, 50, 90, 170, 210];

// Create the grid lines
let columnSizes = [0];
let rowSizes = [0];
for (let x = 0; x < stageWidth; ) {
  columnSizes.push((x += Math.min(randomItem(sizes), stageWidth - x)));
}
for (let y = 0; y < stageHeight; ) {
  rowSizes.push((y += Math.min(randomItem(sizes), stageHeight - y)));
}

let x = 0;
let y = 0;

// Populate the grid
for (let columnIndex = 0; columnIndex < columnSizes.length - 1; columnIndex++) {
  x = columnSizes[columnIndex];
  const width = columnSizes[columnIndex + 1] - x;
  for (let rowIndex = 0; rowIndex < rowSizes.length - 1; rowIndex++) {
    y = rowSizes[rowIndex];
    const height = rowSizes[rowIndex + 1] - y;
    const specs = {
      x: x + gridPadding,
      y: y + gridPadding,
      width: width - gridPadding * 2,
      height: height - gridPadding * 2,
    };

    createElement("rect", {
      ...specs,
      stroke: "#ccc",
      "stroke-width": "0.5",
    });
    
    // Available sizes: 20, 40, 80, 160, 200

    if ( specs.height <= 20 || specs.width <= 20) {
      drawButtonPanel(specs);
      // drawMeter(specs);
    }else if(specs.width / specs.height >= 2){
      drawOscilloscope(specs);
    }else if (specs.width >= 40 && specs.width == specs.height) {
      // drawOscilloscope(specs);
      switch (randomInteger(0, 4)) {
        case 0:
          drawTextScreen(specs);
          break;
        case 1:
          drawRadar(specs);
        case 2:
          drawLevels(specs);
          break;
        case 3:
          drawRadarChart(specs);
          break;
      }
    }else if(specs.width / specs.height > 1){
      // drawLevels(specs);
    } else{
      

    }
      createElement(
        "text",
        {
          x: specs.x + 2,
          y: specs.y + 10,
        },
        `w:${specs.width}|h:${specs.height}`
      );
    // fillArea();
  }

  
}
