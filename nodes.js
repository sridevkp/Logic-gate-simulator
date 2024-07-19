export default class Node extends Konva.Circle{
    connections = [];
    state = false ;
    onmoveCb;

    constructor( owner, isInput, x = 0, y = 0, radius = 7, controlled=false){
        super({
            x, y, radius, strokeWidth : 0,
            fill : Settings.theme.false, stroke : "white",
        });

        this.isInput = isInput ;
        this.owner = owner;
        this.controlled = controlled; 

        this.on("mousedown", () => {
            owner.startConnection( this );
        })
        this.on("mouseup", () => {
            owner.endConnection( this );
        })
        this.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
            this.strokeWidth(2);
        })
        this.on("mouseleave", () => {
            document.body.style.cursor = "default";
            this.strokeWidth(0);
        })
        
        controlled && this.on("click", () => {
                            this.setState( !this.state );
                            this.propagate();
                        })
    }
    onmove( cb ){
        if( ! cb && this.onmoveCb ) return this.onmoveCb() ;
        this.onmoveCb = cb ;
        this.owner?.onmove && this.owner.onmove( cb )
    }

    update(){
        this.isInput && (this.setState(this.connections.some( con => con.i.state ))) ;
        this.owner.activate()
    }

    setState( state ){
        this.state = state ;
        this.fill( state? Settings.theme.true : Settings.theme.false);
    }

    addConnection( connection ){
        this.connections.push( connection )
    }

    removeConnection( connection ){
        this.connections = this.connections.filter( con => !con.equals(connection));
    }

    disconnectAndRemove(){
        this.connections.forEach( con => con.disconnectAndRemove() );
        this.destroy();
    }

    propagate(){
        this.isInput ? 
            this.owner.activate() : 
            this.connections.forEach( connection => connection.propagate() )
    }
}
