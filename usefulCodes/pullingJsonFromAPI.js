//*************************** HOW TO PULL DATAS FROM AN API - JAVASCRIPT *****************************

//https://www.codecademy.com/en/tracks/parse - Como consumir un API
//https://jsonplaceholder.typicode.com/ API de ejemplo para consumir json

(function () {
    var request = new XMLHttpRequest();
    request.open("GET","https://jsonplaceholder.typicode.com/albums", false);
    request.send(null);

    if (request.status == 200) {
        console.log("It's ready!!");
    }

    var json = JSON.parse(request.response);
    console.log("Summary JSON's data ");
    console.table(json);

    // var answer = request.responseText;
    // console.log(answer);
})();
