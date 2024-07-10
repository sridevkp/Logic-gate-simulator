export default class Connection{
    constructor( i , o  ){
        this.line = new Konva.Line({ points : [], stroke : "white", strokeWidth : 2 });
        this.i = i;
        this.o = o;
        this.updateLine()

        this.i.onmove( () => this.updateLine() );
        this.o.onmove( () => this.updateLine() );

        this.line.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
            this.line.strokeWidth(3);
        })
        this.line.on("mouseleave", () => {
            document.body.style.cursor = "default";
            this.line.strokeWidth(2);
        })
    }
    updateLine(){
        const start = this.i.getShape().absolutePosition(),
              end = this.o.getShape().absolutePosition();
        this.line.points([ start.x, start.y, end.x, end.y ]);
    }
    fire(){
        this.o.state = this.i.state ;
    }
    valid(){
        return this.i && this.o 
    }
    getShape(){
        return this.line
    }
}