import React, {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classes from "./RecipeDetail.module.scss";
import { GiKitchenScale } from "react-icons/gi";
import { ImCalculator } from "react-icons/im";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdThumbUpOffAlt, MdThumbUp, MdOutlineTimer } from "react-icons/md";

const RecipeDetail = () => {

  const [favorite, setFavorite] = useState(false);
  const [liked, setLiked] = useState(false);
  const { recipes } =  useSelector(state => state.recipes);
  const { recipes: BMRecipes } =  useSelector(state => state.bookmarks);
  const [oldRecipeLabel, setOldRecipeLabel] = useState('');

  const location = useLocation();
  const recipeLabel = location.pathname.split('/')[2].split('-').join(' ');

  const recipeRef = useRef();
  const recipe = recipeRef?.current?.recipe;

  useEffect(() => {
    if(recipeLabel !== oldRecipeLabel) {
      setOldRecipeLabel(recipeLabel);
      
      let recipe =  recipes.find(({recipe}) => recipe.label.toLowerCase() === recipeLabel);

      if(!recipe && recipeLabel){
        const recipeObj =  BMRecipes.find(recipe => recipe.label.toLowerCase() === recipeLabel);
        recipe = {
          recipe: {...recipeObj}
        }
      }

      recipeRef.current = recipe;
    }
  }, [recipeLabel, recipe, recipes, BMRecipes]);

  return (
    <div className={classes.mustapha}>

            <h1 className={classes.title}>{recipe?.label}</h1>
            <table>
              <tr>
          <td className={classes.image}>
        <img  src={recipe?.image} alt={recipe?.label} height="500" width="700"/>
       
        </td>
        <td className={classes.info}>
      <tr className={classes.healthLabels}>
        <h1 className={classes.healthLabels__tag} >{recipe?.healthLabels?.slice(0,5).join(" ")}</h1>
        </tr>
        <tr className={classes.healthNumbers}>
        <h1 ><MdOutlineTimer   />{recipe?.totalTime}min</h1>
        <h1 ><GiKitchenScale />{Math.round(recipe?.totalWeight)}gr</h1>
        <h1 > <ImCalculator />{Math.round(recipe?.calories)}cal</h1>
        <h1 > <TbToolsKitchen2 />{recipe?.cuisineType[0]}</h1>
        <h1 >Yield:{recipe?.yield}</h1>
        </tr>
             <div className={classes.ingred}>
        <h2>INGREDIENT</h2>   
         
        {/* <h1 >{recipe?.ingredientLines.join(" ")}</h1> */}
        
                <span className={classes.ingred}>
                  {recipe?.ingredientLines.join(" - ")}
                </span>
             
         </div>
        </td>
        </tr>
        </table>
      
          <div className={classes.actions}>
          <button type="button" className={`${classes.actions_btn} ${classes.btn_like}`}>
              
              {liked ?  
                <MdThumbUp onClick={() => setLiked(false)} title="Remove" /> 
                : 
                <MdThumbUpOffAlt onClick={() => setLiked(true)}/>
              }
          </button>
          <button type="button" className={`${classes.actions_btn}`}>
            {favorite ?  
              <AiFillHeart className={classes.btn_fav} onClick={() => setFavorite(false)} title="Remove" /> 
              : 
              <AiOutlineHeart className={classes.btn_outlineFav} onClick={() => setFavorite(true)}/>
            }
          </button>

        
        </div>
        </div>
  )
}

export default RecipeDetail