const express = require('express');
const cors = require('cors'); // Подключаем модуль для обработки CORS
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Используем CORS middleware

app.post('/user', (req, res) => {
  const { nickname, password } = req.body;
  console.log('Received registration request:', { nickname, password });
  res.sendStatus(200);
});

app.post('/auth', (req, res) => {
  const { nickname, password } = req.body;
  console.log('Received authentication request:', { nickname, password });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});