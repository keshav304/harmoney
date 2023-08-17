import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from '../MessageForm';
import './style.css';
import MessageList from '../MessageList/index';
import Pagination from '../Pagination';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/messages/`, {
        headers: {
          'Authorization': `${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage]);

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/messages/${messageId}`, {
        headers: {
          'Authorization': `${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all messages?')) {
      // Loop through each message and delete them
      messages.forEach(async (message) => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/messages/${message.id}`, {
            headers: {
              'Authorization': `${process.env.REACT_APP_API_TOKEN}`,
            }
          });
        } catch (error) {
          console.error('Error deleting message:', error);
        } finally {
          fetchMessages();
        }
      });
      fetchMessages();
    }
  };
  const handlePost = async (text) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/messages/`, {
        text
      }, {
        headers: {
          'Authorization': `${process.env.REACT_APP_API_TOKEN}`,
        }
      });
      console.log('posted message:', response.data);
      fetchMessages();
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };


  const handleSort = () => {
    setSortAscending((prevSortAscending) => !prevSortAscending);
  };

  const sortedMessages = [...messages].sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();

    if (sortAscending) {
      return timestampA - timestampB;
    } else {
      return timestampB - timestampA;
    }
  });
  const filteredMessages = sortedMessages.filter(message =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const messagesToDisplay = filteredMessages.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Message Board</h1>
      <p>Type something in the box below, then hit <b>'POST'</b></p>
      <MessageForm onPost={handlePost} />
      <button className="sort-btn" onClick={handleSort}>
        {sortAscending ? 'Oldest First' : 'Newest First'}
      </button>
      <input
      type="text"
      className="input-box search-input"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search messages..."
    />
      <button className='delete-all-post-btn' onClick={handleDeleteAll}>Delete All Posts</button>
      <MessageList messages={messagesToDisplay} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MessageBoard;
