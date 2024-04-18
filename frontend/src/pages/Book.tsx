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

  return (
    <div className=' border border-gray-300 py-6 px-10 rounded-lg flex flex-col gap-4'>
      <div>
        <h1 className='text-3xl font-bold'>{bookData?.title}</h1>
      </div>
      <div className=' flex justify-between items-center'>
        <div className=' text-start text-xl font-medium'>Rating:</div>
        <button
          className='flex items-start border-2 border-green-400 text-green-700 font-medium px-6 py-3 rounded-lg max-w-fit mt-2'
          onClick={() => {
            navigate(`/review-book/${id}`);
          }}
        >
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
      <div className=' border bg-gray-300 w-full'></div>
      <div className=' flex flex-col'>
        {bookData?.reviews.length > 0 && (
          <div>
            <h1 className='text-3xl font-semibold mb-2'>Reviews</h1>
            {bookData?.reviews?.map(
              (item: { user_name: string; comment: string }, index: number) => (
                <div
                  className='flex flex-col gap-2 mt-4 border border-gray-300 py-3 px-6 rounded-lg bg-gray-50'
                  key={index}
                >
                  <div className='flex gap-2 items-center'>
                    <img
                      src={`https://picsum.photos/200/${index}`}
                      className='rounded-full w-10 h-10'
                    />
                    <h1 className='text-xl font-medium -mt-1'>
                      {item?.user_name}
                    </h1>
                  </div>
                  <div className='text-start text-base'>Rating:</div>
                  <h1 className='text-start'>{item?.comment}</h1>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
