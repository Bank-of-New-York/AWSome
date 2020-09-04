import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Input from "react-bootstrap/InputGroup"
import "bootstrap/dist/css/bootstrap.min.css"
import DatePicker from 'react-datepicker'
import { Link } from "react-router-dom" 

import "./detailsForm.css"
export default class detailsForm extends Component {
    render() {
        return (
            <Container>

                <Row>
                    <Col>
                        <br></br>
                        <h1>Let's get started...</h1>
                    </Col>
                
                </Row>

                <br></br>
                <br></br>

                <Row>
                    <Col>
                 
                        <div>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="first_name">
                                            <Form.Label>What's your first name?</Form.Label>
                                            <Form.Control type="text" placeholder="First Name"></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="last_name">
                                            <Form.Label>What's your last name?</Form.Label>
                                            <Form.Control type="text" placeholder="Last Name"></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col xs={8}>
                                        <Form.Group controlId="email">
                                            <Form.Label>What's your email?</Form.Label>
                                            <Form.Control type="text" placeholder="Email"></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="birthday">
                                            <Form.Label>When's your birthday?</Form.Label><br></br>
                                            <DatePicker/>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>
                                <br></br><br></br>

                                <Link to="/riskAssessment">
                                    <Button id="submit" variant="primary" type="submit">Next</Button>
                                </Link>
                            </Form>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}