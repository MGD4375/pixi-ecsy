import { Component, Types } from "../../node_modules/ecsy/build/ecsy.module.js";

export default class DeathComponent extends Component { }

DeathComponent.schema = {
    count: {
        type: Types.Number,
        default: 0
    }
}