const express = require('express')
const router = express.Router()
const Recipes = require('../models/recipes.js');

      // add recipes

router.post('/addRecipes', (req, resp) => {
    const { calories, cautions, cuisineType , dietLabels, digest, dishType, heathLabels, 
      image, ingredientLines, ingredients, label, mealType, shareAs, source,
       totalDaily, totalNutrients, totalTime, totalWeight, yield  } = req.body;
     
        const saveRecipes = new Recipes({
          calories, cautions, cuisineType , dietLabels, digest, dishType, heathLabels, 
          image, ingredientLines, ingredients, label, mealType, shareAs, source,
           totalDaily, totalNutrients, totalTime, totalWeight, yield
             });
            
            saveRecipes.save()   
            .then(data =>{
            resp.json(data)

            // resp.status(200).json({
            //   calories: req.body.calories,
            //   cautions: req.body.cautions,
            //   cuisineType: req.body.cuisineType,
            //   dietLabels: req.body.dietLabels,
            //   digest: req.body.digest,
            //   dishType: req.body.dishType,
            //   heathLabel: req.body.heathLabel,
            //   image: req.body.image,
            //   ingredientLines: req.body.ingredientLines,
            //   ingredients: req.body.ingredients,
            //   label: req.body.label,
            //   mealType: req.body.mealType,
            //   shareAs: req.body.shareAs,
            //   source: req.body.source,
            //   totalDaily: req.body.totalDaily,
            //   totalNutrients: req.body.totalNutrients,
            //   totalTime: req.body.totalTime,
            //   totalWeight: req.body.totalWeight
            //   });
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
        const recipe = await Recipes.findById(id_recipes); 
       if (!recipe){
        return res.status(202).send("recipes Id not found.");
      }
       else 
        res.send(recipe);
      });
    
    
           //    delete recipes by id

      router.delete("/:id",  async (req, res) => {
        const id = req.params.id;
        
        const rec_delete = await Recipes.findByIdAndRemove(id);
        
        if (!rec_delete) {
          return res.status(202).json({"message": "Recipes not found"})
        }
        
        res.status(200).send(rec_delete)
      })    
module.exports = router