const mongoose=require('mongoose')
const BookmarksSchema=new mongoose.Schema({
 
  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipes",
    },

    recipeName: {
      type: String
    },

    date:{
      type:Date, 
      default:Date.now 
    }

})


module.exports=mongoose.model('Bookmarks',BookmarksSchema)