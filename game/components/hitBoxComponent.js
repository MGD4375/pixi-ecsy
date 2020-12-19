import {
  Component,
  SystemStateComponent,
  Types
} from "../../node_modules/ecsy/build/ecsy.module.js";

export class HitBoxComponent extends Component {
  static create(height, width, anchorX, anchorY) {
    return {
      height,
      width,
      anchorX: anchorX !== undefined ? anchorX : 0,
      anchorY: anchorY !== undefined ? anchorY : 0
    }
  }
}

HitBoxComponent.schema = {
  height: {
    type: Types.Number
  },
  width: {
    type: Types.Number
  },
  anchorX: {
    type: Types.Number,
    default: 0
  },
  anchorY: {
    type: Types.Number,
    default: 0
  }
}

export class HitBoxStateComponent extends SystemStateComponent {
  static create(ref) {
    return {
      ref
    }
  }
}

HitBoxStateComponent.schema = {
  ref: {
    type: Types.Ref
  }
}