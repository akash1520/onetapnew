import { Titlebar } from "components/TItlebar/Titlebar";
import UserForm from "./UserForm";
import Sidebar from "components/Sidebar/Sidebar";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header/Header";
import Home from "./Home/Home";
import './styles/Screen.css';


export default function Screen() {

  return(
    <>
    <Titlebar className="fixed top-0 right-0" WINDOW_NAME="desktop"/>
    <div className="grid grid-cols-5">
      <MemoryRouter>
        <Sidebar className="fixed left-0 top-0 col-span-1 row-span-5"/>
        <Header className="col-start-2 col-span-4 row-span-2"/>
        <Routes>
          <Route path="/" element={<Home className="grow mt-10 col-start-2 col-span-4" />} />
          <Route path="onboard" element={<UserForm className="grow col-span-4" />} />
        </Routes>
      </MemoryRouter>
    </div>
    </>
  )
}