import "./savedRoutines.css"; // Importing the styles specific to this page
import Header from './Components/header'; // Importing the Header component
import Routine from './Components/routine'; // Importing the Routine component
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import noneSavedIcon from './Images/no-saved-icon.svg';

/**
 * Saved Routines Component
 * Displays a list of the user's saved skincare routines. 
 * Only authenticated users can access their routines, 
 */

export default function SavedRoutines() {
  // State hooks to manage routines data, loading state, and error messages
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  // useEffect hook runs on component mount to check if the user is authenticated
  useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
          navigate('/login'); // Redirect to login if no token is found
      } else {
          fetchRoutines(); // Fetch the routines if the user is authenticated
      }
  }, [navigate]);

  /**
   * Fetches saved routines from the backend.
   * Requires a valid authentication token.
   */
  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication required. Please log in.");
            setLoading(false);
            return;
      }

       // Send POST request to fetch routines
      const res = await axios.post(
        "http://127.0.0.1:8000/GetRoutine/",
        {},
        {
            headers: {
                Authorization: `Token ${token}`, // Attach auth token in header
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
  
  // If there was an error during data fetching, display an error message
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
              // Map over routines and display each one using the Routine component
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
                // If no routines, display a placeholder image
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
