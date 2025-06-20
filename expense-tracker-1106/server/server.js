// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(cors({ exposedHeaders: ['X-Total-Count'] }));
app.use(express.json());

// 1. DB connection
mongoose.connect('mongodb://127.0.0.1:27017/expenseDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 2. Mount your expenses API under /expenses
app.use('/api/expenses', expenseRoutes);

// 3. Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
