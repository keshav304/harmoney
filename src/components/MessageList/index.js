import React from 'react';
import MessageItem from '../MessageItem';
import './style.css'


const MessageList = ({ messages, onDelete }) => {
  return (
    <ul style={{padding: '0'}}>
      {messages.map(message => (
        <MessageItem key={message.id} message={message} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default MessageList;
