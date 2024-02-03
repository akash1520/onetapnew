import { Titlebar } from "components/TItlebar/Titlebar";
import DesktopScreen from "./DesktopScreen";
import UserForm from "./UserForm";
import Sidebar from "components/Sidebar/Sidebar";
import { MemoryRouter, Route, Routes } from "react-router-dom";


export default function Screen() {

  return(
    <>
    <Titlebar WINDOW_NAME="desktop"/>
    <div className="flex">
      <MemoryRouter>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<DesktopScreen className="flex-grow" />} />
          <Route path="onboard" element={<UserForm className="flex-grow" />} />
        </Routes>
      </MemoryRouter>
    </div>
    </>
  )
}