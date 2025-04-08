const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// простий тестовий маршрут
app.get('/', (req, res) => {
    res.json({ message: 'Сервер успішно працює!' });
});

// запуск слухача на серверному порту
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});