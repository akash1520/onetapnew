import React from "react";
import Progressbar from "./Progressbar";

export default function Challenge() {
    var completed=30
    var total=100
  return (
    <li>
      <div className="flex gap-1">
        <img src="/icons/sword.svg" alt="" />
        <p className="bg-[#4917B2] bg-clip-text">Kill all the enemies</p>
      </div>
      <div className="flex items-center gap-2">
        <Progressbar color="#4917B2" completed={completed} total={total} />
        <p>{completed===total?"Completed":`${completed}/${total}`}</p>
      </div>
    </li>
  );
}
