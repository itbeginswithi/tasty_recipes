const Joi = require("joi");

module.exports = {
  user: (userObj) => {
    const schema = Joi.object({
      email: Joi.string(),
      password: Joi.string().min(5).max(255).allow(""),
    });
    return schema.validate(userObj);
  },

  
  recipes: (recipes) => {
    const schema = Joi.object({
      heathLabel: Joi.string(),
      totalWeight: Joi.string(),
      calories: Joi.string(),
      cuisineType: Joi.string(),
      ingredients: Joi.string(),
      cautions: Joi.string()
    });
    return schema.validate(recipes);
  },

  bookmarks: (bookmarks) => {
    const schema = Joi.object({
      userId: Joi.objectId().allow(""),
      recipesId: Joi.objectId().allow(""),
    });
    
    return schema.validate(bookmarks);
  }





};