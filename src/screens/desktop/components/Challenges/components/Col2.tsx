import { useEffect, useState } from "react";
import LevelCard from "./ChallengeLeft/LevelCard";
import { useFilterContext } from "../../Contexts/FilterContext";

export default function Col2() {
const [challenges, setChallenges] = useState()
const {gameId} = useFilterContext()

console.log(challenges);


useEffect(() => {
  const fetchData = async (gameId:string) => {
    try {
  
      const gameData = await fetch(
        `http://localhost:3000/challenges/ongoing-challenges/${gameId}`
      );
  
      if (!gameData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await gameData.json();
      setChallenges(jsonData);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData(gameId);
}, [gameId]);

  return (
    <div className="flex flex-row justify-between px-5 flex-wrap w-full ">
        <LevelCard/>
        <LevelCard/>
        <LevelCard/>
        <LevelCard/>
        <LevelCard/>
        <LevelCard/>
    </div>
  )
}
