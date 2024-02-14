export default function LevelCard({className}:{className?:string}) {
  return (
    <div className={`bg-black ${className} my-2 flex flex-col`}>
      <img
        alt=""
        className="h-[66px] p-[0.1rem] text-white"
        src={`/images/level.png`}
      />
      <div className="h-[81px] flex items-center justify-center">
        <div className="flex flex-col items-center">
        <h1 className="font-Impact font-[400]">Level 1</h1>
              <p className="font-Inter text-xs text-[#9D9D9D] font-[400]">2 Challenges</p>
        </div>
      </div>
    </div>
  );
}

