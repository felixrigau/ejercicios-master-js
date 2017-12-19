var app = {
  canvas:null,
  image:null,
  management:{
    createCanvas: function () {
      image = document.querySelector('#image');
      canvas = document.querySelector('#canvas');
      canvas.width = image.width;
	    canvas.height = image.height;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      var first_text = document.querySelector('.first_text');
      context.drawImage(image, 0, 0);
      context.font = '48px serif';
      context.textAlign = 'end';
      context.fillStyle = 'white';
      context.fillText(first_text.value, 100, 100);

      image.classList.add('hidden');
    },
    convertToCanvas: function () {
      var newImage = new Image();
	    newImage.src = canvas.toDataURL("image/png");
	    image = newImage;
      image.classList.remove('hidden');
      canvas.classList.add('hidden');
    }
  },

  tools:{
    test: function () {

    }
  }
};

(function () {

  var createBtn = document.querySelector('.create');
  createBtn.addEventListener('click',app.management.createCanvas, true);

  var convertBtn = document.querySelector('.convert');
  convertBtn.addEventListener('click',app.management.convertToCanvas, true);

})();
