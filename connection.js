class Connection{
    constructor( i , o  ){
        this.i = i;
        this.o = o;
    }
    fire(){
        this.o.state = this.i.state ;
    }
}