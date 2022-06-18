import React, { useState } from "react";
import Lottie from "react-lottie";

import classes from "./Intro.module.scss";
import {
  RecipeCardsAnimation,
  RecipesBookAnimation,
  CookingBlog,
} from "../../animations";

const Intro = () => {
  const [stop, setStop] = useState(true);
  const first = {
    loop: false,
    autoPlay: false,
    animationData: RecipeCardsAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const second = {
    loop: false,
    autoPlay: false,
    animationData: CookingBlog,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const third = {
    loop: false,
    autoPlay: false,
    animationData: RecipesBookAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <div className={classes.animation}>
          <Lottie
            options={first}
            width="auto"
            height="auto"
            isClickToPauseDisabled={true}
          />
        </div>
        <p>
          {" "}
          🔍 Search over 2 million recipes on our large recipe database. We add
          new sites and recipes continuously!
        </p>
      </li>
      <li className={classes.item}>
        <div className={classes.animation}>
          <Lottie
            options={second}
            width="auto"
            height="auto"
            isClickToPauseDisabled={true}
          />
        </div>
        <p>
          {" "}
          🍽️ Find out the ingredients, nutrients, health and cautions labels,
          and much more details for every recipe.
        </p>
      </li>
      <li className={classes.item}>
        <div className={classes.animation}>
          <Lottie
            options={third}
            width="auto"
            height="auto"
            i
            sClickToPauseDisabled={true}
          />
        </div>
        <p>
          {" "}
          ❤️ Save your favourite recipes on your account for quick access across
          devices
        </p>
      </li>
    </ul>
  );
};

export default Intro;
