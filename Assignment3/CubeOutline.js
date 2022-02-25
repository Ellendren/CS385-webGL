function CubeOutline(gl, cubePositins, vertexShaderId, fragmentShaderId){

    positions = cubePositins || 
    [
        -0.5, 0.5, -0.5,    //top left, froont
        0.5, 0.5, -0.5,     //top right, front
        -0.5, -0.5, -0.5,   //bottom left, front
        0.5, -0.5, -0.5,    //bottom right, front
        -0.5, 0.5, 0.5,     //top left, back
        0.5, 0.5, 0.5,      //top right, back
        -0.5, -0.5, 0.5,    //bottom left, back
        0.5, -0.5, 0.5      //bottom right, back
    ];

    var vertShdr = vertexShaderId || "Outline-vertex-shader";
    var fragShdr = fragmentShaderId || "Outline-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr)

    //make sure the shader pipeline has been establised
    if ( this.program < 0 ) {
        alert( "Error: CubeOutline shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    var indices = [ 0, 1, 0, 2, 1, 3, 2, 3, //front face
                    0, 4, 1, 5, 2, 6, 3, 7, //sides
                    4, 5, 4, 6, 5, 7, 6, 7 //back face
                ];

    this.positions = {numComponents: 3};

    this.indices = {count : indices.length};

    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    this.positions.attributeLoc = gl.getAttribLocation(this.program, "aPosition");
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    this.uniforms = {
        MV: gl.getUniformLocation(this.program, "MVOutline")
    }
    this.MV = mat4();

    this.render = function(){

        gl.useProgram(this.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv(this.uniforms.MV, false, flatten(this.MV));

        // Draw the cubes outline
        //
        gl.drawElements( gl.LINES, this.indices.count, gl.UNSIGNED_SHORT, 0 );

    };

}