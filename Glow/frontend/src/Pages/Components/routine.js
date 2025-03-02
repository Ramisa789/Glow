import React from 'react';
import './routine.css';
import profile_picture from "../Images/profile-circle.svg";
function Routine({ date, dayProducts =[], nightProducts=[] }){
    return (
        <div className="routine-wrapper">
          <h3 className="routine-date"><em>{date}</em></h3>
          <div className="routine-container">
            

            <div className="routine-section day-routine">
              <div className="routine-header">DAY ROUTINE</div>
              <ul className="routine-list">
                {dayProducts.map((product, index) => (
                  <li key={index}><strong>{product.name}</strong> - ${product.price}</li>
                ))}
              </ul>
            </div>
    
            <div className="routine-section night-routine">
              <div className="routine-header">NIGHT ROUTINE</div>
              <ul className="routine-list">
                {nightProducts.map((product, index) => (
                  <li key={index}><strong>{product.name}</strong> - ${product.price}</li>
                ))}
              </ul>
            </div>
    
          </div>
        </div>
      );
    };

export default Routine;
