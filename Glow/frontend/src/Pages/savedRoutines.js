import "./savedRoutines.css";
import Header from './Components/header';
import Routine from './Components/routine';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import noneSavedIcon from './Images/no-saved-icon.svg';

const apiUrl = process.env.REACT_APP_API_URL;

export default function SavedRoutines() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
          navigate('/login');
      } else {
          fetchRoutines();
      }
  }, [navigate]);

  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication required. Please log in.");
            setLoading(false);
            return;
      }

      const res = await axios.post(
        `${apiUrl}/GetRoutine/`,
        {},
        {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        }
      );

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
