// eslint-disable-next-line
/* eslint-disable */ 
import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogout(event) {
    this.toggleModal();
    event.preventDefault();
  }

  render() {
        return(
            <div>
                <Navbar dark expand="md" style={{background: "#3AAFA9"}}>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="" href="/"><img src='logo.png' height="40" width="51" alt='Coalesce Forum' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                            {/*<Nav className="mr-auto" navbar>
                                <NavItem >
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-out fa-lg"></span> Log Out</Button>
                                </NavItem>
                            </Nav>*/}
                        </Collapse>
                    </div>
                </Navbar>
                <div class="jumbotron" style={{background: "#EDF5E1"}}>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1 style={{color: "#3AAFA9"}}>Name of the Organisation</h1>
                                <p style={{color: "#3AAFA9"}}>About the Organisation</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Logout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogout}>
                            <p>Are you sure that you want to Log Out ?</p>
                            <Button type="submit" value="logout"  style={{background: "#3AAFA9", float: "right"}}>Log Out</Button>
                            <Button type="submit" value="cancel" style={{background: "#3AAFA9", float: "right"}}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Header;