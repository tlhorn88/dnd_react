import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Page2 from './Components/TestPages/Page2';
import Page3 from './Components/TestPages/Page3';
import NoMatch from './Components/Layout/NoMatch/NoMatch';
import Layout from './Components/Layout/Layout';
import RecipeDisplay from './Components/RecipeDisplay/RecipeDisplay';
import RandomRecipe from './Components/RandomRecipe/RandomRecipe';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/page2' element={<Page2 />} />
          <Route path='/page3' element={<Page3 />} />
          <Route path='/recipeDisplay' element={<RecipeDisplay />} />
          <Route path="/RandomRecipe" element={<RandomRecipe />} />
          <Route path ="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
