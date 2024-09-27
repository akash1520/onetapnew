import { supabase } from "app";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  setAuth,
  setUserInfo,
} from "screens/background/stores/background";
import { LbBox } from "../Leaderboard/LeaderboardBanner";
import Filter from "../Filter";
import GameCard from "../Challenges/components/GameCard";
import { useFormik } from "formik";
import Button from "components/Button/Button";
import { overwolfHttpRequest } from "utils/overwolfHttpRequest";

export default function UserProfile({ className }: { className: string }) {
  const [displayPage, setDisplayPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();
  const { userId, userInfo } = useSelector((state: any) => state.background);

  useEffect(() => {
    async function fetchAndSetUserInfo() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (data.user) {
          const fetchedAuthId = data.user.id;
          console.log("Fetched AuthId:", fetchedAuthId);

          await dispatch(setAuth(fetchedAuthId));

          const userExists = await checkUserExists(fetchedAuthId);
          if (!userExists) {
            const newUserId = await fetchUserIdFromDb(fetchedAuthId);
            console.log("New User Created:", newUserId);
          } else {
            console.log("Existing User:", userExists);
            await dispatch(setUserInfo(userExists));
            await dispatch(setUserId(userExists.id));
          }
        }
      } catch (error) {
        console.error("Error fetching or setting user info:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndSetUserInfo();
  }, [dispatch]);

  useEffect(() => {
    console.log("UserProfile - AuthId:", userInfo.Auth);
    console.log("UserProfile - UserId:", userId);
    console.log("UserProfile - UserInfo:", userInfo);
  }, [userInfo.Auth, userId, userInfo]);

  async function checkUserExists(authId: string) {
    try {
      const response = await overwolfHttpRequest(
        `http://localhost:3000/user/basic-info/${authId}`,
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Failed to check if user exists:", error);
      return null;
    }
  }

  async function fetchUserIdFromDb(authId: string) {
    try {
      const response = await overwolfHttpRequest(
        `http://localhost:3000/user/profile-data/${authId}`,
        "POST",
        {
          data: {
            Auth: authId,
            userName: `user ${authId}`,
          },
        }
      );
      if (response) {
        await dispatch(setUserId(response.id));
        return response.id;
      }
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  }
  return (
    <div className={`${className} mt-10 grid grid-cols-3`}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
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
            {!displayPage ? (
              <MyRanking authId={userInfo.Auth} />
            ) : (
              <MyProfile authId={userInfo.Auth} />
            )}
          </div>
          <Filter
            className={`${!displayPage ? "col-start-3" : "col-start-3 hidden"}`}
          >
            <GameCard id={"1"} img_src="pubg" className="w-36" />
            <GameCard id={"2"} img_src="dota2" className="w-36" />
            <GameCard id={"3"} img_src="apex_legends" className="w-36" />
            <GameCard id={"4"} img_src="cod_warzone" className="w-36" />
            <GameCard id={"5"} img_src="cs_go" className="w-36" />
            <GameCard id={"6"} img_src="fortnite" className="w-36" />
            <GameCard id={"7"} img_src="hearthstone" className="w-36" />
          </Filter>
        </>
      )}
    </div>
  );
}

export const MyRanking = ({ authId }: { authId: string }) => {
  const { userInfo } = useSelector((state: any) => state.background);

  return (
    <div className="flex flex-col items-start p-20">
      <div className="flex flex-col items-center">
        <h2 className="font-display text-3xl">
          {userInfo.userName.toLocaleUpperCase()}
        </h2>
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
};

export const MyProfile = ({ authId }: { authId: string }) => {
  const { userInfo, userId } = useSelector((state: any) => state.background);

  console.log(userInfo);

  const handleUpdateUserProfile = async (values: {
    userName: string;
    userCustomId: string;
    profileName: string;
  }) => {
    try {
      console.log("called update user profile", values, authId);
      const response = await overwolfHttpRequest(
        `http://localhost:3000/user/profile-data/${authId}`,
        "POST",
        { data: values }
      );

      if (response.statusCode !== 200) {
        throw new Error(
          `HTTP error! status: ${response.statusCode}, ${response}`
        );
      }

      const result = response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      userName: "",
      userCustomId: "",
      profileName: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      await handleUpdateUserProfile(values);
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const handleSubmitOnChange = (e: ChangeEvent) => {
    console.log(e);
    formik.handleChange(e); // This will update the values
    // formik.submitForm(); // This will submit the form
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    formik.submitForm();
  };

  // useEffect(() => {
  //   async function fetchUserIdAndInfo() {
  //     try {
  //       const { data, error } = await supabase.auth.getUser();
  //       if (error) throw error;
  //       if (data.user) {
  //         const fetchedAuthId = data.user.id;
  //         dispatch(setAuth(fetchedAuthId));

  //         const userInfoResponse = await overwolfHttpRequest(
  //           `http://localhost:3000/user/basic-info/${fetchedAuthId}`,
  //           "GET"
  //         );

  //         console.log("User info response:", userInfoResponse);
  //         dispatch(setUserInfo(userInfoResponse));
  //         dispatch(setUserId(userInfoResponse.id))
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //     }
  //   }

  //   fetchUserIdAndInfo();
  // }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      formik.setValues({
        id: userInfo.id || "",
        userName: userInfo.userName || "",
        userCustomId: userInfo.userCustomId || "",
        profileName: userInfo.profileName || "",
      });
    }
  }, [userInfo]);

  return (
    <div className="p-4 max-w-sm">
      <form onChange={formik.handleChange} onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="profileName"
            className="block text-white text-xl font-display"
          >
            Name
          </label>
          <input
            type="text"
            id="profileName"
            name="profileName"
            onChange={handleSubmitOnChange} // Submit form on change
            value={formik.values.profileName}
            className="bg-transparent border-[1px] bg-[#302F2F] rounded border-[#BE9FFF] w-full text-white mb-3 p-2 leading-tight focus:outline-none"
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-white text-xl font-display"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            onChange={handleSubmitOnChange} // Submit form on change
            value={formik.values.userName}
            className="bg-transparent border-[1px] bg-[#302F2F] rounded border-[#BE9FFF] w-full text-white mb-3 p-2 leading-tight focus:outline-none"
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-white text-xl font-display"
          >
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            disabled={true}
            className="bg-transparent border-[1px] bg-[#302F2F] rounded border-[#BE9FFF] w-full text-white mb-3 p-2 leading-tight focus:outline-none"
            autoComplete="off"
          />
        </div>

        {/* <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-white text-xl font-display"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleSubmitOnChange}
            value={formik.values.email}
            className="bg-transparent border-[1px] bg-[#302F2F] rounded border-[#BE9FFF] w-full text-white mb-3 p-2 leading-tight focus:outline-none"
            autoComplete="off"
          />
        </div> */}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Updating..." : "Confirm changes"}
        </button>
      </form>
    </div>
  );
};

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
