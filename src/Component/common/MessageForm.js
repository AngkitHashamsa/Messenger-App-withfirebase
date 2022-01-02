import React from 'react'
import { MdPlayArrow } from 'react-icons/md'
import { FiUpload } from 'react-icons/fi'
import { useMessageProvider } from '../../context/messageContext'
const MessageForm = ({ messageInp, setMessageInp }) => {
  const { handleSubmit, setImg } = useMessageProvider()
  return (
    <form
      className='flex justify-center items-center w-full px-2 bottom-0 absolute py-2  '
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className='w-full relative'>
        <input
          type='text'
          className='w-full flex-1 h-12 rounded-lg  focus:outline-none text-gray-800 px-3  py-2'
          value={messageInp}
          placeholder='Enter the message'
          onChange={(e) => setMessageInp(e.target.value)}
        />
        <div className='absolute bottom-2 right-2 '>
          <label htmlFor='photos'>
            <FiUpload className='text-gray-600 text-lg' />
          </label>
          <input
            type='file'
            id='photos'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
      </div>

      <button className='text-6xl'>
        <MdPlayArrow className='text-green-600 ' />
      </button>
    </form>
  )
}

export default MessageForm
