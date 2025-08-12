import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

function Nav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className='nav-container'>
      <h3 style={{ fontSize: "2rem", fontWeight: "bold", margin: "0 0 10px" }}>
        <span style={{ color: "#39c0e0", margin: "10px" }}>शास्त्र<span className='sp'>Ai</span></span>
      </h3>
      <div>
        <Link className='home' to="/projectdetails" style={{ textDecoration: "none", color: "#39c0e0", fontSize: "1.2rem" }}>
          Home
        </Link>
        {user && ( // ✅ Show logout only if logged in
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>

      <style>{`
        .home {
          margin: 10px;
        }
        .sp {
          color: #9dddebff;
          font-weight: bold;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #0b0f2f;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default Nav;
