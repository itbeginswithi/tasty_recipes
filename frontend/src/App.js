import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CSSTransition from "react-transition-group/CSSTransition";
import { Header, Footer } from './components';
import { Homepage, RecipeDetail, Settings, Sidebar } from './containers'; 
import './containers/Sidebar/keyframes.scss';
import SignUp from './components/Modal/SignUp';
import {useDispatch, useSelector} from 'react-redux';
import Authentication from './components/Modal/Authentication';
import { setIsSignedIn } from './store/authenticationSlice';


const App = () => {
  const { isOpen } = useSelector(state => state.sidebar);
  const dispatch = useDispatch();
  const { open,isSignedIn } = useSelector(state => state.auth);
  const { open1 } = useSelector(state => state.authentication);
  const user = localStorage.getItem('username');
  useEffect(() => {
    if(user){
      dispatch(setIsSignedIn(true)) 
    }
}, [])

  useEffect(() => {
    if(isOpen){
      document.body.style.overflowY = "hidden";
    }else{
      document.body.style.overflowY = "scroll";
    }
  }, [isOpen])

  return (
    <Router>
      <Header/>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        timeout={450}
        classNames={{
          enterActive: "SidebarOpen",
          exitActive: "SidebarClose",
        }}
      >
         { open && <SignUp/>}
      { open1 && !isSignedIn &&  <Authentication/>}
        <Sidebar/>
      </CSSTransition>
      <Routes>
        <Route exact path="/recipe/:id" element={<RecipeDetail/>}/>
        <Route exact path="/settings" element={<Settings/>}/>
        <Route path="*" element={<Homepage/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/Login" element={<Authentication/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
