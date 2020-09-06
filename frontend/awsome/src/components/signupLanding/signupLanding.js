import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import "./signupLanding.css"

import "bootstrap/dist/css/bootstrap.min.css"

export default class SignupLanding extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xl={5} className="left">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <div className="center">
                            <h1>Start Your<br></br> Journey Now</h1>
                            <h4>Find out what investments suit you through our Risk Assessment and Retirement Planning Calculator</h4>
                            <br></br>

                            <Link to="/detailsForm">
                                <Button variant="primary" >Let's Go!</Button>
                            </Link>

                        </div>
                    </Col>
                    <Col xl={2}>
                        <div className="vertical-line"></div>
                    </Col>
                    <Col xl={5} className="right">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>


                        <div className="center">
                            <h1>Skip it for Now</h1>
                            <h4>Take the Risk Assessment quiz and Retirement Plan Calculator anytime from your profile page</h4>
                            <br></br>

                            <Link to="/retirementDashboard">
                                <Button variant="secondary" >Skip</Button>
                            </Link>

                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}