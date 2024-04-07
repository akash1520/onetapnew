import { supabase } from "app";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserInfo } from "screens/background/stores/background";
import { LbBox } from "../Leaderboard/LeaderboardBanner";
import Filter from "../Filter";
import GameCard from "../Challenges/components/GameCard";
import { useFormik } from "formik";

export default function UserProfile({ className }: { className: string }) {
  const [displayPage, setDisplayPage] = useState(false);
  return (
    <div className={`${className} mt-10 grid grid-cols-3`}>
        <div className="col-span-2 -mt-10">
          <div className="flex gap-3">
            <div
              onClick={() => setDisplayPage(!displayPage)}
              className={`text-2xl p-2 px-6 rounded bg-[#302F2F] flex gap-2 border-[1px] items-center justify-between ${displayPage ? "text-white" : "border-[#BE9FFF] text-[#BE9FFF]"} cursor-pointer font-Impact`}
            >
              <img
                className="mb-1"
                src={`${displayPage ? "/icons/star_white.svg" : "/icons/star.svg"}`}
                alt="star"
              />
              <p>My Ranking</p>
            </div>
            <div
              onClick={() => setDisplayPage(!displayPage)}
              className={`text-2xl p-2 px-6 rounded bg-[#302F2F] flex gap-2 border-[1px] ${!displayPage ? "text-white" : "border-[#BE9FFF] text-[#BE9FFF]"} cursor-pointer font-Impact`}
            >
              <img
                src={`${displayPage ? "/icons/user_onetap.svg" : "/icons/user.svg"}`}
                alt="star"
              />
              <p>My Profile</p>
            </div>
          </div>
          {!displayPage ? <MyRanking /> : <MyProfile/>}
        </div>
        <Filter className={`${!displayPage?"col-start-3":"col-start-3 hidden"}`}>
          <GameCard id={"1"} img_src="pubg" className="w-36" />
          <GameCard id={"2"} img_src="dota2" className="w-36" />
          <GameCard id={"3"} img_src="apex_legends" className="w-36" />
          <GameCard id={"4"} img_src="cod_warzone" className="w-36" />
          <GameCard id={"5"} img_src="cs_go" className="w-36" />
          <GameCard id={"6"} img_src="fortnite" className="w-36" />
          <GameCard id={"7"} img_src="hearthstone" className="w-36" />
        </Filter>
      </div>
  );
}

function MyRanking() {
  const { userId, userInfo } = useSelector((state: any) => state.background);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    async function fetchUserId() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw new Error(error.message);
        }

        if (data.user) {
          dispatch(setUserId(data.user.id));
        } else {
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    }

    async function fetchAndSetUserInfo() {
      try {
        fetchUserId();
        console.log("fetched user id", userId);
        dispatch(setUserInfo(userId));
      } catch (error) {
        console.error("Error fetching or setting user info:", error);
      }
    }

    fetchAndSetUserInfo();
  }, [dispatch, userId]);

  return (
    <div className="flex flex-col items-start p-20">
      <div className="flex flex-col items-center">
        <h2 className="font-display text-3xl">{userInfo.userName.toLocaleUpperCase()}{("akashhuyaar").toLocaleUpperCase()}</h2>
        <Avatar />
      </div>
      <div>
      <div className="flex gap-5 p-2 flex-row">
        <LbBox imgSrc="image 73.svg" num={1} textSrc="Rank" />
        <LbBox imgSrc="image 72.svg" num={6} textSrc="Level" />
        <LbBox imgSrc="image 72-1.svg" num={2000} textSrc="Coins" />
      </div>
      </div>
    </div>
  );
}

function MyProfile() {
  const {userInfo, userId} = useSelector((state:any)=>state.background)
  const formik = useFormik({
    initialValues: {
      name: userInfo.profileName,
      userId: userId,
      email: userInfo.username,
    },
    onSubmit: values => {
      // Handle your form submission here
      console.log(values);
    },
  });

  const handleSubmitOnChange = (e:ChangeEvent) => {
    formik.handleChange(e); // This will update the values
    formik.submitForm();   // This will submit the form
  };

  return (
    <div className="p-4 max-w-sm">
      <form onChange={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white text-xl font-display">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleSubmitOnChange} // Submit form on change
            value={formik.values.name}
            className="bg-transparent border-[1px] bg-[#302F2F] rounded border-[#BE9FFF] w-full text-white mb-3 p-2 leading-tight focus:outline-none"
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="userId" className="block text-white text-xl font-display">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            onChange={formik.handleChange} // Only update values, don't submit
            value={formik.values.userId}
            className="bg-transparent border-[1px] bg-[#302F2F] rounded border-[#BE9FFF] w-full text-white mb-3 p-2 leading-tight focus:outline-none"
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="username" className="block text-white text-xl font-display">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleSubmitOnChange}
            value={formik.values.email}
            className="bg-transparent border-[1px] bg-[#302F2F] rounded border-[#BE9FFF] w-full text-white mb-3 p-2 leading-tight focus:outline-none"
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
}

function Avatar() {
  return (
    <div>
      <img
        className="w-[133.605px] h-[230.5px]"
        src={"/profile.png"}
        alt="profile"
      />
      <div className="-mt-7">
        <div
          style={{
            width: "148.5px",
            height: "22px",
            left: "870px",
            opacity: "20%",
            borderRadius: "55%",
            backgroundColor: "#C38CFF33",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "148.5px",
            height: "22px",
            top: "-16.5px",
            opacity: "20%",
            borderRadius: "55%",
            backgroundColor: "#C38CFF33",
          }}
        />
      </div>
    </div>
  );
}
