import Profile from "./Profile";
import OnboardingForm from "./OnboardingForm";

export default function UserForm() {
  return (
    <>
      <section className="flex h-[95vh]">
      <section className="w-2/5 flex justify-center items-center bg-[#131313]">
          <Profile/>
        </section>
        <section className="flex w-3/5 flex-col justify-center items-center bg-[#000517] text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10">
            User OnBoarding
          </h2>
          <OnboardingForm/>
        </section>
      </section>
    </>
  );
}
