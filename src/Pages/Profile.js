import React from "react";
import profileImage from "../static/profile-Image.png";

import { BsCameraFill } from "react-icons/bs";
import { useHomeProvider } from "../context/HomeContext";
const Profile = () => {
  const { profileImages, setProfileImages } = useHomeProvider();
  console.log(profileImages);
  return (
    <main>
      <div className="section-center mt-20 grid justify-center items-center">
        <div className="py-10 px-10 rounded-lg flex flex-col justify-start items-start sm:flex-row bg-gray-400 ">
          <div className=" relative ">
            <img
              src={profileImage}
              alt="profile"
              className="w-20 h-20 sm:mr-8 rounded-full"
            />
            <div className="absolute top-7 left-7">
              <label htmlFor="photo">
                <BsCameraFill className="text-2xl text-gray-800 " />
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
          </div>

          <div>
            <h3>user name</h3>
            <p>user email</p>
            <hr />
            <small>join on:...</small>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
