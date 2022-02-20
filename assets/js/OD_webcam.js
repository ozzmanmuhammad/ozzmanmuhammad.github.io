
let customBtn = document.getElementById("custom-btn");


let video;
let flippedVideo;
let webcamDetector;
let detections = [];



function defaultBtnActive2(){
  
  if(document.getElementById("custom-btn") != null){
    var text = document.getElementById("custom-btn").innerHTML;
    console.log(text);

    if(text == "Open Webcam!"){
      

      video = createCapture(VIDEO, videoReady);
      video.size(640, 480);
      video.hide();

      document.getElementById("custom-btn").innerHTML = "Close Webcam!";

    }else if(text == "Close Webcam!"){

      video.remove();
    
      document.getElementById("custom-btn").innerHTML = "Open Webcam!";

    }
    
  }
  
}

function setup() {
  
  var canvas2 = createCanvas(640, 480);
  canvas2.parent("draw2");

}

function videoReady() {
  // Models available are 'cocossd', 'yolo'
  // webcamDetector = ml5.objectDetector('cocossd', modelReady);
}



function gotWebcamDetections(error, webcamResults) {
  
  if (error) {
    console.error(error);
  }
  flippedVideo = ml5.flipImage(video);

  
  image(flippedVideo, 0, 0);
  detections = webcamResults;

  for (let i = 0; i < detections.length; i += 1) {
    const object1 = detections[i];
    
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object1.x, object1.y, object1.width, object1.height);
    noStroke();
    fill(255);

    text(object1.label, object1.x + 10, object1.y + 24);
  }
  webcamDetector.detect(flippedVideo, gotWebcamDetections);
}

function modelReady() {
  webcamDetector.detect(video, gotWebcamDetections);
}


// function draw() {

// }