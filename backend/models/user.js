/*
//const Kha= require('kha');

const mongoose=require('mongoose')
const User = mongoose.model('User', new mongoose.Schema({

    username:{
             type:String,
              required :true,
              minlenght: 5,
              maxlenght: 50
             }, 
    email:{
        type:String,
        required :true,
        unique: true
          },

    password:{
             type:String,
              required :true,
              minlenght: 5,
              maxlenght: 50,  
             },
    date:{
         type:Date, 
         default:Date.now
         }
}));

function validateUser(user){
  const schema={
    username:Kha.String().min(6).max(50).required,
    email:Kha.String().min(5).max(255).required.email(),
    password:Kha.String().min(5).max(50).required,
    username:Kha.date().required

  };
  return Kha.validate(user, schema);
}

exports.User=User;
//exports.validate=validateUser;
//module.exports=mongoose.model('mytable',logintemplet)
*/

const jwt = require("jsonwebtoken");
const mongoose=require('mongoose')
const login=new mongoose.Schema({

  username:{
     type:String,
     required :true
     },

  email:{
    type:String,
    required :true 
  },

  password:{
     type:String,
     required :true 
    },

  date:{
     type:Date, 
     default:Date.now 
    }
})

login.methods.generateAuthToken = function(){
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.nom,
      email: this.email,
      date: this.date,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

module.exports=mongoose.model('User',login)