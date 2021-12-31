import React, { useState, useContext, useEffect } from "react";
import { storage, db, auth } from "../firebase.config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
const HomeContext = React.createContext();

export const HomeProvider = ({ children }) => {
  const [profileImages, setProfileImages] = useState(null);
  const [user, setUser] = useState();
  let userId = localStorage.getItem("UserId");
  const getData = async () => {
    return await getDoc(doc(db, "Users", userId)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  };

  useEffect(() => {
    getData();
    if (profileImages) {
      const uploadImg = async () => {
        try {
          const imageRef = ref(
            storage,
            `Avatar/${new Date().getTime()} - ${profileImages.name}`
          );
          const snap = await uploadBytes(imageRef, profileImages);

          let url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          // console.log(snap.ref.fullPath);
          // console.log(url);
          await updateDoc(doc(db, "Users", userId), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setProfileImages("");
        } catch (error) {
          console.log(error);
        }
      };
      uploadImg();
    }
  }, [profileImages]);

  return (
    <HomeContext.Provider value={{ profileImages, setProfileImages, user }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeProvider = () => {
  return useContext(HomeContext);
};
