import Profile from "./Profile";
import OnboardingForm from "./OnboardingForm";
import { MutableRefObject, useState } from "react";

const checkUserNameAvailability = ()=>{
  return (Math.floor(Math.random()*1000)%2)
}

export default function UserForm({className}:{className:string}) {
  const [username, setUsername] = useState("Your Username")

  const handleChange = (usernameRef: MutableRefObject<HTMLInputElement | null>)=>{
    if(usernameRef.current){
      //check username availability
      if(checkUserNameAvailability())usernameRef.current.style.backgroundColor="green"
      else usernameRef.current.style.backgroundColor="red"
      setUsername(usernameRef.current.value)
    }
  }

  return (
    <section className={className}>
      <section className="flex h-[95vh]">
      <section className="w-2/5 flex flex-col justify-center items-center bg-[#131313]">
      <h1 className="font-display text-center text-3xl">{username}</h1>
          <Profile/>
        </section>
        <section className="flex w-3/5 flex-col justify-center items-center bg-[#000517] text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10">
            User OnBoarding
          </h2>
          <OnboardingForm handleChangeFunc={handleChange}/>
        </section>
      </section>
    </section>
  );
}
