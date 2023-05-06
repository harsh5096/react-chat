import './App.css';
import { useState, useEffect } from 'react';
import { getDatabase, ref, push, set,onChildAdded } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {

  const provider = new GoogleAuthProvider();
  
const auth = getAuth();
const Googlelogin=()=>{
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser({name : result.user.displayName, email: result.user.email})
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg ] = useState(""); 

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  const updateHeight=()=>{
  const el =document.getElementById('chat')
  if(el){
    el.scrollTop = el.scrollHeight;
  }
 }

  useEffect(() => {    
     onChildAdded(chatListRef, (data) => {
     setChats(chats=>[...chats,data.val()])
     setTimeout(()=>
     {
       updateHeight();

     },100)
     });  

   }, [])
  
const sendChat = ()=>{
 const chatRef = push(chatListRef);
 set(chatRef, {user,message:msg});  
    setMsg("")
  };

  return (
<>
  {user.email? null:
<div>
  {/* <input type="text"  placeholder='Enter Your Name to start '
   onBlur={(e)=>setName(e.target.value)}/> */}

<button onClick={e=>Googlelogin()} > google login</button>
</div>}
{ user.email ? <div>
<h3>User : {user.name}</h3>
<div id='chat' className="chat-container">
 {chats.map((c,i)=> (
 <div key={i} className={`container ${c.user.email === user.email ? 'me':''}`}>
  <p className="chat-box">
    <strong>{c.user.name} :</strong>
    <span>{c.message}</span>
  </p>
  </div>)) }

<div className="btn">
  <div className="input">
    <input type="text" value={msg}
    onInput={e=>setMsg(e.target.value)} placeholder='Enter your text' />
  </div>
    <button onClick={e=>sendChat()}>Send me</button>
  </div>
</div> 
</div>:null}


</>

  );
}

export default App;
