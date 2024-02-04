# Exercise 12

### Deadline 05.02.2024

## Written

1. 
    1. Explain why non-linear functions are used as activation functions in multi-layer neural networks? (1P)
   Neurons, which are the basic computatonal elemnts of a neural network, recieves inputs and weights to be used for summation as linear function adn modulates the results with activation function. That activation function brings non-linearity to the computed output. Non-linearity is important due to be able to capture complex patterns and relationships in the data that linear functions alone could not perform. This leads to contribution on the generalization ability of the neural network  by allowing to generate diverse outputs rather than memorizing the training example patterns.
   
    2. What would happen if only linear activation functions were used? (1P)
     What would happen if only linear activation functions were used? (1P)
If we would use only linear functions in the neural network, our model would become a composition of linear transformations. Since composition of the linear transformations could be simply represented as a single linear transformation, using multiple layers would not introduce any benefit to the system and generated outputs would be limited and model complexity would be low. This would lead to limitation in both learning and generating  of the neural network.

    3. Name 3 widely used non-linear activation functions. (1P)
   - ReLU
   - Sigmoid 
   - GELU

2. 
    1. A CNN is a classical architecture used in ML for image data. Explain the difference between dense, fully connected networks and CNNs. (1P)
   In dense, fully connected networks, every neurons in one layer is connected to every neurons in the next levels.  However CNN architecture differs with convolutional layers which apply kernel to regions of the input images and then applying the pooling operation that result to down sampling to reduce spatial dimonsionality of input. The last layer, which is fully connected layer, connects all nodes from previous layer to this fully connected layer. This architecture would lead to decrease in number of connections between layers and fewer paramaters. Therefore, CNN are more efficient in comparison with dense- fully connected networks.
    2. Why aren't dense, fully connected networks typically used for image data? (1P)
   Hence image data is high-dimensional and often contains local patterns, dense, fully connected networks would be computtionally expensive due to treating each pixels as seperate input features. However, for inputs like images, spatial data would help to highlight the input features such as edges, textures, patterns.  Thanks to the convolutiopn and pooling layer of CNN architecture, it is able to capture local patterns, reduce parameter counts, and consider the spatial structure of the data. This would make the CNN architecture more effective and efficient for the tasks that has spatial data such as image classification, object detection or image segmentation.

3. 
    1. Apply kernel <img src="Kernel.PNG" alt="drawing" width="100"/> to the input <img src="Matrix.PNG" alt="drawing" width="150"/> with stride 1 and a padding with zeros to perform a convolution. (1P)
  ```math
	\begin{bmatrix}
   0  &  3  &  8  &  4 \\
  9  &  19  &  25  &  10 \\
  21  &  37  &  43  &  16 \\
  6  &  7  & 8  & 0 
\end{bmatrix}
```

    2. Apply a max pooling operation with a 2x2 kernel and stride 2 on the result of 3.1 (1P)

```math
\begin{bmatrix}
 19 &  25 \\
 37  &  43 
\end{bmatrix}
```

4. Describe the principles of the generator and discriminator of a GAN. (1P)

    Discriminator D is trained to 
    discriminate between real and fake 
    examples

    After an update to Generat𝑜𝑟 𝐺, 
    gradient of 𝐷 has guided 𝐺(𝑧) to flow 
    to regions that are more likely to be 
    classified as (real) data

5. In Denoising Diffusion models, what does the network predict? (1P)

    instead of learning the data distribution, model a series of noise 
    distributions in a Markov Chain and “decodes” the data by 
    undoing/denoising the data in a hierarchical way

    the noise 𝜖 added at timestep 𝑡 is 
    predicted by the network 


6. Name and describe the two processes of Denoising Diffusion Models. (1P)

    • Forward diffusion process that gradually adds noise to input

    • Reverse denoising process that learns to generate data by denoising

Total: 10 points

