import React from 'react';
import ChatList from "./components/ChatList";
import './App.css';

function App() {
    return (
        <div className="main-wrapper">
            <header>Tech Test</header>
            <div className="container">
                <ChatList/>
            </div>
        </div>
    );

}

export default App;
