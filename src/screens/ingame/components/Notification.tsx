import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRecentlyCompletedChallenges } from 'screens/background/stores/background';


function Notifications({ completedChallenges }: { completedChallenges: any }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This runs 5 seconds after Notifications component renders");
      dispatch(setRecentlyCompletedChallenges([]));
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      {completedChallenges.length > 0 && completedChallenges.map((completedChallenge: any) => {
        console.log("we reached this far");

        return <Notification key={completedChallenge.id} completedChallenge={completedChallenge} />
      })}
    </>
  )
}

export default Notifications;


function Notification({ progress = 100, completedChallenge }:{progress?:number, completedChallenge:any}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(!show);
    }, 1000); // Toggle notification visibility after 1 second

    return () => clearTimeout(timer);
  }, [show]);

  // Calculate the stroke dash offset for circular progress
  const radius = 45;
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
          <p>{completedChallenge.game_challenges.name}</p>
        </div>
      </div>
    </div>
  );
}

export {Notification, Notifications};
