"use strict";

let canvas;
let gl;

let positions = [];
let colors = [];
let theta = 0;
let rotationSpeed = 10e-3;

let numTimesToSubdivide = 3;

let uRotationMatrix;
let rotationMatrix = mat4(); // Initialize with the identity matrix

document.addEventListener("keyup", keyUp, false);

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) alert("WebGL 2.0 isn't available");

  //
  //  Initialize our data for the Sierpinski Gasket
  //

  initVertices();

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // enable hidden-surface removal

  gl.enable(gl.DEPTH_TEST);

  //  Load shaders and initialize attribute buffers

  let program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Get the uniform location for the rotation matrix AFTER using the shader program
  uRotationMatrix = gl.getUniformLocation(program, "uRotationMatrix");

  // Create a buffer object, initialize it, and associate it with the
  //  associated attribute variable in our vertex shader

  let cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  let colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  let vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  let positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  document.getElementById("slider").onchange = function (event) {
    numTimesToSubdivide = parseInt(event.target.value);
    colors = [];
    positions = [];
    initVertices();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
  };

  render();
};
function initVertices() {
  // First, initialize the vertices of our 3D gasket
  // Four vertices on unit circle
  // Intial tetrahedron with equal length sides

  var vertices = [
    vec3(0.0, 0.0, -1.0),
    vec3(0.0, 0.9428, 0.3333),
    vec3(-0.8165, -0.4714, 0.3333),
    vec3(0.8165, -0.4714, 0.3333),
  ];

  divideTetra(
    vertices[0],
    vertices[1],
    vertices[2],
    vertices[3],
    numTimesToSubdivide
  );
}

function triangle(a, b, c, color) {
  // add colors and vertices for one triangle

  let baseColors = [
    vec3(1.0, 0.0, 0.0),
    vec3(0.0, 1.0, 0.0),
    vec3(0.0, 0.0, 1.0),
    vec3(0.0, 0.0, 0.0),
  ];

  colors.push(baseColors[color]);
  positions.push(a);
  colors.push(baseColors[color]);
  positions.push(b);
  colors.push(baseColors[color]);
  positions.push(c);
}

function tetra(a, b, c, d) {
  // tetrahedron with each side using
  // a different color

  triangle(a, c, b, 0);
  triangle(a, c, d, 1);
  triangle(a, b, d, 2);
}

function divideTetra(a, b, c, d, count) {
  // check for end of recursion

  if (count === 0) {
    tetra(a, b, c, d);
  }

  // find midpoints of sides
  // divide four smaller tetrahedra
  else {
    var ab = mix(a, b, 0.5);
    var ac = mix(a, c, 0.5);
    var ad = mix(a, d, 0.5);
    var bc = mix(b, c, 0.5);
    var bd = mix(b, d, 0.5);
    var cd = mix(c, d, 0.5);

    --count;

    divideTetra(a, ab, ac, ad, count);
    divideTetra(ab, b, bc, bd, count);
    divideTetra(ac, bc, c, cd, count);
    divideTetra(ad, bd, cd, d, count);
  }
}

function render() {
  theta += rotationSpeed;
  console.log("Rotation Speed: " + rotationSpeed);
  // Create a rotation matrix and pass it as a uniform to the shader
  rotationMatrix = rotate(theta, vec3(0, 0, 1)); // Rotation around the
    gl.uniformMatrix4fv(uRotationMatrix, false, flatten(rotationMatrix));

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, positions.length);
  requestAnimationFrame(render);
}

function keyUp(e) {
  if (e.key === "ArrowLeft") {
    rotationSpeed += 10e-4;
  }
  if (e.key === "ArrowRight") {
    rotationSpeed -= 10e-4;
  }
}

function rotate(angle, axis) {
  //counter-clockwise!
  let c = Math.cos(radians(angle));
  let s = Math.sin(radians(angle));
  let t = 1.0 - c;

  let rotationMatrix = mat4(
    t * axis[0] * axis[0] + c,
    t * axis[0] * axis[1] - s * axis[2],
    t * axis[0] * axis[2] + s * axis[1],
    0.0,
    t * axis[0] * axis[1] + s * axis[2],
    t * axis[1] * axis[1] + c,
    t * axis[1] * axis[2] - s * axis[0],
    0.0,
    t * axis[0] * axis[2] - s * axis[1],
    t * axis[1] * axis[2] + s * axis[0],
    t * axis[2] * axis[2] + c,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0
  );

  /*
let rotationMatrix = mat4(
    c,-s,0.0            , 0.0,
    s,c,0.0            , 0.0,
    0.0,0.0,1.0            , 0.0,
    0.0, 0.0, 0.0, 1.0
);
*/
  return rotationMatrix;
}

function radians(degrees) {
  return (degrees * Math.PI) / 180.0;
}
