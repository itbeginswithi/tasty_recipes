import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CSSTransition from "react-transition-group/CSSTransition";

import { Header } from './components';
import { Homepage, RecipeDetail, Sidebar } from './containers'; 
import './containers/Sidebar/keyframes.scss';

const App = () => {
  const { isOpen } = useSelector(state => state.sidebar);
  
  useEffect(() => {
    if(isOpen){
      document.body.style.overflowY = "hidden";
      console.log('isOpen');
    }else{
      document.body.style.overflowY = "scroll";
      console.log('isCLosed');
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
        <Route path="*" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
