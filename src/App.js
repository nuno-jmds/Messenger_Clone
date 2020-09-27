import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import "./AllStyles.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
  //useState= variable in react
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [myusername, setUsername] = useState("");
  //console.log(input);
  //console.log(messages);
  //console.log(username);
  //useEffect=run code on a condiction in REACT
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      }); //doc=[id, data=[username,message,timestamp]]
  }, []);
  useEffect(
    () => {
      //run code here
      setUsername(prompt("please enter your name"));
    },
    [] /**condiction here. if [] runs once when the app loads*/
  );

  const sendMessage = (event) => {
    //all the logic to send a message goes
    event.preventDefault(); //this code prevent the refresh of the page. otherwise the message don't show up because input field is inside a form, that make the refresh
    db.collection("messages").add({
      message: input,
      username: myusername,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <div className="app__divHeader">
        <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=150&h=150" />

        <h1>This is a Messenger Clone</h1>
      </div>
      {/**this form permit submit the values with enter key*/}

      <div className="app__divMessages">
        <FlipMove>
          {messages.map((message) => (
            <Message
              key={message.id}
              username={myusername}
              data={message.data}
            />
          ))}
        </FlipMove>
      </div>

      <div className="app__div">
        <form className="app__form">
          <FormControl className="app__formControl">
            {/* value={input} assign the value of text box = input. onchange is setting the value we type to input, that way we can see it*/}
            <Input
              className="app__input"
              placeholder="Enter a message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <IconButton
              className="app__iconButton"
              disabled={!input}
              variant="contained"
              color="primary"
              type="submit"
              onClick={sendMessage}
            >
              <SendIcon></SendIcon>
            </IconButton>
          </FormControl>
        </form>
      </div>
    </div>
  );
}

export default App;
