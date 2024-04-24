import { BackgroundState, EventPayload } from "types";

export function processEventData(eventPayload: EventPayload, state: BackgroundState) {
    const gameData = { ...state.gameData };
    eventPayload.payload.events.forEach((event) => {
        switch (event.name) {
            case "match_start":
                gameData.match_start = new Date(eventPayload.payload.timestamp).toISOString().replace('Z', '');
                console.log("Match start updated:", gameData.match_start);
                break;
            case "match_end":
                gameData.match_end = new Date(eventPayload.payload.timestamp).toISOString().replace('Z', '');
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
}
