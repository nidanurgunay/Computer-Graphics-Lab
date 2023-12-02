# Solution Exercise 5
Group: Nidanur Günay, Yu Zeyuan
## Task 1
1.1) Let $T_1$ and $`T_2`$ are translations by vectors $t_1$ and $`t_2`$ respectively.

- $`T_1` \circ `T_2`$ (x)  = $`T_1`$ ( $`T_2`$  (x)) =   $`T_1`$ ( x + $`t_1`$) = x +  $`t_1`$ +  $`t_2`$.
Since addition is commutative, translation is also commutative. 

- $`T_2`$ $\circ$ $`T_1`$ (x)  = $`T_2`$ ( $`T_1`$  (x)) =   $`T_2`$ ( x + $`t_2`$) = x +  $`t_2`$ +  $`t_1`$.

Both solution results the same which proves  translation is  commutative. 

1.2)  Let $`S`$ is our scaling and $`R`$ is our rotation transformation. 

- ($`R`$ $\circ$ $`S`$) (x) = $`R`$ ( $`S`$ (x)) 
  Since scaling is multiplying the corrdinates with some coefficient.
- $`R`$ ( $`S`$ (x)) = R(kx) = kRx

Since multiplication is commutative, One rotation and one uniform scaling is also commutative. 

- ($`S`$ $\circ$ $`R`$) (x) = $`S`$ ( $`R`(x)) =  S(Rx) = kRx$  

1.3) Let $q_1$ and $q_2$ are 2 quaternions that represents the roatation by angles  $\theta_1$  and  $\theta_2$ respectively around the same unit axis vector which is $u = (u_x, u_y,u_z)$ .
- $q_1$ = $\cos$($\frac{\theta_1}{2} ) $+ $\sin(\frac{\theta_1}{2} $) $(u_xi, u_zj, u_zk)$   
- $q_2$ = $\cos(\frac {\theta_2}{2}$) + $\sin(\frac{\theta_1}{2} $) $(u_xi, u_zj, u_zk)$   

- $q_1$.$q_2$ =  $\cos$( $\frac {\theta_1}{2}) \cos$($\frac {\theta_1}{2})  + \cos$($\theta_1$ \frac2)$\sin(\theta_2 $/ 2) $(u_xi, u_zj, u_zk)$ + $\cos(\theta_2 \frac 2) \sin(\frac{\theta_1}{2} $) $(u_xi, u_zj, u_zk)$  + $\sin(\frac{\theta_1}{2} $) (u_xi, u_zj, u_zk)\sin(\theta_2 \frac 2) (u_xi, u_zj, u_zk)$   

- $q_2$.$q_1$ = $\cos(\theta_1 \frac 2)\cos(\theta_2 \frac 2) + \cos(\theta_2 \frac 2)\sin(\frac{\theta_1}{2} $) (u_xi, u_zj, u_zk) + \cos(\theta_1 \frac 2)\sin(\theta_2 \frac 2) (u_xi, u_zj, u_zk) + \sin(\theta_1 \frac2) (u_xi, u_zj, u_zk)\sin(\theta_2 \frac 2) (u_xi, u_zj, u_zk)$   

- As it can be seen from the result $q_1.q_2 = q_2.q_1 $ which means  two rotations around the same axis is  commutative.


Let $`R_{\theta_1}`$ and  $`R_{\theta_2}`$ be rotations by angles  $\theta_1$  and  $\theta_2$ respectively around the same axis. Let p is our point.

$`R_{\theta1}`$ $\circ$ $`R_{\theta 2}`$ (p) = $`R_{\theta1}`$ ($`R_{\theta 2}`$ (p)) = $`R_{\theta1}`$ $(\cos (\theta 2) p  + \sin (\theta 2)$)
## Task 2
Please edit the HTML/JS files in the ``src`` folder!

*Include the images you created and downloaded for task 5 here.'*
