import React from 'react'
import Chat from './Chat'
import useGetConversation from '../../hooks/useGetConversation'
import {getRandomEmoji} from '../../utils/emoji.js';
function Chats() {
  const { loading, chats } = useGetConversation();
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {chats.map((chat,idx)=>
          (<Chat key={chat._id}
            chat={chat}
            emoji={getRandomEmoji()}
            lastIndex = {idx === chats.length -1}
          />)
        )}
        {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  )
}

export default Chats


