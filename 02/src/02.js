"use strict";

let canvas;
let gl;

const positions = [-0.5, -0.5, 0,
    0.5, -0.5, 0,
    0.0, 0.5, 0];

const colors = [1, 0, 0,
            0, 1, 0,
            0, 0, 1];

let sizeLoc
let u_size = 0.5


window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    document.getElementById("size_slider").onchange = function (event) {
        u_size = parseFloat(event.target.value);
    };


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



    //Create buffer for vertices
    let colorBuffer = gl.createBuffer();

    //bind a given WebGLBuffer to a target
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    //Pass the vertices to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //Get location of attribute in shader program
    let colorLoc = gl.getAttribLocation(program, "in_color");

    //Specify the number of components in a vertex attribute
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    //TODO: find the uniform "u_size" in the shader



    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //TODO: pass the value sizeLoc to the uniform u_size

    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
    requestAnimationFrame(render);
}
