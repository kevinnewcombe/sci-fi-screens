import { createElement, colors, randomItem, randomNumber, randomChar } from "../shared/shared";
const drawLevels = (specs) => {
  // Something like volume meters, where it's a collection of columns that go from green to yellow to red
  const { x, y, width, height } = specs;
  createElement("rect", {
    ...specs,
    rx: 5,
    fill: colors.darkgrey,
  });

  const maskID = `mask-levels-x${x}y${y}`;

  const mask = createElement("mask", {
    id: maskID,
  });

  const padding = 15;
  const maskSpecs = {
    x: x + padding,
    y: y + padding,
    width: width - padding * 2,
    height: height - padding * 2,
  };
  const gridOffset = 2;
  const legendColor = "#aaa";
  const gridLines = randomItem([4, 5, 10]);
  for (let i = 0; i < gridLines; i++) {
    const lineY =
      maskSpecs.y + ((maskSpecs.height + gridOffset) * (i + 1)) / gridLines;
    createElement("line", {
      x1: maskSpecs.x - gridOffset,
      x2:
        i === gridLines - 1
          ? maskSpecs.x + maskSpecs.width
          : maskSpecs.x - gridOffset - 3,
      y1: lineY,
      y2: lineY,
      "stroke-width": 1,
      "vector-effect": "non-scaling-stroke",
      stroke: i === gridLines - 1 ? legendColor : "#999",
    });
  }

  // Draw the graph lines
  createElement("line", {
    x1: maskSpecs.x - gridOffset,
    x2: maskSpecs.x - gridOffset,
    y1: maskSpecs.y,
    y2: maskSpecs.y + maskSpecs.height + gridOffset,
    "stroke-width": 1,
    "vector-effect": "non-scaling-stroke",
    stroke: legendColor,
  });

  // Draw the individual blocks for the levels mask
  const numberOfBars = randomNumber(4, 8);
  const barSpacing = 3;
  const barWidth =
    (maskSpecs.width - barSpacing * (numberOfBars - 1)) / numberOfBars;
  const numberOfChars = Math.floor(barWidth / 7);
  for (let i = 0; i < numberOfBars; i++) {
    createElement(
      "rect",
      {
        x: maskSpecs.x + (barWidth + barSpacing) * i,
        y: maskSpecs.y,
        y: maskSpecs.y + maskSpecs.height / (randomNumber(100, 11) / 10),
        fill: "#fff",
        width: barWidth,
        height: maskSpecs.height,
      },
      null,
      mask
    );

    let str = "";
    for (let j = 0; j < numberOfChars; j++) {
      str += randomChar();
    }
    createElement(
      "text",
      {
        x: maskSpecs.x + (barWidth + barSpacing) * i + barWidth / 2,
        y: maskSpecs.y + maskSpecs.height + 12,
        "text-anchor": "middle",
      },
      `${str}`
    );
  }

  // Draw the mask
  createElement("rect", {
    ...maskSpecs,
    mask: `url(#${maskID})`,
    fill: "url(#Gradient2)",
  });
};

export default drawLevels;