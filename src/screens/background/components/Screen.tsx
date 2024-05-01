import {
  WINDOW_NAMES,
  RETRY_TIMES,
  DISPLAY_OVERWOLF_HOOKS_LOGS,
  REQUIRED_FEATURES,
} from "app/shared/constants";
import { useGameEventProvider, useWindow } from "overwolf-hooks";
import { useCallback, useEffect } from "react";
import { SUPPORTED_CLASS_IDS, getRunningGame } from "lib/games";
import { setInfo, setEvent, setGameId } from "../stores/background";
import store from "app/shared/store";
import { log } from "lib/log";
import { checkSession, parseToken } from "lib/auth.utils";
import { useSelector } from "react-redux";

const { DESKTOP, INGAME, LOGIN } = WINDOW_NAMES;

const BackgroundWindow = () => {
  const [desktop] = useWindow(DESKTOP, DISPLAY_OVERWOLF_HOOKS_LOGS);
  const [ingame] = useWindow(INGAME, DISPLAY_OVERWOLF_HOOKS_LOGS);
  const [login] = useWindow(LOGIN, DISPLAY_OVERWOLF_HOOKS_LOGS);
  const {gameId} = useSelector((state:any)=>state.background)
  const required_features = REQUIRED_FEATURES[gameId];
  log("required features","background screen",JSON.stringify(required_features));
  const { start, stop } = useGameEventProvider(
    {
      onInfoUpdates: (info) =>
        store.dispatch(
          setInfo({
            ...info,
            timestamp: Date.now(),
          })
        ),
      onNewEvents: (events) =>
        store.dispatch(
          setEvent({
            ...events,
            timestamp: Date.now(),
          })
        ),
    },
    required_features,
    RETRY_TIMES,
    DISPLAY_OVERWOLF_HOOKS_LOGS
  );
  const startApp = useCallback(
    async (reason: string) => {
      //if the desktop or ingame window is not ready we don't want to start the app
      if (!desktop || !ingame || !login) return;
      log(reason, "src/screens/background/components/Screen.tsx", "startApp");
      if (await checkSession()) {
        const runningGame = await getRunningGame();
        runningGame && setGameId(runningGame?.classId);
        if (runningGame) {
          await Promise.all([start(), ingame?.restore(), desktop?.minimize()]);
        } else {
          await Promise.all([stop(), desktop?.restore()]);
        }
      } else {
        login.restore()
        desktop.close()
      }
    },
    [desktop, login, ingame, start, stop]
  );

  useEffect(() => {
    startApp("on initial load");
    overwolf.games.onGameInfoUpdated.addListener(async (event) => {
      if (event.runningChanged && event.gameInfo) {
        const isSupportedGame = SUPPORTED_CLASS_IDS[event.gameInfo.classId];
        if (isSupportedGame) {
          startApp("onGameInfoUpdated");
        }
      }
    });

    overwolf.extensions.onAppLaunchTriggered.addListener((e) => {
      startApp("onAppLaunchTriggered");
      parseToken(e);
    });
    return () => {
      overwolf.games.onGameInfoUpdated.removeListener(() => {});
      overwolf.extensions.onAppLaunchTriggered.removeListener(() => {});
    };
  }, [startApp]);

  return null;
};

export default BackgroundWindow;
