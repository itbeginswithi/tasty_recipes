const express = require('express')
const router = express.Router()
const Recipes = require('../models/recipes.js');

router.get("/kh", async (req, res) => {
    console.log('la vie est tres simple');
    });


      // add recipes

router.post('/addRecipes', async (req, resp) => {
    const { heathLabel, totalTime, totalWeight, calories, cuisineType, ingredients, cautions } = req.body;
     
        const saveRecipes = new Recipes({
            heathLabel,
            totalTime, 
            totalWeight, 
            calories,
            cuisineType, 
            ingredients,
            cautions,
             })
            
            saveRecipes.save()   
            .then(data =>{
            resp.json(data)

            resp.status(200).json({
                heathLabel: req.body.heathLabel,
                totalTime: req.body.totalTime,
                totalWeight: req.body.totalWeight,
                calories: req.body.calories,
                cuisineType: req.body.cuisineType,
                ingredients: req.body.ingredients,
                cautions: req.body.cautions
                });
        })
        .catch(error =>{
            resp.json(error)
        })
      
    });


                //    select all recipes
    router.get("/", async (req, res) => {
        const allRecipes = await Recipes.find().sort("");
         if (!allRecipes) return res.status(202).send("recipes not found.");
        res.send(allRecipes);
      });



       //    select recipes by id

      router.get("/:id", async (req, res) => {
        const id_recipes= req.params.id
        const khalid = await Recipes.findById(id_recipes); 
       if (!khalid){
        return res.status(202).send("recipes Id not found.");
      }
       else 
        res.send(khalid);
      });
    
    
           //    delete recipes by id

      router.delete("/:id",  async (req, res) => {
        const id = req.params.id;
        const rec_delete = await Recipes.findByIdAndRemove(id);
        if (!rec_delete) {return res.status(202).send("Recipes not found -_-")
        }
        else
        res.status(200).send(rec_delete)
       
      })    
module.exports = router