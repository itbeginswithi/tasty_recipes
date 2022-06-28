import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CSSTransition from "react-transition-group/CSSTransition";

import { Header, Footer, Authentication } from './components';
import { Homepage, RecipeDetail, Settings, Sidebar } from './containers'; 
import './containers/Sidebar/keyframes.scss';
import { setIsSignedIn } from './store/authSlice';

const App = () => {
  const {isSignedIn} = useSelector(state => state.auth);
  const { isOpen } = useSelector(state => state.sidebar);
  const { modalIsOpen } = useSelector(state => state.auth);
  const userId = localStorage.getItem('userId');
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(userId){
      dispatch(setIsSignedIn(true));
    }
  }, [userId])
  
  useEffect(() => {
    if(isOpen || modalIsOpen){
      document.body.style.overflowY = "hidden";
    }else{
      document.body.style.overflowY = "scroll";
    }
  }, [isOpen, modalIsOpen])

  return (
    <Router>
      <Header/>
      {modalIsOpen && <Authentication/>}
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
        <Sidebar/>
      </CSSTransition>
      <Routes>
        <Route exact path="/recipe/:id" element={<RecipeDetail/>}/>
         <Route exact path="/settings" element={<Settings/>}/>
        <Route path="*" element={<Homepage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
