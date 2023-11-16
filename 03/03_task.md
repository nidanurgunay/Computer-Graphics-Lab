# Exercise 02
## Submission Deadline 
Monday 20.11.2023 10am

*Please do not forget to add the names of all group members to your submission.*

## Written
The following two figures show two representations of the function $f(x,y) = \textrm{sin}(x^2 + y^2 )$, generated with different sampling patterns.

* In figure a) a regular grid is used for the sampling. The sampling points are located in the center of the grid cells where the function is evaluated.
* In b) the same grid is used for the sampling, but the sampling points are still shifted randomly within the grid cell (_jittering_).

Explain ...
1. ... how the patterns (_Moiré_ artifacts) visible in figure a) are created. Your answer should be at least one paragraph long. (2 points)
2. ... why they are only visible to a reduced extent in b)? Your answer should be at least one paragraph long. (2 points)

| a)                                               | b)                                               |
| ------------------------------------------------ | ------------------------------------------------ |
| ![Figure a)](resources/01.png "Figure a)")       | ![Figure b)](resources/02.png "Figure b)")       |

# Programming
Implement the function $`f`$ in JS unsing `Math.sin()`. Create figures a) and b) with size of $`500 \times 500`$ pixels showing function $`f`$. 
Show the range $[0,0]$ to $[30,30]$ of function `f` in your figures. Create a screenshot of your results using the download buttons and upload also upload it with your solution. It should look very similar to the examples in the figures above.
Use `Math.random()` to generate randomly distributed number in the range $[0,1]$

**Please note** that you have to map the result of the sine function from $[-1, 1]$ to $[0, 255]$ to get a gray value.

Points:

* Create figure a) with Moiré artifacts and include an image of your canvas showing the Moiré artifacts in your submission.(3 points).
* Creating figure b) with jittering (3 points) and include an image of your canvas showing the jittered output in your submission..

Total: 10 points
