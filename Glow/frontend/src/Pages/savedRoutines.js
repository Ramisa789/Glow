import "./savedRoutines.css";
import Header from './Components/header';
import Routine from './Components/routine';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import arrow from "./Images/arrow-left.svg";

export default function SavedRoutines() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchRoutines = async () => {
      try {
          const res = await axios.post("http://127.0.0.1:8000/GetRoutine/");

          let rawResponse = res.data.response;
          
          let jsonString = rawResponse.replace(/```json|```/g, "").trim();
   
          // Parse JSON
          let parsedResponse = JSON.parse(jsonString);
          setResponse(parsedResponse);
      } catch (error) {
          console.error("Error fetching routine:", error);
          setError(error)
      }
      setLoading(false);
  }; 

  useEffect(() => {
      fetchRoutines();
  }, []);

  if (error) return <div>Failed to load routines.</div>;
  if (loading) return <div>Loading routines...</div>;

    return(
        <div>
            <Header />
            <div>
                <h2 className="saved-routines-header"> My Saved Routines </h2>
                <a className="button-link" href="SkinCareGenerator">
                        <button class="back-button"> 
                            <img className="back-arrow" src={arrow} height={20} width={20} alt="back arrow" />
                            Back to generator
                        </button>
                </a>
                <div className="routine-width">
                    <Routine response={response} page="profile" date="Feb 14, 2025" />
                </div>
            </div>
       </div>
    );
}