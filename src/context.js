import React, { useState, useContext } from "react";
import { auth, db } from "./firebase.config";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const handleCLick = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password || !userName || !email) {
      alert("plese Enter the value");
    }
    if (password || userName || email) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res);
        if (res) {
          localStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
          const docData = {
            uid: res.user.uid,
            name: userName,
            email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
          };
          await setDoc(doc(db, "Users", res.user.uid), docData);
          navigate("/");
        }

        setLoading(false);
        setPassword("");
        setUserName("");
        setEmail("");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("added");
    if (!password || !email) {
      alert("plese Enter the value");
    }
    if (password || email) {
      try {
        setLoading(true);
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res) {
          localStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
          console.log(res);
          const docData = {
            isOnline: true,
          };
          await updateDoc(doc(db, "Users", res.user.uid), docData);
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    localStorage.removeItem("Auth Token");
  };

  return (
    <AuthContext.Provider
      value={{
        showPassword,
        setShowPassword,
        userName,
        setUserName,
        password,
        setPassword,
        email,
        setEmail,
        handleCLick,
        handleRegisterSubmit,
        handleLoginSubmit,
        loading,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};