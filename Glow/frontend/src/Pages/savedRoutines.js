import "./savedRoutines.css";
import React from 'react';
import Header from './Components/header';
import Routine from './Components/routine';
import { Link } from 'react-router-dom';

export default function SavedRoutines() {
    return(
       <div>
       <Header />
       <h2> My Saved Routines </h2>
       <a href="SkinCareGenerator">
            <button class="back-button"> ← Back to generator</button>
        </a>
        <Routine
        date="February 16, 2025"
        dayProducts={[
          { name: "Cleanser", price: 18 },
          { name: "Toner", price: 22 },
          { name: "Moisturizer", price: 30 },
        ]}
        nightProducts={[
          { name: "Serum", price: 25 },
          { name: "Eye Cream", price: 20 },
          { name: "Night Cream", price: 35 },
        ]}
      /> 

       <Routine
        date="February 15, 2025"
        dayProducts={[
          { name: "Face Wash", price: 15 },
          { name: "Vitamin C Serum", price: 28 },
          { name: "SPF 50 Sunscreen", price: 18 },
        ]}
        nightProducts={[
          { name: "Retinol Cream", price: 40 },
          { name: "Hydrating Mask", price: 30 },
          { name: "Lip Balm", price: 8 },
        ]}
      />    


        
       </div>
    );
}