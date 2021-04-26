/* hundle update start */
const inputs = document.querySelectorAll('.filters input');
function hundleUpdate(){
const option = this.dataset.sizing || '';
document.documentElement.style.setProperty(`--${this.name}`, this.value + option);
}
inputs.forEach(input => input.addEventListener('input', hundleUpdate));
/* hundle update finish */

/* number update start */
const outputs = document.querySelectorAll('.filters output');
function numberUpdate(){
    const numb = this.value;
    switch(this.name) {
        case 'blur':
            outputs.forEach(output => (output.name === 'blur-result') ? output.value = numb : '');
            break; 
        case 'invert':
            outputs.forEach(output => (output.name === 'result-invert') ? output.value = numb : '');
            break; 
        case 'sepia':
            outputs.forEach(output => (output.name === 'result-sepia') ? output.value = numb : '');
            break; 
        case 'saturate':
            outputs.forEach(output => (output.name === 'result-saturate') ? output.value = numb : '');
            break; 
        case 'hue':
            outputs.forEach(output => (output.name === 'result-hue') ? output.value = numb : '');
            break; 
    }
 }
inputs.forEach(input => input.addEventListener('input', numberUpdate));
/* number update finish */

/* fullscrean btn start */
const btnFs = document.querySelector('.fullscreen') 
btnFs.addEventListener('click', (event) => {
  if (document.fullscreenElement === null) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
})
/* fullscrean btn end */

/* reset btn start */
const btnReset = document.querySelector('.btn-reset')
btnReset.addEventListener('click', resetFunc)
function resetFunc() {
    outputs.forEach(output => (output.name === 'result-saturate') ? output.value = 100 : output.value = 0);
    inputs.forEach(input => (input.name === 'saturate') ? input.value = 100 : input.value = 0);
    document.documentElement.style.setProperty(`--blur`, '0px');
    document.documentElement.style.setProperty(`--invert`, '0%');
    document.documentElement.style.setProperty(`--sepia`, '0%');
    document.documentElement.style.setProperty(`--saturate`, '100%');
    document.documentElement.style.setProperty(`--hue`, '0deg');
    }
/*reset btn end */

/* next pic btn star */
const canvas = document.querySelector('.canvas');
const imge = document.querySelector('.img');
const btnNext = document.querySelector('.btn-next')
btnNext.addEventListener('click', drawImage)
let counter = 1;
function drawImage() {
      imageContainer.style.display = "none";
      canvas.style.display = "block";
      imge.style.display = "none";
      counter = counter + 1;
      const now = new Date();
      const hour = now.getHours();
      const img = new Image();
      let message = '';
           img.setAttribute('crossOrigin', 'anonymous'); 
      if (hour >= 6 && hour < 12) {
        message = 'morning';
      } else if (hour >= 12 && hour < 18) {
        message = 'day';
      } else if (hour >= 18) {
        message = 'evening';
      } else {
        message = 'night';
      }
      if (counter < 10) {
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${message}/0${counter}.jpg`;
      }
      else {
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${message}/${counter}.jpg`;
      }
      if (counter === 20) {
        counter = 0;
      }
        img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
      };  
    }
/* next pic btn end */

/* load pic start */
const fileInput = document.querySelector('input[type="file"]');
const imageContainer = document.querySelector('.image-container');
fileInput.addEventListener('change', function(e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    imageContainer.innerHTML = "";
    imageContainer.append(img);
  }
  reader.readAsDataURL(file);
  canvas.style.display = "none";
  imge.style.display = "none";
  imageContainer.style.display = "block";

});
/* end */

/* downoland pic start */
 const btnSave = document.querySelector('.btn-save');
btnSave.addEventListener('click', function(e) {
  console.log(canvas.toDataURL());
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});
/* downoland pic end */