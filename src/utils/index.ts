import { setRecentlyCompletedChallenges } from "screens/background/stores/background";
import { gameData } from "types";

export function extractCompletedChallenges(data:any) {
    const completedChallengeIds = new Set(data.updateProgress.map((item:any) => item.challengeId));
  
    const flatChallenges = data.challenges.flat();
  
    const completedChallenges = flatChallenges.filter((challenge:any) => 
      completedChallengeIds.has(challenge.challengeId)
    );
  
    return completedChallenges;
  }
  
  export function updateCompletedChallenges(userId:string, gameId:number, gameData:gameData) {
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
