window.onload = init;

let width;
let height;

let jitter = 1;

function init() {
  const canvas_artefact = document.getElementById("canvas_artifact");
  draw(canvas_artefact, 0);

  const canvas_jitter = document.getElementById("canvas_jitter");
  draw(canvas_jitter, jitter);
}

function draw(canvas, jitter_strength) {
  const context = canvas.getContext("2d");

  width = canvas.width;
  height = canvas.height;

  const start = 0.0;
  const end = 30.0;

  const unit = (end - start) / width;

  //get ImageData
  const imageData = context.getImageData(0, 0, width, height);

  //iterate over all pixels in canvas
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      //x and y coordinate scaled to range [start, end] to the center of a sampling cell
      const sx = start + unit * x + unit / 2;
      const sy = start + unit * y + unit / 2;

      //TODO: generate jitter in the x and y direction in the range [-jitter_strength * unit  / 2, jitter_strength * unit / 2] using a random value generated using the Math library
      const jitter_x = Math.random(
        (-jitter_strength * unit) / 2,
        (jitter_strength * unit) / 2
      );
      const jitter_y = Math.random(
        (-jitter_strength * unit) / 2,
        (jitter_strength * unit) / 2
      );
      console.log("sx", sx);
      console.log("sy", sy);

      console.log("jitter_x", jitter_x);
      console.log("jitter_y", jitter_y);

      //TODO: add jitter to sx and sy
      //   sx += jitter_x;
      //   sy += jitter_y;

      //TODO: get the value of the sineFunction you implemented below at position sx and sy including the jitter you added above
      const sinValue = sineFunction(sx, sy);

      //TODO: normalize the output of sineFunction from range [-1,1] to [0,255]
      const normalizedValue = (sinValue + 1) * 127.5;
      //TODO: set the pixel at position x, y to the normalized value

      //This are just arbitary values to show something. Please change.
      setPixel(
        imageData,
        x,
        y,
        normalizedValue,
        normalizedValue,
        normalizedValue,
        255
      );
    }
  }

  //set ImageData
  context.putImageData(imageData, 0, 0);
}

//TODO: Implement sineFunction sin(x*x + y*y). Please use the Math library for the sin function.
function sineFunction(x, y) {
  return Math.sin(x * x + y * y);
}

//Set a pixel at position x,y ti value r, g, b, a in imageData
function setPixel(imageData, x, y, r, g, b, a) {
  let index = (x + y * width) * 4;
  imageData.data[index] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}

//download the canvas as PNG
function download(canvas_name) {
  //https://gist.github.com/Kaundur/2aca9a9edb003555f44195e826af4084

  // Get the canvas
  let canvas = document.getElementById(canvas_name);
  // Convert the canvas to data
  var image = canvas.toDataURL();
  // Create a link
  var aDownloadLink = document.createElement("a");
  // Add the name of the file to the link
  aDownloadLink.download = canvas_name + ".png";
  // Attach the data to the link
  aDownloadLink.href = image;
  // Get the code to click the download link
  aDownloadLink.click();
}

//update the jitter value based on slider
function updateSlider(slideAmount) {
  jitter = slideAmount;
  let canvas_jitter = document.getElementById("canvas_jitter");
  draw(canvas_jitter, jitter);
}
