import React from 'react'
import { useSelector } from "react-redux";

import classes from './RecipeList.module.scss';
import RecipeItem from './RecipeItem';
import Error from '../Error/Error';
import Intro from '../Intro/Intro';


const LoadingRecipes = () => (
  <div className={classes.loadingBox}>
    <div className={`${classes.loadingAnimation} ${classes.image}`}></div>
    <div className={classes.loadingInfo}>
      <div className={classes.loadingAnimation}></div>
      <div className={classes.loadingAnimation}></div>
    </div>
  </div>
)

const RecipeList = () => {
  
  const { fetchingRecipes, recipes, recipesFound, error } = useSelector(state => state.recipes);

  if(!recipes.length && recipesFound && !fetchingRecipes && !error){
    return (
      <Intro /> 
    )
  }

  if((!recipesFound && !fetchingRecipes) || error){
    return (
      <Error 
            noRecordsFound={!error}
            serverError={error}
            msg={error ? "Error 500 : A server error occured" : "No recipes found, try other search keywords"} 
            error={error}
      />
    )
  }

  return (
    <div className={classes.flex}>
      {
        fetchingRecipes && [1, 2, 3, 4].map((_, i) => (
          <LoadingRecipes key={i}/>
        ))
      }


      {(recipes && !fetchingRecipes) && recipes.map(({recipe}, i) => (
        <RecipeItem 
          key = {i}
          recipe={recipe}
          imageUrl = {recipe?.image}
          label = {recipe?.label}
          healthLabels = {recipe?.healthLabels.slice(0, 5)}
          servings ={recipe?.yield}
          totalTime = {recipe?.totalTime}
          totalWeight = {recipe?.totalWeight}
          calories = {recipe?.calories}
          cuisineType = {recipe?.cuisineType[0]}
        />
      ))}
    </div>
    
  )
}

export default RecipeList