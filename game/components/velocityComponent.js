import { Component, Types } from "../../node_modules/ecsy/build/ecsy.module.js";

export default class VelocityComponent extends Component {
    static create(x, y) { return { x, y } }
}
VelocityComponent.schema = {
    x: { type: Types.Number },
    y: { type: Types.Number }
}