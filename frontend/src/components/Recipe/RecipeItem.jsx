import React, { useState } from "react";
import { GiKitchenScale } from "react-icons/gi";
import { ImCalculator } from "react-icons/im";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdThumbUpOffAlt, MdThumbUp, MdOutlineTimer } from "react-icons/md";
import {Link} from 'react-router-dom';

import classes from "./RecipeItem.module.scss";
import FavBtn from "../FavBtn/FavBtn";

const RecipeItem = ({
  recipe,
  imageUrl,
  label,
  healthLabels,
  servings,
  cuisineType,
  calories,
  totalWeight,
  totalTime,
  addedToFav
}) => {
  const [liked, setLiked] = useState(false);

  const recipeId = label?.toLowerCase().split(' ').join('-');

  return (
    <div className={classes.recipeItem}>


      <Link to={'/recipe/' + recipeId} className={classes.recipeItem__link}>
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
                Yield: <strong>{servings}</strong>
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
      </Link>
        <div className={classes.actions}>
          <button type="button" className={`${classes.actions_btn} ${classes.btn_like}`}>
              
              {liked ?  
                <MdThumbUp onClick={() => setLiked(false)} title="Remove" /> 
                : 
                <MdThumbUpOffAlt onClick={() => setLiked(true)}/>
              }
          </button>

          <FavBtn addedToFav={addedToFav} recipe={recipe} />
        </div>
    </div>
  );
};

export default RecipeItem;
