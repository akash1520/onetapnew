import { ReactNode } from 'react'

export default function Filter({children, className}:{children:ReactNode, className?:string}) {
  return (
    <div className={`${className} col-start-3 h-[100dvh]`}>
        <h1 className="font-Impact text-2xl">Filter</h1>
        <div className="bg-[#1C1C1C] rounded p-2 mt-2 mr-5">
            <div className="flex flex-row gap-3 flex-wrap h-[100dvh] overflow-scroll">
              {children}
            </div>
        </div>
      </div>
  )
}
