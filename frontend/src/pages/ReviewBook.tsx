import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { bookType } from './Book';
import axios from 'axios';

const ReviewBook: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<bookType>();
  const [reviewData, setReviewData] = useState({
    user_name: '',
    comment: '',
    rating: 0,
  });

  const handleRating = (rate: number) => {
    setReviewData((prevState) => ({
      ...prevState,
      rating: rate,
    }));
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewData((prevState) => ({
      ...prevState,
      user_name: e.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(reviewData);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/books/${id}/reviews`,
        {
          user_name: reviewData.user_name,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }
      );

      console.log(response);

      setReviewData({
        user_name: '',
        comment: '',
        rating: 0,
      });

      navigate(-1);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/books/${id}`);
        setBookData(res?.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetch();
  }, []);

  return (
    <div className='border border-gray-300 p-6 rounded-lg flex flex-col gap-10 items-center'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-10'>
          <h1 className='text-start text-3xl font-medium'>{bookData?.title}</h1>
          <div className='flex flex-col gap-3'>
            <h1 className='text-start'>Add your UserName</h1>
            <input
              value={reviewData.user_name}
              onChange={handleUserNameChange}
              className='w-full border border-gray-400 rounded-xl px-3 py-2'
              placeholder='Your UserName'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <h1 className='text-start'>What do you think about the book?</h1>
            <textarea
              rows={3}
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
              className='w-full border border-gray-400 rounded-xl px-3 py-2'
            />
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h1 className='text-start'>Rate the book:</h1>
            <Rating SVGstyle={{ display: 'inline' }} onClick={handleRating} />
          </div>
          <button
            type='submit'
            className='border border-green-400 text-green-700 font-medium px-6 py-3 rounded-lg max-w-fit mt-2'
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewBook;
