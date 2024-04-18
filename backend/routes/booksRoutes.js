const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');

// GET Request

// GET all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book_id',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
        },
      },
    ]);

    // Map through each book and include average ratings
    const booksWithRatings = books.map((book) => ({
      _id: book._id,
      title: book.title,
      author: book.author,
      image: book.image,
      genre: book.genre,
      description: book.description,
      averageRating: book.averageRating,
    }));

    res.status(200).json(booksWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book_id',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
        },
      },
    ]);

    if (book.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Since we expect only one book, we directly return the first element of the array
    const bookWithRatings = book[0];
    res.status(200).json(bookWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search for books by title, author
router.get('/books/search', async (req, res) => {
  const query = req.query.q;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST Request

// Add a new book
router.post('/books', async (req, res) => {
  const { title, author, image, description } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      image,
      description,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit a new review for a book
router.post('/books/:id/reviews', async (req, res) => {
  const { user_name, rating, comment } = req.body;
  const bookId = req.params.id;

  try {
    const review = new Review({
      book_id: bookId,
      user_name,
      rating,
      comment,
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
