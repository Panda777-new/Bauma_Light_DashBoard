import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Login.module.scss';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      router.push('/');
    }
  }, []);

 const handleLogin = () => {
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('auth', 'true');
    router.push('/');
  } else {
    setError('Invalid username or password');
  }
};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login to Dashboard</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className={error ? 'error' : ''}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={error ? 'error' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
