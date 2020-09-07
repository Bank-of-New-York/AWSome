import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Header extends Component {

    render() {
        return (
            <Navbar expand="lg">
                <Navbar.Brand href="/" to="/">StockOverFlow</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/retirementDashboard" to="/">Home</Nav.Link>
                        {/* <Nav.Link href="/dashboard" to="/dashboard">Dashboard</Nav.Link> */}
                        {/* <Nav.Link href="/equityListing" to="/equityListing">Equities</Nav.Link> */}
                        {
                            this.props.loggedIn ?
                            <Nav.Link href="/logout" to="/logout">Logout</Nav.Link>
                            :
                            <Nav.Link href="/login" to="/login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}