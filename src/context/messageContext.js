import React, { useContext, useState } from 'react'
import { auth, db, storage } from '../firebase.config'
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
const MessageContext = React.createContext()

export const MessageProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState([])
  const [messageInp, setMessageInp] = useState('')
  const [img, setImg] = useState('')
  const [messages, setMessages] = useState([])

  let user1 = localStorage.getItem('UserId')
  const selectUSer = async (user) => {
    setChat(user)
    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const messageRef = collection(db, 'messages', id, 'chat')
    const q = query(messageRef, orderBy('createdAt', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      let msg = []
      querySnapshot.forEach((doc) => {
        console.log(doc)
        msg.push(doc.data())
      })
      setMessages(msg)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let user2 = chat.uid
    let id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    let url
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()}-${img.name}`)
      const snap = await uploadBytes(imgRef, img)
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlUrl
    }
    await addDoc(collection(db, 'messages', id, 'chat'), {
      text: messageInp,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
    })
    setMessageInp('')
    setImg('')
  }

  return (
    <MessageContext.Provider
      value={{
        users,
        setUsers,
        selectUSer,
        chat,
        messageInp,
        setMessageInp,
        handleSubmit,
        setImg,
        messages,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
export const useMessageProvider = () => {
  return useContext(MessageContext)
}
