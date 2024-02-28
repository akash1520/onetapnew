import React from "react";
import Progressbar from "./Progressbar";

export default function Challenge({task, completed, total}:{task:string, completed:number, total:number}) {
  return (
    <li>
      <div className="flex gap-1">
        <img src="/icons/sword.svg" alt="" />
        <p className="bg-[#4917B2] bg-clip-text">{task}</p>
      </div>
      <div className="flex items-center gap-2">
        <Progressbar color="#4917B2" completed={completed} total={total} />
        <p>{completed===total?"Completed":`${completed}/${total}`}</p>
      </div>
    </li>
  );
}
