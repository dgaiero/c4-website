import '../App.css';

import {
   Alert,
   Button,
   ListGroup,
   ListGroupItem,
   ListGroupItemHeading,
   ListGroupItemText,
   Modal,
   ModalBody,
   ModalHeader
} from 'reactstrap';
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { NBSP } from '../helper'
import { faLifeRing } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faLifeRing);

class HowToSearchModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         'modal': false,
      };

   }

   render() {

      return (
         <>
            <Modal size="xl" isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
               <ModalHeader toggle={() => this.setState({ modal: !this.state.modal })}><FontAwesomeIcon icon="life-ring" /> Need Help?</ModalHeader>
               <ModalBody>
                  <Alert color="info">
                     If you're looking for potential university collaborators, then
                     you're in the right place! If you want to search for NGO or
                     government (city, regional, county), you'll need to go{NBSP}
                     <Link to="4CCollaborator">here</Link>.
                  </Alert>

                  <ListGroup>
                     <ListGroupItem>
                        <ListGroupItemHeading>How To Search</ListGroupItemHeading>
                        <ListGroupItemText>
                           <p>Not sure how to use this tool? Here are a couple of
                           tips to get started.</p>
                           <p>Here is a general formula for how queries are structured:{NBSP}
                           <em>Query = University AND (Activity Keywords OR 
                              Topical Keywords) AND Collaborations</em>.
                           </p>
                           <p>
                              This means that your results will contain collaborators
                              from any university you selected that match any of
                              the keywords (activity and topical) and each person
                              identified with the collaborations selected.
                           </p>
                           <p>
                              It's best to start broad and narrow your search
                              results. If you are looking for a person that
                              specializes in water, you may want to start with
                              the keywords and omit any university selection at
                              the start (unless you only want someone from a
                              specific univeristy). Then, select activity and
                              topical high level keywords to get an idea of who
                              specializes in water. At this point, if you know
                              what types of collaborations you are looking for,
                              go ahead and input them. Then, click {NBSP}
                              <code>Run Query</code>. This will give you anybody
                              who specializes in water. At this point, you can
                              start narrowing down your parameters by adding
                              some medium level or low level keywords to find
                              someone more specific.
                           </p>
                        </ListGroupItemText>
                     </ListGroupItem>
                     <ListGroupItem>
                        <ListGroupItemHeading>Universities</ListGroupItemHeading>
                        <ListGroupItemText>
                           To select universities that you can collaborate with,
                           use the <code>University Selection</code> dropdown.
                           You can select universities and departments or, you
                           can start typing in the field to filter universities.
                           To select an entire univeristy, you'll need to
                           individually select each department.
                        </ListGroupItemText>
                     </ListGroupItem>

                     <ListGroupItem>
                        <ListGroupItemHeading>Keywords</ListGroupItemHeading>
                        <ListGroupItemText>
                           Selecting keywords is very similar.
                           The only difference is the keywords are broken up
                           into high level, medium level, and low level.
                           You can think of a high level keyword as <b>Fruit</b>
                           , a medium level keyword <b>Apple</b> and a low level
                           keyword <b>Honeycrisp</b>. This way, you can more
                           easily narrow your search.
                        </ListGroupItemText>
                     </ListGroupItem>

                     <ListGroupItem>
                        <ListGroupItemHeading>Collaborations</ListGroupItemHeading>
                        <ListGroupItemText>
                           Selecting collaborations is similar to selecting a
                           university. You can select a
                           collaboration, or type to filter the results
                        </ListGroupItemText>
                     </ListGroupItem>

                     <ListGroupItem>
                        <ListGroupItemHeading>There's More!</ListGroupItemHeading>
                        <ListGroupItemText>
                           If you want to save a query for later or share it
                           with someone, click the <code>More Actions</code>
                           {NBSP}dropdown, and then select{NBSP}
                           <code>Save Query</code>{NBSP}
                           (Note, you can only select this button if there are
                           some parameters selected).<br />
                           {/* If you have a code from someone else, you can use the
                           {NBSP}<code>Paste Query</code> option to paste your
                           qcode (query code) and the system will return the
                           same query that was saved. */}
                        </ListGroupItemText>
                     </ListGroupItem>
                  </ListGroup>
               </ModalBody>
            </Modal>
            <Button color="info" onClick={() => this.setState({ modal: !this.state.modal })}>Need Help?</Button>
         </>
      )
   }

}

export default HowToSearchModal;