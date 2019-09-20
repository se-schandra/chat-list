import React, {useEffect, useRef, useState} from 'react';
import * as PropTypes from "prop-types";

function Chat({record}) {
    const {avatar, mesaageId, fullName, timestamp, email, message} = record;
    const [hoverOn, setHoverOn] = useState(false);
    const messageRef = useRef();

    function handleMousemove(hover) {
        setHoverOn(hover);
    }

    useEffect(() => {
        const node = messageRef.current;
        if (node) {
            node.addEventListener('mouseover', handleMousemove.bind(this, true));
            node.addEventListener('mouseout', handleMousemove.bind(this, false));

            return () => {
                node.removeEventListener('mouseover', handleMousemove);
                node.removeEventListener('mouseout', handleMousemove);
            };
        }

    });

    return (
        <div data-testid="message-container" id={mesaageId} className="message-conatiner" ref={messageRef}>
            {avatar && <img data-testid="avatar-img" src={avatar} alt={email}/>}
            {hoverOn && <div data-testid="user-email">{email}</div>}
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
