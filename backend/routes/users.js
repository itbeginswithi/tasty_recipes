
const Joi = require("joi");
const _ = require("lodash");
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const res = require('express/lib/response');
const validations = require("../startup/validations.js");


router.get("/rech", async (req, res) => {
  const user = await User.find().select("-id");
  res.send(user);
});

router.get("/test", async (req, res) => {
  console.log('le vie est simple');
 });






                         //register

router.post('/up', async (req, resp) => {
const { username, email, password } = req.body;
console.log({username, email, password});
const saltpassword = await bcrypt.genSalt(10)
const securepassword = await  bcrypt.hash(req.body.password,saltpassword)
    
    const SavedUser = new User({
        username, email, password:securepassword,   
         })
    SavedUser.save() 
    
    .then(data =>{
        resp.json(data)
        resp.status(200).json({ username, email, password });

        const token = SavedUser.generateAuthToken();
        res
          .header("x-auth-token", token)
          .send(_.pick(user, ["_id","username", "email", "password"]));
          console.log(token);
    })
    .catch(error =>{
        resp.json(error)
    })


})


                         //login

router.post('/login', async (req, resp) => {
    try{
      const user = await User.findOne({email: req.body.email});
      if(!user) return resp.status(401).json("Wrong credentials");

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) resp.status(400).json("your email or password is invalid");  
      
      resp.send(user);
      //--------------------------------
      // const token = user.generateAuthToken();
      // res.send(token); 
      //--------------------------------
    }catch (err) {
      resp.status(500).json(err);
    }
     
});
          // modification d'un user

router.put("/:id", async (req, resp) => {
    const { error } = validations.user(req.body);
    // console.log(error);
    if (error) return resp.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        username: req.body.username,
        email: req.body.email 
      },
      {
        new: true,
      }
    );
    if (!user) return res.status(404).send("User with this ID not found.");
  });

             //selection par Id
router.get("/slt/:_id", async (req, resp) => {
    const user = await User.findById(req.params.id);
    if (!user) return resp.status(202).send("User with this ID not found.");
    resp.send(user);
  });

               //selection par un username
router.get("/slt/:username", async (req, resp) => {
 /// const user = await User.find().select(req.params.username);
  const user = await User.find().sort("username");
  if (!user) return resp.status(202).send("User with this ID not found.");
  resp.send(user);
});


         //suppresion d'un user 
    router.delete("/del/:_id",  async (req, resp) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return resp.status(202).send("User with this ID not found.");
    resp.send(user);
});

module.exports = router



//  router.post("/up2", async (req, res) => {
//   const { error } = validations.user(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   let user = await User.findOne({ nom: req.body.nom });
//   if (user) return res.status(400).send("User already registered.");

//   user = new User(_.pick(req.body, ["username", "email", "password", "date"]));
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   await user.save();

//   const token = user.generateAuthToken();
//   res
//     .header("x-auth-token", token)
//     .send(_.pick(user, ["_id","username", "email", "password", "date"]));
// });



// router.post("/in2", async (req, res) => {
//   const { error } = validations.user(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   let user = await User.findOne({ nom: req.body.nom });
//   if (!user) return res.status(400).send("nom ou mot de pass invalide");

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword)
//     return res.status(400).send("nom ou mot de pass invalide.");

//   const token = user.generateAuthToken();
//   res.send(token);
// });

router.post("/updatePassword", async (req, res) => {
  const {userId, password, newPassword} = req.body;
  
  try{
    const userExists = await User.findOne({_id: userId});
    if (!userExists) return res.status(404).json({ message: "User does not exist" });

    //compare passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    
    if(!isPasswordCorrect) return res.status(404).json({ message: "Wrong password" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(newPassword, salt)
    userExists.password = hashedPassword;
    userExists.save();
    return res.status(200).json({ success: "Password Updated Successfuly" });

  }catch(error) {
    res.status(404).json({ message: "Error: " + error.message });
  }
})