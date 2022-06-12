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
        console.log(hits);
        return hits;

      } catch (error) {
        console.log(error);  
      }
      
}