import React from 'react'

export default function GameCard({className}:{className:string}) {
  return (
    <div className={`${className} bg-[#363636] h-36 relative rounded`}>
        <label htmlFor='default-checkbox'>
        <input type="checkbox" value="" className="absolute top-2 left-2 w-4 h-4 accent-[#363636]"/>
        </label>
        <img src='/images/image 95.png' className='absolute bottom-0' alt=''/>
    </div>
  )
}
