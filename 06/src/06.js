let canvas;
let gl;

let VERTICIES = new Float32Array([
    // front
    0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,

    -0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,

    // right
    0.5, 0.5, -0.5,
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,

    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,

    // back
    -0.5, -0.5, 0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,

    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5,
    -0.5, -0.5, 0.5,

    // left
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,

    -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,

    // bottom
    0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,

    0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,

    // top
    -0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,

    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
]);

let INDICIES = new Uint16Array([
    // front
    0, 1, 2, 2, 3, 0,
    // right
    1, 5, 6, 6, 2, 1,
    // back
    7, 6, 5, 5, 4, 7,
    // left
    4, 0, 3, 3, 7, 4,
    // bottom
    4, 5, 1, 1, 0, 4,
    // top
    3, 2, 6, 6, 7, 3
]);

let COLORS = new Float32Array([
    // front
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    // right
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    // back
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    0.0, 0.0, 1.0,1.0,
    // left
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    1.0, 0.0, 0.0,1.0,
    // bottom
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    // bottom
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,
    0.0, 1.0, 0.0,1.0,

])

let frustum_params = {l: -1, r: 1, t: 1, b:-1, n:0.1, f:50, fov_deg: 45}


let angle = 0;

let camera_params = {eye: vec3(0, 0, 4),center:vec3(0, 0, 0), up:vec3(0, 1, 0)  }

let theta = 0
let rotationSpeed = 5*10e-2

let u_model
let u_projection
let u_view

let is_orthographic = true
let is_animating = true


document.addEventListener("keyup", keyUp, false);

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    
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




    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    let buffer_verticies = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_verticies);
    gl.bufferData(gl.ARRAY_BUFFER, VERTICIES, gl.STATIC_DRAW);


    let in_position = gl.getAttribLocation(program, "in_position");
    gl.vertexAttribPointer(in_position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(in_position);

    let buffer_colors = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_colors);
    gl.bufferData(gl.ARRAY_BUFFER, COLORS, gl.STATIC_DRAW);

    
    let in_color = gl.getAttribLocation(program, "in_color");
    gl.vertexAttribPointer(in_color, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(in_color);

    u_model = gl.getUniformLocation(program, "u_model");
    //TODO: Get the unform locations of the view and projection matrix from the shader and bind them to the variables u_projection and u_view
    u_view = gl.getUniformLocation(program, "u_view");
    u_projection = gl.getUniformLocation(program, "u_projection");
    
    initControls();
    
        render();
    
};

function initControls(){
    //Event listeners for all the inpunts updating the appropriate variables.
    document.getElementById("animate_checkbox").oninput = function (event) {
        is_animating = event.currentTarget.checked;
    };

    document.getElementById("orthographic_checkbox").oninput = function (event) {
        is_orthographic = event.currentTarget.checked;
    };

    document.getElementById("fov").oninput = function (event) {
        frustum_params.fov_deg = parseFloat(event.target.value);
    };
    document.getElementById("near_clip").oninput = function (event) {
        frustum_params.n = parseFloat(event.target.value);
    };
    document.getElementById("far_clip").oninput = function (event) {
        frustum_params.f = parseFloat(event.target.value);
    };

    document.getElementById("camera_x").oninput = function (event) {
        camera_params.eye[0] = parseFloat(event.target.value);
    };

    document.getElementById("camera_y").oninput = function (event) {
        camera_params.eye[1] = parseFloat(event.target.value);
    };

    document.getElementById("camera_z").oninput = function (event) {
        camera_params.eye[2] = parseFloat(event.target.value);
    };
    document.getElementById("lookat_x").oninput = function (event) {
        camera_params.center[0] = parseFloat(event.target.value);
    };

    document.getElementById("lookat_y").oninput = function (event) {
        camera_params.center[1] = parseFloat(event.target.value);
    };

    document.getElementById("lookat_z").oninput = function (event) {
        camera_params.center[2] = parseFloat(event.target.value);
    };

    document.getElementById("frustum_l").oninput = function (event) {
        frustum_params.l = parseFloat(event.target.value);
    };
    document.getElementById("frustum_r").oninput = function (event) {
        frustum_params.r = parseFloat(event.target.value);
    };
    document.getElementById("frustum_t").oninput = function (event) {
        frustum_params.t = parseFloat(event.target.value);
    };
    document.getElementById("frustum_b").oninput = function (event) {
        frustum_params.b = parseFloat(event.target.value);
    };
}


