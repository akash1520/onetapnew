export function TimeBox({num, unit}:{num:number, unit:string}){
    return(
    <div className="border-[#DB3737] rounded p-1 border-[1px] flex flex-col items-center bg-white font-Inter text-[#DB3737]">
            <p className="font-[600] text-xl">{num}</p>
            <p className="text-xs">{unit}</p>
        </div>)
}

export default function CountDown
() {
  return (
    <div className='flex gap-3'>
        <TimeBox num={10} unit="Days"/>
        <TimeBox num={0o0} unit="Mins"/>
        <TimeBox num={20} unit="Secs"/>
    </div>
  )
}
