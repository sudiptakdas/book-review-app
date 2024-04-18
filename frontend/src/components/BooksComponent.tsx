import React from 'react';
import { Rating } from 'react-simple-star-rating';

interface BooksCompType {
  _id: string;
  image: string;
  title: string;
  author: string;
  rating: number;
  description: string;
  onClick?: () => void;
}

const BooksComponent: React.FC<BooksCompType> = ({
  _id,
  image,
  title,
  author,
  rating,
  description,
  onClick,
}) => {
  return (
    <div className='flex gap-4'>
      <div className='flex bg-red-100 min-w-max'>
        <img src={image} className='flex bg-black rounded-xl' alt={title} />
      </div>
      <div className='flex flex-col justify-start gap-4'>
        <div>
          <h1 className='text-2xl text-start text-blue-600 font-semibold line-clamp-1'>
            {title}
          </h1>
          <h1 className='text-start text-xl text-gray-800 font-medium italic'>
            by {author}
          </h1>
        </div>
        <div className=' flex gap-2 items-center'>
          <h1 className='text-start text-xl text-gray-600'>Rating:</h1>
          <Rating
            SVGstyle={{ display: 'inline' }}
            initialValue={rating || 0}
            allowHover={false}
            readonly
            size={25}
          />
        </div>

        <h1 className='line-clamp-3 text-base text-start'>{description}</h1>
        <button
          className='flex items-start border-2 border-green-400 text-green-700 font-medium px-6 py-3 rounded-lg max-w-fit mt-2'
          id={_id}
          onClick={onClick}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default BooksComponent;
