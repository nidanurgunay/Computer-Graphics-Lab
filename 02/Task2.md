# Exercise 02 <!-- omit in toc -->

## 1. Theoretical

**Please** write the solution in `solution.md`. You can write math expressions in LaTeX syntax in Markdown by writing them between the dollar signs `$` or within a code block with the language declared as `math`. These are then rendered in _Gitlab_ with `KaTeX`:

````markdown
This math is inline $`a^2+b^2=c^2`$.

This is on a separate line

```math
a^2+b^2=c^2
```
````
results in:

This math is inline $a^2+b^2=c^2$.

This is on a separate line

```math
a^2+b^2=c^2
```

There are also two practical _extensions_ for _Visual Studio Code_:
* [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
* [Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath) (Muss auf _GitLab_ umgestellt werden)

### 1.1. Renderinggleichung
The rendering equation describes the outgoing light radiation at each point of a scene according to the rules of geometric optics and can be formulated as follows:

$L_s(x, \omega) = E(x, \omega) + \int_\Omega f_r(x,\omega^\prime, \omega) L_i(x,\omega^\prime) \cos (\theta) d\omega^\prime$

Explain in a few words the meaning of the following variables. (6 points)

1. $L_s(x, \omega)$
2. $E(x, \omega)$
3. $\Omega$
4. $f_r(x,\omega^\prime, \omega)$
5. $L_i(x, \omega^\prime)$
6. $\cos (\theta)$


### 1.2. Raytracing vs Radiosity
Name at least three differences between the ray tracing method and the radiosity method (2 points).

## 2. Programming
Uniforms are a way to pass the *same value* to a variable in the vertex to all vertices in the vertex shader and all fragments in the fragment shader.
In this programming exercise a new slider was added to the website. It will be used to control the triangle's size. The slider's value is bound to the variable `u_size` in the JS code. Your task is to pass it as a uniform to the vertex shader and use it to scale the vertices.

Edit the sections in the code marked by `TODO`
(2 points)

Total: 10 Points
