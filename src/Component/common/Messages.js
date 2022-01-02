import React from 'react'

const Messages = ({ item, chat }) => {
  let userId = localStorage.getItem('UserId')
  return (
    <div className={`${item.from === userId ? 'user-white' : 'user-black'}`}>
      {item.from === userId ? (
        <div className='flex justify-between items-center'>
          <h6 className='text-sm'>You</h6>
          <p>{item.createdAt && item.createdAt.toDate().toDateString()}</p>
        </div>
      ) : (
        <div className='flex justify-between items-center'>
          <h6>{chat.name}</h6>
          <p>{item.createdAt && item.createdAt.toDate().toDateString()}</p>
        </div>
      )}
      {item.media && <img src={item.media} alt='pic' />}
      {item.text && <p>{item.text}</p>}
    </div>
  )
}

export default Messages
