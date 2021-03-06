

function Cube( gl, vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = {numComponents: 3};

    //hardcode cube verticies
    var positions = [
        0.0, 1.0, 1.0,    //top left, back
        1.0, 1.0, 1.0,     //top right, back
        0.0, 0.0, 1.0,   //bottom left, back
        1.0, 0.0, 1.0,    //bottom right, back
        0.0, 1.0, 0.0,     //top left, front
        1.0, 1.0, 0.0,      //top right, front
        0.0, 0.0, 0.0,    //bottom left, front
        1.0, 0.0, 0.0      //bottom right, front
    ];

    //note sense we use a triangle fan to render the cube, only y=the
    //order of the first three vertexs matter for the facing
    var indices = [0, 1, 2, 3, 7, 1, 5, 0, 4, 2, 6, 7, 4, 5];
    
    this.indices = { count: indices.length}
    

    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "aPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    this.uniforms = {
        MV: gl.getUniformLocation(this.program, "MV"),
        P: gl.getUniformLocation(this.program, "P")
    }
    this.MV = mat4();
    this.P = mat4();

    //get the CubeOutline object
    this.outline = new CubeOutline(gl, positions);

    this.render = () => {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv(this.uniforms.MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(this.uniforms.P, false, flatten(this.P));

        this.outline.MV = this.MV;
        this.outline.P = this.P;

    
        // Draw the cube
        //
        gl.drawElements( gl.TRIANGLE_STRIP, this.indices.count, gl.UNSIGNED_SHORT, 0 );

        this.outline.render();
    }
};
