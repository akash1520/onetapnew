import Filter from "../Filter";
import Col1 from "./components/Col1";
import GameCard from "./components/GameCard";


type ChallengesProps = {
  className: string;
};
export default function Challenges({ className }: ChallengesProps) {
  return (
    <div className={`${className} mt-5 grid grid-cols-3`}>
      <div className="col-start-1 col-end-3">
      <div className="flex gap-10">
        <h1 className="text-2xl font-Impact">Ongoing Challenges</h1>
        <h1 className="text-2xl font-Impact">Completed Challenges</h1>
      </div>
      </div>
      <Col1/>
        <Filter>
          <GameCard img_src="pubg" className="w-36"/>
          <GameCard img_src="dota2" className="w-36"/>
          <GameCard img_src="apex_legends" className="w-36"/>
          <GameCard img_src="cod_warzone" className="w-36"/>
          <GameCard img_src="cs_go" className="w-36"/>
          <GameCard img_src="fortnite" className="w-36"/>
          <GameCard img_src="hearthstone" className="w-36"/>
   </Filter>
    </div>
  );
}
