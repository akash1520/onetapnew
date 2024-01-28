import { AuthError } from "@supabase/supabase-js";

function ConsoleAuthError(error: AuthError) {
    console.info(
      `Error in authentication ${error.status} ${error.message} ${error.name}`
    );
}

export {
    ConsoleAuthError
}