import React from "react";
import { makeData } from "../Utils";
import EditableCell from "./EditableCell";
import TableFooter from "./TableFooter";
import RowExpandContainer from "./RowExpandContainer";
import PersonDetail from "./PersonDetail";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class MyTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: makeData()
        };
        this.renderEditable = this.renderEditable.bind(this);
    }

    renderEditable(cellInfo) {
        return <EditableCell cellInfo={cellInfo} scope={this} />;
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <ReactTable
                    data={data}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value
                    }
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Header: "First Name",
                                    accessor: "firstName",
                                    Cell: cellInfo => (
                                        <EditableCell cellInfo={cellInfo} scope={this} />
                                    ),
                                    Footer: <TableFooter text="Colume Footer" />,
                                    filterMethod: (filter, row) =>
                                        row[filter.id].startsWith(filter.value)
                                },
                                {
                                    Header: "Last Name",
                                    id: "lastName",
                                    Cell: this.renderEditable,
                                    Footer: <TableFooter text="Colume Footer" />,
                                    accessor: d => d.lastName
                                },
                                {
                                    Header: "Full Name",
                                    id: "full",
                                    Footer: <TableFooter text="Colume Footer" />,
                                    accessor: d => (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: d.firstName + " " + d.lastName
                                            }}
                                        />
                                    )
                                }
                            ]
                        },
                        {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Age",
                                    accessor: "age",
                                    Footer: <TableFooter text="Colume Footer" />
                                },
                                {
                                    Header: "Status",
                                    accessor: "status",
                                    Footer: <TableFooter text="Colume Footer" />
                                }
                            ]
                        },
                        {
                            Header: "Expand",
                            columns: [
                                {
                                    expander: true,
                                    Header: () => <strong>More</strong>,
                                    width: 65,
                                    Expander: ({ isExpanded, ...rest }) => (
                                        <div>
                                            {isExpanded ? (
                                                <span>&#x2299;</span>
                                            ) : (
                                                    <span>&#x2295;</span>
                                                )}
                                        </div>
                                    ),
                                    style: {
                                        cursor: "pointer",
                                        fontSize: 25,
                                        padding: "0",
                                        textAlign: "center",
                                        userSelect: "none"
                                    },
                                    Footer: () => <TableFooter text="&hearts;" />
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => (
                        <RowExpandContainer rowData={row}>
                            1. Hello, I am a container, you can put anything.<br />
                            2. Make service calls and display Person detail? Sure..., code it
              in me directly.<br />
                            3. Or, wrap me with a new component called{" "}
                            <strong>PersonDetail</strong> and put all service calls and
              business logic in it, that would be great, then I only need to
              take care of basic layout for all components who wrap me.
              <div>
                                <strong>
                                    Take a look at the "PersonDetail.js" example which renders
                  below person detail:
                </strong>
                            </div>
                            <PersonDetail personID={row.index} />
                        </RowExpandContainer>
                    )}
                />
            </div>
        );
    }
}
