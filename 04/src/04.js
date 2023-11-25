
var canvas;
var gl;

var positions;

var numTimesToSubdivide = 0;

var bufferId;

let baseColors = [
    [1.0, 0.0, 0.36],
    [0.61, 1.0, 0.3],
    [1.0, 0.52, 0.14],
    [1.0, 0.0, 1.0]
  ]

let colors = [   
]


let points = [];
function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");


    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three positions.


    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    let colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,  8 * Math.pow(4, 8), gl.STATIC_DRAW)


    let aColor = gl.getAttribLocation(program, 'aColor')
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aColor)


    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(4, 8), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    document.getElementById("slider").onchange = function (event) {
        numTimesToSubdivide = parseInt(event.target.value);
        render();
    };


    render();
};



// utility to scale a vector
function scale(point, scale) {
    return [point[0]*scale, point[1]*scale, point[2]*scale]
  }
  
function triangle (a, b, c, color) {
    colors.push(scale(baseColors[color], 1))
    points.push(a)
    colors.push(scale(baseColors[color], 1))
    points.push(b)
    colors.push(baseColors[color])
    points.push(c)
  }
  
  function tetra (a, b, c, d) {
    triangle(a, c, b, 0)
    triangle(a, c, d, 1)
    triangle(a, b, d, 2)
    triangle(b, c, d, 3)
  }
  
  function getMiddlePoint(u, v){
     return [0.5*(u[0] + v[0]), 0.5* (u[1] + v[1]), 0.5* (u[2] + v[2])]
  }
  
  
  function divideTetra(a, b, c, d, count) {
    if(count===0){
      tetra(a, b, c, d)
      return
    }
    let ab = getMiddlePoint(a, b)
    let ac = getMiddlePoint(a, c)
    let ad = getMiddlePoint(a, d)
    let bc = getMiddlePoint(b, c)
    let bd = getMiddlePoint(b, d)
    let cd = getMiddlePoint(c, d)
    --count
    divideTetra(a, ab, ac, ad, count)
    divideTetra(ab, b, bc, bd, count)
    divideTetra(ac, bc, c, cd, count)
    divideTetra(ad, bd, cd, d, count)
  }

window.onload = init;

function render() {
    var vertices = [
        vec3(0.0000, 0.0000, -1.0000),
        vec3(0.0000, 0.9428, 0.3333),
        vec3(-0.8165, -0.4714, 0.3333),
        vec3(0.8165, -0.4714, 0.3333)
    ];
    

    /*
    divideTriangle(vertices[0], vertices[1], vertices[2],
        numTimesToSubdivide);
    */
    console.log(colors)

    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], numTimesToSubdivide) 

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
    points = [];
}
