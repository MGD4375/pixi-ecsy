
import GLOBALS from '../globals.js'

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const pixiApp = new PIXI.Application({
  width: GLOBALS.WORLD_WIDTH,         // default: 800
  height: GLOBALS.WORLD_HEIGHT,       // default: 600
  antialias: true,                    // default: false
  transparent: false,                 // default: false
  resolution: 2                       // default: 1
});

document.body.appendChild(pixiApp.view);
pixiApp.renderer.backgroundColor = 0x061639;

export default pixiApp