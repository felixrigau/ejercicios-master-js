(function () {
  console.log("I'm ready!!!");
})();

var APPLICATION = APPLICATION || {
  clientList: [],
  productList: [],

  createClient: function (name, userName, password, userType, budget) {
    var client = new Client(name, userName, password, userType, budget);
    this.clientList.push(client);
    console.log("The client: "+name+" was registed successfuly!");
  },

  removeClient: function (userName){
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
  },

  getClientBudget: function (userName) {
    var budget = -1;
    this.clientList.forEach(function (element,i,array) {
      if(element.userName == userName){
        budget = element.budget;
      }
    });
    if(position !== -1){
      return budget;
    }else {
      console.log(" We cannot to get the budget for "+userName);
    }
  },

  getClientExpenses: function (userName) {
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
