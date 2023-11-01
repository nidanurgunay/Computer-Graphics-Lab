"use strict";

let canvas;
let gl;

let positions = [-0.5, -0.5, 0,
                  0.5, -0.5, 0,
                  0.0, 0.5, 0];
let colors = [1.0, 0.0, 0.0,
              0.0, 1.0, 0.0,
              0.0, 0.0, 1.0];



window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

  
    //
    //  Configure WebGL
    //

    //Specify the size of the viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    //Specify the background color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);



    //Load and compile shaders
    let program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

   

    //Create buffer for vertices
    let positionBuffer = gl.createBuffer();

    //bind a given WebGLBuffer to a target
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    //Pass the vertices to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //Get location of attribute in shader program
    let positionLoc = gl.getAttribLocation(program, "in_position");

    //Specify the number of components in a vertex attribute
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    //color codes, basically the same as vertex code above
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    let in_color = gl.getAttribLocation(program, "in_color");
    gl.vertexAttribPointer(in_color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(in_color);




    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, positions.length/3);
    requestAnimationFrame(render);
}
