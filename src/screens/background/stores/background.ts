import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      action.payload.events.forEach(event => {
      if(event.name==="match_end"){
        console.log("state end has found");
        state.flag = true;
      }
      });
      
      state.events.push(action.payload);
    },
    setInfo(state, action: InfoPayload) {
      state.infos.push(action.payload);
    },
  },
});

export const { setEvent, setInfo } = backgroundSlice.actions;

export default backgroundSlice.reducer;
