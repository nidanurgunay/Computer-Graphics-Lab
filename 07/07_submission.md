# Solution Exercise 7
Group: Nidanur Günay, Yu Zeyuan
## Task 1

*Flat Shading:* This method calculates only 1 brightness value per polygon which means the color is the same for all points in each polygon. Normal vector for each polygon is interpolated for the brightness calulation. This method has advantages such as being fast and has a simple computation but it has also disadvantages such as discountinuities at polygon boundries. This method also suffers from Mach band effect which is an effect where human mind subcunciously ncrease the contrast between 2 surfaces with various luminance. 

*Gouraud Shading:* In this method, normals are positioned at vertices and they are used to calculate intensities. That intensities are interpolated for brihtness calulation. It illuminates  or shades each vertex by using its location and vertex normal which are the averaged normals of the facets that share the vertex. It has advantages such that also being fast and having much smoother results since it uses the vertex normal per shared vertex to get continuity. However mach band effect is still visible and tend to eliminate specular component since it would be averaged over the polygon. 

*Phong Shading:* This method uses normals that are interpolated from the normal at vertices and these are used to brightness calculation per pixel.It linearly interpolates the surface normals across the facet. Advantage of the method is usually resulting smoother  outcom   es. However it is considerably more expensive.
## Task 2
Please edit the HTML/JS files in the ``src`` folder!
