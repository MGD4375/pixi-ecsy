import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import InputComponent from "../components/inputComponent.js";

export default class InputSystem extends System {

  constructor(world, attributes) {
    super(world, attributes)

    var sys = this;

    sys.keys = [];

    window.addEventListener("keydown", function (e) {
      if (sys.keys.includes(e.key)) return
      sys.keys.push(e.key.toLowerCase())
    }, false);

    window.addEventListener('keyup', function (e) {
      var index = sys.keys.indexOf(e.key.toLowerCase());
      if (index !== -1) {
        sys.keys.splice(index, 1);
      }
    }, false);
  }

  execute(delta, time) {
    this.queries.subjects.results.forEach((entity) => {
      var input = entity.getMutableComponent(InputComponent)

      input.keys = this.keys

    })
  }
}

InputSystem.queries = {
  subjects: { components: [InputComponent] }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}