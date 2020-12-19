import { Component, Types } from "../../node_modules/ecsy/build/ecsy.module.js";

export default class CollisionComponent extends Component { }

CollisionComponent.schema = {
    collisions: {
        type: Types.Array,
        default: []
    }
}