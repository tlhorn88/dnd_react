import './App.css';
import { Routes, Route } from 'react-router-dom';
import Page1 from './Components/TestPages/Page1';
import Page2 from './Components/TestPages/Page2';
import Page3 from './Components/TestPages/Page3';
import NoMatch from './Components/Layout/NoMatch/NoMatch';
import Layout from './Components/Layout/Layout';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Page1 />} />
          <Route path='page2' element={<Page2 />} />
          <Route path='page3' element={<Page3 />} />
          <Route path ="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
