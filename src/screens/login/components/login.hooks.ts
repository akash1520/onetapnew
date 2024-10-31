import { DISPLAY_OVERWOLF_HOOKS_LOGS } from "app/shared/constants";
import { checkSession } from "lib/auth.utils";
import { useWindow } from "overwolf-hooks";
import { useEffect } from "react";

export const useLoginHooks = (LOGIN: string, DESKTOP: string) => {
  const [login] = useWindow(LOGIN, DISPLAY_OVERWOLF_HOOKS_LOGS);
  const [desktop] = useWindow(DESKTOP, DISPLAY_OVERWOLF_HOOKS_LOGS);

  useEffect(() => {
    async function sessionCheck() {
      if (await checkSession()) {
        desktop.restore();
        login.minimize();
      }
    }
    sessionCheck();
  }, [login, desktop]);
};
