import React from 'react'
import { useSelector } from "react-redux";

import classes from './RecipeList.module.scss';
import RecipeItem from './RecipeItem';


const LoadingRecipes = () => (
  <div className={classes.loadingBox}>
    <div className={`${classes.loadingAnimation} ${classes.image}`}></div>
    <div className={classes.loadingInfo}>
      <div className={classes.loadingAnimation}></div>
      <div className={classes.loadingAnimation}></div>
    </div>
  </div>
)

const RECIPE_LIST = [
  {
    imageUrl: 'https://source.unsplash.com/850x900/?tacos',
    label: 'Crisp Tacos Picadillo',
    source: 'Lottie + Doof',
    healthLabels: ['Peanut-Free', "Tree-Nut-Free", "Alcohol-Free", "Sulfite-Free"],
    servings: '16',
    calories: 2552.4187824,
    totalWeight: 1542.04,
    totalTime: 25  
  },
  {
    imageUrl: 'https://source.unsplash.com/1001x900/?tacos',
    label: "Picadillo Tacos",
    source: 'Lottie + Doof',
    sourceUrl: "http://honestcooking.com/picadillo-tacos-recipe/",
    healthLabels: ['Peanut-Free', "Tree-Nut-Free", "Alcohol-Free", "Sulfite-Free"],
    servings: '4',
    calories: 2552.4187824,
    totalWeight: 1542.04,
    totalTime: 0 
  },
  {
    imageUrl: 'https://source.unsplash.com/900x900/?tacos',
    label: "Carnitas tenderloin tacos",
    source: "Food52",
    sourceUrl: "https://food52.com/recipes/73841-carnitas-tenderloin-tacos",
    healthLabels: ["Peanut-Free", "Tree-Nut-Free", "Alcohol-Free"],
    servings: '2',
    calories: 2552.4187824,
    totalWeight: 0,
    totalTime: 25 
  },
  {
    imageUrl: 'https://source.unsplash.com/1000x900/?tacos',
    label: "Salmon tacos with lime dressing",
    source: "BBC Good Food",
    sourceUrl: "https://www.bbcgoodfood.com/recipes/salmon-tacos-lime-dressing",
    healthLabels: ["Pescatarian", "Mediterranean", "Peanut-Free", "Tree-Nut-Free", "Alcohol-Free","Sulfite-Free"],
    servings: '4',
    calories: 0,
    totalWeight: 1542.04,
    totalTime: 25 
  },
]

const RecipeList = () => {
  
  const { fetchingRecipes, recipes } = useSelector(state => state.recipes);

  return (
    <div className={classes.flex}>
      {fetchingRecipes && [1, 2, 3, 4].map((_, i) => (
        <LoadingRecipes key={i}/>
      ))}

      {(recipes && !fetchingRecipes) && recipes.map(({recipe}, i) => (
        <RecipeItem 
          key = {i}
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