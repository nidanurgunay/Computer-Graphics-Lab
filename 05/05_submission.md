# Solution Exercise 5
Group: Nidanur Günay, Yu Zeyuan
## Task 1
1.1) Let $T_1$ and $`T_2`$ are translations by vectors $t_1$ and $`t_2`$ respectively.

- $`T_1`$ $\circ$ $`T_2`$ (x)  = $`T_1`$ ( $`T_2`$  (x)) =   $`T_1`$ ( x + $`t_1`$) = x +  $`t_1`$ +  $`t_2`$.
Since addition is commutative, translation is also commutative. 

- $`T_2`$ $\circ$ $`T_1`$ (x)  = $`T_2`$ ( $`T_1`$  (x)) =   $`T_2`$ ( x + $`t_2`$) = x +  $`t_2`$ +  $`t_1`$.

Both solution results the same which proves  translation is  commutative. 

1.2)  Let $`S`$ is our scaling and $`R`$ is our rotation transformation. 

- ($`R`$ $\circ$ $`S`$) (x) = $`R`$ ( $`S`$ (x)) 
  Since scaling is multiplying the corrdinates with some coefficient.
- $`R`$ ( $`S`$ (x)) = R(kx) = kRx

Since multiplication is commutative, One rotation and one uniform scaling is also commutative. 

- ($`S`$ $\circ$ $`R`$) (x) = $`S`$ ( $R(x)) =  S(Rx) = kRx$  

1.3) Let $q_1$ and $q_2$ are 2 quaternions that represents the roatation by angles  $\theta_1$  and  $\theta_2$ respectively around the same unit axis vector which is $u = (u_x, u_y,u_z)$ .
- $q_1$ = $\cos$( $\frac{\theta_1}{2} )$+ $\sin$( $\frac{\theta_1}{2}$) $(u_xi, u_zj, u_zk)$   
- $q_2$ = $\cos$ ( $\frac{\theta_2}{2}$) + $\sin$ ( $\frac{\theta_2}{2}$) $(u_xi, u_zj, u_zk)$   

- $q_1$.$q_2$ =  $\cos$( $\frac{\theta_1}{2}$) $\cos$( $\frac {\theta_2}{2})$  + $\cos$( $\frac{\theta_1}{2}$ )$\sin$ ( $\frac{\theta_2}{2}$) $(u_xi, u_zj, u_zk)$ + $\cos$( $\frac{\theta_2}{2}$ ) $\sin$( $\frac{\theta_1}{2}$) $(u_xi, u_zj, u_zk)$  + $\sin$( $\frac{\theta_1}{2}$) $(u_xi, u_zj, u_zk)$ $\sin$ ( $\frac{\theta_2}{2}) (u_xi, u_zj, u_zk)$   

- $q_2$.$q_1$ = $\cos$ ( $\frac{\theta_1}{2}$ ) $\cos$( $\frac{\theta_2}{2}$ ) + $\cos$( $\frac{\theta_2}{2}$ ) $\sin$ ( $\frac{\theta_1}{2}$) $(u_xi, u_zj, u_zk)$ + $\cos$ ( $\frac{\theta_1}{2}$) $\sin$( $\frac{\theta_2}{2}$ ) $(u_xi, u_zj, u_zk)$ + $\sin$( $\frac{\theta_1}{2}$) $(u_xi, u_zj, u_zk)$ $\sin$ ( $\frac{\theta_2}{2}$) $(u_xi, u_zj, u_zk)$   

- As it can be seen from the result $q_1$ . $q_2$ = $q_2$ .$q_1$ which means  two rotations around the same axis is  commutative.


2.a) Quaternion for a rotation of 90 degrees around the X axis is:
   - $q_x$ =  $\cos$($\frac{\pi}{4}$) + $\sin$($\frac{\pi}{4}$)$i$ = $\frac{\sqrt{2}}{2}$  + $\frac{\sqrt{2}}{2}$ $i$ 


2.b) Quaternion for a rotation of 90 degrees around the Y axis is:
   - $q_y$ =  $\cos$($\frac{\pi}{4}$) + $\sin$($\frac{\pi}{4}$)$j$ = $\frac{\sqrt{2}}{2}$  + $\frac{\sqrt{2}}{2}$ $j$ 

3) - $q_x$ $q_y$ = $\frac{\sqrt{2}}{2}$ $\frac{\sqrt{2}}{2}$ +$\frac{\sqrt{2}}{2}$ $\frac{\sqrt{2}}{2}$ $i$ +  $\frac{\sqrt{2}}{2}$ $\frac{\sqrt{2}}{2}$ $j$ +  $\frac{\sqrt{2}}{2}$ $i$  $\frac{\sqrt{2}}{2}$ $j$ 
   
 = $\frac{1}{2}$ + $\frac{1}{2}$ $i$ + $\frac{1}{2}$ $j$ + $\frac{1}{2}$ $ij$  
 = $\frac{1}{2}$ + $\frac{1}{2}$ $i$ + $\frac{1}{2}$ $j$ + $\frac{1}{2}$ $k$ 
 
1) Lets say translation is represented by $T$ = 
```math
\begin{vmatrix}1&0&0&T_y\\0&1&0&T_z\\0&0&1&T_x\\0&0&0&1\end{vmatrix}

```
## Task 2 
Please edit the HTML/JS files in the ``src`` folder!

*Include the images you created and downloaded for task 5 here.'*
