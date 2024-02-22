import { ReactNode, useState } from "react";
import { createContext } from "react";

// Define the type for the active route
interface ActiveRouteContextValue {
    activeRoute: string;
    handleRouteChange: (newRoute: string) => void;
  }
  
  // Create the typed context with the defined interface
  export const ActiveRouteContext = createContext<ActiveRouteContextValue>(undefined as unknown as ActiveRouteContextValue);
  
  
  export const ActiveRouteProvider = ({children}:{children:ReactNode})=>{
    const [activeRoute, setActiveRoute] = useState("/")
  
    const handleRouteChange = (newRoute:string)=>{
      setActiveRoute(newRoute)
    }
  
    return (
      <ActiveRouteContext.Provider value={{ activeRoute, handleRouteChange }}>
        {children}
      </ActiveRouteContext.Provider>
    );
  }
  