const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn1 = document.querySelector("#custom-btn1");
const cancelBtn = document.querySelector("#cancel-btn i");
const imgg = document.getElementById('pred');

imgg.style.width = "800px";
imgg.style.height = "500px";


let pred_class = "";
let img;
let detector;




// function setup() {
//   var canvas1 = createCanvas(800 , 500);
//   canvas1.parent('draw');
  
// }

// When the model is loaded

function defaultBtnActive(){
  defaultBtn.click();
}



const s = ( sketch ) => {

    // const objectDetector = ml5.objectDetector('cocossd', {}, modelLoaded);

    function modelLoaded() {
      console.log('Model Loaded!');
    }

    
  
  defaultBtn.addEventListener("change", function(){
      const file = this.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = function(){
    
          const result = reader.result;
          imgg.src = result;
          sketch.clear();
          
          objectDetector.detect(imgg,gotDetections);
          
          wrapper.classList.add("active");
          // detector.detect(img, gotDetections);
        }
          
        cancelBtn.addEventListener("click", function(){
          imgg.src = "";
          pred_class = "";
          fileName.textContent = "Prediction:";
          wrapper.classList.remove("active");
        })
        reader.readAsDataURL(file);
      }
    
    });
  

    sketch.setup = () => {
      sketch.createCanvas(800 , 500);
    };
  
    // sketch.draw = () => {
      function gotDetections(error, results) {
        if (error) {
          console.error(error);
        }
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            let object = results[i];
            sketch.stroke(0, 255, 0);
            sketch.strokeWeight(4);
            sketch.noFill();
            sketch.rect(object.x, object.y, object.width, object.height);
            sketch.noStroke();
            sketch.fill(255);
            sketch.textSize(24);
            sketch.text(object.label, object.x + 10, object.y + 24);
          }
        
      }
    
    // };
  };
let myp5 = new p5(s, document.getElementById('draw'));
  
  












