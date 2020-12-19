import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import AdventurerComponent from "../components/adventurerComponent.js";
import InputComponent from "../components/inputComponent.js";
import {
  SpriteComponent
} from "../components/spriteComponent.js";
import VelocityComponent from "../components/velocityComponent.js";
import sprites from "../singletons/sprites.js";

export default class AdventurerSpriteManagerSystem extends System {
  execute(delta, time) {
    this.queries.subjects.results.forEach((entity) => {
      var velocity = entity.getComponent(VelocityComponent)
      var input = entity.getComponent(InputComponent)
      var spriteInfo = entity.getMutableComponent(SpriteComponent)

      if (velocity.y < 0) {
        spriteInfo.fileName = sprites.adventurer.fileName
        spriteInfo.name = sprites.adventurer.jump
        spriteInfo.animationSpeed = .1

      } else if (velocity.y > 2) {
        spriteInfo.fileName = sprites.adventurer.fileName
        spriteInfo.name = sprites.adventurer.fall
        spriteInfo.animationSpeed = 0.18

      } else if (velocity.x !== 0 || input.keys.includes('a') || input.keys.includes('d')) {
        spriteInfo.fileName = sprites.adventurer.fileName
        spriteInfo.name = sprites.adventurer.run
        spriteInfo.animationSpeed = 0.16

      } else {
        spriteInfo.fileName = sprites.adventurer.fileName
        spriteInfo.name = sprites.adventurer.idle
        spriteInfo.animationSpeed = 0.04
      }

      if (velocity.x > 0 || input.keys.includes('d')) {
        spriteInfo.flip = 1
      } else if (velocity.x < 0 || input.keys.includes('a')) {
        spriteInfo.flip = -1
      }

    })
  }
}

AdventurerSpriteManagerSystem.queries = {
  subjects: {
    components: [AdventurerComponent, VelocityComponent, SpriteComponent, InputComponent]
  }
}