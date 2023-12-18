# Exercise 08
### Deadline 08.01.2024

## 1. Programming 5P
In this tasks we want to implement the *Gouraud Shading*. For this we use the `suzanne.obj` model. For the implementation you implement the lighting caluculation in the vertex shader.
## 2. Programming 5P
In this tasks we want to implement the *Blinn-Phong Shading*. For this we use the `suzanne.obj` model. For the implementation you implement the lighting caluculation in the fragment shader.

## **Note** the following points:
- In the JS code, a camera position, a light position and the light color are each defined as `vec3`.
- Since complex material properties cannot be easily reproduced in real-time computer graphics, they are usually approximated using the light reflection parameters $`k_a`$, $`k_d`$, $`k_s`$. These stand for the different light properties _Ambient_, _Diffuse_ and _Specular_. To describe the reflectance properties, an additional _Shininess_ parameter is necessary. Also for these parameters suitable variables of the type `vec3` or `float` are defined in the JS code. You can adjust their value using the color selectors and sliders.
- The defined variables are passed to the vertex/fragment shader as `uniform` variables:

  ```glsl
  uniform vec3 u_eye;
  uniform vec3 u_light_position;
  uniform vec3 u_light_color;
  uniform float u_shininess;
  uniform vec3 u_ka;
  uniform vec3 u_kd;
  uniform vec3 u_ks;
  ```

- Calculate the view direction vector and the light vector in the vertex shader for the Gouraud Shading and emmit the color as calculated below per vertex. For the  Blinn-Phong Shading perform these caluclations in the fragment shader:

- Calculates the reflection model in the shader:
```math
Color = k_a*I_a + \sum_i{I_i (k_d(N \cdot L) + k_s(H \cdot N)^\alpha)}
```
 in a modified form:
```math
Color = k_a*I + I (k_d(N \cdot L) + k_s(H \cdot N)^\alpha)
```

with $`H = L + V`$; $`N`$=normal; $`L`$=direction of light vector; $`V`$=direction of view vector and $`\alpha = shininess`$. Only one light source is to be used (therefore $`i=1`$, $`I`$ = light color).

**Note:** For the calculation of the scalar product (e.g. $`H \cdot N`$) the vectors must be normalized.


Total: 10 points
