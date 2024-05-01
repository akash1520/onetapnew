export function extractCompletedChallenges(data:any) {
    const flatChallenges = data.challenges.flat();
    console.log("flatChallenges", JSON.stringify(flatChallenges))
    return flatChallenges;
  }