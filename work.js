
export default class WorkArea{
    constructor( layer ){
        this.layer = layer ;

        this.activeNode ;
        this.activeConnection = new Konva.Line({ points : [], stroke : "white", strokeWidth : 3 });
        
        layer.add( this.activeConnection );
        
        // this.layer.getStage().on("mousemove", e => {
        //     if( this.activeNode ){
        //         const { sx, sy } = this.activeNode.position()
        //         const ex = e.evt.clientX, ey = e.evt.clientY ;
        //         console.log(ex, ey)
        //         this.activeConnection.points([ sx, sy, ex, ey ])
        //     }
        // })
    }
    add( gate ){
        this.layer.add( gate.getShape() ) 
    }
    startConnection( node ){
        this.activeNode = node ;
    }
    compile(){

    }
}