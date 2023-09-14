import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { CreateRecipe } from './pages/CreateRecipe';
import { SavedRecipes } from './pages/SavedRecipes';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/RegisterForm';
import EditUser from './pages/EditUser.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edituser' element={<EditUser />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/createRecipe' element={<CreateRecipe />} />
          <Route path='/savedRecipes' element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;