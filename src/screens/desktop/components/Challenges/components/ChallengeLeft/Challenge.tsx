import React from "react";
import Progressbar from "./Progressbar";

function toCamelCase(str:string) {
  return str.split('_').reduce((result, word, index) => {
    // If it's the first word, keep it as is. If it's not, capitalize the first letter.
    return result + (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1));
  }, '');
}

// Adjust the type definition to expect task as an object
export default function Challenge({
  task,
  completed,
  total,
  name
}: {
  task: Record<string, any>;
  completed: number;
  total: number;
  name:string;
}) {
  return (
    <li>
      <div className="flex gap-1 items-center">
        <img src="/icons/sword.svg" alt="" />
        {/* Map over task object entries and render non-null values */}
        {/* {Object.entries(task).map(([key, value]) => {
          if (value === null || (value !== "" && value !== 0) ) {
            return ( */}
              <p
                className="bg-[#4917B2] bg-clip-text text-white"
              >{`${name}`}</p>
            {/* ); */}
          {/* } else {
            return null;
          }
        })} */}
      </div>
      <div className="flex items-center gap-2">
        <Progressbar color="#4917B2" completed={completed} total={total} />
        <p>{completed === total ? "Completed" : `${completed}/${total}`}</p>
      </div>
    </li>
  );
}
