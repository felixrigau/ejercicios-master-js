// 1 - Saca una lista de los cursos disponibles en Fictizia en las 4 areas de formación y conviertelo en Markdown. Características:
//
// Cada Bloque de cursos debe estar identificado por el título correspondiente.
// Cada curso debe contener el enlace al mismo y especificar el número de horas entre parentesis.
// Tu solución

function showFictiziaCourses() {

  var fictiziaAreas = document.querySelector("#areasIndex").children,
      coursesByArea,
      titleArea,
      titleCourse,
      hoursCourse,
      url,
      id;

  console.log("# Cursos de Fictizia");
  console.log("\n");

  for (var i = 0; i < fictiziaAreas.length; i++) {
    console.log("## "+ fictiziaAreas[i].innerText);
    console.log("\n");

    id = fictiziaAreas[i].id.split("_");
    coursesAndHoursByArea = document.querySelectorAll("#"+id[0] + "_Area li a");
    console.log("**Total de cursos: "+coursesAndHoursByArea.length+"**\n");
    for (var j = 0; j < coursesAndHoursByArea.length; j++) {
      titleCourse = coursesAndHoursByArea[j].children[0].innerText;
      hoursCourse = coursesAndHoursByArea[j].children[1].innerText;
      hoursCourse = hoursCourse.replace("Curso de ","");
      url = coursesAndHoursByArea[j].href;
      console.log("- \["+ titleCourse +" \("+ hoursCourse +"\)\]\("+ url +"\)");
    }
    console.log("\n");
  }
}

// 2 - Hagamos la web del Metro más divertida.
//
// Saca el estado actual de todas las líneas del metro de Madrid por consola.
// Tu solución

// 3 - Diseña un script que sustituya todas las imágenes de las entradas de Tecnología del Mundo Today por imágenes dummy de gatitos.
//
// Tu solución
