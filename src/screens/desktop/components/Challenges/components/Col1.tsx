import Col2 from "./Col2";
import { ChallengesLeft } from "./ChallengeLeft/ChallengesLeft";
import Banner from "components/Banner/Banner";
import Progressbar from "./ChallengeLeft/Progressbar";
import Button from "components/Button/Button";
import Card from "components/CardsCarousel/Card";
import LevelCard from "./ChallengeLeft/LevelCard";

export default function Col1() {
  return (
    <div className="col-start-1 col-end-3">
      <div className="flex gap-5">
        <ChallengesLeft />
        <Col2 />
      </div>
      <h1 className="text-2xl my-10 font-Impact">Daily Challenges</h1>
      <Banner className="mr-5" imgSrc="pubg">
        <div className="flex flex-col p-5 justify-center">
          <h1 className="text-2xl font-Impact">COD Warzone Challenge</h1>
          <p className="font-Inter">Spend 50 mins in the game</p>
          <div className="flex flex-col justify-center gap-1">
            <div className="flex items-center gap-1">
            <Progressbar
            color="#692CCD"
              className="w-56"
              completed={10}
              total={50}
            />
            <p className="text-[#692CCD] text-xs">
                {10}/{50} Mins
              </p>
            </div>
           
            <Button className="flex gap-1 w-72 items-center justify-center">
              {"Collect"}
              <img className="w-4 h-4" src="/icons/coin.svg" alt=""/>
              {"300"}
            </Button>
          </div>
        </div>
      </Banner>

      <div>
        <h1 className="text-2xl font-Impact">Daily Rewards</h1>  
        <div className="flex gap-2 flex-row overflow-x-scroll">
          <LevelCard className="w-32"/>
          <LevelCard className="w-32"/>
          <LevelCard className="w-32"/>
          <LevelCard className="w-32"/>
          <LevelCard className="w-32"/>
        </div>      
      </div>
    </div>
  );
}
