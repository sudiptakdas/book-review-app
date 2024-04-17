const express = require('express');
const app = express();
const booksRoutes = require('./routes/booksRoutes')
require('./connection/conn');

const port = 3000;

// Middleware
app.use(express.json());

app.use('/api', booksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
