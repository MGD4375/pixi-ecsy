import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import CollisionComponent from "../components/collisionComponent.js";
import { HitBoxComponent, HitBoxStateComponent } from "../components/hitBoxComponent.js";
import InputComponent from "../components/inputComponent.js";

export default class CollisionSystem extends System {
  execute(delta, time) {
    this.queries.subjects.results.forEach((aEntity) => {
      var collisionComponent = aEntity.getMutableComponent(CollisionComponent)
      var aHitBoxComponent = aEntity.getComponent(HitBoxStateComponent)

      collisionComponent.collisions = []

      this.queries.subjects.results.forEach((bEntity) => {
        if (bEntity.id === aEntity.id) return

        var bHitBoxComponent = bEntity.getComponent(HitBoxStateComponent)
        if (!aHitBoxComponent || !bHitBoxComponent) return

        var ab = aHitBoxComponent.ref.getBounds()
        var bb = bHitBoxComponent.ref.getBounds()

        if (
          ab.x + ab.width > bb.x &&
          ab.x < bb.x + bb.width &&
          ab.y + 1 + ab.height > bb.y &&
          ab.y + 1 < bb.y + bb.height) {

          collisionComponent.collisions.push(bEntity)
        }
      })
    })
  }
}

CollisionSystem.queries = {
  subjects: { components: [CollisionComponent, HitBoxComponent] }
}

