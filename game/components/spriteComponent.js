import {
  Component,
  SystemStateComponent,
  Types
} from "../../node_modules/ecsy/build/ecsy.module.js";

export class SpriteComponent extends Component {
  static create(fileName, name) {
    return {
      fileName,
      name
    }
  }
}
SpriteComponent.schema = {
  //  Basic
  fileName: {
    type: Types.String
  },
  name: {
    type: Types.String
  },

  //  Options
  isAnimated: {
    type: Types.Boolean,
    default: false
  },
  animationSpeed: {
    type: Types.Number,
    default: 0.167
  },
  flip: {
    type: Types.Number,
    default: 1
  },
  height: {
    type: Types.Number
  },
  width: {
    type: Types.Number
  }

}

export class SpriteStateComponent extends SystemStateComponent {
  static create(ref) {
    return {
      ref
    }
  }
}

SpriteStateComponent.schema = {
  ref: {
    type: Types.Ref
  }
};