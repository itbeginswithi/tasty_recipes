import React, {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Error from '../../components/Error/Error';

const RecipeDetail = () => {
  const { recipes } =  useSelector(state => state.recipes);
  const [oldRecipeLabel, setOldRecipeLabel] = useState('');

  const location = useLocation();
  const recipeLabel = location.pathname.split('/')[2].split('-').join(' ');
  const recipeFound = false;

  let recipeRef = useRef();
  let recipe = recipeRef?.current?.recipe;
  

  useEffect(() => {
    if(recipeLabel !== oldRecipeLabel) {
      setOldRecipeLabel(recipe);
      recipeRef.current =  recipes.find(({recipe}) => recipe.label.toLowerCase() === recipeLabel);
    }
  }, [recipeLabel]);

  //add logic to check whether recipe exists or not
  //if it doesn't show this Error
  if(!recipeFound) {
    return (<Error msg="Oops! This link has no recipe details to display." notFound/>)
  }

  return (
    <div>
        <br/>
        <h1>{recipe?.label}</h1>
        <img  src={recipe?.image} alt={recipe?.label} height="250"/>
    </div>
  )
}

export default RecipeDetail