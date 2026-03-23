# Computer Graphics Lab

A collection of 12 hands-on exercises implementing core computer graphics concepts using **WebGL 2** and **GLSL**, completed as part of the Computer Graphics course at the University of Konstanz (WS 2023/24).

## Topics Covered

| Exercise | Topic |
|----------|-------|
| 01 | WebGL setup, vertex/fragment shaders, colored triangle |
| 02 | Sampling, aliasing, and anti-aliasing theory |
| 03 | Jittering, Moire patterns, 2D transformations |
| 04 | Geometric transformations, matrix math |
| 05 | 3D transformations, homogeneous coordinates |
| 06 | Projection matrices (orthographic & perspective) |
| 07 | Lighting models — flat, Gouraud, and Phong shading |
| 08 | Gouraud shading implementation in vertex shader |
| 09 | Phong vs Blinn-Phong reflection models |
| 10 | Color spaces — CMY, HSV, RGB |
| 11 | Ray tracing fundamentals |
| 12 | Neural networks as activation functions in graphics |

## Tech Stack

- **WebGL 2** — GPU-accelerated rendering in the browser
- **GLSL (OpenGL Shading Language)** — vertex and fragment shaders
- **JavaScript** — scene setup, buffer management, math utilities
- **HTML5 Canvas**

## How to Run

Start a local server in the project root:

```bash
python3 -m http.server 8080
```

Then open any exercise in your browser, e.g.:

```
http://localhost:8080/01/src/01.html
http://localhost:8080/06/src/06.html
http://localhost:8080/07/src/07.html
```

> A local server is required (not `file://`) due to browser CORS restrictions when loading external resources.

## Course

**Computer Graphics** — University of Konstanz, Winter Semester 2023/24
Based on: *Interactive Computer Graphics – A Top-Down Approach with WebGL* by Edward Angel & Dave Shreiner

## License

[MIT](LICENSE)
