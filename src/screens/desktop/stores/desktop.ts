import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { overwolfHttpRequest } from "utils/overwolfHttpRequest";

type OnboardedPayload = PayloadAction<boolean>;
type InventoryOpenPayload = PayloadAction<number>;

interface LeaderboardDataPayload {
  rank: number;
  id: number;
  gameBalance: number;
  gameLevel: number;
  User: {
    userName: string;
  };
  Game: {
    gameName: string;
  };
}

interface DesktopScreen {
  onboarded: boolean;
  inventoryOpen: number;
  loading: boolean;
  leaderboardData: Array<LeaderboardDataPayload>;
}

const initialState: DesktopScreen = {
  onboarded: false,
  inventoryOpen: 4,
  loading: false,
  leaderboardData: [],
};

export const fetchLeaderboardData = createAsyncThunk<
  Array<LeaderboardDataPayload>, // Expected return type of the fulfilled action
  string, // Argument type for the payload creator
  { rejectValue: string } // Optional, if you want to handle rejected cases with a specific type
>("desktopScreen/fetchLeaderboardData", async (gameId, { rejectWithValue }) => {
  try {
    const data = await overwolfHttpRequest(
      `https://localhost:3000/leaderboard/game-specific/${gameId}`,
      "GET"
    );

    return data as Array<LeaderboardDataPayload>;
  } catch (error) {
    return rejectWithValue("Failed to fetch leaderboard data");
  }
});

const desktopSlice = createSlice({
  name: "desktopScreen",
  initialState,
  reducers: {
    setOnboarded(state, action: OnboardedPayload) {
      state.onboarded = action.payload;
    },
    setInventoryOpen(state, action: InventoryOpenPayload) {
      state.inventoryOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboardData = action.payload;
      })
      .addCase(fetchLeaderboardData.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload || "Failed to load leaderboard data");
      });
  },
});

export const { setOnboarded, setInventoryOpen } = desktopSlice.actions;

export default desktopSlice.reducer;
