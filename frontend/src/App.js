import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components';

import { Homepage, RecipeDetail, Sidebar } from './containers'; 

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/recipe/:id" element={<RecipeDetail/>}/>
        <Route path="*" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
