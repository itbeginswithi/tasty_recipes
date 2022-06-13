import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {BsSearch, BsFillBookmarkHeartFill} from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import {RiArrowDropDownLine, RiArrowDropUpLine, RiUser6Line} from 'react-icons/ri';
import {IoMdExit} from 'react-icons/io';

import classes from './Header.module.scss';
import { getRecipes } from '../../api/recipes';
import { setRecipes, setFetchingRecipes, setRecipesFound, setError } from '../../store/recipesSlice';
import { toggleSidebarIsOpen } from '../../store/sidebarSlice';
import {images} from '../../images';

const Header = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [query, setQuery] = useState('');
  const [prevQuery, setPrevQuery] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRecipes = async (query) => {
    navigate('/');

    if(query === prevQuery || query === '') {
      return;
    }
    
    setPrevQuery(query);
    dispatch(setFetchingRecipes(true));

    const recipes = await getRecipes(query);

    dispatch(setFetchingRecipes(false));
    
    //api conenction error
    if(recipes === undefined){
      dispatch(setError(true));
      return;
    }

    if(!recipes.length){
      dispatch(setRecipesFound(false));
      dispatch(setError(false));
      return;
    }
    
    if(typeof recipes === 'object'){
      dispatch(setError(false));
      dispatch(setRecipesFound(true));
      dispatch(setRecipes({recipes}));
      return;
    }
  }

  const toggleSidebar = (toggle) => {
    dispatch(toggleSidebarIsOpen());
  }

  const clearRecipeObj = () => {
    dispatch(setError(false));
    dispatch(setRecipesFound(true));
    dispatch(setRecipes({recipes: []}));      
  }

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.logo} onClick={() => clearRecipeObj()}>
        <img src={images.Logo} alt="herushii-logo"/>
      </Link>

      <div className={classes.search}>
        <input 
          className={classes.search_input}
          type="text"   
          name="search" 
          autoComplete="off" 
          placeholder="Search for a recipe.."
          onChange={(e) => setQuery(e.target.value)} />
        <button type="button" className={classes.search_btn} onClick={() => fetchRecipes(query)} >
          <BsSearch/>
        </button>
      </div>

      <div className={classes.user}>
        { true ?
          (
            <div className={classes.user_account}>
              <button type="button" className={classes.favories} onClick={() => toggleSidebar()}>
                <BsFillBookmarkHeartFill/>
              </button>
              <div className={classes.userProfile} onClick={() => setShowUserOptions(prevState => !prevState)}>
                <RiUser6Line className={classes.userProfile_icon}/>
                <span className={classes.userProfile_name}>Username</span>
                {
                  showUserOptions ? 
                    (
                      <RiArrowDropUpLine className={classes.userProfile_uparrow}/>
                    )
                    :
                    (
                      <RiArrowDropDownLine className={classes.userProfile_downarrow}/>
                    )
                }

                {showUserOptions &&   
                  (
                    <ul className={classes.menu}>
                      <li className={`${classes.menu_item} ${classes.fav}`} onClick={() => toggleSidebar()}>
                        <BsFillBookmarkHeartFill/> Saved
                        </li>
                      <li className={classes.menu_item}>
                        <Link to={'/settings'}>
                          <FiSettings/> Settings
                        </Link>
                      </li>
                      <li className={classes.menu_item}>
                        <IoMdExit/> Logout
                        </li>
                    </ul>
                  )
                }
              </div>
            </div>
          )
          :
          (
            <div className={classes.authentication}>
              <button type="button" className={classes.authentication_login}>
                Login
              </button>
              <button type="button" className={classes.authentication_signup}>
                Signup
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Header