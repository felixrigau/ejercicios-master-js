var app = {
  management:{
    method: function () {
      app.tools.makeRequest('GET', 'http://airemad.com/api/v1/station/S024', true, app.renderView.test);
    },
  },

  renderView:{

    test:function (json) {
      if (json) {
        var container = document.querySelector('.general-container');
        container.innerText = json.toString();
      }
    }
  },

  events:{

  },

  animation:{

  },

  tools:{
    makeRequest: function (httpMethod, url, asynchronous, callback) {
      var request = new XMLHttpRequest();
      request.open(httpMethod,url, asynchronous);
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200 && request.responseText ) {
            var json = JSON.parse(request.responseText);
            callback(json);
            return true;
        }else{
            return false;
        }
      };
      request.send(null);
    },

    test: function () {
      app.tools.makeRequest('GET','https://restcountries.eu/rest/v2/all',true,app.tools.callbackTest);
    },

    callbackTest:function (json) {
      if (json) {
        console.log('THERE IS JSON!!!');
      }
    }
  }
};

(function () {

})();
