import { Titlebar } from "components/TItlebar/Titlebar";
import UserForm from "./UserForm";
import Sidebar from "components/Sidebar/Sidebar";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header/Header";
import Home from "./Home";
import './styles/Screen.css';


export default function Screen() {

  return(
    <>
    <Titlebar WINDOW_NAME="desktop"/>
    <div className="grid grid-cols-5">
      <MemoryRouter>
        <Sidebar className="col-span-1 row-span-5"/>
        <Header className="col-start-2 col-span-4 row-span-2"/>
        <Routes>
          <Route path="/" element={<Home className="grow row-start-3 col-start-2 col-span-4" />} />
          <Route path="onboard" element={<UserForm className="grow col-span-4" />} />
        </Routes>
      </MemoryRouter>
    </div>
    </>
  )
}