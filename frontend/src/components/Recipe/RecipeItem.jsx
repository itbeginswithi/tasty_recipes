import React, { useState, useEffect } from "react";
import { GiKitchenScale } from "react-icons/gi";
import { ImCalculator } from "react-icons/im";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdThumbUpOffAlt, MdThumbUp, MdOutlineTimer } from "react-icons/md";

import classes from "./RecipeItem.module.scss";

const RecipeItem = ({
  imageUrl,
  label,
  healthLabels,
  servings,
  id,
  cuisineType,
  calories,
  totalWeight,
  totalTime,
  addedToFav
}) => {

  const [favorite, setFavorite] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className={classes.recipeItem}>


      <a href={'/recipe/' + id} target="_blank" rel="noreferrer" className={classes.recipeItem__link}>
      <div
        className={classes.recipeItem__image}
        style={{ backgroundImage: "url(" + imageUrl + ")" }}
      ></div>
        <div className={classes.recipeItem__info}>
          <h2>{label}</h2>

          <div className={classes.healthNumbers}>
            {cuisineType !== '' && (
              <div className={classes.healthNumbers_item} title="Cuisine Type">
                <TbToolsKitchen2 />
                {cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1)}
              </div>
            )}
            {totalTime !== 0 && (
              <div className={classes.healthNumbers_item} title="Total Time">
                <MdOutlineTimer />
                {totalTime}min
              </div>
            )}
            {totalWeight !== 0 && (
              <div className={classes.healthNumbers_item} title="Total Weight">
                <GiKitchenScale />
                {Math.round(totalWeight)}gr
              </div>
            )}
            {calories !== 0 && (
              <div className={classes.healthNumbers_item} title="Calories">
                <ImCalculator />
                {Math.round(calories)}cal
              </div>
            )}
            {servings !== 0 && (
              <div className={classes.healthNumbers_item}>
                Servings: <strong>{servings}</strong>
              </div>
            )}
          </div>
          <div className={classes.healthLabels}>
            {healthLabels &&
              healthLabels.map((healthLabel) => (
                <span className={classes.healthLabels__tag} key={healthLabel}>
                  {healthLabel.split("-").join(" ")}
                </span>
              ))}
          </div>
        </div>
      </a>
        <div className={classes.actions}>
          <button type="button" className={`${classes.actions_btn} ${classes.btn_like}`}>
              
              {liked ?  
                <MdThumbUp onClick={() => setLiked(false)} title="Remove" /> 
                : 
                <MdThumbUpOffAlt onClick={() => setLiked(true)}/>
              }
          </button>
          <button type="button" className={`${classes.actions_btn}`}>
            {favorite ?  
              <AiFillHeart className={classes.btn_fav} onClick={() => setFavorite(false)} title="Remove" /> 
              : 
              <AiOutlineHeart className={classes.btn_outlineFav} onClick={() => setFavorite(true)}/>
            }
          </button>

        </div>
    </div>
  );
};

export default RecipeItem;
