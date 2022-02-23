

function init(){
    
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.4, 0.4, 1.0);

    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK_FACE);

    cube = new Cube(gl);

    requestAnimationFrame(render);

}

function render(){
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cube.render();

    requestAnimationFrame(render);

}

window.onload = init;