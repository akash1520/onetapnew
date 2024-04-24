export const HEARTHSTONE_CLASS_ID = 9898;
export const VALORANT_CLASS_ID = 12345;

interface SupportedClassIDs {
  [key: number]: boolean;
}


export const SUPPORTED_CLASS_IDS : SupportedClassIDs = {
  [HEARTHSTONE_CLASS_ID]: true,
  [VALORANT_CLASS_ID]: true,
};

export function getRunningGame(): Promise<overwolf.games.GetRunningGameInfoResult | null> {
  return new Promise((resolve) => {
    overwolf.games.getRunningGameInfo((result) => {
      if (result && SUPPORTED_CLASS_IDS[result.classId]) {
        resolve(result);
      } else {
        resolve(null);
      }
    });
  });
}


export function getGameInfo(): Promise<any> {
  return new Promise((resolve, reject) => {
    overwolf.games.events.getInfo((info) => {
      if (info.success) {
        resolve(info.res);
      } else {
        reject(info);
      }
    });
  });
}
