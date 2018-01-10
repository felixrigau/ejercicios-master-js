var app = {
  management:{
    addContact: function (contact) {
      if (contact && contact.name && contact.phone && contact.email) {
        localStorage.setItem(contact.email,JSON.stringify(contact));
      }else {
        console.log("You must fill in all the data");
      }
    },

     removeContact: function (key) {
       if (key) {
         localStorage.removeItem(key)
       }else {
         console.log("You must enter the mail");
       }
     },

     removeAllContacts(){
       localStorage.clear();
     },

     getContact:function (key) {
       if (key) {
         var contact = localStorage.getItem(key);
         if (contact) {
           return JSON.parse(contact);
         }else {
           console.log("The searched contact don't exist");
         }
       } else {
         console.log("You must enter the mail");
       }
     }
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
    updateList: function () {
      window.addEventListener('storage', function(event){
        console.info("Se registran cambios en "+event.key+". El valor pasó de ser "+event.oldValue+" a "+event.newValue+".\nRecuerda que estas en "+event.url+" y usando el almacenamiento ", event.storageArea);
      });
    },

    addEListenerAddButton:function () {
      var addButton = document.querySelector('.add');
      addButton.addEventListener('click',function () {
        var name = document.querySelector('.name').value,
            phone = document.querySelector('.phone').value,
            email = document.querySelector('.email').value;
        var contact = {
          name:name,
          phone:phone,
          email:email,
          image:'https://api.adorable.io/avatars/285/'+email+'.png';
        }
        //TODO Continuar el metodo
      });
    }
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
  app.events.addEListenerAddButton();
})();


var contact = {
  name:"Felix",
  phone:"653789823",
  email:"felix@example.com"
}
