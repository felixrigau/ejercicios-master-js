var app = {
  canvas:null,
  image:null,
  tools:{
    createCanvas: function () {
      image = document.querySelector('#image');
      canvas = document.querySelector('#canvas');

      canvas.width = image.width;
	    canvas.height = image.height;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      var first_text = document.querySelector('.first_text');
      context.font = '48px serif';
      context.textAlign = 'end';
      context.fillStyle = 'white';
      context.fillText(first_text.value, 100, 100);
      image.classList.toggle('hidden');
      canvas.classList.toggle('hidden');
    },

    convertToCanvas: function () {
      image = document.querySelector('#image');
      canvas = document.querySelector('#canvas');
	    image.src = canvas.toDataURL("image/png");
      image.classList.toggle('hidden');
      canvas.classList.toggle('hidden');
    }
  },
};

(function () {

  var createBtn = document.querySelector('.create');
  createBtn.addEventListener('click',app.management.createCanvas, true);

  var convertBtn = document.querySelector('.convert');
  convertBtn.addEventListener('click',app.management.convertToCanvas, true);

})();
