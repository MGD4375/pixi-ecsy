import {
  Component,
  SystemStateComponent,
  Types
} from "../../node_modules/ecsy/build/ecsy.module.js";

export class FollowingBackgroundComponent extends Component {
  static create(fileName, name) {
    return {
      fileName,
      name
    }
  }
}
FollowingBackgroundComponent.schema = {
  fileName: {
    type: Types.String
  },
  name: {
    type: Types.String
  }
}

export class FollowingBackgroundStateComponent extends SystemStateComponent {
  static create(ref) {
    return {
      ref
    }
  }
}

FollowingBackgroundStateComponent.schema = {
  ref: {
    type: Types.Ref
  }
};