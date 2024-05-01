import { BackgroundState, EventPayload } from "types";
import { setRecentlyCompletedChallenges } from "./background";
import { extractCompletedChallenges } from "utils";
import { HEARTHSTONE_CLASS_ID, VALORANT_CLASS_ID } from "lib/games";
import store from "app/shared/store";
interface GameDataHandlers {
    [key: number]: (state: BackgroundState, action: EventPayload) => { [x: string]: any } | void;
}

const gameIdMap : {
    [key:number]:number
} = {
    [VALORANT_CLASS_ID] : 2,
    [HEARTHSTONE_CLASS_ID] : NaN, 
}

export const gameDataUpdaters = async (userId: number, gameId: number, gameData: any) => {
    console.error("in game data updaters", JSON.stringify({ userId, gameId, gameData }));
    try {
        const response = await fetch("http://localhost:3000/challenges/update-completed-challenges", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, gameId, gameData }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error: Status ${response.status}`);
        }

        const data = await response.json();
        console.log("The game data was updated successfully", JSON.stringify(data));
        const completedChallenges = extractCompletedChallenges(data);
        store.dispatch(setRecentlyCompletedChallenges(completedChallenges));
    } catch (error) {
        console.error("Failed to update game data", JSON.stringify({ userId, gameId, gameData }));
        console.error("Error details:", error?.toString());
    }
}


export const gameDataHandlers : GameDataHandlers = {
    21640: (state:BackgroundState, action:EventPayload) => {
            console.log("in handlers")
            const gameData = { ...state.gameData[state.gameId] };
            action.payload.events.forEach((event) => {
            switch (event.name) {
                case "match_start":
                    // gameData.match_start = new Date(action.payload.timestamp).toISOString().replace('Z', '');
                    console.log("Match start updated:", gameData.match_start);
                    break;
                case "match_end":
                    const gameId = gameIdMap[state.gameId];
                    gameDataUpdaters(state.userId, gameId, state.gameData[state.gameId])
                    // gameData.match_end = new Date(action.payload.timestamp).toISOString().replace('Z', '');
                    console.log("Match end updated:", gameData.match_end);
                    break;
                case "kill":
                    const data = JSON.parse(event.data);

                    if (data.headshots) {
                        gameData.total_kills = data.headshots;
                        gameData.headshot = data.assists;
                        console.log("Total kills and headshots updated:", gameData.total_kills, gameData.headshot);
                    } else if (data.assists) {
                        gameData.total_kills = data.assists;
                        gameData.assists = data.assists;
                        console.log("Total kills and assists updated:", gameData.total_kills, gameData.assists);
                    } else {
                        gameData.total_kills += parseInt(event.data, 10);
                        console.log("Total kills incremented by:", parseInt(event.data, 10), "New total:", gameData.total_kills);
                    }
                    break;
            }
        });
    return gameData;
    },
    9898: (state:BackgroundState, action:EventPayload) => {
        const gameData = { ...state.gameData[state.gameId] };
        action.payload.events.forEach((event) => {
            switch (event.name) {
                // case "match_start":
                //     gameData.match_start = new Date(action.payload.timestamp).toISOString().replace('Z', '');
                //     console.log("Match start updated:", gameData.match_start);
                //     break;
                // case "match_end":
                //     gameData.match_end = new Date(action.payload.timestamp).toISOString().replace('Z', '');
                //     console.log("Match end updated:", gameData.match_end);
                //     break;
                case "kill":
                    const data = JSON.parse(event.data);

                    if (data.headshots) {
                        gameData.total_kills = data.headshots;
                        gameData.headshot = data.assists;
                        console.log("Total kills and headshots updated:", gameData.total_kills, gameData.headshot);
                    } else if (data.assists) {
                        gameData.total_kills = data.assists;
                        gameData.assists = data.assists;
                        console.log("Total kills and assists updated:", gameData.total_kills, gameData.assists);
                    } else {
                        gameData.total_kills += parseInt(event.data, 10);
                        console.log("Total kills incremented by:", parseInt(event.data, 10), "New total:", gameData.total_kills);
                    }
                    break;
            }
        })
    },
    7314: (state:BackgroundState, action:EventPayload) => {
        const gameData = { ...state.gameData[state.gameId] };
        action.payload.events.forEach((event) => {
            switch (event.name) {
                // case "match_start":
                //     gameData.match_start = new Date(action.payload.timestamp).toISOString().replace('Z', '');
                //     console.log("Match start updated:", gameData.match_start);
                //     break;
                // case "match_end":
                //     gameData.match_end = new Date(action.payload.timestamp).toISOString().replace('Z', '');
                //     console.log("Match end updated:", gameData.match_end);
                //     break;
                case "kill":
                    const data = JSON.parse(event.data);

                    if (data.headshots) {
                        gameData.total_kills = data.headshots;
                        gameData.headshot = data.assists;
                        console.log("Total kills and headshots updated:", gameData.total_kills, gameData.headshot);
                    } else if (data.assists) {
                        gameData.total_kills = data.assists;
                        gameData.assists = data.assists;
                        console.log("Total kills and assists updated:", gameData.total_kills, gameData.assists);
                    } else {
                        gameData.total_kills += parseInt(event.data, 10);
                        console.log("Total kills incremented by:", parseInt(event.data, 10), "New total:", gameData.total_kills);
                    }
                    break;
            }
        })
    },
    // Add more game handlers here as needed
};