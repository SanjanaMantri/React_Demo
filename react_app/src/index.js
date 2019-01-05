import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";



const render = Component => ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

render(App);
