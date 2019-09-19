import React from "react";
import Chat from "./Chat";
import useService from "./useService";

function ChatList() {
    const {data, error, loading} = useService();

    return (
        <React.Fragment>
            {
                loading ? <div data-testid="loading-wrapper">Loading...</div>
                    : error && error.length ? <div data-testid="error-wrapper">{error}</div>
                    : data && data.length ?
                        <div data-testid="messages-list">
                            {data.map(record => <Chat key={record.messageId} record={record}/>)}
                        </div>
                        : <div data-testid="no-messages-wrapper">No messages to show</div>


            }
        </React.Fragment>
    )
}

export default ChatList;
