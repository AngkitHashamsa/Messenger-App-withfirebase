import React, { useEffect, useState } from 'react'

import { db } from '../firebase.config'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import Users from '../Component/common/Users'
import Message from '../Component/common/Message'
import { useMessageProvider } from '../context/messageContext'
const Home = () => {
  const { users, setUsers } = useMessageProvider()

  let userId = localStorage.getItem('UserId')
  useEffect(() => {
    const userRef = collection(db, 'Users')

    // create query object
    const q = query(userRef, where('uid', 'not-in', [userId]))

    const unSUb = onSnapshot(q, (querySnapshot) => {
      let Users = []
      querySnapshot.forEach((doc) => {
        Users.push(doc.data())
      })
      setUsers(Users)
    })
    return unSUb
  }, [])

  // console.log(users)

  return (
    <main>
      <div className='section-center grid grid-cols-7 body-height py-3   '>
        <div className='col-span-2 border-2  border-gray-500 bg-gray-800 rounded-tl-lg rounded-bl-lg'>
          {users &&
            users.map((item) => {
              return <Users key={item.uid} user={item} />
            })}
        </div>
        <div className='col-span-5 border-2 border-l-0 relative flex flex-col h-full rounded-tr-lg rounded-br-lg bg-gray-800 border-gray-500 '>
          <Message />
        </div>
      </div>
    </main>
  )
}

export default Home
