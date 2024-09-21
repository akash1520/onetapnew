import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BackgroundState, EventPayload, InfoPayload, UserInfo } from "types";
import { gameDataHandlers, gameDataUpdaters } from "./helperFunctions";
import { overwolfHttpRequest } from "utils/overwolfHttpRequest";
import { Timestamp, OwInfo } from "types";

// TODO:

const initialState: BackgroundState = {
  events: [],
  infos: [],
  gameId: 21640,
  gameData: {
    21640: {
      match_start: "2024-03-31T19:08:38.679Z",
      match_end: "2024-04-8T18:30:00.000Z",
      kills: 0,
      deaths: 0,
      assists: 0,
      headshot: 0,
      spikes_defuse: 0,
      spikes_planted: 0,
      damage_done: 0,
      team_scores: 0,
      agent: "",
      region: "",
      game_mode: "",
      damage_taken: 0,
      match_status: "false",
    },
    9898: {},
    7314: {},
  },
  player_name: "",
  userId: "1",
  recentlyCompletedChallenges: [],
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

// export const setUserId = createAsyncThunk<
//   number,
//   string,
//   { state: BackgroundState; rejectValue: string }
// >("backgroundScreen/setUserId", async (authId, { rejectWithValue }) => {
//   try {
//     const response = await fetch(`http://localhost:3000/user/${authId}`);
//     if (!response.ok) throw new Error("Network response was not ok");
//     const { userId } = await response.json();
//     return userId;
//   } catch (error) {
//     return rejectWithValue("Failed to fetch user id");
//   }
// });

// export const setUserInfo = createAsyncThunk<
//   UserInfo,
//   string,
//   { state: BackgroundState; rejectValue: string }
// >("backgroundScreen/setUserInfo", async (userId, { rejectWithValue }) => {
//   try {
//     const response = await overwolfHttpRequest(
//       `http://localhost:3000/user/basic-info/${userId}`,
//       "GET"
//     );
//     if (!response.ok) throw new Error("Network response was not ok");
//     return await response.json();
//   } catch (error) {
//     return rejectWithValue("Failed to fetch user info");
//   }
// });

const backgroundSlice = createSlice({
  name: "backgroundScreen",
  initialState,
  reducers: {
    setEvent(state, action: EventPayload) {
      console.log("setEvent action received:", action.payload);
      state.events.push(action.payload);

      // Update game data based on events
      action.payload.events.forEach((event) => {
        switch (event.name) {
          case "match_start":
            state.gameData[state.gameId].match_start = new Date().toISOString();
            state.gameData[state.gameId].match_status = "true";
            break;
          case "match_end":
            state.gameData[state.gameId].match_end = new Date().toISOString();
            state.gameData[state.gameId].match_status = "false";
            gameDataUpdaters(state.userId, state.gameId, state.gameData[state.gameId]);
            break;
          // Add more cases for other event types
        }
      });
    },
    setInfo(state, action: PayloadAction<Timestamp & OwInfo>) {
      console.log("setInfo action received:", action.payload);
      state.infos.push(action.payload);
      if ("info" in action.payload && action.payload.info) {
        // This is an InfoUpdates2Event
        const info = action.payload.info;
        Object.entries(info).forEach(([category, categoryInfo]) => {
          if (typeof categoryInfo === "object" && categoryInfo !== null) {
            Object.entries(categoryInfo).forEach(([key, value]) => {
              if (typeof value === "string" && key.startsWith("scoreboard_")) {
                try {
                  const scorecard = JSON.parse(value);
                  if (scorecard.is_local) {
                    state.player_name = scorecard.name;
                    Object.entries(scorecard).forEach(
                      ([scorecardKey, scorecardValue]) => {
                        if (scorecardKey in state.gameData[state.gameId]) {
                          (state.gameData[state.gameId] as any)[scorecardKey] =
                            scorecardValue;
                        }
                      }
                    );
                  }
                } catch (error) {
                  console.error("Error parsing scoreboard data:", error);
                }
              } else if (typeof value === "object" && value !== null) {
                Object.entries(value).forEach(([subKey, subValue]) => {
                  if (
                    typeof subKey === "string" &&
                    subKey in state.gameData[state.gameId]
                  ) {
                    (state.gameData[state.gameId] as any)[subKey] = subValue;
                  }
                });
              } else if (
                typeof key === "string" &&
                key in state.gameData[state.gameId]
              ) {
                (state.gameData[state.gameId] as any)[key] = value;
              }
            });
          }
        });
      }
    },
    setRecentlyCompletedChallenges(
      state,
      action: PayloadAction<{ [key: string]: ChallengeData }>
    ) {
      console.log("setRecentlyCompletedChallenges:", action.payload);
      state.recentlyCompletedChallenges = action.payload;
    },
    setGameId(state, action: PayloadAction<number>) {
      console.log("setGameId:", action.payload);
      state.gameId = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(setUserInfo.fulfilled, (state, action) => {
  //       state.userInfo = action.payload;
  //     })
  //     .addCase(setUserInfo.rejected, () => {
  //       console.error("Failed to fetch basic info data!");
  //     });
  // },
});

export const {
  setEvent,
  setInfo,
  setRecentlyCompletedChallenges,
  setGameId,
  setUserId,
  setUserInfo,
} = backgroundSlice.actions;

export default backgroundSlice.reducer;
