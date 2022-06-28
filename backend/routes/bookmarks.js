const express = require('express');
const bookmarks = require('../models/bookmarks.js');
const router = express.Router()
const Bookmarks = require('../models/bookmarks.js');
const recipes = require('../models/recipes.js');


router.post('/add', async (req, resp) => {
  const {userId, recipeId, recipeName } = req.body;
  
      const saveBook = new Bookmarks({ userId, recipeId, recipeName });  
      console.log(saveBook);
      saveBook.save()   
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

    router.delete("/:id",  async (req, res) => {
      const id_book = req.params.id;
      const {recipeName}= req.body;

      // const book_delete = await Bookmarks.find({}, {"recipeName": 1});
      // const book_delete = await Bookmarks.findByIdAndRemove(id_book);
      // const book_delete = await Bookmarks.;

      // if (!book_delete) {
      //   res.status(202).send("bookmarks not found")
      // }else{
      //   res.status(200).send(book_delete)
      // }
    })

    router.get("/read",  async (req, res) => {
      const {userId} = req.query;
      const {recipeName}= req.body;

      const response = await bookmarks.find({userId: userId});
      res.status(200).json(response)
    })


module.exports = router