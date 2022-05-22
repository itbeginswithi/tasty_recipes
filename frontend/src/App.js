import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Homepage, RecipeDetail } from './containers'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/recipe/:id" element={<RecipeDetail/>}/>
        <Route path="*" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
