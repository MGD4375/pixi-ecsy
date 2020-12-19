import {
  System
} from "../../node_modules/ecsy/build/ecsy.module.js";
import GravityComponent from "../components/gravityComponent.js";
import VelocityComponent from "../components/velocityComponent.js";

export default class GravitySystem extends System {
  execute(delta, time) {
    this.queries.subjects.results.forEach((entity) => {
      var velocity = entity.getMutableComponent(VelocityComponent)
      velocity.y = Math.min(6, velocity.y + 0.4)
    })
  }
}

GravitySystem.queries = {
  subjects: {
    components: [GravityComponent, VelocityComponent]
  }
}