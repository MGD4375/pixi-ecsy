import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Not
} from "../../node_modules/ecsy/src/index.js";
import {
  SpriteComponent,
  SpriteStateComponent
} from "../components/spriteComponent.js";
import TransformComponent from "../components/transformComponent.js";
import pixiApp from "../singletons/pixi.js";
export default class SpriteSystem extends System {
  init() {
    this.spriteHandlers = [
      StaticSpriteStrategy,
      AnimatedSpriteStrategy
    ]
  }

  execute() {
    this.queries.creates.results.forEach(entity => {
      var spriteInfo = entity.getComponent(SpriteComponent)
      var sprite = this.spriteHandlers.find(it => it.canHandle(spriteInfo)).create(entity, spriteInfo)
      entity.addComponent(SpriteStateComponent, SpriteStateComponent.create(sprite));
    });

    this.queries.deletes.results.forEach(entity => {
      var spriteInfo = entity.getComponent(SpriteComponent)
      var spriteState = entity.getComponent(SpriteStateComponent)
      pixiApp.stage.removeChild(spriteState.ref)
      entity.removeComponent(SpriteStateComponent);
    });

    this.queries.updates.results.forEach(entity => {
      var spriteInfo = entity.getComponent(SpriteComponent)
      var transform = entity.getComponent(TransformComponent)
      var spriteState = entity.getMutableComponent(SpriteStateComponent)
      var sprite = this.spriteHandlers.find(it => it.canHandle(spriteInfo)).update(entity, spriteInfo, transform, spriteState.ref)
      spriteState.ref = sprite
    });
  }

}

class StaticSpriteStrategy {
  static canHandle(spriteInfo) {
    return !spriteInfo.isAnimated
  }

  static create(entity, spriteInfo) {
    let sheet = PIXI.Loader.shared.resources[spriteInfo.fileName];
    var sprite = new PIXI.Sprite(sheet.spritesheet.textures[spriteInfo.name]);
    sprite.name = entity.id
    sprite.scale.x = spriteInfo.flip
    sprite.description = spriteInfo.name
    sprite.anchor.set(0.5);
    pixiApp.stage.addChild(sprite)
    return sprite
  }

  static update(entity, spriteInfo, transform, sprite) {
    if (sprite.description !== spriteInfo.name) {
      pixiApp.stage.removeChild(sprite)
      sprite = StaticSpriteStrategy.create(entity, spriteInfo)
    }
    sprite.scale.x = spriteInfo.flip
    sprite.position.x = transform.x 
    sprite.position.y = transform.y 

    if (spriteInfo.height) sprite.height = spriteInfo.height
    if (spriteInfo.width) sprite.width = spriteInfo.height

    return sprite
  }

  static delete(sprite) {
    pixiApp.stage.removeChild(sprite)
  }

}

class AnimatedSpriteStrategy {
  static canHandle(spriteInfo) {
    return spriteInfo.isAnimated
  }

  static create(entity, spriteInfo) {
    let sheet = PIXI.Loader.shared.resources[spriteInfo.fileName];
    var sprite = new PIXI.AnimatedSprite(sheet.spritesheet.animations[spriteInfo.name]);
    sprite.name = entity.id
    sprite.description = spriteInfo.name
    sprite.animationSpeed = spriteInfo.animationSpeed;
    sprite.play();
    pixiApp.stage.addChild(sprite)
    return sprite
  }

  static update(entity, spriteInfo, transform, sprite) {
    if (sprite.description !== spriteInfo.name) {
      pixiApp.stage.removeChild(sprite)
      sprite = AnimatedSpriteStrategy.create(entity, spriteInfo)
    }
    sprite.scale.x = spriteInfo.flip
    sprite.position.x = transform.x
    sprite.position.y = transform.y
    sprite.animationSpeed = spriteInfo.animationSpeed

    return sprite
  }
  static delete(sprite) {
    pixiApp.stage.removeChild(sprite)
  }
}


SpriteSystem.queries = {
  creates: {
    components: [SpriteComponent, Not(SpriteStateComponent), TransformComponent]
  },
  deletes: {
    components: [Not(SpriteComponent), SpriteStateComponent, TransformComponent]
  },
  updates: {
    components: [SpriteComponent, SpriteStateComponent, TransformComponent]
  },
};