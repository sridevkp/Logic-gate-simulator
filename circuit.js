import Connection from "./connection.js";
import Node from "./nodes.js";

export default class Circuit{
    gates = [];
    inputs = [];
    outputs = [];
    connections = [];

    constructor( layer, inputs, outputs, width, height ){
        // this.stage = stage ;
        this.layer = layer ;

        this.activeNode ;
        this.activeConnection = new Konva.Line({ points : [], stroke : "white", strokeWidth : 3 });
        
        layer.add( this.activeConnection );
        
        this.createNodes(inputs, false, true, this.inputs);
        this.createNodes(outputs, true, false, this.outputs);

        this.positionWorkNodes(width, height);
    }

    createNodes(count, isInput, controlled, targetArray) {
        for (let i = 0; i < count; i++) {
            const node = new Node(this, isInput, 0, 0, 14, controlled);
            targetArray.push(node);
            this.layer.add(node);
        }
    }

    positionWorkNodes(width, height, gap = 50, pad = 50) {
        const positionNodes = (nodes, startX) => {
            let startY = (height - gap * (nodes.length - 1)) / 2;
            nodes.forEach((node, idx) => {
                node.setPosition({x : startX, y : startY + idx * gap});
            });
        };

        positionNodes(this.inputs, pad);
        positionNodes(this.outputs, width - pad);
    }

    add( gate ){
        this.gates.push( gate );
        this.layer.add( gate ) ;
    }

    onResize(width, height) {
        this.positionWorkNodes(width, height);
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
        this.connections.forEach( connection => {
            
        })
    }

    endConnection( node ){
        if( this.activeNode && node && this.activeNode != node && this.activeNode.isInput != node.isInput ){
            let a = this.activeNode,
                  b = node;
            ! b.isInput && ([ a, b ] = [ b, a ]);
            const connection = new Connection( a, b );

            const con = this.conExists(connection) ;

            if( !con ){
                this.layer.add( connection )
                this.connections.push( connection );
            }else{
                con.removeSelf()
                this.connections = this.connections.filter( c => con != c )
            }
        }
        this.activeNode = null ;
    }

    conExists( newcon ){
        for( let con of this.connections) {
            if( con.i == newcon.i && con.o == newcon.o ) return con ;
        }
        return false ;
    }

    activate(){
        
    }

    compile(){

    }
}