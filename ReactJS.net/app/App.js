import React from "react";
import { render } from "react-dom";
import MyTable from "./components/MyTable";

class App extends React.Component {
    render() {
        return <MyTable />;
        //return <div>Hello React.</div>;
    }
}

render(<App />, document.getElementById("root"));
