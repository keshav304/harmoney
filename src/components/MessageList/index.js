import React from 'react';
import MessageItem from '../MessageItem';
import './style.css'


const MessageList = ({ messages, onDelete }) => {
  return (
    <ul style={{padding: '0'}}>
      {messages.length ? messages.map(message => (
        <MessageItem key={message.id} message={message} onDelete={onDelete} />
      )): <p>No Messages till now</p>}
    </ul>
  );
};

export default MessageList;
