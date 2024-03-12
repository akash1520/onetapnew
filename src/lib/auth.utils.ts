import {  AuthError, Provider } from "@supabase/supabase-js";
import { supabase } from "app";
import {
  DISPLAY_OVERWOLF_HOOKS_LOGS,
  TokenDetails,
  WINDOW_NAMES,
} from "app/shared/constants";
import { useWindow } from "overwolf-hooks";
import { ConsoleAuthError } from "../app/shared/Errors.utils";

async function checkSupLogin() {
  await supabase.auth.onAuthStateChange((event, session) => {
    console.info(`this is token ${session?.access_token}`);
    if (session?.access_token) getUserInfo();
  });
}

async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    ConsoleAuthError(error);
    return null;
  } else return data.session;
}

async function getUserInfo() {
  const user = await supabase.auth.getUser();
  console.info(`user ${user.data.user?.id}`);
}

async function logOut() {
  await supabase.auth.signOut();
}


async function signUp(
  email: string,
  password: string
): Promise<AuthError | undefined> {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    return error;
  }
}

async function loginEP(
  email?: string,
  password?: string
): Promise<AuthError | undefined> {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    return;
  } else {
    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        return error;
      }
    }
  }
}

async function setSess(access_token: string, refresh_token: string) {
  await supabase.auth.setSession({
    refresh_token: refresh_token,
    access_token: access_token,
  });
}

function parseToken(e: overwolf.extensions.AppLaunchTriggeredEvent): void {
  if (!e || e.origin.includes("gamelaunchevent")) {
    return;
  }

  console.info("Processing token extraction...");
  console.info(`Extracting details from: ${decodeURIComponent(e.parameter)}`);

  const fullUrl: string = decodeURIComponent(e.parameter);

  // Extract the fragment part after '#'
  try {
    const fragment: string | undefined = fullUrl.split("#")[1];
    if (fragment) {
      const params: URLSearchParams = new URLSearchParams(fragment);
      const details: TokenDetails = {};

      params.forEach((value, key) => {
        details[key] = value;
      });

      const access_token = details.access_token;
      const refresh_token = details.refresh_token;

      // Check and log the extracted details
      if (access_token) {
        console.info("Access token extracted.");
        if (refresh_token) setSess(access_token, refresh_token);
      } else {
        throw new AuthError("Access token not found in URL.");
      }

      // Log other details
      console.info("Other details extracted from the URL:", details);
    } else {
      throw new AuthError("No fragment found in URL.");
    }
  } catch (error) {
    ConsoleAuthError(error as AuthError);
  }
}

const UseloginProvider = (provider: Provider) => {
  const [login] = useWindow(WINDOW_NAMES.LOGIN, DISPLAY_OVERWOLF_HOOKS_LOGS);
  const retFunction = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
    if (error) ConsoleAuthError(error);
    else {
      login.close();
    }
  };
  return retFunction;
};

async function forgotPassword(email:string):Promise<Error|undefined> {
    const { error} = await supabase.auth.resetPasswordForEmail(email) 
    console.info(`this is the ${error?.message}` );
    
    if(error) {
      ConsoleAuthError(error);
      return error;
    }
}

export {
  getUserInfo,
  checkSupLogin,
  ConsoleAuthError,
  parseToken,
  setSess,
  checkSession,
};

export { loginEP, logOut, signUp, UseloginProvider, forgotPassword };
