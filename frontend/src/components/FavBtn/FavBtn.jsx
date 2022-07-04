import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

import classes from './FavBtn.module.scss';
import { addBookmark, addToFavRecipe, removeBookmark, removeFavRecipe } from '../../api/recipes';
import { setModalIsOpen } from '../../store/authSlice';
import { setRecipes } from '../../store/bookmarksSlice';

const FavBtn = ({addedToFav, recipe}) => {
    const { recipes: BMRecipes } = useSelector(state => state.bookmarks);
    const { recipes } = useSelector(state => state.recipes);
    const state = useSelector(state => state);
    const { isSignedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(addedToFav);

    const [recipeId, setRecipeId] = useState('');
    const [recipeImage, setRecipeImage] = useState('');

    //add function to remove or add to favList on the database
    //if removed from database, remove the item from the [] list
    const addRecipeToFav = async () => {

        if(!isSignedIn) return dispatch(setModalIsOpen(true));

        setFavorite(true);
        // add recipe to fav
        const recipeId = await addToFavRecipe(recipe);
        
        // add recipe bookmark in the frontend
        const newFavRecipes = [...BMRecipes, recipe];
        dispatch(setRecipes(newFavRecipes));

        // add userid and recipeId
        const userId = localStorage.getItem('userId');
        const bookmarkId = await addBookmark({recipeId, userId});

        setRecipeImage(recipe.image);
        setRecipeId(recipeId);
    }

    const removeRecipeFromFav = async () => {
        //remove favorite from the frontend
        setFavorite(false);
        
        const userId = localStorage.getItem('userId');
        
        //delete the favorit recipe from the sidebar
        if(!recipeId){
            const recipeId = recipe._id;
            const filteredBMRecipes = BMRecipes.filter(rec => rec._id !== recipe._id);
            dispatch(setRecipes(filteredBMRecipes));

            await removeFavRecipe({recipeId});
            await removeBookmark({recipeId, userId});
            return;
        }
 

        //removefavorite from the backend
        await removeFavRecipe({recipeId});
        await removeBookmark({recipeId, userId});
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