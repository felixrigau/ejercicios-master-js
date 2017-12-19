var app = {
  management:{
    convertToCanvas: function () {
      window.alert('Let\'s go!!');
    },
  },

  tools:{
    test: function () {

    }  }
};

(function () {
  var convertBtn = document.querySelector('.convert');
  convertBtn.addEventListener('click',app.management.convertToCanvas, true);
})();
