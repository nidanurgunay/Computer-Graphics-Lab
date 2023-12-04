# Exercise 07

DEADLINE 18.12.2023 10:00 AM

## 1. Written

| a)                                                       |
| -------------------------------------------------------- |
| ![Abbildung a)](resources/projection.png "Abbildung a)") |

In order to use perspective to project a three-dimensional scene onto the image plane, WebGL models the clipping volume as a frustum of a pyramid (cf. Figure a), which can be represented by means of the projection matrix
$
M_\text{per} = \begin{bmatrix}
\frac{2n}{r-l} & 0 & \frac{r+l}{r-l} & 0 \\
0 & \frac{2n}{t-b} & \frac{t+b}{t-b} & 0 \\
0 & 0 & \frac{-(f+n)}{f-n} & \frac{-2fn}{f-n} \\
0 & 0 & -1 & 0
\end{bmatrix}
$

which maps directly to the canonical volume $`[-1, 1]^3`$. However, the perspective projection can also be thought of as an extension of the orthographic one, where a matrix $`P`$ first maps the truncated pyramid to the orthographic cuboid. The remaining mapping to $`[-1, 1]^3`$ is then done by the orthographic matrix $`M_\text{orth}`$. Let the sides of the projection cube be given as $`[l,r] \times [b,t] \times [f,n]`$.

$
   M_\text{orth} = \begin{bmatrix}
      \frac{2}{r-l} & 0 & 0 & -\frac{r+l}{r-l} \\
      0 & \frac{2}{t-b} & 0 & -\frac{t+b}{t-b} \\
      0 & 0 & -\frac{2}{f-n} & -\frac{n+f}{f-n} \\
      0 & 0 & 0 & 1
    \end{bmatrix}
$

Determine the matrix $`P`$. (4 points)

**Note:** You will need to calculate an inverse matrix for this.

## 2. Programming

This task is about transformation and projection. You get the JS code in `06.js` to render a colorful cube. The cube rotates continuously around its y-axis. The necessary _model_ matrix already exists and is passed to the vertex shader. In addition to the _Model_ matrix, the _View_ and _Projection_ matrices are usually used in WebGL. Both matrices already exist in the JS code and are also passed to the vertex shader, but they are only identity matrices that have no influence on the projection. You have to change them. (6 points)


You have to implement the view and projection matricies. In the file utility functions like `mat4`, `vec4`, `vec3`, `normalize`, `cross`, `substract`, `dot` are defined in `MVnew.js`.

### View Matrix
You have to implement the `lootAt` function. It takes the three vectors `eye`, `at` and `up` as input. An in-depth explanation of the view matrix is given Chapter 5.3.3 of the book. Other useful resources are: https://www.geertarien.com/blog/2017/07/30/breakdown-of-the-lookAt-function-in-OpenGL/ and https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/lookat-function/framing-lookat-function.html.

The `eye` point $e$ describes the position of the camera, and the `at` point $a$ the location the camera looks at. The `up` vector $v_{up}$ describes the camera's orientation pointing up. Based on these points and vectors, we define a new camera coordinate system.
The vector $v = a-e$ points from the camera to the point the camera looks at. This vector $v$ normalized will be the new z-axis of the new camera frame. We need two additional perpendicular vectors for the new camera coordinate system, the new y and x-axis. We obtain the new x-axis by taking the cross product of $up$ vector and the vector pointing from $e$ to $a$ and calling it $n$. The last missing new coordinate axis is the y-axis. We can obtain it by again taking the cross product of $n$ and $v$.
This would lead to a left-hand coordinate system. To convert it to a righthand one, we have to negate the $v$ vector. The steps you have to implement for the `lookAt` function are:

1. $v = \frac{a-e}{||a-e||}$
2. $n = \frac{v \times up}{||v \times up||}$
3. $u = \frac{n \times v}{||n \times v||}$
4. $v' = -v$

The final view Matrix will be:
$
\begin{bmatrix}
      n_x & n_y & n_z & -(n \cdot e) \\
      u_x & u_y & u_z & -(u \cdot e) \\
      v'_x & v'_y & v'_z & -(v' \cdot e) \\
      0 & 0 & 0 & 1
    \end{bmatrix}
$

### Projection Matrix
#### Orthographic
Implement the orthographic projection function using the matrix shon in the book in chapter 5.4 on page 269 or in the lecture slides. Pass the automatically updating values in `frustum_params` to your function generating the orthographic projection matrix.
#### Perspective
As shown in the figure above for the perspective frustum it is more common to specify the parameters of the pyramid shaped view volume by the vertical field of view (fov) and the aspect ration of the near clipping plane.
You first have to calculate the values $t, b, r, l$ of the corners of the view volume. Please note, that in the JS code the fov is given in degress and the function `Math.tan()` expects radians.

$t = tan(\frac{fov}{2})\cdot n$

$b = -t$

$r = t \cdot aspect$

$r = b \cdot aspect$

With those values you can implement the perspective projection matrix:

$
M_\text{per} = \begin{bmatrix}
\frac{2n}{r-l} & 0 & \frac{r+l}{r-l} & 0 \\
0 & \frac{2n}{t-b} & \frac{t+b}{t-b} & 0 \\
0 & 0 & \frac{-(f+n)}{f-n} & \frac{-2fn}{f-n} \\
0 & 0 & -1 & 0
\end{bmatrix}
$


In the JS and shader code there are multiple which are marked with a `TODO`. At these places you must modify the respective matrix at the correct places. The following variables are already defined in the code, which you don't have to change anymore.


Total: 10 Points
