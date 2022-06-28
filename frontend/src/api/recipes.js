import axios from 'axios';

export const getRecipes = async (query) => {
    let recipes = {};

    const options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: {q: query},
        headers: {
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_RECIPES_API
        }
      };

      try {
          
        //hits: [{}, {}, {}]
        const {data: {hits}} = await axios.request(options);
        return hits;

      } catch (error) {
        console.log(error);  
      }
      
}

export const addToFavRecipe = async (recipe) => {

  try {
    const { data } = await axios.post("http://localhost:3000/rec/addRecipes", {
        ...recipe
      })
    return data._id;
  } catch (error) {
    return { message: error.message };
  }    
}

export const addBookmark = async (recipeId, userId, recipeName) => {
  console.log({recipeId, userId, recipeName});
  try {
    const { data } = await axios.post("http://localhost:3000/bookmark/add", {
        recipeId,
        recipeName,
        userId
      })
    return data;
  } catch (error) {
    return { message: error.message };
  }    
}

export const removeBookmark = async ({recipeId, userId}) => {
  
  try {
    const { data } = await axios.delete(`http://localhost:3000/bookmark/${recipeId}-${userId}`);
    return data;
  } catch (error) {
    return { message: error.message };
  }    
}

export const fetchBookmarks = async (userId) => {
  
  try {
    console.log('here')
    const data = await axios.get(`http://localhost:3000/bookmark/read?userId=${userId}`);
    console.log('here 2')
    return data;
  } catch (error) {
    return { message: error.message };
  }    
}