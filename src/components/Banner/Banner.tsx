import { ReactNode } from "react";

export default function Banner({children,className, imgSrc}:{children:ReactNode, className?:string, imgSrc:string}) {
  return (
    <>
      <div className={`bg-[#222222] ${className} my-10 rounded grid grid-cols-2`}>
        <div className="col-span-1">
          <img className="w-full p-5" src={`/banners/${imgSrc}.png`} alt="" />
        </div>
        {children}
      </div>
    </>
  );
}
