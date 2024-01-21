# Solution Exercise 10
Group: *Nidanur Günay, Yu zeyuan*
## Task 1

When we analyse the image, we see a flower which has mainly magenta and yellow colors.  
Color Space 1 is CMY because color space channels are consist of cyan, magenta and yellow. Since our main image contains pretty few amount of cyan color and dark pixels represents the small portion of respective color, we would expect a darker image and darker flower as in color_space_1 and channel_1,  
second channel image which corresponds to magenta, and we are able to see at the bottom part of the leaves and center of the flower which should be represented as white as overlaps in channel 2. And the third one corresponds to yellow channel and we should expect the white representation in the yellow areas of the original image which are  top parts of the leaves and outer center of the image as represented in channel 3 for color space 1.

Color Space 2 is HSV which repreented bya cone and stands for hue which determines the color component or dominant wavelength in other words, as different angles, saturation is simply the percentage of the color or distance of the color from the gray of the same intensity and determines how vivid and objectively intense the color is, and value/brightness represents the total energy or ligthness intensity. Since our first channel is hue adn it determines the dominant wavelength, we should see the same values for represeneting the same colors. When we analyse the image, we would expect to see the same grey shade for the same colors as in channel_1, since yellow values has lower radian value as can bee seen in figure 1 and magenta has higher values, we would expect to see darker representation for the yellow color hence lower values represented darker tone of the grey and vice versa.  
| Figure 1) HSV Conic and Angle representation image              |
| -------------------------------------------------------------- |
| ![Abbildung a)](resources/hsv.png "Abbildung a)") |

Color Space 3 is RGB because rgb is additive and cmy is subtractive color spaces. And each channel of RGB color spaces are negative to of the CMY color space which means if we take out for instance red color from the white, we would get cyan and vice verca. Therefore, we would expect the negative values in the corresponded negative channel. Since yellow is a mixture of red and green light, we would expect that yellow areas would be close to white in the corresponded red and green channels which are channel_1 and channel_2.    
## Task 2
Please edit the HTML/JS files in the ``src`` folder!
    