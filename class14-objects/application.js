var Application = {
  users: {},
  product: {},
  VendingMachine: {

  }

};

var Client = {
  name: '',
  nameUser: '',
  password: '',
  userType: '',
  budget:0,
  create: function(name,nameUser,password,userType,budget){
    this.name = name;
    this.nameUser = nameUser;
    this.password = password;
    this.userType = userType;
    this.budget = budget;
  },

}
