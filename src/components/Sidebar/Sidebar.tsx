import ListCompoenent from "./ListCompoenent";

export default function Sidebar({className}:{className:string}) {
  return (
    <div className={`${className} border-[#9D9D9D] h-[100dvh] border-r-[1px] w-52`}>
      <div className="flex py-0 mt-5">
        <span className="font-Ranchers mx-4 text-4xl">ONE TAP</span>
        <img src="/logo.png" className="w-10 h-10" alt="logo" />
      </div>
      <div className="flex py-0 mt-16 font-Impact flex-col justify-between mx-6">
        <ul className="flex my-0 py-0 flex-col">
          <ListCompoenent iconSrc="vector" to="/" color="#9B6CFF">Home</ListCompoenent>
          <ListCompoenent iconSrc="vector-1" to="challenges">Challenges</ListCompoenent>
          <ListCompoenent iconSrc="vector-2"to="marketplace">Marketplace</ListCompoenent>
          <ListCompoenent iconSrc="vector-3" to="inventory">Inventory</ListCompoenent>
          <ListCompoenent iconSrc="vector-4" to="leaderboard">Leaderboard</ListCompoenent>
          <ListCompoenent iconSrc="vector-5" to="subscription">Subscription</ListCompoenent>
        </ul>
      </div>
    </div>
  );
}
