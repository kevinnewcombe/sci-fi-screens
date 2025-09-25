import {
  randomItem,
  randomInteger,
  createElement,
} from "./partials/shared/shared";
import addRandomPanel from "./partials/shared/panels";

const stageWidth = 1000;
const stageHeight = 1000;
const gridPadding = 5;
const sizes = [20, 40, 80, 160, 200];
let columnSizes = [0];
let rowSizes = [0];
for (let x = 0; x < stageWidth; ) {
  columnSizes.push((x += (Math.min(randomItem(sizes), (stageWidth - x)))));
}
console.log('columnSizes', columnSizes);

for (let y = 0; y < stageHeight; ) {
  rowSizes.push((y += (Math.min(randomItem(sizes), (stageHeight - y)))));
}

let x = 0;
let y = 0;

// const getPanel = (panels, specs) => {
//   switch (randomItem(panels)) {
//     case "buttonPanel":
//       drawButtonPanel(specs);
//       break;
//     case "levels":
//       drawLevels(specs);
//       break;
//     case "meter":
//       drawMeter(specs);
//       break;
//     case "oscilloscope":
//       drawOscilloscope(specs);
//       break;
//     case "radar":
//       drawRadar(specs);
//       break;
//     case "radarChart":
//       drawRadarChart(specs);
//       break;
//     case "textScreen":
//       drawTextScreen(specs);
//       break;
//     default:
//       break;
//   }
// };





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
    const aspectRatio = specs.width / specs.height;
    createElement(
      "text",
      {
        x: specs.x + 2,
        y: specs.y + 10,
      },
      `w:${specs.width} h:${specs.height}`
    );
    createElement(
      "text",
      {
        x: specs.x + 2,
        y: specs.y + 20,
      },
      `ratio: ${aspectRatio}`
    );

    addRandomPanel(specs);
    // getPanel(['radar', 'levels'], specs);
    // Available sizes: 20, 40, 80, 160, 200
  
    // if ( aspectRatio == 1 && specs.width == 80) {
    //    switch (randomInteger(0, 2)) {
    //     case 0:
    //       drawRadar(specs);
    //     break;
    //     case 1:
    //       drawLevels(specs);
    //     break;
    //     case 2:
    //       drawRadarChart(specs);
    //     break;
    //    }
    // }if ( aspectRatio == 1 && specs.width == 80) {
    //    switch (randomInteger(0, 2)) {
    //     case 0:
    //       drawRadar(specs);
    //     break;
    //     case 1:
    //       drawLevels(specs);
    //     break;
    //     case 2:
    //       drawRadarChart(specs);
    //     break;
    //    }
    // }else if ( specs.height <= 20 || specs.width <= 20) {
    //   drawButtonPanel(specs);
    //   // drawMeter(specs);
    // }else if(specs.width / specs.height > 2){
    //   drawOscilloscope(specs);
    // }else if (specs.width > 40 && aspectRatio > 0.75) {
    //   // console.log( randomInteger(0, 3) );
    //   // switch (randomInteger(0, 2)) {
    //   //   case 0:
    //   //     drawTextScreen(specs);
    //   //     break;
    //   //   case 1:
    //   //     drawLevels(specs);
    //   //     break;
    //   //   case 2:
    //   //     drawRadarChart(specs);
    //   //     break;
    //   // }
    // }else if(specs.width / specs.height > 1){
    //   // drawLevels(specs);
    // } else{

    // }

    // fillArea();
  }
}



