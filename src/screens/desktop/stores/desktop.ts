import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type OnboardedPaylod = PayloadAction<Boolean>;

interface BackgroundState {
  onboarded: Boolean;
}

const initialState: BackgroundState = {
  onboarded:false
};

const desktopSlice = createSlice({
  name: "desktopScreen",
  initialState,
  reducers: {
    setOnboarded(state, action: OnboardedPaylod) {
      state.onboarded=action.payload;
    }
  },
});

export const { setOnboarded } = desktopSlice.actions;

export default desktopSlice.reducer;
