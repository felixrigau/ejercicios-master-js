(function () {
  console.log("I'm ready!!!");
})();

var APPLICATION = APPLICATION || {
  clientList: [],
  productList: [],

  //Client Management
  createClient: function (name, userName, password, userType, budget) {
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
      var exist = this.clientList.some(function (element, index, array) {
        return element.userName == userName;
      });
      if (exist) {
        console.log(userName+" is already registed.");
      } else {
        if (name && userName && password && userType && budget) {
          var client = new Client(name, userName, password, userType, budget);
          this.clientList.push(client);
          console.log("The client: "+name+" was registed successfuly!");
          return client;
        } else {
          console.log("Upsss! You haven't registed all the necesary information to resgister a new client!");
        }
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }

  },

  removeClient: function (userName){
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
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

  getClient:function (userName) {
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permission
      var client = this.clientList.filter(function (element,i,array) {
        return element.userName === userName;
      });
      if(client.length != 0){
        return client[0];
      }else {
        console.log(userName+" don't exist");
        return null;
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }
  },

  verifyCredentialsClient:function (userName, password) {
    var client = this.getClient(userName);
    if (client) {
      if (client.password === "password") {
        return client;
      } else {
        return false;
      }
    } else {
      console.log(userName+" don't exist");
      return false;
    }
  },

  getClientBudget: function (userName) {
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
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
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
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
  },

  //Product Management
  createProduct: function (name, price) {
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
      var exist = this.productList.some(function (element, index, array) {
        return element.name == name;
      });
      if (exist) {
        console.log("This product is already registed.");
      } else {
        if (name && price) {
          var product = new Product(name, price);
          this.productList.push(product);
          console.log("The product: "+name+" was registed successfuly!");
        } else {
          console.log("Upsss! You haven't registed all the necesary information to register a new product!");
        }
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }
  },

  removeProduct: function (productName) {
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
      var position = -1;
      this.productList.forEach(function (element,i,array) {
        if(element.name == productName){
          position = i;
        }
      });
      if(position !== -1){
        this.productList.splice(position,1);
        console.log("The product: "+productName+" was removed successfuly!");
      }else {
        console.log(productName+" don't exist in Vending Machine Stock!");
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }
  },

  addUnitsProduct: function (productName, quantity) {
    var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
    if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permission
      var product = this.productList.filter(function (element,i,array) {
        return element.name === productName;
      });
      if(product.length != 0){
        product[0].quantity += quantity;
        console.log("The product: "+productName+" has already "+product[0].quantity+" units in stock.");
      }else {
        console.log(productName+" don't exist in Vending Machine Stock!");
      }
    }else{
      console.log("You haven't permissions for this operation.");
    }
  },

  verifyUnitsOfProduct:function (productName) {
    var product = this.productList.filter(function (element,i,array) {
      return element.name === productName;
    });
    if (product.length != 0) {
      if (product[0].quantity != 0) {
        return product;
      } else {
        console.log("Sorry!, this product is sold out!");
        return false;
      }
    } else {
      console.log(productName+" don't exist at Stock!.");
      return false;
    }
  },

  consumeAProduct: function (productName, userName, password) {
    var client = this.verifyCredentialsClient(userName, password);
    if (client) {
      var product = verifyUnitsOfProduct(productName);
      if (product) {
        if (client.budget >= product.price) {
          //TODO
          //To add an expense to client's expenses list
          var expense = Expense(product.price, product.name, new Date());
          client.expenses.push(expense);
          //To remove the sum of the client's getClientBudget
          client.budget -= product.price;
          //To remove an unit of the product
          product.quantity--;
        } else {
          console.log("Sorry, your budget isn't enough. You must recharge it.");
        }
      } else {
        console.log("The product don't exist or not exist units of the product into Stock!");
        return -1;
      }
    } else {
      console.log("The client don't exist or haven`t the permissions to consume this product.");
    }
  },

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
  this.quantity = 0;
}

function Expense(quantity, productName, date){
  this.quantity = quantity;
  this.productName = productName;
  this.name = name;
}

// Falta hacer el paso 5 y el 6

// var passwordAdmin = prompt("Please, enter your password to perform the next operation:");
// if (passwordAdmin == "ficticiaMola") { // Verify that the user has admin permissions
//
// }else{
//   console.log("You haven't permissions for this operation.");
// }
