import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import FirstPage from './pages/FirstPage'
import HomePage from './pages/HomePage';
import Login from './authPages/Login';
import SignUp from './authPages/SignUp';
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser} = useAuthContext();
  return (
    <Routes>
        <Route path='/' element={<FirstPage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/auth/login' element={authUser? <Navigate to = "/home"/>: <Login/>} />
        <Route path='/auth/signup' element={authUser? <Navigate to = "/home"/>: <SignUp/>} />
      </Routes>
  );
}

export default App;
