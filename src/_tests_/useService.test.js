import React from "react";
import {renderHook} from "@testing-library/react-hooks";
import useService from "./../components/useService";
import {cleanup} from "@testing-library/react";
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

    it("onload sets data if messages are received", async () => {

        getChatLog.mockReturnValueOnce(
            [aNewchat]
        );
        const {result, waitForNextUpdate} = renderHook(() => useService());
        expect(result.current.loading).toEqual(true);
        expect(result.current.data.length).toEqual(0);
        expect(result.current.error).toEqual("");
        expect(getChatLog).toHaveBeenCalledTimes(1);

        await waitForNextUpdate();


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
    });

    it("onload sets error if error is received", async () => {
        getChatLog.mockImplementation(() => Promise.reject("error"));
        const {result, waitForNextUpdate} = renderHook(() => useService());

        expect(getChatLog).toHaveBeenCalledTimes(2);
        await waitForNextUpdate();

        expect(result.current.loading).toEqual(false);
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toEqual("error");
    });


    /* it("if component is unmounted before response then set data is not called", async () => {
         getChatLog.mockImplementation(() => {
             setTimeout(()=>{
                 Promise.reject("error");
             },500);
         });
         const {result, unmount, waitForNextUpdate} = renderHook(() => useService());
         expect(result.current.cancelRequest).toEqual(false);
         unmount();
         expect(result.current.cancelRequest).toEqual(true);
         await waitForNextUpdate();
         expect(getChatLog).toHaveBeenCalledTimes(3);
         expect(result.current.error).toEqual("");
     });
 */

});


