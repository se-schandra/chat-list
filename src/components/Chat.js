import React from 'react';
import * as PropTypes from "prop-types";

function Chat({record}) {
    const {avatar, mesaageId, fullName, timestamp, email, message} = record;

    return (
        <div data-testid="message-container" id={mesaageId} className="message-conatiner">
            {avatar && <img data-testid="avatar-img" src={avatar} alt={email}/>}
            <div data-testid="user-name">{fullName}</div>
            <p data-testid="message-text">{message}</p>
            <em data-testid="timestamp-text">{timestamp}</em>
        </div>
    )
}


Chat.propTypes = {
    record: PropTypes.shape({
        messageId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }).isRequired
};
export default Chat;
