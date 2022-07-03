import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

import classes from './FavBtn.module.scss';
import { addBookmark, addToFavRecipe, removeBookmark, removeFavRecipe } from '../../api/recipes';
import { setModalIsOpen } from '../../store/authSlice';
import { setRecipes } from '../../store/bookmarksSlice';

const FavBtn = ({addedToFav, recipe}) => {
    const {recipes} = useSelector(state => state.bookmarks);
    const { isSignedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(addedToFav);

    const [recipeId, setRecipeId] = useState('');
    const [bookmarkId, setBookmarkId] = useState('');

    //add function to remove or add to favList on the database
    //if removed from database, remove the item from the [] list
    const addRecipeToFav = async () => {

        if(!isSignedIn) return dispatch(setModalIsOpen(true));

        setFavorite(true);
        // add recipe to fav
        const recipeId = await addToFavRecipe(recipe);
        
        // add recipe bookmark in the frontend
        const newFavRecipes = [...recipes, recipe];
        dispatch(setRecipes(newFavRecipes));
        console.log(newFavRecipes);

        // add userid and recipeId
        const userId = localStorage.getItem('userId');
        const bookmarkId = await addBookmark({recipeId, userId});

        setRecipeId(recipeId);
        setBookmarkId(bookmarkId);
    }

    const removeRecipeFromFav = async () => {
        //remove favorite from the frontend
        setFavorite(false);
        
        const userId = localStorage.getItem('userId');
        
        //delete the favorit recipe from the sidebar
        if(!recipeId){
            const recipeId = recipe._id;
            const filteredRecipes = recipes.filter(rec => rec._id !== recipeId);
            dispatch(setRecipes(filteredRecipes));
            await removeFavRecipe({recipeId});
            await removeBookmark({recipeId, userId});
            return;
        }

        //delete the favorit recipe from the main page
        const filteredRecipes = recipes.filter(recipe => recipe._id !== recipeId);
        dispatch(setRecipes(filteredRecipes));  

        //removefavorite from the backend
        await removeFavRecipe({recipeId});
        const what = await removeBookmark({recipeId, userId});
        // // add userid and recipeId
        // await addBookmark(recipeId, userId, recipe.label);
    }

    return (
    <button type="button" className={`${classes.btn}`}>
        {
            favorite ?  
            <AiFillHeart className={classes.btn_fav} onClick={removeRecipeFromFav}/> 
            : 
            <AiOutlineHeart className={classes.btn_outlineFav} onClick={addRecipeToFav}/>
        }
    </button>
  )
}

export default FavBtn