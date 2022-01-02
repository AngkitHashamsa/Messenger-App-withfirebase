import React from 'react'

const Messages = ({ item }) => {
  console.log(item)
  return (
    <div className=' text-left w-full rounded-lg my-2 py-3 pl-1 pr-2 bg-gray-500'>
      {item.media && <img src={item.media} alt='' />}
      {item.text && <p>{item.text}</p>}
    </div>
  )
}

export default Messages
