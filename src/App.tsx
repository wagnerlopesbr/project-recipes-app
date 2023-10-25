import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Header from './pages/Header';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route Component={ Header }>
        <Route path="/meals" Component={ Meals } />
        <Route path="/drinks" />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Route>
      <Route path="/meals/:id-da-receita" />
      <Route path="/drinks/:id-da-receita" />
      <Route path="/meals/:id-da-receita/in-progress" />
      <Route path="/drinks/:id-da-receita/in-progress" />
    </Routes>
  );
}

export default App;
