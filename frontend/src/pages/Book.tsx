import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export interface bookType {
  _id: string;
  author: string;
  image: string;
  averageRating: string;
  description: string;
  title: string;
  reviews: any;
}

const Book = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookData, setBookData] = useState<bookType>();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`http://localhost:3000/api/books/${id}`)
        .then((res) => setBookData(res?.data));
    };
    fetch();
  }, []);

  console.log(bookData, '@@@@@');
  return (
    <div className=' border border-gray-300 py-6 px-10 rounded-lg flex flex-col gap-4'>
      <div>
        <h1 className='text-3xl font-bold'>{bookData?.title}</h1>
      </div>
      <div className=' flex justify-between items-center'>
        <div className=' text-start text-xl font-medium'>Rating:</div>
        <button className='flex items-start border-2 border-green-400 text-green-700 font-medium px-6 py-3 rounded-lg max-w-fit mt-2'>
          Review Book
        </button>
      </div>
      <div className=' border bg-gray-300 w-full'></div>
      <div className=' flex flex-col gap-4'>
        <div className=' flex justify-center items-center flex-col'>
          <img src={bookData?.image} className=' w-4/12 min-w-fit' />
          <h1 className=' text-base font-medium -mt-2'>
            Author: {bookData?.author}
          </h1>
        </div>
        <div>
          <h1 className=''>{bookData?.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default Book;
