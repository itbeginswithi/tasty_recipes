import axios from 'axios';

export const getRecipes = async (query) => {

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

        const recipes = hits.map(recipeObj => ({
          recipe: {
            ...recipeObj.recipe,
            addedToFav: false
          }
        }))

        return recipes;

      } catch (error) {
        console.log(error);  
      }
      
}

export const addToFavRecipe = async (recipe) => {
  
  try {
    // const recipeImage = "https://source.unsplash.com/450x650?" + recipe.label.split(' ').join('-');

    const { data } = await axios.post("http://localhost:3000/rec/addRecipes", {
        ...recipe,
        // image: recipeImage,
      })   

    return data._id;
  } catch (error) {
    return { message: error.message };
  }    
}

export const addBookmark = async ({recipeId, userId}) => {

  try {
    const { data } = await axios.post("http://localhost:3000/bookmarks/add", {
        recipe: recipeId,
        userId
      })
    return data;
  } catch (error) {
    return { message: error.message };
  }    
}

export const removeBookmark = async ({recipeId, userId}) => {
  try {
    const { data } = await axios.delete(`http://localhost:3000/bookmarks?recipeId=${recipeId}&userId=${userId}`);
    return data;
  } catch (error) {
    return { message: error.message };
  }    
}

export const removeFavRecipe = async ({recipeId}) => {
  
  console.log('here');
  console.log({recipeId});
  
  try {
    const { data } = await axios.delete(`http://localhost:3000/rec/${recipeId}`);
    return data;
  } catch (error) {
    return { message: error.message };
  }    
}

export const fetchBookmarks = async (userId) => {
  
  try {
    const data = await axios.get(`http://localhost:3000/bookmarks/read?userId=${userId}`);
    return data;
  } catch (error) {
    return { message: error.message };
  }    
}