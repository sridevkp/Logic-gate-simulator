export default class Node{
    state = false;
    constructor( parent, type, x = 0, y = 0, radius = 7){
        this.type = type ;
        this.parent = parent;

        this.shape = new Konva.Circle({
            x, y, radius, strokeWidth : 0,
            fill : "lightgreen", stroke : "white",
        });

        this.shape.on("mousedown", () => {
            parent.work.startConnection( this );
        })
        this.shape.on("mouseup", () => {
            parent.work.endConnection( this );
        })
        this.shape.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
            this.shape.strokeWidth(2);
        })
        this.shape.on("mouseleave", () => {
            document.body.style.cursor = "default";
            this.shape.strokeWidth(0);
        })
    }
    onmove( cb ){
        this.parent.onmove( cb )
    }
    setState( state ){
        this.state = state ;
        this.shape.fill( state? "green": "lightgreen");
    }
    getShape(){
        return this.shape ;
    }
    setpos( x, y ){
        this.shape.x = x;
        this.shape.y = y;
    }
}