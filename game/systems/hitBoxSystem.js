import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Not
} from "../../node_modules/ecsy/src/index.js";
import {
  HitBoxComponent,
  HitBoxStateComponent
} from "../components/hitBoxComponent.js";
import TransformComponent from "../components/transformComponent.js";
import globals from "../globals.js";
import pixiApp from "../singletons/pixi.js";

export default class HitBoxSystem extends System {
  execute() {
    this.queries.creates.results.forEach(entity => {
      var hitBox = entity.getComponent(HitBoxComponent)

      var graphics = new PIXI.Graphics();
      if (globals.DEBUG) {
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(1, 0xFF0000);
        graphics.alpha = 0.1
      }
      graphics.drawRect(
        0 - (hitBox.anchorX * hitBox.width),
        0 - (hitBox.anchorY * hitBox.height),
        hitBox.width,
        hitBox.height);



      graphics.name = entity.id + '-hitbox'
      pixiApp.stage.addChild(graphics);


      entity.addComponent(HitBoxStateComponent, HitBoxStateComponent.create(graphics));
    });

    this.queries.deletes.results.forEach(entity => {
      var spriteState = entity.getComponent(HitBoxStateComponent)
      pixiApp.stage.removeChild(spriteState.ref)
      entity.removeComponent(HitBoxStateComponent);
    });

    this.queries.updates.results.forEach(entity => {
      var transform = entity.getComponent(TransformComponent)
      var spriteState = entity.getMutableComponent(HitBoxStateComponent)

      spriteState.ref.position.x = transform.x
      spriteState.ref.position.y = transform.y
    });
  }

}

HitBoxSystem.queries = {
  creates: {
    components: [HitBoxComponent, Not(HitBoxStateComponent), TransformComponent]
  },
  deletes: {
    components: [Not(HitBoxComponent), HitBoxStateComponent, TransformComponent]
  },
  updates: {
    components: [HitBoxComponent, HitBoxStateComponent, TransformComponent]
  },
};