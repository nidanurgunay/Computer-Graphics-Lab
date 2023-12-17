# Solution Exercise 7
Group: *Nidanur Günay, Yu zeyuan*
## Task 1
$\textbf{Flat Shading:}$
Flat shading calculates the illumination for a polygon only once and then applies that color to the entire polygon. This means that the shading is uniform across the entire face, and the interpolation is done for color values. 

Typically, only the normal vector of the face is used in the lighting calculations, and this calculation is performed $\textbf{per face}$. 

While flat shading is computationally less expensive, it tends to produce less realistic results, especially for curved surfaces or models with complex lighting.

$\textbf{Gouraud Shading:}$
Gouraud shading, interpolates the vertex normals across the face of the polygon. The lighting calculations are then performed at 
$\textbf{each vertex}$, and the resulting colors are interpolated across the polygon's surface. This provides a smoother appearance compared to flat shading as it takes into account the variation in lighting across the polygon. Gouraud shading is computationally more expensive than flat shading but generally offers better visual fidelity, especially for models with subtle lighting variations.


$\textbf{Phong shading:}$
Phong shading interpolates normals across the face of the polygon. However, unlike Gouraud shading, the lighting calculations are done $\textbf{per fragment}$ rather than per vertex. This provides even more accurate results, especially for specular highlights and reflections. (Blinn-)Phong shading is computationally more intensive than Gouraud shading, but it is widely used in computer graphics due to its ability to capture complex lighting effects. It allows for the representation of more realistic materials and lighting scenarios, making it suitable for a wide range of applications.
## Task 2
Please edit the HTML/JS files in the ``src`` folder!
