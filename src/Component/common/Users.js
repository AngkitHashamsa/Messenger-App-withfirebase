import React from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import { useMessageProvider } from '../../context/messageContext'
const Users = ({ user = [] }) => {
  const { selectUSer } = useMessageProvider()
  const { avatar, name, isOnline } = user

  return (
    <section
      className='flex justify-between items-center mt-3 py-2 px-1 hover:cursor-pointer'
      onClick={() => selectUSer(user)}
    >
      <div className='flex items-center'>
        <img
          src={avatar}
          alt='profile'
          width={30}
          height={30}
          className='rounded-full mr-2'
        />
        <h4>{name}</h4>
      </div>
      <div>
        {isOnline ? (
          <BsFillCircleFill className='text-green-600 text-xs' />
        ) : (
          <BsFillCircleFill className='text-red-600 text-xs' />
        )}
      </div>
    </section>
  )
}

export default Users
