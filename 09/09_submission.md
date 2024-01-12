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
cos^-1(\alpha ) + cos^-1(\varPhi) = cos^-1(\betha)
```

## Task 2
Please edit the HTML/JS files in the ``src`` folder!
