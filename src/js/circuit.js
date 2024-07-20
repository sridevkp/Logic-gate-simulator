import Connection from "./connection.js";
import Node from "./nodes.js";

export default class Circuit{
    gates = [];
    inputs = [];
    outputs = [];
    connections = [];

    constructor( layer, inputs, outputs ){
        // this.stage = stage ;
        this.layer = layer ;

        this.activeNode ;
        this.activeConnection = new Konva.Line({ points : [], stroke : "white", strokeWidth : 3 });
        
        layer.add( this.activeConnection );
        
        this.createNodes(inputs, false, true, this.inputs);
        this.createNodes(outputs, true, false, this.outputs);

        this.positionCircuitNodes(window.innerWidth, window.innerHeight);
    }

    createNodes(count, isInput, controlled, targetArray) {
        for (let i = 0; i < count; i++) {
            const node = new Node(this, isInput, 0, 0, 14, controlled);
            targetArray.push(node);
            this.layer.add(node);
        }
    }

    positionCircuitNodes(width, height, gap = 50, pad = 50) {
        const positionNodes = (nodes, startX) => {
            let startY = (height - gap * (nodes.length - 1)) / 2;
            nodes.forEach((node, idx) => {
                node.setPosition({x : startX, y : startY + idx * gap});
            });
        };

        positionNodes(this.inputs, pad);
        positionNodes(this.outputs, width - pad);
    }

    addCircuitNode( isInput ){
        this.createNodes(1, isInput, !isInput, isInput ? this.outputs : this.inputs);
        this.positionCircuitNodes(window.innerWidth, window.innerHeight);
        this.updateConnections();
    }

    removeCircuitNode( isInput ){
        const collection = isInput ? this.outputs : this.inputs;
        const node = collection.pop();
        node?.disconnectAndRemove();
        this.positionCircuitNodes(window.innerWidth, window.innerHeight);
        this.updateConnections();
    }

    add( gate ){
        console.log(`${gate.name} Gate added`)
        this.gates.push( gate );
        this.layer.add( gate ) ;
    }

    remove( gate ){
        console.log(`${gate.name} Gate Removed`)
        gate.disconnectAndRemove();
        this.gates = this.gates.filter( g => g != gate)
    }

    onResize(width, height) {
        this.positionCircuitNodes(width, height);
        this.connections.forEach( con => con.updateLine() );
    }

    onMouseMove( mouse ){
        if( this.activeNode ){
            this.activeConnection.visible(true);
            const start = this.activeNode.absolutePosition(),
                  end = mouse ;
            this.activeConnection.points([ start.x, start.y, end.x, end.y ])
        }
    } 

    onMouseUp(){
        this.activeNode = null ;
        this.activeConnection.visible(false);
    }

    startConnection( node ){
        this.activeNode = node ;
    }

    updateConnections(){
        this.connections.forEach( connection => connection.updateLine());
    }

    endConnection( node ){
        if( this.activeNode && node && this.activeNode != node && this.activeNode.isInput != node.isInput ){
            
            const existing = this.findConnection(this.activeNode, node) ;
            
            if( !existing ){
                const connection = new Connection( this.activeNode, node );
                this.layer.add( connection )
                this.connections.push( connection );
            }else{
                existing.disconnectAndRemove()
                this.connections = this.connections.filter( c => existing != c )
            }
        }
        this.activeNode = null ;
    }

    removeConnection( a, b ){
        const existing = this.findConnection( a, b );
        if( existing ){
            console.log(existing);
            existing.disconnectAndRemove();
            this.connections = this.connections.filter( con => con != existing );
        }
    }

    findConnection( a, b ){
        for( let con of this.connections) {
            if( con.hasMembers( a, b ) ) return con ;
        }
        return false ;
    }

    destroy(){
        this.gates.forEach( gate => gate.destroy() );
        this.inputs.forEach( node => node.destroy() );
        this.outputs.forEach( node => node.destroy() );
        this.connections.forEach( con => con.destroy() );
    }

    activate(){
        
    }

}
