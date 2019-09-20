import React from "react";
import {cleanup, fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Chat from "../components/Chat";

describe('Chat renders without crash', () => {

    const timestamp = new Date().toISOString();
    const chat_test = {
        messageId: '12356',
        userId: '613651251',
        fullName: 'Robin Balmforth',
        timestamp: timestamp,
        email: 'robin@example.com',
        message: 'Hello, World!',
        avatar: null
    };

    afterEach(() => {
        cleanup();
    });


    it("renders default values", () => {
        const {getByTestId} = render(<Chat record={chat_test}/>);

        const messageContainer = getByTestId("message-container");
        expect(messageContainer).toBeInTheDocument();

        expect(messageContainer.querySelector("div[data-testid='user-name']")).toBeInTheDocument();
        expect(messageContainer.querySelector("p[data-testid='message-text']")).toBeInTheDocument();
        expect(messageContainer.querySelector("em[data-testid='timestamp-text']")).toBeInTheDocument();

        expect(getByTestId("user-name")).toContainHTML("Robin Balmforth");

        expect(getByTestId("message-text")).toContainHTML("Hello, World!");

        expect(getByTestId("timestamp-text")).toContainHTML(timestamp);

    });

    it("renders avatar when avatar is defined", () => {
        const avatar = "http://dummyimage.com/100x100.jpg/ff4444/ffffff";
        const chatMessage = {...chat_test, avatar};
        const {getByTestId} = render(<Chat record={chatMessage}/>);
        const messageContainer = getByTestId("message-container");
        expect(messageContainer).toBeInTheDocument();

        expect(messageContainer.querySelector("div[data-testid='user-name']")).toBeInTheDocument();
        expect(messageContainer.querySelector("p[data-testid='message-text']")).toBeInTheDocument();
        expect(messageContainer.querySelector("em[data-testid='timestamp-text']")).toBeInTheDocument();
        expect(messageContainer.querySelector("img[data-testid='avatar-img']")).toBeInTheDocument();

        expect(getByTestId("avatar-img")).toHaveAttribute("src", avatar);

    });

    it("on omouseover email details are shown", () => {
        const {queryByTestId, getByTestId} = render(<Chat record={chat_test}/>);
        const messageContainer = getByTestId("message-container");

        expect(queryByTestId("user-email")).toBeNull();
        fireEvent.mouseOver(messageContainer);

        expect(getByTestId("user-email")).toBeInTheDocument();

    });

    it("on omouseout email details is removed", () => {
        const {queryByTestId, getByTestId} = render(<Chat record={chat_test}/>);
        const messageContainer = getByTestId("message-container");
        fireEvent.mouseOver(messageContainer);
        expect(getByTestId("user-email")).toBeInTheDocument();
        fireEvent.mouseOut(messageContainer);
        expect(queryByTestId("user-email")).toBeNull();

    });
});
