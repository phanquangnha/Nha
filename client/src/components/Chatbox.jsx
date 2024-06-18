import { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import "../../src/css/chatbox.css";
import {MdArrowRight } from "react-icons/md";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const Chatbox = () => {
  const getMessages = async () => {
    const options = {
      method: "POST",
      body : JSON.stringify({
        message: "hello how are you ?"
      }), 
      headers: {
        "Content-Type":"application/json"
      }
    }
    try {
      const response = await fetch ('http://localhost:8700/completions', options)
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='app'>
      <section className='side-bar'>
        <button>+ New chat</button>
        <ul className='history'>
          <li>BLUGH</li>
        </ul>
        <nav>
          <p>Make by Doanh</p>
        </nav>
      </section>


      <section className='main'>
        <h1>Doanh GPT</h1>
        <ul className='feed'>

        </ul>
        <div className='bottom-sections'>
          <div className='input-container'>
            <input className='input'/>
            <div id='submit' onClick={getMessages}>➢</div>
          </div>

          <p className='info'>
              Chat GPT ver 3.5 Chat GPT ver 3.5 Chat GPT ver 3.5
            </p>

        </div>
      </section>

    </div>
  )
}

export default Chatbox 