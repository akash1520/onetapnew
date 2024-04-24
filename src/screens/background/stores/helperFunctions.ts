import { BackgroundState, EventPayload, gameData } from "types";
import { setRecentlyCompletedChallenges } from "./background";
import { extractCompletedChallenges } from "utils";
interface GameDataHandlers {
    [key: number]: (state: BackgroundState, action: EventPayload) => { [x: string]: any } | void;
}

export const gameDataUpdaters = async (userId:string, gameId:number, gameData: gameData) => {
        fetch("http://localhost:3000/challenges/update-completed-challenges", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, gameId, gameData }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const completedChallenges = extractCompletedChallenges(data);
            setRecentlyCompletedChallenges(completedChallenges);
        })
        .catch(error => {
            console.error("There was an error posting the data:", JSON.stringify(error));
        });
}

export const gameDataHandlers : GameDataHandlers = {
    21640: (state:BackgroundState, action:EventPayload) => {
            const gameData = { ...state.gameData[state.gameId] };
            action.payload.events.forEach((event) => {
            switch (event.name) {
                case "match_start":
                    // gameData.match_start = new Date(action.payload.timestamp).toISOString().replace('Z', '');
                    console.log("Match start updated:", gameData.match_start);
                    break;
                case "match_end":
                    gameDataUpdaters(state.userId, state.gameId, state.gameData[state.gameId])
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
    // Add more game handlers here as needed
};