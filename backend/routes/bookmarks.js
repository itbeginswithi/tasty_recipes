const express = require('express');
const bookmarks = require('../models/bookmarks.js');
const router = express.Router()
const Bookmarks = require('../models/bookmarks.js');
const Recipes = require('../models/recipes.js');


router.post('/add', async (req, resp) => {
  const {userId, recipe} = req.body;
    console.log(userId, recipe)
      const saveBook = new Bookmarks({ userId, recipe });  
      
      await saveBook.save()   
        .then((resp) =>{
          resp.status(200).json({
            bookmarkId: saveBook._id
          });
        })
        .catch(error =>{
            resp.json(error)
        })
  });

    // router.post("/eko", async (req, res) => {
    //   const bookmarks = new Bookmarks({
    //     userId: req.body.userId,
    //     recipesId: req.body.recipesId,
    //   });
    //   await bookmarks.save();
    //   res.send(bookmarks);
    // });

    router.delete("/", async  (req, res) => {
      const {recipeId, userId} = req.query;

      const bookmarkObj = await Bookmarks.find({"recipe" : recipeId, "userId": userId});
      
      const response = await Bookmarks.findByIdAndDelete(bookmarkObj[0]._id);

  
      if (!response) {
        res.status(202).send("bookmarks not found");
      }else{
        res.status(200).send(response);
      }
    })

    router.get("/read",  async (req, res) => {
      const {userId} = req.query;

      const response = await bookmarks.find({userId: userId}).populate('recipe');
      const recipe_list = response.map(recipe => recipe.recipe)
      res.status(200).json(recipe_list);
    })


module.exports = router