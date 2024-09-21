import { useEffect, useState } from "react";
import LevelCard from "./ChallengeLeft/LevelCard";
import { useFilterContext } from "../../Contexts/FilterContext";
import { overwolfHttpRequest } from "utils/overwolfHttpRequest";

export default function Col2() {
const [challenges, setChallenges] = useState()
const {gameId} = useFilterContext()

console.log(challenges);


useEffect(() => {
  const fetchData = async (gameId: string) => {
    try {
      const jsonData = await overwolfHttpRequest(
        `http://localhost:3000/challenges/ongoing-challenges/${gameId}`,
        "GET"
      );
  
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
