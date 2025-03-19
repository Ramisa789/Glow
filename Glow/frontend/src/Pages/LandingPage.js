import "./LandingPage.css"; // Importing the styles specific to this page
import React from 'react';
import Header from './Components/header'; // Importing the Header component
import LandingPagePic from "./Images/LandingPagePhoto.png"; // Importing an image used on the page

/**
 * LandingPage Component
 * This component represents the landing page of the application.
 * It consists of a header, an image section, and a descriptive text section
 * to introduce users to the application.
 */

export default function LandingPage() {
    return(
       <div>
        <Header />
        <div class="container">
            <div class=" box image-box">
                <img src={LandingPagePic} alt="Rippling water"/>
            </div>
            <div class="box text-box">
                <h2 className="about-us">About Us</h2>
                <p className="about-us-text">Finding the perfect skincare routine can feel overwhelming, but we make it simple.
                     GLOW tailors recommendations to your skin type, concerns, budget, and ingredient 
                     preferences—giving you a routine that truly works for you. Whether you're dealing 
                     with acne, dryness, sensitivity, or just looking to enhance your glow, we curate 
                     products and step-by-step instructions designed specifically for your needs. Say goodbye 
                     to trial and error—our personalized approach takes the guesswork out of skincare so 
                     you can feel confident in your skin every day.</p>
                    <a href="login">
                        <button class="cta-button">Get Started →</button>
                    </a>

            </div>
        </div>

       </div>
    );
}