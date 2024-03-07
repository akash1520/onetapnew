import { Stats } from "./Stats";
import { useData } from "../hooks/useData";
import "./styles/Overview.css";

export const Overview = ({className}:{className:string}) => {
  const { events, infos } = useData();

  return (
    <div className={`overview ${className}`}>
      <Stats label={events.label} value={events.quantity} />
      <Stats label={infos.label} value={infos.quantity} />
    </div>
  );
};
