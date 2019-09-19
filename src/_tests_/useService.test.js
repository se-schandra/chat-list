import React from "react";
import {renderHook} from "@testing-library/react-hooks";
import useService from "./../components/useService";
import {cleanup, wait} from "@testing-library/react";
import getChatLog from "./../service";

jest.mock("./../service");


const timestamp = new Date().toISOString(),
    aNewchat = {
        messageId: '12356',
        userId: '613651251',
        fullName: 'Robin Balmforth',
        timestamp: timestamp,
        email: 'robin@example.com',
        message: 'Hello, World!',
        avatar: null
    };

describe("test useService hook", () => {

    afterEach(() => {
        cleanup();
    });

    it("it renders default value", async () => {
        const {result} = renderHook(() => useService());
        expect(result.current.data).toEqual([]);
        expect(result.current.loading).toEqual(true);
        expect(result.current.error).toEqual("");
    });

    it("sets data when fetch data gets value", async () => {

        getChatLog.mockReturnValueOnce(
            [aNewchat]
        );
        const {result} = renderHook(() => useService());

        expect(getChatLog).toHaveBeenCalledTimes(2);
        await wait(() => {

            expect(result.current.loading).toEqual(false);

            const data = result.current.data;
            expect(data.length).toEqual(1);
            expect(data[0].messageId).toEqual("12356");
            expect(data[0].userId).toEqual("613651251");
            expect(data[0].fullName).toEqual("Robin Balmforth");
            expect(data[0].timestamp).toEqual(timestamp);
            expect(data[0].email).toEqual("robin@example.com");
            expect(data[0].message).toEqual('Hello, World!');
            expect(data[0].avatar).toEqual(null);
        })
    });

    it("sets error when fetch data gets error", async () => {
        getChatLog.mockImplementation(() => Promise.reject("error"));
        const {result} = renderHook(() => useService());

        expect(getChatLog).toHaveBeenCalledTimes(3);
        await wait(() => {
            expect(result.current.loading).toEqual(false);
            expect(result.current.data).toEqual([]);
            expect(result.current.error).toEqual("error");
        })
    });

    /*
        it("when cancel request is true state is not updated", async() => {
            getChatLog.mockImplementation(()=> Promise.reject("error"));
            const {result, unmount} = renderHook(() => useService());
            expect(getChatLog).toHaveBeenCalledTimes(4);
            await wait(()=>{
               console.log("unmounted", result.current);
            })
        });
    */


});


