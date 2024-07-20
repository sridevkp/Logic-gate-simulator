import Node from "./nodes.js";

export default class Gate extends Konva.Group{
    inputs = [];
    outputs = [];
    connections = [];
    gap = 20 ;
    fontSize = 20 ;

    constructor( name, circuit, x , y, iNodesCount, oNodesCount, width = 80){
        super({ x, y })

        this.name = name ;
        this.circuit = circuit ;

        const height = 40 + (Math.max(iNodesCount,oNodesCount) -1)* this.gap;

        this.shape = new Konva.Rect({
            x : 0, y : 0, width, height,
            fill : Settings.theme.gate ,
            stroke : "white",  draggable : true,
            strokeWidth : 0 ,  cornerRadius : 3,
            shadowOffsetX : 4, shadowOffsetY : 4,
            shadowOpacity:0.5, shadowBlur: 10,
        })
        this.add( this.shape );

        this.label = new Konva.Text({
            x: width / 2 - name.length * this.fontSize/3 ,
            y: height /2 - this.fontSize/2,
            fill: Settings.theme.label , text: name,
            fontFamily: 'Calibri', fontStyle : "bold" , align : "center",
            fontSize  : this.fontSize, listening : false,
        });
        this.add( this.label );

        let iy = (height - this.gap *(iNodesCount-1))/2 ;
        for( let i = 0; i < iNodesCount; i++){
            const iNode = new Node(this, true, 0, iy + i *this.gap) ;
            this.add( iNode );
            this.inputs.push( iNode );
        }
        iy = (height - this.gap *(oNodesCount-1))/2;
        for( let i = 0; i < oNodesCount; i++){
            const oNode = new Node(this, false, width, iy + i *this.gap);
            this.add( oNode );
            this.outputs.push( oNode );
        }

        this.shape.on('mouseenter', () => {
            document.body.style.cursor = 'grab';
            this.shape.strokeWidth(1)
        });
        this.shape.on('mouseleave', () => {
            document.body.style.cursor = 'default';
            this.shape.strokeWidth(0)
        });
        this.shape.on('dragstart', () => {
            document.body.style.cursor = 'grabbing';
            this.shape.shadowBlur(20);
            this.shape.shadowOffsetX(7);
            this.shape.shadowOffsetY(7);
        });
        this.shape.on('dragmove', () => {
            const delta = this.shape.position();
            this.move(delta);
            this.shape.position({x:0,y:0})
        })
        this.shape.on('dragend', () => {
            if( this.y() > window.innerHeight - 200 ) return this.circuit?.remove(this);
            document.body.style.cursor = 'grab';
            this.shape.shadowBlur(10);
            this.shape.shadowOffsetX(4);
            this.shape.shadowOffsetY(4);
        });
        this.on('click', e => {
            e.evt.button == 2 && this.circuit?.remove(this);
        })
    }

    onmove( cb ){
        this.shape.on("dragmove", cb );
    }

    startConnection( node ){
        this.circuit.startConnection( node );
    }

    endConnection( node ){
        this.circuit.endConnection( node );
    }

    disconnectAndRemove(){
        this.inputs.forEach( node => node.disconnectAndRemove() );
        this.outputs.forEach( node => node.disconnectAndRemove() );
        this.destroy();
    }

    removeConnection( a, b ){
        this.circuit.removeConnection( a, b );
    }

    activate(){
    }

    propagate(){
        this.outputs.forEach( node => node.propagate() )
    }
}

export class Not extends Gate {
    constructor( circuit, x, y ){
        super("NOT", circuit, x, y , 1, 1, 60 );
        this.activate();
    }
    activate(){
        this.outputs[0].setState( !this.inputs[0].state );
        this.propagate();
    }
}

export class And extends Gate {
    constructor( circuit, x, y ){
        super("AND", circuit, x, y , 2, 1 );
        this.activate();
    }
    activate(){
        this.outputs[0].setState( this.inputs[0].state && this.inputs[1].state );
        this.propagate();
    }
}

export class OR extends Gate {
    constructor( circuit, x, y ){
        super("OR", circuit, x, y , 2, 1, 80 );
        this.activate();
    }
    activate(){
        this.outputs[0].setState( this.inputs[0].state || this.inputs[1].state );
        this.propagate();
    }
}