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
            email_address : "",
            birthday: "",
            invested: "no"
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name; 
        
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
                Object.keys(this.state).forEach(i => {
                    if (values[k] !== undefined) {

                        if (k == "birthday") {
                            values[k] = new Date(values[k])
                        }

                        this.setState({
                            [k] : values[k]
                        })
                    }
                })
            });
        })
    }
    

    handleSubmit =(e) => {
        // e.preventDefault()
        if(this.state.first_name && 
            this.state.last_name && 
            this.state.email_address && 
            this.state.birthday
        ){
            fetch("/api_update_user", {
                method: "POST",
                headers: {
                    'Content-Type' : "application/json",
                    "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
                },
                body: JSON.stringify({
                    first_name : this.state.first_name,
                    last_name : this.state.last_name,
                    email_address : this.state.email_address,
                    birthday: this.state.birthday,
                    invested_before: this.state.invested
                })
            }).then((resp) => {
                console.log(resp.json())
                window.location.href="/retirementForm"
            }).catch(err =>{
                console.log(err)
                alert("There is a problem with submission")
            })
        } else {
            alert('Please fill in all details')
        }
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
                                            <Form.Control name="first_name" type="text" placeholder="First Name" value={this.state.first_name} onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="last_name">
                                            <Form.Label>What's your last name?</Form.Label>
                                            <Form.Control name="last_name" type="text" placeholder="Last Name" value={this.state.last_name} onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br></br>
                                <br></br>

                                <Row>
                                    <Col xs={7}>
                                        <Form.Group controlId="email">
                                            <Form.Label>What's your email?</Form.Label>
                                            <Form.Control name="email_address" type="email" placeholder="Email" value={this.state.email_address} onChange={this.handleInputChange}></Form.Control>
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
                                            <Form.Control as="select" name="invested" custom onChange={this.handleInputChange} value={this.state.invested}>
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