let canvas;
let gl;

let l = -1;
let r = 1;
let t = 1;
let b = -1;

let n = 0.1;
let f = 50;

let fovy_deg = 35

let angle = 0;

const eye = vec3(0, 5, 10);
const center = vec3(0, 0, 0);
const up = vec3(0, 1, 0);

const ks = vec3(0.5, 0.9, 0.6)
const kd = vec3(0.8, 0.8, 0.8)
const ka = vec3(0.0, 0.0, 0.2)

const color_light = vec3(1.0, 1.0, 1.0)
const light_position = vec3(2.0, 1.0, 2.0)

let shiny = 128.0;

let theta = 0
let rotationSpeed = 10e-4

let u_model
let u_projection
let u_view

let u_eye
let u_light_position
let u_light_color
let u_shininess
let u_ka
let u_kd
let u_ks

let is_orthographic = false
let is_animating = true

let mesh

let u_texture_stone
let u_texture_grass
let u_texture_snow

let texture_stone
let texture_grass
let texture_snow

let snow_line = 0.8
let max_height


document.addEventListener("keyup", keyUp, false);

function getMaxElevation(meshData) {
    var vertices = meshData.vertices;
    var maxElevation = -Infinity;

    // Iterate through the vertices and find the maximum elevation
    for (var i = 1; i < vertices.length; i += 3) {
        var elevation = vertices[i];

        if (elevation > maxElevation) {
            maxElevation = elevation;
        }
    }

    return maxElevation;
}

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

    mesh = new OBJ.Mesh(window.cgmi.terrain);

    max_height = getMaxElevation(mesh);

    console.log(max_height);

    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    let in_position = gl.getAttribLocation(program, "in_position");
    gl.enableVertexAttribArray(in_position);

    let in_texcoord = gl.getAttribLocation(program, "in_texcoord");
    gl.enableVertexAttribArray(in_texcoord);

    let in_normal = gl.getAttribLocation(program, "in_normal");
    gl.enableVertexAttribArray(in_normal);

    OBJ.initMeshBuffers(gl, mesh);
    console.log(mesh);



    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.vertexAttribPointer(in_position, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);


    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);
    gl.vertexAttribPointer(in_texcoord, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
    gl.vertexAttribPointer(in_normal, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);


    u_model = gl.getUniformLocation(program, "u_model");
    u_view = gl.getUniformLocation(program, "u_view");
    u_projection = gl.getUniformLocation(program, "u_projection");

    u_max_height = gl.getUniformLocation(program, "max_height");
    u_snow_line = gl.getUniformLocation(program, "snow_line");

    // TODO create textures and get the locations of the corresponding texture variables in the shaders using gl.getUniformLocation() and gl.createTexture()


    // TODO activate the texture slots in WebGL and bind the textures to them using the following set of commands: - NOTE - Beware that you need to activate the correct active texture before binding the next one!
    /*
        gl.activeTexture(gl.TEXTURE0); - NOTE - Applies here
        gl.bindTexture(gl.TEXTURE_2D, texture_material);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image_material);
        gl.generateMipmap(gl.TEXTURE_2D);

    */

    let image_stone = new Image();
    image_stone.src = window.cgmi.stone

    image_stone.addEventListener('load', function() {
        //TODO above
    });

    let image_grass = new Image();
    image_grass.src = window.cgmi.grass


    image_grass.addEventListener('load', function() {
        //TODO above
    });

    let image_snow = new Image();
    image_snow.src = window.cgmi.snow


    image_snow.addEventListener('load', function() {
        //TODO above
    });

    initControls();

    render();
};

function initControls() {
    document.getElementById("animate_checkbox").onchange = function (event) {
        is_animating = event.currentTarget.checked;
        render();
    };

    document.getElementById("orthographic_checkbox").onchange = function (event) {
        is_orthographic = event.currentTarget.checked;
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


    const mat_model = mat4();
    const mat_view = my_lookAt(eye, center, up);
    let mat_projection


    // model matrix
    mat_model[0][0] = Math.cos(angle);
    mat_model[0][2] = Math.sin(angle);
    mat_model[2][0] = -Math.sin(angle);
    mat_model[2][2] = Math.cos(angle);

    if (is_orthographic) {
        // orthographic projection matrix
        mat_projection = my_ortho(l, r, t, b, n, f);
    } else {
        mat_projection = my_perspective(fovy_deg, 1.0, n, f);

    }

    gl.uniformMatrix4fv(u_model, false, flatten(mat_model));
    gl.uniformMatrix4fv(u_view, false, flatten(mat_view));
    gl.uniformMatrix4fv(u_projection, false, flatten(mat_projection));

    gl.uniform3fv(u_eye, flatten(eye));

    gl.uniform1f(u_max_height, max_height);
    gl.uniform1f(u_snow_line, snow_line);


    // TODO activate the correct texture again and send it over to the gpu using the following set of commands: - NOTE - Beware that you need to activate the correct active texture before binding the next one!

    /* 
    
    gl.activeTexture(gl.TEXTURE0); - NOTE - Applies here
    gl.bindTexture(gl.TEXTURE_2D, texture_material);
    gl.uniform1i(u_texture_material, 0); - NOTE - Applies here
    
    */

    gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_INT, 0);

    if (is_animating) {
        angle += rotationSpeed;
    }

    requestAnimationFrame(render);
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
    const u = cross(v, n_vec);

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
