import { useEffect, useState, Suspense } from "react";
import { CurrentScreen } from "./CurrentScreen";
import { Loading } from "components/Loading";
import { getCurrentWindow } from "lib/overwolf-essentials";
import {createClient} from "@supabase/supabase-js"
import "../shared/root.css";
import { log } from "lib/log";

const supabase_url = "https://ullmkehpatobgmwxzlah.supabase.co"
const supabase_key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbG1rZWhwYXRvYmdtd3h6bGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1ODA5NTksImV4cCI6MjAyMTE1Njk1OX0.M_h2KO61YHgSpUtYILt-rzV6XheAjE70AFJ8wVNR-So"
export const supabase = createClient(supabase_url,supabase_key);
//This is the main component of the app, it is the root of the app
//each Page component is rendered in a different window
//if NODE_ENV is set to development, the app will render in a window named 'dev'
export const App = () => {
  const [screenName, setScreenName] = useState<string>("");

  useEffect(() => {
    (async function preLoad() {
      const currentWindow = await getCurrentWindow();
      setScreenName(currentWindow);
      log(
        `Request screen: ${currentWindow}`,
        "src/app/components/App.tsx",
        "useEffect",
      );
    })();
  }, []);
  //this is fallback for the loading current screen
  return (
    <Suspense fallback={<Loading />}>
      <CurrentScreen name={screenName} />
    </Suspense>
  );
};
