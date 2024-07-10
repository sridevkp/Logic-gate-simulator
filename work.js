import Connection from "./connection.js";

export default class WorkArea{
    inputs = [];
    outputs = [];
    connections = [];

    constructor( layer ){
        this.layer = layer ;

        this.activeNode ;
        this.activeConnection = new Konva.Line({ points : [], stroke : "white", strokeWidth : 3 });
        
        layer.add( this.activeConnection );
    }

    add( gate ){
        this.layer.add( gate.getShape() ) 
    }

    addListeners( stage ){
        stage.on('mousemove', () => this.onMouseMove( stage.getPointerPosition() ) );
        stage.on('mouseup', () => this.onMouseUp() );
    }

    onResize(){

    }

    onMouseMove( mouse ){
        if( this.activeNode ){
            this.activeConnection.visible(true);
            const start = this.activeNode.getShape().absolutePosition(),
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
        if( this.activeNode && node && this.activeNode != node ){
            let a = this.activeNode,
                  b = node;
            b.type == "output" && ([ a, b ] = [ b, a ]);
            const connection = new Connection( a, b );
            this.layer.add( connection.getShape() )
            this.connections.push( connection );
        }
        console.log(this.connections);
        this.activeNode = null ;
    }
    compile(){

    }
}