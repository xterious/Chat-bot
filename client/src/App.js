import './App.css';
import './normal.css';
import {useState} from 'react';
import Image from './Image';
function App() {
  const [input,setInput] = useState("");
  const [chatLog,setChatLog]=useState([
    {
      user: "sai",
      message: "How can I assist you!"
    },
  ]);
  function clearChats(){
    setChatLog([]);

  }

  async function handleSubmit(e){
    e.preventDefault();
    const chatLogNew =[...chatLog, {user: "me", message: `${input}`}]

    await setInput("");
    const messages = chatLogNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input
      })
  });
  const data = await response.json();
  console.log(data.data.choices);
  setChatLog([...chatLogNew, {user: "sai", message: `${data.data.choices[0].text}`}])
  }
  return (
    <div className='App'>
        <aside className='sidemenu'>
          <div className='side-menu-button' onClick={clearChats}>
            <span>+</span>
            New Chat
          </div>
        </aside>
        <section className='chatbox'>
          <div className="chat-log">
            {chatLog.map((message, index)=>(
              <ChatMessage key={index} message={message} />
            ))
            }

          </div>
          <div className='chat-input-holder'>
            <form onSubmit={handleSubmit}>
            <input 
            rows="1"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            className='chat-input-textarea'/>
            </form>
          </div>
        </section>
    </div>
  );
}


const ChatMessage =({message}) => {
  return (
  <div className={`chat-message ${message.user === "sai" && "chatgpt" }`}>
              <div className="chat-message-center">
                <div className={`avatar ${message.user === "gpt" && "chatgpt" }`}>
                  <div className=''></div>
                {message.user ==="sai" && <Image/> }
                </div>
                <div className="message">
                  {message.message} 
                </div>
                </div>
                
              </div>
)};

export default App;

// timestamp: 26:00
//link : https://www.youtube.com/watch?v=qwM23_kF4v4