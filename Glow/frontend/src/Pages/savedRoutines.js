import "./savedRoutines.css";
import Header from './Components/header';
import Routine from './Components/routine';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import noneSavedIcon from './Images/no-saved-icon.svg';

export default function SavedRoutines() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const isAuthenticated = localStorage.getItem('authToken');

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login');
    } else {
      fetchRoutines();
    }
  }, [isAuthenticated, navigate])

  const fetchRoutines = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/GetRoutine/");
      setRoutines(res.data.response); // Directly use the response as an array
    } catch (error) {
      console.error("Error fetching routines:", error);
      setError(error);
    }
    setLoading(false);
  };
  
  if (error) return <div>Failed to load routines.</div>;

  return (
    <div>
      <Header />
      <div className="routine-width">
        <h2 className="saved-routines-header">My Saved Routines</h2>
        <a className="button-link" href="SkinCareGenerator">
          <button className="back-button">
            ← Back to generator
          </button>
        </a>
  
        {/* Loading message appears here below the header */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading routines...</p>
          </div>
        ) : (
          <div>
            {routines.length > 0 ? (
              routines.map((routine, index) => (
                <Routine
                  key={index}
                  created_at={routine.created_at}
                  day={routine.day}
                  night={routine.night}
                  page="profile"
                />
              ))
            ) : (
                <div className="no-routines-container">
                    <img className="icon-container" src={noneSavedIcon} height={30} width={30} alt="no routines saved icon" />
                    No saved routines.
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
