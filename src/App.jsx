import { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './components/dashboard/dashboard.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Layout from './Layout.jsx';
import Home from './components/home/home.jsx';
import Inventory from './components/inventory/inventory.jsx';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegister) {
        const response = await axios.post("/api/register", { email, password }, { withCredentials: true });
        if (response.data.success) {
          console.log("Registration successful");
          setIsRegister(false);
        } else {
          console.error(response.data.error);
        }
      } else {
        const response = await axios.post("/api/login", { email, password }, { withCredentials: true });
        if (response.data.success) {
          console.log("Logged in successfully");
          setIsLoggedIn(true);
        } else if (response.status === 401) {
          console.error("Invalid email or password");
        } else {
          console.error(response.data.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        setIsLoggedIn(false);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
      </Route>
    )
  );

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {isLoggedIn ? (
        <RouterProvider router={router} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center items-center flex-col h-[90vh]'>
            <div className='flex justify-center items-center flex-col gap-6 w-[325px] h-[60%] border-solid border-[2px] border-gray-500 rounded-md'>
              <h1 className='text-3xl mb-8 font-bold'>{isRegister ? "Register" : "Login"}</h1>

              <input 
                name='email' 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} 
                className='rounded-md w-[85%] px-5 py-1 border-[2px] border-gray-300 text-[17px]' 
                type="text" 
                placeholder='Email' 
              />
              <input 
                name='pass' 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} 
                className='rounded-md w-[85%] px-5 py-1 border-[2px] border-gray-300 text-[17px]' 
                type="password" 
                placeholder='Password' 
              />
              <button 
                type='submit' 
                className='border-gray-300 rounded-md font-semibold py-1 px-4 border-[2px] hover:bg-gray-300 hover:border-gray-400 hover:text-gray-700 transition duration-300 ease-in-out'
              >
                {isRegister ? "Register" : "Login"}
              </button>
              <p 
                onClick={() => setIsRegister(!isRegister)} 
                className='text-[15px] cursor-pointer text-blue-700 hover:text-blue-950'
              >
                {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default App