import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Video from "../../assets/LandingVideo.mp4";

function Landing() {
    const text1 =
    "Detect Water Pipe Issues Instantly with Smart Sensor Technology";
  const text2 =
    "Ensure Efficient Water Management and Prevent Leaks Before They Happen.";  
  const [displayText, setDisplayText] = useState("");
  const [currentText, setCurrentText] = useState(text1);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < currentText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    } else if (currentText === text1) {
      setTimeout(() => {
        setDisplayText("");
        setCurrentText(text2);
        setCharIndex(0);
      }, 2000);
    }
  }, [charIndex, currentText]);

  return (
    <div className="relative h-screen w-full">
      <video
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        muted
        loop
        src={Video}
      ></video>
      <div className="relative flex items-center justify-start h-full w-full px-8 md:px-16 bg-opacity-50">
        <div className="max-w-md text-gray-200 space-y-4">
          <h1 style={{fontSize:"67px"}} className="mains flex text-white font-bold">
            <div>J</div>
            <div>A</div>
            <div className="mr-3">L</div>
            <div>R</div>
            <div>A</div>
            <div>K</div>
            <div>S</div>
            <div>H</div>
            <div>A</div>
            <div>K</div>
          </h1>

          <p className="text-lg md:text-xl text-gray-300">{displayText}</p>
          <Link to="/login">
            <button className="relative mt-5 bg-cyan-600 text-white font-semibold px-8 py-2 rounded-full overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
              <span className="absolute inset-0 bg-cyan-500 opacity-0 rounded-full transition-opacity duration-300 group-hover:opacity-20"></span>
              <span className="relative z-10">Get Started</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
