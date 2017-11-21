var button = document.getElementById('button');
button.addEventListener('click', function() {
  test();
});

// var add = document.getElementById('add');
// add.addEventListener('click', function() {
//   var participant = prompt("Enter the name of the participant:");
//   Event.addParticipant(participant);
// });
//
// var remove = document.getElementById('remove');
// remove.addEventListener('click', function() {
//   var participant = prompt("Enter the name of the participant:");
//   Event.removeParticipant(participant);
// });

function test() {

}

var Event = {
  listParticipants: [],
  removeParticipant: function(name) {
    var position = this.listParticipants.indexOf(name);
    if (position !== -1) {
      this.listParticipants[position] = "";
      console.log("The participant has been successfully removed");
      console.log(this.listParticipants.toString());
    } else {
      console.log("OH! The participant don't exist!");
    }
  },

  addParticipant: function(name) {
    if (this.listParticipants.length != 0) {
      if (this.listParticipants.indexOf(name) == -1) { // this conditional checks if the participant is registed already
        var position = this.listParticipants.indexOf("");
        if (position == -1) {
          this.listParticipants.push(name);
          console.log("The participant has been successfully registed");
          console.log(this.listParticipants.toString());
        } else {
          this.listParticipants[position] = name;
          console.log("The participant has been successfully registed");
          console.log(this.listParticipants.toString());
        }
      } else {
        console.log("The participant has been registed already");
      }
    } else {
      this.listParticipants.push(name);
      console.log("The participant has been successfully registed");
      console.log(this.listParticipants.toString());
    }
  }
};
