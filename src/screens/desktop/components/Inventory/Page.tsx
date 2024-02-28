import Card from 'components/CardsCarousel/Card'
import React from 'react'
import { SpentItem } from './Inventory'

export default function Page({className}:{className:string}) {
  return (
    <div className={`${className}`}>
        <h1 className='font-Impact text-2xl'>
        Items bought by you
        </h1>
        <div className='flex py-3 gap-4 flex-wrap'>
            <SpentItem game_name='PUBG' amount_currency='90' />
            <SpentItem game_name='DOTA 2' amount_currency='100' />
            <SpentItem game_name='COD WARZONE' amount_currency='40' />
            <SpentItem game_name='HEARTHSTONE' amount_currency='100' />
            <SpentItem game_name='FORTNITE' amount_currency='100' />
            <SpentItem game_name='FORTNITE' amount_currency='120' />
            <SpentItem game_name='FORTNITE' amount_currency='100' />
            <SpentItem game_name='FORTNITE' amount_currency='80' />
            <SpentItem game_name='FORTNITE' amount_currency='100' />
            <SpentItem game_name='ROCKET LEAGUE' amount_currency='35' />
        </div>
    </div>
  )
}
