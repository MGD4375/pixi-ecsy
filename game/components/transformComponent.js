import { Component, Types } from "../../node_modules/ecsy/build/ecsy.module.js";

export default class TransformComponent extends Component {
    static create(x, y) { return { x, y } }
}
TransformComponent.schema = {
    x: { type: Types.Number },
    y: { type: Types.Number }
}