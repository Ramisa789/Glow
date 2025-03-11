import "./savedRoutines.css";
import Header from './Components/header';
import Routine from './Components/routine';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SavedRoutines() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchRoutines();
  }, []);

  if (error) return <div>Failed to load routines.</div>;
  if (loading) return <div>Loading routines...</div>;

  return (
    <div>
      <Header />
      <div className="routine-width">
        <h2 className="saved-routines-header"> My Saved Routines </h2>
        <a className="button-link" href="SkinCareGenerator">
          <button className="back-button">
            <p className="back-arrow">←</p> Back to generator
          </button>
        </a>

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
            <p>No saved routines found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
