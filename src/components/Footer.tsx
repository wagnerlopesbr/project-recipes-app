import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <style>
        {`
         footer {
          position : fixed;
          bottom : 0;
          }`}
      </style>
      <footer data-testid="footer">
        <button>
          <Link to="/drinks">
            <img
              data-testid="drinks-bottom-btn"
              src="/src/images/drinkIcon.svg"
              alt="drink-icon"
            />
          </Link>
        </button>

        <button>
          <Link to="/meals">
            <img
              data-testid="meals-bottom-btn"
              src="/src/images/mealIcon.svg"
              alt="meal-icon"
            />
          </Link>
        </button>
      </footer>

    </div>
  );
}

export default Footer;
