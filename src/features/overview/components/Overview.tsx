import { Stats } from "./Stats";
import { useData } from "../hooks/useData";
import "./styles/Overview.css";
import { useSelector } from "react-redux";
import {RootReducer} from "app/shared/rootReducer";
import { useEffect } from "react";

export const Overview = ({className}:{className:string}) => {
  const { events, infos } = useData();
  const eventData = useSelector((state:RootReducer)=>state.background.events)
  const infoData = useSelector((state:RootReducer)=>state.background.infos)
  const flag = useSelector((state:RootReducer)=>state.background.flag)

  useEffect(() => {

    if (flag) {
      // Using the fetch API to send the data
      fetch("http://localhost:30000/challenges/update-completed-challenges", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 2, gameId: 2, eventData, infoData }),
      })
      .then(response => response.json()) // Convert the response to JSON
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("There was an error posting the data:", error);
      });
    }
  }, [eventData, infoData, flag]);

  return (
    <div className={`overview ${className}`}>
      <Stats label={events.label} value={events.quantity} />
      <Stats label={infos.label} value={infos.quantity} />
    </div>
  );
};
