import { supabase } from "app"
import { DISPLAY_OVERWOLF_HOOKS_LOGS, WINDOW_NAMES } from "app/shared/constants"
import { useWindow } from "overwolf-hooks"
import { useEffect } from "react"

export const useDesktopHooks = ()=>{
    const [login] = useWindow(WINDOW_NAMES.LOGIN, DISPLAY_OVERWOLF_HOOKS_LOGS)
    const [desktop] = useWindow(WINDOW_NAMES.DESKTOP, DISPLAY_OVERWOLF_HOOKS_LOGS)
    useEffect(()=>{
        supabase.auth.onAuthStateChange((event,session)=>{
            if(!session){
                login.restore();
                desktop.close();
            }
        })
    },[login,desktop])
}