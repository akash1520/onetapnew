import { Header } from "components/Header/Header";
import DesktopScreen from "./DesktopScreen";
import UserForm from "./UserForm";

export default function Screen() {
  var flag:Boolean = true;
  return(
    <>
    <Header WINDOW_NAME="desktop"/>
    {flag ? <UserForm/> : <DesktopScreen/>}
    </>
  )
}
