import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import {useDispatch, useSelector} from 'react-redux';
import { CgClose } from 'react-icons/cg';

import './keyframes.scss';
import classes from './Sidebar.module.scss';
import noDataAnimation from '../../animations/89841-no-records-found.json';
import RecipeItem from './RecipeItem/RecipeItem';
import {setSidebarIsOpen} from '../../store/sidebarSlice';
import { fetchBookmarks } from '../../api/recipes';
import { RecipeList, RippleAnimation } from '../../components';
import { setRecipes} from '../../store/bookmarksSlice';

const Sidebar = () => {
  const {isOpen} = useSelector(state => state.sidebar);
  const { recipes } = useSelector(state => state.bookmarks);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {

    
    const fetchBM = async () => {
      setIsLoading(true)
      const { data } = await fetchBookmarks(userId);
      dispatch(setRecipes(data.filter(recipe => recipe !== null)));
      setIsLoading(false)
    }
    
    fetchBM();

  }, [isOpen]);


  const animationOptions = { 
    loop: false,
    autoPlay: true,
    animationData: noDataAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  if(isLoading) {
    return (
      <div className={classes.container}>
        <div className={classes.sidebar__fullbg} onClick={() => dispatch(setSidebarIsOpen(false))} />
          <div className={classes.sidebar__container}>
            <RippleAnimation />
          </div>
      </div>
    )
  }

  if(!recipes?.length && !isLoading) {
    return (
      (
        <div className={classes.container}>
        <div className={classes.sidebar__fullbg} onClick={() => dispatch(setSidebarIsOpen(false))} />

          <div className={classes.sidebar__container}>
            <div className={classes.lottieContainer}> 
              <Lottie  options={animationOptions} width={'25rem'} height="auto"/>
            </div>
          </div>
        </div>
      )
    )
  }

  return (
      <div className={classes.container}>
        <div className={classes.sidebar__fullbg} onClick={() => dispatch(setSidebarIsOpen(false))} />

        <div className={classes.sidebar__container}>
          <ul className={recipes?.length < 0 ? classes.sidebar : classes.recipeList}>
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
            {/* Display a lottie animation if no recipe is saved
            { &&  
            } */}
        </div>
      </div>
  )
}

export default Sidebar