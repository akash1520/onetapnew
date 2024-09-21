export const HEARTHSTONE_CLASS_ID = 9898;
export const VALORANT_CLASS_ID = 21640;
export const DOTA2_CLASS_ID = 7314;

interface SupportedClassIDs {
  [key: number]: boolean;
}

export const SUPPORTED_CLASS_IDS: SupportedClassIDs = {
  [HEARTHSTONE_CLASS_ID]: true,
  [VALORANT_CLASS_ID]: true,
  [DOTA2_CLASS_ID]: true,
};

export function getRunningGame(): Promise<overwolf.games.GetRunningGameInfoResult | null> {
  return new Promise((resolve) => {
    overwolf.games.getRunningGameInfo((result) => {
      if (result && SUPPORTED_CLASS_IDS[result.classId]) {
        resolve(result);
        console.log("recognised game was running", result);
      } else {
        console.log("unrecognised game was running", result);
      }
    });
  });
}

export function getGameInfo(): Promise<any> {
  return new Promise((resolve, reject) => {
    overwolf.games.events.getInfo((info) => {
      if (info.success) {
        console.log("recognised game event", info);
        resolve(info.res);
      } else {
        console.error("Failed to get game info:", info);
        reject(info);
      }
    });
  });
}
