import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksComponent from '../components/BooksComponent';
import { useNavigate } from 'react-router-dom';

export interface booksType {
  _id: string;
  author: string;
  image: string;
  averageRating: string;
  description: string;
  title: string;
}

const Books: React.FC = () => {
  const navigate = useNavigate();
  const [booksData, setBooksData] = useState<booksType[]>();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('http://localhost:3000/api/books')
        .then((res) => setBooksData(res?.data));
    };
    fetch();
  }, []);

  return (
    <div className=' border border-gray-400 p-8 rounded-md'>
      <h1 className=' text-6xl text-blue-500 font-semibold mb-10'>Books</h1>
      <div className=' flex justify-end mb-4 -mt-6'>
        <button
          className='flex items-start border-2 border-green-400 text-green-700 font-medium px-6 py-3 rounded-lg max-w-fit mt-2'
          onClick={() => {
            navigate('/add-book');
          }}
        >
          Add More Book
        </button>
      </div>

      <div className=' flex flex-col gap-2'>
        {booksData?.map((book) => {
          return (
            <BooksComponent
              _id={book?._id}
              title={book?.title}
              description={book?.description}
              author={book?.author}
              image={book?.image}
              rating={parseInt(book?.averageRating)}
              onClick={() => navigate(`/book/${book?._id}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Books;
