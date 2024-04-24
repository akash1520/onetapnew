import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameId : undefined,
    gameData : undefined
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers:{
        
    },
});

export default gameSlice.reducer