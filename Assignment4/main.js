
"use strict";

var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here

    let solar = new Solar();

    //perspective projection varibles
    const near = 100,
          far = near + solar.diameter,
          fovy = 2* (Math.asin((solar.diameter/2)/(near+(solar.diameter/2))) * 180/Math.PI),
          aspect = canvas.clientWidth/canvas.clientHeight;
    
    const P = perspective(fovy, aspect, near, far);


    solar.setP(P);

    //rotaion info
    let angle = 0.0;
    let axis = [0,0,1];

    function render() {

        // Update your motion variables here
    
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        
        // Add your rendering sequence here
        let ms = new MatrixStack();

        let V = translate(0.0, 0.0, -0.5 * (near + far));

        ms.load(V);

        //sun
        ms.push();
        ms.scale(solar.sun.radius);
        solar.sun.MV = ms.current();
        solar.sun.render();
        ms.pop();

        //earth
        ms.push();
        ms.rotate(angle, axis);
        ms.translate(solar.earth.orbit, 0, 0);
        ms.push();//save the earth position for the moon to use later
        ms.scale(solar.earth.radius);
        ms.rotate(angle, axis);
        solar.earth.MV = ms.current();
        solar.earth.render();
        ms.pop();

        //moon in realtion to earth
        ms.rotate(angle, axis);
        ms.translate(solar.moon.orbit, 0, 0);
        ms.scale(solar.moon.radius);
        solar.moon.MV = ms.current();
        solar.moon.render();
        ms.pop();

        //saturn
        ms.push();
        ms.rotate(angle/2, axis);
        ms.translate(solar.saturn.orbit, 0, 0);
        ms.push()//save this info for saturns disk
        ms.scale(solar.saturn.radius);
        solar.saturn.MV = ms.current();
        solar.saturn.render();
        ms.pop();

        //saturns disk
        ms.scale(solar.saturn.disk.radius);
        solar.saturn.disk.MV = ms.current();
        solar.saturn.disk.render();
        ms.pop();

        
        angle += 1;
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}



window.onload = init;