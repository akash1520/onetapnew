import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseSafeJSON } from "lib/utils";

function printKeyValuePairs(obj: any, prefix: string = ""): void {
  Object.entries(obj).forEach(([key, value]) => {
    // Construct a new prefix for nested objects
    const newPrefix = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === "object") {
      // If the value is a non-null object, recurse
      printKeyValuePairs(value, newPrefix);
    } else {
      // Print the key-value pair
      console.log(`${newPrefix}: ${value}`);
    }
  });
}

function parseEventData(eventDataString: string) {
  try {
    // Parse the JSON string to an object
    const dataObject = JSON.parse(eventDataString);
    return dataObject;
  } catch (error) {
    console.error("Error parsing event data string:", error);
    // Return null or an empty object depending on how you want to handle errors
    return null;
  }
}

interface Timestamp {
  timestamp: number;
}

interface gameData {
  match_start: number;
  match_end: number;
  result: string;
}

interface valorantGameData extends gameData {
  total_kills: number;
  deaths: number;
  assists: number;
  headshots: number;
  spikes_defused: number;
  spikes_planted: number;
  damage_done: number;
  team_scores: number;
  agent: string;
  region: string;
  game_mode: string;
  damage_taken: number;
}

interface UserInfo {
  id: number;
  userName: string;
  profilePicture: string | null;
  userCoustomeId: string;
  profileName: string;
  globalRanking: number;
  balance: number;
  Auth: string;
  level: number;
  premiumUser: boolean;
}

type OwInfo =
  | overwolf.games.events.InfoUpdates2Event
  | overwolf.games.InstalledGameInfo;
type OwEvent = overwolf.games.events.NewGameEvents;
type InfoPayload = PayloadAction<Timestamp & OwInfo>;
type EventPayload = PayloadAction<Timestamp & OwEvent>;

interface BackgroundState {
  events: Array<Timestamp & OwEvent>;
  infos: Array<Timestamp & OwInfo>;
  gameData: valorantGameData;
  flag: boolean;
  userInfo: UserInfo;
  userId: string;
}

const initialState: BackgroundState = {
  events: [],
  infos: [],
  gameData: {
    match_start: 0,
    match_end: 0,
    result: "",
    total_kills: 0,
    deaths: 0,
    assists: 0,
    headshots: 0,
    spikes_defused: 0,
    spikes_planted: 0,
    damage_done: 0,
    team_scores: 0,
    agent: "",
    region: "",
    game_mode: "",
    damage_taken: 0,
  },
  userId: "3",
  userInfo: {
    id: 0,
    userName: "",
    profilePicture: null,
    userCoustomeId: "",
    profileName: "",
    globalRanking: 0,
    balance: 0,
    Auth: "",
    level: 0,
    premiumUser: false,
  },
  flag: false,
};

export const setUserId = createAsyncThunk<
  string,
  string,
  { state: BackgroundState; rejectValue: string }
>("backgroundScreen/setUserId", async (authId, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${authId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const { userId } = await response.json();
    return userId;
  } catch (error) {
    return rejectWithValue("Failed to fetch user id");
  }
});

export const setUserInfo = createAsyncThunk<
  UserInfo,
  string,
  { state: BackgroundState; rejectValue: string }
>("backgroundScreen/setUserInfo", async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/user/basic-info/${userId}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    return rejectWithValue("Failed to fetch user info");
  }
});

const backgroundSlice = createSlice({
  name: "backgroundScreen",
  initialState,
  reducers: {
    setEvent(state, action: EventPayload) {
      action.payload.events.forEach((event) => {
        switch (event.name) {
          case "match_start":
              state.gameData.match_start = action.payload.timestamp;
              break;
      
          case "match_end":
              state.gameData.match_end = action.payload.timestamp;
              state.gameData.deaths = parseInt(event.data, 10);
              break;
      
          case "kill":
              state.gameData.total_kills = parseInt(event.data, 10);
              console.log(`kill number : ${state.gameData.total_kills}`);
              break;
      
          case "kill_feed":
              const data = JSON.parse(event.data);
              if (data.headshot) {
                  state.gameData.headshots = (state.gameData.headshots || 0) + 1;
              }
              if (data.assists) {
                  state.gameData.assists = (state.gameData.assists || 0) + 1;
              }
              console.log(`assists number : ${state.gameData.assists}`);
              console.log(`headshots number : ${state.gameData.headshots}`);
              break;
          }      
        console.log(
          `Event Name: ${event.name}, Data: ${JSON.stringify(event.data)}, Timestamp: ${action.payload.timestamp}`
        );
      });

      const matchEndEventFound = action.payload.events.find(
        (event) => event.name === "match_end"
      );
      if (matchEndEventFound) {
        console.log("Match end has been found.");
        console.log(JSON.stringify(state.gameData));
        state.flag = true;
      }
      state.events.push(action.payload);
    },
    setInfo(state, action: InfoPayload) {
      if ("info" in action.payload) {
        Object.entries(action.payload.info).forEach((info) => {
          if (info[0] === "kill" && info[1].hasOwnProperty("assists")) {
            state.gameData.assists = info[1].assists;
          } else if (info[0] === "kill" && info[1].hasOwnProperty("kills")) {
            state.gameData.total_kills = info[1].kills;
          } else if (
            info[0] === "kill" &&
            info[1].hasOwnProperty("headshots")
          ) {
            state.gameData.headshots = info[1].headshots;
          }
        });
      }

      if ("feature" in action.payload) {
        console.log(
          "feature:" + JSON.stringify(action.payload.feature, null, 2)
        );
      }

      console.log(`Timestamp: ${action.payload.timestamp}`);

      state.infos.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserId.fulfilled, (state, action) => {
        state.userId = action.payload;
      })
      .addCase(setUserId.rejected, () => {
        console.error("Failed to fetch user Id!");
      });

    builder
      .addCase(setUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(setUserInfo.rejected, () => {
        console.error("Failed to fetch basic info data!");
      });
  },
});

export const { setEvent, setInfo } = backgroundSlice.actions;

export default backgroundSlice.reducer;
