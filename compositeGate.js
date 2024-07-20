import Gate from "./gate.js";

export default class CompositeGate extends Gate {
    constructor( name, circuit, innerCircuit, x, y ) {
        super(name, circuit, x, y, innerCircuit.inputs.length, innerCircuit.outputs.length);
        this.innerCircuit = innerCircuit ;
        this.activate();
    }

    activate() {
        this.inputs.forEach((inputNode, idx) => {
            this.innerCircuit.inputs[idx].setState(inputNode.state)
                                         .propagate();
        });

        this.outputs.forEach((outputNode, idx) => {
            outputNode.setState(this.innerCircuit.outputs[idx].state);
        });

        this.propagate();
    }
}
