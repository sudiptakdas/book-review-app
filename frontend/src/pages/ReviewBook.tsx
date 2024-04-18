import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookType } from './Book';
import axios from 'axios';

const ReviewBook: React.FC = () => {
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
    <div className='  border border-gray-300 p-6 rounded-lg flex flex-col gap-10 items-center'>
      <div className=' flex flex-col gap-10'>
        <h1 className=' text-start text-3xl font-medium'>{bookData?.title}</h1>
        <div className=' flex flex-col gap-3'>
          <h1 className=' text-start'>What so you think about the book?</h1>
          <textarea
            rows={3}
            className=' w-full border border-gray-400 rounded-xl px-3 py-2'
          />
        </div>
        {/* <div className=' flex flex-col items-start gap-2'>
          <h1 className=' text-start'>Rate the book:</h1>
          <Rating />
        </div> */}
      </div>
    </div>
  );
};

export default ReviewBook;
