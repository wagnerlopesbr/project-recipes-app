import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [message, setMessage] = useState('');

  const recipeLink = window.location.href;

  const handleShareClick = async () => {
    const link = recipeLink.replace(/\/in-progress/, '');
    await navigator.clipboard.writeText(link);
    setMessage('Link copied!');
    return message;
  };

  return (
    <div>
      <button data-testid="favorite-btn">Favoritar</button>
      <button
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <p>{ message && <p>{ message }</p> }</p>
    </div>
  );
}

export default ShareButton;
