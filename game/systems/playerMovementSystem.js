import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import BlockerComponent from "../components/blockerComponent.js";
import {
  HitBoxComponent
} from "../components/hitBoxComponent.js";
import InputComponent from "../components/inputComponent.js";
import {
  SpriteComponent
} from "../components/spriteComponent.js";
import TransformComponent from "../components/transformComponent.js";
import VelocityComponent from "../components/velocityComponent.js";
import pixiApp from "../singletons/pixi.js";

export default class PlayerMovementSystem extends System {
  execute() {
    this.queries.subjects.results.forEach((entity) => {
      var input = entity.getComponent(InputComponent)
      var velocity = entity.getMutableComponent(VelocityComponent)

      if (input.keys.includes('d')) {
        velocity.x = 2.5
      } else if (input.keys.includes('a')) {
        velocity.x = -2.5
      } else {
        velocity.x = 0
      }

      var entitySprite = pixiApp.stage.getChildByName(entity.id + '-hitbox')
      this.queries.blockers.results.forEach((blockerEntity) => {
        if (entity.id === blockerEntity.id) return
        var blockerSprite = pixiApp.stage.getChildByName(blockerEntity.id + '-hitbox')

        if (entitySprite == null || blockerSprite == null) return

        var ab = entitySprite.getBounds();
        var bb = blockerSprite.getBounds();

        //  Is on floor
        //  And spacebar
        if (input.keys.includes(' ') &&
          ab.x + ab.width > bb.x &&
          ab.x < bb.x + bb.width &&
          ab.y + 1 + ab.height > bb.y &&
          ab.y + 1 < bb.y + bb.height) {
          velocity.y = -5
        }

        //  Collides with x intent
        if (ab.x + velocity.x + ab.width > bb.x &&
          ab.x + velocity.x < bb.x + bb.width &&
          ab.y + ab.height > bb.y &&
          ab.y < bb.y + bb.height) {
          velocity.x = 0
        }

        //  Collides with y intent
        if (ab.x + ab.width > bb.x &&
          ab.x < bb.x + bb.width &&
          ab.y + velocity.y + ab.height > bb.y &&
          ab.y + velocity.y < bb.y + bb.height) {
          velocity.y = 0
        }

        //  Collides with diagonal intent
        if (ab.x + velocity.x + ab.width > bb.x &&
          ab.x + velocity.x < bb.x + bb.width &&
          ab.y + velocity.y + ab.height > bb.y &&
          ab.y + velocity.y < bb.y + bb.height) {
          //  TODO: There is a bug here when jumping up into a block
          velocity.y = 0
        }

      })
    })
  }
}

PlayerMovementSystem.queries = {
  subjects: {
    components: [VelocityComponent, InputComponent, HitBoxComponent, SpriteComponent, TransformComponent]
  },
  blockers: {
    components: [SpriteComponent, HitBoxComponent, BlockerComponent]
  }
}