import React, { ReactNode } from 'react'

export default function Button({children, onClick, className}:{children:ReactNode, onClick?:VoidFunction , className?:string}) {
  return (
    <button onClick={onClick} className={`${className} bg-gradient-to-r border-solid border-[1px] border-[#9D9D9D] rounded-sm from-[#692CCD] to-[#B87FF6]`}>{children}</button>
  )
}
