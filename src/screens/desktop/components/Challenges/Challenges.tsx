import Filter from "../Filter";
import Col1 from "./components/Col1";
import GameCard from "./components/GameCard";


type ChallengesProps = {
  className: string;
};
export default function Challenges({ className }: ChallengesProps) {
  return (
    <div className={`${className} mt-5 grid grid-cols-3`}>
      <Col1/>
        <Filter>
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
   </Filter>
    </div>
  );
}
