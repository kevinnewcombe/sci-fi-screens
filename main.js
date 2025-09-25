import {
  randomItem,
  randomInteger,
  createElement,
} from "./partials/shared/shared";
import addRandomPanel from "./partials/shared/panels";
const addStats = false;
const stageWidth = 1000;
const stageHeight = 1000;
const gridPadding = 5;
// const sizes = [20, 40, 80, 160, 200];
const sizes = [40, 80, 160, 200];
// const sizes = [30, 70, 150, 190];
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
    
    // createElement("rect", {
    //   ...specs,
    //   stroke: "#ccc",
    //   "stroke-width": "0.5",
    // });
    if(addStats){
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
        `x:${specs.x} y:${specs.y}`
      );
      createElement(
        "text",
        {
          x: specs.x + 2,
          y: specs.y + 30,
        },
        `ratio: ${aspectRatio}`
      );
    }


    addRandomPanel(specs);
    
  }
}



