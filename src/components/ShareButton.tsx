import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

type Props = {
  testid: string;
};

function ShareButton({ testid }: Props) {
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
      <button
        data-testid={ testid }
        onClick={ handleShareClick }
      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <p>{message && <p>{message}</p>}</p>
    </div>
  );
}

export default ShareButton;
