import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { link } from '../../Data/data'
import { useAuthProvider } from '../../context/context'
import { useHomeProvider } from '../../context/HomeContext'
import profilePic from '../../static/profile-Image.png'
import { db } from '../../firebase.config'
import { getDoc, doc } from 'firebase/firestore'
const Navbar = () => {
  // const [pathName, setPathName] = useState(window.location.pathname);

  // const handleClick = () => {
  //   setPathName(window.location.pathname);
  // };
  const { handleLogOut, loading } = useAuthProvider()
  const { user, setUser, setLoading } = useHomeProvider([])
  let token = localStorage.getItem('Auth Token')
  let userId = localStorage.getItem('UserId')
  useEffect(() => {
    ;(async () => {
      if (token) {
        setLoading(true)
        return await getDoc(doc(db, 'Users', userId))
          .then((docSnap) => {
            if (docSnap.exists) {
              setUser(docSnap.data())
              setLoading(false)
            }
          })
          .catch((err) => {
            setLoading(false)
            console.log(err)
          })
      }
    })()
  }, [token])
  useEffect(() => {
    if (!userId) {
      setUser([])
    }
  }, [userId])
  return (
    <nav className='bg-black border-b-2 border-gray-400'>
      <div className='section-center flex justify-between justify-items-center py-7'>
        <div>
          <Link to='/' className='capitalize '>
            message
          </Link>
        </div>
        {token ? (
          <ul className='flex justify-center items-center'>
            <li className='mr-3'>
              <NavLink to='/profile' className='flex place-content-center'>
                <img
                  src={user?.avatar ? user?.avatar : profilePic}
                  alt='profile image'
                  width={26}
                  height={16}
                  className='rounded-full mr-2'
                />
                Profile
              </NavLink>
            </li>
            <li>
              <button className='py-1 px-3' onClick={(e) => handleLogOut(e)}>
                {loading ? 'loggin out....' : 'log out'}
              </button>
            </li>
          </ul>
        ) : (
          <ul className='flex'>
            {link.map((item) => {
              return (
                <li key={item.id}>
                  <NavLink to={item.path} className='ml-3'>
                    {item.value}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
