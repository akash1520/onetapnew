import React from "react";
import { Link } from "react-router-dom";

export default function ListCompoenent({children, to, iconSrc, color}:{children:React.ReactNode,to:string,iconSrc:string, color?:string}) {
  return (
    <li className="flex my-5 py-0 items-center">
    <img className={`color-[${color}] h-5 w-5`} src={`/icons/${iconSrc}.svg`} alt=""/>
    <Link to={to} className={`text-xl px-2 text-[${color}]`}> {children}</Link>
    </li>
  )
}
