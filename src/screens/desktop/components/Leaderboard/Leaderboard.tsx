import { useEffect, useState } from "react";
import Progressbar from "../Challenges/components/ChallengeLeft/Progressbar";
import GameCard from "../Challenges/components/GameCard";
import { useFilterContext } from "../Contexts/FilterContext";
import Filter from "../Filter";
import LeaderboardBanner from "./LeaderboardBanner";

interface GameData {
  rank: number;
  id: number;
  gameBalance: number;
  gameLevel: number;
  User: {
    userName: string;
  };
  Game: {
    gameName: string;
  };
}

const ScoreBox = ({
  score,
  scoreText,
}: {
  score: number;
  scoreText: string;
}) => {
  return (
    <div className="flex w-28 flex-col items-center justify-center">
      <h2 className="font-Impact">{score}</h2>
      <h2 className="font-Poppins font-[700]">{scoreText}</h2>
    </div>
  );
};

const YourScoreBox = () => {
  return (
    <div className="border-onetapViolet bg-[#222222] border-[1px] relative flex flex-col pt-16 items-center grow mr-4">
      <div className="flex w-full justify-around flex-row">
        <ScoreBox score={30} scoreText="Your Rank" />
        <ScoreBox score={1800} scoreText="Coins" />
        <ScoreBox score={30} scoreText="Level" />
      </div>
      <div>
        <div className="flex items-center gap-2 w-80">
          <Progressbar completed={1800} total={2000} />
          <div className="flex items-center gap-2">
            <img className="w-3 h-3" src="/icons/coin.svg" alt="" />
            <p className="text-sm mr-2">1800/2000</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-3 font-Inter justify-center">
        <h1>You're at rank 30!</h1>
        <p className="text-sm text-[#9D9D9D]">
          Just 200 points away from being a Challenge Conqueror.
        </p>
      </div>
      <div className="absolute bg-gradient-to-r py-2 px-3 font-Poppins from-[#7A43F0] to-[#C38CFF] top-0 right-0">
        YOUR SCORE
      </div>
    </div>
  );
};

const Record = ({
  rank,
  level,
  isFirst,
  name,
  coins,
}: {
  rank: number;
  level: number;
  isFirst?: boolean;
  name: string;
  coins: number;
}) => {
  return (
    <div className="w-full p-4 bg-gradient-to-t from-[#7A43F0] to-[#C38CFF] flex items-center justify-between font-Impact">
      <h2>{rank}</h2>
      <div className="flex items-center">
        <img
          className={`w-8 ${isFirst ? "" : "invisible"} h-8`}
          src="/images/leaderboard_trophy.png"
          alt=""
        />
        <h2>{name}</h2>
      </div>
      <div className="flex items-center gap-2">
        <img src="/icons/coin.svg" alt="" />
        <h2>{coins}</h2>
      </div>
      <h2>Level {level}</h2>
    </div>
  );
};

export default function Leaderboard({ className }: { className: string }) {
  const { gameId } = useFilterContext();
  const [gameData, setGameData] = useState<GameData[]|null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameData = await fetch(
          `http://localhost:3002/leaderboard/game-specific/${gameId}`
        );

        if (!gameData.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await gameData.json();
        setGameData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [gameId]);

  return (
    <>
      <div className={`${className}`}>
        <div className={`mt-10 flex gap-10`}>
          <LeaderboardBanner />
          <YourScoreBox />
        </div>
        <div className="mt-8 flex gap-10 flex-row">
          <div className="rounded-lg w-full">
            <h1 className="text-2xl font-Impact">Ranking</h1>
            <div className="flex mt-4 py-8 px-4 flex-col bg-gradient-to-t from-[#342249] via-[#331E4B]  to-[#683C98] gap-4  border-onetapViolet">
              <Record isFirst level={6} rank={1} name="akash" coins={40} />
              {
                gameData && gameData.map(
                  (game:GameData) => (
                    <Record
                      key={game.id}
                      level={game.gameLevel}
                      rank={game.rank}
                      name={game.User.userName}
                      coins={game.gameBalance}
                    />
                  )
                )
              }
            </div>
          </div>
          <Filter className="w-[48dvw]">
            <GameCard id="1" className="w-40" />
            <GameCard id="2" className="w-40" />
            <GameCard id="3" className="w-40" />
            <GameCard id="4" className="w-40" />
            <GameCard id="5" className="w-40" />
            <GameCard id="6" className="w-40" />
          </Filter>
        </div>
      </div>
    </>
  );
}
