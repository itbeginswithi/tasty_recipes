import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CSSTransition from "react-transition-group/CSSTransition";

import { Header, Footer } from './components';
import { Homepage, RecipeDetail, Settings, Sidebar } from './containers'; 
import './containers/Sidebar/keyframes.scss';

const App = () => {
  const { isOpen } = useSelector(state => state.sidebar);
  
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
        <Sidebar/>
      </CSSTransition>
      <Routes>
        <Route exact path="/recipe/:id" element={<RecipeDetail/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="*" element={<Homepage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
