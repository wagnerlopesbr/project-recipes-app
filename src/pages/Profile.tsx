import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const [user] = useLocalStorage<{ email: string }>('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('doneRecipes');
    navigate('/');
  };

  return (
    <div>
      <main>
        <div>
          <h3>Email:</h3>
          <p data-testid="profile-email">{user.email}</p>
        </div>
        <div>
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
