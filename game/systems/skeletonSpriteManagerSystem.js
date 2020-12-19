import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import AdventurerComponent from "../components/adventurerComponent.js";
import InputComponent from "../components/inputComponent.js";
import SkeletonComponent from "../components/skeletonComponent.js";
import {
  SpriteComponent
} from "../components/spriteComponent.js";
import VelocityComponent from "../components/velocityComponent.js";
import sprites from "../singletons/sprites.js";

export default class SkeletonSpriteManagerSystem extends System {
  execute(delta, time) {
    this.queries.subjects.results.forEach((entity) => {
      var velocity = entity.getComponent(VelocityComponent)
      var spriteInfo = entity.getMutableComponent(SpriteComponent)

      // if (velocity.x !== 0) {
      //   spriteInfo.fileName = 'sprites/skeleton/skeleton.json'
      //   spriteInfo.name = sprites.adventurer.run
      //   spriteInfo.animationSpeed = 0.16

      // } else {
      //   spriteInfo.fileName = 'sprites/skeleton/skeleton.json'
      //   spriteInfo.fileName = sprites.adventurer.fileName
      //   spriteInfo.name = sprites.adventurer.idle
      //   spriteInfo.animationSpeed = 0.04
      // }

      if (velocity.x > 0) {
        spriteInfo.flip = 1
      } else if (velocity.x < 0) {
        spriteInfo.flip = -1
      }

    })
  }
}

SkeletonSpriteManagerSystem.queries = {
  subjects: {
    components: [SkeletonComponent, VelocityComponent, SpriteComponent]
  }
}