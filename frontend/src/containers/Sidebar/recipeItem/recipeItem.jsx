import React from "react";
import { Link } from "react-router-dom";
import { GiKitchenScale } from "react-icons/gi";
import { ImCalculator } from "react-icons/im";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdOutlineTimer } from "react-icons/md";

import classes from "./recipeItem.module.scss";
import { FavBtn } from "../../../components";

const recipeItem = ({
  recipe: {
    label,
    addedToFav,
    cuisineType,
    totalTime,
    totalWeight,
    servings,
    calories,
    imageUrl,
  },
  recipeId,
  singleRecipe,
}) => {
  return (
    <li
      className={
        singleRecipe
          ? `${classes.recipe} ${classes.singleRecipe}`
          : `${classes.recipe}`
      }
    >
      <div className={classes.recipe__container}>
        <Link
          to={`/recipe/` + recipeId}
          style={{ backgroundImage: "url(" + imageUrl + ")" }}
          className={classes.recipe__img}
        />
        <div className={classes.recipe__info}>
          <Link to={"/recipe/" + recipeId} className={`${classes.recipe__link} ${classes.flex}`}>
            <h1 className={classes.title}>{label}</h1>

            <ul className={classes.labels}>
              {/* Loop through the list items in the recipe */}
              {cuisineType.length !== 0 && (
                <li className={classes.label} title="Cuisine Type">
                  <TbToolsKitchen2 />
                  {cuisineType[0].charAt(0).toUpperCase() +
                    cuisineType[0].slice(1)}
                </li>
              )}
              {totalTime !== 0 && (
                <li className={classes.label} title="Total Time">
                  <MdOutlineTimer />
                  {totalTime}min
                </li>
              )}
              {totalWeight !== 0 && (
                <li className={classes.label} title="Total Weight">
                  <GiKitchenScale />
                  {Math.round(totalWeight)}gr
                </li>
              )}
              {calories !== 0 && (
                <li className={classes.label} title="Calories">
                  <ImCalculator />
                  {Math.round(calories)}cal
                </li>
              )}
              {servings !== 0 && (
                <li className={classes.label}>
                  Yield: <strong>{servings}</strong>
                </li>
              )}
            </ul>
          </Link>
          
          <div className={classes.recipe__actions}>
            <FavBtn addedToFav={addedToFav} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default recipeItem;
