const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://bookapp:app123@cluster0.fxzwele.mongodb.net/book-review-app?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Data Base connected'));
