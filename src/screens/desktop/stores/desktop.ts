import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


type OnboardedPaylod = PayloadAction<Boolean>;
type InventoryOpen = PayloadAction<Number>;

interface leaderboardDataPayload {
  rank: Number;
  id:Number;
  gameBalance:Number;
  gameLevel:Number;
  User:{
    userName:string;
  }
  Game:{
    gameName:string;
  }
}

interface DesktopScreen {
  onboarded: Boolean;
  inventoryOpen: Number;
  loading:Boolean;
  leaderboardData: Array<leaderboardDataPayload>;
}

const initialState: DesktopScreen = {
  onboarded:false,
  inventoryOpen:4,
  loading:false,
  leaderboardData:[]
};

export const fetchLeaderboardData = createAsyncThunk(
  'desktopScreen/fetchLeaderboardData',
  async (gameId: string) => {
    const response = await fetch(
      `http://localhost:3002/leaderboard/game-specific/${gameId}`
    );
    return response.json();
  }
);

const desktopSlice = createSlice({
  name: "desktopScreen",
  initialState,
  reducers: {
    setOnboarded(state, action: OnboardedPaylod) {
      state.onboarded=action.payload;
    },
    setInventoryOpen(state, action:InventoryOpen){
      state.inventoryOpen=action.payload;
      console.log(state.inventoryOpen);
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchLeaderboardData.pending,(state)=>{
      state.loading=true;
    })
    builder.addCase(fetchLeaderboardData.fulfilled,(state,action)=>{
      state.loading=false;
      state.leaderboardData=action.payload;
    })
  }
});

export const { setOnboarded, setInventoryOpen } = desktopSlice.actions;

export default desktopSlice.reducer;
