import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import BlockerComponent from "../components/blockerComponent.js";
import {
  HitBoxComponent
} from "../components/hitBoxComponent.js";
import InputComponent from "../components/inputComponent.js";
import SkeletonComponent from "../components/skeletonComponent.js";
import {
  SpriteComponent
} from "../components/spriteComponent.js";
import TransformComponent from "../components/transformComponent.js";
import VelocityComponent from "../components/velocityComponent.js";
import pixiApp from "../singletons/pixi.js";

export default class SkeletonMovementSystem extends System {
  execute() {
    this.queries.subjects.results.forEach((entity) => {
      var velocity = entity.getMutableComponent(VelocityComponent)

      var entitySprite = pixiApp.stage.getChildByName(entity.id + '-hitbox')
      this.queries.blockers.results.forEach((blockerEntity) => {
        if (entity.id === blockerEntity.id) return
        var blockerSprite = pixiApp.stage.getChildByName(blockerEntity.id + '-hitbox')

        if (entitySprite == null || blockerSprite == null) return

        var ab = entitySprite.getBounds();
        var bb = blockerSprite.getBounds();

        //  If moving left and no crash, keep going
        if (velocity.x === 0) {
          velocity.x = 0.4
        }
        else if (
          !(ab.x + velocity.x + ab.width > bb.x &&
            ab.x + velocity.x < bb.x + bb.width &&
            ab.y + ab.height > bb.y &&
            ab.y < bb.y + bb.height)
        ) {
          velocity.x = velocity.x
        }

        //  else if moving left and crash turn
        else if (
          (ab.x + velocity.x + ab.width > bb.x &&
            ab.x + velocity.x < bb.x + bb.width &&
            ab.y + ab.height > bb.y &&
            ab.y < bb.y + bb.height)
        ) {
          velocity.x = velocity.x * -1
        }

        //  Collides with y intent
        if (ab.x + ab.width > bb.x &&
          ab.x < bb.x + bb.width &&
          ab.y + velocity.y + ab.height > bb.y &&
          ab.y + velocity.y < bb.y + bb.height) {
          velocity.y = 0
        }
      })
    })
  }
}

SkeletonMovementSystem.queries = {
  subjects: {
    components: [SkeletonComponent, VelocityComponent, HitBoxComponent, SpriteComponent, TransformComponent]
  },
  blockers: {
    components: [SpriteComponent, HitBoxComponent, BlockerComponent]
  }
}