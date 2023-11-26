# Solution Exercise 4
Group: Nidanur Günay, Yu Zeyuan
## Task 1

1. Establish a recurrence equation for $`A_n`$. (2 point)

    $A_0$ = A

    $A_n$ = $ (\frac{3}{4}) \cdot A_{n-1}$

2. Show by complete induction that $`A_n = (\frac{3}{4})^n \cdot A`$ holds. (2 point)

    assume $A_n = (\frac{3}{4})^n \cdot A$

    prove $A_{n+1} = (\frac{3}{4})^{n+1} \cdot A$

    from recursive equation

    $A_{n+1}$ = $ (\frac{3}{4}) \cdot A_{n}$ and $A_n = (\frac{3}{4})^n \cdot A$

    then

     $A_{n+1}$ = $ (\frac{3}{4}) \cdot A_{n}$ =  $ (\frac{3}{4}) \cdot (\frac{3}{4})^n\cdot A$

     = $A_{n+1} = (\frac{3}{4})^{n+1} \cdot A$



3. What happens in the limit for $`n \rightarrow \infty`$? Determine $` \lim \limits_{n \to \infty} A_n`$. (1 points)

    limit is 0 because the denominator ($4^n$) gets larger and larger when n $\to \infty$

## Task 2
Please edit the HTML/JS files in the ``src`` folder!

*Include the images you created and downloaded for task 4 here.'*
