export default class Node extends Konva.Circle{
    connections = [];
    state = false ;

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
        this.owner?.onmove && this.owner.onmove( cb )
    }

    update(){
        if(this.isInput){
            this.setState(this.connections.some( node => node.state )) ;
            this.owner?.activate();
        }
        return this;
    }

    setState( state ){
        this.state = state ;
        this.fill( state? Settings.theme.true : Settings.theme.false);
        return this ;
    }

    addConnection( connection ){
        this.connections.push( connection )
    }

    removeConnection( connection ){
        this.connections = this.connections.filter( node => node != connection);
    }

    disconnectAndRemove(){
        this.connections.forEach( node => this.owner.removeConnection( this, node ) );
        this.destroy();
    }

    propagate(){
        this.isInput ? 
            this.owner.activate() : 
            this.connections.forEach( node => {
                    node.update();
                    node.propagate()
                } )
    }
}
