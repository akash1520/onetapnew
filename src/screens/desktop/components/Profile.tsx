import React from "react";

type ProfileProps = {
  className?: string;
  profileImgUrl?: string;
  userName?: string;
};

export default function Profile({ className, profileImgUrl, userName }: ProfileProps) {
  return (
      <div>
        <h1 className="font-display text-center text-3xl">{userName?userName:"Your UserName"}</h1>
        <img
          className="w-[267.21px] h-[461px]"
          src={profileImgUrl?profileImgUrl:"/profile.png"}
          alt="profile"
        />
        <div className="relative -mt-14">
          <div
            style={{
              width: "297px",
              height: "44px",
              left: "870px",
              opacity: "20%",
              borderRadius: "55%",
              backgroundColor: "#C38CFF33",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "297px",
              height: "44px",
              top: "-33px",
              opacity: "20%",
              borderRadius: "55%",
              backgroundColor: "#C38CFF33",
            }}
          />
        </div>
      </div>
  );
}
