import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header } from './components';
import { Homepage, RecipeDetail, Sidebar } from './containers'; 

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
      {isOpen && <Sidebar/> }
      <Routes>
        <Route exact path="/recipe/:id" element={<RecipeDetail/>}/>
        <Route path="*" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
