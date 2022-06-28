import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

import classes from './FavBtn.module.scss';
import { addBookmark, addToFavRecipe, removeBookmark } from '../../api/recipes';
import { setModalIsOpen } from '../../store/authSlice';

const FavBtn = ({addedToFav, recipe}) => {
    const { isSignedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(addedToFav);

    const [recipeId, setRecipeId] = useState('');
    const [bookmarkId, setBookmarkId] = useState('');

    //add function to remove or add to favList on the database
    //if removed from database, remove the item from the [] list
    const addRecipeToFav = async () => {

        if(!isSignedIn) return dispatch(setModalIsOpen(true));

        // add recipe to fav
        const recipeId = await addToFavRecipe(recipe);
        setRecipeId(recipeId);
        const userId = localStorage.getItem('userId');
        // add userid and recipeId
        await addBookmark(recipeId, userId, recipe.label);
        setFavorite(true);
    }

    // const removeRecipeFromFav = async () => {
    //     // add recipe to fav
    //     const recipeId = await removeBookmark({recipeId, userId});
    //     const userId = localStorage.getItem('userId');
    //     // add userid and recipeId
    //     await addBookmark(recipeId, userId, recipe.label);
    //     setFavorite(false);
    // }

    return (
    <button type="button" className={`${classes.btn}`}>
        {
            favorite ?  
            <AiFillHeart className={classes.btn_fav}/> 
            : 
            <AiOutlineHeart className={classes.btn_outlineFav} onClick={addRecipeToFav}/>
        }
    </button>
  )
}

export default FavBtn