'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

async function loginUser(username, password) {
  try {
    const response = await fetch('http://your-api-address/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: username,
        password: password
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

async function registerUser(username, password) {
  try {
    const response = await fetch('http://your-api-address/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: username,
        exp: 0,
        level: 0,
        stat_might: 0,
        stat_might_per_day: 0,
        stat_depxsity: 0,
        stat_depxsity_per_day: 0,
        stat_versatality: 0,
        stat_veratality_per_day: 0,
        stat_intellect: 0,
        stat_intellect_per_day: 0,
        stat_wisdom: 0,
        stat_wisdom_per_day: 0,
        stat_craft: 0,
        stat_craft_per_day: 0,
        task_per_day: 0,
        exp_per_day: 0,
        time_per_day: 0,
        time_all: 0,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Register failed');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt:', formData);

      loginUser(formData.name, formData.password).then(data => {
        console.log('Login successful:', data);
      })
      .catch(error => console.error('Error:', error.message));
    } else {
      console.log('Register attempt:', formData);
      
      registerUser(formData.name, formData.password).then(data => {
        console.log('Register successful:', data);
        // Сохраняем данные пользователя (например, в состояние или localStorage)
      })
      .catch(error => console.error('Error:', error.message));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', password: '' });
  };

  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-form']}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {!isLogin && <div className={styles['form-group']}>
            <label htmlFor="password">Repeat password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>}
          <button type="submit" className={styles['submit-btn']}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={toggleMode} className={styles['toggle-btn']}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
