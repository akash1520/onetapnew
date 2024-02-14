import Challenge from "./Challenge";
import LevelCard from "./LevelCard";
import Progress from "./Progress";

export const ChallengesLeft = () => {
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
            <Challenge/>
            <Challenge/>
            <Challenge/>
            <Challenge/>
          </ul>
        </div>
      </div>
    </div>
  );
};
