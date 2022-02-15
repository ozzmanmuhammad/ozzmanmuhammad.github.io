

let clearButton;
let canvas;

let doodleModel;
let content

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(255);

  doodleModel = ml5.imageClassifier('DoodleNet', modelReady);
  document.getElementById("predictions").innerHTML = 'Model loading...';
}

function modelReady() {
    document.getElementById("predictions").innerHTML = 'Model loaded, please draw...';
    doodleModel.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
      console.error(error);
      return;
    }
    // console.log(results);
    content =     `-> ${results[0].label},
                   ${nf(100 * results[0].confidence, 2, 1)}%.<br/>
                   -> ${results[1].label}, 
                   ${nf(100 * results[1].confidence, 2, 1)}%.<br/>
                   -> ${results[2].label}, 
                   ${nf(100 * results[2].confidence, 2, 1)}%.<br/>
                   -> ${results[3].label}, 
                   ${nf(100 * results[3].confidence, 2, 1)}%.<br/>
                   -> ${results[4].label}, 
                   ${nf(100 * results[4].confidence, 2, 1)}%.<br/>
                   -> ${results[5].label}, 
                   ${nf(100 * results[5].confidence, 2, 1)}%.`;
  
    // resultsDiv.html(content);
    
    doodleModel.classify(canvas, gotResults);
  }

function clearCanvas() {
  document.getElementById("predictions").innerHTML = 'Cleared, draw again...';
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
    document.getElementById("predictions").innerHTML = content;
  }
}