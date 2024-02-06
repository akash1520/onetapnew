import Card from './Card'

export default function PopCards() {
  return (
    <div className='flex overflow-x-scroll ml-2 mr-20 gap-4'>
      {Array.from({ length: 10 }, (_, i) => (
        <Card key={i} game_name="Pubg" discount={10} offers_count={10} />
      ))}
    </div>
  )
}
