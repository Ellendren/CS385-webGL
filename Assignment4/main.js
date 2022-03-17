
"use strict";

var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here
    
    //binding value varibles
    const sun_radius = 2.5,
          earth_radius = 1.5,
          moon_radius = 1,
          earth_orbit = 15,
          moon_orbit = 4,
          diameter = 2 * (earth_orbit + moon_orbit + moon_radius);

    //perspective projection varibles
    const near = 1,
          far = near + diameter,
          fovy = 2 * (Math.asin((diameter/2)/(near+(diameter/2))) * 180/Math.PI),
          aspect = canvas.clientWidth/canvas.clientHeight;

    console.log(fovy)
    
    const P = perspective(fovy, aspect, near, far);

    let Sun = new Sphere(50);
    Sun.radius= sun_radius;
    Sun.color = [1.0, 1.0, 0.0, 1.0];
    Sun.P = P;

    let Earth = new Sphere();
    Earth.radius = earth_radius;
    Earth.orbit = earth_orbit;
    Earth.color = [0.0, 0.0, 1.0, 1.0];
    Earth.P = P;


    let Moon = new Sphere();
    Moon.radius = moon_radius;
    Moon.orbit = moon_orbit;
    Moon.color = [0.9, 0.9, 0.9, 1.0];
    Moon.P = P;

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
        ms.scale(Sun.radius);
        Sun.MV = ms.current();
        Sun.render();
        ms.pop();

        //earth
        ms.push();
        ms.rotate(angle, axis);
        ms.translate(Earth.orbit, 0, 0);
        ms.push();//save the earth position for the moon to use later
        ms.scale(Earth.radius);
        Earth.MV = ms.current();
        Earth.render();
        ms.pop();

        //moon in realtion to earth
        ms.rotate(angle, axis);
        ms.translate(Moon.orbit, 0, 0);
        ms.scale(Moon.radius);
        Moon.MV = ms.current();
        Moon.render();
        ms.pop();


        
        angle += 1;
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}



window.onload = init;