import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Timestamp {
  timestamp: number;
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
  flag: boolean
}

const initialState: BackgroundState = {
  events: [],
  infos: [],
  flag: false
};


const backgroundSlice = createSlice({
  name: "backgroundScreen",
  initialState,
  reducers: {
    setEvent(state, action: EventPayload) {
      console.log("event:"+(JSON.stringify(action.payload, null, 2)));
      const matchEndEventFound = action.payload.events.find(event => event.name === "match_end");
      if (matchEndEventFound) {
        console.log("Match end has been found.");
        state.flag = true;
      }
      state.events.push(action.payload);
    },
    setInfo(state, action: InfoPayload) {
      console.log("info:"+(JSON.stringify(action.payload, null, 2)));
      state.infos.push(action.payload);
    },
  },
});

export const { setEvent, setInfo } = backgroundSlice.actions;

export default backgroundSlice.reducer;
