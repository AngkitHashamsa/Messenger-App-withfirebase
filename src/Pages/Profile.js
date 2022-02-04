import React, { useEffect } from "react";
import profileImage from "../static/profile-Image.png";

import { BsCameraFill } from "react-icons/bs";
import { useHomeProvider } from "../context/HomeContext";

const Profile = () => {
  const { setProfileImages, user, deletePhoto, isLoading } = useHomeProvider();

  if (isLoading) {
    return (
      <main>
        <div className="section-center grid  h-screen justify-center items-center text-center ">
          <h2>Loading ...</h2>
        </div>
      </main>
    );
  }
  console.log();
  return (
    <main>
      <div className="section-center mt-20 grid justify-center items-center">
        <div className="py-10 px-10 rounded-lg flex flex-col sm:justify-start sm:items-start sm:flex-row bg-gray-400 justify-center items-center text-center ">
          <div className=" relative  ">
            <img
              src={user?.avatar ? user?.avatar : profileImage}
              alt="profile"
              className="w-20 h-20 sm:mr-8 rounded-full hover:cursor-pointer"
            />
            <div className="absolute top-7 left-7 opacity-50 hover:opacity-90 ">
              <label htmlFor="photo">
                <BsCameraFill className="text-2xl text-gray-800 hover:cursor-pointer" />
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setProfileImages(e.target.files[0])}
              />
            </div>
            {user?.avatar && (
              <button onClick={deletePhoto}>delete profile</button>
            )}
          </div>

          <div className="sm:pr-7">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <hr />
            <small>
              Join on:{" "}
              {(user.createdAt && user.createdAt.toDate().toDateString()) ||
                "no data"}
            </small>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
