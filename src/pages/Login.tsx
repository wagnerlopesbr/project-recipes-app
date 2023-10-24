import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';

type User = {
  email: string;
};

function Login() {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage<User>('user');
  const form = useForm({
    initialValues: { email: '', password: '' },
    validation: {
      email: { filter: 'email' },
      password: { filter: 'length', length: 7 },
    },
    onSubmit: (values) => {
      setUser({ email: values.email });
      navigate('/meals');
    },
  });

  return (
    <div>
      <form action="submit" onSubmit={ form.handleSubmit }>
        <input
          name="email"
          type="text"
          value={ form.values.email }
          onChange={ form.handleChange }
          data-testid="email-input"
        />
        <input
          name="password"
          type="password"
          value={ form.values.password }
          onChange={ form.handleChange }
          data-testid="password-input"
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !form.validate }
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
