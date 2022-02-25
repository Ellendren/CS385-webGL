

function init(){

    var angle = 0.0;
    var axis = [1.0, 1.0, 0.1];
    
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.4, 0.4, 1.0);

    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    cube = new Cube(gl);

    //render();
    requestAnimationFrame(render);

    function render(){
    
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        angle += 1.0;
    
        rotationMatrix = rotate(angle, axis);

        cube.rotationMatrix = rotationMatrix;
    
        cube.render();
    
        requestAnimationFrame(render);
    
    }

}

window.onload = init;