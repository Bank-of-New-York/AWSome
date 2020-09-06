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
import "react-datepicker/dist/react-datepicker.css";

import "./detailsForm.css"
export default class detailsForm extends Component {

    constructor() {
        super();
        this.state = {
            first_name : "",
            last_name : "",
            email : "",
            birthday: "",
            invested: "no"
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name; 
        console.log(name, value)
        
        this.setState({
            [name] : value
        })
    }


    componentDidMount() {
        fetch("/api_update_user", {
            method: "GET",
            headers: {
                'Content-Type' : "application/json",
                "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
            }
        }).then((resp) => {
            return resp.json()
        }).then((values) => {
            console.log(values)
            Object.keys(values).forEach(k => {
                if (values[k] !== null) {
                    this.setState({
                        k : values[k]
                    })
                }
            });
        })
    }
    

    handleSubmit =(e) => {
        // e.preventDefault()
        console.log({
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            email : this.state.email,
            birthday: this.state.birthday,
            invested: this.state.invested
        })

        fetch("/api_update_user", {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
                "Authorization": `Basic ${btoa(sessionStorage.getItem("token"))}`
            },
            body: JSON.stringify({
                first_name : this.state.first_name,
                last_name : this.state.last_name,
                email : this.state.email,
                birthday: this.state.birthday,
                invested: this.state.invested
            })
        }).then((resp) => {
            console.log(resp)
            return resp.json()
        })
        
        // window.location.href="/riskAssessment"
    }

    // <Link to="/riskAssessment">


    render() {

        return (
            <Container>

                <Row>
                    <Col>
                        <br></br>
                        <h1 id="details-title">Let's get started...</h1>
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
                                            <Form.Control name="first_name" type="text" placeholder="First Name" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="last_name">
                                            <Form.Label>What's your last name?</Form.Label>
                                            <Form.Control name="last_name" type="text" placeholder="Last Name" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br></br>
                                <br></br>

                                <Row>
                                    <Col xs={7}>
                                        <Form.Group controlId="email">
                                            <Form.Label>What's your email?</Form.Label>
                                            <Form.Control name="email" type="email" placeholder="Email" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Group controlId="birthday">
                                            <Form.Label>When's your birthday?</Form.Label><br></br>
                                            <DatePicker name="birthday" selected={this.state.birthday} onChange={(newDate) => this.setState({birthday: new Date(newDate)})} />
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <br></br><br></br>

                                <Row>
                                    <Col xs={6}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>Have you invested before?</Form.Label>
                                            <Form.Control as="select" name="invested" custom onChange={this.handleInputChange}>
                                                <option>No</option>
                                                <option>Yes</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}></Col>
                                </Row>

                                <br></br><br></br><br></br><br></br>

                                <Button id="submit" variant="primary" onClick={this.handleSubmit}>Next</Button>


                            </Form>

                        </div>

                    </Col>

                </Row>
                <br></br>
                <br></br>
                <br></br>

            </Container>
        )
    }
}