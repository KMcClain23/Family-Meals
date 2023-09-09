import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { CreateRecipes } from './pages/CreateRecipe';
import { SavedRecipes } from './pages/SavedRecipes';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Auth' element={<Auth />} />
          <Route path='/CreateRecipes' element={<CreateRecipes />} />
          <Route path='/SavedRecipes' element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
