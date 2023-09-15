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
import { DeleteUser } from './pages/DeleteUser';
import { useState } from "react";
import { ConfigProvider, theme } from "antd";

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
        <Router>
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/login' element={<Login />} />
            <Route path='/edituser' element={<EditUser />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/createRecipe' element={<CreateRecipe />} />
            <Route path='/savedRecipes' element={<SavedRecipes />} />
            <Route path='/deleteUser' element={<DeleteUser />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
