import { Titlebar } from "components/TItlebar/Titlebar";
import UserForm from "./UserForm";
import Sidebar from "components/Sidebar/Sidebar";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header/Header";
import Home from "./Home/Home";
import './styles/Screen.css';
import Challenges from "./Challenges/Challenges";
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



export default function Screen() {

  return(
    <>
    <ActiveRouteProvider>
    <Titlebar className="fixed top-0 right-0" WINDOW_NAME="desktop"/>
    <div className="grid grid-cols-5">
      <MemoryRouter>
        <Sidebar className="fixed left-0 top-0 col-span-1 row-span-5"/>
        <Header className="col-start-2 col-span-4 row-span-2"/>
        <Routes>
          <Route path="/" element={<Home className="grow mt-10 col-start-2 col-span-4" />} />
          <Route path="/onboard" element={<UserForm className="grow col-start-2 col-span-4" />} />
          <Route path="/challenges" element={<Challenges className="grow col-start-2 col-span-4" />} />
        </Routes>
      </MemoryRouter>
    </div>
    </ActiveRouteProvider>
    </>
  )
}