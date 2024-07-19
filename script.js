import { And, Not, OR } from "./gate.js";
import Circuit from "./circuit.js";

var stage ;
var circuit ;

document.getElementById("add-input").addEventListener('click', () => {
    circuit.addCircuitNode( false )
})
document.getElementById("remove-input").addEventListener('click', () => {
    circuit.removeCircuitNode( false )
})
document.getElementById("add-output").addEventListener('click', () => {
    circuit.addCircuitNode( true )
})
document.getElementById("remove-output").addEventListener('click', () => {
    circuit.removeCircuitNode( true )
})

function registerGate( gateName, circuit, Gate ){
    const gateElement = createGateElement( gateName );
    document.getElementById("library").appendChild( gateElement )
    gateElement.addEventListener('dragend', e => {
        e.y < window.innerHeight - 200 && circuit.add( new Gate( circuit, e.x, e.y ));
    } )
}

function setup(){
    stage = new Konva.Stage({
        container: 'container', 
        width : window.innerWidth,
        height : window.innerHeight
    });
    
    const layer = new Konva.Layer();
    
    stage.add(layer);
    layer.draw();
    
    circuit = new Circuit( layer, 3, 3, stage.width(), stage.height() );
    
    window.addEventListener("resize", e => {
        stage.width(  window.innerWidth  );
        stage.height( window.innerHeight ); 
        circuit.onResize( stage.width(), stage.height() );
    })
    stage.on('mouseup', () => circuit.onMouseUp());
    stage.on('mousemove', () => circuit.onMouseMove(stage.getPointerPosition()))

    const centreX = stage.width() /2 ,
          centreY = stage.height()/2

    circuit.add( new Not( circuit, centreX -100, centreY -100) );
    circuit.add( new And( circuit, centreX, centreY ) );
    circuit.add( new OR(  circuit, centreX -100, centreY + 100) );

    registerGate( "NOT", circuit, Not )
    registerGate( "AND", circuit, And )
    registerGate( "OR" , circuit, OR  )
}

function draw(){
    // requestAnimationFrame( draw );

}

setup();
draw();