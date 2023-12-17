let canvas;
let gl;


let angle = 0;


const ks = vec3(0.5, 0.9, 0.6)
const kd = vec3(0.8, 0.8, 0.8)
const ka = vec3(0.0, 0.0, 0.2)

const color_light = vec3(1.0,1.0,1.0)
const light_position = vec3(0,0,-1)


let theta = 0
let rotationSpeed = 10e-3


let u_light_position 
let u_light_color 
let u_ka
let u_kd 

let is_animating = true

let mesh


document.addEventListener("keyup", keyUp, false);

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    //
    //  Initialize our data for the Sierpinski Gasket
    //

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

    mesh = new OBJ.Mesh(window.cgmi.suzanne);




    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    let in_position = gl.getAttribLocation(program, "in_position");
    gl.enableVertexAttribArray(in_position);

    let in_normal = gl.getAttribLocation(program, "in_normal");
    gl.enableVertexAttribArray(in_normal);

    OBJ.initMeshBuffers(gl, mesh);
    console.log(mesh);


    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.vertexAttribPointer(in_position, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
    gl.vertexAttribPointer(in_normal, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);


    u_model = gl.getUniformLocation(program, "u_model");


    //TODO: Declare usiform u_light_position, u_light_color, u_ka and u_kd
    u_light_position = gl.getUniformLocation(program, "u_light_position");
    u_light_color = gl.getUniformLocation(program, "u_light_color");
    u_ka = gl.getUniformLocation(program, "u_ka");
    u_kd = gl.getUniformLocation(program, "u_kd");

    initControls();

   
    render();
    
};

function initControls() {
    document.getElementById("animate_checkbox").onchange = function (event) {
        is_animating = event.currentTarget.checked;
    };

  
    document.getElementById("color-picker-light").oninput = function (event) {
        const c = hexTorgb(event.target.value)
        color_light[0] = c[0] / 255.0
        color_light[1] = c[1] / 255.0
        color_light[2] = c[2] / 255.0
    };


    document.getElementById("color-picker-ka").oninput = function (event) {
        const c = hexTorgb(event.target.value)
        ka[0] = c[0] / 255.0
        ka[1] = c[1] / 255.0
        ka[2] = c[2] / 255.0
    };
    document.getElementById("color-picker-kd").oninput = function (event) {
        const c = hexTorgb(event.target.value)
        kd[0] = c[0] / 255.0
        kd[1] = c[1] / 255.0
        kd[2] = c[2] / 255.0
    };

}


function hexTorgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
  }

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const mat_model = mat4();
    // model matrix
    mat_model[0][0] = Math.cos(angle) * 0.5;
    mat_model[0][2] = Math.sin(angle)*0.5;
    mat_model[2][0] = -Math.sin(angle)* 0.5;
    mat_model[2][2] = Math.cos(angle) * 0.5;

    mat_model[1][1] =0.5;
    mat_model[3][3] =0.5;


    gl.uniformMatrix4fv(u_model, false, flatten(mat_model));

    // TODO: Pass the light position and light color as uniforms to the shader.
    gl.uniform3fv(u_light_position, light_position);
    gl.uniform3fv(u_light_color, color_light);
    
    // Pass the values of k_a and k_d to the shader
    gl.uniform3fv(u_ka, ka);
    gl.uniform3fv(u_kd, kd);


    gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_INT , 0);

    if (is_animating) {
        angle += rotationSpeed;

    }
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
