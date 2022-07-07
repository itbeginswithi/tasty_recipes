const mongoose=require('mongoose')
const BookmarksSchema=new mongoose.Schema({
 
  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipes",
    },

    date:{
      type:Date, 
      default:Date.now 
    }

})


module.exports=mongoose.model('Bookmarks',BookmarksSchema)