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
