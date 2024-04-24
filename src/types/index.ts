import { PayloadAction } from "@reduxjs/toolkit";

export interface Timestamp {
  timestamp: number;
}

export type ChallengeData = {
  id: number;
  userId: number;
  challengeId: number;
  gameId: number;
  Game: {
    gameName: string;
  };
  game_challenges: {
    name: string;
  };
};

export interface gameData {
  match_start: string;
  match_end: string;
  match_status: string;
}

export interface valorantGameData extends gameData {
  total_kills: number;
  deaths: number;
  assists: number;
  headshot: number;
  spikes_defuse: number;
  spikes_planted: number;
  damage_done: number;
  team_scores: number;
  agent: string;
  region: string;
  game_mode: string;
  damage_taken: number;
}

export interface UserInfo {
  id: number;
  userName: string;
  profilePicture: string | null;
  userCoustomeId: string;
  profileName: string;
  globalRanking: number;
  balance: number;
  Auth: string;
  level: number;
  premiumUser: boolean;
}

export type OwInfo =
  | overwolf.games.events.InfoUpdates2Event
  | overwolf.games.InstalledGameInfo;
export type OwEvent = overwolf.games.events.NewGameEvents;
export type InfoPayload = PayloadAction<Timestamp & OwInfo>;
export type EventPayload = PayloadAction<Timestamp & OwEvent>;

export interface BackgroundState {
  events: Array<Timestamp & OwEvent>;
  infos: Array<Timestamp & OwInfo>;
  gameId: number;
  gameData: { [gameId: number]: any };
  flag: boolean;
  recentlyCompletedChallenges: Array<ChallengeData>;
  userInfo: UserInfo;
  userId: string;
}
