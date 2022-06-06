import React, {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const RecipeDetail = () => {
  const { recipes } =  useSelector(state => state.recipes);
  const [oldRecipeLabel, setOldRecipeLabel] = useState('');

  const location = useLocation();
  const recipeLabel = location.pathname.split('/')[2].split('-').join(' ');

  let recipeRef = useRef();
  let recipe = recipeRef?.current?.recipe;
  

  useEffect(() => {
    if(recipeLabel !== oldRecipeLabel) {
      setOldRecipeLabel(recipe);
      recipeRef.current =  recipes.find(({recipe}) => recipe.label.toLowerCase() === recipeLabel);
    }
  }, [recipeLabel]);

  return (
    <div>
        <br/>
        <h1>{recipe?.label}</h1>
        <img  src={recipe?.image} alt={recipe?.label} height="250"/>
    </div>
  )
}

export default RecipeDetail