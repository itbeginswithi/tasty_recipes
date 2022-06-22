const mongoose=require('mongoose')
const RecipesSchema=new mongoose.Schema({

  calories:{ type:Number },

  cautions:{ type:Array },

  cuisineType:{ type:String },

  dietLabels:{ type:String },

  digest:{ type:Array  },

  dishType:{ type:String  },

  heathLabel:{  type:String },

  image:{ type:String },

  ingredientLines:{ type:Array },

  ingredients:{  type:Array},

  label:{  type:String },

  mealType:{  type:Array },

  shareAs:{  type:String },

  source:{  type:String },

  totalDaily:{  type:Array },

  totalNutrients:{  type:Array },

  totalTime:{  type:Number },

  totalWeight:{  type:Number }

  
  

})

module.exports=mongoose.model('Recipes',RecipesSchema)