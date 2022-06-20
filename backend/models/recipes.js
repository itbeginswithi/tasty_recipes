const mongoose=require('mongoose')
const RecipesSchema=new mongoose.Schema({

  heathLabel:{
     type:String,
      // required :true 
    },

  totalTime:{
    type:String,
    // required :true
  },

  totalWeight:{
    type:String,
    // required :true
  },

  calories:{
     type:String,
    //  required :true
     },

  cuisineType:{
    type:String,
    // required :true 
  },

  ingredients:{ 
    type:String,
    // required :true 
  },
  cautions:{ 
    type:String,
    // required :true 
  }

})


module.exports=mongoose.model('Recipes',RecipesSchema)