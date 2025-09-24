import {
  randomItem,
  randomChar,
  randomNumber,
  colors,
  createElement,
  createForeignObject,
} from "./partials/shared/shared";
import drawButtonPanel from "./partials/elements/drawButtonPanel";
import drawRadar from "./partials/elements/drawRadar";
import drawTextScreen from "./partials/elements/drawTextScreen";
// import drawMeter from "./partials/elements/drawMeter";
import drawLevels from "./partials/elements/drawLevels";
const stageWidth = 1000;
const stageHeight = 1000;
const gridPadding = 5;
const sizes = [20, 40, 80, 160];

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

    if (specs.width <= 40 || specs.height <= 40) {
      drawButtonPanel(specs);
      // drawMeter(specs);
    } else if (specs.width >= 40 && specs.width == specs.height) {
      switch (randomNumber(0, 3)) {
        case 0:
          drawTextScreen(specs);
          break;
        case 1:
          drawRadar(specs);
        case 2:
          drawLevels(specs);
          break;
      }
    }else{

    }
    createElement('text', {
      x: specs.x+2,
      y: specs.y+10,
    }, `w:${specs.width}|h:${specs.height}`)
    // fillArea();
  }
}
