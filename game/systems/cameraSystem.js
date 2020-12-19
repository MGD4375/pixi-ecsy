import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Not
} from "../../node_modules/ecsy/src/index.js";
import CameraFocusComponent from "../components/cameraFocusComponent.js";
import {
  SpriteComponent,
  SpriteStateComponent
} from "../components/spriteComponent.js";
import pixiApp from "../singletons/pixi.js";

export default class CameraSystem extends System {


  execute() {
    this.queries.subjects.results.forEach(entity => {
      var sprite = entity.getComponent(SpriteStateComponent).ref
      pixiApp.stage.position.set(pixiApp.screen.width / 2, pixiApp.screen.height / 2);
      pixiApp.stage.pivot.copyFrom(sprite.position);
    });
  }
}

CameraSystem.queries = {
  subjects: {
    components: [SpriteComponent, SpriteStateComponent, CameraFocusComponent]
  }
};