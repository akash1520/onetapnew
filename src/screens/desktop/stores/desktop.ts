import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type OnboardedPaylod = PayloadAction<Boolean>;
type InventoryOpen = PayloadAction<Number>;

interface DesktopScreen {
  onboarded: Boolean;
  inventoryOpen: Number;
}

const initialState: DesktopScreen = {
  onboarded:false,
  inventoryOpen:4
};

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
});

export const { setOnboarded, setInventoryOpen } = desktopSlice.actions;

export default desktopSlice.reducer;
