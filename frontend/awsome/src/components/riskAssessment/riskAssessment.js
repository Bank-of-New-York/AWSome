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
import "./riskAssessment.css"

export default class RiskAssessment extends Component {
    
    constructor() {
        super();
        this.state = {
            longterm: "#",
            fluctuate: "#",
            loss: "#",
            protect: "#",
            retire: "#"
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

    handleSubmit = (e) => {

        e.preventDefault()
        let score = 0

        var filled = true
        Object.keys(this.state).forEach(res => {
            let answer = this.state[res]
            

            if (answer === "A") {
                score += 1
            } else if (answer === "B") {
                score += 3
            } else if (answer === "C") {
                score += 5
            } else if (answer === "D") {
                score += 7
            } else if (answer === "#") {
                score = 0
                filled = false
            }
            
        });

        if(filled){
            let risk_level = null;
            console.log("scoree", score)
            if(score <= 5 && score >= 13){
                risk_level = "low"
            } else if (score >= 14 && score <= 24) {
                risk_level = "medium"
            } else if (score >= 25 ){
                risk_level = "high"
            }

            var bonds = 0
            var stocks = 0
            if(score <= 8) {
                bonds = 100
            } else if (score <=10) {
                bonds = 90
                stocks = 10
            } else if (score <=13) {
                bonds = 80
                stocks = 20
            } else if (score <=16) {
                bonds = 70
                stocks = 30
            } else if (score <= 19) {
                bonds = 60
                stocks = 40
            } else if (score <= 21) {
                bonds = 50
                stocks = 50
            } else if (score <= 24) {
                bonds = 40
                stocks = 60
            } else if (score <= 27) {
                bonds = 30
                stocks = 70
            } else if (score <=30) {
                bonds = 20
                stocks = 80
            } else if (score < 32) {
                bonds = 10
                stocks = 90
            } else {
                stocks = 100
            }

            fetch("/api_update_user", {
                method: "POST",
                headers: {
                    'Content-Type' : "application/json",
                    "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
                },
                body: JSON.stringify({
                    risk_level : risk_level
                })
            }).then((resp) => {

                console.log(resp)

                sessionStorage.setItem("risk_level", risk_level)
                sessionStorage.setItem("bonds%", bonds)
                sessionStorage.setItem("stocks%", stocks)

                window.location.href="/equityResult"

            }).catch(err =>{
                console.log(err)
                alert("There is a problem with submission")
            })
            
        } else {
            filled = true
            alert("Please fill all values")
        }
        
        
    }


    
    render() {
        return (
            <Container>

                <Row>
                    <Col xs={9}>
                        <br></br>
                        <h1 id="risk-title">What's your risk<br></br>appetite?</h1>
                    </Col>
                
                </Row>

                <br></br>
                <br></br>

                <Row>
                    <Col>
                 
                        <div>
                            <Form>
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>When making a long-term investment, I play to keep the money invested for...</Form.Label>
                                            <Form.Control onChange={this.handleInputChange} name="longterm" as="select" placeholder="Select an Option" defaultValue="" custom>
                                                <option value='' disabled>Select an Option</option>
                                                <option value='A'>1-5 years</option>
                                                <option value='B'>6-10 years</option>
                                                <option value='C'>11-20 years</option>
                                                <option value='D'>21 years and above</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>Typically, assets that fluctuate more also deliver higher returns. Which of the following statements do you agree with most?</Form.Label>
                                            <Form.Control onChange={this.handleInputChange} name="fluctuate" as="select"  custom defaultValue="">
                                                <option value='' disabled>Select an Option</option>
                                                <option value='A'>In order to minimise fluctuations in asset values, I am willing to accept returns below the rate of inflation</option>
                                                <option value='B'>I am willing to accept small, occasional drawdowns in exchange for returns slightly above the rate of inflation </option>
                                                <option value='C'>I am willing to accept large, occasional drawdowns in exchange for returns well above the rate of inflation </option>
                                                <option value='D'>I am willing to accept large, frequent drawdowns in exchange for high returns </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>In the 2008 financial crisis, stocks plunged over 50% from their peak. What is the maximum loss of value you could accept in a one-year period?</Form.Label>
                                            <Form.Control onChange={this.handleInputChange} name="loss" as="select"  custom defaultValue="">
                                                <option value='' disabled>Select an Option</option>
                                                <option value='A'>5%</option>
                                                <option value='B'>10%</option>
                                                <option value='C'>30%</option>
                                                <option value='D'>50%</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>To what extend do you agree with this statement: "Protecting my portfolio value is more important to me than high returns."</Form.Label>
                                            <Form.Control onChange={this.handleInputChange} name="protect"  as="select" custom defaultValue="">
                                                <option value='' disabled>Select an Option</option>
                                                <option value='A'>Strongly Agree</option>
                                                <option value='B'>Agree</option>
                                                <option value='C'>Disagree</option>
                                                <option value='D'>Strongly Disagree</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>Should there be a 30% shortfall in your investment proceeds at the end of the investment period, to what extent will it affect your retirement lifestyle?</Form.Label>
                                            <Form.Control onChange={this.handleInputChange} name="retire"  as="select" custom defaultValue="">
                                                <option value='' disabled>Select an Option</option>
                                                <option value='A'>I will not be able to support my basic needs</option>
                                                <option value='B'>I will have to downgrade my lifestyle to one that I am unable to accept</option>
                                                <option value='C'>I will have to downgrade my lifestyle to one that I am able to accept</option>
                                                <option value='D'>It does not affect my lifestyle</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br><br></br><br></br><br></br>

                                {/* <Link to="/retirementForm"> */}
                                    <Button id="submit" variant="primary" type="submit" onClick={this.handleSubmit}>Next</Button>
                                {/* </Link> */}
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