function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const mat_model = rotateY(angle)
    const mat_view = lookAt(camera_params.eye, camera_params.center, camera_params.up);
    let mat_projection  

    if (is_orthographic) {
        // orthographic projection matrix
        mat_projection = ortho(frustum_params.l, frustum_params.r, frustum_params.t, frustum_params.b, frustum_params.n, frustum_params.f);

    } else {
        mat_projection = perspective(frustum_params.fov_deg, 1.0, frustum_params.n, frustum_params.f);

    }

    gl.uniformMatrix4fv(u_model, false, flatten(mat_model));
    //TODO: Pass also the projection and view matrix to the vertex shader
    gl.uniformMatrix4fv(u_view, false, flatten(mat_view));
    console.log(mat_view);
    gl.uniformMatrix4fv(u_projection, false, flatten(mat_projection));

    gl.drawArrays(gl.TRIANGLES, 0, 36);

    if(is_animating){
    angle += rotationSpeed;
}
        requestAnimationFrame(render);

    
}

function rotateY(angle_deg){
    const mat_model = mat4();
    // model matrix
    mat_model[0][0] = Math.cos(radians(angle_deg));
    mat_model[0][2] = Math.sin(radians(angle_deg));
    mat_model[2][0] = -Math.sin(radians(angle_deg));
    mat_model[2][2] = Math.cos(radians(angle_deg));
    return mat_model

}

function ortho(left, right, bottom, top, near, far) {
    const ortho_mat = mat4(
        2 / (right - left), 0, 0, -(right + left) / (right - left),
        0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
        0, 0, -2 / (far - near), -(near + far) / (near - far),
        0, 0, 0, 1
    );
    return ortho_mat;
}


function perspective(fovy_deg, aspect, near, far) {
    //TODO: Implement this function based on the description of the perspective projection.
    t = Math.tan(fovy_deg/2) * near;
    let b = -near;
    let r = t*aspect
    let l = b*aspect

    let perspective_mat = mat4();
    perspective_mat = mat4(
        2*near/(r-l),0,(r+l)/(r-l),0,
        0, 2*near/(t-b),(t+b)/(t-b),0,
        0,0,-(far+near)/(far-near),-2*(far*near)/(far-near),
        0,0,-1,0


    )

    return perspective_mat
}
function lookAt(eye, at, up) {

   //TODO: Implement this function based on the description of the LookAt function in the book or in the website given in the task description.

       // Calculate zaxis
       const zaxis = [
        at[0] - eye[0],
        at[1] - eye[1],
        at[2] - eye[2]
    ];
    const zaxisLength = Math.sqrt(zaxis[0] * zaxis[0] + zaxis[1] * zaxis[1] + zaxis[2] * zaxis[2]);
    zaxis[0] /= zaxisLength;
    zaxis[1] /= zaxisLength;
    zaxis[2] /= zaxisLength;

    // Calculate xaxis
    const xaxis = [
        up[1] * zaxis[2] - up[2] * zaxis[1],
        up[2] * zaxis[0] - up[0] * zaxis[2],
        up[0] * zaxis[1] - up[1] * zaxis[0]
    ];
    const xaxisLength = Math.sqrt(xaxis[0] * xaxis[0] + xaxis[1] * xaxis[1] + xaxis[2] * xaxis[2]);
    xaxis[0] /= xaxisLength;
    xaxis[1] /= xaxisLength;
    xaxis[2] /= xaxisLength;

    // Calculate yaxis
    const yaxis = [
        xaxis[1] * zaxis[2] - xaxis[2] * zaxis[1],
        xaxis[2] * zaxis[0] - xaxis[0] * zaxis[2],
        xaxis[0] * zaxis[1] - xaxis[1] * zaxis[0]
    ];

    // Negate zaxis
    zaxis[0] = -zaxis[0];
    zaxis[1] = -zaxis[1];
    zaxis[2] = -zaxis[2];

/*
   const viewMatrix = mat4.fromValues(
       xaxis[0], yaxis[0], zaxis[0], 0,
       xaxis[1], yaxis[1], zaxis[1], 0,
       xaxis[2], yaxis[2], zaxis[2], 0,
       -vec3.dot(xaxis, eye), -vec3.dot(yaxis, eye), -vec3.dot(zaxis, eye), 1
   );
*/
    const viewMatrix = mat4(
        xaxis[0], yaxis[0], zaxis[0], -(xaxis[0] * eye[0] + yaxis[0] * eye[1] + zaxis[0] * eye[2]),
        xaxis[1], yaxis[1], zaxis[1], -(xaxis[1] * eye[0] + yaxis[1] * eye[1] + zaxis[1] * eye[2]),
        xaxis[2], yaxis[2], zaxis[2], -(xaxis[2] * eye[0] + yaxis[2] * eye[1] + zaxis[2] * eye[2]),
        0, 0, 0, 1
    );

   return viewMatrix;
}


function keyUp(e) {
    if (e.key === "ArrowLeft") {
        rotationSpeed += 10e-3;
    }
    if (e.key === "ArrowRight") {
        rotationSpeed -= 10e-3;
    }
}
