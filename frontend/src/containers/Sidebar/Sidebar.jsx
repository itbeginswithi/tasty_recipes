import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import {useDispatch, useSelector} from 'react-redux';
import { CgClose } from 'react-icons/cg';

import './keyframes.scss';
import classes from './Sidebar.module.scss';
import noDataAnimation from '../../animations/89841-no-records-found.json';
import RecipeItem from './recipeItem/recipeItem';
import {setSidebarIsOpen} from '../../store/sidebarSlice';
import { fetchBookmarks } from '../../api/recipes';
import { RecipeList } from '../../components';
import { setRecipes} from '../../store/bookmarksSlice';

const RECIPE_LIST = [
  {
    label: 'pizza',
    imageUrl: 'https://source.unsplash.com/700x500/?pizza',
    cuisineType: ['Mexican'],
    calories: 650,
    totalWeight: 450,
    totalTime: 60,
    servings: 6,
    addedToFav: true
  },
  {
    label: 'pizza',
    imageUrl: 'https://source.unsplash.com/700x500/?tacos',
    cuisineType: ['Mexican'],
    calories: 650,
    totalWeight: 450,
    totalTime: 60,
    servings: 6,
    addedToFav: true
  },
]

const Sidebar = () => {
  const {isOpen} = useSelector(state => state.sidebar)
  const { recipes } = useSelector(state => state.bookmarks)
  
  const [firstTimeOpened, setFirstTimeOpened] = useState(true);
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId');

  useEffect(() => {

    const fetchBM = async () => {
      const { data } = await fetchBookmarks(userId); 
      dispatch(setRecipes(data));
    }
    
    if(isOpen && firstTimeOpened) {
      fetchBM();
    }

  }, [isOpen]);


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
          <ul className={recipes.length < 0 ? classes.sidebar : classes.recipeList}>
            <div className={classes.controllers}>
              <span className={classes.list_length}>
                <strong>{recipes.length}</strong> {recipes.length === 1 ? 'recipe' : 'recipes'}
              </span>
              <div className={classes.controllers__btn} onClick={() => dispatch(setSidebarIsOpen(false))}>
                <CgClose/>
              </div>
            </div>
            {
              recipes?.length > 0 && recipes?.map((recipe, index) => (
                <RecipeItem recipe={recipe} key={index} singleRecipe={recipes.length < 2} addedToFav/>
              ))
            }   
          </ul>
            {/* Display a lottie animation if no recipe is saved */}
            {!recipes.length &&  (
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