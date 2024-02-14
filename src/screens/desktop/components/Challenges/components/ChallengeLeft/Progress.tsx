import Progressbar from "./Progressbar";

export default function Progress({completed, total}:{
  completed: number;
  total: number;
}){
  return (
    <div className="w-60 p-2 font-Inter">
      <h1>Dive into Challenges</h1>
      <Progressbar color="#83DD61" completed={completed} total={total}/>
      <div className="text-xs font-[800] text-transparent bg-clip-text bg-[#83DD61]">
        {`${completed}/${total} Challenges`}
      </div>
      <div>
        <h2>You will earn</h2>
        <div className="flex items-center gap-1">
          <img className="h-5" src="/icons/coin.svg" alt="coin" />
          <p>300</p>
        </div>
      </div>
    </div>
  );
}
