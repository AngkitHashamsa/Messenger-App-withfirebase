import React from 'react'
import Moment from 'react-moment'
const Messages = ({ item, chat }) => {
  let userId = localStorage.getItem('UserId')
  return (
    <div className={`${item.from === userId ? 'user-white' : 'user-black'}`}>
      {item.from === userId ? (
        <div className='flex justify-between items-center'>
          <h6 className='text-sm'>You</h6>
          <Moment fromNow>{item.createdAt.toDate()}</Moment>
        </div>
      ) : (
        <div className='flex justify-between items-center'>
          <h6>{chat.name}</h6>
          <Moment fromNow>{item.createdAt.toDate()}</Moment>
        </div>
      )}
      {item.media && <img src={item.media} alt='pic' />}
      {item.text && <p>{item.text}</p>}
    </div>
  )
}

export default Messages
