import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Books from './pages/Books.tsx';
import Book from './pages/Book.tsx';
import ReviewBook from './pages/ReviewBook.tsx';
import AddBook from './pages/AddBook.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/add-book',
    element: <AddBook />,
  },
  {
    path: 'book/:id',
    element: <Book />,
  },
  {
    path: 'review-book/:id',
    element: <ReviewBook />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
