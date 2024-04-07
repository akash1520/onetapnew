import React, { useEffect, useState } from 'react'
import Progressbar from './components/ChallengeLeft/Progressbar';
import { useFilterContext } from '../Contexts/FilterContext';
import { useSelector } from 'react-redux';

export const ChallengeCompletedCard = ({className}:{className?: string})=>{
    return(
        <div className='flex px-5 py-2 bg-[#1C1C1C] w-[80%]'>
            <div className={`bg-black ${className} my-2 flex flex-col`}>
                <img
                    alt=""
                    className="h-[88px] p-[0.1rem] text-white"
                    src={`/images/level.png`}
                />
                <div className="h-[81px] flex items-center justify-center">
                    <div className="flex flex-col items-center">
                    <h1 className="font-Impact font-[400]">Level 1</h1>
                        <p className="font-Inter text-xs text-[#9D9D9D] font-[400]">2 Challenges</p>
                    </div>
                </div>
            </div>
            <div className='p-6 w-full'>
                <h2 className='my-2'>Dive into Challenges</h2>
                <Progressbar completed={70} total={100} />
                <div className='flex flex-col gap-1 my-2'>
                    <p>Earned</p>
                    <div className='flex gap-2'><img alt='coin' src="icons/coin.svg"/> 500</div>
                </div>
            </div>
        </div>
    )
}

export default function ChallengesCompleted({className}:{className?: string}) {
    const [challenges, setChallenges] = useState()
    const {userId} = useSelector((state:any)=>state.background)
    const {gameId} = useFilterContext()


    useEffect(() => {
    const fetchData = async (gameId:string) => {
        try {
    
            console.log(`gameId ${gameId} ${userId}`)
        const gameData = await fetch(
            `http://localhost:3000/challenges/completed-challenges/${gameId}/${userId}`
        );
    
        if (!gameData.ok) {
            throw new Error("Failed to fetch data");
        }
        const jsonData = await gameData.json();
        console.log(jsonData);
        
        setChallenges(jsonData);
    
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    fetchData(gameId);
    }, [gameId, userId]);

  return (
    <div className="col-start-1 flex gap-8 my-5 flex-col col-end-3">
        <ChallengeCompletedCard/>
        <ChallengeCompletedCard/>
        <ChallengeCompletedCard/>
        <ChallengeCompletedCard/>
    </div>
  )
}
