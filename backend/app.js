const express = require('express');
const app = express();
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes');
require('./connection/conn');

const port = 3000;
app.use(cors()); // added to call api form frontend

// Middleware
app.use(express.json());

app.use('/api', booksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
