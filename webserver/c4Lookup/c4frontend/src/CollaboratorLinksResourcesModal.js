import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

class CollaboratorasResourcesModal extends React.Component {


    render() {
        return (
            <Modal isOpen={this.props.isOpen} centered toggle={this.props.closeCollaboratorasResourcesModal}>
                <ModalHeader>Organization Tools:</ModalHeader>
                <ModalBody>
                    <a href="https://trello.com" target="_blank">Trello</a>
                    <br /> <br />
                    <a href="https://asana.com" target="_blank">Asana</a>
                </ModalBody>
                <ModalHeader>Collaboration Tools</ModalHeader>
                <ModalBody>
                    <a href="https://slack.com" target="_blank">Slack</a>
                    <br /> <br />
                    <a href="https://zoom.us" target="_blank">Zoom</a>
                    <br /> <br />
                    <a href="https://miro.com" target="_blank">Miro</a>
                </ModalBody>
                <ModalHeader>Resources</ModalHeader>
                <ModalBody>
                    <a
                        href="https://resources.ca.gov/CNRALegacyFiles/docs/climate/safeguarding/update2018/safeguarding-california-plan-2018-update.pdf"
                        target="_blank"
                    >
                        California’s Climate Adaptation Strategy 2018
                    </a>
                    <br /> <br />
                    <a href="https://ww2.arb.ca.gov/our-work/topics/climate-change" target="_blank">
                        California Greenhouse Gas Reduction Programs and Data
                    </a>
                    <br /> <br />
                    <a href="https://opr.ca.gov/planning/icarp/ " target="_blank">
                        Integrated Climate Adaptation and Resiliency Program
                    </a>
                </ModalBody>
            </Modal>
        )
    }
}

export default CollaboratorasResourcesModal
