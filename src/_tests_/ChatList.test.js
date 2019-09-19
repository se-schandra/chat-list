import React from "react";
import {cleanup, render, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import ChatList from './../components/ChatList';
import getChatLog from "./../service";

jest.mock("./../service");

describe("ChatList renders chat", () => {

    afterEach(() => {
        cleanup();
    });

    it("shows loading indicator until data is received", async () => {

        await getChatLog.mockReturnValueOnce(
            [{
                messageId: '12356',
                userId: '613651251',
                fullName: 'Robin Balmforth',
                timestamp: new Date().toISOString(),
                email: 'robin@example.com',
                message: 'Hello, World!',
                avatar: null
            }]
        );
        const {getByTestId, queryByTestId} = render(<ChatList/>);
        expect(getByTestId("loading-wrapper")).toBeInTheDocument();
        wait(() => {
            expect(queryByTestId("loading-wrapper")).toBeNull();
            expect(getByTestId("messages-list")).toBeInTheDocument()
        });
    });

    it("if no messages received then shows no messages information", async () => {

        getChatLog.mockReturnValueOnce([]);
        const {getByTestId, queryByTestId} = render(<ChatList/>);
        expect(getByTestId("loading-wrapper")).toBeInTheDocument();
        await wait(() => {
            expect(queryByTestId("loading-wrapper")).toBeNull();
            expect(queryByTestId("messages-list")).toBeNull();
            expect(getByTestId("no-messages-wrapper")).toBeInTheDocument();
        });
    });

    it("renders error when error occurs during data fetch", async () => {
        getChatLog.mockImplementation(() => Promise.reject("error"));
        const {getByTestId, queryByTestId} = render(<ChatList/>);
        await wait(() => {
            expect(queryByTestId("messages-list")).toBeNull();
            expect(getByTestId("error-wrapper")).toBeInTheDocument();
        });
    });

});
