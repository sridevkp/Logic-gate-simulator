import Node from "./node.js";


export default class Gate{
    inputs = [];
    outputs = [];
    connections = [];
    gap = 20 ;
    fontSize = 20 ;

    constructor( name, work, x , y, iNodesCount, oNodesCount, width = 80, fill = "grey", fillLabel = "white"){
        this.name = name ;
        this.work = work ;

        const height = 40 + (Math.max(iNodesCount,oNodesCount) -1)* this.gap;

        this.xformGroup = new Konva.Group({ x, y })

        this.shape = new Konva.Rect({
            x : 0, y : 0, width, fill, height,
            stroke : "white",  draggable : true,
            strokeWidth : 0 ,  cornerRadius : 3,
            shadowOffsetX : 2, shadowOffsetY : 2,
            shadowOpacity:0.5, shadowBlur: 10,
        })
        this.xformGroup.add( this.shape );

        this.label = new Konva.Text({
            x: width / 2 - name.length * this.fontSize/3 ,
            y: height /2 - this.fontSize/2,
            fill: fillLabel, text: name,
            fontFamily: 'Calibri', fontStyle : "bold" , align : "center",
            fontSize  : this.fontSize, listening : false,
        });
        this.xformGroup.add( this.label );

        let iy = (height - this.gap *(iNodesCount-1))/2 ;
        for( let i = 0; i < iNodesCount; i++){
            const iNode = new Node(this, "input", 0, iy + i *this.gap) ;
            this.xformGroup.add( iNode.getShape() );
            this.inputs.push( iNode );
        }
        iy = (height - this.gap *(oNodesCount-1))/2;
        for( let i = 0; i < oNodesCount; i++){
            const oNode = new Node(this, "output", width, iy + i *this.gap);
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

    onmove( cb ){
        this.shape.on("dragmove", cb )
    }

    activate(){

    }
}

export class Not extends Gate {
    constructor( work, x, y ){
        super("NOT", work, x, y , 1, 1 );
    }
    activate(){

    }
}

export class And extends Gate {
    constructor( work, x, y ){
        super("AND", work, x, y , 2, 1 );
    }
    activate(){

    }
}

export class OR extends Gate {
    constructor( work, x, y ){
        super("OR", work, x, y , 2, 1 );
    }
    activate(){

    }
}