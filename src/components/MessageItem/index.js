import React from 'react';
import moment from 'moment';
import './style.css'

const MessageItem = ({ message, onDelete }) => {
    const handleDelete = () => {
            onDelete(message.id);
    };
    const formattedTimestamp = moment(message.timestamp).format('D MMMM, h:mm A');
    return (
        <div className="message-item">
            <div className="message-header">
                <div className="user-icon">💬</div>
                <div className="content-cont">
                    <div className='title-cont '>
                        <div className="username">{message.source}</div>
                        <div className="timestamp">{formattedTimestamp}</div>
                        <div className="delete-btn" onClick={handleDelete}>Delete</div>
                    </div>
                    <div className="message-content">
                        <p>{message.text}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MessageItem;
