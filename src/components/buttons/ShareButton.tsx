import { useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';

type Props = {
  id: string;
  keyStr: string;
  testid: string;
};

function ShareButton({ id, keyStr, testid }: Props) {
  const [message, setMessage] = useState('');

  const handleShareClick = async () => {
    const recipeLink = `http://localhost:3000/${keyStr}/${id}`;
    await navigator.clipboard.writeText(recipeLink);
    setMessage('Link copied!');
    return message;
  };

  return (
    <div>
      <button
        onClick={ handleShareClick }
      >
        <img
          data-testid={ testid }
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <p>{message && <p>{message}</p>}</p>
    </div>
  );
}

export default ShareButton;
