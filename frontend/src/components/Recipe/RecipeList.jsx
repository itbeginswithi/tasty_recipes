import React from 'react'

import classes from './RecipeList.module.scss';

const LoadingRecipe = () => (
  <div className={classes.loadingBox}>
    <div className={`${classes.loadingAnimation} ${classes.image}`}></div>
    <div className={classes.loadingInfo}>
      <div className={classes.loadingAnimation}></div>
      <div className={classes.loadingAnimation}></div>
    </div>
  </div>
)

const RecipeList = () => {
  return (
    <div className={classes.flex}>
      {[1, 2, 3, 4].map(n => (
        <LoadingRecipe/>
        
      ))}
    </div>
    
  )
}

export default RecipeList