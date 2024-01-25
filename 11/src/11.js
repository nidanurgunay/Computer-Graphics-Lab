let canvas;
let gl;

let l = -1;
let r = 1;
let t = 1;
let b = -1;

let n = 2;
let f = 50;

let fovy_deg = 35

let angle = 0;

const eye = vec3(0, 0, 4);
const center = vec3(0, 0, 0);
const up = vec3(0, -1, 0);

const ks = vec3(0.5, 0.9, 0.6)
const kd = vec3(0.8, 0.8, 0.8)
const ka = vec3(0.0, 0.0, 0.2)

const color_light = vec3(1.0,1.0,1.0)
const light_position = vec3(2.0,1.0,2.0)

let shiny = 128.0;


let theta = 0
let rotationSpeed = 500e-3

let u_model
let u_projection
let u_view
let u_normal

let u_eye 
let u_light_position 
let u_light_color 
let u_shininess 
let u_ka
let u_kd 
let u_ks

let u_use_wireframe
let u_use_culling


let is_orthographic = false
let is_animating = true

let is_wireframe = false
let use_culling = false


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

    mesh = new OBJ.Mesh(window.cgmi.torus);




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
    u_view = gl.getUniformLocation(program, "u_view");
    u_projection = gl.getUniformLocation(program, "u_projection");
    u_normal = gl.getUniformLocation(program, "u_normal");

    u_eye = gl.getUniformLocation(program, "u_eye");
    u_light_position = gl.getUniformLocation(program, "u_light_position");
    u_light_color = gl.getUniformLocation(program, "u_light_color");
    u_shininess = gl.getUniformLocation(program, "u_shininess");
    u_ka = gl.getUniformLocation(program, "u_ka");
    u_kd = gl.getUniformLocation(program, "u_kd");
    u_ks = gl.getUniformLocation(program, "u_ks");

    u_use_culling = gl.getUniformLocation(program, "u_use_culling");
    u_use_wireframe = gl.getUniformLocation(program, "u_use_wireframe");


    initControls();

    if (is_animating) {
        render();
    }
};

function initControls() {
    document.getElementById("animate_checkbox").onchange = function (event) {
        is_animating = event.currentTarget.checked;
        render();
    };

    document.getElementById("orthographic_checkbox").onchange = function (event) {
        is_orthographic = event.currentTarget.checked;
    };

    document.getElementById("wireframe_checkbox").onchange = function (event) {
        is_wireframe = event.currentTarget.checked;
    };

    document.getElementById("culling_checkbox").onchange = function (event) {
        use_culling = event.currentTarget.checked;
    };

    

    document.getElementById("fov").onchange = function (event) {
        fovy_deg = parseFloat(event.target.value);
    };
  
}


function hexTorgb(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
  }

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    let mat_model = rotate(angle, [0,0.5,0.5]);
    const mat_view = my_lookAt(eye, center, up);
    let mat_projection

    mat_model = mult(scale(0.5, 0.5, 0.5), mat_model);


    

    if (is_orthographic) {
        // orthographic projection matrix
        mat_projection = my_ortho(l, r, t, b, n, f);
    } else {
        mat_projection = my_perspective(fovy_deg, 1.0, n, f);

    }
    let mat_normal = normalMatrix(mat_model, true);
    gl.uniformMatrix3fv(u_normal, false, flatten(mat_normal));
    gl.uniformMatrix4fv(u_model, false, flatten(mat_model));
    gl.uniformMatrix4fv(u_view, false, flatten(mat_view));
    gl.uniformMatrix4fv(u_projection, false, flatten(mat_projection));

    gl.uniform3fv(u_eye, flatten(eye));
    gl.uniform3fv(u_light_position, flatten(light_position));
    gl.uniform3fv(u_light_color, flatten(color_light));
    gl.uniform3fv(u_ka, flatten(ka));
    gl.uniform3fv(u_ks, flatten(ks));
    gl.uniform3fv(u_kd, flatten(kd));
    gl.uniform1f(u_shininess, shiny);

    
if(use_culling){
    gl.uniform1i(u_use_culling, 1);

}else{
    gl.uniform1i(u_use_culling, 0);
}


    if(is_wireframe){
        gl.drawElements(gl.LINES, mesh.indexBuffer.numItems, gl.UNSIGNED_INT , 0);
        gl.uniform1i(u_use_wireframe, 1);


    }else{
        gl.drawElements(gl.TRIANGLES , mesh.indexBuffer.numItems, gl.UNSIGNED_INT , 0);
        gl.uniform1i(u_use_wireframe, 0);

    }




    angle += rotationSpeed;
    if (is_animating) {
        requestAnimationFrame(render);

    }
}

function my_ortho(left, right, top, bottom, near, far) {
    const ortho_mat = mat4();
    ortho_mat[0][0] = 2.0 / (r - l);
    ortho_mat[1][1] = 2.0 / (t - b);
    ortho_mat[2][2] = -2.0 / (f - n);
    ortho_mat[0][3] = -(r + l) / (r - l);
    ortho_mat[1][3] = -(t + b) / (t - b);
    ortho_mat[2][3] = -(f + n) / (f - n);
    return ortho_mat
}

function my_perspective(fovy_deg, aspect, near, far) {
    const t = Math.tan(radians(fovy_deg) / 2.0) * near
    const b = - t
    const r = t * aspect
    const l = b * aspect


    const perspective_mat = mat4();
    perspective_mat[0][0] = (2.0 * near) / (r - l)
    perspective_mat[0][2] = (r + l) / (r - l)

    perspective_mat[1][1] = (2.0 * near) / (t - b)
    perspective_mat[1][2] = (t + b) / (t - b)

    perspective_mat[2][2] = -(far + near) / (far - near)
    perspective_mat[2][3] = -(2 * far * near) / (far - near)

    perspective_mat[3][2] = -1.0
    perspective_mat[3][3] = 0.0

    return perspective_mat

}

function my_lookAt(eye, at, up) {
    const mat_view = mat4();

    // view matrix
    const v = normalize(subtract(eye, at));
    const n_vec = normalize(cross(up, v));
    const u = cross(n_vec, v);

    mat_view[0][0] = n_vec[0];
    mat_view[0][1] = n_vec[1];
    mat_view[0][2] = n_vec[2];
    mat_view[1][0] = u[0];
    mat_view[1][1] = u[1];
    mat_view[1][2] = u[2];
    mat_view[2][0] = v[0];
    mat_view[2][1] = v[1];
    mat_view[2][2] = v[2];
    mat_view[0][3] = -dot(n_vec, eye);
    mat_view[1][3] = -dot(u, eye);
    mat_view[2][3] = -dot(v, eye);

    return mat_view;
}


function keyUp(e) {
    if (e.key === "ArrowLeft") {
        rotationSpeed += 10e-4;
    }
    if (e.key === "ArrowRight") {
        rotationSpeed -= 10e-4;
    }
}
