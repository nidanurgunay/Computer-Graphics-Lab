# Exercise 05
## 1. Written
1. Show that the following operations are commutative. Give an actual mathematical proof, and do not write too much prose except for explaining the steps you are taking: (1 point)
    1. Two translations
    2. One rotation and one uniform scaling
    3. Two rotations around the same axis
2. Find the quaternions and explain how you got them: (1 point)
   1. For a 90° rotation around the X axis
   2. For a 90° rotation around the Y axis
3. Determine the product of the two quaternions of (2) and give all relevant steps in the computation. (1 point)
4. Prove that any sequence of rotations and translations can be represented by a single rotation around the coordinate origin and a following translation. (2 points)

**Note**: For a better understanding of quaternions, the following videos or websites are useful:
* https://www.youtube.com/watch?v=kHFwysRM2ps (for use cases)
* https://www.youtube.com/watch?v=d4EgbgTm0Bg (for deeper understanding)
* https://quaternions.online/ (visualization of unit quaternions(!))

## 2. Programming

In this exercise you will modify the JS so that the three-dimensional Sierpiński triangle can be rotated. The difference with the last exercise sheet, however, is that this time we use the various rotation matrices to change the view of the Sierpiński triangle.

### 2.1 (2 Points)
Change the provided solution of the last exercise, so that you rotate all tetrahedra around the z-axis and the origin of the coordinate frame.
Define a variable `theta`, which describes the current angle of rotation. In each render function call, increase the angle by `rotationSpeed`, create a new rotation matrix, and pass it as uniform to the shader. Modify the vertex shader to apply the rotation to all verticies. Note that the `cos` and `sin` functions in JS expect radians

An output is shown here:
![Task 2.1](resources/Task2_1.gif "Task 2.1")

### 2.2 (3 Points)
Change the provided solution of the last exercise, so that you rotate all tetrahedra around the z-axis and *the center of each tetrahedron*.
Define a variable `theta`, which describes the current angle of rotation. In each render function call, increase the angle by `rotationSpeed`, create a new rotation matrix, and pass it as uniform to the shader. Modify the vertex shader to apply the rotation to all verticies. Plase keep in mind, that you have to move each triangle to the origin, rotate it and move it back. Note that the `cos` and `sin` functions in JS expect radians.

![Task 2.2](resources/Task2_2.gif "Task 2.2")


Create the rotation matrix and pass them to the vertex shader as `uniform mat4`. For this, look at WebGL's `glUniformMatrix4fv` function on how to pass the matrix to the shader.

```
let myMat= mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);
gl.uniformMatrix4fv(u_rotation_matrix_loc, false, flatten(myMat));
```

**Important:** In order to create matrices use the function `mat4` **exclusively**.

**Note:**
Matrices in WebGL are always used in _column-major_ format. I.e., if we have the following matrix M
```math
\text{M} = \begin{pmatrix}
     0 & 1 & 2 & 3 \\
     4 & 5 & 6 & 7 \\
     8 & 9 & 10 & 11 \\
    12 & 13 & 14 & 15
    \end{pmatrix}
```
and write them in _column-major_ order, we get `{0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15}`, i.e. column-wise order. 
To avoid confuction with the math notation, we use the matricies in _Row-Major_ notation and use the `flatten` function to pass the matrix to WebGL. Thus the order you have to specify the matricies in the JS code is `{0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15}`, i.e. row-wise arrangement.

Total: 10 points
