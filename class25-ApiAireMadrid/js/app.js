var app = {
  stationManagement:{
    station: function (id) {
      app.tools.makeRequest('GET', 'http://airemad.com/api/v1/station/'+id, true, app.renderView.dataStation);
    },
    pollution: function (id) {
      app.tools.makeRequest('GET', 'http://airemad.com/api/v1/pollution/'+id, true, app.renderView.dataPollution);
    },
    weather:function (id) {
      app.tools.makeRequest('GET', 'http://airemad.com/api/v1/weather/'+id, true, app.renderView.dataWeather);
    }
  },

  renderView:{
    dataStation:function (json) {
      if (json) {
        var name = document.querySelector('.station-name');
        name.innerText = json.direccion;
      }
    },
    dataPollution:function (json) {
      if (json) {
        var parameterList = document.querySelector('.parameter-list');
        for (var variable in json) {
          if (json.hasOwnProperty(variable)) {
            if (typeof json[variable]  === "object") {
              parameter = json[variable].parameter;
              abrebiation = json[variable].abrebiation;
              value = app.tools.getLastValue(json[variable].values);
              technique = json[variable].technique;
              parameterList.innerHTML += "<li>"+
                "<p class=\"parameter\">"+parameter+" ("+abrebiation+"): </p>"+
                "<p class=\"value\"> "+value+"up/m3</p>"+
                "<p class=\"details\">medido por "+technique+"</p>"+
              "</li>";
            }
          }
        }
      }
    },
    dataWeather:function (json) {
      if (json) {
        var dayInfo = document.querySelector('.day-info');
        var icon = document.querySelector('.icon img');
        currentWeather = json.list[0];
        dayInfo.innerHTML += "<h3 class=\"weather\">Cielo claro</h3>"+
        "<p class=\"temperature\">Temperatura: 2.99 C</p>"+
        "<p>"+
          "<span class=\"min\">Min:2.99 C</span>"+
          "<span class=\"separator\">|</span>"+
          "<span class=\"max\">Max: 2.99 C</span>"+
        "</p>"+
        "<p>"+
          "<span class=\"hum\">Hum:69%</span>"+
          "<span class=\"separator\">|</span>"+
          "<span class=\"press\">Press: 995 psi</span>"+
        "</p>"+
        "<p class=\"wind\">Viento: 5km/h</p>";
      }
    },
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

    init:function (id) {
      app.stationManagement.station(id);
      app.stationManagement.pollution(id);
    },

    getLastValue: function (array) {
      if (array) {
        for (var i = array.length-1; i < array.length; i--) {
          if (array[i].estado === "Pasado") {
            if(array[i].valor){
              return array[i].valor;
            }else{
              return -1;
            }
          }
        }
      }
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
  app.tools.init('S024');
})();
