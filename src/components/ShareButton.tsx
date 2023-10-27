import { useState } from 'react';

function ShareButton() {
  const [message, setMessage] = useState('');

  const shareIcon = '/src/images/shareIcon.svg';
  const recipeLink = window.location.href;

  const handleShareClick = () => {
    navigator.clipboard.writeText(recipeLink);
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
