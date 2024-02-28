import Card from 'components/CardsCarousel/Card'
import React from 'react'

export default function Marketplace({className}:{className:string}) {
  return (
    <div className={`${className}`}>
        <h1 className='font-Impact text-2xl'>
        Items bought by you
        </h1>
        <div className='flex py-3 gap-4 flex-wrap'>
            <Card discount={100} offers_count={5} game_name='PUBG' />
            <Card discount={100} offers_count={5} game_name='DOTA 2'  />
            <Card discount={100} offers_count={5} game_name='COD WARZONE' />
            <Card discount={100} offers_count={5} game_name='HEARTHSTONE'  />
            <Card discount={100} offers_count={5} game_name='FORTNITE'  />
            <Card discount={100} offers_count={5} game_name='FORTNITE'  />
            <Card discount={100} offers_count={5} game_name='FORTNITE'  />
            <Card discount={100} offers_count={5} game_name='FORTNITE' />
            <Card discount={100} offers_count={5} game_name='FORTNITE'  />
            <Card discount={100} offers_count={5} game_name='ROCKET LEAGUE' />
        </div>
    </div>
  )
}
