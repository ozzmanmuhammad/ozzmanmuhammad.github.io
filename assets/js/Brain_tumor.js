const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const imgg = document.getElementById('pred');
let pred_class = "";

let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function defaultBtnActive(){
  defaultBtn.click();
}

function loadMobilenet() {
  return tf.loadLayersModel("https://raw.githubusercontent.com/ozzmanmuhammad/Brain-Tumor-Classification/main/Models/modeln.json");
}
// Make a prediction with a selected image
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(tf.browser.fromPixels(img));
    img.onerror = (err) => reject(err);
  });
}

function resizeImage(image) {
  return tf.image.resizeBilinear(image, [180, 180]);
}

function batchImage(image) {
  // Expand our tensor to have an additional dimension, whose size is 1
  const batchedImage = image.expandDims(0);

  // Turn pixel data into a float between -1 and 1.
  return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

function loadAndProcessImage(image) {
  // const croppedImage = cropImage(image);
  const resizedImage = resizeImage(image);
  const batchedImage = batchImage(resizedImage);
  return batchedImage;
}



defaultBtn.addEventListener("change", function(){
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(){
      const result = reader.result;
      imgg.src = result;
      wrapper.classList.add("active");

      const drum = document.getElementById('pred').src;
      loadMobilenet().then(pretrainedModel => {
        loadImage(drum).then(img => {
          const processedImage = loadAndProcessImage(img);
          const prediction = pretrainedModel.predict(processedImage);
      
          // Because of the way Tensorflow.js works, you must call print on a Tensor instead of console.log.
          let pred = prediction.as1D().max().dataSync()[0];
          labels = ["No Tumor", "Tumor Present"];
          console.log(Math.round(pred));
          pred_class = labels[Math.round(pred)];
          fileName.textContent = "Prediction: " + pred_class;
        });
      });
      
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


