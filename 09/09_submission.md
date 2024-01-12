# Solution Exercise 9
Group: *Nidanur Günay, Yu zeyuan*
## Task 1
When we analyse 2 brightness methods, we can easily see the main difference which is the vectors that is being used for the dot product. Since dot product operation mathematically means

We need to look for the angles between R and V for the Phong and H and N for the Blinn-Phong reflection models which are $`cos^-1(\gamma)`$ and  $`cos^-1(\varPhi)`$ . 

| Figure 1) Hand-Drawings of reflections and angles.             |
| -------------------------------------------------------------- |
| ![Abbildung a)](resources/drawing_angles-1.png "Abbildung a)") |

Since H is the halfway vector between $`I`$ (direction to the light source) and $`V`$, we would have the equation of

```math
cos^{-1} ( \alpha ) + cos^{-1} ( \varPhi ) = cos^{-1} ( \beta )
```

Since normal vector would equally seperate the angle between the light and ideal reflection direction, we would have another equation

Angle between H and R = $`cos^-1(\beta)`$ -  $`cos^-1(\gamma)`$ . 
```math
cos^{-1} ( \alpha ) = cos^{-1} ( \beta ) - cos^{-1} ( \gamma ) + cos^{-1} ( \varPhi ) 
```

```math
cos^{-1} ( \alpha ) + cos^{-1} ( \gamma ) = cos^{-1} ( \beta )  + cos^{-1} ( \varPhi ) 
```

When we replace the $`cos^-1(\beta)`$ with the result of the first equation in the second one.

```math
cos^{-1} ( \alpha ) + cos^{-1} ( \gamma ) = cos^{-1} ( \alpha ) + cos^{-1} ( \varPhi )  + cos^{-1} ( \varPhi ) 
```
```math
 cos^{-1} ( \gamma ) = 2 cos^{-1} ( \varPhi )  
```

## Task 2
Please edit the HTML/JS files in the ``src`` folder!
