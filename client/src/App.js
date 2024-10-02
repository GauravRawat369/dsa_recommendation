import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import FirstPage from './pages/FirstPage'
import HomePage from './pages/HomePage';
import Login from './authPages/Login';
import SignUp from './authPages/SignUp';

function App() {
  
  return (
    <Routes>
        <Route path='/' element={<FirstPage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/signup' element={<SignUp/>} />
      </Routes>
  );
}

export default App;
