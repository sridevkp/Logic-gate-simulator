import Gate, { And, Not, OR } from "./gate.js";
import Circuit from "./circuit.js";
import CompositeGate from "./compositeGate.js";

var stage, layer;
var savedCircuits = new Map(); 
var circuit ;

document.getElementById("add-input").addEventListener('click', () => { circuit.addCircuitNode( false )})
document.getElementById("remove-input").addEventListener('click', () => { circuit.removeCircuitNode( false )})
document.getElementById("add-output").addEventListener('click', () => { circuit.addCircuitNode( true )})
document.getElementById("remove-output").addEventListener('click', () => { circuit.removeCircuitNode( true )})

document.getElementById("save").addEventListener('click', () => {
    const name = prompt("Name for circuit").trim().toUpperCase();
    if( !name || savedCircuits.get(name) ) return alert("Invalid input");
    
    savedCircuits.set(name, circuit);
    registerGate( name, name );

    circuit.destroy();
    circuit = new Circuit( layer, 2, 1, stage.width(), stage.height() );
})

function registerGate( gateName, GateClass ){
    const gateElement = createGateElement( gateName );
    document.getElementById("library").appendChild( gateElement )
    gateElement.addEventListener('dragend', e => {
        if(e.y < window.innerHeight - 200 ){
            if( Gate.isPrototypeOf(GateClass)  ){
                circuit.add( new GateClass( circuit, e.x, e.y ));
            }else{
                const innerCircuit = savedCircuits.get(GateClass);
                innerCircuit && circuit.add( new CompositeGate( GateClass, circuit, innerCircuit, e.x, e.y))
            }
        }   
    } )
}


function setup(){
    stage = new Konva.Stage({
        container: 'container', 
        width : window.innerWidth,
        height : window.innerHeight
    });
    
    layer = new Konva.Layer();
    
    stage.add(layer);
    layer.draw();
    
    circuit = new Circuit( layer, 2, 1, stage.width(), stage.height() );
    document.getElementById("new").addEventListener('click', () => {
        if( !confirm("Are you sure") ) return ;
        circuit.destroy();
        circuit = new Circuit( layer, 2, 1, stage.width(), stage.height() )
    })

    window.addEventListener("resize", e => {
        stage.width(  window.innerWidth  );
        stage.height( window.innerHeight ); 
        circuit.onResize( stage.width(), stage.height() );
    })
    stage.on('mouseup', () => circuit.onMouseUp());
    stage.on('mousemove', () => circuit.onMouseMove(stage.getPointerPosition()))

    const centreX = stage.width() /2 ,
          centreY = stage.height()/2

    circuit.add( new Not( circuit, centreX, centreY ) );
    // circuit.add( new And( circuit, centreX, centreY ) );
    // circuit.add( new OR(  circuit, centreX -100, centreY + 100) );
    registerGate( "NOT", Not )
    registerGate( "AND", And )
    registerGate( "OR" , OR  )
}

function draw(){
    // requestAnimationFrame( draw );

}

setup();
draw();