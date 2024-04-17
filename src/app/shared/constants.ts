//Hearthstone Game Events
//@see Please read the overwolf.games.events documentation page to learn how to use Overwolf game events.

//Heathstone Game Features
//@see https://overwolf.github.io/docs/api/overwolf-games-events-hearthstone
export const VALORANT_REQUIRED_FEATURES = [
  "gep_internal",
  "me",
  "game_info",
  "match_info",
  "kill",
  "death",
];
export const RETRY_TIMES = 10;

// register gep events
export const REGISTER_RETRY_TIMEOUT = 10000;

//same name in the public/app/manifest.json  "windows"
export const WINDOW_NAMES = {
  BACKGROUND: "background",
  SETTINGS: "settings",
  INGAME: "in_game",
  DESKTOP: "desktop",
  NOTIFICATION: "notification",
  LOGIN:"login"
};

export interface TokenDetails {
  access_token?: string;
  expires_at?: string;
  expires_in?: string;
  provider_refresh_token?: string;
  provider_token?: string;
  refresh_token?: string;
  token_type?: string;
  [key: string]: string | undefined;
}

export const DISPLAY_OVERWOLF_HOOKS_LOGS = true;
