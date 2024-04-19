import { RootReducer } from "app/shared/rootReducer";
import { Feed } from "components/Feed";
import { Title } from "components/Title/Title";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Screen.css";
import {Notifications} from "./Notification";
import { useEffect, useState } from "react";

const Screen = () => {
  const [completedChallenges, setCompletedChallenges] = useState<any>();
  const dispatch = useDispatch();
  const { events, infos, recentlyCompletedChallenges } = useSelector(
    (state: RootReducer) => state.background
  );


  useEffect(() => {
    setCompletedChallenges(recentlyCompletedChallenges);
  }, [recentlyCompletedChallenges, dispatch]);

  return (
    <div className="ingame">
      {recentlyCompletedChallenges.length && <Notifications completedChallenges={completedChallenges} />}
      <Title color="white">InGame Screen</Title>
      <Feed
        title="Events"
        data={
          events.length
            ? JSON.stringify(events[events.length - 1])
            : "No events yet"
        }
      />
      <Feed
        title="Infos"
        data={
          infos.length
            ? JSON.stringify(infos[infos.length - 1])
            : "No infos yet"
        }
      />
    </div>
  );
};

export default Screen;
