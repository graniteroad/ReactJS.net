import React from "react";

const EditableCell = ({ cellInfo, scope }) => {
    function updateFullName(e) {
        const data = [...scope.state.data];
        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        scope.setState({ data });
    }

    return (
        <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={updateFullName}
            dangerouslySetInnerHTML={{
                __html: scope.state.data[cellInfo.index][cellInfo.column.id]
            }}
        />
    );
};

export default EditableCell;
