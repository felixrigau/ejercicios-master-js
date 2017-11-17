(function () {
  console.log("I'm ready!!!");
})();

var APPLICATION = APPLICATION || {
  clientList: [],
  productList: [],

  createClient: function (name, userName, password, userType, budget) {
    var passwordAdmin = prompt("Please, enter your password to perform the next opetation:");
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
      var exist = this.clientList.some(function (element, index, array) {
        return element.userName == userName
      });
      if (exist) {
        console.log(userName+" is already registed.");
      } else {
        if (name && userName && password && userType && budget) {
          var client = new Client(name, userName, password, userType, budget);
          this.clientList.push(client);
          console.log("The client: "+name+" was registed successfuly!");
        } else {
          console.log("Upsss! You haven't registed all the necesary information!");
        }
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }

  },

  removeClient: function (userName){
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
      var position = -1;
      this.clientList.forEach(function (element,i,array) {
        if(element.userName == userName){
          position = i;
        }
      });
      if(position !== -1){
        this.clientList.splice(position,1);
        console.log("The client: "+userName+" was removed successfuly!");
      }else {
        console.log(userName+" isn't a client in this Vending Machine!");
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }
  },

  getClientBudget: function (userName) {
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
      var budget = -1;
      this.clientList.forEach(function (element,i,array) {
        if(element.userName == userName){
          budget = element.budget;
        }
      });
      if(budget !== -1){
        return budget;
      }else {
        console.log(" We cannot to get the budget for "+userName);
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }
  },

  getClientExpenses: function (userName) {
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
      var expensesList = false;
      this.clientList.forEach(function (element,i,array) {
        if(element.userName == userName){
          expensesList = element.expenses;
        }
      });
      if (expensesList) { //if expensesList is full, get in. Else expensesList is false because userName was not found
        return expensesList;
      } else {
        return expensesList;
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }
  }

};

function Client(name, userName, password, userType, budget){
  this.name = name;
  this.userName = userName;
  this.password = password;
  this.userType = userType;
  this.budget = budget;
  this.logged = false;
  this.expenses = [];
}

Client.prototype.sayHello = function () {
  console.log("Hello, my name's " + this.name);
};

function Product(name, price){
  this.name = name;
  this.price = price;
}

function Expense(quantity, date){
  this.name = name;
  this.price = price;
}

// if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
//
// }else{
//   console.log("You haven't permissions for this operation.");
// }
