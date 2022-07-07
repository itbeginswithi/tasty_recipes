const mongoose=require('mongoose')

const RecipesSchema=new mongoose.Schema({

  calories:{ type:Number },

  cautions:{ type:Array },

  cuisineType:{ type: Array },

  dietLabels:{ type: Array },

  digest:{ type:Array  },

  dishType:{ type: Array  },

  heathLabels:{  type: Array },

  image:{ type:String },

  ingredientLines:{ type:Array },

  ingredients:{  type:Array},

  label:{  type:String },

  mealType:{  type:Array },

  shareAs:{  type:String },

  source:{  type:String },

  totalDaily:{  type: Object },
  
  totalNutrients:{  type:Array },

  totalTime:{  type:Number },

  totalWeight:{  type:Number },
  
  yield: {type: Number}

})

module.exports=mongoose.model('Recipes',RecipesSchema)