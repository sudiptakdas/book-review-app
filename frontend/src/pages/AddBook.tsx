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
  const [errors, setErrors] = useState<string[]>([]);

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
    setErrors([]);
    const validationErrors: string[] = [];
    if (!formData.title.trim()) {
      validationErrors.push('Please enter the title.');
    }
    if (!formData.author.trim()) {
      validationErrors.push('Please enter the author.');
    }
    if (!formData.image.trim()) {
      validationErrors.push('Please enter the image URL.');
    }
    if (!formData.description.trim()) {
      validationErrors.push('Please enter the description.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

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
      <h1 className='text-4xl font-semibold'>Add Book</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-10 w-full max-w-4xl'
      >
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleInputChange}
          placeholder='Title'
          className='border border-gray-400 rounded-xl px-3 py-2'
        />
        <input
          type='text'
          name='author'
          value={formData.author}
          onChange={handleInputChange}
          placeholder='Author'
          className='border border-gray-400 rounded-xl px-3 py-2'
        />
        <input
          type='text'
          name='image'
          value={formData.image}
          onChange={handleInputChange}
          placeholder='Image URL'
          className='border border-gray-400 rounded-xl px-3 py-2'
        />
        <textarea
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          placeholder='Description'
          rows={3}
          className='border border-gray-400 rounded-xl px-3 py-2'
        ></textarea>
        {errors.length > 0 && (
          <ul className='text-red-600 font-medium'>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
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
