import React from "react";
import RowExpandContainer from "./RowExpandContainer";

export default class MyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personDetail: {}
        };
    }

    componentDidMount() {
        const data = this.getPersonDetail(this.props.personID);
        this.setState({ personDetail: data });
    }

    //a fake service call
    getPersonDetail(id) {
        return {
            name: "test name",
            ago: "14",
            status: "single",
            address: "123 test ave",
            company: "ArcTrade",
            position: "SDE"
        };
    }

    render() {
        return (
            <RowExpandContainer>
                <div>NAME: {this.state.personDetail.name}</div>
                <div>ago: {this.state.personDetail.ago}</div>
                <div>status: {this.state.personDetail.status}</div>
                <div>address: {this.state.personDetail.address}</div>
                <div>company: {this.state.personDetail.company}</div>
                <div>position: {this.state.personDetail.position}</div>
            </RowExpandContainer>
        );
    }
}
