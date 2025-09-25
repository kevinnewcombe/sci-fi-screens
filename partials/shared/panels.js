import drawButtonPanel from '../elements/drawButtonPanel';
import drawLevels from '../elements/drawLevels';
import drawMeter from '../elements/drawMeter';
import drawOscilloscope from '../elements/drawOscilloscope';
import drawRadar from '../elements/drawRadar';
import drawRadarChart from '../elements/drawRadarChart';
import drawTextScreen from '../elements/drawTextScreen';

import { randomItem } from "./shared";
const panel = {
  buttonPanel(specs){
    drawButtonPanel(specs);
  },
  levels(specs){
    drawLevels(specs);
  },
  meter(specs){
    drawMeter(specs);
  },
  oscilloscope(specs){
    drawOscilloscope (specs);
  },
  radar(specs){
    drawRadar(specs);
  },
  radarChart(specs){
    drawRadarChart(specs);
  },
  textScreen(specs){
    drawTextScreen(specs);
  },
}


const addRandomPanel = (specs) =>{
  panel[randomItem(Object.getOwnPropertyNames(panel))](specs);
}

export default addRandomPanel;