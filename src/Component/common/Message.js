import React from 'react'
import { useMessageProvider } from '../../context/messageContext'
import MessageForm from './MessageForm'
import Messages from './Messages'
const Message = () => {
  const { chat, messageInp, setMessageInp, messages } = useMessageProvider()

  return (
    <div className='flex flex-col h-full'>
      <div className='text-left  mt-2 border-b-2 border-gray-400 py-2'>
        {chat.name ? (
          <h2 className='ml-2  py-2'>{chat.name}</h2>
        ) : (
          <h2 className='ml-2 py-2'>Please Select a user to chat</h2>
        )}
      </div>
      <section className='px-2 absolute bottom-20 max-h-96 overflow-y-scroll w-full'>
        {messages.map((item, index) => {
          return <Messages key={index} item={item} />
        })}
      </section>
      <MessageForm messageInp={messageInp} setMessageInp={setMessageInp} />
    </div>
  )
}

export default Message
