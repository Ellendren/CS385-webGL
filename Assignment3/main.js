

function init(){

    var angle = 0.0;
    var axis = [1.0, 1.0, 0.1];
    
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    //vatibles for perspective()
    let aspect = width/height,
        fovy = 90,
        n = 0.5,
        f = 5;

    //variables for lookAt()
    let eye = [0, 0, 1.4],
        at = [0 , 0, 0],
        up = [0, 1, 0];

    gl.clearColor(0.0, 0.4, 0.4, 1.0);

    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);

    //the winding order is reveresd after the transformations
    //so I changed the frontface mode
    gl.frontFace(gl.CW);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    cube = new Cube(gl);

    let render = () => {
    
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        angle += 0.5;
    
        let V = lookAt(eye, at, up);
        let MV = mult(V , rotate(angle, axis));
        let P = perspective(fovy, aspect, n, f);

        console.log(V);
        console.log(P);


        cube.MV = MV;
        cube.P = P;
    
        cube.render();
    
       requestAnimationFrame(render);
    
    }

    //render();
   requestAnimationFrame(render);

}

window.onload = init;