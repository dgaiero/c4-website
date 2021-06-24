import React, { Component } from 'react';
import {connect} from "react-redux";

export function getDepartmentsFromIDs(organizationIDs, organizations) {
    let displayText = '';
    organizationIDs.map(organization => (
        displayText += organizations[organization].department + ", "
    ));
    displayText = displayText.substring(0, displayText.length - 2);
    return displayText;
}


class Department extends React.Component {

    buildDisplayText = () => {
        let displayText = ''
        const organizationIDs = this.props.items;
        organizationIDs.map(organizationID => (
            displayText += this.props.orgs[organizationID].department + ", "));
        displayText = displayText.substring(0, displayText.length - 2)
        if (displayText.length > this.props.displayLength)
            displayText = displayText.substring(0, this.props.displayLength) + "..."
        if (displayText.length === 0 || displayText === 'null')
            displayText = "N/A"
        return displayText;
    }

    render() {
        return (
            <>
                {this.buildDisplayText()}
            </>
        )
    }

}

const mapStateToProps = state => ({
    orgs: state.orgs.items,
    orgsLoading: state.orgs.loading,
    orgError: state.orgs.error,
})

export default connect(mapStateToProps)(Department);
