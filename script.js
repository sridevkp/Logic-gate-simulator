import { And, Not, OR } from "./gate.js";
import WorkArea from "./work.js";

function setup(){
    const stage = new Konva.Stage({
        container: 'container', 
        width : window.innerWidth,
        height : window.innerHeight
    });
    window.addEventListener("resize", e => {
        stage.width  = window.innerWidth;
        stage.height = window.innerHeight; 
    })
    
    const layer = new Konva.Layer();
    
    stage.add(layer);
    layer.draw();

    const work = new WorkArea( layer );

    const centreX = stage.width() /2 ,
          centreY = stage.height()/2

    work.add( new Not( centreX -100, centreY -100) );
    work.add( new And( centreX, centreY ) );
    work.add( new OR( centreX -100, centreY + 100) );
}

function draw(){
    // requestAnimationFrame( draw );

}

setup();
draw();