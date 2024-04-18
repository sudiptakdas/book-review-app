import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className=' flex flex-col gap-5'>
      <h1 className=' text-black font-medium text-4xl'>
        Hi! Kindly click below link to navigate to right Page
      </h1>
      <h1
        className=' text-blue-500 underline text-3xl cursor-pointer hover:scale-105'
        onClick={() => navigate('/books')}
      >
        Navigate
      </h1>
    </div>
  );
}

export default App;
