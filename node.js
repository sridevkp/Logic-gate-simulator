export default class Node{
    state = false;
    constructor( parent, x = 0, y = 0, radius = 7){
        this.shape = new Konva.Circle({
            x, y, radius,
            fill : "lightgreen",
        });
        this.tempLine = 

        this.shape.on("mousedown", () => {
            console.log("downed")
        })
        this.shape.on("mouseup", () => {
            console.log("uppped")
        })
    }
    getShape(){
        return this.shape ;
    }
    setpos( x, y ){
        this.shape.x = x;
        this.shape.y = y;
    }
}