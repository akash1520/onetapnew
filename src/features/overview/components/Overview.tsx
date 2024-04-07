import { Stats } from "./Stats";
import { useData } from "../hooks/useData";
import "./styles/Overview.css";
import { useSelector } from "react-redux";
import {RootReducer} from "app/shared/rootReducer";
import { useEffect } from "react";

export const Overview = ({className}:{className:string}) => {
  const { events, infos } = useData();
  const gameData = useSelector((state:RootReducer)=>state.background.gameData)
  const flag = useSelector((state:RootReducer)=>state.background.flag)

  useEffect(() => {


    if (flag) {
      console.log(`${flag} hey flag is working`)
      // Using the fetch API to send the data
        fetch("http://localhost:3000/challenges/update-completed-challenges", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 3, gameId: 2, gameData:gameData }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })// Convert the response to JSON
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("There was an error posting the data:", error);
      });
    }
  }, [gameData, flag]);

  return (
    <div className={`overview ${className}`}>
      <Stats label={events.label} value={events.quantity} />
      <Stats label={infos.label} value={infos.quantity} />
    </div>
  );
};
