import { Avatar, IconButton } from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { AttachFile,MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import axios from '../components/axios';
import { useParams } from 'react-router-dom'
import db from '../firebase'



function Chat({messages}) {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState("")
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")

useEffect(()=>{
  if(roomId){
    db.collection("rooms")
    .doc(roomId)
    .onSnapshot((snapshot)=>setRoomName
    (snapshot.data().name))
  }
},[roomId])

useEffect(()=>{
  setSeed(Math.floor(Math.random() * 5000))
},[])

 const sendMessage = async (e) =>{
    e.preventDefault();

    await axios.post('/messages/new',{
      message: input,
      name:"DEMO APP",
      timestamp:"Just now!",
      received:false,
    })

    setInput("")
 }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className='chat__headerInfo'>
            <h3>{roomName}</h3>
            <p>Last seen at...</p>
          </div>
        <div className='chat__headerRight'>
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>   
          </div> 
      </div>

      <div className='chat__body'>
        {
          messages.map((message)=>(
              <p className={`chat__message ${message.received && "chat__receiver"}`}>
                <span className='chat__name'>{message.name}</span>
                        {message.message}
                < span className='chat__timestamp'>{message.timestamp}</span>
              </p>
          ))
        }   
      </div>
      
      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          placeholder="Type a message"
          type="text"
          />
          <button
            onClick={sendMessage}
          type="submit">
              Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat