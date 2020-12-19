import {
    Component,
    TagComponent,
    Types
} from "../../node_modules/ecsy/build/ecsy.module.js";

export default class BlockerComponent extends Component { }
BlockerComponent.schema = {
    isColliding: {
        type: Types.Boolean,
        default: false
    },
    collisions: {
        type: Types.Array,
        default: []
    }
}