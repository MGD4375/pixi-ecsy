import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Not
} from "../../node_modules/ecsy/src/index.js";
import {
  FollowingBackgroundComponent,
  FollowingBackgroundStateComponent
} from "../components/followingBackgroundComponent.js";
import TransformComponent from "../components/transformComponent.js";
import globals from "../globals.js";
import pixiApp from "../singletons/pixi.js";

export default class FollowingBackgroundSystem extends System {
  execute() {
    this.queries.creates.results.forEach(entity => {
      var backgroundInfo = entity.getComponent(FollowingBackgroundComponent)
      var transform = entity.getComponent(TransformComponent)

      var background = new PIXI.Sprite(PIXI.Loader.shared.resources[backgroundInfo.name].texture);
      background.x = transform.x - (globals.WORLD_WIDTH / 2)
      background.y = transform.y - (globals.WORLD_HEIGHT / 2)
      background.width = globals.WORLD_WIDTH
      background.height = globals.WORLD_HEIGHT
      background.name = 'background'
      pixiApp.stage.addChild(background);

      entity.addComponent(FollowingBackgroundStateComponent, FollowingBackgroundStateComponent.create(background));
    });

    this.queries.deletes.results.forEach(entity => {
      var spriteState = entity.getComponent(FollowingBackgroundStateComponent)
      pixiApp.stage.removeChild(spriteState.ref)
      entity.removeComponent(FollowingBackgroundStateComponent);
    });

    this.queries.updates.results.forEach(entity => {
      var transform = entity.getComponent(TransformComponent)
      var spriteState = entity.getMutableComponent(FollowingBackgroundStateComponent).ref

      spriteState.x = transform.x - (globals.WORLD_WIDTH / 2)
      spriteState.y = transform.y - (globals.WORLD_HEIGHT / 2)
      spriteState.width = globals.WORLD_WIDTH
      spriteState.height = globals.WORLD_HEIGHT
    });
  }

}

FollowingBackgroundSystem.queries = {
  creates: {
    components: [FollowingBackgroundComponent, Not(FollowingBackgroundStateComponent), TransformComponent]
  },
  deletes: {
    components: [Not(FollowingBackgroundComponent), FollowingBackgroundStateComponent, TransformComponent]
  },
  updates: {
    components: [FollowingBackgroundComponent, FollowingBackgroundStateComponent, TransformComponent]
  },
};