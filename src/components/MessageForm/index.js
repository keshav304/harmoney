import React, { useState } from 'react';
import './style.css';

const MessageForm = ({ onPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onPost(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='message-form'>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Post!</button>
    </form>
  );
};

export default MessageForm;
