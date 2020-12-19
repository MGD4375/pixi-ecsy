import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import AdventurerComponent from "../components/adventurerComponent.js";
import CollisionComponent from "../components/collisionComponent.js";
import VictoryTriggerComponent from "../components/victoryComponent.js";
import InputComponent from "../components/inputComponent.js";
import { SpriteComponent } from "../components/spriteComponent.js";
import MotionSystem from "./motionSystem.js";
import VelocityComponent from "../components/velocityComponent.js";
import pixiApp from "../singletons/pixi.js";
import globals from "../globals.js";
import TransformComponent from "../components/transformComponent.js";
import SkeletonComponent from "../components/skeletonComponent.js";
import DeathComponent from "../components/deathComponent.js";

export default class PlayerCollisions extends System {

  execute(delta, time) {
    this.queries.subjects.results.forEach((entity) => {
      var collisionComponent = entity.getComponent(CollisionComponent)
      var transformComponent = entity.getMutableComponent(TransformComponent)
      var deaths = entity.getMutableComponent(DeathComponent)

      collisionComponent.collisions.forEach(bEntity => {
        if (!!bEntity.getComponent(VictoryTriggerComponent)) {
          let text = new PIXI.Text('🎉💀' + deaths.count, { fontFamily: 'Arial', fontSize: 24, fill: 'white', align: 'center' });
          text.position.x = transformComponent.x - (text.width / 2)
          text.position.y = transformComponent.y - (text.height * 2)
          pixiApp.stage.addChild(text)
          bEntity.removeComponent(SpriteComponent)
          pixiApp.stop()
        }

        if (!!bEntity.getComponent(SkeletonComponent)) {
          deaths.count++
          let text = new PIXI.Text('💀', { fontFamily: 'Arial', fontSize: 6, fill: 'white', align: 'center' });
          text.position.x = transformComponent.x
          text.position.y = transformComponent.y
          transformComponent.x = 50
          transformComponent.y = 30
          text.alpha = .2
          pixiApp.stage.addChild(text)
        }
      })



    })
  }
}

PlayerCollisions.queries = {
  subjects: { components: [CollisionComponent, AdventurerComponent, TransformComponent, DeathComponent] }
}

