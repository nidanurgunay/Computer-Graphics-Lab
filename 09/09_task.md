# Exercise 09
### Deadline 15.01.2024

## 1. Written 5P
As an alternative to the Phong reflection scheme, the Blinn or also Blinn-Phong reflection scheme exists. The latter can be calculated more efficiently than the reflection vector of the original Phong model by calculating a so-called _half-way vector_.
```math
R_{\textit{Phong}} = E \cdot (R \cdot V)^{s}
```

the equation for Blinn-Phong is

```math
R_{\textit{Blinn}} = E \cdot (H \cdot N)^{s}
```

with:
- $`E`$: Energy/Intensity of light
- $`R`$: ideal reflection direction
- $`V`$: Direction towards the camera
- $`H`$: Halfway vector between $`I`$ (direction to the light source) and $`V`$
- $`N`$: Surface normal
- $`s`$: _shininess_-factor


| Figure a) Reflection pattern on flat surface with light source and camera. |
| --------------------------------------------------------------------------- |
| ![Abbildung a)](resources/reflection_with_angles.png "Abbildung a)")                    |

Using appropriate equation you can derive from figure a) and the properties of the displayed vectors, show that the two models are identical or not identical. (5 points)

## 2. Programming 5P
This task is about using textures for objects in a scene. As theoretically worked out in the Lecture and sections 7.5 (Texture Mapping in WegGL) – 7.14 in the book, textures can be mapped to objects via texture coordinates and thus create complex surface properties (as colors in the texture). In the fragment shader, several textures can be queried simultaneously and their color values combined.

Usually, images of some colored structure are used as textures, but how do we fit something flat and rectangular onto 3D objects of different shapes...? To get this mapping between the rectangular texture and the object, texture coordinates must be set for each vertex in addition to the position and normals. Mostly, the coordinates are written directly into the Obj files.

In this task, use the object terrain.obj provided by us, which already has texture coordinates to create a 3D textured mountain range with different terrain zones. To use an image file as a texture in WebGL, the image must first be loaded and then bound to a texture ID.

First, create textures and get the locations of the corresponding texture variables in the shaders using `gl.getUniformLocation()` and `gl.createTexture()`.

Then, for each texture, activate the texture slot in WebGL and bind the textures to them using the following set of commands
```
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture_material);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image_material);
gl.generateMipmap(gl.TEXTURE_2D);

```

You then need to send the texture data to the shaders in the `render()` method using the following:
```
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture_material);
gl.uniform1i(u_texture_material, 0);

```

-- NOTE -- Beware that you need to activate the correct active texture before binding the next one! Do this by incrementing the active texture `gl.TEXTURE1`... and assign them to the correct slot by incrementing the second parameter of `gl.uniform1i()` in the `render method`.

In the fragment shader, colors can now be read from the texture using the `texture(...)` command and the texture coordinates (`texcoord`). Read the color for each of the two textures and mix them using the GLSL function `mix(...)`. The colors should be mixed depending on the height of the vertex (`position.y`), and the local steepness (more details in fragment shader code).


Total: 10 points
