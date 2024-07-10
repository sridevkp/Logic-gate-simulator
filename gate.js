import Node from "./node.js";

export default class Gate{
    inputs = [];
    outputs = [];
    connections = [];

    constructor( name, x , y, iNodes, oNodes, width = 80, fill = "grey"){
        this.name = name ;

        const height = 40 + (Math.max(iNodes,oNodes) -1)* 15;

        this.xformGroup = new Konva.Group({
            x, y,
        })

        this.shape = new Konva.Rect({
            x : 0, y : 0, width, fill, height,
            stroke : "white", draggable : true,
            strokeWidth : 0 ,
            shadowOffsetX : 2,
            shadowOffsetY : 2,
            shadowOpacity:0.5,
            shadowBlur: 10,
            cornerRadius : 3,
            onDragsStart : this.ondragstart ,
            onDrageEnd : this.ondragend
        })
        this.xformGroup.add( this.shape );

        for( let i = 0; i < iNodes; i++){
            const iNode = new Node(self, 0, height/2) ;
            this.xformGroup.add( iNode.getShape() );
            this.inputs.push( iNode );
        }

        for( let i = 0; i < oNodes; i++){
            const oNode = new Node(self, width, height/2);
            this.xformGroup.add( oNode.getShape() );
            this.inputs.push( oNode );
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
            this.xformGroup.move(delta);
            this.shape.position({x:0,y:0})
        })
        this.shape.on('dragend', () => {
            document.body.style.cursor = 'grab';
            this.shape.shadowBlur(10);
            this.shape.shadowOffsetX(5);
            this.shape.shadowOffsetY(5);
        });
    }

    getShape(){
        return this.xformGroup ;
    }

    activate(){

    }
}

export class Not extends Gate {
    constructor( x, y ){
        super("NOT", x, y , 1, 1 );
    }
    activate(){

    }
}

export class And extends Gate {
    constructor( x, y ){
        super("AND", x, y , 2, 1 );
    }
    activate(){

    }
}

export class OR extends Gate {
    constructor( x, y ){
        super("OR", x, y , 2, 1 );
    }
    activate(){

    }
}