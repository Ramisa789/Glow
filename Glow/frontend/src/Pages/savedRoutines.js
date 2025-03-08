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
  
          let parsedResponse = JSON.parse(rawResponse);
          console.log(parsedResponse);
          
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
                {response.length > 0 ? (
                    response.map((routine, index) => (
                    <Routine 
                        key={index} 
                        response={routine} 
                        page="profile" 
                        date={routine.date}  // Pass the date for each routine
                    />
                    ))
                ) : (
                    <></>
                )}
                </div>
            </div>
       </div>
    );
}