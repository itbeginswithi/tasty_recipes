import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {BsSearch, BsFillBookmarkHeartFill} from 'react-icons/bs';
import {RiArrowDropDownLine, RiArrowDropUpLine, RiUser6Line} from 'react-icons/ri';
import {IoMdExit} from 'react-icons/io';

import classes from './Header.module.scss';
import { getRecipes } from '../../api/recipes';
<<<<<<< HEAD
import { setRecipes, setFetchingRecipes } from '../../store/recipesSlice';
import {  setShowModal } from '../../store/authSlice';
import { setIsSignedIn, setShowModal1 } from '../../store/authenticationSlice';
=======
import { setRecipes, setFetchingRecipes, setRecipesFound, setError } from '../../store/recipesSlice';
import { setIsSignedIn, setModalIsOpen, setSignupForm } from '../../store/authSlice';
import { toggleSidebarIsOpen } from '../../store/sidebarSlice';
import {images} from '../../images';

>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93
const Header = () => {
  const { isSignedIn } = useSelector(state => state.auth);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [query, setQuery] = useState('');
<<<<<<< HEAD
  const [prevQuery, setPrevQuery] = useState('');
  const username = localStorage.getItem('username');
  const {isSignedIn} = useSelector(state => state.authentication);
  
  

=======
  // const [prevQuery, setPrevQuery] = useState('');
  const username = localStorage.getItem('username');
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('username');
   localStorage.removeItem('userId');
    dispatch (setIsSignedIn(false));
}

  const fetchRecipes = async (query) => {
    navigate('/');

    if(query === '') {
      return;
    }

    
    dispatch(setFetchingRecipes(true));

    const recipes = await getRecipes(query);
    
    if(typeof recipes === 'object'){
      dispatch(setFetchingRecipes(false));
      dispatch(setRecipes({recipes}));
      return;
    }
  }
<<<<<<< HEAD
  
  const toggleAuthModal = (state) => dispatch(setShowModal(state));
  const toggleAuthModal1 = (state) => dispatch(setShowModal1(state));
  return (
  
    
      <div className={classes.container}>
      <Link to="/" className={classes.logo}>
=======

  const toggleSidebar = (toggle) => {
    dispatch(toggleSidebarIsOpen());
  }

  const clearRecipeObj = () => {
    dispatch(setError(false));
    dispatch(setRecipesFound(true));
    dispatch(setRecipes({recipes: []}));      
  }

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    dispatch(setIsSignedIn(false))
  }

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.logo} onClick={() => clearRecipeObj()}>
        <img src={images.Logo} alt="herushii-logo" draggable="false"/>
      </Link>
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93

      </Link>
      <div className={classes.search}>
        <input 
          className={classes.search_input}
<<<<<<< HEAD
          type="text" 
          name="search" 
=======
          type="text"   
          name="searchbar" 
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93
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
<<<<<<< HEAD
                <span className={classes.userProfile_name}>  {username} </span>
=======
                <span className={classes.userProfile_name}>{username && username}</span>
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93
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
<<<<<<< HEAD
                      <li className={classes.menu_item}   onClick={logout}>

=======
                      <li className={classes.menu_item}>
                        <Link to={'/settings'}>
                          <FiSettings/> Settings
                        </Link>
                      </li>
                      <li className={classes.menu_item} onClick={logout}>
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93
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
<<<<<<< HEAD
            <div className={classes.authentication}>
              <button type="button" onClick = {() => toggleAuthModal1(true) }  className={classes.authentication_login}>
                Login
              </button>
              <button type="button" onClick = {() => toggleAuthModal(true)} className={classes.authentication_signup} >
=======
            <div className={classes.authentication}> 
              <button type="button" className={classes.authentication_login} onClick={() => dispatch(setModalIsOpen(true), dispatch(setSignupForm(false)))}>
                Login
              </button>
              <button type="button" className={classes.authentication_signup} onClick={() => dispatch(setModalIsOpen(true), dispatch(setSignupForm(true)))}>
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93
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