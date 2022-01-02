import React, { useState, useContext, useEffect } from 'react'
import { storage, db, auth } from '../firebase.config'
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const HomeContext = React.createContext()

export const HomeProvider = ({ children }) => {
  const navigate = useNavigate()
  const [profileImages, setProfileImages] = useState(null)
  const [user, setUser] = useState([])
  const [isLoading, setLoading] = useState()
  let userId = localStorage.getItem('UserId')
  const getData = async () => {
    return await getDoc(doc(db, 'Users', userId)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data())
      }
    })
  }

  useEffect(() => {
    if (profileImages) {
      const uploadImg = async () => {
        try {
          const imageRef = ref(
            storage,
            `Avatar/${new Date().getTime()} - ${profileImages.name}`
          )
          if (user?.avatarPath) {
            await deleteObject(ref(storage, user?.avatarPath))
          }
          const snap = await uploadBytes(imageRef, profileImages)

          let url = await getDownloadURL(ref(storage, snap.ref.fullPath))
          // console.log(snap.ref.fullPath);
          // console.log(url);
          await updateDoc(doc(db, 'Users', userId), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          })
          getData()
          setProfileImages('')
        } catch (error) {
          console.log(error)
        }
      }
      uploadImg()
    }
  }, [profileImages])

  const deletePhoto = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to remove image')
      if (confirm) {
        await deleteObject(ref(storage, user?.avatarPath))
        await updateDoc(doc(db, 'Users', userId), {
          avatar: '',
          avatarPath: '',
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <HomeContext.Provider
      value={{
        profileImages,
        setProfileImages,
        user,
        setUser,
        getData,
        deletePhoto,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export const useHomeProvider = () => {
  return useContext(HomeContext)
}
