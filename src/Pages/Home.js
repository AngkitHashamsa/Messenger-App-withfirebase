import React, { useEffect, useState } from "react";

import { db } from "../firebase.config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [users, setUsers] = useState([]);

  let userId = localStorage.getItem("UserId");
  useEffect(() => {
    const userRef = collection(db, "Users");

    // create query object
    const q = query(userRef, where("uid", "not-in", [userId]));

    const unSUb = onSnapshot(q, (querySnapshot) => {
      let Users = [];
      querySnapshot.forEach((doc) => {
        Users.push(doc.data());
      });
      setUsers(Users);
    });
    return unSUb;
  }, []);

  console.log(users);

  return (
    <main>
      <div className="section-center">
        <h2>home</h2>
      </div>
    </main>
  );
};

export default Home;
