import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import TransformComponent from "../components/transformComponent.js";
import VelocityComponent from "../components/velocityComponent.js";

export default class MotionSystem extends System {
  execute(delta, time) {
    this.queries.subjects.results.forEach((entity) => {
      var velocity = entity.getComponent(VelocityComponent)
      var transform = entity.getMutableComponent(TransformComponent)

      transform.x += velocity.x
      transform.y += velocity.y

    })
  }
}

MotionSystem.queries = {
  subjects: {
    components: [TransformComponent, VelocityComponent]
  }
}