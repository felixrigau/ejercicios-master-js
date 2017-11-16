//*************************** COMO CONSUMIR UN API *****************************

//https://www.codecademy.com/en/tracks/parse - Como consumir un API
// https://jsonplaceholder.typicode.com/ API de ejemplo para consumir json

// (function () {
//     var request = new XMLHttpRequest();
//     request.open("GET","https://jsonplaceholder.typicode.com/albums", false);
//     request.send(null);
//
//     if (request.status == 200) {
//         console.log("Esto está OK");
//     }
//
//     var json = JSON.parse(request.response);
//     console.log("Resumen de datos consumidos desde una API");
//     console.table(json);
//
//     // var answer = request.responseText;
//     // console.log(answer);
// })();

//*************************** Construcción y definición de un objeto *****************************

// function Person(name) {
//   this.name = name;
// }
//
// Person.prototype.sayHello = function () {
//   console.log("Hello, my name's: " + this.name);
// };
//
// var felix = new Person("Felix Pablo");
//
// function Developer(tecnologies) {
//   this.tecnologies = tecnologies;
// }
//
// Developer.prototype.showTecnologies = function () {
//   console.log(this.tecnologies.join());
// };
//
// Developer.prototype = Object.create(Person.prototype);

var button = document.getElementById('button');
button.addEventListener('click', function() {
  test();
});

//Devuelve un objeto con la diferencia en milisegundos entre dos fechas
function diferenceBetweenTowDates(date1, date2){
    date1 = date1.getTime();
    date2 = date2.getTime();
    var difference;
    if(date1 > date2){
      difference = date1 - date2;
    }else {
      difference = date2 - date1;
    }
    return difference;
}

//Devuelve un objeto con la cantidad de secundos, minutos, horas, días.
function getObjectDate(miliseconds) {
    var date = {
        "seconds":(miliseconds/1000).toFixed(),
        "minutes":(miliseconds/1000/60).toFixed(),
        "hours":(miliseconds/1000/60/60).toFixed(),
        "days":(miliseconds/1000/60/60/24).toFixed()
    };
    return date;
}

//Solution

function howLongForEndMaster(endDate) {
  var today = new Date();
  endDate = new Date(2018,5,25,19);
  var miliseconds = diferenceBetweenTowDates(endDate, today);
  var objectDate = getObjectDate(miliseconds);
  console.log("Para finalizar el master faltan:\n"+miliseconds+" milisegundos"+"\n"+objectDate['hours']+" horas"+"\n"+objectDate['days']+" días")
}

function test() {
    
}
