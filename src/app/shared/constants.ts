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

export const DOTA2_REQUIRED_FEATURES = [
  "gep_internal",
  "game_state",
  "game_state_changed",
  "match_state_changed",
  "match_detected",
  "daytime_changed",
  "clock_time_changed",
  "ward_purchase_cooldown_changed",
  "match_ended",
  "kill",
  "assist",
  "death",
  "cs",
  "xpm",
  "gpm",
  "gold",
  "hero_leveled_up",
  "hero_respawned",
  "hero_buyback_info_changed",
  "hero_boughtback",
  "hero_health_mana_info",
  "hero_status_effect_changed",
  "hero_attributes_skilled",
  "hero_ability_skilled",
  "hero_ability_used",
  "hero_ability_cooldown_changed",
  "hero_ability_changed",
  "hero_item_cooldown_changed",
  "hero_item_changed",
  "hero_item_used",
  "hero_item_consumed",
  "hero_item_charged",
  "match_info",
  "roster",
  "party",
  "error",
  "hero_pool",
  "me",
  "game",
  "damage"
]

export const REQUIRED_FEATURES:{[key:string]:Array<string>} = {
  21640: VALORANT_REQUIRED_FEATURES,
  7314: DOTA2_REQUIRED_FEATURES
}

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
