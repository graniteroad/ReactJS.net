import React from "react";

const RowExpandContainer = props => {
    return (
        <div style={props.style ? props.style : { padding: "10px" }}>
            {props.children}
        </div>
    );
};

export default RowExpandContainer;