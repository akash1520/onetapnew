import { logOut } from "lib/auth.utils";

export default function Header({ className }: { className: string }) {
  return (
    <div className={`${className} flex mt-7 justify-end items-center text-xl pe-5 h-11`}>
      <button className="font-Ranchers p-2 bg-gradient-to-r from-[#AB8E55] to-[#AE780F]">Upgrade to Premium</button>
      <span className="flex mx-5">
        <span className="flex items-center">
          <img className="mx-1" src="/icons/coin.svg" alt="" />
          <span className="mx-1">1800</span>
        </span>
        <img onClick={logOut} className="mx-1" src="/icons/user.svg" alt="" />
      </span>
    </div>
  );
}
