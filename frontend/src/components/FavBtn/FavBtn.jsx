import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import classes from './FavBtn.module.scss';

const FavBtn = ({addedToFav}) => {
    const [favorite, setFavorite] = useState(addedToFav);

    //add function to remove or add to favList on the database
    //if removed from database, remove the item from the [] list
  
    return (
    <button type="button" className={`${classes.btn}`}>
        {
            favorite ?  
            <AiFillHeart className={classes.btn_fav} onClick={() => setFavorite(false)}/> 
            : 
            <AiOutlineHeart className={classes.btn_outlineFav} onClick={() => setFavorite(true)}/>
        }
    </button>
  )
}

export default FavBtn