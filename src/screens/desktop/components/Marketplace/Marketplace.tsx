import Button from "components/Button/Button";
import { FilterProvider, useFilter } from "./MarketplaceFilterContext";
import { useState } from "react";
import Modal from "components/Modal/Modal";

export function MarketBanner() {
  return (
    <div className="flex justify-between relative overflow-hidden border-2">
      <img className="absolute -left-10" src="/shroom_bg.png" alt="dice" />
      <img
        className="z-20 h-64 bottom-0 absolute"
        src="/shroom.png"
        alt="dice"
      />
      <div className="flex ml-80">
        <div className="flex flex-col justify-center gap-2 items-center">
          <h1 className="text-xl font-Impact">
            Explore Marketplace. Buy Your favourite gaming items
          </h1>
          <form className="w-full">
            <input
              type="text"
              style={{ caretColor: "black" }}
              className="text-xl h-10 w-full focus:outline-none p-2 bg-[#939393] border-[1px] rounded border-white font-Impact"
            />
          </form>
        </div>
        <img className="" src="/dice.png" alt="dice" />
      </div>
    </div>
  );
}

export const MarketTitleBar: React.FC = () => {
  const { filter, updateFilter } = useFilter(); // Use the single filter and its update function

  // Handle the change for the select dropdown
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the filter with the selected option
    updateFilter(event.target.value);
  };

  // Explicitly type your filter options
  const filterOptions: string[] = ["Valorant", "COD", "PUBG"];

  return (
    <div className="flex py-10 mx-2 justify-between">
      <p className="text-2xl font-Impact">Shop Now</p>
      <div className="flex items-center gap-4">
        <p className="font-Impact text-2xl">Filter</p>
        <select
          className="focus:outline-none flex p-2 text-center bg-[#383838] text-[#C6C6C6] font-Poppins"
          onChange={handleFilterChange}
          value={filter}
        >
          <option value="">By Game</option>
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


export function MarketCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <div className="rounded bg-[#FFC3C3] w-fit">
      <div className="flex">
        <img className="w-40" src="/marketplace_cards/image 50.svg" alt="" />
        <div className="p-2">
          <img className="" src="/marketplace_icons/pubg.svg" alt="" />
          <p className="text-2xl font-Impact">600 UC</p>
        </div>
      </div>
      <div className="bg-[#222222] p-2">
        <h2>PUBG 600 UC</h2>
        <div className="flex items-center gap-2">
          <img src="/icons/coin.svg" alt="" /> <span>200</span>{" "}
          <span className="line-through text-[#C6C6C6]">500</span>{" "}
          <span className="bg-red-500 px-1">60% off</span>{" "}
        </div>
        <div className="text-red-400">
          <p>Expires in 2 days.</p>
        </div>
        <div>
          <p>Bought by 200 people today.</p>
        </div>
        <div>
          <Button onClick={toggleModal} className="w-full">
            Buy Now
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <PromotionCard
          points="600"
          imgSrc="/images/dod_valorant.png"
          discount="60"
          gameName="Valorant"
          description="Valorant is a very competitive game, and it has a large and active esports scene. The game is also very popular among casual players."
          email="jakejonas@gmail.com"
          onClaim={() => console.log('Claim button clicked')}
        />
      </Modal>
    </div>
  );
}

const PromotionCard = ({ points, imgSrc, discount, gameName, description, email, onClaim }:{
  points:string,
  imgSrc?:string,
  discount:string,
  gameName:string,
  description:string,
  email:string,
  onClaim:VoidFunction
}) => {
  return (
    <div className="rounded-lg p-4 text-white w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{gameName} {points} points</h2>
        <span className="bg-blue-600 text-xs font-bold py-1 px-3 rounded-full">{discount}% off</span>
      </div>
      <div className="mb-4">
        <img className="object-cover h-32 w-full rounded-md" src={imgSrc} alt={`${gameName} Characters`} />
      </div>
      <div className="mb-6">
        <p className="text-sm">{description}</p>
      </div>
      <div className="text-sm">
        <p>The code will be sent to the following email id:</p>
        <div className="flex mt-2 mb-4">
          <input type="email" placeholder={email} className="bg-gray-700 p-2 rounded-l-lg flex-1 text-white" />
          <button 
            onClick={onClaim}
            className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded-r-lg"
          >
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
};


export default function Marketplace({ className }: { className: string }) {
  return (
    <FilterProvider>
      <div className={`${className} pr-5`}>
        <MarketBanner />
        <MarketTitleBar />
        <div className="grid grid-cols-4 gap-4 p-2">
          <MarketCard />
          <MarketCard />
          <MarketCard />
          <MarketCard />
          <MarketCard />
        </div>
      </div>
    </FilterProvider>
  );
}
