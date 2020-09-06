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
            longterm: "A",
            fluctuate: "A",
            loss: "A",
            protect: "A",
            retire: "A"
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
        var score = 0


        Object.keys(this.state).forEach(res => {
            var answer = this.state[res]

            if (answer == "A") {
                score += 1
            } else if (answer == "B") {
                score += 3
            } else if (answer == "C") {
                score += 5
            } else if (answer == "D") {
                score += 7
            }

            
        });

        sessionStorage.setItem("riskScore", score)
        window.location.href="/retirementForm"
        
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
                                            <Form.Control onChange={this.handleInputChange} name="longterm" as="select" custom>
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
                                            <Form.Control onChange={this.handleInputChange} name="fluctuate" as="select" custom>
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
                                            <Form.Control onChange={this.handleInputChange} name="loss" as="select" custom>
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
                                            <Form.Control onChange={this.handleInputChange} name="protect" as="select" custom>
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
                                            <Form.Control onChange={this.handleInputChange} name="retire" as="select" custom>
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