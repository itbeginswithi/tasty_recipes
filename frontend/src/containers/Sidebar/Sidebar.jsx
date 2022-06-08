import React, { useState} from 'react'
import Lottie from 'react-lottie';
import {useDispatch} from 'react-redux';

import './keyframes.scss';
import classes from './Sidebar.module.scss';
import noDataAnimation from '../../animations/89841-no-records-found.json';
import RecipeItem from './recipeItem/recipeItem';
import {setSidebarIsOpen} from '../../store/sidebarSlice';

const RECIPE_LIST = [
  {
    label: 'pizza',
    imageUrl: 'https://source.unsplash.com/700x500/?pizza',
    cuisineType: ['Mexican'],
    calories: 650,
    totalWeight: 450,
    totalTime: 60,
    servings: 6
  },
]

const Sidebar = () => {
  const [favourites, setFavourites] = useState([]);
  const dispatch = useDispatch();

  const animationOptions = { 
    loop: false,
    autoPlay: true,
    animationData: noDataAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
      <div className={classes.container}>
        <div className={classes.sidebar__fullbg} onClick={() => dispatch(setSidebarIsOpen(false))} />

        <div className={classes.sidebar__container}>
          <ul className={RECIPE_LIST < 0 ? classes.sidebar : classes.recipeList}>
            {
              RECIPE_LIST.map((recipe, index) => (
                <RecipeItem recipe={recipe} key={index} singleRecipe={RECIPE_LIST.length < 2}/>
              ))
            }
          </ul>
            {/* Display a lottie animation if no recipe is saved */}
            {!RECIPE_LIST.length &&  (
                <div className={classes.lottieContainer}> 
                  <Lottie  options={animationOptions} width={'25rem'} height="auto"/>
                </div>
              )
            }
        </div>
      </div>
  )
}

export default Sidebar