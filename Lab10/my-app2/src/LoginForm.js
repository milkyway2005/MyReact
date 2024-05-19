import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function LoginForm() {
  const [formData, setFormData] = useState({ nickname: '', password: '' });
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/home'); // Перенаправляем на страницу Home после успешной авторизации
      } else {
        // Обработка ошибки
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логин:
        <input
          type="text"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
        />
      </label>
      <label>
        Пароль:
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </label>
      <button type="submit">Войти</button>
    </form>
  );
}

export default LoginForm;