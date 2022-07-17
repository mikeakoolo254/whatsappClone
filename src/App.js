import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Pusher from 'pusher-js'
import axios from './components/axios';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {

 const [messages, setMessages] = useState([])

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response=>{
          setMessages(response.data)
    })
  },[])

  useEffect(() => {   
    const pusher = new Pusher('4675025273b63658b2c0', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) =>{      
      setMessages([...messages,newMessage])
    });

     return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
     }

  }, [messages])
  
console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
       <Router>
         <Switch>
           <Sidebar/>
            <Route path="/rooms/:roomId">            
               <Chat messages={messages}/>
            </Route>           
            <Route path="/">
            <Chat messages={messages}/>
          </Route> 
         </Switch>
        </Router> 
        
      </div>    
    </div>
  );
}

export default App;
