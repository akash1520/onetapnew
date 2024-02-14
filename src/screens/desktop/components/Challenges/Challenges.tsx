import Col1 from "./components/Col1";
import GameCard from "./components/GameCard";


type ChallengesProps = {
  className: string;
};
export default function Challenges({ className }: ChallengesProps) {
  return (
    <div className={`${className} mt-5 grid grid-cols-3`}>
      <Col1/>
      <div className="col-start-3 h-[100dvh] w-full">
        <h1 className="font-Impact text-2xl">Filter</h1>
        <div className="bg-[#1C1C1C] rounded p-2 mt-2 mr-5">
            <div className="flex flex-row gap-3 flex-wrap h-[100dvh] overflow-scroll">
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
              <GameCard className="w-36"/>
            </div>
        </div>
      </div>
    </div>
  );
}
