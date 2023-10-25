// import './App.css';
// Tirei o css por que com ele diretamente no app tava bugando os requisitos
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Header from './components/Header';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route Component={ Header }>
        <Route path="/meals" Component={ Meals } />
        <Route path="/drinks" Component={ Drinks } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Route>
      <Route path="/meals/:id" Component={ RecipeDetails }/>
      <Route path="/drinks/:id" Component={ RecipeDetails }/>
      <Route path="/meals/:id/in-progress" />
      <Route path="/drinks/:id/in-progress" />
    </Routes>
  );
}

export default App;
