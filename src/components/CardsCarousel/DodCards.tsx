import DodCard from "./DodCard"


export default function DodCards() {
  return (
    <div className='flex overflow-x-scroll ml-2 mr-20 gap-4'>
      {Array.from({ length: 12 }, (_, i) => (
        <DodCard key={i} game_name="Pubg" discount={10} offers_count={10} />
      ))}
    </div>
  )
}
