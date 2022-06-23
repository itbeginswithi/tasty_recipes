import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {BsSearch, BsFillBookmarkHeartFill} from 'react-icons/bs';
import {RiArrowDropDownLine, RiArrowDropUpLine, RiUser6Line} from 'react-icons/ri';
import {IoMdExit} from 'react-icons/io';

import classes from './Header.module.scss';
import { getRecipes } from '../../api/recipes';
import { setRecipes, setFetchingRecipes } from '../../store/recipesSlice';
import {  setShowModal } from '../../store/authSlice';
import { setIsSignedIn, setShowModal1 } from '../../store/authenticationSlice';
const Header = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [query, setQuery] = useState('');
  const [prevQuery, setPrevQuery] = useState('');
  const username = localStorage.getItem('username');
  const {isSignedIn} = useSelector(state => state.authentication);
  
  


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('username');
   localStorage.removeItem('userId');
    dispatch (setIsSignedIn(false));
}

  const fetchRecipes = async (query) => {
    navigate('/');

    if(query === prevQuery || query === '') {
      return;
    }

    
    setPrevQuery(query);
    dispatch(setFetchingRecipes(true));

    const recipes = await getRecipes(query);
    
    if(typeof recipes === 'object'){
      dispatch(setFetchingRecipes(false));
      dispatch(setRecipes({recipes}));
      return;
    }
  }
  
  const toggleAuthModal = (state) => dispatch(setShowModal(state));
  const toggleAuthModal1 = (state) => dispatch(setShowModal1(state));
  return (
  
    
      <div className={classes.container}>
      <Link to="/" className={classes.logo}>

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
        { isSignedIn ?
          (
            <div className={classes.user_account}>
              <button type="button" className={classes.favories}>
                <BsFillBookmarkHeartFill/>
              </button>
              <div className={classes.userProfile} onClick={() => setShowUserOptions(prevState => !prevState)}>
                <RiUser6Line className={classes.userProfile_icon}/>
                <span className={classes.userProfile_name}>  {username} </span>
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
                      <li className={`${classes.menu_item} ${classes.fav}`}>
                        <BsFillBookmarkHeartFill/> Saved
                        </li>
                      <li className={classes.menu_item}   onClick={logout}>

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
              <button type="button" onClick = {() => toggleAuthModal1(true) }  className={classes.authentication_login}>
                Login
              </button>
              <button type="button" onClick = {() => toggleAuthModal(true)} className={classes.authentication_signup} >
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