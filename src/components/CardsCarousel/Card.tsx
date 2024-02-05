import Button from "components/Button/Button";

type CardProps = {
    game_name: string;
    discount: number;
    offers_count: number;
}

export default function Card({game_name, discount, offers_count}:CardProps) {
  return (
    <div className="bg-[#222222] py-8 rounded px-3.5">
        <img className="rounded" src="/banners/pubg.png" alt="pubg"/>
        <hr className="border-b-1 mt-4 border-[#B8B8B8]"/>
        <h2 className="font-Impact mt-1">
            {game_name}
        </h2>
        <div className="flex py-2">
            <div className="w-28">
                <h2 className="font-Poppins font-bold">{discount}% off</h2>
                <p className="font-Poppins font-normal">{offers_count} Offers</p>
            </div>
            <div className="flex mx-auto">
                <Button className="w-[7rem] py-1.5">Shop Now</Button>
            </div>
        </div>
    </div>
  )
}
