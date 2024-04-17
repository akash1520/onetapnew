import React, { useState, useEffect } from 'react';

function Notification({ progress = 63 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(!show);
    }, 1000); // Toggle notification visibility after 1 second

    return () => clearTimeout(timer);
  }, [show]);

  // Calculate the stroke dash offset for circular progress
  const radius = 30;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`${show ? 'flex' : 'hidden'} fixed right-5 bottom-5 bg-white shadow-md rounded-lg overflow-hidden`}>
      <div className="flex items-center p-5">
        <svg className="transform -rotate-90" width="50" height="50" viewBox="0 0 120 120">
          <circle
            className="transition-all"
            stroke="green"
            strokeWidth="4"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <text
            x="50%" 
            y="50%" 
            dy=".3em" 
            textAnchor="middle" 
            fill="green" 
            fontSize="30"
            transform="rotate(90 60 60)"
          >
            {`${progress}%`}
          </text>
        </svg>
        <div className="pl-5">
          <h4 className="m-0">Challenge Complete!</h4>
          <p>Your progress has been updated.</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
