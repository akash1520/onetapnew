import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setInventoryOpen } from "screens/desktop/stores/desktop";

export default function Header({ className }: { className: string }) {
  const {inventoryOpen} = useSelector((state:any)=>state.desktop)

  const dispatch=useDispatch()


  const handleClick = ()=>{
    if(inventoryOpen!==4)dispatch(setInventoryOpen(4))
    if(inventoryOpen===4)dispatch(setInventoryOpen(1))
  }

  return (
    <div className={`${className} flex mt-7 justify-end items-center text-xl pe-5 h-11`}>
      <button className="font-Ranchers p-2 bg-gradient-to-r from-[#AB8E55] to-[#AE780F]">Upgrade to Premium</button>
      <span className="flex cursor-pointer mx-5">
        <span onClick={handleClick} className="flex items-center">
          <img className="mx-1" src="/icons/coin.svg" alt="" />
          <span className="mx-1">1800</span>
        </span>
        <Link to={"/userProfile"}>
          <img className="mx-1" src="/icons/user.svg" alt="" />
        </Link>
      </span>
    </div>
  );
}
