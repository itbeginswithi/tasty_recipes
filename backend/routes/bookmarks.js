const express = require('express');
const bookmarks = require('../models/bookmarks.js');
const router = express.Router()
const Bookmarks = require('../models/bookmarks.js');



router.get("/g", async (req, res) => {
   console.log('la vie est tres simple');
   });


   router.post('/addBook', async (req, resp) => {
    const {userId, recipesId } = req.body;
     
        const saveBook = new Bookmarks({ userId, recipesId })  
           saveBook.save()   
            .then(data =>{
            resp.json(data)
            resp.status(200).json({
              userId: req.body.userId,
              recipesId: req.body.recipesId,
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
      const book_delete = await Bookmarks.findByIdAndRemove(id_book);
      if (!book_delete) {return res.status(202).send("bookmarks not found -_-")
      }
      else
      res.status(200).send(book_delete)
     
    })


module.exports = router