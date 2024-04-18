import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksComponent from '../components/BooksComponent';

export interface booksType {
  _id: string;
  author: string;
  image: string;
  averageRating: string;
  description: string;
  title: string;
}

const Books: React.FC = () => {
  const [booksData, setBooksData] = useState<booksType[]>();
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('http://localhost:3000/api/books')
        .then((res) => setBooksData(res?.data));
    };
    fetch();
  }, []);

  console.log(booksData, '@@@@@');

  return (
    <div className=' border border-gray-400 p-8 rounded-md'>
      <h1 className=' text-6xl text-blue-500 font-semibold mb-4'>Books</h1>
      <div className=' flex flex-col gap-2'>
        {booksData?.map((book) => {
          return (
            <BooksComponent
              _id={book?._id}
              title={book?.title}
              description={book?.description}
              author={book?.author}
              image={book?.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Books;
