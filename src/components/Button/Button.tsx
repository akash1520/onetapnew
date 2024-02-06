import React, { ReactNode } from 'react'

export default function Button({children, className}:{children:ReactNode, className?:string}) {
  return (
    <button className={`${className} bg-gradient-to-r border-solid border-[1px] border-[#9D9D9D] rounded-sm from-[#692CCD] to-[#B87FF6]`}>{children}</button>
  )
}
