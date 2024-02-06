import Button from "components/Button/Button";

type CardProps = {
    game_name: string;
    discount: number;
    offers_count: number;
}

export default function DodCard({game_name, discount, offers_count}:CardProps) {
  return (
    <div className="bg-[#222222] rounded">
        <img className="rounded w-full" src="/banners/pubg.png" alt="pubg"/>
        <div className="py-2">
        <h2 className="font-Impact mx-3 mt-1">
            {game_name}
        </h2>
            <div className="w-[15rem] mx-3">
                <h2 className="font-Poppins font-bold">{discount}% off</h2>
                <p className="font-Poppins font-normal">{offers_count} Offers</p>
            </div>
            <div className="flex justify-center">
                <Button className="py-1.5 mt-1.5 mb-2.5 mx-2 px-20">Buy Now</Button>
            </div>
        </div>
    </div>
  )
}
