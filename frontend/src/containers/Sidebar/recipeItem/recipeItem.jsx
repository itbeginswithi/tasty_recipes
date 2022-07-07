import React from "react";
import { Link } from "react-router-dom";
import { GiKitchenScale } from "react-icons/gi";
import { ImCalculator } from "react-icons/im";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdOutlineTimer } from "react-icons/md";

import classes from "./recipeItem.module.scss";
import { FavBtn } from "../../../components";
import { setSidebarIsOpen } from "../../../store/sidebarSlice";
import { useDispatch } from "react-redux";

const RecipeItem = ({
  recipe,
  recipe: {
    label,
    cuisineType,
    totalTime,
    totalWeight,
    calories,
    image,
    yield: servings
  },
  singleRecipe,
  addedToFav
}) => {
  const dispatch = useDispatch();
  const recipeId = label?.toLowerCase().split(' ').join('-');
  
  const recipeImg = image ? image : `https://source.unsplash.com/450x650?" + ${label.split(' ').join('-')}`

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
          style={{ backgroundImage: "url(" +  recipeImg + ")" }}
          className={classes.recipe__img}
          onClick={()  => dispatch(setSidebarIsOpen(false))}
        />
        <div className={classes.recipe__info}>
          <Link to={"/recipe/" + recipeId} className={`${classes.recipe__link} ${classes.flex}`} onClick={()  => dispatch(setSidebarIsOpen(false))}>
            <h1 className={classes.title}>{label}</h1>

            <ul className={classes.labels}>
              {/* Loop through the list items in the recipe */}
              {cuisineType && (
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
            <FavBtn addedToFav={addedToFav} recipe={recipe} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecipeItem;
