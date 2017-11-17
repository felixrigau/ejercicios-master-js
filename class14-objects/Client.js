function Client(name, userName, password, userType, budget){
  this.name = name;
  this.userName = userName;
  this.password = password;
  this.userType = userType;
  this.budget = budget;
}

Client.prototype.sayHello = function () {
  console.log("Hello, my name's " + this.name);
};
