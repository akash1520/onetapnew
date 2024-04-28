import { useEffect, useState } from "react";
import Challenge from "./Challenge";
import LevelCard from "./LevelCard";
import Progress from "./Progress";
import { useFilterContext } from "screens/desktop/components/Contexts/FilterContext";

interface ChallengeData {
  id: number;
  requirements: Record<string, string>;
  startTime: string;
  endTime: string;
  type: string;
  name: string;
  Game: {
    gameName: string;
  };
}


export const ChallengesLeft = () => {

  const {gameId} = useFilterContext()
  const [challenges, setChallenges] = useState<ChallengeData[]>([]);

  useEffect(() => {
    // Use a proper URL and handle potential errors
    fetch(`http://localhost:3000/challenges/ongoing-challenges/${gameId}/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        setChallenges(res);
      })
      .catch((error) => {
        console.error("Failed to fetch challenges:", error);
      });
  }, [gameId]);

  return (
    <div className="border-[1px] mt-2 border-[#BE9FFF33]">
      <div className="bg-[#1C1C1C] px-5 flex">
        <LevelCard/>
        <Progress completed={30} total={40} />
      </div>
      <div className="bg-[#242424] p-5">
        <h1 className="font-Impact py-2">Challenges</h1>
        <div className="flex flex-col">
          <ul className="flex flex-col gap-5">
          {challenges.map((challenge) => (
            <Challenge name={challenge.name} key={challenge.id} completed={10} total={100} task={challenge.requirements} />
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
