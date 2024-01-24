import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const authString = localStorage.getItem('user');
  const auth = authString ? parseJSON(authString) : null;
  const [forceUpdate, setForceUpdate] = useState(false); // State to trigger re-render
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  useEffect(() => {
    // Subscribe to the 'storage' event to listen for changes in localStorage
    const handleStorageChange = () => {
      setForceUpdate((prev) => !prev); // Toggle the forceUpdate state to trigger re-render
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run this effect once during component mount

  return (
  
     <>
      <div>
        <img
          className="logo"
          src="https://static.vecteezy.com/system/resources/previews/023/654/784/non_2x/golden-logo-template-free-png.png"
        />
        {auth ? (
          <ul className="nav-ul">
            <li><Link to="/">Projects</Link></li>
            <li><Link to="/add">Add Projects</Link></li>
            <li><Link to="/profile">submit your Project</Link></li>
            <li><Link onClick={logout} to="/signup">Logout ({auth.name || 'User'})</Link></li>
          </ul>
        ) : (
          <ul className="nav-ul nav-right">
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        )}
      </div>
    
    </>
  );
};

// Helper function to safely parse JSON
const parseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    return {}; // Return an empty object in case of parsing failure
  }
};

export default Nav;
