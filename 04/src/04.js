var canvas;
var gl;

// var positions;

var numTimesToSubdivide = 0;
var bufferId;
var points = [];
var colors = [];
// var baseColors = [
//   vec3(1.0, 0.0, 0.0),
//   vec3(0.0, 1.0, 0.0),
//   vec3(0.0, 0.0, 1.0),
//   vec3(1.0, 1.0, 1.0),
// ];

var baseColors = [
  [1.0, 0.0, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 0.0, 1.0],
  [1.0, 1.0, 1.0],
];
function init() {
  canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) alert("WebGL 2.0 isn't available");

  //
  //  Initialize our data for the Sierpinski Gasket
  //

  // First, initialize the corners of our gasket with three positions.

  //
  //  Configure WebGL
  //

  // Load the data into the GPU
  var vertices = [
    vec3(0.0, 0.0, -1.0),
    vec3(0.0, 0.9428, 0.3333),
    vec3(-0.8165, -0.4714, 0.3333),
    vec3(0.8165, -0.4714, 0.3333),
  ];
  points = [];
  colors = [];

  // divideTriangle(vertices[0], vertices[1], vertices[2],
  //     numTimesToSubdivide);
  divideTetra(
    vertices[0],
    vertices[1],
    vertices[2],
    vertices[3],
    numTimesToSubdivide
  );

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
  console.log("cBuffer", cBuffer);

  //   let pointBuffer = gl.createBuffer();
  //   gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(3, 6), gl.STATIC_DRAW);

  //   var vColor = gl.getAttribLocation(program, "vColor");
  //   gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
  //   gl.enableVertexAttribArray(vColor);
  //   console.log("vcolor", vColor);
  var aColor = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColor);
  console.log("aColor", aColor);
  // Associate out shader variables with our data buffer
  let vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
  console.log("vBuffer", vBuffer);

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
  //gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);
  // console.log("positionLoc, aPosition", positionLoc);
  document.getElementById("slider").onchange = function (event) {
    numTimesToSubdivide = parseInt(event.target.value);
    render();
  };

  render();
}

function triangle(a, b, c, color) {
  //   colors.push(flatten(baseColors[color]));
  //   points.push(a);
  //   colors.push(flatten(baseColors[color]));
  //   points.push(b);
  //   colors.push(flatten(baseColors[color]));
  //   points.push(c);
  colors.push(baseColors[color]);
  points.push(a);
  colors.push(baseColors[color]);
  points.push(b);
  colors.push(baseColors[color]);
  points.push(c);
}
function tetra(a, b, c, d) {
  triangle(a, c, b, 0);
  triangle(a, c, d, 1);
  triangle(a, b, d, 2);
  triangle(b, c, d, 3);
}
function getMiddlePoint(u, v) {
  return [0.5 * (u[0] + v[0]), 0.5 * (u[1] + v[1]), 0.5 * (u[2] + v[2])];
}
function divideTetra(a, b, c, d, count) {
  if (count === 0) {
    tetra(a, b, c, d);
    return;
  }
  //   let ab = getMiddlePoint(a, b);
  //   let ac = getMiddlePoint(a, c);
  //   let ad = getMiddlePoint(a, d);
  //   let bc = getMiddlePoint(b, c);
  //   let bd = getMiddlePoint(b, d);
  //   let cd = getMiddlePoint(c, d);
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
window.onload = init;

function render() {
  // var vertices = [
  //     vec2(-1, -1),
  //     vec2(0, 1),
  //     vec2(1, -1)
  // ];
  console.log("colors at render", colors);
  console.log("points at render", points);

  //   var vertices = [
  //     vec3(0.0, 0.0, -1.0),
  //     vec3(0.0, 0.9428, 0.3333),
  //     vec3(-0.8165, -0.4714, 0.3333),
  //     vec3(0.8165, -0.4714, 0.3333),
  //   ];
  //   points = [];
  //   colors = [];
  //   // divideTriangle(vertices[0], vertices[1], vertices[2],
  //   //     numTimesToSubdivide);
  //   divideTetra(
  //     vertices[0],
  //     vertices[1],
  //     vertices[2],
  //     vertices[3],
  //     numTimesToSubdivide
  //   );
  //   let vBuffer = gl.createBuffer();
  //   gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  //   let cBuffer = gl.createBuffer();
  //   gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  //   gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
  //   gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
  points = [];
}
