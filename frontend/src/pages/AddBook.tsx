import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBookForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    description: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/books', {
        title: formData?.title,
        author: formData?.author,
        image: formData?.image,
        description: formData?.description,
      });
      console.log(response);
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className='border border-gray-300 p-6 rounded-lg flex flex-col gap-10 items-center'>
      <h1 className='text-3xl font-medium'>Add Book</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3 w-full max-w-4xl'
      >
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleInputChange}
          placeholder='Title'
          className='border border-gray-400 rounded-xl px-3 py-2'
          required
        />
        <input
          type='text'
          name='author'
          value={formData.author}
          onChange={handleInputChange}
          placeholder='Author'
          className='border border-gray-400 rounded-xl px-3 py-2'
          required
        />
        <input
          type='text'
          name='image'
          value={formData.image}
          onChange={handleInputChange}
          placeholder='Image URL'
          className='border border-gray-400 rounded-xl px-3 py-2'
          required
        />
        <textarea
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          placeholder='Description'
          rows={3}
          className='border border-gray-400 rounded-xl px-3 py-2'
          required
        ></textarea>
        <button
          type='submit'
          className='border border-green-400 text-green-700 font-medium px-6 py-3 rounded-lg max-w-fit mt-2'
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
