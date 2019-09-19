import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {cleanup, render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("App renders", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });

    it("App renders header and container component", () => {
        render(<App/>);
        expect(document.querySelector("header")).toHaveTextContent("Tech Test");
        expect(document.querySelector("div.container")).toBeInTheDocument();
        cleanup();
    });

});
